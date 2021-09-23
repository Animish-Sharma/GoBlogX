import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card";

export default function Category(props){
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        const fetch = async() =>{
            const body = JSON.stringify({ category:props.match.params.category })
            console.log(body)
            const res = await axios.post("http://localhost:3000/api/category",body,{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            console.log(res.data)
            setPosts(res.data.posts)
        }
        fetch()
    },[props.match.params.category])
    const capitalizeLetter= (word) =>{
        if(word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    }

    return(
        <div className="container">
            <h1 className="display-3 text-center mt-3">{capitalizeLetter(props.match.params.category)}</h1>
            {posts && posts.length === 0 || posts === null ? <div className="bg-light p-5 mt-3">
                <h1 className="display-5 text-center">No posts available in this category</h1>
                <div className="d-grid gap-2 col-6 mx-auto mt-3">
                    <Link className="btn btn-warning" to="/post/create">Create Some</Link>
                </div>
            </div> : <div className="mt-4">
                <Card posts={posts}/>    
            </div>}
        </div>
    )
}