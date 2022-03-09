import React, { useContext, useCallback, useState, useEffect } from "react";
import NoteContext from "./context/NoteContext";
import {
  Card,
  Layout,
  Stack,
  Button,
  Frame,
  Page,
  Toast,
  VisuallyHidden,
} from "@shopify/polaris";
import { Context } from '@shopify/app-bridge-react'
import { Redirect } from '@shopify/app-bridge/actions';
function NewfeedFooterbtn() {
    const app = useContext(Context);
    const redirect = Redirect.create(app);
  // taost alert
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const context = useContext(NoteContext);
  const {  ondatasave, alertText, saveNewInstaFeed ,spiner,redirectOnsave} = context;
  useEffect(() => {
    if (ondatasave == true) {
      toggleActive();
      if (redirectOnsave == true) {
        redirect.dispatch(Redirect.Action.APP, '/');
      }
    }
  }, [ondatasave]);

  const toastMarkup = active ? (
    <Toast onDismiss={toggleActive} error={false} content={alertText} />
  ) : null;
  // console.log(ondatasave);
  const insta_post_save = () => {
    saveNewInstaFeed();
  };

 
  return (
    <>
      <div className="mt-4 mb-5">
        <hr />
        <Layout>
          <Layout.Section>
            <div className="pt-3">
              <Stack>
                <Stack.Item fill>

                </Stack.Item>
                <div className="mb-4">
                <Stack.Item>
                  <Button primary onClick={insta_post_save} className="aa" loading={spiner == true}>
                    Save New Feed
                  </Button>
                  <VisuallyHidden>
                    <div style={{ height: "250px" }}>
                      <Frame>
                        <Button onClick={toggleActive}>Show Toast</Button>
                        {toastMarkup}
                      </Frame>
                    </div>
                  </VisuallyHidden>
                </Stack.Item>
                </div>
              </Stack>
            </div>
          </Layout.Section>
        </Layout>
      </div>
    </>
  );
}
export default NewfeedFooterbtn;
