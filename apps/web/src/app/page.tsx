import Header from "@/components/molecules/header";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <div className="main-bg absolute top-0 -z-10 h-full w-full" />
      <div className="flex h-full min-h-screen w-full">
        <div className="m-auto w-full max-w-5xl space-y-10 p-10 text-center">
          <Image
            alt="discordx"
            src="/discordx.svg"
            width={500}
            height={200}
            className="h-auto w-full"
          />
          <p className="inline-block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-2xl text-transparent">
            Build powerful, feature-rich bots with Discordx and a dedicated user
            dashboard.
          </p>
        </div>
      </div>
    </>
  );
}
