/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { MultipleSelector } from "../ui/multiple-selector";

interface FormMultipleSelectProps<T extends FieldValues>
  extends Partial<{ disabled?: boolean }> {
  name: Path<T>;
  label?: string;
  placeholder: string;
  form: UseFormReturn<T, any, T>;
  options: {
    label: string;
    value: string;
  }[];
}

function FormMultipleSelect<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  options,
  ...props
}: FormMultipleSelectProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium">{label}</FormLabel>
          <FormControl>
            <MultipleSelector
              value={field.value}
              // defaultOptions={options}

              onChange={field.onChange}
              placeholder={placeholder}
              hidePlaceholderWhenSelected
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  No options available
                </p>
              }
              //Search function
              onSearch={(value) => {
                const filteredOptions = options.filter((option) =>
                  option.label.toLowerCase().includes(value.toLowerCase()),
                );
                return Promise.resolve(filteredOptions);
              }}
              triggerSearchOnFocus
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormMultipleSelect };
