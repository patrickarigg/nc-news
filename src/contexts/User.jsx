import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(sessionStorage.getItem("user") || "");

  useEffect(() => {
    sessionStorage.setItem("user", "grumpy19");
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
