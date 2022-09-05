import React from 'react';
import {MenuItems} from './MenuItems'
import classes from './NavBar.module.css'
import LogInModal from "./LogInModal";
import RegisterModal from "./RegisterModal";
import UserContext from "../../context/UserContext";
import {Link} from "react-router-dom";
import { ToggleSlider }  from "react-toggle-slider";



class NavBar extends React.Component{

    constructor(props) {
        super(props);
        this.onToggle = this.onToggle.bind(this);
    }

    state={
        isLightTheme: true,
    };

    componentDidMount() {
        let isLightTheme = localStorage.getItem("isLightTheme")
        if(isLightTheme === "false"){
            this.onToggle()
        }
    }

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

    onToggle(){
        if(this.state.isLightTheme){
            document.documentElement.style.setProperty('--text-clr',"#FFFFFF");
            document.documentElement.style.setProperty('--background-clr',"black");
            document.documentElement.style.setProperty('--gray-subtle-1',"#1f1f1f");
            document.documentElement.style.setProperty('--gray-subtle-2',"#414141");
            this.setState({isLightTheme: false})
            localStorage.setItem("isLightTheme", "false")
        }else{
            document.documentElement.style.setProperty('--text-clr',"black");
            document.documentElement.style.setProperty('--background-clr',"#FFFFFF");
            document.documentElement.style.setProperty('--gray-subtle-1',"#f6f6f6");
            document.documentElement.style.setProperty('--gray-subtle-2',"#BEBEBE");
            this.setState({isLightTheme: true})
            localStorage.setItem("isLightTheme", "true")
        }
    }

    isDarkTheme(){
        let isLightTheme = localStorage.getItem("isLightTheme")
        if(isLightTheme === "false"){
            return true
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
                    <div className={classes.toggle}>
                        <ToggleSlider
                            active={this.isDarkTheme()}
                            onToggle={this.onToggle}
                            handleBackgroundColorActive={"white"}
                            handleBackgroundColor={"black"}
                            barBackgroundColorActive={"black"}
                            barBackgroundColor={'white'}/>
                    </div>
                </ul>
            </nav>
        )
    }
    
}

NavBar.contextType = UserContext;
export default NavBar