import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import useLocalStorage from "react-use-localstorage";

function Navbar() {
  const [token, setToken] = useLocalStorage("token");
  let history = useNavigate();

  function goLogout() {
    setToken("");
    alert("Usuário deslogado");
    history(".login");
  }
  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar variant="dense">
          <Grid container justifyContent={"space-between"}>
            <Box>
              <Typography variant="h5" color="white">
                Blog Pessoal
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

              <Box mx={1} className="cursor">
                <Link to="/posts" className="text-decorator-none">
                  <Typography variant="h6" color="white">
                    Postagens
                  </Typography>
                </Link>
              </Box>

              <Box mx={1} className="cursor">
                <Link to="/temas" className="text-decorator-none">
                  <Typography variant="h6" color="white">
                    Temas
                  </Typography>
                </Link>
              </Box>
              <Box mx={1} className="">
                <Link
                  to="/formularioTema"
                  className=" cursor text-decorator-none"
                >
                  <Typography variant="h6" color="white">
                    Cadastrar Tema
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
    </>
  );
}
export default Navbar;
