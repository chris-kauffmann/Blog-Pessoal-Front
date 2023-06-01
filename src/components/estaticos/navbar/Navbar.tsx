import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { addToken } from "../../../store/tokens/actions";

function Navbar() {
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  let history = useNavigate();
  const dispatch = useDispatch();

  function goLogout() {
    dispatch(addToken(""));
    toast.info("Usuário deslogado", {
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
  var navbarComponent;

  if (token !== "") {
    navbarComponent = (
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar variant="dense">
          <Grid container justifyContent={"space-between"}>
            <Box>
              <Typography variant="h5" color="white">
                Across The Universe
              </Typography>
            </Box>

            <Box display="flex" justifyContent="start">
              <Link to="/home" className="text-decorator-none">
                <Box mx={1} className="cursor">
                  <Typography variant="h6" color="inherit">
                    Home
                  </Typography>
                </Box>
              </Link>

              <Box mx={1}>
                <Link to="/posts" className="text-decorator-none ">
                  <Typography variant="h6" color="white" className="cursor">
                    Postagens
                  </Typography>
                </Link>
              </Box>

              <Box mx={1}>
                <Link to="/temas" className="text-decorator-none">
                  <Typography variant="h6" color="white" className="cursor">
                    Temas
                  </Typography>
                </Link>
              </Box>
              <Box mx={1}>
                <Link
                  to="/formularioTema"
                  className=" cursor text-decorator-none"
                >
                  <Typography variant="h6" color="white" className="cursor">
                    Cadastrar Tema
                  </Typography>
                </Link>
              </Box>
              <Box mx={1}>
                <Link to="/perfil" className=" cursor text-decorator-none">
                  <Typography variant="h6" color="white" className="cursor">
                    Perfil
                  </Typography>
                </Link>
              </Box>

              <Box
                mx={1}
                className="cursor text-decorator-none"
                onClick={goLogout}
              >
                <Typography variant="h6" color="inherit">
                  Logout
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
  return <>{navbarComponent}</>;
}
export default Navbar;
