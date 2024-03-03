import { Box } from "@chakra-ui/react";
import { Navbar } from "../components";

// eslint-disable-next-line react/prop-types
export default function BaseLayout({ children }) {
  return (
    <Box bg={"gray.800"}>
      <Navbar />

      <Box padding={5}>
        {children}
      </Box>
    </Box>
  );
}
