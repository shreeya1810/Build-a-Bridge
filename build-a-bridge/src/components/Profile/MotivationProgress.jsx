import React from 'react';
import { Grid, Progress, Text } from '@chakra-ui/react';

const MotivationProgress = ({ motivations }) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      {Object.entries(motivations).map(([key, value]) => (
        <Box key={key}>
          <Text>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
          <Progress value={value} size="sm" colorScheme="blue" />
        </Box>
      ))}
    </Grid>
  );
};

export default MotivationProgress;
