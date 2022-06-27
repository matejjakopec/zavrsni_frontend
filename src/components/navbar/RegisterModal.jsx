import React from "react";
import Popup from "reactjs-popup";
import classes from './registerModal.module.css'
import {TailSpin} from "react-loader-spinner";
import axios from "axios";
import Spinner from "../spinner/Spinner";

class RegisterModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
            email: '',
            phoneNumber: '',
            spinner: [],
            toClose: false
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleRepeatPasswordChange(event) {
        this.setState({repeatPassword: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePhoneNumberChange(event) {
        this.setState({phoneNumber: event.target.value});
    }


    handleSubmit(event) {
        event.preventDefault();
        this.setState({spinner: <Spinner/>})
        try {
            axios("http://localhost:8080/api/users", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    username: this.state.username,
                    password: this.state.password,
                    retypedPassword: this.state.repeatPassword,
                    email: this.state.email,
                    phoneNumber: this.state.phoneNumber,
                },
                withCredentials: true,
                credentials: 'same-origin',
            })
                .then(res => {
                    this.setState({spinner: "Uspjesna registracija"})
                })
        }catch(err){
            console.log(err);
            this.setState({spinner: ["Greska"]})
        }

    }

    render(){
        return(
            <Popup
                trigger={<button className={classes.button}> Registriraj se </button>}
                modal
                nested
            >
                {close => (
                    <div className={classes.container}>
                        <button className={classes.close} onClick={close}>
                            &times;
                        </button>
                        <div className={classes.title}> Registriraj se </div>
                        <div className={classes.description}>Za registraciju upisi potrebne podatke</div>
                        <div>
                            <form className={classes['form-container']}
                                  onSubmit={this.handleSubmit}>
                                <input
                                    type="text"
                                    className={classes['form-item']}
                                    placeholder="Korisničko ime"
                                    onChange={this.handleUsernameChange }
                                    value={this.state.username}
                                />
                                <input
                                    type="text"
                                    className={classes['form-item']}
                                    placeholder="Email"
                                    onChange={this.handleEmailChange }
                                    value={this.state.email}
                                />
                                <input
                                    type="password"
                                    className={classes['form-item']}
                                    placeholder="Zaporka"
                                    onChange={this.handlePasswordChange }
                                    value={this.state.password}
                                />
                                <input
                                    type="password"
                                    className={classes['form-item']}
                                    placeholder="Ponovi zaporku"
                                    onChange={this.handleRepeatPasswordChange }
                                    value={this.state.repeatPassword}
                                />
                                <input
                                    type="text"
                                    className={classes['form-item']}
                                    placeholder="Broj telefona"
                                    onChange={this.handlePhoneNumberChange }
                                    value={this.state.phoneNumber}
                                />
                                <input
                                    type="submit"
                                    value="Registriraj se"
                                    className={classes['action-button']}
                                />
                            </form>
                            {this.state.spinner}
                        </div>
                    </div>
                )}
            </Popup>
        )
    }
}

export default RegisterModal;