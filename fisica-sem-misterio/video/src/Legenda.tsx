import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Palavra = { t: string; ini: number; fim: number };

// Legenda grande: mostra até 4 palavras por vez, sem misturar frases diferentes;
// a palavra falada agora acende em amarelo.
export const Legenda: React.FC<{ palavras: Palavra[]; cenas: number[] }> = ({ palavras, cenas }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const atual = palavras.findIndex((p, i) => t >= p.ini && (i === palavras.length - 1 || t < palavras[i + 1].ini));
  if (atual < 0) return null;

  const frase = (i: number) => cenas.filter((c) => c <= palavras[i].ini + 0.001).length - 1;
  const f = frase(atual);
  const daFrase = palavras.map((_, i) => i).filter((i) => frase(i) === f);
  const pos = daFrase.indexOf(atual);
  const bloco = daFrase.slice(Math.floor(pos / 4) * 4, Math.floor(pos / 4) * 4 + 4);
  const pop = spring({ frame: frame - Math.round(palavras[bloco[0]].ini * fps), fps, config: { damping: 14 } });

  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 1530, display: "flex", justifyContent: "center" }}>
    <div
      style={{
        maxWidth: 1000, display: "flex", flexWrap: "wrap", background: "rgba(0,0,0,.72)", borderRadius: 28,
        padding: "14px 34px", justifyContent: "center", columnGap: 40, rowGap: 0,
        transform: `scale(${interpolate(pop, [0, 1], [0.9, 1])})`,
      }}
    >
      {bloco.map((i) => {
        const ativa = i === atual;
        return (
          <span
            key={i}
            style={{
              fontFamily: "Segoe UI, Arial, sans-serif", fontWeight: 900, fontSize: 84, lineHeight: 1.15,
              color: ativa ? "#FFD43B" : "#FFFFFF", textTransform: "uppercase",
              WebkitTextStroke: "3px #000", paintOrder: "stroke", textShadow: "0 6px 0 rgba(0,0,0,.55)",
              display: "inline-block", transform: ativa ? "scale(1.05)" : "scale(1)",
            }}
          >
            {palavras[i].t}
          </span>
        );
      })}
    </div>
    </div>
  );
};
