import imageLoad from "./ImageLoad";
import React, { useRef } from 'react';


function Landing({object,setParentText,setParentDetailID,isParent,layer}){

    // console.log("render");

    const[detailID,setDetailID] = React.useState(-1);
    const[childDetailID, setChildDetailID] = React.useState(-1);

    const imageURL = imageLoad(object.info.image.source);
    const details = object.details;
    const areas = [];
    const nextLayer = layer + 1;
    var child = [];
    const timeoutID = useRef(null);
    const millisecTimer = 60000;

    // DEBUG USE ONLY
    function getTime(){
        var today = new Date();
        return today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    };

    if(detailID >= 0){
        child = <Landing object= {details[detailID]} setParentText={setParentText} setParentDetailID= {setChildID} isParent = {false} layer= {nextLayer}/>;
        isParent = true;
    }

    if(details !== null && details !== undefined){
        for(let i = 0; i < details.length; i++){
            areas.push(<area onClick={() => loadDetail(i)} key={i} shape={details[i].area.shape} coords={details[i].area.coords} alt={details[i].info.title}/>);
        }
    }

    function setChildID(num){
        setChildDetailID(num);
        if(num >= 0){
            clearDetailTimeout();
        } 
        if(num < 0){
            closeDetail();
        }
   }

    function loadDetail(detailIdx){
        const detail = details[detailIdx];

        setDetailID(detailIdx);
        setParentText(detail.info);

        console.log(object.info.english.title + ": loading detail " + detail.info.english.title + "  /// " + getTime());

        if(setParentDetailID !== undefined){
            setParentDetailID(detailIdx);
        }
        startDetailTimeout(millisecTimer);
    }

    function closeDetail(){

        console.log(object.info.english.title + ": closing detail /// " + getTime());
        clearDetailTimeout();
        setDetailID(-1);
        setParentText(object.info);

        if(setParentDetailID !== undefined){
            setParentDetailID(-1);
        }
    }

    function startDetailTimeout(timeMilli){
        console.log(object.info.english.title + ": setTimeout() /// " + getTime())
        timeoutID.current = window.setTimeout(() => closeDetail(),timeMilli)
    }

    function clearDetailTimeout(){
        console.log(object.info.english.title + ": clearTimeout() /// " + getTime())
        if (timeoutID.current) {
            clearTimeout(timeoutID.current);
            timeoutID.current = null;
        }
    }

    function restartDetailTimeout(){
        console.log(object.info.english.title + ": restart() /// " + getTime())
        clearDetailTimeout();
        startDetailTimeout(millisecTimer);
    }

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
                <button onClick={() => {
                    closeDetail();
                }}>Back</button>
            } 
        </div>
        
    )
    
}

export default Landing;