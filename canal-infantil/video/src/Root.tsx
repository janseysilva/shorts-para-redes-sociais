import React from "react";
import { Composition } from "remotion";
import { Ep1 } from "./Ep1";
import t1 from "../public/ep1/tempos.json";

export const FPS = 30;

export const Root: React.FC = () => (
  <>
    <Composition id="Ep1" component={Ep1} durationInFrames={Math.ceil(t1.total * FPS)} fps={FPS} width={1080} height={1920} />
  </>
);
