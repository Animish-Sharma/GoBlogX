import { useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/auth"
import { Redirect } from "react-router";
export default function Signup(){
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state=> state.auth.isAuthenticated)
    const [data,setData] = useState({
        name:"",
        username:"",
        email:"",
        password:"",
        re_password:""
    });
    const [showPass,setShowPass] = useState(false)
    const [showNote,setShowNote] = useState(false)
    const { name,email,re_password,username,password } = data;
    const onChange = (e) => setData({...data,[e.target.name]:e.target.value});

    const onSubmit=(e)=>{
        e.preventDefault();
        if(password !== re_password) {
            setShowNote(true)
            setTimeout(() => {
                setShowNote(false)
            }, 5000);
        }
        dispatch(register(name,username,email,password));
    }
    if(isAuthenticated){
        return <Redirect to="/"/>
    }
    return(
        <div className="container">
            <Header title="Sign Up"></Header>
            <h1 className="display-5 text-center mt-4">Sign Up</h1>
            <p className="lead text-center">Create a new Account</p>
            {showNote === true ?
            <div className="alert alert-danger" role="alert">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                Passwords do not match
            </div>: null}
            <div className="d-flex flex-column align-content-center">
                <form onSubmit={onSubmit}>
                    <div className="input-group mt-4">
                        <span className="input-group-text">Name</span>
                        <input onChange={onChange} name="name" type="text" aria-label="Name" className="form-control"/>
                    </div>
                    <div className="input-group mt-4">
                        <span className="input-group-text">Username</span>
                        <input onChange={onChange} name="username" type="text" aria-label="Username" className="form-control"/>
                    </div>
                    <div className="input-group mt-4">
                        <span className="input-group-text">Email</span>
                        <input onChange={onChange} name="email" type="email" aria-label="Email" className="form-control"/>
                    </div>
                    <div className="input-group mt-4">
                        <span className="input-group-text">Password</span>
                        <input onChange={onChange} name="password" type={`${showPass ? "text" : "password"}`}aria-label="Password" className="form-control"/>
                    </div>
                    <div className="input-group mt-4">
                        <span className="input-group-text">Re Password</span>
                        <input onChange={onChange} name="re_password" type={`${showPass ? "text" : "password"}`} aria-label="Re Password" className="form-control"/>
                    </div>
                    <div className="form-check form-switch mt-3">
                        <input onChange={()=> setShowPass(!showPass)} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Show Password</label>
                    </div>
                    <button style={{ width:"100px" }} className="btn btn-outline-success mt-3" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}