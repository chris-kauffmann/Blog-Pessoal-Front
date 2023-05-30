import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { Box, CardMedia } from "@mui/material";
import "./ListaPostagem.css";
import { useEffect, useState } from "react";
import Postagem from "../../../../models/Postagem";
import { busca } from "../../../../services/Service";
import { TokenState } from "../../../../store/tokens/tokensReducer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([]);

  let history = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == "") {
      toast.error("Você precisa estar logado", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
      history("/login");
    }
  }, [token]);

  async function getPost() {
    await busca("/postagens", setPosts, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getPost();
  }, [posts.length]);

  return (
    <>
      {/* criando um if ternário para exibir um loader de carregamento enquanto os temas não chegam do backend 
     na primeira linha, temos a condição do if */}
      {posts.length === 0 ? (
        // com o sinal de interrogação, fazemos a saida padrão do if, para caso a condição seja verdadeira//
        <div className="alinhamento">
          <div data-js="astro" className="astronaut">
            <div className="head"></div>
            <div className="arm arm-left"></div>
            <div className="arm arm-right"></div>
            <div className="body">
              <div className="panel"></div>
            </div>
            <div className="leg leg-left"></div>
            <div className="leg leg-right"></div>
            <div className="schoolbag"></div>
          </div>
        </div>
      ) : (
        // o dois pontos (:) representa o ELSE de um if padrão, e colocamos a saida para caso a condição seja falsa. Nesse caso, exibir nada
        <></>
      )}
      {posts.map((post) => (
        <Box m={4} sx={{ display: "inline-block", mx: "10px", maxWidth: 345 }}>
          <Card variant="outlined">
            <CardMedia
              component="img"
              height="140"
              src="https://ik.imagekit.io/eou8tor4u/space-4641363_1280.jpg?updatedAt=1685043351951"
              alt="nebulosa Orion"
            />
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Postagens
              </Typography>
              <Typography variant="body2" component="p">
                Postado por: {post.usuario?.nome}
              </Typography>
              <Typography variant="h5" component="h2">
                {post.titulo}
              </Typography>
              <Typography variant="body2" component="p">
                {post.texto}
              </Typography>
              <Typography variant="body2" component="p">
                {post.tema?.descricao}
              </Typography>
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="center" mb={1.5}>
                <Link
                  to={`/formularioPostagem/${post.id}`}
                  className="text-decorator-none "
                >
                  <Box mx={1}>
                    <Button
                      variant="contained"
                      className="marginLeft outlinedButtonP"
                      size="small"
                      style={{
                        borderColor: "white",
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      atualizar
                    </Button>
                  </Box>
                </Link>
                <Link
                  to={`/deletarPostagem/${post.id}`}
                  className="text-decorator-none"
                >
                  <Box mx={1}>
                    <Button
                      className="outlinedButtonP"
                      variant="contained"
                      size="small"
                      style={{
                        borderColor: "white",
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      deletar
                    </Button>
                  </Box>
                </Link>
              </Box>
            </CardActions>
          </Card>
        </Box>
      ))}
    </>
  );
}

export default ListaPostagem;
