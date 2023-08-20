import React from "react";

export type TSvgNames = "home" | "down-arrow" | "user" | "menu" | "login";

type TIconSelectorProps = {
  name: TSvgNames;
  color?: string;
  width?: string;
  height?: string;
  stroke?: number;
  className?: React.ComponentProps<"div">["className"];
};

const IconSelector: React.FC<TIconSelectorProps> = ({
  name,
  color = "text-inherit",
  width = "w-6",
  stroke = 2,
  height = "h-6",
  className = "",
}) => {
  switch (name) {
    case "home":
      return (
        <svg
          className={`${width} ${height} ${color} ${className}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={stroke}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      );
    case "down-arrow":
      return (
        <svg
          className={`${width} ${height} ${color} ${className}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={stroke}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      );
    case "user":
      return (
        <svg
          className={`${width} ${height} ${color} ${className}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={stroke}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      );
    case "menu":
      return (
        <svg
          className={`${width} ${height} ${color} ${className}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={stroke}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      );

    default:
      return <></>;
  }
};

export default IconSelector;
