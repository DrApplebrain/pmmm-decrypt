import './styles.css'

const canvas = document.getElementById('preview');
const fileInput = document.querySelector('input[type="file"');
const asciiImage = document.getElementById('ascii');
const textfieldEncryption = document.querySelector('.encrypt-text');
const textfieldDecryption = document.querySelector('.decrypt-text');

const context = canvas.getContext('2d');
const buttonEncrypt = document.querySelector('.encrypt');
const buttonDecrypt = document.querySelector('.decrypt');
const buttonCopy = document.querySelector('.copy')

buttonEncrypt.addEventListener('click', function() {
  encrypt()
});

buttonDecrypt.addEventListener('click', function() {
    decrypt()
  });

  buttonCopy.addEventListener('click', function() {
    copy()
  });


    let grayRamp = ``;
    let symbols = `! ? & $ @ B . % 8 & W M # * o a h k b d p q w m Z O 0 Q L C J U Y X z c v u n x r j f t / | ( ) 1 { } [ ] ? - _ + ~ < > i ! l I ; : , " ^ `;
    let rampLength = grayRamp.length;    

    function encrypt(){
        let mytext = textfieldEncryption.value
        let array = grayRamp.split(" ")

        for (let letter = 0 ; letter < mytext.length ; letter += 1) {
            array.push(mytext[letter])
            
        }
        array.toString()
        
        grayRamp = symbols + array.toString();
        
        
        rampLength = grayRamp.length;
        
        drawAscii(mygray, mywidth, mytext);
    }

    
    
        const toGrayScale = (r, g, b) => 0.21 * r + 0.72 * g + 0.07 * b;

        const getFontRatio = () => {
            
            const pre = document.createElement('pre');
            pre.style.display = 'inline';
            pre.textContent = ' ';

            document.body.appendChild(pre);
            const { width, height } = pre.getBoundingClientRect();
            document.body.removeChild(pre);
//Ho
            return height / width;
        };

        const fontRatio = getFontRatio();
        

        const convertToGrayScales = (context, width, height) => {
            const imageData = context.getImageData(0, 0, width, height);

            const grayScales = [];

            for (let i = 0 ; i < imageData.data.length ; i += 4) {
                const r = imageData.data[i];
                const g = imageData.data[i + 1];
                const b = imageData.data[i + 2];

                const grayScale = toGrayScale(r, g, b);
                imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grayScale;

                grayScales.push(grayScale);
            }

            context.putImageData(imageData, 0, 0);

            return grayScales;
        };

        const MAXIMUM_WIDTH = 50;
        const MAXIMUM_HEIGHT = 50;

        const clampDimensions = (width, height) => {
            const rectifiedWidth = Math.floor(getFontRatio() * width);

            if (height > MAXIMUM_HEIGHT) {
                const reducedWidth = Math.floor(rectifiedWidth * MAXIMUM_HEIGHT / height);
                return [reducedWidth, MAXIMUM_HEIGHT];
            }

            if (width > MAXIMUM_WIDTH) {
                const reducedHeight = Math.floor(height * MAXIMUM_WIDTH / rectifiedWidth);
                return [MAXIMUM_WIDTH, reducedHeight];
            }

            return [rectifiedWidth, height];
        };

        let mygray
        let mywidth
        

        fileInput.onchange = (e) => {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.onload = (event) => {
                const image = new Image();
                image.onload = () => {
                    const [width, height] = clampDimensions(image.width, image.height);

                    canvas.width = width;
                    canvas.height = height;

                    context.drawImage(image, 0, 0, width, height);
                    const grayScales = convertToGrayScales(context, width, height);

                    fileInput.style.display = 'none';
                    
                    mygray = grayScales
                    mywidth = width 
                }

                image.src = event.target.result;
            };

            reader.readAsDataURL(file);
        };



        const getCharacterForGrayScale = grayScale => grayRamp[Math.ceil((rampLength - 1) * grayScale / 255)];

        

        function drawAscii (mygray, mywidth, mytext, index){
            
            
            let ascii = mygray.reduce((asciiImage, grayScale, index) => {
                let nextChars = getCharacterForGrayScale(grayScale);
                if ((index + 1) % mywidth === 0) {
                    nextChars += '\n'
                }
                
                
                return asciiImage + nextChars;
            }, '');

        
            let newAscii = ``
    
            let zahl = mytext.length 
            let nummer = 0

            for(let b = 0; b < (ascii.length); b += 1){
                if (b > 3000){
                    
                        if(b % 9 === 0){
                            if(zahl > 0){
                                zahl -= 1
                                newAscii += mytext.slice(nummer, nummer+1)
                                nummer += 1
                            }
                            else{
                                newAscii += ascii[b]
                            }
                        }
                        else{
                            newAscii += ascii[b]
                        } 
                     
                }
                else{
                    newAscii += ascii[b]
                } 
                    
            }
                    newAscii.slice(-mytext.length)
                    asciiImage.textContent = newAscii;
                    textfieldDecryption.value = newAscii;
                 
        }

        
        function decrypt(){
            let decryptText = textfieldDecryption.value
            let decryptedText =``
            for(let b = 0; b < (decryptText.length); b += 1){
                
                if(b > 3000){
                    if(b % 9 === 0){
                    
                        decryptedText += decryptText[b]
                        
                    }
                
                }
                
            }
            textfieldEncryption.value = decryptedText;
        }

        function copy(){
            textfieldDecryption.select();
            textfieldDecryption.setSelectionRange(0, 99999); // For mobile devices

            // Copy the text inside the text field
            navigator.clipboard.writeText(textfieldDecryption.value);

            // Alert the copied text
            alert("Copied the text: " + textfieldDecryption.value);
        }


