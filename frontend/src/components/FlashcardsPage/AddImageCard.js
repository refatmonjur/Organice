import React from "react";
import { useState, useEffect } from "react";

// Backend
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";

// Front end
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { Button, TextField, TextareaAutosize } from "@mui/material";

//CSS
import "./Flashcard.css";

// function AddImageCard() {


const AddImageCard = () => {
    //Borrowed from Cloudinary Upload Image tutorial
    const [image, setImage] = useState("");

    const [url, setUrl] = useState("");
    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "tutorial")
        data.append("cloud_name", "breellz")
        fetch("  https://api.cloudinary.com/v1_1/breellz/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => console.log(err))
    }

    const avatarStyle = { backgroundColor: "indigo" };
    const stylButn = { margin: "8px 0" };
    const stylField = { margin: "8px 0" };

    return (
        <div>
            <div>
                <NewHomeNavbar />
            </div>

            <div className="addnewdeck-header center-text">
                <div
                    id="flex-containerQA"
                >
                    <div
                        style={{ marginBottom: 20 }}
                    >
                        Please give your Image Deck a name
                    </div>
                    <TextField
                        label="Name of Deck"
                        className="textfield-White"
                        placeholder="Please enter the name of the Deck"
                        fullWidth
                        required
                        style={stylField}
                    //onChange={}
                    />
                </div>


            </div>

            {/* Question Answer Add Cards Div */}
            <div className="addnewdeck-header center-text">
                <div
                    id="flex-containerQA"
                >
                    <div >
                        Fill in your Word, Image, Definition, and Purpose
                    </div>
                    <TextareaAutosize
                        className="textfield-White fields-spacing "
                        placeholder="Enter Word"

                    />

                    <TextareaAutosize
                        className="textfield-White fields-spacing "
                        placeholder="Enter Definition"
                    />

                    <TextareaAutosize
                        className="textfield-White fields-spacing "
                        placeholder="Enter Purpose/Use"
                    />

                    <div
                        className="whiteBg center"
                        id="flex-containerQA"
                        style={{
                            borderRadius: 10,
                            maxWidth: 1000,
                            marginTop: 35
                        }}
                    >
                        <div id="flex-containerQA">
                            <input
                                type="file"
                                className="file-upload-button"
                                onChange={(e) => setImage(e.target.files[0])}
                                style={{
                                    color: "blue",
                                    marginBottom: 30,
                                }}
                            />
                            <Button
                                onClick={uploadImage}
                                style={{
                                    backgroundImage: "linear-gradient(89.97deg, #cea9f5 1.84%, #F49867 102.67%)",
                                    color: "blue",
                                    fontWeight: 500
                                }}
                            >
                                Upload
                            </Button>
                        </div>
                        <div>
                            <h4
                                style={{
                                    fontWeight: "normal",
                                    marginTop: 15
                                }}
                            >
                                Uploaded image will be displayed here
                            </h4>
                            <div>
                                <img
                                    src={url}
                                    style={{
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        borderRadius: 10,
                                        maxHeight: 400
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="flex-containerbtns">

                <Button
                    className="add-card-btn"
                    style={{ marginTop: 20 }}
                >
                    Add Card
                </Button>

                <Button
                    className="finish-deck-btn"
                    style={{ marginTop: 20 }}
                >
                    Finish & Save
                </Button>

            </div>





        </div>
    );

}

export default AddImageCard;
