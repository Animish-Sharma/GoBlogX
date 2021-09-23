import { Link } from "react-router-dom"
import Header from "../components/Header"

export default function Home(){
    return(
        <div className="container">
            <Header title="Home"/>
            <div className="bg-light mt-5 p-5 text-center">
                <h1 className="display-3">GoBlogX</h1>
                <p className="lead mt-4">Welcome to our blog. This blog features all kinds of posts. You can post your own article here too</p>
                <p className="lead">You can visit our blog by clicking the link below</p>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <Link className="btn btn-secondary" to="/blog">Blog</Link>
                </div>
            </div>
        </div>
    )
}