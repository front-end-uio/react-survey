import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Login from "./modules/Login/index";
import CreateUser from "./modules/Login/createUser";
import Events from "./modules/Events/index";
import CreateEvent from "./modules/Events/createEvent";
import Event from "./modules/Event/index";
import PublicEvent from "./modules/public/event";
import PublicLogin from "./modules/public/login";

import {
  userValidation,
  facebookUserValidation,
  createUser
} from "./utils/login";
import {
  createEvent,
  getEventsByUser,
  deleteEvent,
  getEventByHashtag
} from "./utils/events";
import {
  createQuestion,
  editQuestion,
  upvoteQuestion,
  deleteQuestion,
  getQuestionsByEvent
} from "./utils/questions";

const history = createHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      events: [],
      questions: [],
      user: null,
      route: "/",
      unuqueID: null
    };

    this.login = this.login.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.signIn = this.signIn.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.getQuestionsPublic = this.getQuestionsPublic.bind(this);
    this.getEventByHashtagFn = this.getEventByHashtagFn.bind(this);
    this.createQuestionFn = this.createQuestionFn.bind(this);
  }

  async login(email, password) {
    let user = await userValidation(email, password);
    if (user.id) {
      this.getEvents(user.id);
      this.setState({ user: user });
    }
  }

  async facebookLogin() {
    let user = await facebookUserValidation();
    this.setState({ user: user });
  }

  async signIn(email, password) {
    let user = await createUser(email, password);
    this.getEvents(user.id);
    this.setState({ user: user, route: "/login" });
  }

  async removeEvent(event) {
    let res = await deleteEvent(event);
    console.log(res);
  }

  async createEvent(hashtag) {
    await createEvent(hashtag, this.state.user.id);
    this.getEvents(this.state.user.id);
  }

  async getEvents(user) {
    let events = await getEventsByUser(user);
    this.setState({ events: events, route: "/events" });
  }

  async createQuestionFn(pregunta) {
    console.log(pregunta);
    let res = await createQuestion(
      this.state.unuqueID,
      this.state.event.id,
      pregunta
    );
    this.getEventByHashtagFn(this.state.event.Hashtag);
  }

  async editQuestion(id, pregunta) {
    let res = editQuestion(id, pregunta);
    console.log(res);
  }

  async deleteQuestion(id, event) {
    deleteQuestion(id);
    this.getQuestions(event);
  }

  async upvoteQuestion(id, puntaje) {
    let res = upvoteQuestion(id, puntaje);
    console.log(res);
  }

  async getQuestions(event) {
    let questions = await getQuestionsByEvent(event);
    this.setState({ questions: questions, route: `/event/${event}` });
  }

  async getQuestionsPublic(event) {
    let questions = await getQuestionsByEvent(event);
    this.setState({ questions: questions });
  }
  async getEventByHashtagFn(hashtag) {
    let event = await getEventByHashtag(hashtag);
    let unuqueID = (
      Date.now().toString(36) +
      Math.random()
        .toString(36)
        .substr(2, 5)
    ).toUpperCase();

    if (this.state.unuqueID) {
      unuqueID = this.state.unuqueID;
    }

    this.getQuestionsPublic(event.id);
    this.setState({
      event: event,
      unuqueID: unuqueID,
      route: `/publicevent/${event.id}`
    });
  }

  render() {
    history.push(this.state.route);
    console.log(this.state);

    return (
      <Router history={history}>
        <Route
          exact
          path="/"
          render={routeProps => (
            <PublicLogin
              {...routeProps}
              getEventByHashtag={this.getEventByHashtagFn}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={routeProps => (
            <Login
              {...routeProps}
              login={this.login}
              facebookLogin={this.facebookLogin}
            />
          )}
        />
        <Route
          exact
          path="/signin"
          render={routeProps => (
            <CreateUser {...routeProps} signIn={this.signIn} />
          )}
        />
        <Route
          exact
          path="/events"
          render={routeProps => (
            <Events
              {...routeProps}
              events={this.state.events}
              email={this.state.user.email}
              getQuestions={this.getQuestions}
            />
          )}
        />

        <Route
          exact
          path="/event/:id"
          render={routeProps => (
            <Event
              {...routeProps}
              questions={this.state.questions}
              deleteQuestion={this.deleteQuestion}
              editQuestion={this.editQuestion}
              email={this.state.user.email}
            />
          )}
        />

        <Route
          exact
          path="/createEvent"
          render={routeProps => (
            <CreateEvent {...routeProps} createEvent={this.createEvent} />
          )}
        />

        <Route
          exact
          path="/publicevent/:id"
          render={routeProps => (
            <PublicEvent
              {...routeProps}
              event={this.state.event}
              questions={this.state.questions}
              deleteQuestion={this.deleteQuestion}
              createQuestionFn={this.createQuestionFn}
            />
          )}
        />
      </Router>
    );
  }
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
