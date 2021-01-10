import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import FaceDetector from '@src/FaceDetector';
import MaskRenderer from '@src/MaskRenderer';

const Container = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  border: 1px solid red;
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
  const faceDetector = useRef(null);
  const maskRenderer = useRef(null);

  useEffect(() => {
    maskRenderer.current = new MaskRenderer(canvasRef.current);
    faceDetector.current = new FaceDetector(videoRef.current, maskRenderer.current);
    faceDetector.current.start();

    return () => {
      maskRenderer.current.cleanContext();
      maskRenderer.current = null;
      faceDetector.current.stop();
      faceDetector.current = null;
    };
  }, []);

  return (
    <Container>
      <Video autoPlay ref={videoRef} />
      <Video as="canvas" ref={canvasRef} />
    </Container>
  );
};
