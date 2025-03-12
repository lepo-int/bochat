import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Avatar,
  Link,
  styled,
} from "@mui/material";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaCamera } from "react-icons/fa";
import { useAuth } from "../../Hooks/authProvider";


const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
  padding: theme.spacing(3),
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  color: "white",
  padding: "12px 32px",
  "&:hover": {
    background: "linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)"
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  margin: "auto",
  marginBottom: theme.spacing(3),
  border: "4px solid white",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
}));

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const auth = useAuth();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
    if (formData.username != "" & formData.password != "") {
      auth.loginAction(formData);
      return;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "94.95vh",
        background: "linear-gradient(120deg, #1a237e 0%, #0277bd 100%)",
        padding: 3
      }}
    >
      <Container>
        <StyledCard>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: "#1a237e", fontWeight: "bold" }}>
              Log In
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom sx={{ color: "#666" }}>
              Start your journey with us and unlock amazing possibilities!
            </Typography>

            <Box component="form" onSubmit={handleSubmit} paddingTop={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaUser />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaLock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>

              <StyledButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
              >
                Sign In
              </StyledButton>

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Don't you have an account?{" "}
                  <Link href="/signup" underline="hover" sx={{ fontWeight: "bold" }}>
                    Join Us
                  </Link>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </StyledCard>
      </Container>
    </Box>
  );
};

export default Signup;