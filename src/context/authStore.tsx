import { createContext, useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import firebase from "../firebase";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  userDetails: UserDetails | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    email: string,
    password: string,
    userDetails: UserDetails
  ) => Promise<boolean>;
  logout: () => void;
  updateUserDetailsInFirestore: (
    newUserDetails: Partial<UserDetails>
  ) => Promise<void>;
  getUpdatedUserDetailsFromFirestore: () => Promise<void>;
};

export type UserDetails = {
  name: string;
  surname: string;
  cell?: string;
  address?: string;
  lat: number;
  lng: number;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const auth = getAuth();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  async function login(email: string, password: string) {
    const success = await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return success;
  }

  function logout() {
    auth.signOut();
  }

  async function getUserDetailsFromFirestore(uid: string) {
    const docRef = doc(firebase.db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserDetails(() => docSnap.data() as UserDetails);
    } else {
      throw new Error("No such document!");
    }
  }

  async function updateUserDetailsInFirestore(
    newDetails: Partial<UserDetails>
  ) {
    if (!user) return;
    if (!userDetails) return;
    const docRef = doc(firebase.db, "users", user.uid);
    // compare new details to the current details and only update if they are different
    const changedProperties: Partial<UserDetails> = {};
    Object.entries(newDetails).forEach(([key, value]) => {
      if (userDetails[key as keyof UserDetails] !== value) {
        changedProperties[key as keyof UserDetails] = value;
      }
    });

    await updateDoc(docRef, { ...changedProperties });
  }

  async function signup(
    email: string,
    password: string,
    userDetails: UserDetails
  ) {
    const { name, surname } = userDetails;
    const success = await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(firebase.db, "users", user.uid), {
          name: name,
          surname: surname,
          createdAt: new Date(),
        });
        return true;
      })
      .catch((_err: unknown) => {
        return false;
      });
    return success;
  }

  async function getUpdatedUserDetailsFromFirestore() {
    if (user) {
      await getUserDetailsFromFirestore(user?.uid as string);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await getUserDetailsFromFirestore(user?.uid as string);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user, auth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userDetails,
        signup,
        login,
        logout,
        updateUserDetailsInFirestore,
        getUpdatedUserDetailsFromFirestore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthStore = () => useContext(AuthContext);
