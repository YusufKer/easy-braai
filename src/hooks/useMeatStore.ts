import { MeatContext } from "@/context/meatStore";
import { useContext } from "react";

export const useMeatStore = () => useContext(MeatContext);
