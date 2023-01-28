import imageLoad from "./ImageLoad";
// import octoImage from "./assets/Images/Octopus/Octopus.png";


function Landing(props){

    const imageURL = imageLoad(props.object.info.image.source);

    const details = props.object.details;

function loadDetail(detail){
    alert("loading detail with title:\n" + detail.info.english.title)
}


    return(
        <div>
            <img src= {imageURL} alt= "Landing page" useMap="#details"/>

            <map name= "details">
                {
                    details.map(
                        (detail) =>
                        <area onClick={() => loadDetail(detail)} key={detail.area.coords.toString()} shape={detail.area.shape} coords={detail.area.coords} alt={detail.id}/>
                    )
                }
            </map>
        </div>
    )
}

export default Landing;