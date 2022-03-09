import React, { useEffect, useState, useContext } from "react";
import InstagramBasicLayout from "./InstagramBasicSetting";
import { Container } from "react-bootstrap";
import InstagramContent from "./InstagramContent";
import Topbar from "./Topbar";
import FooterButton from "./footerButton";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";
import axios from "axios";
import NoteContext from "./context/NoteContext";

import {
  Frame,
  Loading
} from "@shopify/polaris";
import DashboardTitlebar from "./DashboardTitlebar";
const DashBoard = (props) => {
  const [shop, setshop] = useState([]);
  const [state, setstate] = useState(0);
  const [satusbadge, setsatusbadge] = useState("new");
  const [loader, setloader] = useState(true);
  const [badge_text, setbadge_text] = useState("Conntect Your Instagram Account");
  const app = useAppBridge();
  const context = useContext(NoteContext);
  const {
    getInstagrampostByshopid,
    insta_post_onload,
    getShopData,
    onAccountconnectBadge
  } = context;
  if (state == 0) {
    if (insta_post_onload.length > 0) {
      setloader(true)
      // console.log("p", insta_post_onload);
      if (insta_post_onload[0].data === false) {
        if (onAccountconnectBadge===true) {
          setsatusbadge("success");
          setbadge_text("Account Connected")
        }
        else{
          setsatusbadge("new");
          setbadge_text("Account Not Connected")
        }
        
      }
      else{
      let instadata = insta_post_onload[0].data.data.insta_status;
       if (instadata === true) {
        setsatusbadge("success");
        setbadge_text("Account Connected")
      }
      }
     
      setloader(false)
      setstate(state + 1);
    }
  }

  // get shop data when app load
  async function getshopdata() {
    setloader(true)
    // const axios_instance = axios.create();
    // // Intercept all requests on this Axios instance
    // axios_instance.interceptors.request.use(function (config) {
    //   return getSessionToken(app) // requires a Shopify App Bridge instance
    //     .then((token) => {
    //       // Append your request headers with an authenticated token
    //       config.headers["Authorization"] = `Bearer ${token}`;
    //       return config;
    //     });
    // });
    
    const shop_data = await props.axios_instance.get("/api/init_fauna");
    if (shop_data) {
      setshop([shop_data.data.body]);
      console.log(shop_data);
      getInstagrampostByshopid(shop_data.data.body.shop.id)
    }
    setloader(false)
  }
 
  useEffect(() => {
    setloader(false)
    getshopdata();
    getShopData();
  }, []);
  return (
    <div className="body_dasboard">
      {loader === true ?<div style={{ height: "10px" }}>
        <Frame>
          <Loading />
        </Frame>
      </div>:<div className="empty"></div>}
      <Container fluid>
        <DashboardTitlebar title="Edit Feed" url="/Feed"></DashboardTitlebar>
        <Topbar status_badge={satusbadge} badge_text={badge_text} axios_instance={props.axios_instance} />
        <InstagramContent />
        <InstagramBasicLayout />
        <FooterButton />
      </Container>
      
    </div>
  );
};

export default DashBoard;
