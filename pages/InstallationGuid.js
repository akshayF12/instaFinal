import React,{useState,useEffect} from "react";
import {
    Frame,
    Loading
  } from "@shopify/polaris";
function InstallationGuid() {
    const [loader, setloader] = useState(true);
    useEffect(() => {
      setloader(false);
    }, [])
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
      <h1>hello</h1>
    </>
  );
}

export default InstallationGuid;
