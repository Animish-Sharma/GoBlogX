import axios from "axios";
import Header from "../components/Header";
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
export default function Profile({ history }){
    const user = useSelector(state=> state.auth.user)
    const token = useSelector(state=> state.auth.token)
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        const fetchData=async ()=>{
            const res = await axios.get("http://localhost:3000/get-posts",{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            setPosts(res.data)
            console.log(res.data)
        }
        fetchData()
    },[token])

    return (
        <div className="container-fluid ">
            <Header title="Profile"/>
            
            <h1 className="display-2 text-center mt-3">Profile </h1>
            <div className="d-flex justify-content-sm-around">
                <div className="ml-5">
                    <h1 className="display-4 mb-4">{user ? user.name : null}</h1>
                    <h3>Email :- {user ? user.email : null}</h3>
                    <h3 className="lead m-4">Username:- {user ? user.username : null}</h3>
                    <button type="button" className="btn btn-secondary btn-lg">Update your Profile</button>
                </div>
                <div className="ml-5 ml-5">
                    <h1 className="display-5">User's Posts <Link to="/post/create"><i style={{ fontSize:"30px",marginTop:"10px",color:"black" }} className="bi ml-4 bi-plus-lg float-sm-right"></i></Link></h1>
                    {posts.length > 0 ? <div>
                        <div className="list-group mt-4 float-right">
                            {posts.map((post,i)=>{
                                return <div style={{ width:"80%" }} className="d-flex align-items-center justify-content-between list-group-item list-group-item-action">
                                    <Link to={`/post/${post.slug}`} style={{ width:"70%",color:"#000", textDecoration:"none" }} className="lead">
                                    <img className="image-fluid" src={post.image} width="10%"height="40px" alt={post.title} /> {i+1}. {post.title}
                                    </Link>
                                    <i onClick={()=> history.push(`/post/${post.slug}/update`)} style={{ fontSize:"20px",color:"#272643",cursor:"pointer" }} className="bi bi-pencil float-right"></i>
                                </div>
                            })}
                        </div>
                    </div> : <div>
                        <h3 className="text-center mt-4">You do not have any posts</h3>
                        <p className="lead text-center mb-4">Create some</p>
                        <div className="d-flex justify-content-center">
                            
                            <button onClick={()=> history.push("/post/create")} className="btn btn-warning">Create</button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}