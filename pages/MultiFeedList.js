import React,{useContext, useCallback, useState, useEffect} from 'react';
import { Container } from "react-bootstrap";
import NoteContext from "./context/NoteContext";
import {
  Spinner,
  } from "@shopify/polaris";
import TopbarFeedList from "./TopbarFeedList";
import FeedDataTable from "./FeedDataTable";

function MultiFeedList (props) {
  const context = useContext(NoteContext);
  const { getAllinstapost,getallPost} = context;
  const [loader, setloader] = useState(true);


      useEffect(() => {
        setloader(false);
      }, []);
    return (
    <div className='custom_pd_table'>
        {loader === true ? (
          <Spinner accessibilityLabel="Spinner example" size="large" />
        ) : (
          <div className="empty"></div>
        )}
          <TopbarFeedList></TopbarFeedList>
          <FeedDataTable axios_instance={props.axios_instance}></FeedDataTable>
      </div>
    );

};
export default MultiFeedList;