// Personagens da turminha (desenhados em SVG, estilo "recortado"), reaproveitáveis em todos os esquetes.
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const useT = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  return { frame, fps, t: frame / fps, dur: durationInFrames };
};
export const mola = (frame: number, desde: number, fps: number, damping = 12) =>
  spring({ frame: frame - Math.round(desde * fps), fps, config: { damping, stiffness: 120 } });

export type Olhos = "fechado" | "aberto" | "arregalado" | "rindo";

/** Boca: aberta/fechada em ritmo de fala quando `falando`. */
const Boca: React.FC<{ falando: boolean; t: number; cx: number; cy: number; larg?: number; rindo?: boolean }> = ({ falando, t, cx, cy, larg = 40, rindo }) => {
  if (rindo) return <path d={`M${cx - larg} ${cy - 6} Q${cx} ${cy + larg * 1.2} ${cx + larg} ${cy - 6} Z`} fill="#6b1d1d" />;
  if (!falando) return <path d={`M${cx - larg * 0.6} ${cy} Q${cx} ${cy + 18} ${cx + larg * 0.6} ${cy}`} stroke="#6b1d1d" strokeWidth={7} fill="none" strokeLinecap="round" />;
  const a = 6 + Math.abs(Math.sin(t * 17)) * 26;
  return <ellipse cx={cx} cy={cy + 6} rx={larg * 0.55} ry={a} fill="#6b1d1d" />;
};

const Olho: React.FC<{ x: number; y: number; tipo: Olhos; olharX?: number }> = ({ x, y, tipo, olharX = 0 }) => {
  if (tipo === "fechado") return <path d={`M${x - 20} ${y} Q${x} ${y + 14} ${x + 20} ${y}`} stroke="#222" strokeWidth={7} fill="none" strokeLinecap="round" />;
  if (tipo === "rindo") return <path d={`M${x - 20} ${y + 6} Q${x} ${y - 16} ${x + 20} ${y + 6}`} stroke="#222" strokeWidth={7} fill="none" strokeLinecap="round" />;
  const r = tipo === "arregalado" ? 32 : 24;
  return (
    <g>
      <ellipse cx={x} cy={y} rx={r} ry={r * 1.15} fill="#fff" stroke="#222" strokeWidth={4} />
      <circle cx={x + olharX * 8} cy={y + 2} r={tipo === "arregalado" ? 9 : 12} fill="#222" />
      <circle cx={x + olharX * 8 + 4} cy={y - 3} r={4} fill="#fff" />
    </g>
  );
};

/** Léo: menino de cabelo castanho e camiseta vermelha. (x,y) = centro da cabeça. */
export const Leo: React.FC<{ x: number; y: number; esc?: number; rot?: number; olhos: Olhos; falando: boolean; corpo?: boolean;
  bracos?: "baixo" | "cima" | "abertos"; olharX?: number }> = ({ x, y, esc = 1, rot = 0, olhos, falando, corpo = true, bracos = "baixo", olharX = 0 }) => {
  const { t } = useT();
  const piscar = olhos === "aberto" && Math.floor(t * 10) % 37 === 0;
  const o: Olhos = piscar ? "fechado" : olhos;
  const braco = (lado: 1 | -1) => {
    const bx = 150 + lado * 95;
    const fim = bracos === "cima" ? [bx + lado * 30, 60] : bracos === "abertos" ? [bx + lado * 110, 250] : [bx + lado * 20, 420];
    return <path d={`M${bx} 330 Q${bx + lado * 40} ${(330 + fim[1]) / 2} ${fim[0]} ${fim[1]}`} stroke="#e53935" strokeWidth={46} fill="none" strokeLinecap="round" />;
  };
  return (
    <svg width={300} height={520} viewBox="0 0 300 520" style={{ position: "absolute", left: x - 150 * esc, top: y - 150 * esc, width: 300 * esc, height: 520 * esc,
      transform: `rotate(${rot}deg)`, transformOrigin: "50% 29%", overflow: "visible" }}>
      {corpo && (<>
        {braco(1)}{braco(-1)}
        <rect x={60} y={250} width={180} height={230} rx={60} fill="#e53935" />
        <circle cx={150} cy={330} r={22} fill="#ffd54f" />
      </>)}
      <circle cx={42} cy={150} r={24} fill="#f1c27d" />
      <circle cx={258} cy={150} r={24} fill="#f1c27d" />
      <circle cx={150} cy={150} r={112} fill="#f1c27d" />
      <path d="M40 130 Q50 30 150 36 Q250 30 262 130 Q230 80 200 96 Q180 60 150 90 Q120 58 100 96 Q70 76 40 130 Z" fill="#5d3a1a" />
      <path d="M140 38 Q150 0 172 12 Q160 22 162 40 Z" fill="#5d3a1a" />
      <Olho x={105} y={150} tipo={o} olharX={olharX} />
      <Olho x={195} y={150} tipo={o} olharX={olharX} />
      <circle cx={80} cy={195} r={16} fill="#ff8a80" opacity={0.6} />
      <circle cx={220} cy={195} r={16} fill="#ff8a80" opacity={0.6} />
      <Boca falando={falando} t={t} cx={150} cy={215} />
    </svg>
  );
};

/** Pipoca: cachorrinho caramelo. (x,y) = centro da cabeça. */
export const Pipoca: React.FC<{ x: number; y: number; esc?: number; rindo?: boolean; falando?: boolean; olharX?: number }> = ({ x, y, esc = 1, rindo, falando, olharX = 0 }) => {
  const { t } = useT();
  const pulo = rindo ? Math.abs(Math.sin(t * 9)) * 30 : 0;
  const rabo = Math.sin(t * (rindo ? 16 : 7)) * 25;
  return (
    <svg width={300} height={340} viewBox="0 0 300 340" style={{ position: "absolute", left: x - 150 * esc, top: y - 110 * esc - pulo, width: 300 * esc, height: 340 * esc, overflow: "visible" }}>
      <path d={`M225 250 Q${275 + rabo} 200 ${262 + rabo} 170`} stroke="#c68642" strokeWidth={22} fill="none" strokeLinecap="round" />
      <ellipse cx={150} cy={260} rx={95} ry={70} fill="#d9a066" />
      <ellipse cx={105} cy={320} rx={28} ry={18} fill="#c68642" />
      <ellipse cx={195} cy={320} rx={28} ry={18} fill="#c68642" />
      <ellipse cx={150} cy={265} rx={48} ry={45} fill="#f3d9b1" />
      <ellipse cx={62} cy={120} rx={36} ry={70} fill="#8d5524" transform="rotate(20 62 120)" />
      <ellipse cx={238} cy={120} rx={36} ry={70} fill="#8d5524" transform="rotate(-20 238 120)" />
      <circle cx={150} cy={110} r={92} fill="#d9a066" />
      <ellipse cx={150} cy={150} rx={52} ry={40} fill="#f3d9b1" />
      <ellipse cx={150} cy={128} rx={20} ry={14} fill="#222" />
      <Olho x={112} y={88} tipo={rindo ? "rindo" : "aberto"} olharX={olharX} />
      <Olho x={188} y={88} tipo={rindo ? "rindo" : "aberto"} olharX={olharX} />
      <Boca falando={!!falando} t={t} cx={150} cy={160} larg={28} rindo={rindo} />
    </svg>
  );
};

/** Balão de fala com o nome de quem fala; a ponta aponta para (px, py). */
export const Balao: React.FC<{ texto: string; nome: string; cor: string; x: number; y: number; larg?: number; desde: number; ponta?: "esq" | "dir" | "baixo" }> = ({
  texto, nome, cor, x, y, larg = 620, desde, ponta = "baixo",
}) => {
  const { frame, fps } = useT();
  const s = mola(frame, desde, fps, 11);
  const pontaEst: React.CSSProperties = ponta === "baixo" ? { left: larg / 2 - 30, bottom: -38, borderWidth: "40px 30px 0 30px", borderColor: "#fff transparent transparent transparent" }
    : ponta === "esq" ? { left: -40, top: 60, borderWidth: "24px 44px 24px 0", borderColor: "transparent #fff transparent transparent" }
    : { right: -40, top: 60, borderWidth: "24px 0 24px 44px", borderColor: "transparent transparent transparent #fff" };
  return (
    <div style={{ position: "absolute", left: x, top: y, width: larg, transform: `scale(${s})`, transformOrigin: "50% 100%", zIndex: 20 }}>
      <div style={{ position: "relative", background: "#fff", borderRadius: 40, padding: "22px 30px", boxShadow: "0 10px 0 rgba(0,0,0,.18)", border: "5px solid #222" }}>
        <div style={{ position: "absolute", top: -34, left: 26, background: cor, color: "#fff", fontWeight: 900, fontSize: 34, padding: "4px 20px", borderRadius: 20, border: "4px solid #222" }}>{nome}</div>
        <div style={{ fontSize: 50, fontWeight: 900, color: "#222", lineHeight: 1.15, fontFamily: "Segoe UI, Arial Rounded MT Bold, Arial, sans-serif" }}>{texto}</div>
        <div style={{ position: "absolute", width: 0, height: 0, borderStyle: "solid", ...pontaEst }} />
      </div>
    </div>
  );
};
