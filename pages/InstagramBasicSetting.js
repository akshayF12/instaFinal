import React, { useState, useCallback, useContext,useEffect } from "react";
import {
  Card,
  Layout,
  TextField,
  FormLayout,
  Select,
  Heading,
  VisuallyHidden,
} from "@shopify/polaris";
import NoteContext from "./context/NoteContext";

function InstagramBasicLayout() {
const Instacontent = useContext(NoteContext);
const { titledata, productOpenModal, insta_post_onload ,layoutdata, onLoadLayoutData ,onLoadTitleAlignment, onLoadTitleSize, onLoadImageSpace, onLoadCol, onLoadRow, onLoadImageClick,productTaggingSetting, selected_user } = Instacontent;
const [alignselected, setalignSelected] = useState('right');
const [Vtitle, setVtitle] = useState('feed title');
const [rowselected, setrowSelected] = useState('1');
const [colselected, setcolSelected] = useState('3');
const [imageSpacing, setimageSpacing] = useState('2');
const [layoutselected, setlayoutSelected] = useState('grid');
const [size, setsize] = useState("5");
const [basicSettings, setbasicSettings] = useState([])
const [photoSettings, setphotoSettings] = useState([])
const [onClickImage, setonClickImage] = useState('Do Nothing')
const [state, setstate] = useState(0)
if (state == 0) {
  if (insta_post_onload.length > 0) {
    const data_onload = insta_post_onload[0].data;
    if (data_onload === false) {
      console.log(data_onload)
    }
    else{
    let basicSetings = insta_post_onload[0].data.data.instagramLayoutSettings.basicLayoutSettings;
    let photoSettings = insta_post_onload[0].data.data.instagramLayoutSettings.photoSetings;
    setbasicSettings(basicSetings);
    setphotoSettings(photoSettings);
    setVtitle(basicSetings.feedTitle)
    titledata(basicSetings.feedTitle)
    setsize(basicSetings.size.toString())
    onLoadTitleSize(basicSetings.size.toString())
    setlayoutSelected(photoSettings.layout)
    onLoadLayoutData(photoSettings.layout)

    setimageSpacing(photoSettings.imageSpacing.toString())
    onLoadImageSpace(photoSettings.imageSpacing.toString())

    setonClickImage(photoSettings.onImageClick)
    onLoadImageClick(photoSettings.onImageClick)

    setrowSelected(photoSettings.rows.toString())
    onLoadRow(photoSettings.rows.toString())


    setcolSelected(photoSettings.coulumns.toString())
    onLoadCol(photoSettings.coulumns.toString())

    setalignSelected(basicSetings.alignment)
    onLoadTitleAlignment(basicSetings.alignment)

    }
    
    setstate(state + 1);
  }
}

useEffect(() => {
    
  if (selected_user.length != 0) {
  console.log(selected_user)
  const settings = selected_user.instagramLayoutSettings;
  setVtitle(settings.basicLayoutSettings.feedTitle)
  setalignSelected(settings.basicLayoutSettings.alignment)
  setsize(settings.basicLayoutSettings.size.toString())
  setlayoutSelected(settings.photoSetings.layout)
  setimageSpacing(settings.photoSetings.imageSpacing.toString())
  setonClickImage(settings.photoSetings.onImageClick) 
  setrowSelected(settings.photoSetings.rows.toString())
  setcolSelected(settings.photoSetings.coulumns.toString())


  }
}, [selected_user]);


  // alignment select
  const handlealignmentfield=(value)=>{
    setalignSelected(value)
    onLoadTitleAlignment(value)
  };

  const options = [
    { label: "right", value: "left" },
    { label: "left", value: "right" },
    { label: "center", value: "center" },
  ];
// size field
  const handleSize=(value)=>{
    setsize(value)
    onLoadTitleSize(value)
  };
  const options_size = [
    { label: "5px", value: "5" },
    { label: "10px", value: "10" },
    { label: "15px", value: "15" },
    { label: "20px", value: "20" },
    { label: "25px", value: "25" }
  ];

  //   layout select

  const handlelayoutfield=(value)=>{
    setlayoutSelected(value)
    layoutdata(value);
  }

  const layout_options = [
    { label: "Grid", value: "Grid" },
    { label: "Slide", value: "Slide" },
  ];
// image spacing 
const handleimage_spacing=(value)=>{
  setimageSpacing(value)
  onLoadImageSpace(value)
}

// console.log(imageSpacing)
const image_spacing_options = [
  { label: "0%", value: "0" },
  { label: "1%", value: "1" },
  { label: "2%", value: "2" },
  { label: "3%", value: "3" },
  { label: "4%", value: "4" },
  { label: "5%", value: "5" },
];
// on Image Select

const handleOnImageClick=(value)=>{
  if (value == 'Product') {
    productTaggingSetting("true")
    productOpenModal(true);
  }
  else{
    productTaggingSetting("false")
    productOpenModal(false);
  }
  setonClickImage(value)
  onLoadImageClick(value)
  
}

// console.log(imageSpacing)
const OnimageClick_options = [
  { label: "Do Nothing", value: "Do Nothing" },
  { label: "Product", value: "Product" },
  { label: "Instagram", value: "Instagram" },
];

// Rows Select
  const handlerowfield=(value)=>{
    if (value <= 0) {
      setrowSelected("0")
    }
    else{
      setrowSelected(value)
    }
    
    onLoadRow(value)
    
  }
  
  const handlecolfield=(value)=>{
    setcolSelected(value)
    onLoadCol(value)
    // console.log(value)
  }

  const col_options = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
  ];

  // Section title
  const TitlehandleChange = useCallback((newValue) => {
    setVtitle(newValue);
    titledata(newValue);
  });
  
  return (
    <div className="mt-5 mb-5">
      <Layout>
        <Layout.Section>
          <Card sectioned={true}>
            <div className="setting_heading">
            <Heading element="h6" spacing="none" class="top">
              Basic Layout Settings
            </Heading>
            </div>
            <FormLayout>
            <FormLayout.Group condensed>
              <TextField
                label="Feed Title"
                onChange={TitlehandleChange}
                autoComplete="off"
                value={Vtitle}
                spacing="none"  
              />
              <Select
                label="Alignment"
                options={options}
                onChange={handlealignmentfield}
                value={alignselected}
                spacing="none"
              />
             <Select
                label="size"
                options={options_size}
                onChange={handleSize}
                value={size}
                spacing="none"
              />


            </FormLayout.Group>
            </FormLayout>

            <div className="setting_heading heading_mt">
              <Heading element="h6" spacing="none">
                Photo Settings
              </Heading>
            </div>
              <div className="photo_setting_row">
            <FormLayout>
            <FormLayout.Group condensed>
              <Select
                label="layout"
                options={layout_options}
                onChange={handlelayoutfield}
                value={layoutselected}
                spacing="none"
              />
              <Select
                label="Image Spacing"
                options={image_spacing_options}
                onChange={handleimage_spacing}
                value={imageSpacing}
                spacing="none"
              />
              <Select
                label="On Image Click"
                options={OnimageClick_options}
                onChange={handleOnImageClick}
                value={onClickImage}
                spacing="none"
              />
            </FormLayout.Group>
            </FormLayout>
            </div>
            <FormLayout>
            <FormLayout.Group condensed>
            <TextField
              label="Rows"
              type="number"
              value={rowselected}
              onChange={handlerowfield}
              autoComplete="off"
              spacing="none"
              
            />
             <Select
                label="Coulumn"
                options={col_options}
                onChange={handlecolfield}
                value={colselected}
                spacing="none"
              />
              <VisuallyHidden>
              <Select
                label="Coulumn"
                options={col_options}
                onChange={handlecolfield}
                value={colselected}
                spacing="none"
              />
              </VisuallyHidden>
              </FormLayout.Group>
              </FormLayout>
      
          </Card>
        </Layout.Section>
      </Layout>
    </div>
  );
}

export default InstagramBasicLayout;
