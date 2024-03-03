import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { Navbar } from "../components";
import { updatePlan } from "../controllers/user";

export default function ExcercisePlanPage() {
  const [isLoading, setIsLoading] = useState(false);
  const currentPlan = useSelector((state) => state.user.plan);

  const handleChangeProfile = async (plan) => {
    setIsLoading(true);

    try {
      await updatePlan(plan);
      setIsLoading(false);
    } catch (_) {
      setIsLoading(false);
    }
  };

  return (
    <Box bg={"gray.800"}>
      <Navbar />
      <Center marginTop={20}>
        <Heading>Choose your goal !!!</Heading>
      </Center>
      <Flex marginTop={10} direction="column" alignItems="center">
        {isLoading && <Text mb={10}>Updating your plan. Please wait ...</Text>}

        <Button
          marginBottom={5}
          width={250}
          py={7}
          colorScheme={currentPlan === "Weight Loss" ? "facebook" : "gray"}
          onClick={() => handleChangeProfile("Weight Loss")}
        >
          Weight Loss
        </Button>
        <Button
          marginBottom={5}
          width={250}
          py={7}
          colorScheme={currentPlan === "Weight Gain" ? "facebook" : "gray"}
          onClick={() => handleChangeProfile("Weight Gain")}
        >
          Weight Gain
        </Button>
        <Button
          marginBottom={5}
          width={250}
          py={7}
          colorScheme={currentPlan === "Self Change" ? "facebook" : "gray"}
          onClick={() => handleChangeProfile("Self Change")}
        >
          Self Change
        </Button>
      </Flex>
    </Box>
  );
}
