import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { Delete } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
    marginBottom: "16px",
    display: "flex",
    justifyContent: "space-between"
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
  icon: {
    color: "1px solid rgba(0, 0, 0, 0.35)"
  },
  main: {
    padding: 0
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  input: {
    backgroundColor: "#FFFFFF"
  },
  submit: {
    backgroundColor: "#F45075",
    width: "120px",
    margin: "auto",
    display: "block",
    marginTop: "16px"
  }
}));

export default function Event(props) {
  const classes = useStyles();
  const [question, setQuestion] = useState("");
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
          {props.event.Hashtag}
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="question"
            label="question"
            name="question"
            autoComplete="question"
            autoFocus
            onChange={e => setQuestion(e.target.value)}
            className={classes.input}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => {
              props.createQuestionFn(question);
              setQuestion("");
            }}
            className={classes.submit}
          >
            Create
          </Button>
        </div>
        <div className={classes.events}>
          {props.questions.map((question, index) => {
            return (
              <div key={index} className={classes.item}>
                <Typography component="body1">{question.Pregunta}</Typography>
                <div />
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
/*
<span
                    onClick={() =>
                      props.deleteQuestion(question.id, props.match.params.id)
                    }
                  >
                    <Delete className={classes.icon} />
                  </span>
*/
