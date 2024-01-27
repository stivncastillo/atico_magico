import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Control, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

interface ControlledInputProps {
  name: string;
  control: Control;
  rules?: any;
  placeholder?: string;
  type?: string;
  label?: string;
}

const ControlledInput: React.FC<ControlledInputProps> = ({
  name,
  control,
  rules,
  placeholder,
  type = "text",
  label,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, ref, name },
        fieldState: { error },
      }) => (
        <div className={cn("flex-1", error && "text-error-500")}>
          <Label htmlFor={name}>
            {label} {rules?.required && "*"}
          </Label>
          <Input
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            // value={value}
            defaultValue={value}
            ref={ref}
            className={cn(
              error && "border-error-500 focus-visible:ring-red-300"
            )}
          />
          {error && <span className=" text-sm">{error.message} error</span>}
        </div>
      )}
    />
  );
};

export default ControlledInput;
