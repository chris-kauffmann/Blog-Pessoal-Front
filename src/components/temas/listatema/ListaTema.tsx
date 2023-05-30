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
import { toast } from "react-toastify";
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
        toast.error("Seu token expirou, logue novamente", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined,
        });
        dispatch(addToken(""));
        history("/login");
      }
    }
  }

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
      {/* criando um if ternário para exibir um loader de carregamento enquanto os temas não chegam do backend 
     na primeira linha, temos a condição do if */}
      {temas.length === 0 ? (
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
