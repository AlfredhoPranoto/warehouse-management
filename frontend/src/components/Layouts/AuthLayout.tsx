import { Box, Container, Typography } from "@mui/material";
import React from "react";

const AuthLayout = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <Box
      bgcolor={"gray"}
      sx={{
        height: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth={"sm"}
        sx={{ borderRadius: "0.5rem", bgcolor: "white", padding: "2rem" }}
      >
        <Typography
          component={"h1"}
          mb="1rem"
          variant="h4"
          textAlign="center"
          fontWeight="bold"
        >
          {title}
        </Typography>
        {children}
      </Container>
    </Box>
  );
};

export default AuthLayout;
