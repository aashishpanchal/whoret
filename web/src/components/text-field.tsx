import React from "react";
import TextInput from "./ui/text-input";
import { cx } from "@/utils/tw";
import { motion } from "framer-motion";
import { MdError } from "react-icons/md";
import { LuEye as Eye, LuEyeOff as EyeOff } from "react-icons/lu";

type Props = {
  left?: React.ReactNode;
  right?: React.ReactNode;
  label?: string;
  error?: boolean;
  description?: string;
  helperText?: string;
} & React.ComponentProps<"input">;

export const TextField = React.forwardRef<HTMLInputElement, Props>(
  (
    { left, right, error, helperText, description, label, className, ...props },
    ref
  ) => {
    const common = "absolute top-0 bottom-0 grid p-1 place-items-center";
    const id = React.useId();

    if (props.type === "password") {
      const [show, setShow] = React.useState<boolean>(false);

      const ontoggle = () => setShow(!show);

      const icon = show ? <Eye size={19} /> : <EyeOff size={19} />;

      right =
        props.type === "password" ? (
          <button type="button" onClick={ontoggle}>
            {icon}
          </button>
        ) : (
          right
        );

      props.type = show ? "text" : "password";
    }

    return (
      <div className="my-1 space-y-1">
        {label && (
          <label
            htmlFor={id}
            className={cx(
              "text-sm font-medium text-gray-900",
              error && "text-danger"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {left && (
            <span className={`${common} left-1 text-gray-700`}>{left}</span>
          )}
          <TextInput
            id={id}
            {...props}
            className={cx(
              className,
              left && "pl-8",
              right && "pr-8",
              error && "border-danger focus:ring-danger"
            )}
            ref={ref}
          />
          {right && (
            <span className={`${common} right-2 text-gray-700`}>{right}</span>
          )}
        </div>
        {helperText && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-destructive text-danger"
          >
            <MdError size={16} />
            {helperText}
          </motion.span>
        )}
        {description && (
          <p className="text-xs font-semibold text-zinc-600">{description}</p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";
