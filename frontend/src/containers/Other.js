import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"

export default function Other({ match,history }) {
    console.log(match.params.username)
    const [user,setUser] = useState([])
    useEffect(()=>{
        async function fetch(){
            const res = await axios.get(`http://localhost:3000/user/${match.params.username}`);
            setUser(res.data.user)
            console.log(res.data.user)
        }
        fetch()
    },[match.params.username])
    return <div>
        <Header title={user ? user.name : "loading"} />
        <h1 className="display-4 text-center mb-2">{user && user.name}'s Profile</h1>
        <p className="lead text-center" style={{ fontSize:"25px" }}>@{user && user.username}</p>
        <div className="d-flex justify-content-around">
            <div>
                <h1 className="display-5 text-center">Posts</h1>
                {user.posts && user.posts.map((post,i)=>{
                    return <div style={{ width:"90%",cursor:"pointer" }} className="d-flex align-items-center justify-content-between mb-3 list-group-item list-group-item-action">
                    <Link to={`/post/${post.slug}`} style={{ width:"40%",color:"#000", textDecoration:"none" }} className="lead">
                    <img className="image-fluid" src={post.image} width="10%"height="50px" alt={post.title} /> {i+1}. {post.title}
                    </Link>
                </div>
                })}
            </div>
        </div>
    </div>
}