
import React, { useState,useContext } from "react";
import NoteContext from "./context/NoteContext";
// import ItemsCarousel from "react-items-carousel";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
function SimpleSlider() {
  const Instacontent = useContext(NoteContext);
  const { imageurl, insta_post_onload, } = Instacontent;
  const [active, setaAtive] = useState(0);
  const [instapost, setinstapost] = useState([]);
  const [state, setstate] = useState(0);
  if (state == 0) {
    if (insta_post_onload.length > 0) {
      const data_onload = insta_post_onload[0].data;
      if (data_onload === false) {
        setinstapost(imageurl)
       console.log(imageurl)
      }else{
      // console.log("on window load", insta_post_onload[0].data);
      let instadata = insta_post_onload[0].data.data.insta_post;
      const instPostImage = JSON.parse(instadata);
      // console.log("s", instPostImage)
      // let instaUserName = 
      // console.log(instPostImage[0].username)
      // onLoaduserName(instPostImage[0].username)
      setinstapost(instPostImage);
      }
     
      setstate(state + 1);
    }
  }
  return (
    <div>
       {/* <div className="Slider">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <ItemsCarousel
        infiniteLoop={false}
        gutter={12}
        activePosition={"center"}
        chevronWidth={80}
        disableSwipe={false}
        alwaysShowChevrons={false}
        numberOfCards={3}
        slidesToScroll={1}
        outsideChevron={true}
        showSlither={false}
        firstAndLastGutter={false}
        activeItemIndex={active}
        requestToChangeActive={value => setaAtive(value)}
        rightChevron={">"}
        leftChevron={"<"}
      >
        {instapost.map((value, i) => (
          <div
            key={i}
            style={{
              height: 300,
              background: `url(${value.media_url})`
            }}
          />
        ))}
      </ItemsCarousel>
    </div> */}
   <Flicking
    align="prev"
    circular={true}
    panelsPerView={3}
    resizeOnContentsReady={false}
    onMoveEnd={e => {
      // console.log(e);
    }}>
     
       {instapost.map((value, i) => (
          <div className="panel" key={i}>
            <img className="card-img-top" src={value.media_url}></img>
          </div>
        ))}

  
    {/* <div className="panel"><img className="card-img-top" src="https://scontent.cdninstagram.com/v/t51.29350-15/258195942_1204890776704420_7625368100907707558_n.jpg?_nc_cat=110&amp;ccb=1-5&amp;_nc_sid=8ae9d6&amp;_nc_ohc=kP2vQVeY8scAX_m_VQY&amp;_nc_ht=scontent.cdninstagram.com&amp;edm=ANo9K5cEAAAA&amp;oh=00_AT-FsPGw1_aoydYlm31dHUPcIWNr8Wzcp6EaKLA-nASDaA&amp;oe=61C51A8A"/></div>
    <div className="panel"><img className="card-img-top" src="https://scontent.cdninstagram.com/v/t51.29350-15/258195942_1204890776704420_7625368100907707558_n.jpg?_nc_cat=110&amp;ccb=1-5&amp;_nc_sid=8ae9d6&amp;_nc_ohc=kP2vQVeY8scAX_m_VQY&amp;_nc_ht=scontent.cdninstagram.com&amp;edm=ANo9K5cEAAAA&amp;oh=00_AT-FsPGw1_aoydYlm31dHUPcIWNr8Wzcp6EaKLA-nASDaA&amp;oe=61C51A8A"/></div>
    <div className="panel"><img className="card-img-top" src="https://scontent.cdninstagram.com/v/t51.29350-15/258195942_1204890776704420_7625368100907707558_n.jpg?_nc_cat=110&amp;ccb=1-5&amp;_nc_sid=8ae9d6&amp;_nc_ohc=kP2vQVeY8scAX_m_VQY&amp;_nc_ht=scontent.cdninstagram.com&amp;edm=ANo9K5cEAAAA&amp;oh=00_AT-FsPGw1_aoydYlm31dHUPcIWNr8Wzcp6EaKLA-nASDaA&amp;oe=61C51A8A"/></div> */}
  </Flicking>
    </div>
  )
}

export default SimpleSlider
