// src/components/Login.js
import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Login sonrası yönlendirme
  const handleLogin = () => {
    // Login işlemi yapıldıktan sonra Terms sayfasına yönlendirilir
    if (email && password) {  // Kullanıcı email ve şifre girerse yönlendirme yapılacak
      navigate("/terms");  // Eğer login başarılıysa, TermsAndConditions sayfasına yönlendirme
    } else {
      alert("Please enter valid email and password");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "20px" }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Container>
  );
};

export default Login;
