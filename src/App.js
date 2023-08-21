import './App.css';
import {fs} from './utils/fs';


var __dirname = 'deduplicate/assets';

function handleDirUpload(event) {
  // Get the files selected by the user
  const files = event.target.files;
  
  // Loop through each file in the selection
  for (let i = 0; i < files.length; i++) {
    const file = files[i]; 

    // Check if the file is an image  
    if (file.type.startsWith('image/')) {
      // Create a new file reader
      const reader = new FileReader();
      const reader2 = new FileReader();

      // Read the contents of the file
      reader.readAsDataURL(file);
      reader2.readAsArrayBuffer(file);

      console.log('reader1',reader);
      console.log('reader2',reader2);

     // When the file is loaded, save it to the project folder
      reader.onload = function () {
        // Create a new image element
        const image = new Image();

        // Set the source of the image to the data URL
        image.src = reader.result;

        // When the image is loaded, save it to the project folder
        image.onload = function () {
          // Create a new canvas element
          const canvas = document.createElement('canvas');

          // Set the dimensions of the canvas to match the image
          canvas.width = image.width;
          canvas.height = image.height;

          // Draw the image on the canvas
          const context = canvas.getContext('2d');
          context.drawImage(image, 0, 0);

          // Get the data URL of the canvas
          const dataURL = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");;

          window.location.href=image;
          // Get the selected folder path
          const folderPath = __dirname;

           // Create a new file path for the image
           const filePath = `${folderPath}/${file.name}`;

          fs.write(filePath,reader2, (err) => {
                if (err) {
                  console.error(err);
                  alert('Error saving file');
                } else {
                  alert('File saved successfully');
                }
              });
        
        
        };
      };

      // reader.onload = function () {
      //   // Save the file to the selected destination
      //   fs.writeFile(__dirname+'/'+ file.name, new Uint8Array(reader.result), (err) => {
      //     if (err) {
      //       console.error(err);
      //       alert('Error saving file');
      //     } else {
      //       alert('File saved successfully');
      //     }
      //   });
      // }
    }
  } 
}


// Convert a data URL to a Buffer
function dataURLtoBuffer(dataURL) {
  const parts = dataURL.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const buffer = Buffer.from(parts[1], 'base64');

  return buffer;
}


/*
// Converts a data URL to a Blob
function dataURLtoBlob(dataURL) {
  const parts = dataURL.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}*/

function App() {
  return (
    <>
      <header className='d-flex justify-content-center m-5 px-5'> 
        <h3>          Deduplcate        </h3>
      </header>

      <div className='d-flex justify-content-center my-3 mx-5'>
        <form>
          <input type = "file" webkitdirectory = "true" directory="true" onChange = {(e) => handleDirUpload(e)}/>  
        </form>
      </div>

      <footer className='d-flex justify-content-center m-5 px-5'>
        <span>All Rights Reserved !</span>
      </footer>
    </>
  );
}

export default App;
 