import './App.scss';
import React from 'react';
import LanguageSelection from './LanguageSelection';
import Landing from './Landing';
import ScreenSize from './ScreenSize';
import config from './assets/Configs/SouthIsland.json';

function App(){

  const landingConfig = config.info;

  // const detailConfigs = config.details;

  var currentConfig = landingConfig;

  const [langToggle,setLangToggle] = React.useState(false);
  const [textObject,setTextObject] = React.useState(currentConfig);
  
  const subtitle = getSubtitle(langToggle,textObject);
  const paragraphs = getParagraphs(langToggle,textObject);

  const aspectRatioString = ScreenSize();

    return (
      <div>
        <div className = {aspectRatioString + "-map"}>

          <Landing object= {config} setParentText= {setTextObject} isParent= {false} layer= {0} aspectRatioString= {aspectRatioString}/>
        </div>
        <div className={aspectRatioString + "-info"}>
          <div>
            <h1>{getTitle(langToggle,textObject)}</h1>
            {verifySubtitleExists(subtitle) &&
              <h2>{subtitle}</h2>
            }

            {verifyParagraphsExist(paragraphs) &&
            <ul>{paragraphs.map((item) => <li key= {item.toString()}>{item}</li>)}</ul>
            } 
          </div>
          <LanguageSelection langValue={langToggle} toggleLang={setLangToggle}/>
        </div>

      </div>
    );
  
}

function getTitle(toggle,object){
  if(toggle){
    return object.maori.title;
  } else {
    return object.english.title;
  }
}

function getSubtitle(toggle,object){
  if(toggle){
    return object.maori.subtitle;
  } else {
    return object.english.subtitle;
  }
}

function getParagraphs(toggle,object){
  if(toggle){
    return object.maori.paragraphs;
  } else {
    return object.english.paragraphs;
  }
}

function verifySubtitleExists(susSubtitle){
  return susSubtitle !== undefined && susSubtitle != null;
}

function verifyParagraphsExist(susParagraphs){
  return susParagraphs !== undefined && susParagraphs != null && susParagraphs.length > 0;
}

export default App;
