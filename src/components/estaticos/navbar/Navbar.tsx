import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

/*array com os elementos da página (const serve para declarar uma váriavel constante, cujo valor não pode ser alterado) */
const pages = ["Home", "Postagens", "Temas", "Cadastrar Tema"];
/*array com os elementos da configuração */
const settings = ["Perfil", "Conta", "Dashboard", "Logout"];

function Navbar() {
  /* Usando o React parar construir interfaces do usuário*/
  /* useState é uma função do react para retornar um array, retorna o valor atual e uma função para atualizar
  As variáveis de estado e suas funções de atualização são necessárias para que a interface seja atualizada automaticamente quando
  as variaveis de estados são modificadas*/
  /* anchorElNav é usada para controlar o elemento ancora relacionado a um menu de navegação pode ser usado para exibir um menu
  suspenso próximo a ele*/
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  /* anchorElUser é usada para controlar o elemento ancora relacionado a um menu de usuário pode ser usado para exibir um menu
  suspenso relacionado ao usuário*/
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  /*funções usadas como mmanipuladoras de eventos em um componente do React, responsáveis por atualizar os valores do anchorElNav
e anchorElUser. São usadas na implementação de menus ou pop-ups que devem ser exibidos quando um elemento é clicado*/

  /*handleOpenNavMenu é executada quando ocorre o clique em um elemento do HTML(event: React.MouseEvent<HTMLElement>)
essa função recebe o evento e usa o setAnchorElNav parar atualizar o valor do anchorElNav com o elemento ancora (event.currentTarget)*/
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  /*handleOpenUserMenu é utilizada para o evento de clique em outro elemento HTML, tbm reconhece o evento de clique como argumento
  e utiliza a função setAnchorElUser para atualizar o valor de anchorElUser com o elemento ancora (event.currentTarget)*/
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  /*funções responsáveis por voltar o valores das variaveis de estado para "null", indicando que os menus associados a esses elementos
devem ser fechados */

  /*utiliza a função setAnchorElNav para atualizar o valor do anchorElNav para NULL, indicando que o menu deve ser fechado */
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  /*utiliza a função setAnchorElUser para atualizar o valor do anchorElUser para NULL, indicando que o menu do usuário deve ser fechado */
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            Blog Pessoal
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="//" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
