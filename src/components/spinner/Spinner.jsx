import React from "react";
import {TailSpin} from "react-loader-spinner";
import classes from './spinner.module.css'

class Spinner extends React.Component{
    render() {
        return(
            <div className={classes.background}>
                <TailSpin
                    wrapperClass={classes.spinner}
                    height="100"
                    width="100"
                    color='#00A86B'
                    ariaLabel='loading'
                />
            </div>
        )
    }
}

export default Spinner;