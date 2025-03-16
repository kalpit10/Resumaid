import React, { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import "../resources/landing.css";

function Header() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const userData = JSON.parse(localStorage.getItem("resume-user") || "{}");
  const username = userData.username || "Guest"; // ✅ Directly get `username`

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("resume-user");
    navigate("/");
  };

  return (
    <div>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="fixed-top shadow-sm"
      >
        <Container>
          <Navbar.Brand className="d-flex align-items-center cursor-pointer">
            <img
              src={require("../pages/images/navlogo.jpeg")}
              onClick={() => navigate("/")}
              alt="Resumaid Logo"
              className="img-fluid me-2 cursor"
              style={{ height: "40px" }} /* Adjust height here */
            />
            <span className="h5 mb-0">Resumaid</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
              <div className="ms-3">
                <Button
                  // variant="outlined"
                  color="inherit"
                  onClick={handleMenu}
                  startIcon={<AccountCircle />}
                >
                  {username}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
                  <MenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/template")}>
                    Templates
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/upload")}>
                    Resume Review
                  </MenuItem>

                  {username === "Guest" ? (
                    <MenuItem onClick={handleLogin}>Login</MenuItem>
                  ) : (
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  )}
                </Menu>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
