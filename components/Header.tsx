"use client";

import { Badge } from "@/components/tailgrids/core/badge";

export default function Header() {
  return (
    //header container
    <div className="mt-4 text-center">
      {/* code */}

      <div className="flex justify-center items-center gap-8">
        <Badge className="text-4xl rounded-md px-3.5 py-1 bg-rose-500 text-white -rotate-6">
          C
        </Badge>
        <Badge className="text-4xl rounded-md px-3.5 py-1 bg-orange-500 text-white rotate-3">
          S
        </Badge>
        <Badge className="text-4xl rounded-md px-3.5 py-1 bg-yellow-500 text-white -rotate-3">
          I
        </Badge>
        <Badge className="text-4xl rounded-md px-3.5 py-1 bg-green-500 text-white rotate-6">
          2
        </Badge>
        <Badge className="text-4xl rounded-md px-3.5 py-1 bg-sky-500 text-white -rotate-3">
          0
        </Badge>
        <Badge className="text-4xl rounded-md px-3.5 py-1 bg-violet-600 text-white rotate-5">
          5
        </Badge>
      </div>

      {/* name */}
      <div className="mt-4">
        <Badge className="rounded-md bg-gray-800 text-white text-2xl font-normal px-5 py-2 tracking-wide">
          FRONT END SOFTWARE DEVELOPMENT
        </Badge>
      </div>
    </div>
  );
}
