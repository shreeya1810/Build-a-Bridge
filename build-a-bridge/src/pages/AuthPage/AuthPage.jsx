import { useState } from "react";
import { Container, Flex, Box, Image, Text } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";  // Login form
import SignUpForm from "../../components/AuthForm/Signup";  // Signup form
import { motion } from "framer-motion"; // Import motion from Framer Motion

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-r, yellow.400, pink.500, purple.600, pink.500)"  // Gradient for the page
      animation="gradient 8s ease infinite"
      backgroundSize="300% 300%"  // Gradient animation
      sx={{
        '@keyframes gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}
    >
      <Container maxW="container.sm" centerContent>
        <Flex direction="column" align="center" justify="center" height="100vh">
          {/* Logo */}
          <Image src="logo.png" alt="Build A Bridge Logo" boxSize="150px" mb={8} />

          {/* Conditional rendering with smooth transitions */}
          <motion.div
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, x: isLogin ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 100 : -100 }}
            transition={{ duration: 0.5 }}
          >
            {isLogin ? <AuthForm /> : <SignUpForm />}
          </motion.div>

          {/* Smooth transition for toggle text */}
          <motion.div
            key={isLogin ? "switch-to-signup" : "switch-to-login"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Text
              mt={4}
              fontWeight="bold"
              color="white"
              textAlign="center"
              onClick={handleToggle}
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </Text>
          </motion.div>
        </Flex>
      </Container>
    </Box>
  );
};

export default AuthPage;
