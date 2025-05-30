import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions, linkItems } from "@/app/layout.config";
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from "fumadocs-ui/layouts/home/navbar";
import Link from "fumadocs-core/link";
import Image from "next/image";
import Preview from "@/public/python/python-banner.png";
import { Language } from "@/lib/i18n";
import { Code } from "lucide-react";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: Language }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  return (
    <HomeLayout
      {...baseOptions(lang)}
      links={[
        {
          type: "custom",
          on: "nav",
          children: (
            <NavbarMenu>
              <NavbarMenuTrigger>
                <Link href="/docs/python">Learn</Link>
              </NavbarMenuTrigger>
              <NavbarMenuContent className="text-[15px]">
                <NavbarMenuLink href="/docs/python" className="md:row-span-2">
                  <div className="-mx-3 -mt-3">
                    <Image
                      src={Preview}
                      alt="Perview"
                      className="rounded-t-lg object-cover"
                      style={{
                        maskImage:
                          "linear-gradient(to bottom,white 60%,transparent)",
                      }}
                    />
                  </div>
                  <p className="font-medium">Python</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Learn Python for Data Science
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink href="/docs/pytorch" className="lg:col-start-2">
                  <Code className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Pytorch</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Learn Pytorch
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink
                  href="/docs/deeplearning"
                  className="lg:col-start-2"
                >
                  <Code className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Deep Learning</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Learn Deep Learning
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink
                  href="/docs/ml"
                  className="lg:col-start-3 lg:row-start-1"
                >
                  <Code className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Machine Learning</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Learn machine learning
                  </p>
                </NavbarMenuLink>
              </NavbarMenuContent>
            </NavbarMenu>
          ),
        },
        {
          icon: <Code />,
          text: "Blog",
          url: "/blog",
          active: "nested-url",
        },
        {
          icon: <Code />,
          text: "About",
          url: "/about",
        },
        ...linkItems,
      ]}
      className="dark:bg-neutral-950 dark:[--color-fd-background:var(--color-neutral-950)]"
    >
      {children}
    </HomeLayout>
  );
}
