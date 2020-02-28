import React from 'react';
import './style.css'

export default function RenderHomeItem(data) {
  return (
    <div       
    className="dx-tile-image"
    style={{ backgroundImage: `url(${data.ImageSrc})` }}
    >

        <img src={data.ImageSrc} style={{"height": "100%"}}/>
    </div>
  );
}