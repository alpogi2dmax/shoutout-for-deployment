import { useContext } from "react"
import { UserContext } from "../context/user"
import UserSettingsFollowerCard from "./UserSettingsFollowerCard"

function UserSettingsFollowers() {

    const { followers } = useContext(UserContext)

    if (!followers) {return (<div>Loading...</div>)}

    console.log(followers)

    return (
        <div>
            {followers.map(follower => (
                <UserSettingsFollowerCard key={follower.id} follower={follower} />
            ))}
        </div>
    )
}

export default UserSettingsFollowers