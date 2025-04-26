import CommentCard from "./CommentCard"
import { useContext, useEffect } from "react"
import { UserContext } from "../context/user"
import { CommentContext } from "../context/comment"
import './App.css'

function CommentList() {

    const { user } = useContext(UserContext)
    const { comments, setComments } = useContext(CommentContext)

    useEffect(() => {
        if (user) {
            fetch('https://shoutout-for-deployment.onrender.com/comments', {
                credentials: 'include'
            })
            // fetch('http://localhost:5000/comments')
            .then(r => r.json())
            .then(data => setComments(data))
        }
    }, [])

    console.log(comments)

    return (
        <div>
            {comments.map(comment => (
                <CommentCard key={comment.id} comment={comment} user={user}/>
            ))}
        </div>
        
    )

}

export default CommentList