import imageLoad from "./ImageLoad";
import {ResizeCircleAreaCoords, ResizePolyAreaCoords, ResizeRectAreaCoords} from "./MapResize";
import React, { useRef } from 'react';
import { useImageSize } from 'react-image-size';
import './App.scss';
import MapResize from "./MapResize";


function Landing({object,setParentText,setParentDetailID,isParent,layer,aspectRatioString}){

    // console.log("render");

    const[detailID,setDetailID] = React.useState(-1);
    const[childDetailID, setChildDetailID] = React.useState(-1);
    
    const imageURL = imageLoad(object.info.image.source);
    const[imageData, { loadingImageData, error }] = useImageSize(imageURL);
    const imageRef = useRef(null);

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

    // if(imageData){
    //     console.log(imageData);
    // }

    // if(imageRef && imageRef.current){
    //     console.log(imageRef.current.clientWidth);
    //     console.log(imageRef.current.clientHeight);
    // }

    if(detailID >= 0){
        child = <Landing object= {details[detailID]} setParentText={setParentText} setParentDetailID= {setChildID} isParent = {false} layer= {nextLayer} aspectRatioString= {aspectRatioString}/>;
        isParent = true;
    }

    if(details !== null && details !== undefined){

        if(imageData && imageRef && imageRef.current){

            const sizeOne = {x: imageData.width, y: imageData.height};
            const sizeTwo = {x: imageRef.current.clientWidth, y: imageRef.current.clientHeight}

            for(let i = 0; i < details.length; i++){
                var scaledCoords = [];
                
                switch(details[details[i].area.shape]){
                    case "rect":
                        scaledCoords = ResizeRectAreaCoords(details[i].area.coords, sizeOne, sizeTwo);
                        break;
                    case "circle":
                        scaledCoords = ResizeCircleAreaCoords(details[i].area.coords, sizeOne, sizeTwo);
                        break;
                    default:
                        scaledCoords = ResizePolyAreaCoords(details[i].area.coords, sizeOne, sizeTwo);
                        break;
                }
                //console.log(details[i].info.title);
                //console.log(details[i].area.coords);

                //console.log(scaledCoords);

                areas.push(<area onClick={() => loadDetail(i)} key={i} shape={details[i].area.shape} coords={scaledCoords} alt={details[i].info.title}/>);
            }
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

        //console.log(object.info.english.title + ": loading detail " + detail.info.english.title + "  /// " + getTime());

        if(setParentDetailID !== undefined){
            setParentDetailID(detailIdx);
        }
        startDetailTimeout(millisecTimer);
    }

    function closeDetail(){

        //console.log(object.info.english.title + ": closing detail /// " + getTime());
        clearDetailTimeout();
        setDetailID(-1);
        setParentText(object.info);

        if(setParentDetailID !== undefined){
            setParentDetailID(-1);
        }
    }

    function startDetailTimeout(timeMilli){
        //console.log(object.info.english.title + ": setTimeout() /// " + getTime())
        timeoutID.current = window.setTimeout(() => closeDetail(),timeMilli)
    }

    function clearDetailTimeout(){
        //console.log(object.info.english.title + ": clearTimeout() /// " + getTime())
        if (timeoutID.current) {
            clearTimeout(timeoutID.current);
            timeoutID.current = null;
        }
    }

    // function restartDetailTimeout(){
    //     console.log(object.info.english.title + ": restart() /// " + getTime())
    //     clearDetailTimeout();
    //     startDetailTimeout(millisecTimer);
    // }

    return(
        <div>
            <div>
                <img className={aspectRatioString + "-image"} src= {imageURL} ref={imageRef} alt= "Landing page" useMap={"#details_" + layer.toString()}/>
                
                {detailID < 0 &&
                    <map name= {"details_" + layer.toString()}>
                    {areas}
                    </map>
                }
            </div>
            {detailID >= 0 &&
                <div>
                    {child}
                </div>
            }     
            {childDetailID < 0 && detailID >= 0 &&
                <button className="back" onClick={() => {
                    closeDetail();
                }}>Back</button>
            } 
        </div>
        
    )
    
}

export default Landing;