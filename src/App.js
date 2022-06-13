import axios from "axios";
import React from "react";
import Header from "./Header";

const baseURL = "http://universities.hipolabs.com/search?country=United+Kingdom";

export default function App() {
    const [post, setPost] = React.useState([]);




    React.useEffect(() => {
        axios.get(baseURL).then(response => { setPost(response.data); console.log(post); });


    }, []);

    return (
        <>
            <h1>Hello</h1>
            <Header />
        </>

    );
}