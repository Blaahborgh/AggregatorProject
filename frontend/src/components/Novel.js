import React from "react";
export default function Novel(props){
    return(
        <div>
            <p>
                {props.novel.name}
            </p>
            <p>
                {props.novel.desc}
            </p>
        </div>
    )
}