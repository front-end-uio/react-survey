import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: "#E5E5E5"
    }
  },
  paper: {
    marginTop: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    padding: "16px"
  },
  signOut: {
    color: "#fff",
    backgroundColor: "#F45075",
    padding: "8px",
    borderRadius: "3px",
    textDecoration: "none"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  input: {
    backgroundColor: "#FFFFFF"
  },
  facebook: {
    margin: "16px 0 32px",
    backgroundColor: "#3B5998",
    color: "#FFFFFF",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#3B5998"
    }
  },
  header: {
    backgroundColor: "#2F40B5",
    color: "#FFFFFF",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  submit: {
    backgroundColor: "#F45075",
    width: "120px",
    margin: "auto",
    display: "block",
    marginTop: "16px"
  },
  main: {
    padding: 0
  }
}));

export default function Login(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Container className={classes.main} component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.header}>
        <Typography component="h1" variant="h5">
          SLAIDU
        </Typography>
      </div>
      <div className={classes.paper}>
        <Typography component="h2" variant="h4">
          Log in
        </Typography>
        <Button
          fullWidth
          className={classes.facebook}
          variant="contained"
          onClick={() => props.facebookLogin()}
        >
          Facebook
        </Button>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
            className={classes.input}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            className={classes.input}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => props.login(email, password)}
            className={classes.submit}
          >
            Log In
          </Button>
        </div>
      </div>
    </Container>
  );
}
