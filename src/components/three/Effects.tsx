import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { Vector2 } from "three";

export default function Effects() {
  return (
    <EffectComposer disableNormalPass>
      <Bloom
        mipmapBlur
        luminanceThreshold={0.9}
        luminanceSmoothing={0.025}
        intensity={1.2}
        radius={0.4}
      />
      <ChromaticAberration offset={new Vector2(0.0003, 0.0003)} />
      <Vignette offset={0.3} darkness={0.7} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
