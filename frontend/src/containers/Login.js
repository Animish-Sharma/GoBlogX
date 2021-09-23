import { useState } from "react"
import Header from "../components/Header"
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "../actions/auth";
import { useDispatch } from "react-redux";
export default function Login(){
    
    const dispatch = useDispatch()
    const [data,setData] = useState({
        username:"",
        password:""
    });
    const { username,password } = data;
    const onChange = (e) => setData({...data,[e.target.name]:e.target.value});

    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(username,password)
        dispatch(login(username,password))
    }
    const isAuthenticated = useSelector(state=> state.auth.isAuthenticated)
    if(isAuthenticated){
        return <Redirect to="/"/>
    }
    return(
        <div className="container">
            <Header title="Login"/>
            <h1 className="display-5 text-center mt-4">Login</h1>
            <p className="lead text-center">Log into your Account</p>
            <div className="d-flex flex-column align-content-center">
                <div className="d-flex flex-column align-items-center">
                    <img alt="login" width="300px" height="auto" className="img-fluid" src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Online_re_x00h.svg"/>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="input-group mt-4">
                        <span className="input-group-text">Username</span>
                        <input onChange={onChange} name="username" type="text" aria-label="Username" className="form-control"/>
                    </div>
                    <div className="input-group mt-4">
                        <span className="input-group-text">Password</span>
                        <input onChange={onChange} name="password" type="password" aria-label="Password" className="form-control"/>
                    </div>
                    <button style={{ width:"100px" }} className="btn btn-outline-success mt-3" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}