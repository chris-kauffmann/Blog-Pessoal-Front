import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import "./Home.css";

/*function para criar o componente inicial home */
function Home() {
  return (
    <>
      <>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ backgroundColor: "white" }}
        >
          <Grid alignItems="center" item xs={6}>
            <Box paddingX={20}>
              <Typography
                variant="h3"
                gutterBottom
                color="textPrimary"
                component="h3"
                align="center"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Seja bem vindo(a)!
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                color="textPrimary"
                component="h5"
                align="center"
                style={{ color: "black", fontWeight: "bold" }}
              >
                expresse aqui os seus pensamentos e opiniões!
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center">
              <Box marginRight={1}></Box>
              <Button
                className="outlinedButton"
                variant="contained"
                style={{
                  borderColor: "white",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                Ver Postagens
              </Button>
            </Box>
          </Grid>
          <Grid item xs={5} style={{ margin: "10px" }}>
            <img
              src="https://media1.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif?cid=ecf05e47qn9dv5mhzhpp8shivts0noigxrw0r89xyn3tbe61&ep=v1_gifs_related&rid=giphy.gif&ct=g"
              alt=""
              width="500px"
              height="400px"
            />
          </Grid>
          <Grid xs={12} style={{ backgroundColor: "black" }}></Grid>
        </Grid>
      </>
    </>
  );
}

export default Home;
