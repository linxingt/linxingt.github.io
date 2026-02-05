import { useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import './styles/FullScreenLoader.scss'

const FullScreenLoader = ({ src }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = 'auto')
  }, []);
  return (
    <div className="fullscreenLoader">
      <DotLottieReact
        src={src}
        autoplay
        loop
        speed={2.5}
        className="lottie"
      />
    </div>
  )
}

export default FullScreenLoader
