'use-client';

import ClipLoader from 'react-spinners/ClipLoader';
import ScaleLoader from 'react-spinners/ScaleLoader';

const overrideClipLoader = {
  display: 'block',
  margin: '100px auto',
};

const overrideScaleLoader = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
  width: '100vw',
  position: 'fixed',
  top: 0,
  left: 0,
  background: 'transparent',
  zIndex: 9999,
  pointerEvents: 'none', // Allow clicks to pass through
};

const LoadingPage = () => {
  return (
    <>
      <ClipLoader color="#DC143C" cssOverride={overrideClipLoader} size={150} area-label="Loading Spinner" />

      <ScaleLoader
        barCount={6}
        color="#3b82f6"
        height={80}
        width={6}
        radius={10}
        cssOverride={overrideScaleLoader}
        area-label="Loading Spinner"
      />
    </>
  );
};

export default LoadingPage;
