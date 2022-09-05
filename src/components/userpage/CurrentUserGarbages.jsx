import React from "react";
import Garbages from "../garbage/Garbages";
import UserContext from "../../context/UserContext";

class CurrentUserGarbages extends React.Component{


    render(){
        let id = this.context.userId
        return (
            <Garbages
                backendUrl={"api/users/" + id + "/garbage"}
                isAuthor={true}>
            </Garbages>
        )
    }
}

CurrentUserGarbages.contextType = UserContext

export default CurrentUserGarbages;