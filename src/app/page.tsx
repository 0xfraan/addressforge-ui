import Image from "next/image";
import Link from "next/link";
import GolemText from "@/images/golemtxt.svg";
import GitLogo from "@/images/git.svg";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-blue-500 font-mono">
      <header className="container mx-auto px-4 py-8 flex justify-between items-center">
        <Link href="/" className="text-3xl font-mono">
          addressforge
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/about" className="hover:text-blue-400">
            About
          </Link>
          <div className="h-4 w-px bg-blue-500" />

          <Link href="/terms" className="hover:text-blue-400">
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
              width={20}
              height={20}
            />
          </Link>
          <Link
          href="/tool"
          className="bg-blue-500 hover:bg-blue-600 text-white font-mono font-semibold py-2 px-4 rounded-md transition-colors shadow-[0_0_5px_#0000ff] flex items-center space-x-2"
          >
          LAUNCH APP
        </Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-8">
          CREATE3 vanity address
          <br />
          salt generator
        </h1>
        <Link
          href="/tool"
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold m-4"
        >
          LAUNCH APP
        </Link>
      </main>

      <footer className="flex mx-auto px-4 py-6 text-center text-xs">
        &copy; {new Date().getFullYear()} AddressForge. All rights reserved.
        <Link className="flex pl-2" href={"https://www.golem.network/"}>
          Powered by
          <Image className="ml-2 mt-1" src={GolemText} alt={"Golem Network"} />
        </Link>
      </footer>
    </div>
  );
}
