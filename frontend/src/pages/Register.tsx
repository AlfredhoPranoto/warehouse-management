import { Link } from "react-router-dom";
import AuthLayout from "../components/Layouts/AuthLayout";
import FormInput from "../components/Widgets/FormInput";
import { Button, Typography } from "@mui/material";
import Form from "../components/Fragments/Form";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const { control, handleSubmit } = useForm();
  return (
    <AuthLayout title="Register">
      <Form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
        <FormInput control={control} label="Name" name="name" />
        <FormInput control={control} label="Email" name="email" type="email" />
        <FormInput control={control} label="Password" name="password" type="password" />
        <Button fullWidth type="submit" variant="contained">
          Sign up
        </Button>
      </Form>
      <Typography textAlign="center" mt={2}>
        Already have an account? <Link to={"/login"}>Sign in</Link>
      </Typography>
    </AuthLayout>
  );
};

export default RegisterPage;
