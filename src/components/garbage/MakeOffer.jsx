import React from "react";
import Popup from "reactjs-popup";
import {TailSpin} from "react-loader-spinner";
import axios from "axios";
import UserContext from "../../context/UserContext";
import classes from "./makeOffer.module.css"
import backendUrl from "../backendUrl";

class MakeOffer extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            message: "",
            price: "",
            spinner: []
        };

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({spinner: <TailSpin
                height="100"
                width="100"
                color='#00A86B'
                ariaLabel='loading'
            />})
        try {
            axios(backendUrl + "api/offer/create", {
                method: 'POST',
                headers: {
                    "Authorization": 'Bearer ' + this.context.token,
                    'Content-Type': 'application/json',
                },
                data: {
                    post: this.props.id,
                    message: this.state.message,
                    price: this.state.price
                },
            })
                .then(res => {
                    this.setState({spinner: "Ponuda uspješno poslana"});
                })
        }catch(err){
            console.log(err);
            this.setState({spinner: []})
        }

    }

    handleMessageChange(event) {
        this.setState({message: event.target.value});
    }

    handlePriceChange(event) {
        this.setState({price: event.target.value});
    }

    getOffer(){
        if(this.context.username.length > 0 && this.context.userId !== this.props.userId){
            return(
                <Popup
                    trigger={<button className={classes.button}>Daj ponudu</button>}
                    modal
                    nested
                >
                    {close => (
                        <div className={classes.container}>
                            <button className={classes.close} onClick={close}>
                                &times;
                            </button>
                            <div className={classes.title}>Ponuda</div>
                            <div className={classes.description}> Pošalji ponudu za ovaj oglas </div>
                            <div className="content">
                                <form onSubmit={this.handleSubmit} className={classes['form-container']}>
                                    <textarea
                                        rows="4"
                                        className={classes['form-item']}
                                        placeholder="Poruka"
                                        onChange={this.handleMessageChange }
                                        value={this.state.message}
                                    />
                                    <input
                                        type="number"
                                        className={classes['form-item']}
                                        placeholder="Cijena"
                                        min="1"
                                        onChange={this.handlePriceChange }
                                        value={this.state.price}
                                    />
                                    <input
                                        type="submit"
                                        value="Pošalji ponudu"
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

    render() {
        return(
            <div>
                {this.getOffer()}
            </div>
        )
    }
}

MakeOffer.contextType = UserContext;

export default MakeOffer;