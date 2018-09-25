import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import "./App.css";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import Nav from "./components/nav";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    score: 0,
    topscore: 0,
    warning: "Click an image to begin!",
    clicked: [],
  };

  removeFriend = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const friends = this.state.friends.filter(friend => friend.id !== id);
    // Set this.state.friends equal to the new friends array
    this.setState({ friends });
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
        <Title>Click on an image to earn points, but don't click on any more than once!</Title>
        <Container>
          <Row>
            {this.state.friends.map(friend => (
              <Column size="md-3 sm-6">
                <FriendCard
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
