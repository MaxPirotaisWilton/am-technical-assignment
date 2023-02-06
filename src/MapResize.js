import React from "react";

function ResizePolyAreaCoords(coords,size1,size2){

    //console.log(coords.type);

    const newCoords = [];
    const xRatio = size2.x/ size1.x;
    const yRatio = size2.y/ size1.y;

    for(let i = 0; i < coords.length; i++){
        if(i%2 != 0){
            newCoords.push(coords[i]*yRatio);
        }
        else{
            newCoords.push(coords[i]*xRatio);
        }
    }

    return newCoords;
}

function ResizeRectAreaCoords(coords,size1,size2){

    const newCoords = [];
    const xRatio = size2.x/ size1.x;
    const yRatio = size2.y/ size1.y;

    for(let i = 0; i < coords.length; i++){
        if(i%2 != 0){
            newCoords.push(coords[i]*yRatio);
        }
        else{
            newCoords.push(coords[i]*xRatio);
        }
    }


    return newCoords;
}

function ResizeCircleAreaCoords(coords,size1,size2){

    const newCoords = [];
    const xRatio = size2.x/ size1.x;
    const yRatio = size2.y/ size1.y;

    newCoords.push(coords[0]*xRatio);
    newCoords.push(coords[1]*yRatio);
    newCoords.push(coords[2]*Math.min(xRatio,yRatio))

    return newCoords;
}

export {
    ResizeCircleAreaCoords, ResizePolyAreaCoords, ResizeRectAreaCoords
}