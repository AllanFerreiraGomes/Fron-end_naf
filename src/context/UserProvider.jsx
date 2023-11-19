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

  const adicionarHorarioReservado = (horario) => {
    // Check if the user object exists
    if (usuario) {
      // Check if the user has a property for reserved times, if not, initialize it
      if (!usuario.horariosReservados) {
        usuario.horariosReservados = [];
      }

      // Check if the selected time is not already reserved
      if (!usuario.horariosReservados.includes(horario)) {
        // Add the new reserved time to the user's list of reserved times
        usuario.horariosReservados.push(horario);

        // Update the user context and local storage
        updateusuario(usuario);
      } else {
        // Handle the case where the time is already reserved
        console.error("Time slot already reserved");
      }
    } else {
      // Handle the case where the user object is not available
      console.error("User object not found");
    }
  };


  return (
    <userContext.Provider value={{ usuario, updateusuario, adicionarHorarioReservado }}>
      {children}
    </userContext.Provider>
  );
};

export const useusuario = () => {
  return useContext(userContext);
};
