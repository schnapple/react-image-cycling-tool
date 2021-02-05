# React Image Cycling Tool

A react tool used to cycle through an array of images using HTML5 Canvas.

## [Demo](https://phillagambino.web.app/demo)


## Installation

With NPM:

run `npm install react-image-cycling-tool`.


With Github:

Download [react_image_cycling_tool-0.1.0.tgz](https://github.com/schnapple/react-image-cycling-tool/raw/main/react_image_cycling_tool-0.1.0.tgz) and `run npm install <pwd>/react-image-cycling-tool-1.0.0.tgz)`.

## Usage

This tool is used to cycle through an array of images given by the user.

### Example
```js
import './App.css';
import {ImageFader} from './components/ImageFader'

function App() {
  var images = ["imgURL1","imgURL2","imgURL3","imgURL4"]

  return (
    <ImageFader 
        background="white"
        images={images}
        width={window.innerWidth} 
        height={window.innerHeight}
        objectFit="natural"/>
  );
}

export default App;
```

#### Props

*`background` prop:*
Background color of the component when an image is either transparent or not present.
*Default:* white

*`images` prop:*
A list of image urls to display and cycle through. The component with cycle through these images indefinitely.
*Default:* ["https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"] (no images pic)

*`width` prop:*
Width of the component, percentage of the window's width, less than or equal to 1. **NOTE** dependent on objectFit this may not be the size of the image
*Default:* 1

*`height` prop:*
Height of the component, percentage of the window's height, less than or equal to 1. **NOTE** dependent on objectFit this may not be the size of the image
*Default:* 1

*`objectFit` prop:*
ObjectFit determines how the image will fit the larger canvas object.
- `stretch (default)`: this will stretch all images to fit the size of the component without cropping the image at all.
- `natural`: this will not manipulate the image at all, smaller images will sit within the center of the canvas and larger images will place the center of the image in the cavnas while cropping parts that extend out of it
- `fit`: this will crop the image to fit the ratios of the canvas component and either expand or shrink that image
