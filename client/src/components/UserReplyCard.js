import { useContext } from "react";
import { UserContext } from "../context/user";
import { Link } from "react-router-dom";

function UserReplyCard({reply, handleUpdateReplies}) {

    const { user } = useContext(UserContext)

    const createdDate = new Date(reply.created_date)

    const options = { month: 'long' };
    const month = new Intl.DateTimeFormat('en-US', options).format(createdDate);
    const day = createdDate.getDate();
    const year = createdDate.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`

    const handleLikeClick = () => {
        const reply_likes = reply.reply_likes
        if (reply_likes.map(like => like.reply_liker.id).includes(user.id)) {
            const reply_like = reply_likes.find(like => like.reply_liker.id === user.id)
            fetch(`https://shoutout-for-deployment.onrender.com/reply_likes/${reply_like.id}`, {
                method: "DELETE",
            })
            .then(() => {
                const updatedReply = {
                    ...reply,
                    reply_likes: reply.reply_likes.filter(x => x.reply_liker.id !== user.id)
                }
                handleUpdateReplies(updatedReply)
            })
        } else {
            let values = {
                reply_liker_id: user.id,
                liked_reply_id: reply.id
            }
            fetch('https://shoutout-for-deployment.onrender.com/reply_likes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => r.json())
            .then(reply_like => {
                const updatedReply = {
                    ...reply,
                    reply_likes: [...reply_likes, reply_like]
                }
                handleUpdateReplies(updatedReply)
                
            })
        }
    }

    return(
        <div className='reply-card'>
            
                <div className='reply-header'>
                    <img className='reply-pic' src={reply.replier.profile_pic} alt='Profile' />
                    <div className='user-info'>
                        <h2 className='user-name'>{reply.replier.first_name} {reply.replier.last_name}</h2>
                        <small className='reply-date'>{formattedDate}</small>
                    </div>
                </div>
      
            <div className='reply-content'>
                <Link className='link-comment-style' to={`/comments/${reply.comment.id}`}>
                    <p>{reply.reply}</p>
                </Link>
            </div>
            <div className='reply-actions'>
                <p onClick={handleLikeClick}>
                    {reply.reply_likes.length}    {reply.reply_likes.map(like => like.reply_liker.id).includes(user.id) ? 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" height='20' width='20'>
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" width='20' height='20'>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    }
                </p>
                
                {/* <p>Reply</p> */}
            </div>
        </div>
    )
}

export default UserReplyCard