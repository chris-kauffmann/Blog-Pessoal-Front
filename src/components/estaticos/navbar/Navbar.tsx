import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar variant="dense">
          <Grid container justifyContent={"space-between"}>
            <Box>
              <Typography variant="h5" color="inherit">
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
                <Typography variant="h6" color="inherit">
                  Postagens
                </Typography>
              </Box>
              <Box mx={1} className="cursor">
                <Typography variant="h6" color="inherit">
                  Temas
                </Typography>
              </Box>
              <Box mx={1} className="cursor">
                <Typography variant="h6" color="inherit">
                  Cadastrar Tema
                </Typography>
              </Box>
              <Link to="/login" className="text-decorator-none">
                <Box mx={1} className="cursor">
                  <Typography variant="h6" color="inherit">
                    Logout
                  </Typography>
                </Box>
              </Link>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Navbar;
