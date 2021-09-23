import { Helmet } from "react-helmet";
import React from "react";
export default function Header({ title }){
    return(
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
        </div>
    )
}