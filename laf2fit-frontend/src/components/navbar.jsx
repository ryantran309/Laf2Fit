import { FiUser } from "react-icons/fi";
import { GiMeal } from "react-icons/gi";
import { useSelector } from "react-redux";
import { FaDumbbell } from "react-icons/fa";
import { BiCheckShield } from "react-icons/bi";
import { AiOutlineSchedule } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const username = useSelector((state) => state.user.name);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.location.reload();
    toast("Successfully logout", { type: "success" });
  };

  return (
    <Box bg={"#324359"} py={4}>
      <Flex maxW="1200px" mx="auto" px={4} align="center">
        <Heading
          as="h1"
          size="lg"
          color={"gray.100"}
          marginRight={4}
          onClick={() => navigate("/")}
          cursor={"pointer"}
          bg={"#324359"}
        >
          LAF2FIT
        </Heading>
        <Spacer />
        <Box>
          <NavLink to="/" style={{ color: "gray.100", marginRight: "16px" }}>
            Home
          </NavLink>
          <NavLink to="/about" style={{ color: "gray.100", marginRight: "16px" }}>
            About
          </NavLink>

          {!isLoggedIn && (
            <Button bg={"tomato"} size={"sm"} onClick={() => navigate("/auth/signup")}>
              Join Now
            </Button>
          )}

          {isLoggedIn && (
            <>
              <Button
                size="sm"
                leftIcon={<BiCheckShield />}
                colorScheme="gray"
                variant="solid"
                onClick={() => navigate("/plan")}
              >
                Plan
              </Button>
              <Button
                size="sm"
                marginLeft={2}
                leftIcon={<AiOutlineSchedule />}
                colorScheme="gray"
                variant="solid"
                onClick={() => navigate("/excercise-schedule")}
              >
                Excercise Schedule
              </Button>
              <Button
                size="sm"
                marginLeft={2}
                leftIcon={<GiMeal />}
                colorScheme="gray"
                variant="solid"
                onClick={() => navigate("/calories-calculator")}
              >
                Calories Calculator
              </Button>
              <Button
                size="sm"
                marginLeft={2}
                leftIcon={<FaDumbbell />}
                colorScheme="gray"
                variant="solid"
                onClick={() => navigate("/virtual-trainer")}
              >
                Virtual Trainer
              </Button>

              <Menu>
                <MenuButton
                  as={IconButton}
                  size="sm"
                  icon={<FiUser />}
                  aria-label="Options"
                  variant="outline"
                  marginLeft={2}
                />
                <MenuList zIndex={100}>
                  <MenuItem onClick={() => navigate("/profile")}>{username}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
