import NoteContext from "./NoteContext";
import react, { useState, useEffect,useContext } from "react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";
import axios from "axios";
const formData = require("form-data");

const NoteStates = (props) => {
  const [shop, setshop] = useState([]);
  const [insta_post_onload, setinsta_post_onload] = useState([]);
  const [instagram_user_id, setinstagram_user_id] = useState([]);
  const [model_product_onSelect, setmodel_product_onSelect] = useState(false)
  const [long_live_access_token, setlong_live_access_token] = useState([]);
  const [getallPost, setgetallPost] = useState([]);
  const [redirectOnsave, setredirectOnsave] = useState(false)
  const [spiner, setspiner] = useState(false);
  const [layoutstyle, setlayoutstyle] = useState('Grid');
  const [selected_user, setselected_user] = useState([]);
  const [titlealignment, settitlealignment] = useState('right')
  const [imagespace, setimagespace] = useState("3")
  const [instagrUserid_product, setinstagrUserid_product] = useState('')
  const [onclickmgProduct, setonclickmgProduct] = useState([])
  const [instagram_username, setinstagram_username] = useState("Username");
  const [title, settitle] = useState('Feed Title');
  const [imageurl, setimageurl] = useState([]);
  const [instapost_img_id, setinstapost_img_id] = useState([]);
  const [imageclick, setimageclick] = useState('Do Nothing');
  const [col, setcol] = useState('3');
  const [row, setrow] = useState('1');
  const [productSettings, setproductSettings] = useState("false")
  const [model_product, setmodel_product] = useState('')
  const [componetstate, setcomponetstate] = useState(true);
  const [ondatasave, setondatasave] = useState(false);
  const [alertText, setalerText] = useState("");
  const [user_name, setuser_name] = useState([]);
  const [titlesize, settitlesize] = useState("25")
  const [instapost_data, setinstapost_data] = useState([]);
  const [onAccountconnectBadge, setonAccountconnectBadge] = useState(false);
  const app = useAppBridge();

  const responseInstagram_onFailure = (response) => {
    console.log("Login fail");
    // console.log(response);
  };


  const responseInstagram_onSuccess = (response) => {
    console.log(response);
    console.log("post_data",insta_post_onload)
    demo(response);
  };

  const responseInstagram_onSuccess_addNewFeed = (response) => {
    console.log("add_feed_res",response);
    const addnewFeedstr = 1;
    demo(response,addnewFeedstr);
  };
  


  // get shop data function use when you need shop data
  async function getShopData() {
    // const authFetch = authenticatedFetch(app);
    // const res = await authFetch("/api/init_shop_fun");

    // console.log(res);
    const axios_instance = axios.create();
    // Intercept all requests on this Axios instance
    axios_instance.interceptors.request.use(async function (config) {
      const token = await getSessionToken(app);
      // Append your request headers with an authenticated token
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });

    const shop_data = await axios_instance.get("/api/init_fauna");
    if (shop_data) {
      setshop(shop_data);
      console.log(shop_data);
    }
  
  }
  // get instagram post on app load from data base
  const getInstagrampostByshopid = async (shopid) => {
    const axios_instance = axios.create();
    // Intercept all requests on this Axios instance
    axios_instance.interceptors.request.use(function (config) {
      return getSessionToken(app) // requires a Shopify App Bridge instance
        .then((token) => {
          // Append your request headers with an authenticated token
          config.headers["Authorization"] = `Bearer ${token}`;
          return config;
        });
    });
    const getinstapost = await axios_instance
      .post("/gdpr/insta/find_by_user_id", {
        shop_id: shopid,
      })
      .then(
        (response) => {
          setinsta_post_onload([response]);
          if (response.data != false) {
            setinstagrUserid_product(response.data.data.user_id);
            const product_settings = response.data.data.instagramLayoutSettings.photoSetings.productSettings.product;
            setmodel_product(product_settings)
            setproductSettings(response.data.data.instagramLayoutSettings.photoSetings.productSettings.product);
          }else{
             setinstagrUserid_product("null");
          }
         
        },
        (error) => {
          console.log(error);
        }
      );
  };
  // save and update instagram post 
  const insta_post = async () => {
    const axios_instance = axios.create();
    axios_instance.interceptors.request.use(function (config) {
      return getSessionToken(app) 
        .then((token) => {
          config.headers["Authorization"] = `Bearer ${token}`;
          return config;
        });
    });

    const shop_data = shop;
    const shopid = shop_data.data.body.shop.id;
    const insgram_post = JSON.stringify(imageurl);
    // console.log(instagram_user_id);
    try {
      if (imageurl.length > 0) {
        console.log(titlealignment)
       const saveinstapost = await axios_instance.post("/gdpr/insta/user_create", {
        shop_id: shopid,
        shop_name: shop_data.data.body.shop.domain,
        user_id: instagram_user_id,
        long_live_access: long_live_access_token,
        user_name: instagram_username,
        insta_post: insgram_post,
        instagramLayoutSettings:{
          basicLayoutSettings:{
             feedTitle: title,
             alignment: titlealignment,
             size: titlesize
          },
          photoSetings:{
          layout: layoutstyle,
          imageSpacing: imagespace,
          onImageClick: imageclick,
          rows: row,
          coulumns: col,
          productSettings:{
            product: productSettings
          }
          }
      }
      }).then(
          (response) => {
          console.log("testdata",response);
           setondatasave(true)
           setalerText("Saved!")
           setondatasave(false)
         },
         (error) => {
            console.log(error);
            setalerText("Something Wrong")
          }
         );
  
      }
      else{
        
        console.log(selected_user._id)
        if (selected_user.length != 0) {
          const updateInstapost = await axios_instance.post("/gdpr/insta/update_insta_post", {
            _id: selected_user._id,
            instagramLayoutSettings:{
              basicLayoutSettings:{
                 feedTitle: title,
                 alignment: titlealignment,
                 size: titlesize
              },
              photoSetings:{
              layout: layoutstyle,
              imageSpacing: imagespace,
              onImageClick: imageclick,
              rows: row,
              coulumns: col,
              productSettings:{
                product: productSettings
              }
              }
          }
          }).then(
              (response) => {
               console.log(response);
               setondatasave(true)
               setalerText("Feed Updated")
               setondatasave(false)
             },
             (error) => {
                console.log(error);
                setondatasave(true)
                setalerText("Something Wrong")
                setondatasave(false)
              }
             );
             return;
        }
        const id = insta_post_onload[0].data.data._id;
        const updateInstapost = await axios_instance.post("/gdpr/insta/update_insta_post", {
          _id: id,
          instagramLayoutSettings:{
            basicLayoutSettings:{
               feedTitle: title,
               alignment: titlealignment,
               size: titlesize
            },
            photoSetings:{
            layout: layoutstyle,
            imageSpacing: imagespace,
            onImageClick: imageclick,
            rows: row,
            coulumns: col,
            productSettings:{
              product: productSettings
            }
            }
        }
        }).then(
            (response) => {
             console.log(response);
             setondatasave(true)
             setalerText(`Feed Successfully Updated 😊`)
             setondatasave(false)
           },
           (error) => {
              console.log(error);
              setondatasave(true)
              setalerText("Something Wrong 😔")
              setondatasave(false)
            }
           );

           
      }
    } catch (error) {
      console.log(error)
    }
  
  };
  // end call save and update instagram post 

  // get all insta post
  const getAllinstapost = async (shop_name)=>{
    const axios_instance = axios.create();
    axios_instance.interceptors.request.use(async function (config) {
      const token = await getSessionToken(app);
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });

    try {
       const getpostdata = await axios_instance.post("/gdpr/insta/get_insta_post_user", {
        shop_name: shop_name,
       
      }).then(
          (response) => {
          // console.log("testdata",response);
          setgetallPost(response.data.data)
         },
         (error) => {
            console.log(error);
          }
         );
  
      
     
    } catch (error) {
      console.log(error.message)
    }

  } 
  // end call

const delete_instagram_feed = async(id)=>{
  const axios_instance = axios.create();
  axios_instance.interceptors.request.use(async function (config) {
    const token = await getSessionToken(app);
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  });

  try {
     const del_feed_data = await axios_instance.delete("/gdpr/insta/delete_insta_users", {data: { _id: id }}).then(
        (response) => {
             console.log(response)
       },
       (error) => {
          console.log(error);
        }
       );

    
   
  } catch (error) {
    console.log(error.message)
  }
}


const getselected_user_onchange = async (value)=>{
  const shop_name = shop.data.body.shop.domain;
  const user_name = value;

  const axios_instance = axios.create();
  axios_instance.interceptors.request.use(async function (config) {
    const token = await getSessionToken(app);
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  });

  try {
     const get_user_post = await axios_instance.post("/gdpr/insta/get_seletcted_user", { shop_name: shop_name, user_name: user_name }).then(
        (response) => {
            //  console.log(response.data.data.instagramLayoutSettings)
             const settings = response.data.data.instagramLayoutSettings;
              setselected_user(response.data.data);
              settitle(settings.basicLayoutSettings.feedTitle);
              settitlealignment(settings.basicLayoutSettings.alignment);
              settitlesize(settings.basicLayoutSettings.size.toString());
              setlayoutstyle(settings.photoSetings.layout);
              setimagespace(settings.photoSetings.imageSpacing.toString());
              setonclickmgProduct(settings.photoSetings.onImageClick);
              setrow(settings.photoSetings.rows.toString());
              setcol(settings.photoSetings.coulumns.toString());
              setproductSettings(settings.photoSetings.productSettings.product);
              setmodel_product(settings.photoSetings.productSettings.product);
              onLoadImageClick(settings.photoSetings.onImageClick);
       },
       (error) => {
          console.log(error);
        }
       );

    
   
  } catch (error) {
    console.log(error.message)
  }
setspiner(false)

}

// Exchange Accesstoken and get long live token
  const demo = async (code,addnewFeedstr) => {
    // console.log(code);
    const insta_form = new formData();
    insta_form.append("client_id", 659236842149958);
    insta_form.append("client_secret", "25b94b6f08e931a92c61ac1092e398a7");
    insta_form.append("grant_type", "authorization_code");
    insta_form.append("access_token","long-lived-user-access-token");
    insta_form.append(
      "redirect_uri",
      `https://instagram-feed-metiz.herokuapp.com/instagram/shop/redirect_url`
    );
    insta_form.append("code", code);
    const gnerateaccesstoken = await fetch(
      "https://api.instagram.com/oauth/access_token",
      {
        method: "POST",
        body: insta_form,
      }
    );
   
    const values = await gnerateaccesstoken.json();
    setinstagram_user_id(values.user_id);
    setinstagrUserid_product(values.user_id)
    // get long live accesstoken for image id 60days max
    axios.get(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&&client_secret=25b94b6f08e931a92c61ac1092e398a7&access_token=${values.access_token}`)
    .then(function (response) {
    // handle success
    console.log("longlive",response.data.access_token);
    setTimeout(() => {
      userdata(response.data.access_token, values.user_id);
      setlong_live_access_token(response.data.access_token);
    }, 100);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
  });
    
  };

  const userdata = async (token, user_id) => {
    const insta = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,permalink,timestamp,caption,like_count&access_token=${token}&limit=100`,
      {
        method: "GET",
      }
    );
    if (!insta.ok) {
      const message = `An error has occured: ${insta.status}`;
      return new Error(message);
    }
    const values = await insta.json();
    if (values) {
      setimageurl(values.data);
      console.log(values.data);
      setinstapost_data([values.data]);
      setcomponetstate(false);
      setinstagram_username(values.data[0].username);
      setonAccountconnectBadge(true);
      const shop_data = shop; 
    }
  };


   // add new feed function
   const saveNewInstaFeed = async () => {
     addnewfeed();
     const instapost = JSON.stringify(imageurl);
     async function addnewfeed() {
          setspiner(true);
          const axios_instance = axios.create();
          axios_instance.interceptors.request.use(async function (config) {
            const token = await getSessionToken(app);
            config.headers["Authorization"] = `Bearer ${token}`;
            return config;
          });

          const shop_data = await axios_instance.get("/api/init_fauna");
          if (shop_data) {
            // console.log(shop_data);
            try {
              if (imageurl.length > 0) {
                setspiner(true);
                let c_id = "instafeed";
                let r_id = Math.random().toString(36).slice(2);
                const id = c_id.concat(r_id);
                const saveinstapost = await axios_instance
                  .post("/gdpr/insta/add_new_feed", {
                    shop_id: shop_data.data.body.shop.id,
                    shop_name: shop_data.data.body.shop.domain,
                    user_id: instagram_user_id,
                    short_code: id,
                    long_live_access: long_live_access_token,
                    user_name: instagram_username,
                    insta_post: instapost,
                    instagramLayoutSettings:{
                      basicLayoutSettings:{
                         feedTitle: title,
                         alignment: titlealignment,
                         size: titlesize
                      },
                      photoSetings:{
                      layout: layoutstyle,
                      imageSpacing: imagespace,
                      onImageClick: imageclick,
                      rows: row,
                      coulumns: col,
                      productSettings:{
                        product: productSettings
                      }
                      }
                  }
                  })
                  .then(
                    (response) => {
                      setredirectOnsave(true);
                     setondatasave(true)
                     setalerText('Instagram Feed Added')
                     getAllinstapost(shop_data.data.body.shop.domain);
                     setspiner(false);
                    },
                    (error) => {
                      console.log(error);
                      setspiner(false);
                    }
                    );
                  }else{
                    setondatasave(true)
                    setalerText('Please Conntect Account First')
                     setspiner(false);  
                   setondatasave(false)
              }
            } catch (error) {
              console.log(error);
            }
          }
          setondatasave(false)
        }
       
  };



const onclickImage_id=(value)=>{
  setinstapost_img_id(value)
}


const userName = (value) => {
  console.log(value);
  setuser_name(value)
};

// console.log(user_name)
// Section title 
const titledata=(value)=>{
 settitle(value);
//  console.log(value)
}
// layout settings 

const layoutdata=(value)=>{
  setlayoutstyle(value)
  // console.log(value)
}
const onLoadLayoutData=(value)=>{
  setlayoutstyle(value)
  // console.log("load l", value)
}
const onLoadTitleAlignment= (value)=>{
  settitlealignment(value)
}

const onLoadTitleSize= (value)=>{
  settitlesize(value)
}
const onLoadImageClick= (value)=>{
  setimageclick(value)
}

const onLoaduserName =(userName)=>{
  setinstagram_username(userName)
}
const productTaggingSetting=(value)=>{
  setproductSettings(value)
}
// console.log(productSettings)
const onLoadImageSpace =(value)=>{
  setimagespace(value)
}
const onLoadCol =(value)=>{
  setcol(value)
}

const onLoadRow =(value)=>{
  setrow(value)
}


 // on account connect button click null on load data 
 useEffect(() => {
    setinsta_post_onload([])
 }, [setimageurl])
 
const onClickimgProduct = (value)=>{
  setonclickmgProduct(value)
 
}
 
const deleteFeeddata = (selectedResources)=>{
  let newCustomers = getallPost;
  let newList =[];
   if (selectedResources.length>=2) {
      console.log("bef dele",selectedResources)
      selectedResources.map(function(value){
        newList = newCustomers.splice(getallPost.findIndex(e => e._id === value),1);  
        console.log("on del",newList) 
      });
      setgetallPost(newCustomers)
      console.log(newCustomers)
      delete_instagram_feed(selectedResources)
   }
   else{
    setgetallPost(getallPost.filter(item=> item._id !== selectedResources[0]))
      console.log(selectedResources[0])
      delete_instagram_feed(selectedResources[0])
   }
}

const selectedUserName = (value)=>{
  setspiner(true)
  getselected_user_onchange(value);
}
 const productOpenModal = (value) => {  
  setmodel_product_onSelect(value)
  
 };
  return (
    <NoteContext.Provider
      value={{
        responseInstagram_onFailure,
        responseInstagram_onSuccess,
        imageurl,
        onClickimgProduct,
        onclickmgProduct,
        getShopData,
        insta_post,
        shop,
        getInstagrampostByshopid,
        insta_post_onload,
        instapost_data,
        componetstate,
        ondatasave,
        alertText,
        titledata,
        title,
        instagram_username,
        onLoaduserName,
        layoutdata,
        layoutstyle,
        onLoadLayoutData,
        titlealignment,
        onLoadTitleAlignment,
        titlesize,
        onLoadTitleSize,
        imagespace,
        onLoadImageSpace,
        onLoadCol,
        col,
        onLoadRow,
        row,
        onLoadImageClick,
        imageclick,
        instagrUserid_product,
        onAccountconnectBadge,
        onclickImage_id,
        instapost_img_id,
        productTaggingSetting,
        productSettings,
        model_product,
        instagram_user_id,
        getAllinstapost,
        getallPost,
        deleteFeeddata,
        selectedUserName,
        selected_user,
        spiner,
        userName,
        user_name,
        long_live_access_token,
        responseInstagram_onSuccess_addNewFeed,
        saveNewInstaFeed,
        redirectOnsave,
        productOpenModal,
        model_product_onSelect
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteStates;
