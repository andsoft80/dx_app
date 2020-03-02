import React from 'react';
import './home.scss';
import RenderHomeItem from './Render';
import { homes } from './data.js';
import TileView from 'devextreme-react/tile-view';
import './style.css';



export default () => (
  
    <div >
      <TileView
      
        items={homes}
        itemRender={RenderHomeItem}
        height={'100%'}
        baseItemHeight={200}
        baseItemWidth={200}
        width='100%'
        itemMargin={10}
        direction={'vertical'}
        onItemClick = {
          event =>  window.location.href='#/display-data'
          
        }

      />
      </div>
  
  
);
