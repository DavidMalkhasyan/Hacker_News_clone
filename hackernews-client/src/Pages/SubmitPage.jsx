import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import api from "../utils/api";
import "../styles/Submit.css";

const SubmitPage = () => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [text, setText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!url && !text) {
            console.error("Please provide either a URL or text");
            return;
        }

        try {
            const res = await api.post("/posts/", {
                title,
                content: text,
                url,
            });
            console.log("Post created:", res.data);

            setTitle("");
            setUrl("");
            setText("");
        } catch (error) {
            alert("You need to be logged in to submit a post");
            console.error(
                "Error creating post:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <>
            <Navbar />
            <h1>Submit</h1>
            <form onSubmit={handleSubmit}>
                <label>title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>url</label>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <label>text</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <button type="submit">submit</button>
                <div className="info">
                    Leave url blank to submit a question for discussion. If
                    there is no url, text will appear at the top of the thread.
                    If there is a url, text is optional.
                </div>
            </form>
        </>
    );
};

export default SubmitPage;
