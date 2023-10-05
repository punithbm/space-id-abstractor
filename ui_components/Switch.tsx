"use client";
import { Switch as TailwindSwitch } from "@headlessui/react";
import React, { FC } from "react";

export interface ISwitchProps {
  onClick: () => void;
  value: boolean;
  label?: string;
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const Switch: FC<ISwitchProps> = ({ value, onClick, label }: ISwitchProps) => {
  return (
    <TailwindSwitch.Group as="div" className="flex items-center">
      <TailwindSwitch
        checked={value}
        onChange={() => onClick()}
        className={classNames(
          value ? "bg-primary-main" : "bg-grey-white",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none "
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            value
              ? `translate-x-5 bg-grey-white border-primary-main `
              : `translate-x-0 bg-primary-main border-white`,
            "pointer-events-none inline-block h-5 w-5 transform rounded-full border-2 transition duration-200 ease-in-out"
          )}
        />
      </TailwindSwitch>
      {label && (
        <TailwindSwitch.Label as="span" className="pb-1 pl-2">
          <span className="supportText_regular text-grey-500">{label}</span>{" "}
        </TailwindSwitch.Label>
      )}
    </TailwindSwitch.Group>
  );
};

export default Switch;
