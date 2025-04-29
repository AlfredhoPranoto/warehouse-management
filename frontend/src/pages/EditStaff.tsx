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
import FormInput from "../components/Widgets/FormInput";
import FormLayout from "../components/Layouts/FormLayout";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const EditStaffPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    warehouse: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      const fetchProductData = async () => {
        try {
          const { data } = await axios.get(`${BASE_URL}/api/users/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          console.log(data.data);
          setFormData(data.data); // Asumsikan response.data sudah sesuai dengan formData
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };

      fetchProductData();
    }
  }, [id]);
  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`${BASE_URL}/api/users/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/staffs");
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
      title="Edit Staff"
      handleOnSubmit={handleOnSubmit}
      loading={loading}
    >
      <FormInput
        label="First Name"
        name="firstName"
        type="text"
        value={formData.firstName}
        onChange={handleOnChange}
        disabled={loading}
      />

      <FormInput
        label="Last Name"
        name="lastName"
        type="text"
        value={formData.lastName}
        onChange={handleOnChange}
        disabled={loading}
      />
      <FormInput
        label="Age"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleOnChange}
        disabled={loading}
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Warehouse</InputLabel>
        <Select
          sx={{ marginBottom: 5 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
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

export default EditStaffPage;
