import { useState } from "react";
import { Container, Flex, Box, Image, Text } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";  // Login form
import SignUpForm from "../../components/AuthForm/Signup";  // Signup form

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

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

          {/* Conditional rendering of AuthForm or SignUpForm */}
          {isLogin ? <AuthForm /> : <SignUpForm />}

          {/* Move sign-up and login text outside the box */}
          <Text mt={4} fontWeight="bold" color="white" textAlign="center" onClick={() => setIsLogin(!isLogin)} cursor="pointer">
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default AuthPage;
