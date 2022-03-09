import React, { useContext } from "react";
import NoteContext from "./context/NoteContext";
import InstagramLogin from "./Instagram";
function AddNewInstaAcc() {
    const context = useContext(NoteContext);
    const {
      responseInstagram_onFailure,
      responseInstagram_onSuccess_addNewFeed,
    } = context;
    const redirect_url = `https://instagram-feed-metiz.herokuapp.com/instagram/shop/redirect_url`
  return (
    <div>
    <div className="App">
      <InstagramLogin
        clientId="659236842149958"
        buttonText="Add New Feed"
        onSuccess={responseInstagram_onSuccess_addNewFeed}
        onFailure={responseInstagram_onFailure}
        scope="user_media,user_profile"
        redirectUri={redirect_url}
      />
    </div> 
  </div>
    
    );
}

export default AddNewInstaAcc;
