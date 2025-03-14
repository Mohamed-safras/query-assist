import { ROUTES } from "@/src/constants/common/routes";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { FilePlus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-white shadow-sm p-5 border-b">
      <Link href={ROUTES.DASH_BOARD} className="text-2xl">
        Chat to <span className="text-indigo-600">PDF</span>
      </Link>
      <SignedIn>
        <div className="flex items-center space-x-2">
          <Button asChild variant={"link"} className="hidden md:flex">
            <Link href={`${ROUTES.DASH_BOARD}${ROUTES.PRICING}`}>Pricing</Link>
          </Button>
          <Button asChild variant={"outline"} className="">
            <Link href={`${ROUTES.DASH_BOARD}`}>My Documents</Link>
          </Button>
          <Button asChild variant={"outline"} className="border-indigo-600">
            <Link href={`${ROUTES.DASH_BOARD}/upload`}>
              <FilePlus className="text-indigo-600" />
            </Link>
          </Button>
          {/* upgrad button */}
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};

export default Header;
