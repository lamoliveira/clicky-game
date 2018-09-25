import React from "react";
import "./Button.css";

const Button = props => (
  <div>
    <button className="animal-btn" data-name={props.name}
      onClick={() => props.handleAnimal(props.name)}
    >{props.name}</button> 
  </div>
);

export default Button;