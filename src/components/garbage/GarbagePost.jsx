import React from "react";
import classes from "./garbagePost.module.css"
import UserContext from "../../context/UserContext";
import backendUrl from "../backendUrl";
import axios from "axios";
import defaultImage from "../../images/defaultImage.png"
import {Link} from "react-router-dom";


class GarbagePost extends React.Component{

    miliseconds = Date.parse(this.props.published);
    date = new Date(this.miliseconds);
    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    componentDidMount() {
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleDeleteClick(){
        const token = this.context.token;
        axios(backendUrl + "api/garbage/" + this.props.id, {
            method: 'DELETE',
            headers: {
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                // eslint-disable-next-line no-restricted-globals
                history.back()
            })
    }

    getImage(){
        if(typeof this.props.image === 'undefined'){
            return defaultImage;
        }else{
            return backendUrl + "images/" + this.props.image;
        }
    }

    getDate(){
        const str = this.date.toLocaleDateString('hr-HR', this.options);
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getDeleteEdit(){
        if(this.props.isAuthor === true){
            return(
                <div className={classes['delete-edit-container']}>
                    <span onClick={this.handleDeleteClick} className={classes.delete}><i className="fas fa-trash-alt"/></span>
                    <Link to={{pathname: "/otpad/" + this.props.id + "/uredi"}}><span className={classes.edit}><i className="fas fa-edit"/></span></Link>
                </div>
            )
        }
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
                        <p className={classes.text}>{this.props.location}</p>
                    </div>
                    <div className={classes.row}>
                        <i className={"fa-solid fa-clock " + classes.icon}></i>
                        <p className={classes.text}>{this.getDate()}</p>
                    </div>
                    <div className={classes.row}>
                        <i className={"fa-solid fa-user " + classes.icon}></i>
                        <p className={classes.text}>{this.props.author}</p>
                    </div>
                </div>
                {this.getDeleteEdit()}
            </div>
        )
    }
}

GarbagePost.contextType = UserContext;

export default GarbagePost;