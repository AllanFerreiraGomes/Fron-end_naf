import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import '../cadastrar/Cadastrar.css';
import logo from '../../assets/logo.png';
import '../login/Login.css';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [senhaError, setSenhaError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const buttonLogin = event => {
    event.preventDefault();

    setEmailError(false);
    setSenhaError(false);

    if (email && senha) {
      const storedUser = JSON.parse(localStorage.getItem('usuario'));
      if (storedUser) {
        bcrypt.compare(senha, storedUser.senha, (err, result) => {
          if (result) {
            navigate('/Home');
          } else {

            setEmailError(true);
            setSenhaError(true);
          }
        });
      } else {
        setSenhaError(true);
        setEmailError(true);
      }
    } else {
      // Campos de email ou senha vazios
      setEmailError(!email);
      setSenhaError(!senha);
    }


  };

  const mostrarPassword = () => {
    setShowPassword(!showPassword);
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
              <div className="password-input-container">
                <input
                  className={`inputFormulario ${senhaError ? 'error' : ''}`}
                  type={showPassword ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <button
                  className="show-password-button"
                  onClick={mostrarPassword}
                >
                  {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                </button>
              </div>
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
