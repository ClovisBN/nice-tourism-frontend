// src/pages/CreateArticlePage.jsx
import React, { useState } from "react";
import axiosInstance from "../axiosConfig";
import { useDropzone } from "react-dropzone";

const CreateArticlePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".jpg"] },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    try {
      const response = await axiosInstance.post("/articles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error("Error uploading the article:", error); // Handle error response
    }
  };

  return (
    <div className="create-article">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? "active" : ""}`}
        >
          <input {...getInputProps()} />
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ width: "100px", height: "100px" }}
            />
          ) : (
            <p>Drag 'n' drop an image here, or click to select one</p>
          )}
        </div>
        <button type="submit">Create Article</button>
      </form>
    </div>
  );
};

export default CreateArticlePage;
