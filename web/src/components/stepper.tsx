import React from "react";
import { cx } from "@/utils/tw";
import { LuCheck as CheckIcon } from "react-icons/lu";

type Props = {
  steps: string[];
  currentStep?: number;
};

export default function Stepper({ steps, currentStep = 0 }: Props) {
  return (
    <ul className="flex items-center justify-center gap-3">
      {steps.map((value, index) => (
        <React.Fragment key={index}>
          <li
            className={cx(
              "flex flex-wrap md:items-center md:justify-center gap-2 duration-100 text-[11px] md:text-xs text-zinc-500",
              // active
              index === currentStep && "text-zinc-800"
            )}
          >
            <span
              className={cx(
                "p-0.5 justify-center border rounded-full duration-100 border-zinc-500",
                // active
                index === currentStep && "border-zinc-800",
                // completed
                index < currentStep &&
                  "text-white bg-green-500 border-green-500 shadow-sm"
              )}
            >
              <CheckIcon />
            </span>
            <h1
              className={
                "relative font-medium uppercase " +
                (index === currentStep
                  ? "after:content-[''] after:absolute after:h-0.5 after:w-7 after:bg-yellow-500 after:left-1 after:-bottom-2"
                  : "")
              }
            >
              {value}
            </h1>
          </li>
          {index < steps.length - 1 && (
            <div className="hidden md:block h-0.5 w-8 bg-gray-400" />
          )}
        </React.Fragment>
      ))}
    </ul>
  );
}
