import { Button, Flex, Box, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import ProfileCreation from './pages/ProfilePage/ProfileCreation';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Flex direction="column" minHeight="100vh">
        <Flex justify="space-between" align="center" p={4} bg={useColorModeValue('gray.200', 'gray.700')}>
          <Box>
            <Button size="sm" onClick={toggleColorMode} variant="outline" colorScheme="teal" p={2}>
              Switch to {colorMode === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
          </Box>
        </Flex>
        <Box flex="1">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path="/profile-creation" element={<ProfileCreation />} />
          </Routes>
        </Box>
      </Flex>
    </>
  );
}

export default App;
