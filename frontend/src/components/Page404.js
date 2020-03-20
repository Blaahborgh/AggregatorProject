import React from "react";
import Typography from "@material-ui/core/Typography";

function Page404() {
    return (
        <div style={{display:"flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap"}}>
            <Typography gutterBottom variant="h1">
                404
            </Typography>
            <Typography style={{width: "100%"}}></Typography>
            <Typography gutterBottom variant="h4">
                Page not found
            </Typography>
        </div>
    )
}

export default Page404