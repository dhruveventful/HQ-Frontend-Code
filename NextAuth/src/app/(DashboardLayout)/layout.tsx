"use client";
import React, { useContext } from "react";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import Header from "./layout/vertical/header/Header";
import { Customizer } from "./layout/shared/customizer/Customizer";
import { CustomizerContext } from "@/app/context/CustomizerContext";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { activeLayout, isLayout } = useContext(CustomizerContext);
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex w-full min-h-screen dark:bg-darkgray">
        <div className="page-wrapper flex w-full  ">
          {/* Header/sidebar */}

          {activeLayout == "vertical" ? <Sidebar /> : null}
          <div className="page-wrapper-sub flex flex-col w-full dark:bg-darkgray">
            {/* Top Header  */}
            {activeLayout == "horizontal" ? (
              <Header layoutType="horizontal" />
            ) : (
              <Header layoutType="vertical" />
            )}

            <div
              className={`bg-lightgray dark:bg-dark  h-full ${
                activeLayout != "horizontal" ? "rounded-bb" : "rounded-none"
              } `}
            >
              {/* Body Content  */}
              <div
                className={` ${
                  isLayout == "full"
                    ? "w-full py-30 md:px-30 px-5"
                    : "container mx-auto  py-30"
                } ${activeLayout == "horizontal" ? "xl:mt-3" : ""}
              `}
              >
                {children}
              </div>
              <Customizer />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <>{redirect("/auth/auth1/login")}</>;
}
