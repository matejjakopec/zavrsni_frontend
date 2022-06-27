import React from "react";
import UserContext from "../../context/UserContext";
import classes from "./seeOffers.module.css";
import Popup from "reactjs-popup";
import axios from "axios";


class SeeOffers extends React.Component{

    state= {
        offers: [],
    }

    componentDidMount() {
        axios("http://localhost:8080/api/post_garbages/" + this.props.postId + "/offers", {
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
                    offers: res.data['hydra:member'],
                })
                console.log(this.state.offers)
            })
    }


    getOfferContainer(){
        if(this.context.username.length > 0 && this.context.userId === this.props.id){
            return(
                <Popup
                    trigger={<button className={classes.button} > Vidi ponude </button>}
                    modal
                    nested
                >
                    {close => (
                        <div className={classes.container}>
                            <button className={classes.close} onClick={close}>
                                &times;
                            </button>
                            <div className={classes.title}>Ponude</div>
                            <div className={classes.description}> Ponude od svih korisnika </div>
                            <div className={classes.content}>
                                <li className={classes['offer-container']}>
                                    <div><p className={classes.message}>Poruka</p></div>
                                    <div><p className={classes.price}>Cijena</p></div>
                                </li>
                                {
                                    this.state.offers.map((offer, index) => {
                                        return(
                                            <li key={index} className={classes['offer-container']}>
                                                <div><p className={classes.message}>{offer.message}</p></div>
                                                <div><p className={classes.price}>{offer.price}</p></div>
                                            </li>
                                        )
                                    })
                                }
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
                {this.getOfferContainer()}
            </div>
        )
    }
}

SeeOffers.contextType = UserContext;

export default SeeOffers;