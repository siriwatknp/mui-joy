import * as React from "react";
import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "@mui/system";
import createSvgIcon from "../src/createSvgIcon";
import Avatar from "../src/Avatar";
import Button from "../src/Button";
import Container from "../src/Container";
import CssBaseline from "../src/CssBaseline";
import Grid from "../src/Grid";
import Typography from "../src/Typography";
import TextField from "../src/TextField";

const LockOutlined = createSvgIcon(
  /*#__PURE__*/ _jsx("path", {
    d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z",
  }),
  "LockOutlined"
);

function Copyright(props) {
  return (
    <Typography variant="caption" align="center" {...props}>
      {"Copyright © "}
      <Typography
        component="a"
        variant="caption"
        color="inherit"
        href="https://mui.com/"
      >
        Your Website
      </Typography>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar variant="contained" color="info">
          <LockOutlined fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, minWidth: 396 }}
        >
          <TextField
            component="fieldset"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            placeholder="your-email@example.com"
          />
          <TextField
            component="fieldset"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            placeholder="**********"
          />
          <Box
            typography="caption"
            sx={{ mt: 2, display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography component="a" href="#" variant="caption">
                Forgot password?
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="a" href="#" variant="caption">
                {"Don't have an account? Sign Up"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ mt: 8, mb: 4, textAlign: "center" }}>
        <Copyright />
      </Box>
    </Container>
  );
}
