import { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import useCreateFolder from "../hooks/useCreateFolder";
import useGetFileFolders from "../hooks/useGetFileFolders";
import useUploadFile from "../hooks/useUploadFile";

const HomePage = () => {
    const [newFolder, setNewFolder] = useState("");
    const inputRef = useRef(null);
    const [showCreateFolder, setShowCreateFolder] = useState(false);
    const { createFolder } = useCreateFolder();
    const [folderStructure, setFolderStructure] = useState([{ _id: null, name: "Cloud Home" }]);
    const { getFileFolders, fileFolders } = useGetFileFolders();

    const parentFolder = folderStructure[folderStructure.length - 1];

    const handleDoubleClick = (elem) => {
        if (elem.type === "folder") {
            setFolderStructure([...folderStructure, elem]);
        } else {
            window.open(elem.link);
        }
    };

    const handleAllowCreateFolder = () => {
        setShowCreateFolder(true);
    };

    const handleCreateFolder = async () => {
        if (newFolder.length > 0) {
            await createFolder({
                name: newFolder,
                parentId: parentFolder._id,
            });
            getFileFolders(parentFolder._id);
            setShowCreateFolder(false);
        }
    };

    useEffect(() => {
        getFileFolders(parentFolder._id);
    }, [folderStructure]);

    const handleBackClick = (clickIdx) => {
        const newFolderStructure = folderStructure.filter((elem, idx) => idx <= clickIdx);
        setFolderStructure(newFolderStructure);
    };

    const { isUploadAllowed, uploadFile } = useUploadFile();
    const handleFileUpload = async (e) => {
        if (isUploadAllowed) {
            const file = e.target.files;
            await uploadFile({
                file: file[0],
                parentId: parentFolder._id,
            });
            getFileFolders(parentFolder._id);
        } else {
            alert("Uploading is already in progress. Please wait...");
        }
    };

    return (
        <div>
            <Navbar />

            <div className="homepage-main-container" >
                <style>
                    {`
                    .homepage-main-container {
                        background-image: url('https://example.com/background.jpg'); /* Replace with your image URL */
                        background-size: cover;
                        background-position: center;
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        padding: 20px;
                    }

                    .button {
                        background-color: #4CAF50;
                        border: none;
                        color: white;
                        padding: 15px 32px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;
                        margin: 10px 0;
                        cursor: pointer;
                        transition-duration: 0.4s;
                        border-radius: 8px;
                        
                    }

                    .button:hover {
                        background-color: white;
                        color: black;
                        border: 2px solid #4CAF50;
                    }

                    .input {
                        width: 100%;
                        max-width: 300px;
                        padding: 12px 20px;
                        margin: 10px 0;
                        display: inline-block;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        box-sizing: border-box;
                    }

                    .file-upload-input {
                        width: 100%;
                        max-width: 300px;
                        padding: 10px;
                        margin: 10px 0;
                        display: inline-block;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        box-sizing: border-box;
                        transition: border-color 0.3s ease-in-out;
                    }

                    .file-upload-input:hover {
                        border-color: #4CAF50;
                    }

                    .homepage-main-container h3 {
                        margin-bottom: 20px;
                    }

                    .homepage-main-container ul {
                        list-style-type: none;
                        padding: 0;
                        display: flex;
                        gap: 10px;
                    }

                    .homepage-main-container ul li {
                        cursor: pointer;
                        padding: 5px 10px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        transition: background-color 0.3s ease-in-out;
                    }

                    .homepage-main-container ul li:hover {
                        background-color: #f0f0f0;
                    }

                    .create-folder-container {
                        margin: 24px;
                        padding: 24px;
                        background-color: #f9f9f9;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }

                    .folder-file-item {
                        background-color: #fafafa;
                        border: 1px solid grey;
                        border-radius: 8px;
                        width: fit-content;
                        padding: 8px 16px;
                        margin: 8px 16px;
                        cursor: pointer;
                        transition: background-color 0.3s ease-in-out;
                    }

                    .folder-file-item:hover {
                        background-color: #e0e0e0;
                    }

                    .folder-file-item.folder {
                        background-color: yellow;
                    }

                    .folder-file-item.file {
                        background-color: orange;
                    }
                    `}
                </style>
                <h3>Welcome to Cloud Home</h3>
                <button className="button" onClick={handleAllowCreateFolder}>Create Folder</button>
                <input className="file-upload-input input" ref={inputRef} type="file" onChange={handleFileUpload} />
                <ul>
                    {folderStructure.map((elem, idx) => {
                        return <li key={idx} onClick={() => handleBackClick(idx)}>{elem.name}</li>;
                    })}
                </ul>
                <div>
                    {showCreateFolder && (
                        <div className="create-folder-container">
                            <input className="input" value={newFolder} onChange={(e) => setNewFolder(e.target.value)} />
                            <button className="button" onClick={handleCreateFolder}>Create</button><br></br>
                            <button className="button" onClick={() => setShowCreateFolder(false)}>Cancel</button>
                        </div>
                    )}
                </div>
                <div>
                    {fileFolders.map((elem) => {
                        return (
                            <div
                                key={elem._id}
                                className={`folder-file-item ${elem.type === "folder" ? "folder" : "file"}`}
                                onDoubleClick={() => handleDoubleClick(elem)}
                            >
                                <p>{elem.name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
