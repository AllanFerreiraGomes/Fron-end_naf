import React, { useState } from 'react';
import '../home/Home.css'
import { FaUser } from 'react-icons/fa';
import logo from '../../../../../../../allan/Downloads/logo.png'
import { Link as RouterLink, useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  const [escolherDia, setEscolherDia] = useState(null);
  const [filtroDia, setFiltroDia] = useState('');
  const [filtroMes, setFiltroMes] = useState('');
  const [filtroHorario, setFiltroHorario] = useState('');
  const [horarioreservado, setHorarioreservado] = useState(null);
  const [avaliacao , setAvaliacao] = useState('')

  const [ mock , setMock] = useState( [
    {
      dia: 26,
      mes: 10,
      ano: 2023,
      horariosDisponiveis: [8, 10, 12, 15, 17],
    },
    {
      dia: 27,
      mes: 10,
      ano: 2023,
      horariosDisponiveis: [8, 10, 12, 15, 17],
    },
    {
      dia: 28,
      mes: 10,
      ano: 2023,
      horariosDisponiveis: [],
    },
    {
      dia: 29,
      mes: 10,
      ano: 2023,
      horariosDisponiveis: [8, 10, 12, 15, 17],
    },
    {
      dia: 30,
      mes: 10,
      ano: 2023,
      horariosDisponiveis: [8,15, 17],
    },
    {
      dia: 31,
      mes: 10,
      ano: 2023,
      horariosDisponiveis: [ 12, 15, 17],
    },
    {
      dia: 1,
      mes: 11,
      ano: 2023,
      horariosDisponiveis: [8, 10, 12, 15, 17],
    }, {
      dia: 2,
      mes: 11,
      ano: 2023,
      horariosDisponiveis: [8, 10, 12, 15, 17],
    }, {
      dia: 3,
      mes: 11,
      ano: 2023,
      horariosDisponiveis: [8, 10, 12, 15, 17],
    }, {
      dia: 4,
      mes: 11,
      ano: 2023,
      horariosDisponiveis: [8, 10, 12, 15, 17],
    }, {
      dia: 5,
      mes: 11,
      ano: 2023,
      horariosDisponiveis: [8, 10, 12, 15, 17],
    }, {
      dia: 6,
      mes: 11,
      ano: 2023,
      horariosDisponiveis: [8, 10, 12, 15, 17],
    },
  ]);

  const handleDayClick = (day) => {
    setEscolherDia(day);
  };
  const handleFiltrarClick = () => {
    const diaFiltrado = parseInt(filtroDia, 10);
    const mesFiltrado = parseInt(filtroMes, 10);
    const horarioFiltrado = parseInt(filtroHorario, 10);
  
    const diaSelecionadoIndex = mock.findIndex(
      (item) => item.dia === diaFiltrado && item.mes === mesFiltrado
    );
  
    if (diaSelecionadoIndex === -1) {
      alert('Dia não disponível');
      setHorarioreservado(null);
      return;
    }
  
    const horariosDisponiveis = mock[diaSelecionadoIndex].horariosDisponiveis;
  
    if (!horariosDisponiveis.includes(horarioFiltrado)) {
      alert('Horário não disponível');
      setHorarioreservado(null);
    } else {
      const horariosAtualizados = horariosDisponiveis.filter(
        (hora) => hora !== horarioFiltrado
      );
  
      mock[diaSelecionadoIndex].horariosDisponiveis = horariosAtualizados;
      setHorarioreservado(horarioFiltrado);
    }
  };
  const inputAvaliable = event => {
    localStorage.setItem('Avaliação: ', event.target.value);
 
    setAvaliacao(event.target.value);
  }
  return (
    <>
        <div className='add'></div>
        <RouterLink to="/perfiluser">perfil</RouterLink>

        <div className='containLogoHome'>
             <img className='imagemLogo' src={logo} alt="Logo dedo de Deus Unifeso" /> 
         </div>


    <div className='container'> 
        <div className='containerMostrarOsHorariosDisponiveis'>
          {mock.map((dia) => (
            <button key={`${dia.dia}-${dia.mes}-${dia.ano}`} onClick={() => handleDayClick(dia)}>
              {dia.dia}/{dia.mes}/{dia.ano}
            </button>
          ))}
        </div>
          {escolherDia && (
            <div className='exibirHorarios'>
              <h2>Horários Disponíveis para o Dia: {escolherDia.dia}/{escolherDia.mes}/{escolherDia.ano}</h2>
              {mock
                .find((item) => item.dia === escolherDia.dia && item.mes === escolherDia.mes && item.ano === escolherDia.ano)
                .horariosDisponiveis.map((hora) => (
                  <p key={hora}>Horario Disponível: {hora}</p>
                ))}
            </div>
          )}

        <div className='escolherHorarios'>
          <h3>Escolha o Dia</h3>
          <input
            type='number'
            value={filtroDia}
            onChange={(e) => setFiltroDia(e.target.value)}
          />

          <h3>Escolha o Mês</h3>
          <input
            type='number'
            value={filtroMes}
            onChange={(e) => setFiltroMes(e.target.value)}
          />

          <h3>Escolha o Horário</h3>
          <input
            type='number'
            value={filtroHorario}
            onChange={(e) => setFiltroHorario(e.target.value)}
          />

          <button className='buttonReservar' onClick={handleFiltrarClick}>Reservar</button>

          {horarioreservado && <p>Horário {horarioreservado} reservado com sucesso!</p>}
        </div>
      </div>
          <div className='containerInputAvaliar'>

                <input className='inputAvaliar'
                 type="text" 
                 placeholder='Avalie-nos'
                 value={avaliacao}
                 onChange={inputAvaliable}        
                 onKeyPress={inputAvaliable}
     
                />
          </div>  

    </>
  );
}

export default Home;
