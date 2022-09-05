import React from "react";

import Removals from "../removals/Removals";
import UserContext from "../../context/UserContext";

class CurrentUserRemovals extends React.Component{


    render(){
        let id = this.context.userId
        return (
            <Removals
                backendUrl={"api/users/" + id + "/removal"}
                isAuthor={true}>
            </Removals>
        )
    }
}

CurrentUserRemovals.contextType = UserContext

export default CurrentUserRemovals;