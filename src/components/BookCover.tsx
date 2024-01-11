import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link.js";

import Image from "next/image";

interface CardCompProps {
  id: number;
  img: string;
}

function BookCover({
  id,

  img,
}: CardCompProps) {
  return (
    <Card
      className="w-full bg-mc-white drop-shadow-std transition-all hover:bg-mc-beige lg:max-w-md"
      key={id}
    >
      <Link href={`/book/${id}`}>
        <CardContent>
          {/* <Image
                    src={img}
                    width={500}
                    height={500}
                    alt={`${title} image`}
                /> */}
          <img src={img} />
        </CardContent>
      </Link>
    </Card>
  );
}

export default BookCover;
