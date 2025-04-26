import { useContext } from "react"
import { UserContext } from "../context/user"
import { Link } from "react-router-dom"

function UserSettingsFollowerCard({follower}) {

    const { followed, setFollowed, user } = useContext(UserContext)

    const isFollowing = followed.map(f => f.id).includes(follower.id)

    const handleFollowClick = () => {
        let values = {
            follower_id: user.id,
            followed_id: follower.id
        }
        fetch("https://shoutout-for-deployment.onrender.com/follows", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values, null, 2),
        })
        .then((r) => r.json())
        .then(() => {
            const newFollowed = {
                id: follower.id,
                first_name: follower.first_name,
                last_name: follower.last_name,
                profile_pic: follower.profile_pic,
                username: follower.username
            }
            const updatedFollowed = [newFollowed, ...followed]
            setFollowed(updatedFollowed)
        })
    }

    const handleUnfollowClick = () => {
        const follow = {
            follower_id: user.id,
            followed_id: follower.id
        }
        fetch('https://shoutout-for-deployment.onrender.com/follow_delete', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(follow)
        })
        .then(() => {
            const updatedFollowed = user.followed.filter(followed => followed.id !== follower.id)
            setFollowed(updatedFollowed)
        })
    }
    
    return (
        <div className='follow-card'>
            <div className='follow-header'>
                <Link className='follower-link' to={`/users/${follower.id}`}>
                    <img className='follow-pic' src={follower.profile_pic} alt='Profile picture' />
                    <p className='follow-info'>{follower.first_name} {follower.last_name}</p>
                </Link>
                {/* <button>Follow</button> */}
                {!isFollowing ? <button className='button' onClick={handleFollowClick}>Follow</button> : <button className='button' onClick={handleUnfollowClick}>UnFollow</button>}
            </div>
        </div>
    )
}

export default UserSettingsFollowerCard