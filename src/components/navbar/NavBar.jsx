import React from 'react';
import {MenuItems} from './MenuItems'
import classes from './NavBar.module.css'
import LogInModal from "./LogInModal";
import RegisterModal from "./RegisterModal";
import UserContext from "../../context/UserContext";
import {Link} from "react-router-dom";



class NavBar extends React.Component{

    signOut() {
        localStorage.setItem('token', '');
        localStorage.setItem('expiration', '');
        this.context.setToken("");
        this.context.setUser("", "")
    }

    getSignOut(){
        if(this.context.username.length > 0){
            return(
                <li className={classes["list-item"]}>
                    <Link
                        to={{pathname: "/"}}
                        className={classes['link-button']}
                        onClick={this.signOut}>
                        Odjavi se
                    </Link>
                </li>
        )
        }
    }

    getUser(){
        if(this.context.username.length > 0){
            return(
                <li className={classes["list-item"]}>
                    <Link to={{pathname: "/korisnik"}} className={classes['link-button']}>
                        {this.context.username}
                    </Link>
                </li>
            )
        }
    }



    render() {
        return (
            <nav className={classes.navbar}>
                <div className={classes["name-and-logo"]}>
                    <i className={"fa-solid fa-recycle " + classes.logo}/>
                    <h1>
                        <Link to={{pathname: "/"}} className={classes.name}>
                            Reciklirajmo
                        </Link>
                    </h1>
                </div>
                <ul className={classes["menu-items"]}>
                    {MenuItems.map((item, index)=>{
                        if(this.context.userId.length === 0){
                            if(item.url === '#login'){
                                return(
                                    <li key={index} className={classes["list-item"]}>
                                        <LogInModal/>
                                    </li>
                                )
                            }else
                            {
                                if(item.url === '#register'){
                                    return(
                                        <li key={index} className={classes["list-item"]}>
                                            <RegisterModal/>
                                        </li>
                                    )
                                }else{
                                    return (
                                        <li key={index} className={classes["list-item"]}>
                                            <Link to={{pathname: item.url}} className={classes['link-button']}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    )
                                }
                            }
                        }else{
                            if(item.url === '#login' || item.url === '#register'){}
                                else{
                                    return(
                                        <li key={index} className={classes["list-item"]}>
                                            <Link to={{pathname: item.url}} className={classes['link-button']}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    )
                            }

                        }
                    })}
                    {this.getUser()}
                    {this.getSignOut()}
                </ul>
            </nav>
        )
    }
    
}

NavBar.contextType = UserContext;
export default NavBar