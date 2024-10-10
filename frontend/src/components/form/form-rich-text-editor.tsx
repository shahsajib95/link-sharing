/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { RichTextEditor } from "../rich-text-editor/rich-text-editor";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface FormRichTextEditorProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  form: UseFormReturn<T, any, T>;
  disabled?: boolean;
  className?: string;
}

function FormRichTextEditor<T extends FieldValues>({
  form,
  name,
  label,
  className,
  disabled = false,
  ...props
}: FormRichTextEditorProps<T>) {
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
            <RichTextEditor
              onChange={field.onChange}
              field={field.value}
              className={className}
              disabled={disabled}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormRichTextEditor };
