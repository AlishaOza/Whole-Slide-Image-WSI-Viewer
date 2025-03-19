import React, { useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import BoundingBox from "./BoundingBox";
import "../App.css";

const ImageViewer = ({ imageSrc, detectionResults, onViewAreaChange }) => {
  const imageRef = useRef(null);

  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={0}
      initialPositionY={0}
      minScale={0.5}
      maxScale={5}
      wheel={{ step: 0.1 }}
      doubleClick={{ step: 0.5 }}
      onWheel={(ref, event) => {
        const { state } = ref;
        const { scale, positionX, positionY } = state;

        // Get cursor position relative to the image
        const rect = imageRef.current.getBoundingClientRect();
        const cursorX = event.clientX - rect.left;
        const cursorY = event.clientY - rect.top;

        // Calculate new scale
        const newScale = event.deltaY < 0 ? scale + 0.1 : scale - 0.1;

        // Adjust position to zoom at the cursor
        const newPositionX = cursorX - (cursorX - positionX) * (newScale / scale);
        const newPositionY = cursorY - (cursorY - positionY) * (newScale / scale);

        // Update state
        ref.setState({
          scale: newScale,
          positionX: newPositionX,
          positionY: newPositionY,
        });

        // Update view area
        const imageWidth = imageRef.current.offsetWidth;
        const imageHeight = imageRef.current.offsetHeight;
        onViewAreaChange({
          x: -newPositionX / newScale,
          y: -newPositionY / newScale,
          width: imageWidth / newScale,
          height: imageHeight / newScale,
        });
      }}
      onPanning={(ref) => {
        const { state } = ref;
        const imageWidth = imageRef.current.offsetWidth;
        const imageHeight = imageRef.current.offsetHeight;
        onViewAreaChange({
          x: -state.positionX / state.scale,
          y: -state.positionY / state.scale,
          width: imageWidth / state.scale,
          height: imageHeight / state.scale,
        });
      }}
    >
      {({ zoomIn, zoomOut, resetTransform, rotate, state }) => (
        <>
          <div className="controls">
            <button onClick={() => zoomIn()}>Zoom In</button>
            <button onClick={() => zoomOut()}>Zoom Out</button>
            <button onClick={() => resetTransform()}>Reset</button>
            <button onClick={() => rotate(90)}>Rotate 90°</button>
          </div>
          <TransformComponent>
            <div className="image-container">
              <div
                className="image-wrapper"
                style={{
                  transform: `rotate(${state.rotation}deg) scale(${state.scale})`,
                  transformOrigin: "center",
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <img
                  ref={imageRef}
                  src={imageSrc}
                  alt="Slide"
                  className="slide-image"
                />
                {detectionResults &&
                  Array.isArray(detectionResults) &&
                  detectionResults.map((result, index) => {
                    const { coordinates } = result;

                    if (!Array.isArray(coordinates) || coordinates.length < 4) {
                      console.error("Invalid coordinates:", coordinates);
                      return null;
                    }

                    const [x1, y1, x2, y2] = coordinates;

                    return (
                      <BoundingBox
                        key={index}
                        box={{ x1, y1, x2, y2, label: result.label }}
                        isSelected={false}
                        zoomLevel={state.scale}
                        rotation={state.rotation}
                      />
                    );
                  })}
              </div>
            </div>
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
};

export default ImageViewer;