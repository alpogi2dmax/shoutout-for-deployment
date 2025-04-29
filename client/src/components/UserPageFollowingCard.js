import { useContext } from "react"
import { UserContext } from "../context/user"
import { Link } from "react-router-dom"


function UserPageFollowingCard({followedUserPage}) {

    const { user, setUser, followed, setFollowed } = useContext(UserContext)


    const isFollowing = followed.map(f => f.id).includes(followedUserPage.id)

    const handleFollowClick = () => {
        let values = {
            follower_id: user.id,
            followed_id: followedUserPage.id
        }
        fetch("https://shoutout-for-deployment.onrender.com/follows", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values, null, 2),
        })
        .then((r) => r.json())
        .then(() => {
            const newFollowed = {
                id: followedUserPage.id,
                first_name: followedUserPage.first_name,
                last_name: followedUserPage.last_name,
                profile_pic: followedUserPage.profile_pic,
                username: followedUserPage.username
            }
            const updatedFollowed = [newFollowed, ...followed]
            setFollowed(updatedFollowed)
        })
    }

    const handleUnfollowClick = () => {
        const follow = {
            follower_id: user.id,
            followed_id: followedUserPage.id
        }
        fetch('https://shoutout-for-deployment.onrender.com/follow_delete', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(follow)
        })
        .then(() => {
            const updatedFollowed = followed.filter(followed => followed.id !== followedUserPage.id)
            setFollowed(updatedFollowed)
        })
    }

    
    return (
        <div className='follow-card'>
            <div className='follow-header'>
                <Link className='follower-link' to={`/users/${followedUserPage.id}`}>
                    <img className='follow-pic' src={followedUserPage.profile_pic} alt='Profile picture' />
                    <p className='follow-info'>{followedUserPage.first_name} {followedUserPage.last_name}</p>
                </Link>
                {!isFollowing ? <button className='button' onClick={handleFollowClick}>Follow</button> : <button className='button' onClick={handleUnfollowClick}>UnFollow</button>}
            </div>
        </div>
    )
}

export default UserPageFollowingCard