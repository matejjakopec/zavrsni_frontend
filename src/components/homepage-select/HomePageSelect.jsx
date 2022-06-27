import React from "react";
import classes from "./homepage-select.module.css";
import {MenuItems} from "../navbar/MenuItems";

class HomePageSelect extends React.Component{


    render() {
        return (
            <div className={classes.container}>
                <span className={classes.title}>{this.props.title}</span>
                <img src={this.props.icon} alt={this.props.alt}
                className={classes.icon}/>
                <span>{this.props.text}</span>
            </div>
        );
    }

}

export default HomePageSelect;
