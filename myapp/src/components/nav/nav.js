import React from "react";
import "./nav.css";

const Nav = props => (
    <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" href="/clicky-game/">{props.title}</a>
            </div>
            <ul className="nav navbar-nav">
                <li className="active"><a id="warning">{props.warning}</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
                <li><a id="score">Score: {props.score} | </a></li>
                <li><a id="topscore">Top Score: {props.topscore}</a> </li>
            </ul>
        </div>
    </nav>
);

export default Nav;