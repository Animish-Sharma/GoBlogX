import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Card from "../../components/Card"

export default function Search({ match }){
    const [post,setPost] = useState([])
    useEffect(()=>{
        async function fetch(){
            const res = await axios.get(`http://localhost:3000/api/search/${match.params.term}`)
            setPost(res.data)
            console.log(res.data)
        }
        fetch()
    },[])
    return <div className="container mt-3">
        <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                <div className="col-md-6 px-0">
                    <h1 className="display-4 font-italic">Search at GoBlogX</h1>
                    <p className="lead my-3">This is a test website made by Animish Sharma with Golang and React</p>
                    <p className="lead mb-0"><Link to="/post/create" className="text-white fw-bold">Create...</Link></p>
                </div>
            </div>
        {post && post.length !==  0 ? <Card posts={post} />: <div>
                <h1 className="display-5">No posts available</h1>
                <Link to="/post/create" className="btn btn-warning">Create Some</Link>    
            </div>}
    </div>
}