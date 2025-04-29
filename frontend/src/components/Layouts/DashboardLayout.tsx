import { Box } from "@mui/material";
import Sidebar from "../Fragments/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box bgcolor={"darkgrey"} height={"100vh"}>
        <Sidebar>
          {children}
        </Sidebar>
      </Box>
    </>
  );
};

export default DashboardLayout;
