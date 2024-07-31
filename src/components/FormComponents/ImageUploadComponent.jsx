// src/components/FormComponents/ImageUploadComponent.jsx
import React from "react";
import Dropzone from "react-dropzone";

const ImageUploadComponent = ({ image, setImage }) => {
  const handleDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  return (
    <div>
      <Dropzone
        onDrop={handleDrop}
        accept={{ "image/*": [".jpeg", ".png", ".jpg"] }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
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
        )}
      </Dropzone>
    </div>
  );
};

export default ImageUploadComponent;
