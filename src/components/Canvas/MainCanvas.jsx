import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import ResponsiveCanvas from "./ResponsiveCanvas";
import MainScene from "@components/MainScene";
import Lights from "@components/Lights";
import NavBar from "@components/NavBar";

const MainCanvas = () => {
  const [section, setSection] = useState(0);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <div className="w-screen h-screen">
      <Canvas
        gl={{ antialias: true }}
        shadows={"soft"}
        camera={{
          fov: 60,
          near: 0.1,
          far: 1000,
          position: [2.17, 2.96, 1.94],
          rotation: [-0.3, 0.78, 0.24],
        }}
      >
        <Lights />
        <ResponsiveCanvas />
        <MainScene section={section} setSection={setSection} />
      </Canvas>
      <NavBar
        onSectionChange={setSection}
        isMenuOpened={isMenuOpened}
        setIsMenuOpened={setIsMenuOpened}
      />
    </div>
  );
};

export default MainCanvas;
