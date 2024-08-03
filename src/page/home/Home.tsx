/* eslint-disable react/jsx-no-comment-textnodes */
import { Features } from "@/src/interfaces/features";
import React, { useEffect } from "react";

import { Button } from "@/src/components/ui/button";
import { ROUTES } from "@/src/constants/common/routes";
import {
  BrainCogIcon,
  EyeIcon,
  GlobeIcon,
  MonitorSmartphoneIcon,
  ServerCogIcon,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import AppScreenShot1 from "../../../public/app screen shot 1.jpg";
import AppScreenShot2 from "../../../public/app screen shot 2.jpg";

const features: Features[] = [
  {
    name: "Store your PDF documents",
    description:
      "Keep all your important PDF files securely stored and easily accessible anytime, anywhere",
    icon: GlobeIcon,
  },
  {
    name: "Blazing Fast Response",
    description:
      "Keep all your important PDF files securely stored and easily accessible anytime, anywhere.Keep all your important PDF files securely stored and easily accessible anytime, anywhere",
    icon: ZapIcon,
  },
  {
    name: "Chat Memorisation",
    description:
      "Keep all your important PDF files securely stored and easily accessible anytime, anywhereKeep all your important PDF files securely stored and easily accessible anytime, anywhereKeep all your important PDF files securely stored and easily accessible anytime, anywhere",
    icon: BrainCogIcon,
  },
  {
    name: "Interactive PDF viewer",
    description:
      "Keep all your important PDF files securely stored and easily accessible anytime, anywhereKeep all your important PDF files securely stored and easily accessible anytime, anywhereKeep all your important PDF files securely stored and easily accessible anytime, anywhere",
    icon: EyeIcon,
  },
  {
    name: "Cloud Backup",
    description:
      "Keep all your important PDF files securely stored and easily accessible anytime, anywhereKeep all your important PDF files securely stored and easily accessible anytime, anywhere",
    icon: ServerCogIcon,
  },
  {
    name: "Responsive Access Devices",
    description:
      "Keep all your important PDF files securely stored and easily accessible anytime, anywhere",
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
          <div className="relative overflow-hidden pt-16">
            <div className="container mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Image
                    src={AppScreenShot1}
                    alt="Image 1"
                    className="w-full h-auto object-cover"
                  />
                  <div aria-hidden="true" className="relative">
                    <div className="absolute bottom-0 from-white/95 bg-gradient-to-t -inset-x-32 pt-[5%] md:absolute md:bottom-0 md:bg-gradient-to-t md:from-white/95 md:-inset-x-32 md:pt-[5%]" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Image
                    src={AppScreenShot2}
                    alt="Image 2S"
                    className="w-full h-auto object-cover"
                  />
                  <div aria-hidden="true" className="relative">
                    <div className="absolute bottom-0 from-white/95 bg-gradient-to-t -inset-x-32 pt-[5%] md:absolute md:bottom-0 md:bg-gradient-to-t md:from-white/95 md:-inset-x-32 md:pt-[5%]" />
                  </div>
                </div>
                <div className="bg-white rounded-t-lg shadow-md overflow-hidden">
                  <Image
                    src={AppScreenShot1}
                    alt="Image 3"
                    className="w-full h-auto object-cover"
                  />
                  <div aria-hidden="true" className="relative">
                    <div className="absolute bottom-0 from-white/95 bg-gradient-to-t -inset-x-32 pt-[5%] md:absolute md:bottom-0 md:bg-gradient-to-t md:from-white/95 md:-inset-x-32 md:pt-[5%]" />
                  </div>
                </div>
                <div className="bg-white rounded-t-lg shadow-md overflow-hidden">
                  <Image
                    src={AppScreenShot2}
                    alt="Image 4"
                    className="w-full h-auto object-cover"
                  />
                  <div aria-hidden="true" className="relative">
                    <div className="absolute bottom-0 from-white/95 bg-gradient-to-t -inset-x-32 pt-[5%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto  mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
            <dl className="mx-auto grid max-w-7xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              {features.map((feature, index) => (
                <div className="relative pl-9" key={index}>
                  <dt className="inline font-semibold text-gray-600">
                    {feature.icon && (
                      <feature.icon
                        aria-hidden="true"
                        className="absolute left-1 top-1 w-5 text-indigo-600"
                      />
                    )}
                  </dt>
                  <dd className="text-base md:text-lg lg:text-xl font-bold text-gray-600">
                    {feature.name}
                  </dd>
                  <dd className="text-sm md:text-base lg:text-base text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
