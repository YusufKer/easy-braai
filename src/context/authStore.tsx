import { createContext, useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import firebase from "../firebase";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    email: string,
    password: string,
    userDetails: UserDetails
  ) => Promise<boolean>;
  logout: () => void;
};

type UserDetails = {
  name: string;
  surname: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const auth = getAuth();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

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
      .catch((err) => {
        console.log(err);
        return false;
      });
    return success;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthStore = () => useContext(AuthContext);
