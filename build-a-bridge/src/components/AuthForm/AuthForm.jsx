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
import { auth } from '../../firebase/firebase';

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        setErrorMessage('Wrong password. Please try again.');
      } else if (error.code === 'auth/user-not-found') {
        setErrorMessage('No account found with this email.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('Invalid email format.');
      } else if (error.code === 'auth/too-many-requests') {
        setErrorMessage('Too many failed login attempts. Try again later.');
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <Center h="20h" bg="gray.50">
      <Box
        p={8}
        w="400px"
        borderRadius="20px"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        backgroundImage="url('scenery.png')" // Background image URL or import
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Stack spacing={6}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="gray.700">
            Login to Your Account
          </Text>

          {/* Display error message */}
          {errorMessage && (
            <Center>
              <Text color="red.500" fontWeight="bold">{errorMessage}</Text>
            </Center>
          )}

          {/* Email Input */}
          <FormControl id="email">
            <InputGroup>
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
            </InputGroup>
          </FormControl>

          {/* Password Input with Show Password */}
          <FormControl id="password">
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
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
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
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
              onClick={handleLogin}
              boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
            >
              Login
            </Button>
            <Center>
              <Link color="blue.400" fontWeight="bold" _hover={{ textDecoration: 'underline' }}>
                Forgot password?
              </Link>
            </Center>
          </Stack>

          {/* Social Media Sign In */}
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

export default AuthForm;
