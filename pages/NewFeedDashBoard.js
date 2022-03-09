import React, { useEffect, useState, useContext } from "react";
import InstagramBasicLayout from "./InstagramBasicSetting";
import { Container } from "react-bootstrap";
import InstagramContent from "./InstagramContent";
import FooterButton from "./footerButton";
import { useAppBridge } from "@shopify/app-bridge-react";
import NoteContext from "./context/NoteContext";
import { Frame, Loading } from "@shopify/polaris";
import NewFeedTopBar from "./NewFeedTopBar";
import NewfeedFooterbtn from "./NewfeedFooterbtn";
import DashboardTitlebar from "./DashboardTitlebar";

function NewFeedDashBoard(props) {
  const [shop, setshop] = useState([]);
  const [state, setstate] = useState(0);
  const [satusbadge, setsatusbadge] = useState("new");
  const [loader, setloader] = useState(false);
  const [badge_text, setbadge_text] = useState(
    "Conntect Your Instagram Account"
  );
  const app = useAppBridge();
  const context = useContext(NoteContext);
  const { imageurl } = context;

  if (state == 0) {
    if (imageurl.length > 0) {
      setbadge_text("Account Connected");
      setsatusbadge("success");
      setstate(state + 1);
    }
  }

  useEffect(() => {
    setloader(false);
  }, []);

  return (
    <>
      <div className="body_dasboard">
        {loader === true ? (
          <div style={{ height: "10px" }}>
            <Frame>
              <Loading />
            </Frame>
          </div>
        ) : (
          <div className="empty"></div>
        )}
        <Container fluid>
          <DashboardTitlebar title="Add Instagram Account" url="/Feed"></DashboardTitlebar>
          <NewFeedTopBar
            status_badge={satusbadge}
            badge_text={badge_text}
            axios_instance={props.axios_instance}
          />
          <InstagramContent />
          <InstagramBasicLayout />
          <NewfeedFooterbtn />
        </Container>
      </div>
    </>
  );
}

export default NewFeedDashBoard;
