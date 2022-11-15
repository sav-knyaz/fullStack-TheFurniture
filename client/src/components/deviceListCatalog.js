import React from "react";
import { DeviceCatalog } from "./deviceCatalog.js";


function DeviceListCatalog(props){
       const device = props.prop;

    return(
        <section className="catalog__wrapper__device-card">
          { device.map(item =>
           <DeviceCatalog key={item.id} device={item} />)
          }
        </section>
    )
}

export default DeviceListCatalog