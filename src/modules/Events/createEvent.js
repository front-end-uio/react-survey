import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
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
  header: {
    backgroundColor: "#2F40B5",
    color: "#FFFFFF",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  signOut: {
    color: "#fff",
    backgroundColor: "#F45075",
    padding: "8px",
    borderRadius: "3px",
    textDecoration: "none"
  },
  item: {
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "3px",
    border: "1px solid rgba(0, 0, 0, 0.35)",
    marginBottom: "16px"
  },
  events: {
    marginTop: "16px"
  },
  createEvent: {
    color: "#fff",
    backgroundColor: "#F45075",
    width: "225px",
    margin: "auto",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#F45075"
    },
    display: "block"
  },
  main: {
    padding: 0
  }
}));

export default function CreateEvent(props) {
  const classes = useStyles();
  const [hashtag, setHashtag] = useState("");
  return (
    <Container className={classes.main} component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.header}>
        <Typography component="subtitle1">{props.email}</Typography>
        <Link to="/" className={classes.signOut}>
          Sign Out
        </Link>
      </div>
      <div className={classes.paper}>
        <Typography component="h2" variant="h4">
          Create Event
        </Typography>

        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="hashtag"
            label="hashtag"
            name="hashtag"
            autoComplete="hashtag"
            autoFocus
            onChange={e => setHashtag(e.target.value)}
            className={classes.input}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => props.createEvent(hashtag)}
            className={classes.submit}
          >
            Create
          </Button>
        </div>
      </div>
    </Container>
  );
}
