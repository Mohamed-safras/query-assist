import { Features } from "@/src/interfaces/features";
import React from "react";

import {
  ZapIcon,
  GlobeIcon,
  BrainCogIcon,
  MonitorSmartphoneIcon,
  EyeIcon,
  ServerCogIcon,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/src/constants/common/routes";

const features: Features[] = [
  {
    name: "Store your PDF documents",
    description:
      "Keep all your important PDF files securely stored and easily accessible anytime, anywhere",
    icon: GlobeIcon,
  },
  {
    name: "Blazing Fast Response",
    description: "lorem dkjasdjasdjagsdjashgdahsdga",
    icon: ZapIcon,
  },
  {
    name: "Chat Memorisation",
    description: "asdadadaksdnaldald",
    icon: BrainCogIcon,
  },
  {
    name: "Interactive PDF viewer",
    description: "dasdadad",
    icon: EyeIcon,
  },
  {
    name: "Cloud Backup",
    description: "dasdadajhdgahjdg",
    icon: ServerCogIcon,
  },
  {
    name: "Responsive Access Devices",
    description: "dasdadajhdgahjdg",
    icon: MonitorSmartphoneIcon,
  },
];

const HomePage = () => {
  return (
    <main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to-indigo-600">
      <div className="bg-white py-24 sm:py-32 rounded-md drop-shadow-xl">
        <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Your Interactive Document Companion
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Transform Your PDFs into Interative Conversations
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Introducing{" "}
              <span className="font-bold text-indigo-600">Chat with PDF.</span>
              <br />
              <br />
              Upload your document, and our chatbot will answer questions,
              summarize content, and answer all your Qs. Ideal for everyone,{" "}
              <span className="text-indigo-600">Chat with PDF</span> turns
              static documents into{" "}
              <span className="font-bold">dynamic conversations</span>,enhancing
              productivity 10x fold effortlessly.
            </p>
            <Button asChild className="mt-10">
              <Link href={ROUTES.DASH_BOARD}>Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
