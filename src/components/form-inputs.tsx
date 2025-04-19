
import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  className?: string;
  error?: string;
}

interface TextInputProps extends FormFieldProps {
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, name, required = false, className, error, type = "text", placeholder, value, onChange, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        <Label htmlFor={name} className="flex items-center gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        <Input 
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={cn(error && "border-destructive")}
          {...props}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

interface TextareaInputProps extends FormFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

export const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  ({ label, name, required = false, className, error, placeholder, value, onChange, rows = 4, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        <Label htmlFor={name} className="flex items-center gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        <Textarea 
          ref={ref}
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          rows={rows}
          className={cn(error && "border-destructive")}
          {...props}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);

TextareaInput.displayName = "TextareaInput";

interface SelectInputProps extends FormFieldProps {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export const SelectInput = forwardRef<HTMLButtonElement, SelectInputProps>(
  ({ label, name, required = false, className, error, placeholder, value, onValueChange, children, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        <Label htmlFor={name} className="flex items-center gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        <Select value={value} onValueChange={onValueChange} {...props}>
          <SelectTrigger id={name} ref={ref} className={cn(error && "border-destructive")}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {children}
          </SelectContent>
        </Select>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";

interface FileInputProps extends FormFieldProps {
  accept?: string;
  multiple?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview?: string[];
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, name, required = false, className, error, accept, multiple = false, onChange, preview, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        <Label htmlFor={name} className="flex items-center gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        <div 
          className={cn(
            "border-2 border-dashed rounded-md p-4 cursor-pointer text-center",
            error ? "border-destructive" : "border-muted hover:border-muted-foreground/50"
          )}
        >
          <Input
            ref={ref}
            id={name}
            name={name}
            type="file"
            accept={accept}
            required={required}
            multiple={multiple}
            onChange={onChange}
            className="hidden"
            {...props}
          />
          <label htmlFor={name} className="cursor-pointer block">
            <div className="flex flex-col items-center gap-2">
              <svg
                className="mx-auto h-12 w-12 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div className="text-sm font-medium">
                {multiple ? 'Click to upload files' : 'Click to upload a file'}
              </div>
              <div className="text-xs text-muted-foreground">
                {multiple ? 'or drag and drop files here' : 'or drag and drop a file here'}
              </div>
            </div>
          </label>
        </div>
        {preview && preview.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {preview.map((src, index) => (
              <div key={index} className="aspect-square rounded-md overflow-hidden">
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";
