import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../App.css';

const SelectMap = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null); 

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleSelectButtonClick = () => {
    if (selectedImage !== null) {
      navigate('/cutscene');
    } else {
      alert("Please select a map first!");
    }
  };

  return (
    <div className="menu-container">
      <h1>Please select the map</h1>
      
      <div className="image-container">
        <a onClick={() => handleImageClick(0)}>
          <img 
            src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yMjEteC5qcGc.jpg" 
            alt="Map 1" 
            className={`map-image ${selectedImage === 0 ? 'selected' : ''}`} 
          />
        </a>
        <a onClick={() => handleImageClick(1)}>
          <img 
            src="https://cdn.pixabay.com/photo/2022/03/11/10/44/apple-7061902_1280.png" 
            alt="Map 2" 
            className={`map-image ${selectedImage === 1 ? 'selected' : ''}`} 
          />
        </a>
        <a onClick={() => handleImageClick(2)}>
          <img 
            src="https://i.pinimg.com/736x/84/bf/31/84bf31a8776c4894b62220dd4623a21a.jpg"
            alt="Map 3" 
            className={`map-image ${selectedImage === 2 ? 'selected' : ''}`} 
          />
        </a>
      </div>

      <button onClick={handleSelectButtonClick}>Select</button>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default SelectMap;


