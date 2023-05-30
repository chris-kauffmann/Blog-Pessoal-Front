import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { Box, Grid } from "@mui/material";
import "./DeletarTema.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { buscaId, deleteId } from "../../../services/Service";
import Tema from "../../../models/Tema";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";

function DeletarTema() {
  let history = useNavigate();
  const { id } = useParams<{ id: string }>();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  const [tema, setTema] = useState<Tema>();

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

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  async function findById(id: string) {
    buscaId(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  function sim() {
    history("/temas");
    deleteId(`/temas/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    toast.success("Tema deletado com sucesso", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
      progress: undefined,
    });
  }

  function nao() {
    history("/temas");
  }

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Box m={30}>
          <Card variant="outlined" className="cardDelTema">
            <CardContent>
              <Box justifyContent="center">
                <Typography color="inherit" gutterBottom>
                  Deseja deletar o Tema?
                </Typography>
                <Typography color="textSecondary">{tema?.descricao}</Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="start" ml={1.0} mb={1}>
                <Box mx={1}>
                  <Button
                    onClick={sim}
                    variant="contained"
                    className="marginLeft outlinedButtonT"
                    size="large"
                    style={{
                      borderColor: "white",
                      backgroundColor: "black",
                      color: "white",
                    }}
                  >
                    Sim
                  </Button>
                </Box>
                <Box mx={2}>
                  <Button
                    onClick={nao}
                    variant="contained"
                    size="large"
                    className="outlinedButtonT"
                    style={{
                      borderColor: "white",
                      backgroundColor: "black",
                      color: "white",
                    }}
                  >
                    Não
                  </Button>
                </Box>
              </Box>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </>
  );
}
export default DeletarTema;
