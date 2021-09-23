import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '../actions/auth'
const Navbar = () =>{
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
            <form className="d-flex">
                <input className="form-control form-control-sm me-2" type="search" placeholder="Search Query" aria-label="Search"/>
                <button type="button" className="btn btn-primary btn-sm">Search</button>
            </form>
            { isAuthenticated ? authLinks : guestLinks }
            </div>
        </div>
</nav>
    )
}

export default Navbar