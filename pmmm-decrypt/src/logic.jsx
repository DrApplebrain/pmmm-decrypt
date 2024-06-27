import { useContext } from "react"
import { indexContext } from "./index.jsx"


const { dispatch } = useContext(indexContext)

const textfieldEncryption = document.querySelector('.encrypt-text');
const textfieldDecryption = document.querySelector('.decrypt-text');

const context = canvas.getContext('2d');
const button = document.querySelector('.de-encrypt');

export default function encrypt(){
    console.log(textfieldEncryption.value);
    let mytext = textfieldEncryption.value
    let array = grayRamp.split(" ")

    for (let letter = 0 ; letter < mytext.length ; letter += 1) {
        array.push(mytext[letter])
        
    }
    array.toString()
    console.log(array);
    grayRamp = array;
    rampLength = grayRamp.length;
    drawAscii(grayScales, width);
    
}