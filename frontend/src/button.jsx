import { useState } from 'react'
import { useRef } from 'react';

export default function MyButton(){
    let ref = useRef(0);

    function onClickHandler() {
        ref.current++;
        alert('You clicked ' + ref.current + ' times!   ');
    }
    
    
    return(
        <>
        <button onClick={onClickHandler}>
            Click me!
        </button>
        </>
);
}