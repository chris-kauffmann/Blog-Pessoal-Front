import { Accordion, Button, Container, TextField } from "@material-ui/core";
import { Box, Chip, Divider, Grid } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import User from "../../models/User";
import "./Perfil.css";
import { useSelector } from "react-redux";
import { TokenState } from "../../store/tokens/tokensReducer";
import { buscaId, put } from "../../services/Service";
import { Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Perfil() {
  //função useSelector é o hook que permite selecionar uma parte do estado
  //state compara o estado selecionado com o estado anterior
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  const userId = useSelector<TokenState, TokenState["id"]>((state) => state.id);

  const [usuario, setUsuario] = useState<User>({
    id: +userId,
    nome: "",
    usuario: "",
    foto: "",
    senha: "",
    postagem: null,
  });

  async function getUsuario() {
    try {
      await buscaId(`/usuarios/${usuario.id}`, setUsuario, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  //função que permite atualizar o usuario
  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }
  useEffect(() => {
    getUsuario();
  }, []);

  useEffect(() => {
    setUsuario({
      ...usuario,
      senha: "",
    });
  }, [usuario.usuario]);

  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  function confirmSenha(event: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(event.target.value);
  }

  async function atualizar(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (usuario.senha === confirmarSenha && usuario.senha.length >= 8) {
      try {
        await put("/usuarios/atualizar", usuario, setUsuario, {
          headers: {
            Authorization: token,
          },
        });
        toast.success("Usuário cadastrado com sucesso", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined,
        });
        setUsuario({ ...usuario, senha: "" });
        setConfirmarSenha("");
      } catch (error) {
        toast.error(
          "Falha ao cadastrar o usuário, por favor verifique se os campos estão corretos",
          {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
          }
        );
      }
    } else {
      toast.error(
        "Os campos de senha e confirmar senha estão diferente, por favor verifique e tente novamente",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined,
        }
      );
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }
  }

  console.log(usuario);

  return (
    <>
      <Grid
        container
        display={"flex"}
        marginTop={6}
        className=" cardPerfil perfilContainer"
      >
        <Grid xs={3} alignItems="center" justifyContent="center">
          <Avatar
            src={usuario.foto}
            alt={`Foto de perfil de ${usuario.nome}`}
            style={{ width: "15rem", height: "15rem", margin: "0 auto" }}
          />

          <Typography variant="h5" align="center">
            {usuario.nome}
          </Typography>
        </Grid>
        <Grid xs={9} justifyContent="center">
          <Typography variant="h4" align="center">
            {" "}
            Perfil de {usuario.nome}
          </Typography>
          <Typography variant="h5" style={{ margin: "0 auto" }}>
            Atualizar Perfil
          </Typography>
          <form onSubmit={atualizar}>
            <TextField
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="usuario"
              label="E-mail do usuário"
              variant="outlined"
              name="usuario"
              margin="normal"
              fullWidth
            />
            <TextField
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="nome"
              label="Nome do usuário"
              variant="outlined"
              name="nome"
              margin="normal"
              fullWidth
            />
            <TextField
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="foto"
              label="URL da foto de perfil"
              variant="outlined"
              name="foto"
              margin="normal"
              fullWidth
            />

            <TextField
              name="senha"
              label="Senha"
              type="password"
              variant="outlined"
              value={usuario.senha}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updatedModel(event)
              }
              style={{ margin: "3px" }}
            />
            <TextField
              name="confirmarSenha"
              label="Confirmar senha"
              type="password"
              variant="outlined"
              value={confirmarSenha}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                confirmSenha(event)
              }
              style={{ margin: "3px" }}
            />

            <Button
              type="submit"
              variant="contained"
              className="outlinedButtonPerfil"
              style={{
                borderColor: "white",
                backgroundColor: "black",
                color: "white",
                margin: "10px",
              }}
            >
              Atualizar
            </Button>
          </form>
          <Grid item borderRadius={2} borderColor={"lightgray"} p={2}>
            <Divider>
              <h3 style={{ textAlign: "center" }}>
                <Chip label="Suas Postagens" />
              </h3>
            </Divider>
            {/* <h3 style={{ textAlign: "center" }}> Suas postagens</h3> */}
            <div className="perfilPosts">
              {usuario.postagem?.map((post) => (
                <Grid
                  item
                  border={1}
                  borderRadius={2}
                  borderColor={"lightgray"}
                  p={2}
                >
                  <Typography>Postagem:</Typography>
                  <Typography>{post.titulo}</Typography>
                  <Typography>{post.texto}</Typography>
                  <Avatar
                    src={usuario.foto}
                    style={{ border: "1px solid black" }}
                    alt=""
                  />

                  <Typography>Tema: {post.tema?.descricao}</Typography>
                  <Box display={"flex"} gap={4} mx={3}>
                    <Link to={`/formularioPostagem/${post.id}`}>
                      <Button
                        fullWidth
                        variant="contained"
                        className="outlinedButtonPerfil"
                        style={{
                          borderColor: "white",
                          backgroundColor: "black",
                          color: "white",
                        }}
                      >
                        Editar
                      </Button>
                    </Link>
                    <Link to={`/deletarPostagem/${post.id}`}>
                      <Button
                        fullWidth
                        variant="contained"
                        className="outlinedButtonPerfil"
                        style={{
                          borderColor: "white",
                          backgroundColor: "black",
                          color: "white",
                        }}
                      >
                        Apagar
                      </Button>
                    </Link>
                  </Box>
                </Grid>
              ))}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
export default Perfil;
