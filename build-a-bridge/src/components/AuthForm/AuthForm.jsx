import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  Stack,
  Link,
  Center,
  InputGroup,
  InputRightElement,
  IconButton,
  HStack,
  Text,
} from '@chakra-ui/react';
import { FaGoogle, FaApple, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase'; // Adjust the path according to your project structure

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    setErrorMessage(''); // Reset error message
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Successful login; you can redirect to homepage here if needed
      console.log('Login successful');
    } catch (error) {
      console.log(error.code);
      // Check if the error is related to a wrong password or user not found
      if (error.code === 'auth/invalid-credential') {
        setErrorMessage('Wrong password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('No account found with this email.');
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <Box
      p={6}
      w="md"
      h="auto"
      bgGradient="linear(to-r, Yellow.500, pink.600, purple.600)"  // Gradient for the auth box
      borderRadius="lg"
      boxShadow="lg"
    >
      <Stack spacing={4}>
        {/* Display error message */}
        {errorMessage && (
          <Center>
            <Text color="white" fontWeight="regular">{errorMessage}</Text>
          </Center>
        )}

        {/* Email Input */}
        <FormControl id="email">
          <InputGroup>
            <Input
              type="email"
              placeholder="Email or Username"
              bg="white"
              color="black"
              _placeholder={{ color: 'gray.500' }}
              _focus={{ borderColor: 'blue.500' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
          </InputGroup>
        </FormControl>

        {/* Password Input with Show Password */}
        <FormControl id="password">
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              bg="white"
              color="black"
              _placeholder={{ color: 'gray.500' }}
              _focus={{ borderColor: 'blue.500' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
            <InputRightElement>
              <IconButton
                icon={showPassword ? <FaEyeSlash color="black" /> : <FaEye color="black" />}
                onClick={toggleShowPassword}
                variant="ghost"
                aria-label={showPassword ? "Hide password" : "Show password"}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Stack spacing={6}>
          <Button bg="blue.400" color="white" _hover={{ bg: 'blue.500' }} onClick={handleLogin}>
            Login
          </Button>
          <Center>
            <Link color="white" fontWeight="bold">Forgot password?</Link>
          </Center>
        </Stack>

        {/* Social Media Sign In */}
        <Center>
          <HStack spacing={4}>
            <IconButton icon={<FaGoogle />} aria-label="Google Sign-in" variant="outline" colorScheme="gray" />
            <IconButton icon={<FaFacebook />} aria-label="Facebook Sign-in" variant="outline" colorScheme="gray" />
            <IconButton icon={<FaApple />} aria-label="Apple Sign-in" variant="outline" colorScheme="gray" />
          </HStack>
        </Center>
      </Stack>
    </Box>
  );
}

export default AuthForm;
