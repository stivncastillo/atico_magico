"use client";
import React, { FormEventHandler } from "react";

import { cn } from "@/lib/utils";

import { Checkbox as CheckboxUI } from "../ui/checkbox";
import { Label } from "../ui/label";

interface CheckboxProps {
  id: string;
  label?: string;
  name?: string;
  checked?: boolean;
  onChange?: FormEventHandler<HTMLButtonElement>;
  className?: string;
  children?: React.ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  checked,
  onChange,
  className,
  children,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <CheckboxUI
        className={cn(className)}
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
    </div>
  );
};

export default Checkbox;
