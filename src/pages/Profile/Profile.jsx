import React from "react";
import "./Profile.css"; // Import your CSS file for styling

function Profile() {

  const handleBoyCharacter = () => {
    console.log("Boy character selected");
  };

  const handleGirlCharacter = () => {
    console.log("Girl character selected");
  };


  return (
    <div className="profile-container">
      <div className="profile-left">
        <div className="profile-title" id="profile-title"><h1 >PROFILE</h1></div>

        <div id="profile-picture-container" className="image-container">
          <img
            src="src\assets\dora_explorer_show.jpg" // Replace with your profile picture URL
            alt="Profile"
            className="profile-img"
          />
        </div>
      </div>
      <div className="profile-right">
        
        <div className="enter-info">
          <label>Name:</label>
          <input placeholder="Enter name"></input>
        </div>
        <div className="enter-info">
          <label>Sex:</label>
          <button onClick={handleBoyCharacter}>Boy</button>
          <button onClick={handleGirlCharacter}>Girl</button>
        </div>
        <div className="enter-info">
          
          <h2>Select Character</h2>
        <div className="image-options">
          <img
            src="src\assets\dora_explorer_show.jpg" // Sample image option
            alt="Option 1"
            className="option-img"
          />
          <img
            src="src\assets\dora_explorer_show.jpg" // Sample image option
            alt="Option 2"
            className="option-img"
          />
          <img
            src="src\assets\dora_explorer_show.jpg" // Sample image option
            alt="Option 3"
            className="option-img"
          />
        </div>
          
        </div>
      </div>
    </div>
  );
}

export default Profile;
