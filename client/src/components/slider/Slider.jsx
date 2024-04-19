import { useState } from "react";
import "./slider.scss";

export default function Slider({ images }) {
  const [imgIndex, setImgIndex] = useState(null);

  const changeSlider = (direction) => {
    if (direction === "left") {
      if (imgIndex === 0) {
        setImgIndex(images.length - 1);
      } else {
        setImgIndex(imgIndex - 1);
      }
    } else {
      if (imgIndex === images.length - 1) {
        setImgIndex(0);
      } else {
        setImgIndex(imgIndex + 1);
      }
    }
  };

  return (
    <>
      <div className="slider">
        {imgIndex !== null && (
          <div className="fullSlider">
            <div className="arrow">
              <img src="/arrow.png" alt="" onClick={() => changeSlider("left")} />
            </div>
            <div className="imgContainer">
              <img src={images[imgIndex]} alt="" />
            </div>
            <div className="arrow">
              <img src="/arrow.png" alt="" className="rightArrow" onClick={() => changeSlider("right")} />
            </div>
            <div className="close" onClick={() => setImgIndex(null)}>
              X
            </div>
          </div>
        )}
        <div className="bigImage">
          <img src={images[0]} alt="" onClick={() => setImgIndex(0)} />
        </div>
        <div className="smallImage">
          {images.slice(1).map((image, index) => (
            <img key={index} src={image} alt="" onClick={() => setImgIndex(index + 1)} />
          ))}
        </div>
      </div>
    </>
  );
}
