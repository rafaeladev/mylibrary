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
  // Fonction pour calculer la hauteur proportionnelle en fonction de la largeur
  const calculateHeight = (width: number) => {
    // Hauteur de base
    const baseHeight = 790;

    // Facteur de proportionnalité
    const scaleFactor = 1500 / width;

    // Calcul de la hauteur proportionnelle
    const proportionalHeight = Math.round(baseHeight / scaleFactor);

    return proportionalHeight;
  };

  
  return (
    <html lang="en">
      <body>
        <div className="grid-rows-layout grid min-h-screen">
          <header className=" w-full">
            <Navbar />
          </header>

          <MaxWidthWrapper>{children}</MaxWidthWrapper>

          <div className="relative mt-20 flex flex-col justify-center overflow-hidden align-middle">
            <Image
              src={kiki}
              alt="kikis"
              priority={true}
              style={{
                width: "100%",
                maxWidth: "1500px",
                height: "auto",
              }}
              className={cn("z-10 mx-auto mb-[-55px]")}
            />

            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
