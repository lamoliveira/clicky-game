import React from "react";
import "./nav.css";

const Nav = props => (
    <nav>
        <ul>
            <li className="brand animated lightSpeedIn">
                <a href="/clicky-game/">{props.title}</a>
            </li>

            <li id="warning">{props.warning}</li>

            <li>
                <a id="score">Score: {props.score} |</a><a id="topscore">Top Score: {props.topscore}</a>
            </li>
        </ul>
    </nav>
);

export default Nav;