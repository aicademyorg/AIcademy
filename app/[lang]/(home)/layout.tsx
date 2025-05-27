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
import Preview from "@/public/banner.png";
import { Language } from "@/lib/i18n";
import { Book, ComponentIcon, Server } from "lucide-react";

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
          type: "menu",
          on: "menu",
          text: "Courses",
          items: [
            {
              text: "Getting Started",
              url: "/docs/ui",
              icon: <Book />,
            },
            {
              text: "Components",
              url: "/docs/ui/components",
              icon: <ComponentIcon />,
            },
          ],
        },
        {
          type: "custom",
          on: "nav",
          children: (
            <NavbarMenu>
              <NavbarMenuTrigger>
                <Link href="/docs/python">Courses</Link>
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
                  <p className="font-medium">Python 101</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Learn Python
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink
                  href="/docs/ui/components"
                  className="lg:col-start-2"
                >
                  <ComponentIcon className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Pytorch 101</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Learn Pytorch
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink
                  href="/docs/ui/openapi"
                  className="lg:col-start-2"
                >
                  <Server className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Deep Learning 101</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Learn Deep Learning
                  </p>
                </NavbarMenuLink>
              </NavbarMenuContent>
            </NavbarMenu>
          ),
        },
        ...linkItems,
      ]}
      className="dark:bg-neutral-950 dark:[--color-fd-background:var(--color-neutral-950)]"
    >
      {children}
    </HomeLayout>
  );
}
