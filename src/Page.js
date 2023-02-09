import imageLoad from "./ImageLoad";
import {ResizeCircleAreaCoords, ResizePolyAreaCoords, ResizeRectAreaCoords} from "./MapResize";
import React, { useRef } from 'react';
import { useImageSize } from 'react-image-size';
import './App.scss';


function Page({object,setParentText,setParentChildDetailID,isParent,layer,aspectRatioString}){


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

    // If detail is selected, populate child Page component
    if(detailID >= 0){
        child = <Page object= {details[detailID]} setParentText={setParentText} setParentChildDetailID= {setChildID} isParent = {false} layer= {nextLayer} aspectRatioString= {aspectRatioString}/>;
        isParent = true;
    }

    // Resize area coordinates, based on the image at it's original size, for the image map as it is scaled with the styling.
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
                areas.push(<area onClick={() => loadDetail(i)} key={i} shape={details[i].area.shape} coords={scaledCoords} alt={details[i].info.title}/>);
            }
        }
    }

    // function passed to child pages: lets the child page set the childDetailID stateful variable of the parent
    function setChildID(num){
        setChildDetailID(num);
        if(num >= 0){
            clearDetailTimeout();
        } 
        if(num < 0){
            closeDetail();
        }
   }

    // Sets detailID, used to populate child Page component, and parent's childDetailID.
    // Sets 1 minute timeout for page, where it'll use closeDetail() function.

    function loadDetail(detailIdx){

        const detail = details[detailIdx];


        setDetailID(detailIdx);

        // set textObject stateful variable in App component to the info field of the page's details
        setParentText(detail.info);

        if(setParentChildDetailID !== undefined){
            setParentChildDetailID(detailIdx);
        }
        startDetailTimeout(millisecTimer);
    }

    // resets detailID and parent's childDetailID.
    // This unloads to the main page, 
    // not desirable for convenient multi-layered interactive

    function closeDetail(){

        clearDetailTimeout();
        setDetailID(-1);

        // reset textObject stateful variable in App component to the info field of the current page
        setParentText(object.info);

        if(setParentChildDetailID !== undefined){
            setParentChildDetailID(-1);
        }
    }

    function startDetailTimeout(timeMilli){
        timeoutID.current = window.setTimeout(() => closeDetail(),timeMilli)
    }

    function clearDetailTimeout(){
        if (timeoutID.current) {
            clearTimeout(timeoutID.current);
            timeoutID.current = null;
        }
    }

    return(
        <div>
            <div>
                <img className={aspectRatioString + "-image"} src= {imageURL} ref={imageRef} alt= {object.info.english.title} useMap={"#details_" + layer.toString()}/>
                
                {/*load map element if no element has been selected on this page*/}
                {detailID < 0 &&
                    <map name= {"details_" + layer.toString()}>
                    {areas}
                    </map>
                }
            </div>
            {detailID >= 0 &&
                <div>
                    {/* !! Recursion happens here !!

                        Displays child Page component if current Page component's detailID is not negative
                    */}
                    {child}
                </div>
            }   
            {/* 
                Makes back button appear only if a child Page is rendered and 
                if that child Page component has not selected a child page of it's own
            */}
            {childDetailID < 0 && detailID >= 0 &&
                <button className="back" onClick={() => {
                    closeDetail();
                }}>Back</button>
            } 
        </div>
        
    )
    
}

export default Page;