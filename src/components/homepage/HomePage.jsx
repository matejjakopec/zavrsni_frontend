import React from "react";
import HomePageSelect from "../homepage-select/HomePageSelect";
import GarbageTruck from "../../images/garbage-truck.svg"
import TrashToTake from "../../images/trash-to-take.svg"
import classes from "./homepage.module.css";
import {Link} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Removals from "../removals/Removals";
import Garbages from "../garbage/Garbages";

class HomePage extends React.Component{

    constructor() {
        super();
        this.removal = "Imate otpad i trebate njegov odvoz? Pogledajte koje usluge vam se mogu ponuditi za odvoz vašeg otpada";
        this.garbage = "Nudite usluge odvoza i zanima Vas tko sve treba te usluge? Pogledajte objave otpada kojeg treba odvesti";
    }

    render() {
        return (
            <div className={classes.container}>
                <p className={classes.title}>Odaberi kategoriju:</p>
                <div className={classes["choose-container"]}>
                    <Link to={{pathname: "/otpad"}} className={classes.link}>
                        <HomePageSelect
                            title="Otpad za odvesti"
                            icon={GarbageTruck}
                            alt="GarbageTruck"
                            text={this.removal}
                        />
                    </Link>
                    <Link to={{pathname: "/odvoz"}} className={classes.link}>
                        <HomePageSelect
                            title="Usluge odvoza"
                            icon={TrashToTake}
                            alt="TrashToTake"
                            text={this.garbage}
                        />
                    </Link>
                </div>
                    <div>
                        <p className={classes.text}>Najnoviji oglasi u kategoriji <span className={classes.highlight}>Otpad za odvesti</span></p>
                        <Garbages
                            query = "?perPage=3&orderBy=published&sortOrder=DESC">
                        </Garbages>
                    </div>
                    <div>
                        <p className={classes.text}>Najnoviji oglasi u kategoriji <span className={classes.highlight}>Usluge odvoza</span></p>
                        <Removals
                            query = "?perPage=3&orderBy=published&sortOrder=DESC">
                        </Removals>
                    </div>
            </div>
        );
    }

}

HomePage.contextType = UserContext;

export default HomePage;
