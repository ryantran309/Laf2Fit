import * as yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Center, Text, Input, Button, Link, Heading } from "@chakra-ui/react";
import { ErrorField } from "../components";
import { register } from "../controllers/user";

const initialValues = {
  name: "",
  phoneNumber: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().min(5).required().label("Name"),
  phoneNumber: yup.string().required().label("Phone Number"),
  address: yup.string().required().label("Address"),
  email: yup.string().email().required().label("Email"),
  password: yup.string().min(8).max(30).required().label("Password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export default function SignupPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await register(values);
        setIsLoading(false);

        navigate("/auth/signin");
      } catch (_) {
        setIsLoading(false);
      }
    },
  });

  return (
    <Center minH="100vh" padding={5}>
      <Box
        maxW="400px"
        w="100%"
        p={6}
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
        bg="gray.900"
        color="white"
      >
        <Heading fontSize="3xl" mb={4}>
          Signup
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={4}>
            <Input
              placeholder="Name"
              bg="gray.700"
              color="white"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <ErrorField message={formik.errors.name} />
          </Box>
          <Box mb={4}>
            <Input
              placeholder="Phone Number"
              bg="gray.700"
              color="white"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
            <ErrorField message={formik.errors.phoneNumber} />
          </Box>

          <Box mb={4}>
            <Input
              placeholder="Address"
              bg="gray.700"
              color="white"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            <ErrorField message={formik.errors.address} />
          </Box>

          <Box mb={4}>
            <Input
              type="email"
              placeholder="Email"
              bg="gray.700"
              color="white"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <ErrorField message={formik.errors.email} />
          </Box>

          <Box mb={4}>
            <Input
              type="password"
              placeholder="Password"
              bg="gray.700"
              color="white"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <ErrorField message={formik.errors.password} />
          </Box>

          <Box mb={4}>
            <Input
              type="password"
              placeholder="Confirm Password"
              bg="gray.700"
              color="white"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            <ErrorField message={formik.errors.confirmPassword} />
          </Box>

          <Button type="submit" disabled colorScheme="blue" size="md" width="100%" bg="blue.500">
            {isLoading ? "Please wait ..." : "Sign Up"}
          </Button>
        </form>
        <Box marginTop={5}>
          <Text>
            Already have an account?{" "}
            <Link as={NavLink} textDecorationLine={"underline"} to="/auth/signin">
              Signin
            </Link>
          </Text>
        </Box>
        <Box marginTop={3}>
          <Link as={NavLink} to="/" textDecorationLine={"underline"}>
            Back to Home!
          </Link>
        </Box>
      </Box>
    </Center>
  );
}
