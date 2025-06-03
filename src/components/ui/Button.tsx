import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "orange";
  size?: "large" | "small";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  size = "large",
  onClick,
  type = "button",
}: ButtonProps) {
  const className = `button ${size}-button ${size}-button--${variant}`;

  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
