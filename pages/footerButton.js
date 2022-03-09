import React, { useContext, useCallback, useState, useEffect} from "react";
import NoteContext from "./context/NoteContext";
import { Context } from '@shopify/app-bridge-react'
import { Redirect } from '@shopify/app-bridge/actions';
import {
  Card,
  Layout,
  Stack,
  Button,
  Frame,
  Page,
  Toast,
  VisuallyHidden
} from "@shopify/polaris";
function FooterButton() {
  // taost alert
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  
  const app = useContext(Context);
  const redirect = Redirect.create(app);

  const context = useContext(NoteContext);
  const { insta_post,ondatasave,alertText } = context;
    useEffect(() => {
      if (ondatasave === true) {
        toggleActive();
      }
    }, [ondatasave])
   
    const toastMarkup = active ? (
      <Toast onDismiss={toggleActive} error={false} content={alertText} />
    ) : null;
// console.log(ondatasave);
const insta_post_save =()=> {
  insta_post();
}

  return (
    <>
      <div className="mt-5 mb-5">
        <hr />
        <Layout>
          <Layout.Section>
            <div className="pt-3">
              <Stack>
                <Stack.Item fill>
                
                </Stack.Item>
                <div className="mb-4">
                  <Stack.Item>
                    <button className="Polaris-Button Polaris-Button--primary Footer_button_save" type="button" onClick={insta_post_save}>
                      <span className="Polaris-Button__Content">
                        <span className="Polaris-Button__Text">Save</span>
                      </span>
                    </button>

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

export default FooterButton;
