import {useState, useEffect} from 'react';

function ScreenSize(){
    const [windowDimensions,setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const detectSize = () =>{
        setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    useEffect(() => {
        window.addEventListener('resize', detectSize);

        return() => {
            window.removeEventListener('resize', detectSize);
        }
    }, [windowDimensions]);

    if(windowDimensions.width - windowDimensions.height > 0){
        return "horizontal";
    } else{
        return "vertical";
    }
}

export default ScreenSize;