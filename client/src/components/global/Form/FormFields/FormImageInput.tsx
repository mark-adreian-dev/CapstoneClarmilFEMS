/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { ImagePlus, X } from 'lucide-react'
import type { BaseFieldProps } from '@/types/ComponentTypes/CustomFormInput'
import { useState, useRef } from 'react'
import { BASE_IMAGE_URL } from '@/utils/api'

export default function FormImageInput<T extends object>({
  form,
  name,
  label,
  required,
}: BaseFieldProps<T>) {
  // localPreview stores the base64 string for NEWLY selected files
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <form.Field
      name={name}
      children={(field) => {
        const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
        const fieldValue = field.state.value;

        // --- DERIVED PREVIEW LOGIC ---
        let currentPreview: string | null = null;

        if (localPreview) {
          // Priority 1: User just picked a new file
          currentPreview = localPreview;
        } else if (typeof fieldValue === "string" && fieldValue) {
          // Priority 2: Use the existing database path
          currentPreview = `${BASE_IMAGE_URL}${fieldValue.replace(/^\//, "")}`;
        }

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            field.handleChange(file as any);
            const reader = new FileReader();
            reader.onloadend = () => setLocalPreview(reader.result as string);
            reader.readAsDataURL(file);
          }
        };

        const handleRemove = () => {
          field.handleChange(undefined as any);
          setLocalPreview(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        };

        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>
              <p>{label}: {required && <span className="text-red-500">*</span>}</p>
            </FieldLabel>

            <div className="flex flex-col gap-3">
              {/* Actual File Input (Hidden) */}
              <input
                type="file"
                id={field.name}
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                onBlur={field.handleBlur}
              />

              {currentPreview ? (
                // SHOW PREVIEW if there is a DB image or a new upload
                <div className="relative w-full h-48 border rounded-md overflow-hidden bg-muted/50">
                  <img
                    src={currentPreview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 shadow-md"
                    onClick={handleRemove}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                // SHOW BUTTON if the image is empty/removed
                <Button
                  type="button"
                  variant="outline"
                  className="h-48 w-full border-dashed flex flex-col gap-2 hover:bg-muted/50 transition-all"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImagePlus className="h-10 w-10 text-muted-foreground" />
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-medium">Upload Image</span>
                    <span className="text-xs text-muted-foreground font-normal">
                      PNG, JPG up to 5MB
                    </span>
                  </div>
                </Button>
              )}
            </div>

            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        );
      }}
    />
  );
}