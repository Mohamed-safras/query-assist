"use client";
import { PlusCircleIcon } from "lucide-react";

import { ROUTES } from "@/src/constants/common/routes";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const PlaceholderDocuments = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${ROUTES.DASH_BOARD}/upload`);
  };
  return (
    <Button
      onClick={handleClick}
      className="flex flex-col items-center justify-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400"
    >
      <PlusCircleIcon className="h-16 w-16" />
      <p>Add a document</p>
    </Button>
  );
};

export default PlaceholderDocuments;
