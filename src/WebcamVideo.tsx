import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import FaceDetector from '@src/FaceDetector';
import MaskRenderer from '@src/MaskRenderer';

const Container = styled.div`
  position: relative;
  border: 1px solid red;
  width: 640px;
  height: 480px;
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let faceDetector: FaceDetector = null;
  let maskRenderer: MaskRenderer = null;

  useEffect(() => {
    maskRenderer = new MaskRenderer(canvasRef.current);
    faceDetector = new FaceDetector(videoRef.current, maskRenderer);
    faceDetector.start();

    return () => {
      maskRenderer.cleanContext();
      maskRenderer = null;
      faceDetector.stop();
      faceDetector = null;
    };
  }, []);

  return (
    <Container>
      <Video autoPlay ref={videoRef} />
      <Video as="canvas" ref={canvasRef} />
    </Container>
  );
};
