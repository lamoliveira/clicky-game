import React, { Component } from "react";
import Button from "./components/Button";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import animals from "./animals.json";

import Nav from "./components/nav";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
var request = require("request");
//let friends = [{}];

function shuffleFriends(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function loadGifs(animal, arraygif) {
  console.log(animal);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Creating an AJAX call for the specific movie button being clicked
  request(queryURL,
    function (error, response, body) {
      // After data comes back from the request
      console.log(queryURL);
      var results = JSON.parse(body).data;
      console.log(results);

      let array = [];
      for (var i = 0; i < results.length; i++) {
        console.log("for:" + i);
        // Creating and storing a div tag
        console.log("Poster:" + results[i].images.fixed_height_small_still.url);
        if (results[i].images.fixed_height_small_still.url) {
          if (results[i].images.fixed_height_small_still.url !== "N/A") {
            var animal = {
              "id": i,
              "name": i,
              // "data-animate": results[i].images.fixed_height_small.url,
              // "data-still": results[i].images.fixed_height_small_still.url,
              "image": results[i].images.fixed_height_small_still.url,
              "occupation": "",
              "location": ""
              //"data-state": "still"
            }
            array.push(animal);
          }
        }
      }
      console.log(array);
      console.log("xxx");
      return array;
    });
};

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    score: 0,
    topscore: 0,
    warning: "Click an image to begin!",
    clicked: [],
    animals,
    animal: "dog"

  };

  handleAnimal = name => {
    this.setState({ animal: name });
    console.log("name:" + name);
    //let arraygif = [{}];

    let arraygif = loadGifs(name, friends);
    this.setState({ friends: arraygif });
    let arraygif2 = [{
      "id": 1,
      "name": "SpongeBob",
      "image": "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Spongebob-squarepants.svg/666px-Spongebob-squarepants.svg.png",
      "occupation": "Fry Cook",
      "location": "A Pineapple Under the Sea"
    },
    {
      "id": 2,
      "name": "Mr. Krabs",
      "image": "https://vignette3.wikia.nocookie.net/vsbattles/images/8/80/Mr._Krabs.png/revision/latest?cb=20150919162131",
      "occupation": "Restaurant Owner",
      "location": "A Giant Anchor"
    },
    {
      "id": 3,
      "name": "Squidward",
      "image": "https://vignette2.wikia.nocookie.net/fictionalcharacters/images/a/ac/Squidward.png/revision/latest?cb=20131121012626",
      "occupation": "Cashier",
      "location": "An Easter Island Head"
    }];
  };



  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.score + 1;
    this.setState({
      score: newScore,
      warning: ""
    });
    if (newScore >= this.state.topscore) {
      this.setState({ topscore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ warning: "You win!" });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      score: 0,
      topscore: this.state.topscore,
      warning: "Wrong. Click an image to start again!!",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledFriends = shuffleFriends(friends);
    this.setState({ friends: shuffledFriends });
  };


  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Nav
          title="Mixed Clicky Game"
          warning={this.state.warning}
          score={this.state.score}
          topscore={this.state.topscore}
        />
        <a>Choose gifs:</a>
        {this.state.animals.map(animal => (

          <Column size="1">
            <Button
              id={animal.id}
              handleAnimal={this.handleAnimal}
              name={animal.name}
            />
          </Column>
        ))}
        <Title>Click on an image to earn points, but don't click on any more than once!</Title>

        <Container>
          <Row>
            {this.state.friends.map(friend => (
              <Column size="md-3 sm-6">
                <FriendCard
                  key={friend.id}
                  handleClick={this.handleClick}
                  image={friend.image}
                  id={friend.id}
                  location={friend.location}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default App;