import { Box, Center, Link, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function ErrorPage() {
  return (
    <Center h="100vh">
      <Box>
        <Text fontSize="4xl" textAlign="center" color="red.500" mb={1}>
          404
        </Text>
        <Text fontSize="xl" textAlign="center" mb={3}>
          Sorry, Your page is not Found!.
        </Text>
        <Box textAlign="center" textDecorationLine="underline">
          <Link as={NavLink} to="/">
            Back to Home!
          </Link>
        </Box>
      </Box>
    </Center>
  );
}
