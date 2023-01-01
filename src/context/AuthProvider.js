import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import app from "./firebase.config";

const auth = getAuth(app);
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    return signOut(auth).then((res) => localStorage.removeItem("Token"));
  };

  const profile = (name, photo) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  const editEmail = () => {
    updateEmail(auth.currentUser, "258@gmail.com")
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const [userData, setUserData] = useState({});
  const [togol, setTotol] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:5000/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error(err));
  }, [user?.email, togol]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    userData,
    setTotol,
    setUserData,
    signUp,
    signIn,
    profile,
    logOut,
    editEmail,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
