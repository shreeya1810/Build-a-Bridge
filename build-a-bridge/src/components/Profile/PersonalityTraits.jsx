import React from 'react';
import { Box, Grid, Progress, Text } from '@chakra-ui/react';

const PersonalityTraits = ({ traits }) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      {Object.entries(traits).map(([key, value]) => (
        <Box key={key}>
          <Text>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
          <Progress value={value} size="sm" colorScheme="purple" />
        </Box>
      ))}
    </Grid>
  );
};

export default PersonalityTraits;
