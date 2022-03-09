import React, { useContext, useState, useEffect } from "react";
import NoteContext from "./context/NoteContext";
import { Container, Row, Col, Card } from "react-bootstrap";
import {Heading} from "@shopify/polaris";
function InstagramConetentonLoad(props) {
  const Instacontent = useContext(NoteContext);
  const { insta_post_onload,title } = Instacontent;
  const [instapost, setinstapost] = useState([]);
  const [state, setstate] = useState(0);
  if (state == 0) {
    if (insta_post_onload.length > 0) {
      console.log("d", insta_post_onload);
      let instadata = insta_post_onload[0].data.data.insta_post;
      const instPostImage = JSON.parse(instadata);
      setinstapost(instPostImage);
      setstate(state + 1);
    }
  }
  return (
    <div className={props.state}>

      {instapost.length != 0 ?
      <Container fluid>
        <div className="my-3 py-4">
        <Card className="p-4">
          <div className="my-3 text-center mb-5">
        <Heading element="h1">{title}</Heading>
        </div>
          <Row>
            {instapost != null
              ? instapost.map((value) => {
                  return (
                    <Col sm={4} key={value.id}>
                      <Card.Img variant="top" src={value.media_url} />
                    </Col>
                  );
                })
              : ""}
          </Row>
        </Card>
        </div>
      </Container>
      :<div className="empty"></div>}

    </div>
  );
}

export default InstagramConetentonLoad;
