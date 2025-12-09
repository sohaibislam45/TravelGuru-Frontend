import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "../firebase/config";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (email, password, name, photoURL) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      if (name || photoURL) {
        await updateProfile(userCredential.user, {
          displayName: name || "",
          photoURL: photoURL || "",
        });
      }

      toast.success("Registration successful!");
      return userCredential.user;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("Login successful!");
      return userCredential.user;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Add scopes to ensure we get profile information including photo
      provider.addScope('profile');
      provider.addScope('email');
      
      const userCredential = await signInWithPopup(auth, provider);
      
      // Get additional user info which contains the profile picture
      const additionalUserInfo = getAdditionalUserInfo(userCredential);
      
      // Get photoURL from userCredential (Firebase sets it automatically) or from additionalUserInfo
      const photoURL = userCredential.user?.photoURL || additionalUserInfo?.profile?.picture;
      
      // Always ensure photoURL is set on the user profile
      if (userCredential.user && photoURL) {
        // Update profile with photoURL to ensure it's persisted (even if it's already set)
        await updateProfile(userCredential.user, {
          photoURL: photoURL,
        });
        // Reload to get the latest user data
        await userCredential.user.reload();
        // Update state with the reloaded user
        setUser(auth.currentUser);
      }
      
      toast.success("Google sign-in successful!");
      return userCredential.user;
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

