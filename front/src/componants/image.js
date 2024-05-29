import React, { useState } from "react";
import { FaUpload, FaEdit } from "react-icons/fa";

const Image = ({ onImageSelect }) => {
  const [base64Image, setBase64Image] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setBase64Image((e.target.result).split(',')[1]);
        onImageSelect((e.target.result).split(',')[1]); // pass base64 data to parent component
      };
      reader.readAsDataURL(img);
    }
  };

  return (
    <div>
      <div>
        <div>
          {base64Image === null ? (
            <label htmlFor="image" className="imgUpload">
              <FaUpload className="uploadIcon" size="200px" />
            </label>
          ) : (
            <div>
              <img src={`data:image/png;base64,${base64Image}`} style={{ width: "300px", height: '200px' }} />
              <label htmlFor="image" className="imgUpload">
                <FaEdit className="editIcon" size="50px" />
              </label>
            </div>
          )}

          <input
            id="image"
            className="d-none"
            type="file"
            name="myImage"
            onChange={onImageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Image;
