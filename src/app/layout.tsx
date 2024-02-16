import "./globals.css";
import kiki from "/public/images/kikis-broom-nuage 3.svg";

import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import { ChevronUpIcon } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="grid-rows-layout grid min-h-screen">
          <header className=" w-full">
            <Navbar />
          </header>

          <MaxWidthWrapper>{children}</MaxWidthWrapper>

          <div className="relative mt-20 flex h-96 flex-col justify-center overflow-hidden align-middle sm:h-auto">
            <Image
              src={kiki}
              alt="kikis"
              priority={true}
              className="absolute -left-2/4 bottom-1/4 z-30 mx-auto h-64 w-auto sm:static sm:mb-[-75px] sm:h-full  sm:w-full"
              style={{
                maxWidth: "1500px",
              }}
              // className={cn("z-10 mx-auto mb-[-55px]")}
            />

            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
