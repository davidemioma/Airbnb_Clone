import React from "react";
import Image from "next/image";

interface Props {
  src?: string | null | undefined;
}

const Avatar = ({ src }: Props) => {
  return (
    <Image
      className="rounded-full"
      src={src || "/assets/no-img.jpeg"}
      alt="Logo"
      width="30"
      height="30"
    />
  );
};

export default Avatar;
