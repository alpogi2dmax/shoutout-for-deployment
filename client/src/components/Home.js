import React, { useContext } from 'react';
// import CommentList from './CommentList';
import { UserContext } from '../context/user';
import Login from './Login';
// import CreateComment from './CreateComment';

function Home() {

    const { user } = useContext(UserContext)

    console.log(user)

    if (user) {
        return (
            <div>
                <h1>Hello {user.first_name}!</h1>
                {/* <CreateComment /> */}
                {/* <CommentList /> */}
            </div>
        )
    } else {
        return (
            <div>
                <Login />
            </div>
        )
    }
    
}

export default Home