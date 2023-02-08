function imageLoad(source){
    var image;

    if(isValidURL(source)){
        image = source;
    }
    else{
        image = process.env.PUBLIC_URL + source;
    }

    return image;
}

function isValidURL(string){
    let url;
    try{
        url = new URL(string);
    } catch(_){
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

export default imageLoad;