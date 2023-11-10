import React from "react";
import { useusuario } from "../../context/UserProvider";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import '../perfilUser/PerfilUser'

const PerfilUser = () => {
  const navigate = useNavigate();

  const { usuario } = useusuario();
  if (!usuario) {
    console.log('entrei')
    return <div>Usuário não encontrado.</div>;
  }

  return (
    <div className="containerPefilUser"> 
      <RouterLink to="/home">Já tenho uma conta</RouterLink>
      <h1>Perfil do Usuário</h1>
      <p>Nome: {usuario.nome}</p>
      <p>Email: {usuario.email}</p>
      <p>Curso: {usuario.curso}</p>
    </div>
  );
};

export default PerfilUser;
