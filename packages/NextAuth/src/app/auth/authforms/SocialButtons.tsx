"use client";
import Link from "next/link";
import React from "react";
import Google from "/public/images/svgs/google-icon.svg";
import github from "/public/images/svgs/logos--github-icon.svg";
import Image from "next/image";
import { HR } from "flowbite-react";
import { signIn } from "next-auth/react";

interface MyAppProps {
    title?:string;
  }

const SocialButtons: React.FC<MyAppProps> = ({ title }) => {
  const handleGoogleSignIn = async () => {
    await signIn("google");
  };
  const handleGithubSignIn = async () => {
    await signIn("github");
  };
  return (
    <>
      <div className="flex justify-between gap-8 my-6 ">
        <div
          onClick={handleGoogleSignIn}
          className="px-4 py-2.5 border-border border dark:border-darkborder flex gap-2 items-enter w-full rounded-md text-center justify-center text-dark dark:text-white text-primary-ld cursor-pointer"
        >
          <Image src={Google} alt="google" height={18} width={18} /> Google
        </div>
        <div
          onClick={handleGithubSignIn}
          className="px-4 py-2.5 border-border border dark:border-darkborder flex gap-2 items-enter w-full rounded-md text-center justify-center text-dark dark:text-white text-primary-ld cursor-pointer"
        >
          <Image src={github} alt="google" height={18} width={18} />
          Github
        </div>
      </div>
      {/* Divider */}
      <HR.Text text={`${title}`} className="!border-t !border-ld !bg-transparent" />
    </>
  );
};

export default SocialButtons;
