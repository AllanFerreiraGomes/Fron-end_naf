import React, { createContext, useContext, useState, useEffect } from "react";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setusuario] = useState(null);

  useEffect(() => {
    const storedusuario = JSON.parse(localStorage.getItem("usuario"));
    if (storedusuario) {
      setusuario(storedusuario);
    }
  }, []);

  const updateusuario = (usuarioData) => {
    setusuario(usuarioData);
    localStorage.setItem("usuario", JSON.stringify(usuarioData));
  };

  return (
    <userContext.Provider value={{ usuario, updateusuario }}>
      {children}
    </userContext.Provider>
  );
};

export const useusuario = () => {
  return useContext(userContext);
};
