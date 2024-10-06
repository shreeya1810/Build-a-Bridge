import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  Textarea,
  Avatar,
  FormControl,
  FormLabel,
  Select,
  Flex,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { db } from '../../firebase/firebase'; // Adjust as needed
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase'; // Firebase auth
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const MotionBox = motion(Box); // Create a motion Box component

const ProfileCreationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(null); // Store date as Date object
  const [occupation, setOccupation] = useState('');
  const [sexualOrientation, setSexualOrientation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const lightGradient = 'linear(to-r, blue.400, pink.500, purple.600)';
  const darkGradient = 'linear(to-r, blue.500, pink.600, purple.500)';
  const backgroundGradient = useColorModeValue(lightGradient, darkGradient);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      setErrorMessage('User not authenticated');
      return;
    }

    try {
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        bio,
        email: user.email,
        profilePicture,
        gender,
        dob,
        occupation,
        sexualOrientation,
      });

      navigate('/home');
    } catch (error) {
      console.error('Error creating profile: ', error);
      setErrorMessage('Error creating profile, please try again.');
    }
  };

  const handleProfilePicChange = (e) => {
    setProfilePicture(URL.createObjectURL(e.target.files[0]));
  };

  const handleProfilePicRemove = () => {
    // Set to the default placeholder image when removed
    setProfilePicture('no_profile.png');
  };

  return (
    <MotionBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={8}
      bgGradient={backgroundGradient} // Gradient for the page
      animation="gradient 20s ease infinite"
      backgroundSize="300% 300%" // Gradient animation
      sx={{
        '@keyframes gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}
      initial={{ opacity: 0 }} // Initial state for motion
      animate={{ opacity: 1 }} // Animation to opacity 1
      transition={{ duration: 0.5 }} // Transition duration
    >
      <MotionBox
        width="100%" // Full width and height
        height="96vh"
        bg={useColorModeValue('gray.50', 'gray.800')}
        p={8}
        rounded="md"
        shadow="md"
        initial={{ scale: 0.9 }} // Initial scale for motion
        animate={{ scale: 1 }} // Animation to scale 1
        transition={{ duration: 0.5 }} // Transition duration
      >
        <Heading textAlign="center" mb={6} color={useColorModeValue('gray.700', 'white')}>Create Your Profile</Heading>

        {errorMessage && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>
        )}

        {/* Flex container to hold both sections side by side */}
        <Flex
          direction={['column', 'column', 'row']} // Stacks on mobile, side-by-side on larger screens
          justify="space-between"
          mb={6}
          gap={10} // Add gap between columns
        >
          {/* Personal Info Section */}
          <MotionBox flex="1" mr={[0, 0, 4]} mb={[6, 6, 0]} whileHover={{ scale: 1.02 }}>
            <Heading fontSize="xl" mb={4} color={useColorModeValue('gray.700', 'white')}>Personal Info</Heading>
          
        <Box textAlign="center" mb={6}>
          <Avatar
            src={profilePicture ? profilePicture : 'no_profile.png'} // Default profile picture
            size="2xl"
            mb={4}
          />
          <Flex justify="center" gap={4}>
            {profilePicture && profilePicture !== 'no_profile.png' ? (
              <>
                <Button
                  onClick={handleProfilePicRemove}
                  bg="red.400"
                  color="white"
                  _hover={{ bg: 'red.500' }}
                  _active={{ bg: 'red.600' }}
                >
                  Remove
                </Button>
                <Button
                  as="label"
                  bg="blue.400"
                  color="white"
                  _hover={{ bg: 'blue.500' }}
                  _active={{ bg: 'blue.600' }}
                >
                  Change
                  <Input type="file" onChange={handleProfilePicChange} display="none" />
                </Button>
              </>
            ) : (
              <Button
                as="label"
                bg="blue.400"
                color="white"
                borderRadius="full"
                py={6}
                _hover={{ bg: 'blue.500' }}
                _active={{ bg: 'blue.600' }}
              >
                Upload Profile Picture
                <Input type="file" onChange={handleProfilePicChange} display="none" />
              </Button>
            )}
          </Flex>
        </Box>

            <Stack spacing={4}>
              <FormControl>
                <FormLabel color={useColorModeValue('gray.700', 'gray.50')}>First Name</FormLabel>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  bg={useColorModeValue('gray.100', 'gray.600')}
                  placeholder='John'
                  color={useColorModeValue('gray.700', 'white')}
                  borderRadius="8px"
                  _placeholder={{ color: 'gray.500' }}
                  bg={useColorModeValue('gray.100', 'gray.600')}
                />
              </FormControl>

              <FormControl>
                <FormLabel color={useColorModeValue('black', 'gray.50')}>Last Name</FormLabel>
                <Input
                  value={lastName}
                  placeholder='Doe'
                  onChange={(e) => setLastName(e.target.value)}
                  bg="gray.50"
                  color={useColorModeValue('gray.700', 'white')}
                  bg={useColorModeValue('gray.100', 'gray.600')}
                  borderRadius="8px"
                  _placeholder={{ color: 'gray.500' }}
                />
              </FormControl>

              <FormControl>
                <FormLabel color={useColorModeValue('black', 'gray.50')}>Bio</FormLabel>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  // bg="gray.50"
                  color={useColorModeValue('gray.700', 'white')}
                  borderRadius="8px"
                  placeholder='Hey! I sing.'
                  _placeholder={{ color: 'gray.500' }}
                  bg={useColorModeValue('gray.100', 'gray.600')}
                  minHeight="100px" // Ensure minimum height for consistency
                  maxHeight="120px" // Set a maximum height
                  overflowY="auto" // Make it scrollable
                  resize="none"
                />
              </FormControl>
            </Stack>
          </MotionBox>

          {/* Additional Info Section */}
          <MotionBox flex="1" whileHover={{ scale: 1.02 }}>
            <Heading fontSize="xl" mb={4} color={useColorModeValue('gray.700', 'white')}>Additional Info</Heading>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel color={useColorModeValue('black', 'gray.50')}>Gender</FormLabel>
                <Select
                  placeholder="Select gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  color="gray.500"
                  borderRadius="8px"
                  bg={useColorModeValue('gray.100', 'gray.600')}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-Binary</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-say">Prefer Not to Say</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel color={useColorModeValue('black', 'gray.50')}>Date of Birth</FormLabel>
                <DatePicker
                  selected={dob}
                  onChange={(date) => setDob(date)}
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  customInput={
                    <Input
                      bg="gray.50"
                      color={useColorModeValue('gray.700', 'white')}
                      borderRadius="8px"
                      _placeholder={{ color: 'gray.500' }}
                      bg={useColorModeValue('gray.100', 'gray.600')}
                    />
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel color={useColorModeValue('black', 'gray.50')}>Occupation</FormLabel>
                <Input
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  bg={useColorModeValue('gray.100', 'gray.600')}
                  color={useColorModeValue('gray.700', 'white')}
                  borderRadius="8px"
                  bg={useColorModeValue('gray.100', 'gray.600')}
                  placeholder="Musician"
                  _placeholder={{ color: 'gray.500' }}
                />
              </FormControl>

              <FormControl>
                <FormLabel color={useColorModeValue('black', 'gray.50')}>Sexual Orientation</FormLabel>
                <Select
                  placeholder="Select sexual orientation"
                  value={sexualOrientation}
                  onChange={(e) => setSexualOrientation(e.target.value)}
                  bg={useColorModeValue('gray.100', 'gray.600')}
                  color="gray.500"
                  borderRadius="8px"
                >
                  <option value="straight">Straight</option>
                  <option value="gay">Gay</option>
                  <option value="lesbian">Lesbian</option>
                  <option value="bisexual">Bisexual</option>
                  <option value="asexual">Asexual</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-say">Prefer Not to Say</option>
                </Select>
              </FormControl>
            </Stack>
          </MotionBox>
        </Flex>

        {/* Save and Submit Buttons */}
        <Flex justifyContent="center" mt={6}>
          <Button
            bg="green.400"
            color="white"
            borderRadius="full"
            py={6}
            mr={4}
            _hover={{ bg: 'green.500' }}
            _active={{ bg: 'green.600' }}
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
            onClick={() => alert('Profile saved!')}
          >
            Save Profile
          </Button>

          <Button
            bg="blue.400"
            color="white"
            borderRadius="full"
            py={6}
            _hover={{ bg: 'blue.500' }}
            _active={{ bg: 'blue.600' }}
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
            type="submit"
            onClick={handleProfileSubmit}
          >
            Submit Profile
          </Button>
        </Flex>
      </MotionBox>
    </MotionBox>
  );
};

export default ProfileCreationForm;
