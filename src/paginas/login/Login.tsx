import React, { useState, ChangeEvent, useEffect } from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../services/Service";
import UserLogin from "../../models/UserLogin";

import "./Login.css";
import { useDispatch } from "react-redux";
import { addId, addToken } from "../../store/tokens/actions";

function Login() {
  let history = useNavigate();
  const dispatch = useDispatch();
  const [token, setToken] = useState("");

  const [userLogin, setUserLogin] = useState<UserLogin>({
    id: 0,
    nome: "",
    usuario: "",
    foto: "",
    senha: "",
    token: "",
  });

  const [respUserLogin, setRespUserLogin] = useState<UserLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (token != "") {
      dispatch(addToken(token));
      history("/home");
    }
  }, [token]);

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(`/usuarios/logar`, userLogin, setRespUserLogin);

      alert("Usuário logado com sucesso!!");
    } catch (error) {
      alert("Dados do usuário inconsistentes. Erro ao logar!!");
    }
  }

  useEffect(() => {
    if (respUserLogin.token !== "") {
      dispatch(addToken(respUserLogin.token));
      dispatch(addId(respUserLogin.id.toString()));
      history("/home");
    }
  }, [respUserLogin.token]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="imagem"
    >
      <Grid alignItems="center">
        <Box className="card">
          <form onSubmit={onSubmit}>
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="h3"
              align="center"
              className="textosL"
            >
              Entrar
            </Typography>
            <TextField
              value={userLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="usuario"
              label="usuario"
              variant="outlined"
              name="usuario"
              margin="normal"
              fullWidth
            />
            <TextField
              value={userLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="senha"
              label="senha"
              variant="outlined"
              name="senha"
              margin="normal"
              type="password"
              fullWidth
            />
            <Box marginTop={2} textAlign="center">
              <Button
                className="outlinedButtonL"
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  borderColor: "white",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                Logar
              </Button>
            </Box>
          </form>
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Box marginRight={1}>
              <Typography variant="subtitle1" gutterBottom align="center">
                Não tem uma conta?
              </Typography>
            </Box>
            <Link to="/cadastro">
              <Typography
                variant="subtitle1"
                gutterBottom
                align="center"
                className="textosL text-decorator-none"
              >
                {" "}
                Cadastre-se
              </Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
