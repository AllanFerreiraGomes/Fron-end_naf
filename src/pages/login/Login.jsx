import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import bcrypt from 'bcryptjs';
import '../cadastrar/Cadastrar.css';
import logo from '../../../../../../../allan/Downloads/logo.png';
import '../login/Login.css';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [senhaError, setSenhaError] = useState(false);

  const buttonLogin = event => {
    event.preventDefault();

    // Limpa os erros
    setEmailError(false);
    setSenhaError(false);

    if (email && senha) {
      // Recupere os dados do usuário do localStorage
      const storedUser = JSON.parse(localStorage.getItem('usuario'));
      if (storedUser) {
        // Compare a senha inserida com o hash armazenado usando o bcrypt
        bcrypt.compare(senha, storedUser.senha, (err, result) => {
          if (result) {
            navigate('/Home');
          } else {
            // Senha incorreta
            setEmailError(true);
            setSenhaError(true);
            alert('Email ou senha incorretos. Por favor, tente novamente.');
          }
        });
      } else {
        // Usuário não encontrado no localStorage
        setSenhaError(true);
        setEmailError(true);
        alert('Usuário não encontrado. Por favor, faça o cadastro.');
      }
    } else {
      // Campos de email ou senha vazios
      setEmailError(!email);
      setSenhaError(!senha);
      alert('Por favor, informe o email e a senha.');
    }
  };

  return (
    <>
      <div className='containerA'> 
        <div className='containLogo'>
          <img className='imagemLogo' src={logo} alt="Logo dedo de Deus Unifeso" /> 
        </div>

        <div className="containerSignin">
          <h2 className='texto'>Login</h2>
          <form onSubmit={buttonLogin}>
            <div className="formulario">
              <label>Email:</label>
              <input
                className={`inputFormulario ${emailError ? 'error' : ''}`}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="formulario">
              <label>Senha:</label>
              <input
                className={`inputFormulario ${senhaError ? 'error' : ''}`}
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
              />
            </div>
            <button className='buttonCriar' type="submit" >Entrar</button>
            <RouterLink to="/cadastrar">Criar Conta</RouterLink>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
