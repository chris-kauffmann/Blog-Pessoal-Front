import { Grid, Typography, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import TabPostagem from "../../components/estaticos/postagens/tabpostagem/TabPostagem";
import "./Home.css";
import ModalPostagem from "../../components/estaticos/postagens/modalPostagem/ModalPostagem";
import { Link, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TokenState } from "../../store/tokens/tokensReducer";

/*function para criar o componente inicial home */
function Home() {
  let history = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == "") {
      alert("Você precisar estar logado");
      history("/login");
    }
  }, [token]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="bgHome"
      >
        <Grid alignItems="center" xs={6}>
          <Box paddingX={20}>
            <Typography
              variant="h3"
              gutterBottom
              color="initial"
              component="h3"
              align="center"
              className="titulo"
            >
              Seja bem vindo(a)!
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              color="textPrimary"
              component="h5"
              align="center"
              className="titulo"
            >
              Expresse aqui os seus pensamentos e opiniões!
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box marginRight={1}>
              <ModalPostagem />
            </Box>
            <Link to="/posts">
              <Button className="outlinedButton text-decorator-none" variant="contained">
                Ver Postagens
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={5} style={{ margin: "10px" }}>
          <img
            src="https://ik.imagekit.io/eou8tor4u/pngfind.com-astronaut-helmet-png-111386.png?updatedAt=1684516896244"
            alt=""
            width="400px"
            height="400px"
          />
        </Grid>
        <Grid xs={12}>
          <TabPostagem></TabPostagem>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
