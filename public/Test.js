var e = document.createElement("div");
var domain_shop = document.location.hostname;
e.innerHTML =
  "<scr" +
  'ipt type="text/javascript" src="http://code.jquery.com/jquery-3.2.1.min.js"></scr' +
  "ipt>";

var script = e.firstChild,
scriptInserted;
while (script) {
  scriptInserted = document.createElement("script");
  scriptInserted.setAttribute("src", script.getAttribute("src"));
  document.head.appendChild(scriptInserted);
  script = script.nextSibling;
}
$("head").append('<link rel="stylesheet" href="https://3d55-103-250-139-241.ngrok.io/I_boostrap.css?shop=metiz-trannie.myshopify.com" type="text/css"/>');
$.post(
  "https://3d55-103-250-139-241.ngrok.io/gdpr/insta/getinstapost/shop",
  {
    shop_name: domain_shop,
  },
  function (data, status) {
    if (data != false) {
      const application_status = data.data.insta_status;
      if (application_status == true) {
        const Instagram_post = data.data.insta_post;
        const onImageClickSetting = data.data.instagramLayoutSettings.photoSetings.onImageClick;
        console.log(data.data.instagramLayoutSettings.photoSetings.onImageClick)
        const product_image = data.data.instagramLayoutSettings.photoSetings.productSettings.product;
        const basicLayoutSettings = data.data.instagramLayoutSettings.basicLayoutSettings;
        const photoSettings = data.data.instagramLayoutSettings.photoSetings;
        const layout_instafeed = photoSettings.layout;
        if (layout_instafeed == 'Grid'){
          getInstagramPost(Instagram_post,photoSettings);
          feedTitleSettings(basicLayoutSettings);
          feedphotoSettings(photoSettings);
          product_settings(product_image);
          InstagramLink(Instagram_post,onImageClickSetting);
        }
        else{
          createslickImage(Instagram_post);
          feedTitleSettings(basicLayoutSettings);
        }
      }
    }
  }
);
async function getInstagramPost(insta_post,photoSettings) {
  var app = document.querySelector("#instafeed_m");
  let instagram_post_array = insta_post;
  let image_col = photoSettings.coulumns;
  let image_row = photoSettings.rows+image_col;

  let Col_Switch = image_col;
  switch(image_col) {
    case 1:
      Col_Switch = "12"
    break;
    case 2:
      Col_Switch = "6"
    break;
    case 3:
      Col_Switch = "4"
    break;
    case 4  :
      Col_Switch = "3"
    break;
  }
  const instPostImage = JSON.parse(instagram_post_array);
  app.innerHTML =
    '<div class="container-fluid"><div class="instafeed_title"></div> <div class="row instafeed_row">' +
    instPostImage.slice(0,image_row-1).map(function (value, index) {
        return (
          '<div class="col-md-'+Col_Switch+'">' +
          '<img data-image_id ="'+value.id+'" src="' +
          value.media_url +
          '"/>' +
          "</div>"
        );
      })
      .join("") +
    "</div></div>";
}

function feedTitleSettings(basicLayoutSettings) {
  let feedTitle = document.createElement("div");
  let feedtitletag = document.createElement("h2");
  feedtitletag.className = "text-capitalize";
  feedtitletag.innerHTML = basicLayoutSettings.feedTitle;
  feedTitle.className = "my-3";
  feedTitle.appendChild(feedtitletag);

  var instafeed_title = document.querySelector(".instafeed_title");
  instafeed_title.appendChild(feedTitle);

// add inline css  and calss to feed title
  let titleSize = basicLayoutSettings.size;
  let h_tag = $(".instafeed_title h2");
  h_tag.css("font-size", titleSize + "px");

//   title alignment settings 
  let titleAlignment = basicLayoutSettings.alignment;  
switch (titleAlignment) {
    case 'right':
    $(".instafeed_title").addClass("text-start");
    break;
    case 'left':
    $(".instafeed_title").addClass("text-end");
    break;
    case 'center':
    $(".instafeed_title").addClass("text-center");
    break;
}
};

function feedphotoSettings(photoSettings) {
  let imagespaceing = photoSettings.imageSpacing;
  $(".instafeed_row").addClass('g-'+imagespaceing);
  };

   function createslickImage(insta_post) {
    var scripts_tag_slide = $( "script[src='https://unpkg.com/@egjs/flicking/dist/flicking.pkgd.min.js']" ).length;
    if (scripts_tag_slide == 0) {
      $("head").append('<script src="https://unpkg.com/@egjs/flicking/dist/flicking.pkgd.min.js" crossorigin="anonymous"></script>');
      $("head").append('<link rel="stylesheet"  href="https://unpkg.com/@egjs/flicking/dist/flicking.css" crossorigin="anonymous"/>');
    }
    var app = document.querySelector("#instafeed_m");
    let instagram_post_array = insta_post;
    const instPostImage = JSON.parse(instagram_post_array);
    app.innerHTML =
      '<div class="container-fluid"><div class="instafeed_title"></div><div id="flick" class="flicking-viewport"><div class="flicking-camera">' +
      instPostImage.map(function (value, index) {
          return (
            '<div class="flicking-panel">' +
            '<img src="' +
            value.media_url +
            '"/>' +
            "</div>"
          );
        })
        .join("") +
      "</div></div></div>";
      setTimeout(() => {
        const flicking = new Flicking("#flick", {
          circular: true,
          panelsPerView: 3,
          align: "prev",
        });
      }, 800);
  };

  function product_settings(product) {
    if (product == true) {
      const ipost = $.post( "https://3d55-103-250-139-241.ngrok.io/gdpr/insta/getInstaProduct/shop",{
        shop_name: domain_shop,
      },function() {
     
      }).done(function(ipost) {
        if (ipost.data != 0) {
          const newArr = ipost.data;
          newArr.map(function (value, index){
            instagram_product(value,index);
          });
        }
         
      
        })
        .fail(function(error) {
         console.log(error)
        });
    }
  }
  function instagram_product(value,index) {
    
    $( `[data-image_id=${value.image_id}]` ).wrap( `<a href=https://${value.shop}/products/${value.product.product_detail.handle}></a>` );
  }

  function InstagramLink(link,onImageClickSetting) {
    const imageLink = JSON.parse(link);
    const newArr = imageLink;
    if (onImageClickSetting == 'Do Nothing' || onImageClickSetting == 'Product') {
      return;
    }else{
      newArr.map(function (value, index){
        imagelinktag(value);
      });
    }
         
  }
  function imagelinktag(value) {
    $( `[data-image_id=${value.id}]` ).wrap( `<a target="_blank" href=${value.permalink}></a>` );
  }

