import { ChangeEvent, useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import "./CadastroPost.css";
import { useNavigate, useParams } from "react-router-dom";

import Tema from "../../../../models/Tema";
import Postagem from "../../../../models/Postagem";
import User from "../../../../models/User";
import { busca, buscaId, post, put } from "../../../../services/Service";
import { useSelector } from "react-redux";
import { TokenState } from "../../../../store/tokens/tokensReducer";

function CadastroPost() {
  let history = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [temas, setTemas] = useState<Tema[]>([]);
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado");
      history("/login");
    }
  }, [token]);

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: "",
  });
  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: "",
    texto: "",
    tema: null,
    usuario: null, //linha para inserir o usuario dono da postagem
  });

  //buscar o Id dentro do Redux
  const userId = useSelector<TokenState, TokenState["id"]>((state) => state.id);

  //state que controla o usuário que será inserido na postagem
  const [usuario, setUsuario] = useState<User>({
    id: +userId, //Ao colocar o sinal de + no começo de uma variável de texto, fazemos a conversão da mesma para um número
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
      usuario: usuario, //adc o usuario dentro da postagem q está sendo enviada para o backend
    });
  }, [tema]);

  useEffect(() => {
    getTemas();
    if (id !== undefined) {
      findByIdPostagem(id);
    }
  }, [id]);

  async function getTemas() {
    await busca("/temas", setTemas, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function findByIdPostagem(id: string) {
    await buscaId(`postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token,
      },
    });
  }

  function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      put(`/postagens`, postagem, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
      alert("Postagem atualizada com sucesso");
    } else {
      post(`/postagens`, postagem, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
      alert("Postagem cadastrada com sucesso");
    }
    back();
  }

  function back() {
    history("/posts");
  }

  return (
    <Container maxWidth="sm" className="card1">
      <form onSubmit={onSubmit}>
        <Typography
          variant="h3"
          style={{ color: "black" }}
          component="h1"
          align="center"
        >
          Formulário de cadastro de postagem
        </Typography>
        <TextField
          value={postagem.titulo}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)}
          id="titulo"
          label="titulo"
          variant="outlined"
          name="titulo"
          margin="normal"
          className="custom-txfield"
          fullWidth
        />
        <TextField
          value={postagem.texto}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)}
          id="texto"
          label="texto"
          name="texto"
          variant="outlined"
          margin="normal"
          className="custom-txfield"
          fullWidth
        />

        <FormControl>
          <InputLabel
            id="demo-simple-select-helper-label"
            className="custom-txfield"
          >
            Tema{" "}
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            className="custom-txfield"
            onChange={(e) =>
              buscaId(`/temas/${e.target.value}`, setTema, {
                headers: {
                  Authorization: token,
                },
              })
            }
          >
            {temas.map((tema) => (
              <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
            ))}
          </Select>
          <FormHelperText className="custom-txfield">
            Escolha um tema para a postagem
          </FormHelperText>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="outlinedButtonF"
          >
            Finalizar
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}
export default CadastroPost;
