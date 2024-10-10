/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Password } from "../ui/password";

interface FormPasswordProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder: string;
  form: UseFormReturn<T, any, T>;
}

function FormPassword<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
}: FormPasswordProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-base font-medium">{label}</FormLabel>
          )}
          <FormControl>
            <Password placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormPassword };
