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
    <div>
      <Card
        className="lg:max-w-36 h-200px w-32 bg-mc-white drop-shadow-std transition-all hover:bg-mc-beige sm:w-36"
        key={id}
      >
        <Link href={`/book/${id}`}>
          <CardContent>
            <Image
              src={img}
              width={500}
              height={500}
              alt={`${id} image`}
              className="book-cover"
            />
            {/* <img src={img} height={200} alt={`${id} image`} /> */}
          </CardContent>
        </Link>
      </Card>
    </div>
  );
}

export default BookCover;
