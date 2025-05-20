import { Hexagon, Github, Twitter, Instagram, Linkedin } from "lucide-react";
import { Footer } from "@/components/ui/footer"; // Using alias

export function FooterDemo() {
  // Changed name to avoid conflict if Demo is used elsewhere
  return (
    <div className="w-full">
      <Footer
        logo={<Hexagon className="h-8 w-8 text-neutral-900 dark:text-white" />} // Adjusted size and color
        brandName="Pinsky Studio"
        socialLinks={[
          {
            icon: <Twitter className="h-5 w-5" />,
            href: "https://x.com/pinsky_three",
            label: "Twitter / X",
          },
          {
            icon: <Instagram className="h-5 w-5" />,
            href: "https://www.instagram.com/pinsky_three",
            label: "Instagram",
          },
          {
            icon: <Linkedin className="h-5 w-5" />,
            href: "https://www.linkedin.com/in/bregy/",
            label: "LinkedIn",
          },
        ]}
        mainLinks={[
          { href: "/", label: "Home" },
          { href: "/shop", label: "Shop" },
          { href: "/portfolio", label: "Portfolio" },
          { href: "/patreon", label: "Patreon" },
          { href: "/commissions", label: "Commissions" },
          { href: "/workshops", label: "Workshops" },
          { href: "/contact", label: "Contact" },
        ]}
        legalLinks={[
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/terms", label: "Terms of Service" }, // Assuming a terms page
        ]}
        copyright={{
          text: "© 2025 Pinsky Studio.",
          license: "All rights reserved.",
        }}
      />
    </div>
  );
}
