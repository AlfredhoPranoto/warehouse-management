import { Box, Button, Typography } from "@mui/material";
import Sidebar from "../Fragments/Sidebar";
import { Form } from "react-router-dom";

type ProductFormProps = {
  title: string;
  handleOnSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  buttonText: string;
  children: React.ReactNode;
};

const FormLayout = ({
  title,
  handleOnSubmit,
  loading,
  buttonText,
  children,
}: ProductFormProps) => {
  return (
    <Sidebar>
      <Box
        bgcolor="white"
        padding={4}
        sx={{
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <Typography variant="h5" mb={4}>
          {title}
        </Typography>
        <Form onSubmit={handleOnSubmit}>
          {children}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? `${buttonText}...` : buttonText}
          </Button>
        </Form>
      </Box>
    </Sidebar>
  );
};

export default FormLayout;
