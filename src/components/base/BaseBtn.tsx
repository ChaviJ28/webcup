import clsx from "clsx";
import React, { cloneElement, useRef } from "react";

import btnStyles from "@/components/styles/base/BaseBtn.module.css";

export type BaseBtnProps = React.ComponentPropsWithoutRef<"button"> & {
  size?: "small" | "large";
  variant?: "purple" | "mythical" | "green" | "purpleLight" | "border" | "underline" | "glow" | "link";
  icon?: React.ReactElement<React.ComponentProps<"svg">, "svg">;
  loading?: boolean;
  iconPos?: "left";
};

export function BaseBtn({ children, size, variant, className, icon, loading, iconPos, ...props }: BaseBtnProps) {
  const styles = useRef("");
  const sizes = useRef("");

  const disabled = props.disabled || loading;

  if (variant === "purple" && !disabled) {
    styles.current = "bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white";
  } else if (variant === "mythical" && !disabled) {
    styles.current = "bg-gradient-to-r from-[#F9E7B4] to-[#DA9537] hover:from-[#FAE9BB] hover:to-[#DE9F4B] text-black";
  } else if (variant === "glow" && !disabled) {
    styles.current = "bg-purpleLight-500 hover:bg-purpleLight-600 active:bg-purpleLight-700 text-white shadow-glow";
  } else if (variant === "purpleLight" && !disabled) {
    styles.current = "bg-purpleLight-500 hover:bg-purpleLight-600 active:bg-purpleLight-700 text-white";
  } else if (variant === "green" && !disabled) {
    styles.current = "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white";
  } else if (variant === "border" && !disabled) {
    styles.current =
      "bg-transparent border-2 border-solid border-purpleDark-500  hover:bg-purpleDark-100/25 active:bg-purpleDark-100/50";
  } else if (variant === "underline" && !disabled) {
    styles.current = "bg-transparent p-0 text-purpleDark-500 h-fit text-14 inline-block";
  } else if (variant === "link" && !disabled) {
    styles.current = "group flex items-center gap-4 text-14 font-semibold text-purpleDark-300 cursor-pointer";
  } else if (!disabled) {
    styles.current = "bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white";
  } else if (disabled && variant !== "link") {
    styles.current = "pointer-events-none bg-greyLight-50/50 text-greyLight-300 select-none";
  } else {
    styles.current = "pointer-events-none opacity-50 text-14 font-semibold text-purpleDark-300";
  }

  if (size === "small") {
    sizes.current = "h-40 px-3";
  } else if (size === "large") {
    sizes.current = "h-64 text-20 px-16 m:h-56";
  } else {
    sizes.current = "h-48 px-16 m:h-40";
  }

  return (
    <button
      className={clsx(
        "group relative flex items-center justify-center gap-4 rounded-lg font-semibold transition-colors duration-200",
        className,
        styles.current,
        sizes.current
      )}
      onMouseEnter={() => {}}
      onClick={() => {}}
      {...props}
    >
      {icon && iconPos === "left"
        ? cloneElement(icon, {
            className: clsx("", {
              "h-24 w-24": size === undefined,
              "h-20 w-20": size === "small",
              "opacity-0 transition-opacity duration-200": loading,
            }),
          })
        : null}

      <span
        className={clsx("relative flex items-center justify-center gap-4", {
          "after:content-[''] after:absolute after:w-full after:h-[2px] after:left-0 after:bottom-[-2px] after:bg-current after:opacity-30 group-hover:after:opacity-80 after:transition-opacity after:duration-200":
            variant === "underline",
          "relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full after:bg-current after:opacity-30 after:transition-opacity after:duration-200 after:content-[''] group-hover:after:opacity-80":
            variant === "link",
          "opacity-0 transition-opacity duration-200": loading,
        })}
      >
        {children}
      </span>

      {icon && iconPos === undefined
        ? cloneElement(icon, {
            className: clsx("", {
              "h-24 w-24": size === undefined,
              "h-20 w-20": size === "small",
              "opacity-0 transition-opacity duration-200": loading,
            }),
          })
        : null}

      {loading ? <span className={btnStyles.baseBtn__loader} /> : null}
    </button>
  );
}
