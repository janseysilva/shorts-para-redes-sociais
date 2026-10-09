// Short montado direto do roteiro (roteiros/ID.json): cada cena é um vídeo real (public/clipes/ID_i.mp4)
// ou uma animação simples (emoji grande + texto) no fundo de espaço. Estilo "misto" aprovado por Jansey em 29/09.
import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, staticFile } from "remotion";
import { CLAMP, Cena, Clipe, FONTE, OURO, Short, mola, useT, type Tempos } from "./espaco";
import duracoes from "../public/clipes/duracoes.json";

export type CenaRoteiro = { gancho: string; destaque: string[]; busca?: string; foto?: string; anim?: { emoji: string; texto: string } };

// Foto real (public/fotos_short/NOME.jpg, na altura da tela): a câmera passeia pela foto inteira durante a cena.
const FotoShort: React.FC<{ nome: string; ini: number; fim: number }> = ({ nome, ini, fim }) => {
  const { t, f } = useT();
  const p = interpolate(t, [ini, fim + 0.5], [0, 1], CLAMP);
  return (
    <Sequence from={f(ini)}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img src={staticFile(`fotos_short/${nome}.jpg`)} style={{ position: "absolute", height: 1920, left: "50%",
          transform: `translateX(calc(-50% + ${(0.5 - p) * 2} * (50% - 540px)))` }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.1) 25%, rgba(0,0,0,.1) 70%, rgba(0,0,0,.6) 100%)" }} />
    </Sequence>
  );
};
export type Roteiro = { id: string; cenas: CenaRoteiro[]; final: { emoji: string; frase: string } };

const Animacao: React.FC<{ emoji: string; texto: string; ini: number }> = ({ emoji, texto, ini }) => {
  const { frame, fps, t } = useT();
  const e = mola(frame, ini + 0.1, fps, 11);
  const txt = mola(frame, ini + 0.45, fps, 14);
  return (
    <>
      {[0, 1, 2].map((i) => {
        const fase = ((t - ini) * 0.6 + i / 3) % 1;
        return (
          <div key={i} style={{ position: "absolute", left: 540 - 180, top: 800 - 180, width: 360, height: 360, borderRadius: 180,
            border: `4px solid ${OURO}`, opacity: (1 - fase) * 0.5 * e, transform: `scale(${0.8 + fase * 1.6})` }} />
        );
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 800 - 170, textAlign: "center", fontSize: 280, lineHeight: 1.2,
        transform: `scale(${e}) translateY(${Math.sin((t - ini) * 2) * 14}px)`, filter: "drop-shadow(0 0 50px rgba(255,201,74,.55))" }}>{emoji}</div>
      <div style={{ position: "absolute", left: 60, right: 60, top: 1110, textAlign: "center", fontFamily: FONTE, fontWeight: 900,
        fontSize: texto.length > 22 ? 70 : 88, lineHeight: 1.1, color: "#fff", opacity: interpolate(txt, [0, 1], [0, 1], CLAMP),
        transform: `translateY(${(1 - txt) * 40}px)`, textShadow: "0 0 30px rgba(92,225,255,.6), 0 6px 0 rgba(0,0,0,.5)" }}>{texto}</div>
    </>
  );
};

const DUR = duracoes as Record<string, number>;

export const ShortRoteiro: React.FC<{ roteiro: Roteiro; tempos: Tempos }> = ({ roteiro, tempos }) => {
  const C = tempos.cenas;
  const ganchos = roteiro.cenas.map((c, i) => ({ desde: i === 0 ? 0 : C[i], texto: c.gancho, destaque: c.destaque }));
  return (
    <Short id={roteiro.id} tempos={tempos} ganchos={ganchos} sons={[]} final={roteiro.final}>
      {roteiro.cenas.map((c, i) => {
        const nome = `${roteiro.id}_${i}`;
        return (
          <Cena key={i} ini={i === 0 ? 0 : C[i]} fim={C[i + 1]} zoom={c.anim ? 0.03 : 0.05}>
            {c.anim ? <Animacao emoji={c.anim.emoji} texto={c.anim.texto} ini={C[i]} />
              : c.foto ? <FotoShort nome={c.foto} ini={i === 0 ? 0 : C[i]} fim={C[i + 1]} />
              : <Clipe nome={nome} ini={i === 0 ? 0 : C[i]} fim={C[i + 1]} duracao={DUR[nome] ?? 10} desde={DUR[nome] > 12 ? 1 : 0} />}
          </Cena>
        );
      })}
    </Short>
  );
};
