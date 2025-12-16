import { getProteins } from "@/lib/api";
import { MeatOptions } from "@/lib/api/types";
import { createContext, useState, useEffect } from "react";

type MeatContextType = {
  meatOptions: MeatOptions | null;
  loading: boolean;
  meats: string[];
};

type MeatProviderProps = {
  children: React.ReactNode;
};

export const MeatContext = createContext<MeatContextType | null>(null);

export default function MeatProvider({ children }: MeatProviderProps) {
  const [meatOptions, setMeatOptions] = useState<MeatOptions | null>(null);
  const [loading, setLoading] = useState(false);
  const [meats, setMeats] = useState<string[]>([]);

  useEffect(() => {
    setMeats(meatOptions ? Object.keys(meatOptions) : []);
  }, [meatOptions]);

  useEffect(() => {
    async function fetchMeatData() {
      try {
        setLoading(true);
        const protein = await getProteins();
        setMeatOptions(protein as unknown as MeatOptions);
      } catch (error: unknown) {
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
