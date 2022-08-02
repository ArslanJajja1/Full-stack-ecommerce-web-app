import React from "react";

const FileUpload = () => {
    const fileUploadAndResize = (e) => {
        // console.log(e.target.files);
        // resize
        // send back to server to upload to cloudinary
        // set url to images[] in the parent component - Product Create
    };
    return (
        <div className="row">
            <label className="btn btn-primary">
                Choose file
                <input
                    type="file"
                    multiple
                    hidden
                    accept="images/*"
                    onChange={fileUploadAndResize}
                />
            </label>
        </div>
    );
};

export default FileUpload;
