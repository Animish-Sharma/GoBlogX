import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Card from "../components/Card";

export default function Blog({ history }){
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        const fetch= async()=>{
            const res = await axios.get("http://localhost:3000/api/posts");
            setPosts(res.data.posts)
            console.log(res.data.posts)
        }
        fetch()
    },[])
    return(
        <div className="container mt-3">
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-between">
                    <Link className="p-2 text-muted" to="/category/world">World</Link>
                    <Link className="p-2 text-muted" to="/category/environment">Environment</Link>
                    <Link className="p-2 text-muted" to="/category/technology">Technology</Link>
                    <Link className="p-2 text-muted" to="/category/design">Design</Link>
                    <Link className="p-2 text-muted" to="/category/culture">Culture</Link>
                    <Link className="p-2 text-muted" to="/category/business">Business</Link>
                    <Link className="p-2 text-muted" to="/category/politics">Politics</Link>
                    <Link className="p-2 text-muted" to="/category/opinion">Opinion</Link>
                    <Link className="p-2 text-muted" to="/category/science">Science</Link>
                    <Link className="p-2 text-muted" to="/category/health">Health and Fitness</Link>
                    <Link className="p-2 text-muted" to="/category/style">Style</Link>
                    <Link className="p-2 text-muted" to="/category/travel">Travel</Link>
                </nav>
            </div>
            <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                <div className="col-md-6 px-0">
                    <h1 className="display-4 font-italic">Welcome to GoBlogX</h1>
                    <p className="lead my-3">This is a test website made by Animish Sharma with Golang and React</p>
                    <p className="lead mb-0"><Link to="/post/create" className="text-white fw-bold">Create...</Link></p>
                </div>
            </div>
            {posts && posts.length !==  0 ? <Card posts={posts} />: <div>
                <h1 className="display-5">No posts available</h1>
                <Link to="/post/create" className="btn btn-warning">Create Some</Link>    
            </div>}
        </div>
    )
}