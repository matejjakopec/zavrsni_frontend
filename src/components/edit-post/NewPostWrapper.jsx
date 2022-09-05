
import {useParams} from "react-router";
import EditPost from "./EditPost";

function NewPostWrapper(props){



    const {id} = useParams();

    return (
        <EditPost
        id={id}
        post={props.post}
        redirect={props.redirect}>
        </EditPost>
    )
}

export default NewPostWrapper;