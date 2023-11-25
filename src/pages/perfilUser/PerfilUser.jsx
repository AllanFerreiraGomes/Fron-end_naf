import React from "react";
import { useusuario } from "../../context/UserProvider";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import '../perfilUser/PerfilUser.css'
import { FaArrowLeft } from 'react-icons/fa';
import logo from '../../assets/logo.png';


const PerfilUser = () => {
  const navigate = useNavigate();

  const { usuario } = useusuario();
  if (!usuario) {
    console.log('entrei')
    return <div>Usuário não encontrado.</div>;
  }

  return (
    <div className="containerPefilUser">
      <div className='containLogoHome'>
        <img className='imagemLogo' src={logo} alt="Logo dedo de Deus Unifeso" />
      </div>
      <div className="icons">
        <RouterLink to="/home">
          <FaArrowLeft size={30} color='black' />
        </RouterLink>
      </div>
      <h1 className="perfilUser">Perfil do Usuário</h1>
      <div className="containConteudo">
        <p>Nome: {usuario.nome}</p>
        <p>Email: {usuario.email}</p>
        <p>Curso: {usuario.curso}</p>

        </div>
    </div>
  );
};

export default PerfilUser;
