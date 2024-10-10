/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface FormInputFileProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "form"> {
  name: Path<T>;
  label?: string;
  // form: UseFormReturn<T, any, T>;
  form: any;
  className?: string;
}

function FormInputFile<T extends FieldValues>({
  form,
  name,
  label,
  className,
  ...props
}: FormInputFileProps<T>) {
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
            <Input
              type="file"
              className={className}
              onChange={(e) =>
                field.onChange(e.target.files ? e.target.files : null)
              }
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormInputFile };
