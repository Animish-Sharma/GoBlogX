import { Link } from "react-router-dom";

export default function Card({ posts }){
    const capitalizeLetter= (word) =>{
        if(word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    }
    const cutOff = (string,number) =>{
        return string.slice(0,number);
    }
    const getPosts = () =>{
        let list = [];
        let listResult = [];

        posts && posts.map(post=>{
            return list.push(
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <img height="250" width="400" src={post.image} alt="thumbnail"/>
                        <strong className="d-inline-block mb-2 text-primary">{capitalizeLetter(post.category)}</strong>
                        <h3 className="mb-0 display-5">{cutOff(post.title,20)}</h3>
                        <p className="card-text mb-auto">{cutOff(post.content,100)}</p>
                        <Link to={`/post/${post.slug}`} className="stretched-link">Continue reading....</Link>
                    </div>
                    <div className="d-none d-lg-block">
                    </div>
                </div>
            )
            
        })
        for(let i =0; i < list.length; i+=2){
            listResult.push(
                <div key={i} className="row mb-2">
                    <div className="col-md-6">
                        {list[i]}
                    </div>
                    <div className="col-md-6">
                        {list[i+1] ? list[i+1] : null}
                    </div>
                </div>
            )
        }
        return listResult
    }
    return(
        <div>
            {getPosts()}
        </div>
    )
}