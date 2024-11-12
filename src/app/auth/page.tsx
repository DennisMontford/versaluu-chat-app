import { Button } from "@/components/ui/button";
import Image from "next/image";
import AuthButtons from "./AuthButtons";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const { isAuthenticated } = getKindeServerSession();
  if (await isAuthenticated()) return redirect("/");

  
  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 flex overflow-hidden dark:bg-[#8964e055] bg-[#d5e2fc] relative justify-center items-center ">
        <img
          src="/sounds/"
          alt=" pink and blue clouds background"
          className="absolute -left-1/4 opacity-25 -bottom-52 lg:scale-125 xl:scale-100 scale-[2] pointer-events-none select-none -z-1"
        />
        <div className="flex flex-col gap-2 px-4 xl:ml-40 text-center md:text-start font-semibold">
          <Image
            src={"/sounds/Unnamed dddd.png"}
            alt="Versaluu Logo"
            width={763}
            height={173}
            className="mt-20 w-420px] z-0 pointer-events-none select-one"
          />

          <p className="pb-5 text-2xl md:text-3xl text-balance z-10 flex flex-col items-center justify-center">
            The{" "}
            <span className="bg-red-500 px-2 font-bold text-white rounded-xl">
              ULTIMATE
            </span>{" "}
            chat app
          </p>

          <AuthButtons />
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden justify-center items-center hidden md:flex ">
        <Image
          src={"/sounds/dallie 2.png"}
          alt="Hero Image"
          fill
          className="object-cover dark:opacity-60 opacity-90 pointer-events-none select-none h-full"
        />
      </div>
    </div>
  );
};

export default page;
