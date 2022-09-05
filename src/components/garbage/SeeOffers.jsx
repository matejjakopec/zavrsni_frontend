import React from "react";
import UserContext from "../../context/UserContext";
import classes from "./seeOffers.module.css";
import Popup from "reactjs-popup";
import axios from "axios";
import backendUrl from "../backendUrl";
import {Link} from "react-router-dom";
import PageSelector from "../page-selector/PageSelector";
import PageSelectorOffer from "../page-selector/PageSelectorOffer";


class SeeOffers extends React.Component{

    state= {
        offers: [],
    }

    componentDidMount() {
        this.fetchData("")
    }

    handleCallback = (childData) =>{
        this.fetchData(childData)
    }

    fetchData(query){
        axios(backendUrl + "api/garbage/" + this.props.postId + "/offers" + query, {
            method: 'GET',
            headers: {
                "Authorization": 'Bearer ' + this.context.token,
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                this.setState({
                    offers: res.data,
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
                                    <div><p className={classes.message + " " + classes.bold}>Poruka</p></div>
                                    <div className={classes['price-author']}>
                                        <div><p className={classes.price + " " + classes.bold}>Cijena</p></div>
                                        <div><p className={classes.price + " " + classes.bold}>Autor</p></div>
                                    </div>
                                </li>
                                {
                                    this.state.offers.map((offer, index) => {
                                        return(
                                            <li key={index} className={classes['offer-container']}>
                                                <div><p className={classes.message}>{offer.message}</p></div>
                                                <div className={classes['price-author']}>
                                                    <div><p className={classes.price}>{offer.price}</p></div>
                                                    <div><Link className={classes.author} to={{pathname: '/korisnik/' + offer.author.id}}><p>{offer.author.username}</p></Link></div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                                <div className={classes.paginator}>
                                    <PageSelectorOffer
                                        parentCallback={this.handleCallback}
                                        postsNumber = {this.state.offers.length}
                                    />
                                </div>
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