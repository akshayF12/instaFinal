import React from "react";
import { Card } from "react-bootstrap";
function ImageCard(props) {
  return (
    <div>
      <Card>
        <Card.Img variant="top" src={props.card_img_src} />
        <Card.Body>
          <Card.Text>
         
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ImageCard;
