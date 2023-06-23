import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar, Badge } from 'antd';

const FileUpload = ({ values, setValues, setImageLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const fileUploadAndResize = (e) => {
    // resize
    let files = e.target.files;
    let allUploadedFiles = values.images;

    if (files) {
      setImageLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : '',
                  },
                },
              )
              .then((res) => {
                setImageLoading(false);
                allUploadedFiles.push(res.data);
                setValues({
                  ...values,
                  images: allUploadedFiles,
                }).catch((error) => {
                  setImageLoading(false);
                });
              });
          },
          'base64',
        );
      }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component - Product Create
  };
  const handleImageRemove = (public_id) => {
    setImageLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : '',
          },
        },
      )
      .then((res) => {
        setImageLoading(false);
        const { images } = values;
        const filteredImages = images.filter((item) => item.public_id !== public_id);
        setValues({ ...values, images: filteredImages });
      })
      .catch((error) => {
        setImageLoading(false);
        console.log(error);
      });
  };
  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            <Badge
              style={{ cursor: 'pointer' }}
              count="X"
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
            >
              <Avatar src={image.url} size={100} shape="square" className="ml-3" />
            </Badge>
          ))}
      </div>
      <div className="row mt-2">
        <label className="btn btn-outline-info text-white ml-3">
          Choose file
          <input type="file" multiple hidden accept="images/*" onChange={fileUploadAndResize} />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
