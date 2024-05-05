import { Canvas } from "@react-three/fiber";
import { Sphere, MeshWobbleMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Globe = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <MeshWobbleMaterial
          attach="material"
          color="royalblue"
          factor={0.6} // intensity of the wobble
          speed={1} // speed of the wobble
        />
      </Sphere>
    </Canvas>
  );
};

export default Globe;
