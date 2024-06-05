import "./Login.scss";
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios'

export default function Login() {

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("hidden");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const navigate = useNavigate();

    const handleUsuarioChange = (event) => setUsuario(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const toggleMostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    function dados(event) {
        event.preventDefault();
        axios.post('http://20.195.170.24:5000/login',{user: usuario, senha: password}).then(response =>{
            if (response.status === 200) {
                navigate(`/painel/${usuario}/${password}`);
            }else{
                setWarning("visible")
            }
        })
        .catch(error => {
            console.error('erro no login', error);
            setWarning("visible");

        });
    }

    return (
        <div className="telaLogin">
            <div className="capa">
            </div>
            <div className="campos">
                <img src='/assets/img/logo.png' alt="Logo da ArtGula " />
                <div className="containerCampos">
                    <p>Bem vindo!</p>
                    <p>Esta área é exclusiva para o administrador da página.</p>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="filled" severity="error" style={{visibility:warning}}>
                            Usuário ou senha inválido.
                        </Alert>
                    </Stack>
                    <form>
                        <div className="inputCampos">
                            <p>Usuário</p>
                            <div className="inputCampo">
                                <input placeholder="Usuário" onChange={handleUsuarioChange} />
                            </div>
                        </div>
                        <div className="inputCampos">
                            <p>Senha</p>
                            <div className="inputCampo">
                                <input type={mostrarSenha ? "text" : "password"} placeholder="Senha" onChange={handlePasswordChange}></input>
                                {mostrarSenha ? (
                                    <FaEye onClick={toggleMostrarSenha} />
                                ) : (
                                    <FaEyeSlash onClick={toggleMostrarSenha} />
                                )}
                            </div>
                        </div>
                        <p><a href="./home">Esqueceu a senha?</a></p>
                        <div className="enviar"><button onClick={dados}>Login</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

