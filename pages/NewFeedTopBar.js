import React ,{useContext,useCallback, useState, useEffect}from "react";
import Home from "./home";
import NoteContext from "./context/NoteContext";
import { Context } from '@shopify/app-bridge-react'
import { Redirect } from '@shopify/app-bridge/actions';
import {
  Card,
  Layout,
  Stack,
  VisuallyHidden,
  Badge,
  TextStyle,
  Select,
  Frame,
  Loading,
  Tooltip

} from "@shopify/polaris";
const NewFeedTopBar=(props)=> {
  const app = useContext(Context);
  const redirect = Redirect.create(app);
  const [loader, setloader] = useState(true);
  const [state, setstate] = useState(0);
  const [stateAccountConnect, setstateAccountConnect] = useState(0);
  const [insta_user_name, setinsta_user_name] = useState("Username");
  const context = useContext(NoteContext);
  const {
    instagram_username,
    insta_post_onload,
    getallPost,
    getAllinstapost,
    selectedUserName,
    selected_user
  } = context;
  const [allFeed, setallFeed] = useState([]);
  const [first, setfirst] = useState(1);


  setTimeout(() => {
    if (stateAccountConnect == 0) {
      if (instagram_username != "Username") {
        setinsta_user_name(" ")
        setinsta_user_name(instagram_username)
        // console.log("on account load user name", insta_user_name)
        setstateAccountConnect(stateAccountConnect + 1);
      }
    }
  }, 500);

  if (state == 0) {
    if (insta_post_onload.length > 0) {
      const data_onload = insta_post_onload[0].data;
      if (data_onload === false) {
       
      }
      else{
         // console.log("on window load", insta_post_onload);
      let instadata = insta_post_onload[0].data.data.insta_post;
      const instPostImage = JSON.parse(instadata);
       let instaUserName =instPostImage[0].username
       setinsta_user_name(instaUserName);
      // get all feed 
      const shop_details = async()=>{
        const shop_data = await props.axios_instance.get("/api/init_fauna");
        if (shop_data) {
          // console.log(shop_data.data.body.shop.domain);
          const shop_name = shop_data.data.body.shop.domain;
          getAllinstapost(shop_name);
        }
      }
      shop_details();
      // end call
      }
      setstate(state + 1);
    }
  }
  if (getallPost.length != 0) {
    if (first == 1) {
      setallFeed(getallPost)
      setfirst(first + 1)
      setloader(false)
    }
    
  }
      
 
const handle_feed_btn =()=>{
  redirect.dispatch(Redirect.Action.APP, '/');
}

// feed Selection

const [selected, setSelected] = useState(insta_user_name);

useEffect(() => {
  if (selected_user.length != 0) {
    setinsta_user_name(selected_user.user_name)
  }
  setloader(false)
}, [selected_user]);


const handleSelectChange=(value)=>{
  setSelected(value)
  selectedUserName(value)
}

  const reformattedArray = allFeed.map((obj) => {
    let rObj = {};
    rObj["label"] = obj.user_name, rObj["value"] =  obj.user_name;
    return rObj;
  });     
      



  return (
    <>
        {loader === true ? (
          <div style={{ height: "10px" }}>
            <Frame>
              <Loading />
            </Frame>
          </div>
        ) : (
          <div className="empty"></div>
        )}
      <Layout>
        <Layout.Section>
          <div className="mt-4">
            <Card sectioned={true}>
              <Stack>
                <Stack.Item fill>
                  <Home></Home>
                  <div className="mt-3">
                    <Badge
                      progress="complete"
                      size="small"
                      status={props.status_badge}
                    >
                      {props.badge_text}
                    </Badge>
                  </div>
                  <div className="mt-3">
                   {insta_user_name != "Username" ? <TextStyle variation="strong">
                      User Connected as a {insta_user_name}
                    </TextStyle>: ""}
                  </div>
                </Stack.Item>
                <Stack.Item>
                  {/* <Button onClick={handle_feed_btn}>Add New Feed</Button> */}
                  {/* <Link  removeUnderline monochrome  url="/NewFeedList">Add New Feed</Link> */}
                </Stack.Item>
                <VisuallyHidden>
                <Stack.Item>
                <Tooltip active content="Your Instagram Feed Account"  dismissOnMouseOut  preferredPosition="above" active={false}>
                  <Select
                    options={reformattedArray}
                    onChange={handleSelectChange}
                    value={selected}
                    
                  />
                </Tooltip>
                </Stack.Item>
                </VisuallyHidden>
              </Stack>
            </Card>
          </div>
        </Layout.Section>
      </Layout>
    </>
  );
};
export default NewFeedTopBar;
