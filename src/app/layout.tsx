import "./globals.css";
import kiki from "/public/images/kikis-broom-nuage 3.svg";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import KikisImage from "@/components/KikisImage";

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
            <KikisImage />
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
