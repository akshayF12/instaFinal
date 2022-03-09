import React from 'react'
import {
    Banner,
    Card,
    Heading,
    TextContainer,
    TextStyle,
  } from "@shopify/polaris";
function WelcomeBanner(props) {
  return (
    <>
    <div className="conatiner-fluid mt-5 mb-5">
      <Card>
        <TextContainer>
          <div className="Installcode_Banner text-capitalize">
          <div className="Polaris-Card__SectionHeader">
            <p className="Polaris-DisplayText Polaris-DisplayText--sizeExtraLarge client_name">Hi {props.ClientName},</p>
            </div>
            <p>Welcome to  Instagram Feed </p>
          </div>
        </TextContainer>
      </Card>

      
    </div>

    </>
  )
}

export default WelcomeBanner