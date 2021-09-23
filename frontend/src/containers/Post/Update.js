import axios from "axios";
import { useState } from "react";
import Header from "../../components/Header";

export default function Update({ match,history }){
    const [data,setData] = useState({
        title:"",
        content:"",
        category:""
    });
    const { title,content,category } = data
    const [image,setImage] = useState("")
    const onChange = (e) => setData({...data,[e.target.name]:e.target.value});

    const onImageChange = e =>{
        setImage(e.target.files[0])
    }
    const onSubmit = async e =>{
        e.preventDefault()
        if(image === null){
            setImage("")
        }
        console.log({ title,content,image })
        let formData = new FormData()
        formData.append("title",title);
        formData.append("content",content);
        formData.append("category",category)
        formData.append("image",image);
        formData.append("slug",match.params.slug)
        const config={
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }
        await axios.post("http://localhost:3000/api/post/update",formData,config)
        history.push("/blog")
    }
    return (
        <div className="container">
            <Header title={`Update: ${match.params.slug}`}/>
            <h1 className="display-4 text-center mt-4">Update</h1>
            <form>
                <div className="input-group mt-2">
                <span className="input-group-text ">Title of Post</span>
                    <input required name="title" onChange={onChange} type="text" aria-label="First name" className="form-control"/>
                </div>
                <div className="input-group mt-4">
                <span className="input-group-text">Content</span>
                    <textarea required name="content" onChange={onChange} type="text" aria-label="First name" className="form-control"/>
                </div>
                <div className="input-group mt-3">
                    <input required onChange={onImageChange} type="file" className="form-control" id="inputGroupFile02"/>
                </div>
                <div className="input-group mt-3">
                    <select required onChange={onChange} name="category" class="form-select form-select-sm" aria-label="Default select example">
                    <option value="World">World</option>
                    <option value="Environment">Environment</option>
                    <option value="Technology">Technology</option>
                    <option value="Design">Design</option>
                    <option value="Culture">Culture</option>
                    <option value="Business">Business</option>
                    <option value="Politics">Politics</option>
                    <option value="Opinion">Opinion</option>
                    <option value="Science">Science</option>
                    <option value="Health">Health</option>
                    <option value="Style">Style</option>
                    <option value="Travel">Travel</option>
                    </select>
                </div>

                <div className="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" className="btn btn-outline-success mt-4 mb-3">Update</button>
                </div>
            </form>
        </div>
    )
}