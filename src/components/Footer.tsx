import React from "react";
import Image from "next/image";
import GitLogo from "@/images/git.svg";
import GolemText from "@/images/golemtxt.svg";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-blue-500 text-xs font-mono">
        <div className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} AddressForge. All rights reserved
        </div>
        <Link
          className="flex items-center mb-4 md:mb-0"
          href={"https://www.golem.network/"}
        >
          Powered by
          <Image className="ml-2 mt-2" src={GolemText} alt={"Golem Network"} />
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href={""}
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            About
          </Link>
          <div className="h-4 w-px bg-blue-500" />
          <Link
            href={""}
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            Terms of use
          </Link>
          <div className="h-4 w-px bg-blue-500" />
          <Link
            href={""}
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-400 transition-colors"
          >
            <span>Github</span>
            <Image
              src={GitLogo}
              alt={"Github Logo Icon"}
              width={16}
              height={16}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};
