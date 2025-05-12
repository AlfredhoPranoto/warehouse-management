import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  GridRowsProp,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
  Toolbar,
  ToolbarButton,
} from "@mui/x-data-grid";
import Sidebar from "../components/Fragments/Sidebar";
import { TextField, Typography } from "@mui/material";
import { useDebounce } from "../hooks/useDebounce";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
type Product = {
  _id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  warehouse: string;
};

function EditToolbar() {
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate("/inventory/create");
  };

  return (
    <Toolbar>
      <Tooltip title="Add record">
        <ToolbarButton onClick={handleClick}>
          <AddIcon fontSize="small" />
        </ToolbarButton>
      </Tooltip>
    </Toolbar>
  );
}

const InventoryPage = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Product[]>();
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState<GridRowsProp>();
  const [loading, setLoading] = useState(true);
  const { token } = useAuthContext();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${BASE_URL}/api/inventory`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false);

        const transformedData = data.data.map((item: Product) => ({
          ...item,
          id: item._id,
        }));

        setRows(transformedData);
        setFilteredRows(transformedData);
      } catch (err) {
        console.error("Error fetching inventory:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [token]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "SKU", flex: 1 },
    { field: "name", headerName: "Name", flex: 2, editable: true },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      flex: 2,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      editable: true,
      valueFormatter: (params) => {
        if (params == null || params === "") return "";
        return Intl.NumberFormat("id", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(params);
      },
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
      type: "number",
    },
    {
      field: "warehouse",
      headerName: "Warehouse",
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
      type: "singleSelect",
      valueOptions: ["A", "B", "C"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    if (debouncedSearchText === "") {
      setFilteredRows(rows);
    } else {
      const filteredData = rows?.filter((row) => {
        return String(row.name)
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase());
      });
      setFilteredRows(filteredData);
    }
  }, [debouncedSearchText, rows]);

  const handleEditClick = (id: GridRowId) => () => {
    return navigate(`/inventory/edit/${id}`);
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    await axios.delete(`${BASE_URL}/api/inventory/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const newRows = rows?.filter((row) => row._id !== id);
    setRows(newRows);
    setFilteredRows(newRows);
  };

  return (
    <Sidebar>
      <Box
        sx={{
          height: 530,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4" component="h2" fontWeight="bold">
            Inventory
          </Typography>
          <TextField
            sx={{ backgroundColor: "white", borderRadius: 1 }}
            variant="outlined"
            size="small"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by name.."
          />
        </Box>
        <DataGrid
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ paddingInline: 2 }}
          rows={filteredRows}
          columns={columns}
          slots={{ toolbar: EditToolbar }}
          showToolbar
        />
      </Box>
    </Sidebar>
  );
};

export default InventoryPage;
