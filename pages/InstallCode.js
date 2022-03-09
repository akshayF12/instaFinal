import React from "react";
import {
  Banner,
  Card,
  Heading,
  TextContainer,
  TextStyle,
} from "@shopify/polaris";
function InstallCode() {

  
  return (
    <div className="conatiner-fluid mt-5">
      <Card>
        <TextContainer>
          <div className="Installcode_Banner text-capitalize">
            <Heading>
              <div className="mb-2">Install the Instafeed App</div>
            </Heading>
            <Card.Section>
            <p className="m-0">Step to adding Feed Gallary on Shopify Pages:</p>
            <p className="m-0">
              In most cases, it has to be added to the <b>product.liquid</b> or{" "}
              <b>product-form.liquid </b>or <b>product-template.liquid,</b>
            </p>
            <p className="m-0">
              Copy Html Code From &#8594; <span>Instagram Feed</span> For Copy Go To Instgram Feed Page On Table Section Copy Short Code
            </p>
            <div className="mt-4">
              {/* <div
                className="Polaris-Banner Polaris-Banner--statusInfo Polaris-Banner--hasDismiss Polaris-Banner--withinPage"
                tabindex="0"
                role="status"
                aria-live="polite"
                aria-labelledby="PolarisBanner16Heading"
                aria-describedby="PolarisBanner16Content"
              >
                 <div className="Polaris-Banner__ContentWrapper">
                  <div
                    className="Polaris-Banner__Content"
                    id="PolarisBanner30Content"
                  >
                    <p className="m-0 text-lowercase text-center">
                      <TextStyle>{`<div id="{id}" class="cx-main-container"></div>`}</TextStyle>
                    </p>
                  </div>
                </div> 
              </div> */}
              <p  className="mt-4">
                You can place the code anywhere in the file. However, the
                recommended location to add this code in {" "}
                <b>'Theme.liquid'</b> above footer
              </p>
              <div className="">
              <ol>
                                    <li>Go to <b>Online Store =&gt; Themes =&gt; Edit Code</b></li>
                                    <li>Under Templates, look for <b>Theme.liquid</b> file and click to open the file in the editor.</li>
                                    <li>Place the Below code above the <b> section 'footer' </b> or you can also add product page,collection page, home page etc..</li>
                                    <li>Open Home page, you can see Feed Gallary on the bottom of page</li>
                                    <li>Also, you can add <b>the Instafeed</b> on Collection Pages.</li>
                                </ol>
              </div>
              <div id="PolarisPortalsContainer"></div>
            </div>
            </Card.Section>
          </div>
        </TextContainer>
      </Card>

      
    </div>
  );
}

export default InstallCode;
