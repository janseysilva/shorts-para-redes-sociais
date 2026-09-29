import React from "react";
import { interpolate } from "remotion";
import tempos from "../../public/ModoEscuro/tempos.json";
import { Dedo, Short, mola, tela, useT } from "../kit";
import { ListaConversas, PainelRapido, posTile } from "../telas";

const C = tempos.cenas;
const T_PUXA = C[1] + 0.3, T_SOLTA = C[1] + 1.2, T_LIGA = C[2] + 0.6, T_SOBE = C[3] + 0.2;
const TILES = [{ e: "📶", n: "Wi-Fi", on: true }, { e: "🔵", n: "Bluetooth" }, { e: "🔦", n: "Lanterna" },
  { e: "🌙", n: "Tema escuro" }, { e: "✈️", n: "Modo avião" }, { e: "🔕", n: "Não perturbe" }];

const Tela: React.FC = () => {
  const { frame, fps, t } = useT();
  const desce = t < T_PUXA ? 0 : t < T_SOBE ? interpolate(t, [T_PUXA, T_SOLTA], [0, 1], { extrapolateRight: "clamp" })
    : 1 - interpolate(t, [T_SOBE, T_SOBE + 0.5], [0, 1], { extrapolateRight: "clamp" });
  const raio = t >= T_LIGA ? interpolate(mola(frame, T_LIGA, fps, 20), [0, 1], [0, 1400]) : 0;
  const tile = posTile(3);
  const brilhoBranco = t < C[1] ? 0.35 + Math.sin(t * 6) * 0.1 : 0;
  return (
    <>
      <ListaConversas />
      <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: brilhoBranco }} />
      {/* versão escura aparece num círculo que cresce a partir do botão */}
      <div style={{ position: "absolute", inset: 0, clipPath: `circle(${raio}px at ${tile.x}px ${tile.y}px)`,
        filter: "invert(0.92) hue-rotate(180deg)", background: "#fff" }}>
        <ListaConversas />
      </div>
      <PainelRapido desce={desce} tiles={TILES} ligado={t >= T_LIGA ? 3 : -1} />
    </>
  );
};

const tl = tela(posTile(3).x, posTile(3).y);
export const ModoEscuro: React.FC = () => (
  <Short
    id="ModoEscuro" tempos={tempos}
    ganchos={[
      { desde: 0, texto: "Tela branca à noite? 😵", destaque: ["branca"] },
      { desde: C[1], texto: "Ative o tema escuro", destaque: ["escuro"] },
      { desde: C[4], texto: "E ainda economiza bateria", destaque: ["bateria"] },
    ]}
    cam={[{ t: 0, s: 1, x: 540, y: 920 }, { t: C[2] - 0.1, s: 1, x: 540, y: 920 }, { t: C[2] + 0.5, s: 1.5, x: tl.x - 60, y: tl.y + 120 },
      { t: C[3] + 0.1, s: 1.5, x: tl.x - 60, y: tl.y + 120 }, { t: C[3] + 0.7, s: 1, x: 540, y: 920 }]}
    sobre={<Dedo some={T_LIGA + 0.4} passos={[
      { t: T_PUXA, x: tela(295, 30).x, y: tela(295, 30).y },
      { t: T_SOLTA, x: tela(295, 700).x, y: tela(295, 700).y, acao: "arrasta" },
      { t: T_LIGA, x: tl.x, y: tl.y, acao: "toque" },
    ]} />}
    sons={[{ t: T_PUXA, som: "whoosh", vol: 0.6 }, { t: T_LIGA, som: "clique" }, { t: T_LIGA + 0.1, som: "whoosh", vol: 0.5 }, { t: T_SOBE, som: "whoosh", vol: 0.4 }]}
    tela={<Tela />}
    final={{ emoji: "🌙", frase: <>Descanso<br />para a vista.</> }}
  />
);
