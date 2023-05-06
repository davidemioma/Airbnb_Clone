"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload = ({ value, onChange }: Props) => {
  const handleSubmit = useCallback(
    (result: any) => {
      onChange(result?.info?.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleSubmit}
      uploadPreset="ofj4nzii"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => (
        <div
          className="relative flex flex-col items-center justify-center p-20 border-2 border-neutral-300 border-dashed cursor-pointer transition hover:opacity-70"
          onClick={() => open?.()}
        >
          <TbPhotoPlus size={40} />

          <p className="sm:text-lg font-semibold">Click to upload</p>

          {value && (
            <div className="absolute inset-0 w-full h-full">
              <Image className="object-cover" src={value} fill alt="" />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
