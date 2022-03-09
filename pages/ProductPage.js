import React, { useEffect, useState, useContext } from "react";
import NoteContext from "./context/NoteContext";
import {
  Page,
  Card,
  CalloutCard,
  Layout,
  Heading,
  ResourceList,
  ResourceItem,
  Thumbnail,
  TextStyle,
  Loading,
  Frame,
} from "@shopify/polaris";
import { Container, Row, Col } from "react-bootstrap";
import { ImageMajor } from "@shopify/polaris-icons";
import { Toast, ResourcePicker } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";
import axios from "axios";
import ImageCard from "./ImageCard";

const useSettingsManagement = () => {
  const Instacontent = useContext(NoteContext);
  const { shop,onclickmgProduct,instapost_img_id,instagrUserid_product } = Instacontent;
  const [state, setstate] = useState(0);
  const [getstate, setgetstate] = useState(1);
  const app = useAppBridge();
  const [shop_name, setshop_name] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSetLoading, setIsSetLoading] = useState(false);
  const [settingsObj, setSettingsObj] = useState(undefined);
  const [error, setError] = useState(undefined);
  if (state == 0) {
    if (shop.length === undefined) {
      const domain = shop.data.body.shop.domain;
          setshop_name(domain);
          setstate(state + 1);
          setgetstate(getstate + 1);
    }
  }
  if (getstate==2) {
    
    setTimeout(() => {
      getSettings();
    }, 100);
    setgetstate(getstate + 1)
  }
  console.log("image_id",instapost_img_id)
  // console.log(instagrUserid_product)
  // console.log(onclickmgProduct)
  // get setting using call
  const getSettings = async () => {
    const axios_instance = axios.create();
    axios_instance.interceptors.request.use(function (config) {
      return getSessionToken(app).then((token) => {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      });
    });
    setIsLoading(true);
    try {
      const getsettingsProduct = await axios_instance.post(
        "/gdpr/insta/product_settings",
        {
          shop_domain: shop_name,
          image_id: instapost_img_id
        }
      );
      console.log(getsettingsProduct);
      const responseData = getsettingsProduct.data;
      console.log(responseData.status);
      if (responseData.status === "EMPTY_SETTINGS") {
        return;
      }

      if (responseData.status === "OK_SETTINGS") {
        setSettingsObj(responseData.data);
        // onClickimgProduct(responseData.data)
        return;
      }

      throw Error("Unknown settings status");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const setSettings = async (productId) => {
    setIsSetLoading(true);
    const axios_instance = axios.create();
    axios_instance.interceptors.request.use(function (config) {
      return getSessionToken(app).then((token) => {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      });
    });
    console.log("id_bef_save",instapost_img_id);
    try {
      const setsettingsProduct = await axios_instance.post(
        "/gdpr/insta/product_settings_set",
        {
          productId,
          shop_domain: shop_name,
          user_id: instagrUserid_product,
          image_id:instapost_img_id,
          img_url:onclickmgProduct
        }
      );
      const responseData = setsettingsProduct.data;

      if (responseData.status === "OK_SETTINGS") {
        setSettingsObj(responseData.data);
      }

      throw Error("Unknown settings status");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSetLoading(false);
    }
  };

  const clearError = () => setError(undefined);

  return {
    settingsObj,
    isLoading,
    error,
    isSetLoading,
    setSettings,
    clearError,
  };
};

// end get setting call

function ProductPage(props) {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [openResourcePicker, setOpenResourcePicker] = useState(false);

  const {
    settingsObj,
    isLoading,
    error,
    isSetLoading,
    setSettings,
    clearError,
  } = useSettingsManagement();
  const hideToast = () => setShowSuccessToast(false);
  const showToast = () => setShowSuccessToast(true);

  const hideResourcePicker = () => setOpenResourcePicker(false);
  const showResourcePicker = () => setOpenResourcePicker(true);

  const handleSelectProduct = async ({ selection }) => {
    if (selection.length === 0) return;
    await setSettings(selection[0].id);
    showToast();
    hideResourcePicker();
  };
  
  if (isLoading) {
    return (
      <Page>
        <div style={{ height: "100px" }}>
          <Frame>
            <Loading />
          </Frame>
        </div>
      </Page>
    );
  }
  return (
    <div>
      <Page>
        <Container>
          <Row>
            <Col>
              <Layout>
                <ImageCard card_img_src={props.img_src} data-imagepost_url={props.img_src} ></ImageCard>
              </Layout>
            </Col>
            <Col>
              <Layout>
                {settingsObj ? (
                  <Card
                    title={<Heading>Selected product</Heading>}
                    primaryFooterAction={{
                      content: "Select new product",
                      onAction: showResourcePicker,
                      loading: isSetLoading,
                    }}
                    footerActionAlignment="left"
                    sectioned
                  >
                    <ResourceList
                      resourceName={{ singular: "product", plural: "products" }}
                      items={[settingsObj]}
                      renderItem={(item) => {
                        const { id, title, image } = item;
                        return (
                          <ResourceItem
                            id={id}
                            media={
                              <Thumbnail
                                size="small"
                                source={image?.src || ImageMajor}
                                alt={`Product ${title} thumbnail`}
                              />
                            }
                            name={title}
                            verticalAlignment="center"
                          >
                            <h3>
                              <TextStyle variation="strong">{title}</TextStyle>
                            </h3>
                          </ResourceItem>
                        );
                      }}
                    />
                  </Card>
                ) : (
                  <CalloutCard
                    title="Select your Tag product"
                    illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                    primaryAction={{
                      content: "Select product",
                      onAction: showResourcePicker,
                    }}
                  >
                    <p>You have not selected any product yet.</p>
                  </CalloutCard>
                )}
              </Layout>
            </Col>
          </Row>
        </Container>

        <ResourcePicker
          resourceType="Product"
          open={openResourcePicker}
          onCancel={hideResourcePicker}
          onSelection={handleSelectProduct}
          allowMultiple={false}
          actionVerb="select"
        />
        {showSuccessToast && (
          <Toast content="Settings updated" onDismiss={hideToast} />
        )}

        {error && <Toast content={error} error onDismiss={clearError} />}
      </Page>
    </div>
  );
}

export default ProductPage;
