import React, { createContext, useContext, useState, useEffect } from "react";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setusuario] = useState(null);

  useEffect(() => {
    console.log('1')
    const storedusuario = JSON.parse(localStorage.getItem("usuario"));
    console.log('2')
    if (storedusuario) {
        console.log(storedusuario)
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
