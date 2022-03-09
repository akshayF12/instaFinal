import React,{useContext, useCallback, useState, useEffect} from 'react';
import NoteContext from "./context/NoteContext";
import {
  Layout,
  Stack,
  Button,
  Frame,
  Loading,
  Toast,
  VisuallyHidden
} from "@shopify/polaris";
function AddNewFeedbtn(props) {
const [button_loader, setbutton_loader] = useState(false);
const [active, setActive] = useState(false);
const [loader, setloader] = useState(true);
const toggleActive = useCallback(() => setActive((active) => !active), []);

const toastMarkup = active ? (
  <Toast content="Message sent" onDismiss={toggleActive} />
) : null;
  const context = useContext(NoteContext);
  const {imageurl,instagram_user_id, instagram_username,getAllinstapost,long_live_access_token} = context;

const insta_post_save = async()=> {
   setloader(true)
    setbutton_loader(true)
    addnewfeed();
    console.log(instagram_username)
    const instapost = JSON.stringify(imageurl)
    async function addnewfeed() {
        const shop_data = await props.axios_instance.get("/api/init_fauna");
        if (shop_data) {
          console.log(shop_data);
          try {
            if (imageurl.length > 0) {
              let c_id = "instafeed"
              let r_id = Math.random().toString(36).slice(2);
              const id = c_id.concat(r_id);
             const saveinstapost = await props.axios_instance.post("/gdpr/insta/add_new_feed", {
              shop_id: shop_data.data.body.shop.id,
              shop_name: shop_data.data.body.shop.domain,
              user_id: instagram_user_id,
              short_code: id,
              long_live_access: long_live_access_token,
              user_name: instagram_username,
              insta_post: instapost
            }).then(
                (response) => {
                console.log("testdata",response);
                getAllinstapost(shop_data.data.body.shop.domain)
               },
               (error) => {
                  console.log(error);
                }
               );
        
            }
          } catch (error) {
            console.log(error)
          }
        }
        setbutton_loader(false)
        setloader(false)
      }     
}
useEffect(() => {
  setloader(false)
}, []);
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
      <div className="mt-5 mb-5">
        <hr />
        <Layout>
          <Layout.Section>
              <div className='pt-3'>
            <Stack>
              <Stack.Item fill></Stack.Item>
              <Stack.Item>
                <Button
                  loading={button_loader != false}
                  primary
                  onClick={insta_post_save}
                  className="aa"
                >
                  Save New Feed
                </Button>

              </Stack.Item>
            </Stack>
              </div>
          </Layout.Section>
        </Layout>
      </div>
    </>
  );
}

export default AddNewFeedbtn;
