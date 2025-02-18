import { collection, getDocs } from "firebase/firestore";
import { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase";

export type Meat = "chicken" | "beef" | "lamb" | "sausage";

type MeatOptions = {
  [key in Meat]: {
    cuts: {
      name: string;
      price: number;
      id: string;
    }[];
    flavours: {
      name: string;
      price: number;
      id: string;
    }[];
  };
};

type MeatContextType = {
  meatOptions: Partial<MeatOptions>;
  loading: boolean;
  meats: Meat[];
};

type MeatProviderProps = {
  children: React.ReactNode;
};

const MeatContext = createContext<MeatContextType | null>(null);

export default function MeatProvider({ children }: MeatProviderProps) {
  const [meatOptions, setMeatOptions] = useState<Partial<MeatOptions>>({});
  const [loading, setLoading] = useState(false);
  const [meats, setMeats] = useState<Meat[]>([]);

  useEffect(() => {
    async function fetchMeatData() {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "meats"));
        const meatIds = querySnapshot.docs.map((doc) => doc.id as Meat);

        const meatOptionsPromises = meatIds.map(async (meat) => {
          const [cutsSnapshot, flavoursSnapshot] = await Promise.all([
            getDocs(collection(db, `meats/${meat}/cuts`)),
            getDocs(collection(db, `meats/${meat}/flavours`)),
          ]);

          return {
            meat,
            data: {
              cuts: cutsSnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              })),
              flavours: flavoursSnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              })),
            },
          };
        });

        const results = await Promise.all(meatOptionsPromises);
        const options = results.reduce(
          (acc, { meat, data }) => ({
            ...acc,
            [meat]: data,
          }),
          {}
        );

        console.log(options);
        setMeatOptions(options);
        setMeats(meatIds);
      } catch (error) {
        console.error("Error fetching meat data:", error);
        // Consider adding error state and UI handling
      } finally {
        setLoading(false);
      }
    }

    fetchMeatData();
  }, []);
  return (
    <MeatContext.Provider
      value={{
        meats,
        meatOptions,
        loading,
      }}
    >
      {children}
    </MeatContext.Provider>
  );
}

export const useMeatStore = () => useContext(MeatContext);
