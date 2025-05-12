import { createContext } from "react";
import { User } from "../types/user";

type AuthContextValue = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
