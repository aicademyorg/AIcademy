import { App, Octokit } from "octokit";
import type { Feedback } from "@/components/feedback";

export const repo = "AIcademy";
export const owner = "aicademyorg";
export const DocsCategory = "Feedback";

let instance: Octokit | undefined;

async function getOctokit(): Promise<Octokit> {
  if (instance) return instance;
  const appId = process.env.GITHUB_APP_ID;
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY;

  if (!appId || !privateKey) {
    throw new Error(
      "No GitHub keys provided for Github app, docs feedback feature will not work."
    );
  }

  const app = new App({
    appId,
    privateKey,
  });

  const { data } = await app.octokit.request(
    "GET /repos/{owner}/{repo}/installation",
    {
      owner,
      repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  instance = await app.getInstallationOctokit(data.id);
  return instance;
}

interface RepositoryInfo {
  id: string;
  discussionCategories: {
    nodes: {
      id: string;
      name: string;
    }[];
  };
}

let cachedDestination: RepositoryInfo | undefined;
async function getFeedbackDestination() {
  if (cachedDestination) return cachedDestination;
  const octokit = await getOctokit();

  const {
    repository,
  }: {
    repository: RepositoryInfo;
  } = await octokit.graphql(`
    query {
      repository(owner: "${owner}", name: "${repo}") {
        id
        discussionCategories(first: 25) {
          nodes { id name }
        }
      }
    }
  `);

  return (cachedDestination = repository);
}

export interface ActionResponse {
  githubUrl: string;
}

export async function onRateAction(
  url: string,
  feedback: Feedback
): Promise<ActionResponse> {
  "use server";
  const octokit = await getOctokit();
  const destination = await getFeedbackDestination();
  if (!octokit || !destination)
    throw new Error("GitHub comment integration is not configured.");

  const category = destination.discussionCategories.nodes.find(
    (category) => category.name === DocsCategory
  );

  if (!category)
    throw new Error(
      `Please create a "${DocsCategory}" category in GitHub Discussion`
    );

  const title = `Feedback for ${url}`;
  const body = `[${feedback.opinion}] ${feedback.message}\n\n> Forwarded from user feedback.`;

  let discussion: { id: string; url: string } | undefined;
  const searchResult = await octokit.graphql<any>(`
    query {
      search(type: DISCUSSION, query: ${JSON.stringify(
        `${title} in:title repo:${owner}/${repo} author:@me`
      )}, first: 1) {
        nodes {
          ... on Discussion { id, url }
        }
      }
    }
  `);

  const nodes: { id: string; url: string }[] = searchResult.search.nodes;
  if (nodes && nodes.length > 0 && nodes[0]) {
    discussion = nodes[0];
    try {
      await octokit.graphql(`
        mutation {
          addDiscussionComment(input: { body: ${JSON.stringify(
            body
          )}, discussionId: "${discussion.id}" }) {
            comment { id }
          }
        }
      `);
    } catch (err) {
      console.error(
        "[onRateAction] Failed to add comment to existing discussion",
        {
          url,
          feedback,
          discussionId: discussion.id,
          error: err,
        }
      );
      throw new Error("Failed to add comment to existing discussion.");
    }
  } else {
    let result;
    try {
      result = await octokit.graphql<any>(`
        mutation {
          createDiscussion(input: { repositoryId: "${
            destination.id
          }", categoryId: "${category.id}", body: ${JSON.stringify(
        body
      )}, title: ${JSON.stringify(title)} }) {
            discussion { id, url }
          }
        }
      `);
      discussion = result?.createDiscussion?.discussion || result?.discussion;
    } catch (err) {
      console.error("[onRateAction] Error creating discussion", {
        url,
        feedback,
        error: err,
      });
    }
    if (!discussion) {
      try {
        const retrySearch = await octokit.graphql<any>(`
          query {
            search(type: DISCUSSION, query: ${JSON.stringify(
              `${title} in:title repo:${owner}/${repo} author:@me`
            )}, first: 1) {
              nodes {
                ... on Discussion { id, url }
              }
            }
          }
        `);
        const retryNodes: { id: string; url: string }[] =
          retrySearch.search.nodes;
        if (retryNodes && retryNodes.length > 0 && retryNodes[0]) {
          discussion = retryNodes[0];
        }
      } catch (err) {
        console.error(
          "[onRateAction] Error retrying discussion search after creation failure",
          {
            url,
            feedback,
            error: err,
          }
        );
      }
    }
  }

  if (!discussion) {
    console.error(
      "[onRateAction] Final failure: could not find or create discussion",
      {
        url,
        feedback,
        title,
      }
    );
    throw new Error(
      "Failed to create or find a discussion for feedback. Please ensure the 'Feedback' category exists in your GitHub Discussions and your GitHub App has the correct permissions."
    );
  }

  return {
    githubUrl: discussion.url,
  };
}
