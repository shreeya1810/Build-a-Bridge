// src/utils/userUtils.js

import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "../firebase/firebase"; // Ensure the correct Firebase import

const db = getFirestore();

// Function to get email by username
const getUserByUsername = async (username) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null; // No user found with this username
  } else {
    return querySnapshot.docs[0].data().email; // Return the email associated with the username
  }
};

export getUserByUsername;
