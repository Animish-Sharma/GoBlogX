import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { logout } from '../actions/auth'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
const Navbar = () =>{
    const history = useHistory()
    const [search,setSearch] = useState("")
    const isAuthenticated = useSelector(state=> state.auth.isAuthenticated);
    const dispatch = useDispatch()
    const authLinks =(
        <div className="d-flex">
            <Link className="nav-link active" aria-current="page" to="/profile">Profile</Link>
            <Link onClick={()=>dispatch(logout())} className="nav-link active" aria-current="page" to="/logout">Logout</Link>
        </div>
    )
    const guestLinks = (
        <div className="d-flex">
            <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
            <Link className="nav-link active" aria-current="page" to="/signup">Sign Up</Link>
        </div>
    )
    const onChange = (e) => setSearch(e.target.value);
    const onSubmit =(e) =>{
        e.preventDefault();
        let term = search.replace(" ","+")
        history.push(`/search/${term}`)
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark pb-2">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">GoBlogX</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/blog">Blog</Link>
                </li>
                
            </ul>
            <form onSubmit={onSubmit} className="d-flex">
                <input onChange={onChange} className="form-control form-control-sm me-2" name="seach" type="search" placeholder="Search Query" aria-label="Search"/>
                <button type="submit" className="btn btn-primary btn-sm">Search</button>
            </form>
            { isAuthenticated ? authLinks : guestLinks }
            </div>
        </div>
</nav>
    )
}

export default Navbar