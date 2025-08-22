"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface RadioGroupProps {
  children: React.ReactNode;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function RadioGroup({ children, defaultValue, onValueChange, className }: RadioGroupProps) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (val: string) => {
    setValue(val);
    onValueChange?.(val);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            selectedValue: value,
            onChange: handleChange,
          });
        }
        return child;
      })}
    </div>
  );
}

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  value: string;
  selectedValue?: string;
  onChange?: (value: string) => void;
}

export function RadioGroupItem({
  id,
  value,
  selectedValue,
  onChange,
  ...rest
}: RadioGroupItemProps) {
  return (
    <input
      type="radio"
      id={id}
      name="radio-group"
      value={value}
      checked={selectedValue === value}
      onChange={() => onChange?.(value)}
      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
      {...rest}   // 👈 safe, `selectedValue` is already taken out
    />
  );
}

