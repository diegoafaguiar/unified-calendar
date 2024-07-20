import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

import GoogleLoginButton from "@/components/GoogleLoginButton";
import HeroSection from "@/components/HeroSection";
import { Sub } from "@radix-ui/react-context-menu";
import SubscribeInvite from "@/components/SubscribeInvite";
import FeaturesSection from "@/components/FeaturesSection";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteBanner } from "@/components/site-banner";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function Home() {
  return (
    <div>
      <HeroSection />

      <FeaturesSection />

      <SubscribeInvite />
    </div>
  );
}
