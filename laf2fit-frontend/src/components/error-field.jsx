import { Text } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
export default function ErrorField({ message }) {
  if (!message) return <></>;

  return <Text color="tomato">{message}</Text>;
}
