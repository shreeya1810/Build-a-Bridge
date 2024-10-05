import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  Stack,
  Center,
  InputGroup,
  InputRightElement,
  IconButton,
  HStack,
  Text
} from '@chakra-ui/react';
import { FaGoogle, FaApple, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import { signUp } from '../../firebase/auth';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSignUp = async () => {
    setErrorMessage('');
    try {
      const userCredential = await signUp(email, password);
      console.log("User created:", userCredential);
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorMessage('This email is already signed up. Please log in.');
          break;
        case 'auth/invalid-email':
          setErrorMessage('The email address is not valid.');
          break;
        case 'auth/weak-password':
          setErrorMessage('Password is too weak.');
          break;
        default:
          setErrorMessage('Sign-up failed. Please try again.');
      }
    }
  };

  return (
    <Center h="20h" bg="gray.50">
      <Box
        p={8}
        w="400px"
        bg="white"
        borderRadius="20px"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
      >
        <Stack spacing={6}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="gray.700">
            Create an Account
          </Text>

          {errorMessage && (
            <Center>
              <Text color="red.500" fontWeight="bold">{errorMessage}</Text>
            </Center>
          )}

          {/* Username Input */}
          <FormControl id="username">
            <Input
              type="text"
              placeholder="Username"
              bg="gray.100"
              borderRadius="full"
              color="gray.700"
              _placeholder={{ color: 'gray.500' }}
              _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              p={6}
            />
          </FormControl>

          {/* Email Input */}
          <FormControl id="email">
            <Input
              type="email"
              placeholder="Email"
              bg="gray.100"
              borderRadius="full"
              color="gray.700"
              _placeholder={{ color: 'gray.500' }}
              _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              p={6}
            />
          </FormControl>

          {/* Password Input */}
          <FormControl id="password">
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                bg="gray.100"
                borderRadius="full"
                color="gray.700"
                _placeholder={{ color: 'gray.500' }}
                _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                p={6}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  icon={showPassword ? <FaEyeSlash color="gray.500" /> : <FaEye color="gray.500" />}
                  onClick={toggleShowPassword}
                  variant="ghost"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  borderRadius="full"
                  _hover={{ bg: 'transparent' }}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Stack spacing={6}>
            <Button
              bg="blue.400"
              color="white"
              borderRadius="full"
              py={6}
              _hover={{ bg: 'blue.500' }}
              _active={{ bg: 'blue.600' }}
              onClick={handleSignUp}
              boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
            >
              Sign Up
            </Button>
          </Stack>

          {/* Social Media Sign Up */}
          <Center>
            <HStack spacing={4}>
              <IconButton
                icon={<FaGoogle />}
                aria-label="Google Sign-in"
                variant="outline"
                borderRadius="full"
                p={4}
                color="gray.500"
                _hover={{ color: 'blue.400', borderColor: 'blue.400' }}
              />
              <IconButton
                icon={<FaFacebook />}
                aria-label="Facebook Sign-in"
                variant="outline"
                borderRadius="full"
                p={4}
                color="gray.500"
                _hover={{ color: 'blue.400', borderColor: 'blue.400' }}
              />
              <IconButton
                icon={<FaApple />}
                aria-label="Apple Sign-in"
                variant="outline"
                borderRadius="full"
                p={4}
                color="gray.500"
                _hover={{ color: 'blue.400', borderColor: 'blue.400' }}
              />
            </HStack>
          </Center>
        </Stack>
      </Box>
    </Center>
  );
};

export default SignUpForm;
