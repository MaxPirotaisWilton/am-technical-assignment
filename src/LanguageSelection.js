import { useState } from 'react'

function LanguageSelection({langValue, toggleLang}) {

    const toggleEnglish = e => toggleLang(false);
    const toggleMaori = e => toggleLang(true);

    if(langValue){    
        return <EnglishButton onClick={toggleEnglish}/>
    } else{
        return <MaoriButton onClick={toggleMaori}/>
    }
    
}

function EnglishButton(props){
    return(
        <button onClick={props.onClick}>
            English
        </button>
    );
}

function MaoriButton(props){
    return(
        <button onClick={props.onClick}>
            Maori
        </button>
    );
}

export default LanguageSelection;