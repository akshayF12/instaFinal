import React, { useContext } from "react";
import NoteContext from "./context/NoteContext";
import InstagramLogin from "./Instagram";
const home = () => {
  const context = useContext(NoteContext);
  const {
    responseInstagram_onFailure,
    responseInstagram_onSuccess,
  } = context;
  const redirect_url = `https://instagram-feed-metiz.herokuapp.com/instagram/shop/redirect_url`
  return (
    <div>
      <div className="App">
        <InstagramLogin
          clientId="659236842149958"
          buttonText="Connect Account"
          onSuccess={responseInstagram_onSuccess}
          onFailure={responseInstagram_onFailure}
          scope="user_media,user_profile"
          redirectUri={redirect_url}
        />
      </div> 
    </div>
  );
};

export default home;
