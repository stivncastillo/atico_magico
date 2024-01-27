import React from "react";

import { Control, Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { Label } from "../ui/label";

interface ControlledSelectProps {
  name: string;
  control: Control;
  rules?: any;
  placeholder?: string;
  label?: string;
  options?: Array<{
    id: number | string;
    name: string;
  }>;
}

const ControlledSelect: React.FC<ControlledSelectProps> = ({
  name,
  control,
  rules,
  placeholder,
  label,
  options = [],
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, name }, fieldState: { error } }) => (
        <div className={cn("flex-1", error && "text-error-500")}>
          <Label htmlFor={name}>
            {label} {rules?.required && "*"}
          </Label>
          <Select onValueChange={onChange} value={value} defaultValue={value}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option.id} value={option.name}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {error && <span className=" text-sm">{error.message}</span>}
        </div>
      )}
    />
  );
};

export default ControlledSelect;
