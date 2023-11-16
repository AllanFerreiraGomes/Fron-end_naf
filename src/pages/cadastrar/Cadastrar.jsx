import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import '../cadastrar/Cadastrar.css'
import logo from '../../assets/logo.png';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Cadastrar = () => {
  const navigate = useNavigate();

  const   [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [curso, setCurso] = useState('');

  const buttonCadastrar = event => {
    event.preventDefault();
  
    if (nome && email && senha) {
      // Gere um hash da senha usando bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(senha, salt, (err, hash) => {
          if (err) throw err;
  
          // Crie um objeto de usuário com a senha criptografada
          const usuario = { nome, email,curso ,senha: hash };
  
          // Salve o usuário no localStorage
          localStorage.setItem('usuario', JSON.stringify(usuario));
          alert('Conta criada com sucesso!');
          navigate('/');

        });
      });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <>
    <div className='containerA'> 

    <div className='containLogo'>
             <img className='imagemLogo' src={logo} alt="Logo dedo de Deus Unifeso" /> 
         </div>

    <div className="containerSignup">
      <h2 className='texto'>Criar Conta</h2>
      <form onSubmit={buttonCadastrar}>
        <div className="formulario">
          <label>Nome:</label>
          <input
            className='inputFormulario'
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </div>
        <div className="formulario">
          <label>Email:</label>
          <input
            className='inputFormulario'
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="formulario">
          <label>Senha:</label>
          <input
            className='inputFormulario'
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
        </div>

        <div className="formulario">
          <label>Curso:</label>
          <input
            className='inputFormulario'
            type="text"
            value={curso}
            onChange={e => setCurso(e.target.value)}
            required
          />
        </div>
        <button className='buttonCriar' type="submit">Criar Conta</button>
        <RouterLink to="/">Já tenho uma conta</RouterLink>
      </form>
    </div>
    </div>
    </>
  );
};

export default Cadastrar;
