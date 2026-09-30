// Esquete de teste: "Só mais 5 minutinhos" (Léo e o cachorro Pipoca).
import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, interpolateColors, staticFile } from "remotion";
import tempos from "../public/ep1/tempos.json";
import { Balao, Leo, Pipoca, mola, useT } from "./personagens";

const F = tempos.falas;
const CL = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const LAPSO_INI = F[1].fim + 0.1, LAPSO_FIM = F[2].ini;          // "5 minutinhos depois..."
const ACORDA = F[2].ini, SUSTO = F[2].ini + (F[2].fim - F[2].ini) * 0.58, FIM = F[5].fim + 0.3;
const falando = (quem: string, t: number) => F.some((f) => f.quem === quem && t >= f.ini && t <= f.fim);
const noite = (t: number) => interpolate(t, [LAPSO_INI, LAPSO_FIM - 0.3], [0, 1], CL);

const Quarto: React.FC = () => {
  const { t } = useT();
  const n = noite(t);
  const ceu = interpolateColors(n, [0, 0.45, 1], ["#7ec8ff", "#ff9e5e", "#1a1f4d"]);
  const parede = interpolateColors(n, [0, 0.5, 1], ["#ffe3b8", "#f7b98f", "#6a6fae"]);
  const solX = interpolate(n, [0, 0.6], [680, 900], CL), solY = interpolate(n, [0, 0.6], [380, 690], CL);
  const giro = interpolate(t, [LAPSO_INI, LAPSO_FIM], [0, 360 * 9], CL);
  return (
    <AbsoluteFill style={{ background: parede }}>
      {/* janela */}
      <div style={{ position: "absolute", left: 600, top: 280, width: 360, height: 360, background: ceu, border: "18px solid #fff", borderRadius: 18, overflow: "hidden",
        boxShadow: "inset 0 0 0 6px #d7ccc8, 0 8px 0 rgba(0,0,0,.15)" }}>
        <div style={{ position: "absolute", left: solX - 600 - 60, top: solY - 280 - 60, width: 120, height: 120, borderRadius: 60, background: "#ffd54f", boxShadow: "0 0 40px #ffeb3b" }} />
        {n > 0.7 && <>
          <div style={{ position: "absolute", left: 60, top: 50, width: 90, height: 90, borderRadius: 45, background: "#fff9c4", boxShadow: "0 0 30px #fff9c4", opacity: (n - 0.7) / 0.3 }} />
          {[[200, 70], [260, 150], [120, 190], [230, 240], [40, 250]].map(([x, y], i) => (
            <div key={i} style={{ position: "absolute", left: x, top: y, fontSize: 30, color: "#fff9c4", opacity: ((n - 0.7) / 0.3) * (0.6 + 0.4 * Math.sin(t * 5 + i)) }}>★</div>
          ))}
        </>}
        <div style={{ position: "absolute", left: 0, right: 0, top: 157, height: 10, background: "#fff" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 157, width: 10, background: "#fff" }} />
      </div>
      {/* relógio */}
      <div style={{ position: "absolute", left: 140, top: 330, width: 180, height: 180, borderRadius: 90, background: "#fff", border: "10px solid #ff7043" }}>
        <div style={{ position: "absolute", left: 85, top: 30, width: 10, height: 60, background: "#222", borderRadius: 5, transformOrigin: "5px 60px", transform: `rotate(${giro}deg)` }} />
        <div style={{ position: "absolute", left: 86, top: 50, width: 8, height: 40, background: "#e53935", borderRadius: 4, transformOrigin: "4px 40px", transform: `rotate(${giro / 12 + 240}deg)` }} />
        <div style={{ position: "absolute", left: 80, top: 80, width: 20, height: 20, borderRadius: 10, background: "#222" }} />
      </div>
      {/* porta */}
      <div style={{ position: "absolute", left: 20, top: 760, width: 230, height: 700, background: "#a1673f", border: "10px solid #7b4a2a", borderRadius: "14px 14px 0 0" }}>
        <div style={{ position: "absolute", right: 22, top: 330, width: 30, height: 30, borderRadius: 15, background: "#ffd54f" }} />
      </div>
      {/* chão */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1450, bottom: 0, background: "repeating-linear-gradient(90deg,#b07a4f 0 120px,#a36e45 120px 124px)" }} />
      {/* luz da noite */}
      <AbsoluteFill style={{ background: "rgba(10,10,60,1)", opacity: n * 0.25 }} />
    </AbsoluteFill>
  );
};

const Cama: React.FC<{ frente: boolean }> = ({ frente }) => frente ? (
  <div style={{ position: "absolute", left: 300, top: 1150, width: 720, height: 250, background: "repeating-linear-gradient(45deg,#42a5f5 0 40px,#64b5f6 40px 80px)",
    borderRadius: "60px 60px 20px 20px", border: "8px solid #1e63b5", zIndex: 5 }} />
) : (
  <>
    <div style={{ position: "absolute", left: 280, top: 900, width: 60, height: 560, background: "#8d5524", borderRadius: 20 }} />
    <div style={{ position: "absolute", left: 300, top: 1300, width: 720, height: 150, background: "#8d5524", borderRadius: 16 }} />
    <div style={{ position: "absolute", left: 330, top: 1020, width: 250, height: 130, background: "#fff", borderRadius: 60, border: "6px solid #ddd" }} />
  </>
);

const Cena: React.FC = () => {
  const { frame, fps, t } = useT();
  const sobe = mola(frame, ACORDA, fps, 13);
  const acordado = t >= ACORDA;
  const hx = interpolate(sobe, [0, 1], [455, 560]), hy = interpolate(sobe, [0, 1], [1075, 880]), rot = interpolate(sobe, [0, 1], [-72, 0]);
  const olhos = !acordado ? "fechado" : t >= SUSTO ? "arregalado" : "aberto";
  const bracos = t >= F[4].ini ? "abertos" : acordado && t < ACORDA + 2.2 ? "cima" : "baixo";
  const zoom = interpolate(t, [SUSTO - 0.2, SUSTO + 0.3, F[3].ini, F[3].ini + 0.4], [1, 1.25, 1.25, 1], CL);
  const tremor = t > SUSTO && t < SUSTO + 0.4 ? Math.sin(t * 90) * 8 : 0;
  const pipocaRi = t >= F[5].ini - 0.1 && t < FIM;
  const zs = !acordado && !falando("leo", t);
  return (
    <AbsoluteFill style={{ transform: `translateX(${tremor}px) scale(${zoom})`, transformOrigin: "560px 900px" }}>
      <Quarto />
      <Cama frente={false} />
      <Leo x={hx} y={hy} rot={rot} esc={1} olhos={olhos} falando={falando("leo", t)} corpo={acordado} bracos={bracos} olharX={t >= SUSTO - 0.5 && t < F[3].ini ? 1 : 0} />
      <Cama frente />
      {zs && [0, 1, 2].map((i) => {
        const f = ((t * 0.6 + i / 3) % 1);
        return <div key={i} style={{ position: "absolute", left: 540 + f * 120, top: 980 - f * 220, fontSize: 60 + f * 40, fontWeight: 900, color: "#1e63b5", opacity: 1 - f, zIndex: 6 }}>Z</div>;
      })}
      {t >= SUSTO && t < F[3].ini && (
        <div style={{ position: "absolute", left: 700, top: 650, fontSize: 150, fontWeight: 900, color: "#e53935", WebkitTextStroke: "6px #fff", paintOrder: "stroke",
          transform: `scale(${mola(frame, SUSTO, fps, 8)}) rotate(12deg)`, zIndex: 9 }}>!?</div>
      )}
      {/* Pipoca e o balde de pipoca */}
      <div style={{ position: "absolute", left: 640, top: 1560, width: 110, height: 130, background: "repeating-linear-gradient(90deg,#e53935 0 22px,#fff 22px 44px)",
        clipPath: "polygon(0 0,100% 0,85% 100%,15% 100%)", zIndex: 7 }} />
      {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ position: "absolute", left: 650 + i * 18, top: 1535 + (i % 2) * 10, width: 30, height: 30, borderRadius: 15, background: "#fff8e1", zIndex: 7 }} />)}
      {t > LAPSO_INI && t < LAPSO_FIM && [0, 1, 2].map((i) => {
        const f = ((t * 1.5 + i / 3) % 1);
        return <div key={i} style={{ position: "absolute", left: 690 + Math.sin(i * 2) * 30 + f * 90, top: 1540 - Math.sin(f * Math.PI) * 170, width: 26, height: 26, borderRadius: 13, background: "#fff8e1", zIndex: 8 }} />;
      })}
      <Pipoca x={880} y={1590} esc={0.95} rindo={pipocaRi} olharX={t > LAPSO_INI && t < LAPSO_FIM ? -1 : 0} />
    </AbsoluteFill>
  );
};

const Baloes: React.FC = () => {
  const { t } = useT();
  const leoDeitado = (i: number) => t < ACORDA ? { x: 250, y: 760 } : i === 4 ? { x: 230, y: 470 } : { x: 230, y: 470 };
  return (
    <>
      {F.map((f, i) => {
        if (t < f.ini || t > f.fim + 0.5) return null;
        if (f.quem === "mae") return <Balao key={i} texto={f.texto} nome="Mãe" cor="#8e24aa" x={40} y={470} larg={640} desde={f.ini} />;
        if (f.quem === "pipoca") return <Balao key={i} texto={f.texto} nome="Pipoca" cor="#c68642" x={330} y={1300} larg={420} desde={f.ini} ponta="dir" />;
        const p = leoDeitado(i);
        return <Balao key={i} texto={f.texto} nome="Léo" cor="#e53935" x={p.x} y={p.y} larg={620} desde={f.ini} />;
      })}
    </>
  );
};

const Legendas: React.FC = () => {
  const { frame, fps, t } = useT();
  const topo = t < 3.2 ? "Só mais 5 minutinhos 😴" : null;
  const lapso = t > LAPSO_INI && t < LAPSO_FIM;
  return (
    <>
      {topo && (
        <div style={{ position: "absolute", top: 70, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 30 }}>
          <div style={{ background: "#ffeb3b", border: "6px solid #222", borderRadius: 30, padding: "14px 34px", fontSize: 62, fontWeight: 900, color: "#222",
            transform: `rotate(-3deg) scale(${mola(frame, 0, fps, 9)})`, boxShadow: "0 8px 0 rgba(0,0,0,.25)" }}>{topo}</div>
        </div>
      )}
      {lapso && (
        <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", zIndex: 30 }}>
          <div style={{ background: "#fff", border: "8px solid #222", borderRadius: 26, padding: "20px 40px", fontSize: 76, fontWeight: 900, color: "#222", transform: `rotate(2deg) scale(${mola(frame, LAPSO_INI, fps, 9)})`,
            fontFamily: "Comic Sans MS, Segoe UI, sans-serif", boxShadow: "0 10px 0 rgba(0,0,0,.25)" }}>5 minutinhos depois...</div>
        </AbsoluteFill>
      )}
    </>
  );
};

const Final: React.FC = () => {
  const { frame, fps, t } = useT();
  if (t < FIM) return null;
  const s = mola(frame, FIM, fps, 12);
  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, #ffeb3b, #ff9800 70%)", clipPath: `circle(${s * 1400}px at 540px 960px)`, zIndex: 50,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", fontFamily: "Segoe UI, sans-serif" }}>
      <div style={{ position: "relative", width: 700, height: 420 }}>
        <Leo x={230} y={200} esc={0.8} olhos="rindo" falando={false} corpo={false} />
        <Pipoca x={490} y={230} esc={0.75} rindo />
      </div>
      <div style={{ fontSize: 96, fontWeight: 900, color: "#222", transform: `scale(${1 + Math.sin(t * 6) * 0.04})` }}>Curtiu? 😄</div>
      <div style={{ fontSize: 54, fontWeight: 800, color: "#fff", background: "#e53935", border: "6px solid #222", borderRadius: 24, padding: "12px 34px", marginTop: 30 }}>Segue pra mais historinhas!</div>
    </AbsoluteFill>
  );
};

export const Ep1: React.FC = () => {
  const { fps, dur } = useT();
  const s = (t: number) => Math.round(t * fps);
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <Audio src={staticFile("ep1/falas.wav")} />
      <Audio src={staticFile("musica.wav")} loop volume={(fr) => interpolate(fr, [0, dur - 30, dur], [0.1, 0.1, 0], CL)} />
      {[[LAPSO_INI, "whoosh"], [ACORDA, "pop"], [SUSTO, "ding"], [F[5].ini, "pop"], [FIM, "ding"]].map(([t, som], i) => (
        <Sequence key={i} from={s(t as number)} durationInFrames={40}><Audio src={staticFile(`${som}.wav`)} volume={0.6} /></Sequence>
      ))}
      <Cena />
      <Baloes />
      <Legendas />
      <Final />
    </AbsoluteFill>
  );
};
