import {Banner} from "@shopify/polaris";
import React, {useState} from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import MultiFeedList from './MultiFeedList';
import InstallCode from "./InstallCode";
import Faq_Dashboard from "./Faq_Dashboard";
import WelcomeBanner from "./WelcomeBanner";
const Index = (props) => {
const [urltheme, seturltheme] = useState("");
const [ClientName, setClientName] = useState(null);
  const testFauna = async () => {
    const shop_data = await props.axios_instance.get("/api/init_fauna").then((response) => {
        // console.log(response);
        setClientName(response.data.body.shop.shop_owner)
        themedata();   
  })
  .catch((error) => {
      // Error
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert(error.response.data)
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
      } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the 
          // browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
      }
      
  });   
  };
  testFauna();
  const themedata = async() => {
  const shop_data = await props.axios_instance.get("/api/theme");
  if (shop_data) {
    seturltheme(shop_data.data)
    
  }
};

const onhandleclickbanner = () => {
 return window.open(urltheme);
};


  return (
    <div className="body_padding">
      <div className="banner_c mt-5 pb-5">
        {ClientName != null ?<WelcomeBanner ClientName={ClientName}></WelcomeBanner>:""}
        <Banner title="Active Theme App Extensions" status="info">
          <p className="m-0 text-capitalize">
            You must need to enable theme app extension so our app working
            smooth on your store.Shopify strongly recommends that Shopify apps
            use theme app extensions to integrate with online stores. We create
            a theme app extension "Instafeed Theme App Extension" So Our app
            work well with Online Store 2.0 updated themes. Theme app
            integration add on your theme when you install theme and remove when
            you uninstall theme.
          </p>
          <div className="Polaris-Banner__Actions">
            <div className="Polaris-ButtonGroup">
              <div className="Polaris-ButtonGroup__Item">
                <div className="Polaris-Banner__PrimaryAction">
                  <button className="Polaris-Banner__Button" type="button" onClick={onhandleclickbanner}>
                     Theme App Extension
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Banner>
        <InstallCode></InstallCode>
        <Faq_Dashboard></Faq_Dashboard>
      </div>
      
    </div>
  );
  
}

export default Index;
