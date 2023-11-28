import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw Error("useAuthContext mush be wrapped inside an AuthContextProvider");

  return context;
};
