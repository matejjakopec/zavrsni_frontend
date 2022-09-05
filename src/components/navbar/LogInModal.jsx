import React from "react";
import Popup from "reactjs-popup";
import classes from "./LogInModal.module.css";
import axios from "axios";
import { TailSpin } from  'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import UserContext from "../../context/UserContext";
import Spinner from "../spinner/Spinner";
import backendUrl from "../backendUrl";


class LogInModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            spinner: [],
            toClose: false
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }


    handleSubmit(event) {
        event.preventDefault();
        this.setState({spinner: <Spinner/>})
        try {
            axios(backendUrl + "api/login_check", {
                method: 'POST',
                data: {
                    username: this.state.username,
                    password: this.state.password
                },
            })
                .then(res => {
                    this.context.setToken(res.data.token);
                    this.getUser(res.data.token);
                    this.setState({spinner: "Uspjesna prijava"})
                    localStorage.setItem('token', res.data.token);
                    const date = parseInt(new Date().getTime()/1000 + 3600);
                    localStorage.setItem('expiration', date.toString());
                })
        }catch(err){
            console.log(err);
            this.setState({spinner: ["Greska, provjerite te pokusajte ponovno"]})
        }

    }

    getUser(token){
        axios(backendUrl + "api/users/current", {
            method: 'GET',
            headers: {
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                this.context.setUser(res.data.id, res.data.username);
            })
    }

    render(){
        return(
            <Popup
                trigger={<button className={classes.button}> Prijavi se </button>}
                modal
                nested
            >
                {close => (
                    <div className={classes.container}>
                        <button className={classes.close} onClick={close}>
                            &times;
                        </button>
                        <div className={classes.title}>Prijava</div>
                        <div className={classes.description}> Za prijavu upiši potrebne podatke </div>
                        <div className="content">
                            <form onSubmit={this.handleSubmit} className={classes['form-container']}>
                                <input
                                    type="text"
                                    className={classes['form-item']}
                                    placeholder="Korisničko ime"
                                    onChange={this.handleUsernameChange }
                                    value={this.state.username}
                                />
                                <input
                                    type="password"
                                    className={classes['form-item']}
                                    placeholder="Zaporka"
                                    onChange={this.handlePasswordChange }
                                    value={this.state.password}
                                />
                                <input type="submit" value="Prijavi se" className={classes['action-button']}/>
                            </form>
                            {this.state.spinner}
                        </div>
                    </div>
                )}
            </Popup>
        )
    }
}

LogInModal.contextType = UserContext;

export default LogInModal;