"use client";

import React, { InputHTMLAttributes, useState } from "react";
import Text from "./Text";
import "@/styles/_input.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, value, onChange, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || Boolean(value);

  return (
    <div className="input-wrapper">
      <input
        {...props}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=" "
        className="input-field"
      />
      <div className={`input-label${isFloating ? " floating" : ""}`}>
        <Text variant="subtext-spaceblue-8">{label}</Text>
      </div>
    </div>
  );
};

export default Input;
