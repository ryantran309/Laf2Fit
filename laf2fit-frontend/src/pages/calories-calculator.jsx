import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  List,
  ListItem,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TableContainer,
  Tbody,
  Button,
  CircularProgress,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  ModalContent,
} from "@chakra-ui/react";
import BaseLayout from "../layouts";
import {
  getFoods,
  getSelectedFoods,
  removeFood,
  saveNewFood,
  updateSelectedFood,
} from "../controllers/food";

export default function CaloriesCalculatorPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getFoods();
    getSelectedFoods();
  }, []);

  return (
    <BaseLayout>
      <Flex marginTop={5} direction="column" alignItems="center">
        <Heading>Calories Intake</Heading>

        <Box width={700} marginTop={5}>
          <SearchField />
        </Box>
      </Flex>

      <Box marginX={20} marginY={10}>
        <Flex>
          <Box width={"60%"}>
            <ListCaloryItem />
          </Box>
          <Box width={"40%"}>
            <SmallCircle />
          </Box>
        </Flex>

        <Button marginTop={5} leftIcon={<FiPlusCircle />} onClick={onOpen}>
          Add
        </Button>
      </Box>

      <AddCaloryModal isOpen={isOpen} onClose={onClose} />
    </BaseLayout>
  );
}

function SearchField() {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const foods = useSelector((state) => state.food.list);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    setShowDropdown(value.length > 0); // Show dropdown if there is text in the input

    const filteredFoods = foods.filter((food) =>
      food.foodName.toLowerCase().includes(value.toLowerCase())
    );
    setSelectedFoods(filteredFoods.splice(0, 3));
  };

  // Function to handle dropdown item selection
  const handleDropdownSelect = async (foodId) => {
    setIsLoading(true);

    try {
      setSearchText("");
      await updateSelectedFood(foodId);
      setShowDropdown(false); // Hide dropdown after selection
      setIsLoading(false);
    } catch (_) {
      setIsLoading(false);
    }
  };

  return (
    <Box position="relative" width="100%">
      {isLoading ? (
        <Text textAlign="center">Please wait ...</Text>
      ) : (
        <>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.500">
              <FaSearch />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={handleSearchChange}
            />
          </InputGroup>
          {showDropdown && (
            <Box
              position="absolute"
              top="100%"
              left="0"
              right="0"
              bg={"gray.900"}
              boxShadow="md"
              zIndex="1"
            >
              <List p={2}>
                {/* Example dropdown items */}
                {selectedFoods.map((food) => (
                  <ListItem
                    key={food._id}
                    cursor="pointer"
                    padding={1.5}
                    onClick={() => handleDropdownSelect(food._id)}
                  >
                    <Text>{food.foodName}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

function ListCaloryItem() {
  const foods = useSelector((state) => state.food.selectedFoods);

  const handleRemoveFood = async (food) => {
    const isOK = window.confirm("Are you sure you want to remove '" + food.foodName + "'");

    if (isOK) {
      await removeFood(food);
    }
  };

  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Food Name</Th>
            <Th>Food Calories</Th>
          </Tr>
        </Thead>
        <Tbody>
          {foods.map((food) => (
            <Tr key={food._id} cursor="pointer" onClick={() => handleRemoveFood(food)}>
              <Td>{food.foodName}</Td>
              <Td>{food.calories}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function calculateBMI(weight, height) {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return parseFloat(bmi.toFixed(2));
}

const weightage = {
  underWeight: {
    keepWeight: 2217,
    gainWeight: 2717,
    loseWeight: "Not Recommended",
  },
  normalWeight: {
    keepWeight: 2707,
    gainWeight: 3207,
    loseWeight: 2207,
  },
  overWeight: {
    keepWeight: 3131,
    gainWeight: "Not typically recommended due to already elevated BMI",
    loseWeight: 2631,
  },
  obese: {
    keepWeight: "Not typically recommended due to already high BMI",
    gainWeight: "Not recommended, as BMI is already in the obese range",
    loseWeight: 2957,
  },
};

// eslint-disable-next-line react/prop-types
function SmallCircle() {
  const circleSize = 20; // Adjust the size of the circle as needed
  const circleThickness = 10; // Adjust the thickness of the circle as needed

  const { weight, height, plan } = useSelector((state) => state.user);
  const foods = useSelector((state) => state.food.selectedFoods);
  const [weightagePlan, setWeightagePlan] = useState();
  const [dietPlan, setDietPlan] = useState();
  const [caloriesMessage, setCaloriesMessage] = useState();
  const [percentage, setPercentage] = useState();

  useEffect(() => {
    const bmi = calculateBMI(weight, height);

    let weightagePlan = "";
    if (bmi < 18.5) weightagePlan = "underWeight";
    else if (bmi > 18.5 && bmi <= 24.9) weightagePlan = "normalWeight";
    else if (bmi > 25.0 && bmi <= 29.9) weightagePlan = "overWeight";
    else weightagePlan = "obese";

    let dietPlan = "";
    if (plan === "Weight Gain") dietPlan = "gainWeight";
    else if (plan === "Weight Loss") dietPlan = "loseWeight";
    else dietPlan = "keepWeight";

    setWeightagePlan(weightagePlan);
    setDietPlan(dietPlan);

    console.log("weightagePlan: ", weightagePlan);
    console.log("dietPlan: ", dietPlan);
  }, [weight, height, plan]);

  useEffect(() => {
    if (weightagePlan && dietPlan) {
      const calories = weightage[weightagePlan][dietPlan];

      let totalCalories = 0;
      foods.forEach((food) => (totalCalories += food.calories));

      if (typeof calories !== "string") {
        if (totalCalories > calories) {
          setCaloriesMessage(`${totalCalories - calories} more calories utilized`);
          setPercentage(100);
        } else {
          setCaloriesMessage(`${calories - totalCalories} calories left`);
          const percentage = Math.round((totalCalories / calories) * 100);
          setPercentage(percentage);
        }
      } else {
        setCaloriesMessage(`${totalCalories} calories utilized`);
      }
    }
  }, [weightagePlan, dietPlan, foods]);

  if (!weightagePlan || !dietPlan) return <></>;

  if (typeof weightage[weightagePlan][dietPlan] === "string") {
    return (
      <Box paddingX={10} textAlign="center">
        <Text color={"#FFA049"} fontWeight="bold">
          {weightage[weightagePlan][dietPlan]}
        </Text>
        <Text fontWeight="bold" marginTop={3}>
          {caloriesMessage}
        </Text>
      </Box>
    );
  }

  return (
    <Box marginTop={5}>
      <Flex justifyContent="center" alignItems="center">
        <CircularProgress
          value={percentage}
          size={circleSize}
          thickness={circleThickness}
          color={"#FFA049"}
          trackColor="gray.200"
          capIsRound
        />
        <Box marginLeft={3}>
          <Box fontSize="xl" fontWeight="bold">
            Calories intake{" "}
            <Box display="inline" color={"#FFA049"}>
              {percentage + "%"}
            </Box>
          </Box>
          <Box color={"#FFA049"} fontWeight="bold">
            {caloriesMessage}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

// eslint-disable-next-line react/prop-types
function AddCaloryModal({ isOpen, onClose }) {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!foodName || !calories) {
      alert("Please fill all the fields");
      return;
    }

    setIsLoading(true);
    try {
      await saveNewFood({ calories, foodName });
      setIsLoading(false);
      onClose();
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Food Name</FormLabel>
            <Input
              placeholder="Food Name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Food Calorie</FormLabel>
            <Input
              placeholder="Food Calorie"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            {isLoading ? "Please wait ..." : "Save"}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
