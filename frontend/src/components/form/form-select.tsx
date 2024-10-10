/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder: string;
  // form: UseFormReturn<T, any, T>;
  form: UseFormReturn<any>;
  options: {
    label: string;
    value: string;
    class?: string;
  }[];
  disabled?: boolean;
  required?: boolean
}

function FormSelect<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  options,
  required,
  disabled = false,
}: FormSelectProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-base font-medium">
              {" "}
              {label} {required && <Badge variant="secondary">Required</Badge>}
            </FormLabel>
          )}
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.length > 0 &&
                options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex">
                      {option.class ? <div className={option.class}></div> : ""}
                      <span className="ms-3">{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormSelect };
