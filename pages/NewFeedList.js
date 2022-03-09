import React from 'react';
import MultiFeedList from './MultiFeedList';

function NewFeedList(props) {
  return( 
  <div>
    <MultiFeedList axios_instance={props.axios_instance}></MultiFeedList>
  </div>
  );
}

export default NewFeedList;
