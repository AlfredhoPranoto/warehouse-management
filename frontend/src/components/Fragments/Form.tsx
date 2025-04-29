import { Box } from "@mui/material";
import React from "react";

type FormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  children: React.ReactNode;
};

const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <Box component={"form"} paddingX={4} onSubmit={onSubmit}>
      {children}
    </Box>
  );
};

export default Form;
