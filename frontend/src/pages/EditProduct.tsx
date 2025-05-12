import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FormLayout from "../components/Layouts/FormLayout";
import FormInput from "../components/Widgets/FormInput";
import { useAuthContext } from "../hooks/useAuthContext";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const EditProductPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    warehouse: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuthContext();

  useEffect(() => {
    if (id) {
      const fetchProductData = async () => {
        try {
          const { data } = await axios.get(`${BASE_URL}/api/inventory/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFormData(data.data);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };

      fetchProductData();
    }
  }, [id, token]);

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`${BASE_URL}/api/inventory/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/inventory");
    } catch (error) {
      console.error("Login error:", error);
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

  const handleOnSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <FormLayout
      buttonText="Update"
      handleOnSubmit={handleOnSubmit}
      loading={loading}
      title="Edit Product"
    >
      <FormInput
        label="Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleOnChange}
        disabled={loading}
      />

      <FormInput
        label="Description"
        name="description"
        type="text"
        value={formData.description}
        onChange={handleOnChange}
        disabled={loading}
      />
      <FormInput
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleOnChange}
        disabled={loading}
      />
      <FormInput
        label="Stock"
        name="stock"
        type="number"
        value={formData.stock}
        onChange={handleOnChange}
        disabled={loading}
      />

      <FormControl fullWidth>
        <InputLabel id="select-label">Warehouse</InputLabel>
        <Select
          sx={{ marginBottom: 4 }}
          labelId="select-label"
          id="select"
          label="Warehouse"
          value={formData.warehouse}
          name="warehouse"
          onChange={handleOnSelectChange}
        >
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="C">C</MenuItem>
        </Select>
      </FormControl>
    </FormLayout>
  );
};

export default EditProductPage;
