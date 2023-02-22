import React from "react";
import Form from "./Form";
import { Box, useMediaQuery } from "@mui/material";
const LoginPage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:700px)");

  return (
    <Box>
      <Box
        width={isNonMobileScreen ? "50%" : "93%"}
        backgroundColor="alt"
        p="2rem"
        margin="2rem auto"
        borderRadius="1.5rem"
      >
        {" "}
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
