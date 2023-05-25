import { Container } from "@material-ui/core";

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import User from "../../models/User";

import "./Perfil.css";
import { useSelector } from "react-redux";
import { TokenState } from "../../store/tokens/tokensReducer";
import { buscaId } from "../../services/Service";
import { Avatar, Typography } from "@mui/material";

function Perfil() {
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
  });
  async function getUserById(id: number) {
    await buscaId(`/usuarios/${id}`, setUsuario, {
      headers: { Authorization: token },
    });
  }
  useEffect(() => {
    getUserById(+userId);
  }, []);

  return (
    <>
      <Container className=" cardPerfil margemP">
        <Grid container marginTop={5}>
          <Grid xs={3} alignItems="center" justifyContent="center">
            <Avatar
              src={usuario.foto}
              alt=""
              style={{ width: "15rem", height: "15rem", margin: "0 auto" }}
            />
            
            <Typography variant="h5" align="center">
              {usuario.nome}
            </Typography>
          </Grid>
          <Grid xs={9} justifyContent="center">
            <Typography variant="h4" align="center">
              {" "}
              Postagens de {usuario.nome}
            </Typography>
            Você tem um total de {usuario.postagem?.length} postagens feitas
            {usuario.postagem?.map((post) => (
              <p>{post.titulo}</p>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default Perfil;
