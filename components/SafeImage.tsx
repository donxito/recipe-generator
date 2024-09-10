import  { useState, useEffect } from 'react'
import Image, {ImageProps} from 'next/image'

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc: string;
}


function SafeImage({ src, fallbackSrc = "/placeholder-image.jpg", alt, ...props}: SafeImageProps) {

    const [imgSrc, setImgSrc] = useState<string>(src);

    // Set fallback image on error if fallback src is provided 
    useEffect(() => {
      setImgSrc(src);
    },[src])


  return (
    <Image 
        {...props}
        src={imgSrc}
        alt={alt}
        onError={() => {
          console.error(`Error loading image: ${imgSrc}`);
          setImgSrc(fallbackSrc);
        }}
    /> 
  )
}

export default SafeImage