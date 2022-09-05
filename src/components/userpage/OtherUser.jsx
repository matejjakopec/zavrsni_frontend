import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import classes from './userpage.module.css'
import backendUrl from "../backendUrl";
import {Link} from "react-router-dom";
import Garbages from "../garbage/Garbages";
import Removals from "../removals/Removals";

function OtherUser(){
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);



    const {id} = useParams();

    useEffect(()=>{
        axios(backendUrl + "api/users/" + id, {
        })
            .then((res) => {
                setUser(res.data);
            })
    }, []);


    return (
        <div className={classes.container}>
            <h3 className={classes.title}>Korisnički profil</h3>
            <h4 className={classes["text-color"]}>
                <span className={classes.explanation}>Korisničko ime:</span>
                {user.username}
            </h4>
            <p className={classes["text-color"]}>
                <span className={classes.explanation}>Korisnički broj telefona:</span>
                {user.phoneNumber}
            </p>
            <div className={classes['posts-container']}>
                <div>
                    <p className={classes.text}>Najnoviji objavljeni oglasi korisnika u kategoriji <span className={classes.highlight}>Otpad za odvesti</span>
                        <Link to={{pathname: '/korisnik/' + id + "/otpad"}} className={classes.link}>Pogledaj sve
                        </Link></p>
                    <Garbages
                        query = "?perPage=3&orderBy=published&sortOrder=DESC"
                        backendUrl={"api/users/" + id + "/garbage"}>
                    </Garbages>
                </div>
                <div>
                    <p className={classes.text}>Najnoviji objavljeni oglasi korisnika u kategoriji <span className={classes.highlight}>Usluge odvoza</span>
                        <Link to={{pathname: '/korisnik/' + id + "/odvoz"}} className={classes.link}>Pogledaj sve
                        </Link></p>
                    <Removals
                        query = "?perPage=3&orderBy=published&sortOrder=DESC"
                        backendUrl={"api/users/" + id + "/removal"}>
                    </Removals>
                </div>
            </div>
        </div>
    )
}

export default OtherUser;