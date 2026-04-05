"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

export function ImageUpload({ onChange, value, endpoint }: ImageUploadProps) {
  if (value)
    return (
      <div className="relative w-40 h-40">
        <img
          src={value}
          alt="Upload"
          className="rounded-md w-40 h-40 object-cover"
        />
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-1 right-1 p-1 bg-red-500 rounded-md shadow-sm"
        >
          <XIcon className="w-4 h-4 text-white" />
        </button>
      </div>
    );

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
}
