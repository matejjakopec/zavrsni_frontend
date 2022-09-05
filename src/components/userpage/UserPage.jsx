import React, {Component} from 'react';
import axios from "axios";
import UserContext from "../../context/UserContext";
import {Link} from "react-router-dom";
import classes from './userpage.module.css'
import backendUrl from "../backendUrl";
import Garbages from "../garbage/Garbages";
import Removals from "../removals/Removals";

class UserPage extends Component{
    state={
        id: "",
        username: "",
        email: "",
        phoneNumber: ""
    }

    componentDidMount() {
        axios(backendUrl + "api/users/current", {
            method: 'GET',
            headers: {
                "Authorization": 'Bearer ' + this.context.token,
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                this.setState({
                    id: res.data.id,
                    username: res.data.username,
                    email: res.data.email,
                    phoneNumber: res.data.phoneNumber
                })
            })
    }

    render() {
        return(
            <div className={classes.container}>
                <h3 className={classes.title}>Korisnički profil</h3>
                <h4 className={classes["text-color"]}>
                    <span className={classes.explanation}>Korisničko ime:</span>
                    {this.state.username}
                </h4>
                <p className={classes["text-color"]}>
                    <span className={classes.explanation}>Korisnički email:</span>
                    {this.state.email}
                </p>
                <p className={classes["text-color"]}>
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
                <div className={classes['posts-container']}>
                    <div>
                        <p className={classes.text}>Najnoviji objavljeni oglasi korisnika u kategoriji <span className={classes.highlight}>Otpad za odvesti</span>
                            <Link to={{pathname: "/korisnik/otpad"}} className={classes.link}>Pogledaj sve
                            </Link></p>
                        <Garbages
                            query = "?perPage=3&orderBy=published&sortOrder=DESC"
                            isAuthor={true}
                            backendUrl={"api/users/" + this.context.userId + "/garbage"}>
                        </Garbages>
                    </div>
                    <div>
                        <p className={classes.text}>Najnoviji objavljeni oglasi korisnika u kategoriji <span className={classes.highlight}>Usluge odvoza</span>
                            <Link to={{pathname: "/korisnik/odvoz"}} className={classes.link}>Pogledaj sve
                            </Link></p>
                        <Removals
                            query = "?perPage=3&orderBy=published&sortOrder=DESC"
                            isAuthor={true}
                            backendUrl={"api/users/" + this.context.userId + "/removal"}>
                        </Removals>
                    </div>
                </div>
            </div>

        )
    }
}

UserPage.contextType = UserContext;

export default UserPage;