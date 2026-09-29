import React from "react";
import { Composition } from "remotion";
import { CeuAzul } from "./shorts/CeuAzul";
import { CeuAzulMisto, CeuAzulReal } from "./shorts/CeuAzulReal";
import { ShortRoteiro, type Roteiro } from "./ShortRoteiro";
import type { Tempos } from "./espaco";
import tCeuAzul from "../public/CeuAzul/tempos.json";

import rTrovao from "../roteiros/Trovao.json";
import tTrovao from "../public/Trovao/tempos.json";
import rGelo from "../roteiros/Gelo.json";
import tGelo from "../public/Gelo/tempos.json";
import rAstronautas from "../roteiros/Astronautas.json";
import tAstronautas from "../public/Astronautas/tempos.json";
import rArcoIris from "../roteiros/ArcoIris.json";
import tArcoIris from "../public/ArcoIris/tempos.json";
import rLua from "../roteiros/Lua.json";
import tLua from "../public/Lua/tempos.json";
import rMicroOndas from "../roteiros/MicroOndas.json";
import tMicroOndas from "../public/MicroOndas/tempos.json";
import rMetalGelado from "../roteiros/MetalGelado.json";
import tMetalGelado from "../public/MetalGelado/tempos.json";
import rAviao from "../roteiros/Aviao.json";
import tAviao from "../public/Aviao/tempos.json";
import rPanelaPressao from "../roteiros/PanelaPressao.json";
import tPanelaPressao from "../public/PanelaPressao/tempos.json";
import rSomEspaco from "../roteiros/SomEspaco.json";
import tSomEspaco from "../public/SomEspaco/tempos.json";
import rEstrelas from "../roteiros/Estrelas.json";
import tEstrelas from "../public/Estrelas/tempos.json";
import rColher from "../roteiros/Colher.json";
import tColher from "../public/Colher/tempos.json";
import rInercia from "../roteiros/Inercia.json";
import tInercia from "../public/Inercia/tempos.json";
import rMarSalgado from "../roteiros/MarSalgado.json";
import tMarSalgado from "../public/MarSalgado/tempos.json";

export const FPS = 30;

// Shorts feitos a partir do roteiro (estilo misto). A ordem aqui é a ordem de publicação (2 a 15; o 1 é o CeuAzulMisto).
const ROTEIROS: [Roteiro, Tempos][] = [
  [rTrovao, tTrovao], [rGelo, tGelo], [rAstronautas, tAstronautas], [rArcoIris, tArcoIris], [rLua, tLua],
  [rMicroOndas, tMicroOndas], [rMetalGelado, tMetalGelado], [rAviao, tAviao], [rPanelaPressao, tPanelaPressao],
  [rSomEspaco, tSomEspaco], [rEstrelas, tEstrelas], [rColher, tColher], [rInercia, tInercia], [rMarSalgado, tMarSalgado],
];

const Comp: React.FC<{ id: string; comp: React.FC; total: number }> = ({ id, comp, total }) => (
  <Composition id={id} component={comp} durationInFrames={Math.ceil(total * FPS)} fps={FPS} width={1080} height={1920} />
);

export const Root: React.FC = () => (
  <>
    <Comp id="CeuAzul" comp={CeuAzul} total={tCeuAzul.total} />
    <Comp id="CeuAzulReal" comp={CeuAzulReal} total={tCeuAzul.total} />
    <Comp id="CeuAzulMisto" comp={CeuAzulMisto} total={tCeuAzul.total} />
    {ROTEIROS.map(([r, t]) => (
      <Composition key={r.id} id={r.id} component={ShortRoteiro} defaultProps={{ roteiro: r, tempos: t }}
        durationInFrames={Math.ceil(t.total * FPS)} fps={FPS} width={1080} height={1920} />
    ))}
  </>
);
