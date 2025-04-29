import { Button, Alert } from "@mui/material";
import Form from "../components/Fragments/Form";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/Layouts/AuthLayout";
import FormInput from "../components/Widgets/FormInput";
import axios from "axios";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/inventory");
    } catch (error) {
      console.error("Login error:", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          "Unable to login. Please check your credentials.";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <AuthLayout title="Login">
      <Form onSubmit={handleOnSubmit}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleOnChange}
          disabled={loading}
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleOnChange}
          disabled={loading}
        />

        <Button fullWidth type="submit" variant="contained" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default LoginPage;
