import axios from "axios";
import { useEffect, useState } from "react"
import Header from "../../components/Header";

export default function Detail({ match }){
    const [post,setPost] = useState([]);
    useEffect(()=>{
        const fetch = async() =>{
            const res = await axios.get(`http://localhost:3000/api/post/${match.params.slug}`)
            setPost(res.data.post)
            console.log(res.data)
        }
        fetch()
    },[match.params.slug])
    return (
        <div className="container d-flex flex-column align-items-center">
            <Header title={post && post.title} />
            <h1 className="display-4 text-center mt-3">{post.title}</h1>
            <img src={post.image} width="50%" alt="somrthing" className="image-fluid mt-3" />
            <p className="lead mt-5">{post.content}</p>
            <h1 className="display-5">Reviews</h1>
        </div>
    )
}