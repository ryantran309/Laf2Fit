import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Flex,
  Input,
  Button,
  Box,
  Heading,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  Alert,
} from "@chakra-ui/react";

import BaseLayout from "../layouts";
import { ErrorField } from "../components";
import { updateProfile } from "../controllers/user";

const validationSchema = yup.object().shape({
  name: yup.string().min(5).notRequired().label("Name"),
  phoneNumber: yup.string().notRequired().label("Phone Number"),
  address: yup.string().notRequired().label("Address"),
  password: yup.string().min(8).max(30).notRequired().label("Password"),
  confirmPassword: yup
    .string()
    .test("passwords-match", "Passwords must match", function (value) {
      return value === this.parent.password;
    })
    .notRequired("Password confirmation is required"),
  weight: yup.number().notRequired().label("Weight"),
  height: yup.number().notRequired().label("Height"),
});

function calculateBMI(weight, height) {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return bmi.toFixed(2);
}

function getSuitablePlan(bmi) {
  if (bmi < 18.5) return "Weight Gain"; // means it is under-weight
  return "Weight Loss"; // means it is over-weight
}

export default function ProfilePage() {
  const user = useSelector((state) => state.user);
  const [suggestedPlan, setSuggestedPlan] = useState(() => user.plan);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWeightOrHeightModified, setIsWeightOrHeightModified] = useState(false);
  const [userFields, setUserFields] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    weight: "",
    height: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setUserFields((userFields) => ({
      ...userFields,
      name: user.name,
      phoneNumber: user.phoneNumber,
      address: user.address,
      weight: user.weight,
      height: user.height,
    }));
  }, [user]);

  useEffect(() => {
    if (!isWeightOrHeightModified) return;

    if (+userFields.weight === 0 || +userFields.height === 0) {
      setSuggestedPlan(undefined);
      return;
    }

    const bmi = calculateBMI(userFields.weight, userFields.height);
    const plan = getSuitablePlan(bmi);
    setSuggestedPlan(plan);
  }, [userFields.weight, userFields.height, isWeightOrHeightModified]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: userFields,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await updateProfile({ ...values, plan: suggestedPlan });
        setIsLoading(false);
      } catch (_) {
        setIsLoading(false);
      }
    },
  });

  const handleChangeInput = (e) => {
    if (e.target.name === "weight" || e.target.name === "height") {
      setIsWeightOrHeightModified(true);
    }

    setUserFields((userFields) => ({ ...userFields, [e.target.name]: e.target.value }));
    formik.handleChange(e);
  };

  const handleCloseModal = (plan) => {
    if (!plan) {
      setIsModalOpen(false);
      return;
    }

    setSuggestedPlan(plan);
    setIsModalOpen(false);
  };

  const getBMIButtonColor = () => {
    const bmi = parseFloat(calculateBMI(+userFields.weight, +userFields.height));
    if (bmi < 18.5) return "blue.500";
    else if (bmi > 18.5 && bmi <= 24.9) return "green.500";
    else if (bmi > 24.9 && bmi <= 29.9) return "yellow.500";
    return "tomato";
  };

  const getWeightageTextMsg = () => {
    const bmi = parseFloat(calculateBMI(+userFields.weight, +userFields.height));
    if (bmi < 18.5) return "underweight";
    else if (bmi > 18.5 && bmi <= 24.9) return "normalweight";
    else if (bmi > 24.9 && bmi <= 29.9) return "overweight";
    return "obese";
  };

  const getRecommendPlan = () => {
    const bmi = parseFloat(calculateBMI(+userFields.weight, +userFields.height));
    if (bmi < 18.5) return "Weight Gain Plan";
    else if (bmi > 18.5 && bmi <= 24.9) return "Self Change Plan";
    else if (bmi > 24.9 && bmi <= 29.9) return "Weight Loss Plan";
    return "Weight Loss Plan";
  };

  return (
    <BaseLayout>
      <ChangePlanPopup
        isOpen={isModalOpen}
        currentPlan={suggestedPlan}
        onClose={handleCloseModal}
      />

      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Heading fontSize="3xl" mb={4}>
          Profile
        </Heading>

        <Box width={500}>
          <form onSubmit={formik.handleSubmit}>
            <Box mb={4}>
              <Input
                name="name"
                placeholder="Name"
                bg="gray.700"
                color="white"
                value={formik.values.name}
                onChange={handleChangeInput}
              />
              <ErrorField message={formik.errors.name} />
            </Box>
            <Box mb={4}>
              <Input
                placeholder="Phone Number"
                name="phoneNumber"
                bg="gray.700"
                color="white"
                value={formik.values.phoneNumber}
                onChange={handleChangeInput}
              />
              <ErrorField message={formik.errors.phoneNumber} />
            </Box>
            <Box mb={4}>
              <Input
                placeholder="Address"
                name="address"
                bg="gray.700"
                color="white"
                value={formik.values.address}
                onChange={handleChangeInput}
              />
              <ErrorField message={formik.errors.address} />
            </Box>
            <Box mb={4}>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                bg="gray.700"
                color="white"
                value={formik.values.password}
                onChange={handleChangeInput}
              />
              <ErrorField message={formik.errors.password} />
            </Box>
            <Box mb={4}>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                bg="gray.700"
                color="white"
                value={formik.values.confirmPassword}
                onChange={handleChangeInput}
              />
              <ErrorField message={formik.errors.confirmPassword} />
            </Box>
            <Box mb={4}>
              <Input
                placeholder="Weight in kg"
                type="number"
                name="weight"
                bg="gray.700"
                color="white"
                value={formik.values.weight}
                onChange={handleChangeInput}
              />
              <ErrorField message={formik.errors.weight} />
            </Box>
            <Box mb={4}>
              <Input
                placeholder="Height in cm"
                type="number"
                name="height"
                bg="gray.700"
                color="white"
                value={formik.values.height}
                onChange={handleChangeInput}
              />
              <ErrorField message={formik.errors.height} />
            </Box>
            {userFields.weight > 0 && userFields.height > 0 && (
              <Alert
                cursor="unset"
                size="xs"
                color={"white"}
                bgColor={getBMIButtonColor()}
                colorScheme="white"
                padding={1}
                width="100%"
                marginBottom={5}
                py={7}
                textAlign="center"
                borderRadius={7}
                paddingX={5}
                display="flex"
                flexDir="column"
              >
                <Box>BMI: {calculateBMI(+userFields.weight, +userFields.height)}</Box>
                <Box as="span" display="block" maxWidth="90%" marginTop={3}>
                  You are currently {getWeightageTextMsg()}. We recommend you to choose{" "}
                  {getRecommendPlan()}!
                </Box>
              </Alert>
            )}
            {suggestedPlan && (
              <Flex gap={3}>
                <Button cursor="unset" size="xs" padding={1} width="100%" marginBottom={5} py={7}>
                  Current Plan: {suggestedPlan}
                </Button>
                <Button
                  cursor="pointer"
                  size="xs"
                  padding={1}
                  width="100%"
                  marginBottom={5}
                  py={7}
                  onClick={() => setIsModalOpen(true)}
                >
                  Change Plan if you want
                </Button>
              </Flex>
            )}
            <Button type="submit" colorScheme="blue" size="md" width="100%" bg="blue.500">
              {isLoading ? "Please wait ..." : "Update"}
            </Button>
          </form>
        </Box>
      </Flex>
    </BaseLayout>
  );
}

function ChangePlanPopup({ isOpen, currentPlan, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={() => onClose("")}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Change Plan</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Button
            marginBottom={5}
            width="100%"
            py={7}
            colorScheme={currentPlan === "Weight Loss" ? "facebook" : "gray"}
            onClick={() => onClose("Weight Loss")}
          >
            Weight Loss
          </Button>
          <Button
            marginBottom={5}
            width="100%"
            py={7}
            colorScheme={currentPlan === "Weight Gain" ? "facebook" : "gray"}
            onClick={() => onClose("Weight Gain")}
          >
            Weight Gain
          </Button>
          <Button
            marginBottom={5}
            width="100%"
            py={7}
            colorScheme={currentPlan === "Self Change" ? "facebook" : "gray"}
            onClick={() => onClose("Self Change")}
          >
            Self-Change
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
