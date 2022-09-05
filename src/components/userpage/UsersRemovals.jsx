import {useParams} from "react-router";


import Removals from "../removals/Removals";

function UserRemovals(){
    const {id} = useParams();

    return (
        <Removals
            backendUrl={"api/users/" + id + "/removal"}>

        </Removals>
    )
}

export default UserRemovals;