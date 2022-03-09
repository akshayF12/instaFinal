import React,{useContext, useState, useEffect,createContext} from 'react';
import {useIndexResourceState, Card, IndexTable, TextStyle,Spinner,EmptySearchResult} from '@shopify/polaris';
import { Context } from '@shopify/app-bridge-react'
import { Redirect } from '@shopify/app-bridge/actions';
import NoteContext from "./context/NoteContext";

function FeedDataTable(props) {
  let textInput = React.createRef();  // React use ref to get input value
   const [loader, setloader] = useState(true);
    const context = useContext(NoteContext);
    const { getAllinstapost,getallPost,deleteFeeddata,spiner} = context;
    const [users, setusers] = useState([]); 
    const [first, setfirst] = useState(1);
    const app = useContext(Context);
    const redirect = Redirect.create(app);
    // console.log(getallPost)
     const oneditClick = e => {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      setusers(e.target.dataset.user)
      redirect.dispatch(Redirect.Action.APP, '/DashBoard');
     }
      


    useEffect(() => {
      const shop_details = async()=>{
        const shop_data = await props.axios_instance.get("/api/init_fauna");
        if (shop_data) {
          // console.log(shop_data.data.body.shop.domain);
          const shop_name = shop_data.data.body.shop.domain;
          getAllinstapost(shop_name);
        }
      }
      shop_details();
    
    }, []);
    

    if (getallPost.length != 0) {
      if (first === 1) {
        setloader(false)
        setfirst (first + 1);
      }
    }
      const resourceName = {
        singular: 'InstaFeed',
        plural: 'InstaFeed',
      };
      
      const emptyStateMarkup = (
        <div className='spiner_tabel'>
        <Spinner accessibilityLabel="Spinner example" size="large" />
        </div>
      );

        const handlecopyBtn = (s_id) => { 
          const code = document.getElementById(`${s_id}`);
          if (code != null) {
            navigator.clipboard.writeText(code.value);
            console.log(code.value)
          }
          
         }

      const resourceIDResolver = (getallPost) => {
        return getallPost._id;
      };

      const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(getallPost, {
        resourceIDResolver,
      });

      const promotedBulkActions = [
        {
          content: 'Edit Instagram Feed',
          onAction: () => {

            redirect.dispatch(Redirect.Action.APP, '/DashBoard');

          },
        },
      ];
      const bulkActions = [
        {
          content: 'Delete Users',
          onAction: () => {
            setloader(true)
            deleteFeeddata(selectedResources);
            setloader(false)
          }
          
        },
        
      ];

    const deleteButton = (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      console.log([e.target.dataset.user_id])
      deleteFeeddata([e.target.dataset.user_id])
    };
    
      const rowMarkup = getallPost.map(
        ({ _id, user_name, short_code, insta_status }, index) => (
          <IndexTable.Row
            id={_id}
            key={_id}
            selected={selectedResources.includes(_id)}
            position={index}
          >
            <IndexTable.Cell>
              <TextStyle>{user_name}</TextStyle>
            </IndexTable.Cell>
            <IndexTable.Cell>
              {insta_status == true ? "Active" : "Dactive"}
            </IndexTable.Cell>
            <IndexTable.Cell>
              <div className='text_code'><TextStyle variation="code">{`<div id="${short_code}" class="cx-main-container"></div>`}</TextStyle></div>
               {/* <form>
                <div className="input-group">
                  <input
                    ref={textInput}
                    type="text"
                    className="form-control"
                    value={`<div id="${short_code}" class="cx-main-container"></div>`}
                    placeholder="Some path"
                    id={short_code}
                    readOnly
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-default"
                      type="button"
                      id="copy-button"
                      data-toggle="tooltip"
                      data-placement="button"
                      title="Copy to Clipboard"
                      onClick={handlecopyBtn(short_code)}
                    >
                      Copy
                    </button>
                  </span>
                </div>
              </form>  */}
            </IndexTable.Cell>
            <IndexTable.Cell>
              <a
                href="#"
                onClick={oneditClick}
                data-user={user_name}
                className="Polaris-Button  Polaris-Button--plain me-2"
              >
                Edit
              </a>
              &nbsp; &nbsp;
              <a
                href="#"
                className="Polaris-Button Polaris-Button--destructive Polaris-Button--plain"
                data-user_id={_id}
                onClick={deleteButton}
              >
                {" "}
                Remove
              </a>
            </IndexTable.Cell>
          </IndexTable.Row>
        )
      );
     
      return (
        <div className='custom_tbale'>
        
        {loader === true ? (
          <div className='spiner_tabel'>
          {/* <Spinner accessibilityLabel="Spinner example" size="large" /> */}
          </div>
        ) : (
          <div className="empty"></div>
        )}
        <Card>
          <div className='table_font'>
          <IndexTable
            resourceName={resourceName}
            loading={spiner == true}
            itemCount={getallPost.length}
            selectedItemsCount={
              allResourcesSelected ? 'All' : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            emptyState={emptyStateMarkup}
            bulkActions={bulkActions}
            // promotedBulkActions={promotedBulkActions}
            headings={[
              {title: 'User Name'},
              {title: 'User Status'},
              {title: 'Short Code For Instagram'},
              {title: 'Actions'},
            ]}
           selectable={false}
          >
            {rowMarkup}
          </IndexTable>
          </div>
        </Card>
       
        </div>
      );
}

export default FeedDataTable;

