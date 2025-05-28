import React, { JSX } from "react";
import "@/styles/text.scss";

type TextVariant =
  | "regular-white-22"
  | "bold-blue-22"
  | "regular-spaceblue-15"
  | "subtext-white-12"
  | "subtext-spaceblue-12"
  | "bold-blue-17"
  | "bold-white-20"
  | "medium-white-20"
  | "regular-white-17"
  | "regular-white-15"
  | "regular-gray-15"
  | "regular-white-28";

type TextProps = {
  children: React.ReactNode;
  variant: TextVariant;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

export default function Text({
  children,
  variant,
  as: Tag = "span",
  className = "",
}: TextProps) {
  return <Tag className={`${variant} ${className}`}>{children}</Tag>;
}
