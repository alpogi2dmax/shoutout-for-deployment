import { useContext } from "react"
import { UserContext } from "../context/user"
import UserSettingsReplyCard from "./UserSettingsReplyCard"

function UserSettingsReplies() {

    const { replies } = useContext(UserContext)

    return(
        <div>
            {replies.map(reply => (
                <UserSettingsReplyCard key={reply.id} reply={reply} />
            ))}
        </div>
    )
}

export default UserSettingsReplies