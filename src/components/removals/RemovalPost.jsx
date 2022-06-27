import React from "react";
import classes from "./RemovalPost.module.css"
import UserContext from "../../context/UserContext";


class RemovalPost extends React.Component{

    miliseconds = Date.parse(this.props.published);
    date = new Date(this.miliseconds);
    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    getImage(){
        if(JSON.parse(this.props.images).length == 0){
            return "./images/defaultImage.png";
        }else{
            return "http://localhost:8080/images/" + JSON.parse(this.props.images)[0].url;
        }
    }

    getDate(){
        const str = this.date.toLocaleDateString('hr-HR', this.options);
        return str.charAt(0).toUpperCase() + str.slice(1);
    }



    render(){
        return(
            <div className={classes.container}>
                <div className={classes["image-container"]}>
                    <img className={classes.image}
                         src={this.getImage()}
                         alt=""/>
                </div>
                <div>
                    <h4 className={classes.title}>{this.props.title}</h4>
                    <div className={classes.row}>
                        <i className={"fa-solid fa-location-dot " + classes.icon}/>
                        <p>{this.props.location}</p>
                    </div>
                    <div className={classes.row}>
                        <i className={"fa-solid fa-clock " + classes.icon}></i>
                        <p>{this.getDate()}</p>
                    </div>
                    <div className={classes.row}>
                        <i className={"fa-solid fa-user " + classes.icon}></i>
                        <p>{this.props.author}</p>
                    </div>
                </div>
            </div>
        )
    }
}

RemovalPost.contextType = UserContext;

export default RemovalPost;