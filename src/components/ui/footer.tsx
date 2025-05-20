import { Button } from "@/components/ui/button";
import * as React from "react";
import { PinskyLogoForReact } from "./PinskyLogoForReact";
import { Twitter, Instagram, Linkedin } from "lucide-react";

// Define a type for the icon names
type SocialIconName = "Twitter" | "Instagram" | "Linkedin";

export interface FooterProps {
  showPinskyLogo?: boolean;
  brandName: string;
  socialLinks: Array<{
    iconName: SocialIconName;
    href: string;
    label: string;
  }>;
  mainLinks: Array<{
    href: string;
    label: string;
  }>;
  legalLinks: Array<{
    href: string;
    label: string;
  }>;
  copyright: {
    text: string;
    license?: string;
  };
}

const iconComponents: Record<SocialIconName, React.ElementType> = {
  Twitter: Twitter,
  Instagram: Instagram,
  Linkedin: Linkedin,
};

export function Footer({
  showPinskyLogo,
  brandName,
  socialLinks,
  mainLinks,
  legalLinks,
  copyright,
}: FooterProps) {
  return (
    <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24 text-neutral-700 dark:text-neutral-300 relative">
      <div className="px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="md:flex md:items-start md:justify-between">
          <a
            href="/"
            className="flex items-center gap-x-2"
            aria-label={brandName}
          >
            {showPinskyLogo && <PinskyLogoForReact />}
            <span className="font-bold text-xl text-neutral-900 dark:text-white">
              {brandName}
            </span>
          </a>
          <ul className="flex list-none mt-6 md:mt-0 space-x-3">
            {socialLinks.map((link, i) => {
              const IconComponent = iconComponents[link.iconName];
              return (
                <li key={i}>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                    asChild
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      {IconComponent && <IconComponent className="h-5 w-5" />}
                    </a>
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-700 mt-6 pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10">
          <nav className="lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-2 lg:justify-end">
              {mainLinks.map((link, i) => (
                <li key={i} className="my-1 mx-2 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-neutral-600 dark:text-neutral-400 underline-offset-4 hover:underline hover:text-neutral-900 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-3 lg:justify-end">
              {legalLinks.map((link, i) => (
                <li key={i} className="my-1 mx-3 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-neutral-500 dark:text-neutral-500 underline-offset-4 hover:underline hover:text-neutral-700 dark:hover:text-neutral-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 text-sm leading-6 text-neutral-500 dark:text-neutral-400 whitespace-nowrap lg:mt-0 lg:row-[1/3] lg:col-[1/4]">
            <div>{copyright.text}</div>
            {copyright.license && <div>{copyright.license}</div>}
          </div>
        </div>
      </div>
    </footer>
  );
}
