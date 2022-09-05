import {useParams} from "react-router";

import Garbages from "../garbage/Garbages";

function UserGarbages(){



    const {id} = useParams();

    return (
        <Garbages
            backendUrl={"api/users/" + id + "/garbage"}>

        </Garbages>
    )
}

export default UserGarbages;