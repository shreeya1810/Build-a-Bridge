import React, { useState, useEffect } from 'react';
import { Box, Avatar, Stack, Text, Button, Input } from '@chakra-ui/react';
import { db, auth } from '../../firebase/firebase';  // Import Firebase setup
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [newBio, setNewBio] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleUpdateBio = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { bio: newBio });
      setUserData((prevData) => ({ ...prevData, bio: newBio }));
      setEditMode(false);
    }
  };

  return (
    <Box p={5}>
      <Stack direction="column" align="center">
        <Avatar size="2xl" name={userData.username} />
        <Text fontSize="2xl">{userData.username}</Text>
        <Text fontSize="md">{userData.email}</Text>
        {!editMode ? (
          <Text fontSize="lg">{userData.bio || 'This user has no bio yet'}</Text>
        ) : (
          <Input
            placeholder="Enter your new bio"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
          />
        )}
        {!editMode ? (
          <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
        ) : (
          <Button onClick={handleUpdateBio}>Save Changes</Button>
        )}
      </Stack>
    </Box>
  );
};

export default ProfilePage;
