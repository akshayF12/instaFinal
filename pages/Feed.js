import React from 'react'
import MultiFeedList from './MultiFeedList';

function Feed(props) {
  return (
    <div className='body_padding'>
     <MultiFeedList axios_instance={props.axios_instance}></MultiFeedList>   
    </div>
  )
}

export default Feed