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
import useLocalStorage from "react-use-localstorage";
import { busca } from "../../../../services/Service";

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([]);
  const [token, setToken] = useLocalStorage("token");
  let history = useNavigate();

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado");
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
      {posts.map((post) => (
        <Box m={4} sx={{ display: "inline-block", mx: "10px", maxWidth: 345 }}>
          <Card variant="outlined">
            <CardMedia
              component="img"
              height="140"
              src="https://ik.imagekit.io/eou8tor4u/orion-nebula-11107_1280.jpg?updatedAt=1684508815643"
              alt="nebulosa Orion"
            />
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Postagens
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
