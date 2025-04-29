import { Stack, TextField, TextFieldVariants } from "@mui/material";
import React from "react";
type FormInputProps = {
  name: string;
  label: string;
  value: string;
  type?: React.HTMLInputTypeAttribute;
  variant?: TextFieldVariants;
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  disabled?: boolean | undefined;
};

const FormInput = ({
  name,
  label,
  value,
  type = "text",
  variant = "outlined",
  onChange,
  disabled,
}: FormInputProps) => {
  return (
    <Stack mb={2}>
      <TextField
        autoComplete="off"
        variant={variant}
        label={label}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required
      />
    </Stack>
  );
};

export default FormInput;
