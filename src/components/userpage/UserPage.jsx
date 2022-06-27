import React from 'react';
import axios from "axios";
import UserContext from "../../context/UserContext";
import {Link} from "react-router-dom";
import classes from './userpage.module.css'

class UserPage extends React.Component{
    state={
        id: "",
        username: "",
        email: "",
        phoneNumber: "",
        removals: [],
        garbages: [],
        offers: []
    }

    componentDidMount() {
        axios("http://localhost:8080/api/users", {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Authorization": 'Bearer ' + this.context.token,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
        })
            .then(res => {
                this.setState({
                    id: res.data.id,
                    username: res.data.username,
                    email: res.data.email,
                    phoneNumber: res.data.phoneNumber,
                    removals: res.data.postsRemovals,
                    garbages: res.data.postsGarbages,
                    offers: res.data.offers
                })
            })
    }

    render() {
        return(
            <div className={classes.container}>
                <h3 className={classes.title}>Korisnički profil</h3>
                <h4>
                    <span className={classes.explanation}>Korisničko ime:</span>
                    {this.state.username}
                </h4>
                <p>
                    <span className={classes.explanation}>Korisnički email:</span>
                    {this.state.email}
                </p>
                <p>
                    <span className={classes.explanation}>Korisnički broj telefona:</span>
                    {this.state.phoneNumber}
                </p>

                <div className={classes['new-post-container']}>
                    <Link to={{pathname: "/novi-odvoz"}} className={classes['new-post']}>
                        <i className="fa-solid fa-plus"/>
                        <p className={classes['button-text']}>Usluga odvoza</p>
                    </Link>
                    <Link to={{pathname: "/novi-otpad"}} className={classes['new-post']}>
                        <i className="fa-solid fa-plus"/>
                        <p className={classes['button-text']}>Otpad za odvesti</p>
                    </Link>
                </div>
            </div>
        )
    }
}

UserPage.contextType = UserContext;

export default UserPage;