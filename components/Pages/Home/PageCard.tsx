import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

type PageCardType = {
  title: string;
  description: string;
  content: string;
  link: string;
  icon: ReactNode;
};

export const PageCard = ({
  title,
  description,
  content,
  link,
  icon,
}: PageCardType) => {
  return (
    <>
      <Card className="w-96 border  dark:bg-gradient-to-r from-neutral-900 via-zinc-900 to-neutral-900 border-gray-100 flex flex-col justify-center items-center h-full transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            {icon}
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{content}</p>
        </CardContent>
        <CardFooter>
          <Link href={link} className="w-full group">
            <Button className="w-full group-hover:bg-primary/80 transition-all">
              Go to {title} section
              <ArrowRight className="ml-2 h-4 w-4  transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};
