import React, { useContext, useState, useEffect,useCallback} from "react";
import NoteContext from "./context/NoteContext";
import { Container, Row, Col, Card } from "react-bootstrap";
import {Modal, Stack,Spinner,TextStyle} from '@shopify/polaris';
import SimpleSlider from "./SimpleSlider";
import ProductPage from "./ProductPage";
let sumOfRow;
function InstagramContent() {
  const Instacontent = useContext(NoteContext);
  const {imageurl,imageclick,model_product_onSelect,insta_post_onload,title,col,layoutstyle,titlealignment,titlesize,imagespace,row,onClickimgProduct,instagrUserid_product,shop,onclickImage_id,model_product,getInstagrampostByshopid,selected_user,spiner} = Instacontent;

  const [instapost, setinstapost] = useState([]);
  const [state, setstate] = useState(0);
  const [stateAccountConnect, setstateAccountConnect] = useState(0);
//  console.log(instapost)
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const [model_poup, setmodel_poup] = useState('false')
  const [modalimg, setmodalimg] = useState([])
setTimeout(() => {
  if (stateAccountConnect == 0) {
    if (imageurl.length > 0) {
      setinstapost([])
      // console.log("null",instapost)
      setinstapost(imageurl)
      // console.log("on account load", imageurl)
      setstateAccountConnect(stateAccountConnect + 1);
    }
  }
}, 500);

  if (state == 0) {
    if (insta_post_onload.length > 0) {
      const data_onload = insta_post_onload[0].data;
      if (data_onload === false) {
        // console.log("data not found")
      }else{
        const product_popup = insta_post_onload[0].data.data.instagramLayoutSettings.photoSetings.productSettings.product;
      
        setmodel_poup(product_popup)
      
     // console.log("on window load", insta_post_onload[0].data);
      let instadata = insta_post_onload[0].data.data.insta_post;
      const instPostImage = JSON.parse(instadata);
      setinstapost(instPostImage);
      }
     
      setstate(state + 1);
    }
  }

  let Col_Switch
  switch(col) {
    case '1':
      Col_Switch = "12"
    break
    case '2':
      Col_Switch = "6"
    break
    case '3':
      Col_Switch = "4"
    break
    case '4':
      Col_Switch = "3"
    break
    default:
      Col_Switch = "6"
  }
  const onClick = event => {
    setmodalimg(event.target.dataset.user)
    onClickimgProduct(event.target.dataset.user)
    const shop_id =shop.data.body.shop.id;
    getInstagrampostByshopid(shop_id);
    // console.log(event.target.dataset.image_id)
    
    // setimage_id(event.target.dataset.image_id)
    console.log(imageclick)
    onclickImage_id(event.target.dataset.image_id)
    
    if (model_product == true) {
      if (model_product_onSelect == true) {
        setTimeout(() => {
          toggleActive();
        }, 100);  
        return;
      }else{
          if (imageclick == 'Product') {
            setTimeout(() => {
              toggleActive();
            }, 100);
        }
      } 
    }else{
        if (model_product_onSelect == true) {
          setTimeout(() => {
            toggleActive();
          }, 100);
          return;
        }
        else{
          if (imageclick == 'Product') {
            setTimeout(() => {
              toggleActive();
            }, 100);
        }
    }
    
    }
   
    
  }
  const save_data = ()=>{
    // console.log(instagrUserid_product)
    // console.log(shop)
  }
  let imgspace = "g-"+imagespace;
  let sumOfRow = row*col;

  useEffect(() => {
    
    if (selected_user.length != 0) {
    let instadata = selected_user.insta_post;
    const instPostImage = JSON.parse(instadata);
    setinstapost(instPostImage);
    }
  }, [selected_user]);
  

  return (
    <div> 
      
      {instapost.length != 0 ?
        <div>
        <Card className="p-4 Polaris-Card Costom_Card mt-5">
        <div>
        <div className={titlealignment == "right"? "my-3 mb-5 text-start" : titlealignment == "center" ? "my-3 mb-5 text-center" : "my-3 mb-5 text-end" }>
        <h1 style={{fontSize: `${titlesize}px`}}>{title}</h1>
        </div>
        <div>
      <Modal
        large
        open={active}
        onClose={toggleActive}
        title="Start Taging Your Products"
        secondaryActions={[
          {
            content: 'Done',
            onAction: toggleActive,
          },
        ]}
      >
        <Modal.Section>
          <Stack vertical>
            <ProductPage img_src={modalimg}/>
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
         {layoutstyle != "Slide" ?<Row className={imgspace}>
         {spiner != false ? <div className="text-center"><Spinner accessibilityLabel="Spinner example" size="large" /></div>: " "}
            {instapost != null
              ? instapost.map((value,i) => {
                  return (
                    <Col sm={Col_Switch} key={value.id} className={sumOfRow == 0 ? "show_row" :  i+1 > sumOfRow ? "hide_row" : "show_row"}>
                      <Card.Img variant="top" src={value.media_url} onClick={onClick} className="img_post" data-user={value.media_url} data-image_id={value.id}/>
                    </Col>
                    
                  );
                })
              : ""}
          </Row>:
          <SimpleSlider/>}
          </div>  
          <div className="tips">
                <TextStyle variation="strong">Tips:</TextStyle><TextStyle >click on a picture to start tagging products</TextStyle>
                </div>
        </Card>
        </div>     
      :<div className="text-center"></div>}
    </div>
  );
}

export default InstagramContent;
