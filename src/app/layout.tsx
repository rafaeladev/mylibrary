import "./globals.css";
import kiki from "/public/images/kikis-broom-nuage 3.svg";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";

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
            {/*   <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
              }}
            > */}
            <Image
              src={kiki}
              alt="kikis"
              priority={true}
              className="absolute -left-2/4 bottom-1/4 z-30 mx-auto h-64 w-auto sm:static sm:mb-[-75px] sm:h-full  sm:w-full"
              style={{
                maxWidth: "1500px",
              }}
            />
            {/*     </motion.div> */}

            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
