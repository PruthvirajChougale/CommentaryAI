"use client";

import {Button, Row} from "antd";
import axios from "axios";
import { useState } from "react";
export default function Video(){
    const [video,setVideo] = useState("https://d-id-talks-prod.s3.us-west-2.amazonaws.com/google-oauth2%7C115657513961169519185/tlk_Ozcq7hyNqCQmNpNDVkQfR/1760777642422.mp4?AWSAccessKeyId=AKIA5CUMPJBIK65W6FGA&Expires=1760864054&Signature=%2Fe2mfsvlkP1qMlS%2Fi7DD44NwKaE%3D");
    const getData = async () => {
        const res = await axios.get("/api/generateVideo");
        setVideo(res.data.videoUrl);
        console.log(res);
    }
    const name="India";
    const add = async () => {
        const res = await axios.post("/api/addDetails",name);
    }
    return(
        <>
        <Button onClick={getData}>Get</Button>
        <Button onClick={add}>add</Button>
        {video?(<div>
            <video src={video} controls autoPlay width="400" />
        </div>):null}
        </>
    )
}