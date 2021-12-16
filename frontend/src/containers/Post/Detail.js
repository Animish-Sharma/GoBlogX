import axios from "axios";
import { useEffect, useState } from "react"
import Header from "../../components/Header";
import StarRatings from 'react-star-ratings';
export default function Detail({ match,history }){
    const [post,setPost] = useState([]);
    const [comments,setComments] = useState([])
    const [showCreate,setShowCreate] = useState(false);
    const [data,setData] = useState({
        title:"",
        comment:"",
    });
    const { title,comment } = data;
    const [rating,setRating] = useState(0)
    const onChange = (e) => setData({...data,[e.target.name]:e.target.value});
    const onRatingChange = (rating_) => setRating(rating_);
    useEffect(()=>{
        const fetch = async() =>{
            const res = await axios.get(`http://localhost:3000/api/post/${match.params.slug}`)
            setPost(res.data.post)
            setComments(res.data.result)
            console.log(res.data)
        }
        fetch()
    },[match.params.slug])

    const onSubmit = async (e) => {
        e.preventDefault();
        const body = JSON.stringify({ title,comment,"rating": rating.toString(), "post_id":post.id.toString() });
        console.log(body)
        const config={
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
                "Content-Type":"application/json"
            }
        }
        const i = await axios.post("http://localhost:3000/api/review/create",body,config)
        console.log({ "res":i.data })
    }
    return (
        <div className="container d-flex flex-column align-items-center">
            
            <Header title={post && post.title} />
            <h1 className="display-4 text-center mt-3">{post.title}</h1>
            <img src={post.image} width="50%" alt="somrthing" className="image-fluid mt-3" />
            <p className="lead mt-5">{post.content}</p>
            <h1 className="display-5 ">Reviews <i onClick={()=> setShowCreate(!showCreate)} title="Create a Review" style={{ cursor:"pointer",color:"green" }} className="bi bi-plus ml-100%"></i></h1>
            {showCreate === true ?
                <div className="mt-3 ">
                    <form onSubmit={onSubmit}>
                        <div className="input-group mt-2">
                        <span className="input-group-text ">Title</span>
                            <input required name="title" onChange={onChange} type="text" aria-label="First name" className="form-control"/>
                        </div>
                        <div className="input-group mt-4">
                        <span className="input-group-text">Comment</span>
                            <textarea required name="comment" onChange={onChange} type="text" aria-label="First name" className="form-control"/>
                        </div>
                        <div className="input-group mt-4">
                        <span className="input-group-text">Rating</span>
                        <StarRatings
                            starRatedColor="#ffa500"
                            starHoverColor="#ffa500"
                            rating={rating}
                            changeRating={onRatingChange}
                            numberOfStars={5}
                            name="rating"
                        />
                        </div>

                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button type="submit" className="btn btn-outline-dark mt-4 mb-3">Create</button>
                        </div>
                    </form>
                </div>
            : null}
            {
               comments && comments.map((comment_,i)=>{
                    return(
                        <div style={{ minWidth:"80%" }} className="card mt-2 mb-4">
                            <div className="card-body">
                                <h4 className="card-title text-center">{comment_.title}</h4>
                                <p className="card-text text-center">{comment_.content}</p>
                                <div className="d-flex justify-content-center">
                                    <StarRatings rating={comment_.rating} starRatedColor="#ffa500"/>
                                </div>
                                <p onClick={()=> history.replace(`/profile/${comment_.username}`)} style={{ cursor:"pointer" }} className="card-text rr"><small className="text-muted">{comment_.author}</small></p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}