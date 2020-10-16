import React, { useEffect, useRef } from 'react';

const ImageHeightAdjusting = ({ image, className, alt }) => {
  const imageRef = useRef();
  const [height, setHeight] = useState(undefined);

  const adjustHeight = () => {
    const width = imageRef.current.clientWidth;
  };

  return (
    <img
      onload={adjustHeight}
      ref={imageRef}
      src={image}
      alt={alt}
      className={className}
    />
  );
};

export default ImageHeightAdjusting;
