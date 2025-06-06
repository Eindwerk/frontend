"use client";

import React, { InputHTMLAttributes, useState } from "react";
import Text from "./Text";
import "@/styles/_input.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  error,
  ...props
}) => {
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
        aria-invalid={!!error}
        className={`input-field ${error ? "input-field--error" : ""}`}
      />
      <div className={`input-label${isFloating ? " floating" : ""}`}>
        <Text variant="subtext-spaceblue-8">{label}</Text>
      </div>
      {error && (
        <div className="input-error">
          <Text variant="subtext-red-12">{error}</Text>
        </div>
      )}
    </div>
  );
};

export default Input;
