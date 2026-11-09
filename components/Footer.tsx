"use client";

import Link from "next/link";

import { Badge } from "@/components/tailgrids/core/badge";
import { Facebook, Twitter } from "@tailgrids/icons";

export default function Footer() {
  return (
    //footer container

    <div className="mt-4 text-center">
      {/* student */}
      <div>
        <Badge className="text-2xl text-black rounded-lg">
          68071269 นายสิรวิชญ์ สัปทน
        </Badge>
      </div>
      {/* contacts */}
      <div className="mt-4 flex justify-center gap-6">
        <Link href={"http://www.facebook.com/Viar Sirawit"} target="_blank">
          <Facebook className="text-blue-700" />
        </Link>

        <div className="border-l-1"></div>
        <Twitter className="" />
      </div>
    </div>
  );
}
