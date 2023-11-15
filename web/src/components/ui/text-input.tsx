import React from "react";
import { cx } from "@/utils/tw";

export const TextInput = React.forwardRef<
  React.ElementRef<"input">,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cx(
      "flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-input disabled:cursor-not-allowed disabled:opacity-50 duration-300",
      className
    )}
    {...props}
  />
));

TextInput.displayName = "TextInput";

export default TextInput;
