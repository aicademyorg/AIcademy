import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions, linkItems } from '@/app/layout.config';
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from 'fumadocs-ui/layouts/home/navbar';
import Link from 'fumadocs-core/link';
import Image from 'next/image';
import Preview from '@/public/banner.png';
import { Book, ComponentIcon, Pencil, PlusIcon, Server } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        {
          type: 'menu',
          on: 'menu',
          text: 'Courses',
          items: [
            {
              text: 'Getting Started',
              url: '/docs/ui',
              icon: <Book />,
            },
            {
              text: 'Components',
              url: '/docs/ui/components',
              icon: <ComponentIcon />,
            },
          ],
        },
        {
          type: 'custom',
          on: 'nav',
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
                          'linear-gradient(to bottom,white 60%,transparent)',
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

                <NavbarMenuLink
                  href="/docs/ui/markdown"
                  className="lg:col-start-3 lg:row-start-1"
                >
                  <Pencil className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Bash 101</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Learn Bash
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink
                  href="/docs/ui/manual-installation"
                  className="lg:col-start-3 lg:row-start-2"
                >
                  <PlusIcon className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">LLMs 101</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Learn LLMs
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
      <Footer />
    </HomeLayout>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t bg-fd-card py-12 text-fd-secondary-foreground">
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold">AIcademy</p>
          <p className="text-xs">
            Built with ❤️ by{' '}
            <a
              href="https://github.com/3p5ilon"
              rel="noreferrer noopener"
              target="_blank"
              className="font-medium"
            >
              Ɛpsilon
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}