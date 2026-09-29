// "Por que o céu é azul?" com vídeos reais (Pexels, licença livre) e a mesma narração.
// CeuAzulReal = só vídeos reais; CeuAzulMisto = real + a animação que explica o espalhamento.
import React from "react";
import tempos from "../../public/CeuAzul/tempos.json";
import { Cena, Clipe, Short } from "../espaco";
import { Espalha, FINAL, GANCHOS, SONS } from "./CeuAzul";

const C = tempos.cenas;
// nome do arquivo em public/clipes, duração do arquivo (s), segundo de onde começa
const CLIPES: [string, number, number][] = [
  ["sol", 33, 0], ["luz", 31.1, 2], ["terra", 6.4, 0], ["raios", 33, 4], ["pessoa", 6.2, 0], ["por", 22.1, 3],
];

const Cenas: React.FC<{ animarEspalha: boolean }> = ({ animarEspalha }) => (
  <>
    {CLIPES.map(([nome, duracao, desde], i) => (
      <Cena key={nome} ini={C[i]} fim={C[i + 1]} zoom={0.05}>
        {i === 3 && animarEspalha ? <Espalha /> : <Clipe nome={nome} ini={C[i]} fim={C[i + 1]} duracao={duracao} desde={desde} />}
      </Cena>
    ))}
  </>
);

export const CeuAzulReal: React.FC = () => (
  <Short id="CeuAzul" tempos={tempos} ganchos={GANCHOS} sons={SONS} final={FINAL}><Cenas animarEspalha={false} /></Short>
);

export const CeuAzulMisto: React.FC = () => (
  <Short id="CeuAzul" tempos={tempos} ganchos={GANCHOS} sons={SONS} final={FINAL}><Cenas animarEspalha /></Short>
);
