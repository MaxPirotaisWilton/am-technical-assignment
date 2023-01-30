import imageLoad from "./ImageLoad";
import React from 'react';


function Landing({object,setParentText,setParentDetailID,isParent,layer}){

    // console.log("render");

    const[detailID,setDetailID] = React.useState(-1);
    const[childDetailID, setChildDetailID] = React.useState(-1);

    const imageURL = imageLoad(object.info.image.source);
    const details = object.details;
    const areas = [];
    const nextLayer = layer + 1;
    var child = [];

    if(detailID >= 0){
    child = <Landing object= {details[detailID]} setParentText={setParentText} setParentDetailID= {setChildDetailID} isParent = {false} layer= {nextLayer}/>;
    isParent = true;
    }

    if(details !== null && details !== undefined){
        for(let i = 0; i < details.length; i++){
            areas.push(<area onClick={() => loadDetail(i)} key={i} shape={details[i].area.shape} coords={details[i].area.coords} alt={details[i].info.title}/>);
        }

        // console.log(areas);
    }

    function loadDetail(detailIdx){
        const detail = details[detailIdx];

        //console.log(detailIdx);
        //console.log(details[detailIdx]);

        //alert("loading detail with title:\n" + detail.info.english.title);
        setDetailID(detailIdx);
        setParentText(detail.info);

        if(setParentDetailID !== undefined){
            setParentDetailID(detailIdx);
        }
    }

    function closeDetail(){
        console.log(layer)

        setDetailID(-1);
        setParentText(object.info);

        if(setParentDetailID !== undefined){
            setParentDetailID(-1);
        }
    }
    console.log(childDetailID < 0); 
    console.log(detailID >= 0);

    return(
        <div>
            <img src= {imageURL} alt= "Landing page" useMap={"#details_" + layer.toString()}/>
            
            {detailID < 0 &&
                <map name= {"details_" + layer.toString()}>
                {areas}
                </map>
            }
            {detailID >= 0 &&
                <div>
                    {child}
                </div>
            }     
            {childDetailID < 0 && detailID >= 0 &&
                <button onClick={() => closeDetail()}>Back</button>
            } 
        </div>
        
    )
}

export default Landing;