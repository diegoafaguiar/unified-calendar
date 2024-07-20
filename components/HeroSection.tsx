// React and Next.js imports
import Link from "next/link";
import Image from "next/image";

// Third-party library imports
import Balancer from "react-wrap-balancer";
import { Camera } from "lucide-react";

// Local component imports
import { Section, Container } from "@/components/Craft";
import { Button } from "@/components/ui/button";

import GoogleLoginButton from "./GoogleLoginButton";

const Hero = () => {
  return (
    <Section>
      <Container className="flex flex-col items-center text-center border-b border-gray-50">
        <Image
          //   src={"/dafa-logo.png"}
          src={"/DAFALogoR.png"}
          width={172}
          height={72}
          alt="Company Logo"
          className="not-prose mb-6 dark:invert md:mb-8"
        />
        <h1 className="!mb-0">
          <Balancer>
            <h1 className="text-6xl font-bold">
              Welcome to <span className="text-blue-600">Unified Calendar</span>
            </h1>
          </Balancer>
        </h1>
        <h3 className="text-muted-foreground">
          <Balancer>
            <p className="mt-6 text-2xl">
              Get started by connecting your calendars
            </p>
          </Balancer>
        </h3>
        <div className="not-prose mt-6 flex gap-2 md:mt-12">
          <Button variant={"secondary"} asChild>
            <Link href="/posts" className="gap-2">
              <Image
                src="/icons/google-calendar.svg"
                alt="Google Calendar"
                width={18}
                height={18}
              />
              Connect with Google -{">"}
            </Link>
          </Button>
          <Button asChild>
            <Link href="/" className="gap-2">
              <Image
                src="/icons/outlook-calendar.svg"
                alt="Outlook Calendar"
                width={18}
                height={18}
              />
              Connect with Outlook
            </Link>
          </Button>
        </div>
        <GoogleLoginButton />
      </Container>
    </Section>
  );
};

export default Hero;
