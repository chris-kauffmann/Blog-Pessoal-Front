import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

function Navbar() {
  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar variant="dense">
          <Grid container justifyContent={"space-between"}>
            <Box style={{ cursor: "pointer" }}>
              <Typography variant="h5" color="inherit">
                Blog Pessoal
              </Typography>
            </Box>

            <Box display="flex" justifyContent="start">
              <Box mx={1} style={{ cursor: "pointer" }}>
                <Typography variant="h6" color="inherit">
                  Home
                </Typography>
              </Box>
              <Box mx={1} style={{ cursor: "pointer" }}>
                <Typography variant="h6" color="inherit">
                  Postagens
                </Typography>
              </Box>
              <Box mx={1} style={{ cursor: "pointer" }}>
                <Typography variant="h6" color="inherit">
                  Temas
                </Typography>
              </Box>
              <Box mx={1} style={{ cursor: "pointer" }}>
                <Typography variant="h6" color="inherit">
                  Cadastrar Tema
                </Typography>
              </Box>
              <Box mx={1} style={{ cursor: "pointer" }}>
                <Typography variant="h6" color="inherit">
                  logout
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
