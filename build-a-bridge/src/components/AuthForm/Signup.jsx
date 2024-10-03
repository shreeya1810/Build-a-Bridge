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
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/firebase';  // Import the Firebase auth instance

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // To store error messages

  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Handle email/password sign-up
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", userCredential.user);
      setErrorMessage('');  // Clear any previous error messages on successful sign-up
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('This email is already signed up. Please log in.');
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  // Handle Google sign-up
  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google user:", result.user);
      setErrorMessage('');  // Clear error messages after successful sign-in
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Handle Facebook sign-up
  const handleFacebookSignUp = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Facebook user:", result.user);
      setErrorMessage('');  // Clear error messages after successful sign-in
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Handle Apple sign-up
  const handleAppleSignUp = async () => {
    const provider = new OAuthProvider('apple.com');
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Apple user:", result.user);
      setErrorMessage('');  // Clear error messages after successful sign-in
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Box
      p={6}
      w="md"
      h="auto"
      bgGradient="linear(to-r, Yellow.500, pink.600, purple.600)"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Stack spacing={4}>
        {/* Display error message (e.g., Already signed up) */}
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
            bg="white"
            color="black"
            _placeholder={{ color: 'gray.500' }}
            _focus={{ borderColor: 'blue.500' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        {/* Email Input */}
        <FormControl id="email">
          <Input
            type="email"
            placeholder="Email"
            bg="white"
            color="black"
            _placeholder={{ color: 'gray.500' }}
            _focus={{ borderColor: 'blue.500' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
              onChange={(e) => setPassword(e.target.value)}
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
          <Button bg="blue.400" color="white" _hover={{ bg: 'blue.500' }} onClick={handleSignUp}>
            Sign Up
          </Button>
        </Stack>

        {/* Social Media Sign Up */}
        <Center>
          <HStack spacing={4}>
            <IconButton icon={<FaGoogle />} aria-label="Google Sign-in" variant="outline" colorScheme="gray" onClick={handleGoogleSignUp} />
            <IconButton icon={<FaFacebook />} aria-label="Facebook Sign-in" variant="outline" colorScheme="gray" onClick={handleFacebookSignUp} />
            <IconButton icon={<FaApple />} aria-label="Apple Sign-in" variant="outline" colorScheme="gray" onClick={handleAppleSignUp} />
          </HStack>
        </Center>
      </Stack>
    </Box>
  );
}

export default SignUpForm;
