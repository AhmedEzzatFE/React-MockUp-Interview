import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import UserWidgets from "scenes/widgets/UserWidgets";

const HomePage = () => {
  const isNonMobile = useMediaQuery("(max-width:400px)");
  return (
    <Box>
      {" "}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobile ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobile ? "26%" : undefined}>
          {" "}
          <UserWidgets />
        </Box>{" "}
      </Box>
    </Box>
  );
};

export default HomePage;
