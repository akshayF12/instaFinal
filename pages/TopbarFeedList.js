import React ,{useContext,useCallback, useState}from "react";
import { Context } from '@shopify/app-bridge-react'
import { Redirect } from '@shopify/app-bridge/actions';
import {
  Button,
  Layout,
  Stack,
  Heading
} from "@shopify/polaris";

function TopbarFeedList(props) {
  const app = useContext(Context);
  const redirect = Redirect.create(app);

  const HandleaddNewFeed = () => { 
    redirect.dispatch(Redirect.Action.APP, '/NewFeedDashBoard');
   };

  return <div className="mt-5 mb-5">
    <Layout>
        <Layout.Section>
          <div className="wraper_feed_table">
              <Stack>
                <Stack.Item fill>
                <div className="Polaris-Header-Title">Instagram Feed</div>
                </Stack.Item>
                <Stack.Item >
                <Button primary onClick={HandleaddNewFeed}>Add New Feed</Button>
                </Stack.Item>
              </Stack>
    
          </div>
          
        </Layout.Section>
      </Layout>
  </div>;
}

export default TopbarFeedList;
