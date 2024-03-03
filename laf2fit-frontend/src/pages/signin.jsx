import * as yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { Box, Center, Text, Input, Button, Link, Heading } from "@chakra-ui/react";
import { ErrorField } from "../components";
import { login } from "../controllers/user";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
  password: yup.string().min(8).max(30).required().label("Password"),
});

export default function SigninPage() {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        await login(values);
        setIsLoading(false);

        window.location.href = "/";
      } catch (_) {
        setIsLoading(false);
      }
    },
  });

  return (
    <Center h="100vh">
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
          Signin
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={4}>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              bg="gray.700"
              color="white"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <ErrorField message={formik.errors.email} />
          </Box>
          <Box mb={4}>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              bg="gray.700"
              color="white"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <ErrorField message={formik.errors.password} />
          </Box>
          <Button type="submit" colorScheme="blue" size="md" width="100%" bg="blue.500">
            {isLoading ? "Please wait ..." : "Sign In"}
          </Button>
        </form>
        <Box marginTop={5}>
          <Text>
            {"Don't"} have an account?{" "}
            <Link as={NavLink} textDecorationLine={"underline"} to="/auth/signup">
              Signup
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
