/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";

interface FormTextareaProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder: string;
  // form: UseFormReturn<T, any, T>;
  form: UseFormReturn<any>;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

function FormTextarea<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  className,
  required,
  disabled = false,
}: FormTextareaProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-base font-medium">
              {label} {required && <Badge variant="secondary">Required</Badge>}
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              className={className}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormTextarea };
