import { Box, Text, Center, Flex } from "@chakra-ui/react";
import { Navbar } from "../components";

export default function HomePage() {
  return (
    <Box bg={"gray.800"}>
      <Navbar />

      <Box
        minHeight="90vh"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Flex flexWrap="wrap" justifyContent="center" gap={4}>
            {cards.map((card) => (
              <Card key={card.title} title={card.title} imageURL={card.imageURL} />
            ))}
          </Flex>
        </Box>

        <Box maxW="1200px" mx="auto" marginTop={20}>
          <Text marginX={50} textAlign="center">
            Welcome to LAF2FIT, your ultimate fitness companion! Our platform combines an AI-driven
            virtual trainer, exercise tracking, a calorie counter, and community support to empower
            you on your journey towards a healthier and happier life. With LAF2FIT, you will stay
            motivated, monitor your progress, and achieve your fitness goals with confidence. Join
            us today and transform your well-being!
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

const cards = [
  {
    title: "Virtual Trainer",
    imageURL: "/assets/trainer.png",
  },
  {
    title: "Excercise schedule",
    imageURL: "/assets/exercise-schedule.png",
  },
  {
    title: "Track your personal health",
    imageURL: "/assets/walking.png",
  },
  {
    title: "Calories calculator",
    imageURL: "/assets/cooking.png",
  },
];

// eslint-disable-next-line react/prop-types
function Card({ title, imageURL }) {
  return (
    <Box
      position="relative"
      borderRadius="md"
      boxShadow="md"
      textAlign="center"
      width={300}
      height={200}
    >
      <Box
        position="relative"
        bgImage={`url(${imageURL})`}
        bgSize="cover"
        bgPosition="right"
        borderRadius="md"
        boxShadow="inset 0 0 0 2000px rgba(0, 0, 0, 0.4)" // Overlay color and opacity
        p={6}
        color="white"
        zIndex={1}
        width="100%"
        height="100%"
      >
        <Center h="100%">
          <Text fontSize="xl">{title}</Text>
        </Center>
      </Box>
    </Box>
  );
}
