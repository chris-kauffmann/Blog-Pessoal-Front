import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { Box } from "@mui/material";
import "./ListaTema.css";
import Tema from "../../../models/Tema";

import { busca } from "../../../services/Service";
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { addToken } from "../../../store/tokens/actions";

function ListaTema() {
  const [temas, setTemas] = useState<Tema[]>([]);

  let history = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  const dispatch = useDispatch();

  async function getTemas() {
    // alterado a função pra dentro de um try catch, para poder verificar a validade do token do usuário
    try {
      // a parte do TRY, fica igual ao que ja tinha antes
      await busca("/temas", setTemas, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      // a parte do catch, vai receber qlquer mensagem de erro que chegue, e caso a mensagem tenha um 403 no seu texto
      // significa que o token já expirou. Iremos alertar o usuário sobre isso, apagar o token do navegador, e levá-lo para a tela de login
      if (error.toString().includes("403")) {
        alert("O seu token expirou, logue novamente");
        dispatch(addToken(""));
        history("/login");
      }
    }
  }

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado");
      history("/login");
    }
  }, [token]);

  async function getTema() {
    await busca("/temas", setTemas, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getTema();
  }, [temas.length]);
  return (
    <>
      {temas.map((tema) => (
        <Box m={4} sx={{ display: "inline-block", mx: "6px", maxWidth: 345 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tema
              </Typography>
              <Typography variant="h5" component="h2">
                {tema.descricao}
              </Typography>
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="center" mb={1.5}>
                <Link
                  to={`/formularioTema/${tema.id}`}
                  className="text-decorator-none"
                >
                  <Box mx={1}>
                    <Button
                      variant="contained"
                      className="marginLeft outlinedButtonT"
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
                  to={`/deletarTema/${tema.id}`}
                  className="text-decorator-none "
                >
                  <Box mx={1}>
                    <Button
                      variant="contained"
                      size="small"
                      className="outlinedButtonT"
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

export default ListaTema;
