import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const ProfileSection = ({ title, children }) => {
  return (
    <Box mt={6}>
      <Text fontWeight="bold" fontSize="lg">{title}</Text>
      {children}
    </Box>
  );
};

export default ProfileSection;
