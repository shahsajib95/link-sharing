/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

interface FormInputProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "form"> {
  name: Path<T>;
  label?: string;
  // form: UseFormReturn<T, any, T>;
  form: UseFormReturn<any>;
  className?: string;
  required?: boolean;
  isAuth?: any
}

function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  className,
  required,
  isAuth,
  ...props
}: FormInputProps<T>) {
  
  
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className={`text-base dark:text-white font-medium ${isAuth && "text-[#71717a]"}`}>
              {label} {required && <Badge variant="secondary">Required</Badge>}
            </FormLabel>
          )}
          <FormControl>
            <Input className={className} {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormInput };
