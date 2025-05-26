import { Octokit } from 'octokit';
import type { Feedback } from '@/components/rate';

export const repo = 'fumadocs-ui';
export const owner = '3p5ilon';
export const DocsCategory = 'Docs Feedback';

let instance: Octokit | undefined;

async function getOctokit(): Promise<Octokit> {
  if (instance) return instance;
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error(
      'No GitHub token provided, docs feedback feature will not work.',
    );
  }

  instance = new Octokit({ auth: token });
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

export async function onRateAction(url: string, feedback: Feedback) {
  'use server';
  const octokit = await getOctokit();
  const destination = await getFeedbackDestination();
  if (!octokit || !destination) return;

  const category = destination.discussionCategories.nodes.find(
    (category) => category.name === DocsCategory,
  );

  if (!category)
    throw new Error(
      `Please create a "${DocsCategory}" category in GitHub Discussion`,
    );

  const title = `Feedback for ${url}`;
  const body = `[${feedback.opinion}] ${feedback.message}\n\n> Forwarded from user feedback.`;

  const {
    search: { nodes: discussions },
  }: {
    search: {
      nodes: { id: string }[];
    };
  } = await octokit.graphql(`
    query {
      search(type: DISCUSSION, query: ${JSON.stringify(`${title} in:title repo:${owner}/${repo} author:@me`)}, first: 1) {
        nodes {
          ... on Discussion { id }
        }
      }
    }`);

  if (discussions.length > 0) {
    await octokit.graphql(`
      mutation {
        addDiscussionComment(input: { body: ${JSON.stringify(body)}, discussionId: "${discussions[0].id}" }) {
          comment { id }
        }
      }`);
  } else {
    await octokit.graphql(`
      mutation {
        createDiscussion(input: { repositoryId: "${destination.id}", categoryId: "${category.id}", body: ${JSON.stringify(body)}, title: ${JSON.stringify(title)} }) {
          discussion { id }
        }
      }`);
  }
}