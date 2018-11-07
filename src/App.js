import React, { Component } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleUp,
  faAngleDoubleLeft,
  faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: 0,
      health: 6,
      rout: 6,
      wrongAnswer: false
    };
    this.getRandomDirection = this.getRandomDirection.bind(this);
    this.guessDirection = this.guessDirection.bind(this);
    this.reset = this.reset.bind(this);
  }
  getRandomDirection() {
    let random_number = Math.random() * 3;
    this.setState({ direction: Math.floor(random_number) });
  }
  guessDirection(direction) {
    if (direction === this.state.direction) {
      let newrout = this.state.rout - 1;
      this.setState({ rout: newrout });
      this.getRandomDirection();
    } else {
      let newrout = this.state.health - 1;
      this.setState({ health: newrout });
      this.setState({ wrongAnswer: !this.state.wrongAnswer });
      if (this.state.health === 0) {
        this.reset();
      }
    }
  }
  componentDidMount() {
    this.getRandomDirection();
  }
  reset() {
    this.setState({
      direction: 0,
      health: 6,
      rout: 6,
      wrongAnswer: false
    });
  }
  render() {
    let shake = "";
    let lightning = "";
    let red = "";
    let daylight = "";
    let rain = [<div key={0} className="rain" />];
    for (let i = 1; i < 149; i++) rain.push(<div key={i} className="rain" />);
    let platform = (
      <div className="platform m-3">
        <button
          className="btn joystick m-2"
          onClick={() => this.guessDirection(0)}
        >
          <FontAwesomeIcon
            className="fa-5x text-white"
            icon={faAngleDoubleLeft}
          />
        </button>
        <button
          className="joystick btn "
          onClick={() => this.guessDirection(1)}
        >
          <FontAwesomeIcon
            className="fa-5x text-white"
            icon={faAngleDoubleUp}
          />
        </button>
        <button
          className="btn joystick m-2"
          onClick={() => this.guessDirection(2)}
        >
          <FontAwesomeIcon
            className="fa-5x text-white"
            icon={faAngleDoubleRight}
          />
        </button>
      </div>
    );

    if (this.state.wrongAnswer) {
      shake = "shake";
      lightning = <div className="lightning flashit " />;

      setTimeout(() => {
        shake = "";
        lightning = "";
        this.setState({ wrongAnswer: !this.state.wrongAnswer });
      }, 5000);
    }
    if (this.state.rout === 0) {
      daylight = "canvas";
      rain = "";
      platform = "";
    }

    return (
      <div className="App">
        {lightning}
        <header className={`App-header ${shake} ${daylight}`}>
          <div>{rain} </div>
          <strong>
            <h1> HELLO CHILD... ARE YOU LOST?</h1>
          </strong>
          <hr />
          <h2>
            DO NOT FEAR, IN THE NIGHT A PATH SHALL BE OPEND FOR YOU... <br />{" "}
            BUT ONLY WHEN THE RIGHT CHOICES ARE MADE.
          </h2>
          <span>
            Try and find your way out of this maze, but head our warning or you
            shall be trapped here forever...
          </span>
          <span>You have {this.state.health} chances left.</span>
          <span>You have {this.state.rout} turns left.</span>
          {platform}
        </header>
      </div>
    );
  }
}

export default App;
