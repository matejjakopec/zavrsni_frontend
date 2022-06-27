import React from 'react';
import classes from './footer.module.css'
import { CFooter } from '@coreui/react'

class Footer extends React.Component{
    render() {
        return (
            <CFooter>
            <footer className={classes.container}>
                <p className={classes.text}>Stranica napravljena sa <i className={"fa-solid fa-heart " + classes['icon-heart']}/> koristeći ReactJS</p>
                <p className={classes.text}>Matej Jakopec <i className={"fa-regular fa-copyright "+ classes['icon-copyright']}/></p>
            </footer>
            </CFooter>
        );
    }

}

export default Footer;