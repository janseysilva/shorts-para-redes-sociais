// Peças reaproveitáveis do canal "Física Sem Mistério" (estilo espaço/cinema).
import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Legenda } from "./Legenda";

export const FONTE = "Segoe UI, Arial, sans-serif";
export const OURO = "#FFC94A";
export const CIANO = "#5CE1FF";
export const AZUL = "#3D8BFF";
export const CLAMP = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

export type Tempos = { palavras: { t: string; ini: number; fim: number }[]; cenas: number[]; total: number };

export const useT = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  return { frame, fps, t: frame / fps, f: (s: number) => Math.round(s * fps), dur: durationInFrames };
};

export const mola = (frame: number, desde: number, fps: number, damping = 14, stiffness = 120) =>
  spring({ frame: frame - Math.round(desde * fps), fps, config: { damping, stiffness } });

/** Números "aleatórios" que são sempre iguais (o vídeo sai igual toda vez). */
export const sorteio = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Opacidade de uma cena que vai de ini até fim, com transição suave. */
export const janela = (t: number, ini: number, fim: number, fade = 0.5) =>
  Math.min(ini <= 0 ? 1 : interpolate(t, [ini, ini + fade], [0, 1], CLAMP), interpolate(t, [fim, fim + fade], [1, 0], CLAMP));

/** Cena com entrada/saída suave e um zoom lento (efeito de câmera de documentário). */
export const Cena: React.FC<{ ini: number; fim: number; zoom?: number; origem?: string; children: React.ReactNode }> = ({
  ini, fim, zoom = 0.06, origem = "540px 950px", children,
}) => {
  const { t } = useT();
  const op = janela(t, ini, fim);
  if (op <= 0) return null;
  const s = 1 + zoom * interpolate(t, [ini, fim + 0.5], [0, 1], CLAMP);
  return <AbsoluteFill style={{ opacity: op, transform: `scale(${s})`, transformOrigin: origem }}>{children}</AbsoluteFill>;
};

// ---------- fundo: espaço com estrelas e nebulosas ----------
const R = sorteio(42);
const ESTRELAS = Array.from({ length: 230 }, () => ({
  x: R() * 1080, y: R() * 1920, s: 1 + R() * 3, f: 0.5 + R() * 2.5, p: R() * 6.28, z: 0.3 + R() * 0.7,
}));

export const Estrelas: React.FC<{ opacidade?: number }> = ({ opacidade = 1 }) => {
  const { t } = useT();
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: opacidade }}>
      {ESTRELAS.map((e, i) => {
        const a = 0.35 + 0.65 * Math.abs(Math.sin(t * e.f + e.p));
        return <circle key={i} cx={e.x} cy={(e.y + t * 10 * e.z) % 1920} r={e.s * e.z} fill="#fff" opacity={a * e.z} />;
      })}
    </svg>
  );
};

export const Fundo: React.FC = () => {
  const { t } = useT();
  const neb: [string, number, number][] = [["#6a3cff", 200, 500], ["#00b3ff", 850, 1350], ["#ff3c8e", 700, 250]];
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, #0d1633 0%, #060914 60%, #020308 100%)", overflow: "hidden" }}>
      {neb.map(([c, x, y], i) => (
        <div key={i} style={{ position: "absolute", width: 820, height: 820, borderRadius: 410, background: c, filter: "blur(150px)", opacity: 0.2,
          left: x - 410 + Math.sin(t * 0.3 + i) * 120, top: y - 410 + Math.cos(t * 0.25 + i * 2) * 160 }} />
      ))}
      <Estrelas />
    </AbsoluteFill>
  );
};

export const Vinheta: React.FC = () => (
  <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.7) 100%)" }} />
);

// ---------- título de cima ----------
export type Gancho = { desde: number; texto: string; destaque: string[] };
export const Ganchos: React.FC<{ lista: Gancho[] }> = ({ lista }) => {
  const { frame, fps, t } = useT();
  const g = [...lista].reverse().find((x) => t >= x.desde) ?? lista[0];
  return (
    <div style={{ position: "absolute", top: 60, left: 0, right: 0, height: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div key={g.texto} style={{ maxWidth: 1000, display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: 22,
        background: "rgba(4,7,20,.62)", border: "2px solid rgba(255,201,74,.35)", borderRadius: 30, padding: "18px 32px",
        boxShadow: "0 0 50px rgba(92,225,255,.15)" }}>
        {g.texto.split(" ").map((p, i) => {
          const s = spring({ frame: frame - Math.round(g.desde * fps) - i * 3, fps, config: { damping: 13, stiffness: 140 } });
          const hl = g.destaque.includes(p);
          return (
            <span key={i} style={{ display: "inline-block", fontFamily: FONTE, fontWeight: 900, fontSize: 78, lineHeight: 1.12,
              color: hl ? "#140d00" : "#fff", background: hl ? OURO : "transparent", borderRadius: 14, padding: hl ? "0 14px" : 0,
              transform: `translateY(${(1 - s) * 40}px) scale(${0.85 + s * 0.15})`, opacity: Math.min(1, s * 1.6),
              filter: `blur(${(1 - Math.min(1, s)) * 8}px)`, textShadow: hl ? "none" : "0 0 24px rgba(92,225,255,.45)" }}>{p}</span>
          );
        })}
      </div>
    </div>
  );
};

// ---------- sons, final e moldura ----------
export type Som = { t: number; som: "whoosh" | "brilho" | "grave"; vol?: number };
export const Trilha: React.FC<{ id: string; sons: Som[] }> = ({ id, sons }) => {
  const { f, dur } = useT();
  return (
    <>
      <Audio src={staticFile(`${id}/narracao.mp3`)} />
      <Audio src={staticFile("musica.wav")} volume={(fr) => interpolate(fr, [0, dur - 30, dur], [0.2, 0.2, 0], CLAMP)} />
      {sons.map((s, i) => (
        <Sequence key={i} from={f(s.t)} durationInFrames={45}>
          <Audio src={staticFile(`${s.som}.wav`)} volume={s.vol ?? 0.5} />
        </Sequence>
      ))}
    </>
  );
};

export const Final: React.FC<{ desde: number; emoji: string; frase: React.ReactNode }> = ({ desde, emoji, frase }) => {
  const { frame, fps, t } = useT();
  if (t < desde) return null;
  const fim = mola(frame, desde, fps, 14);
  return (
    <AbsoluteFill style={{ clipPath: `circle(${interpolate(fim, [0, 1], [0, 1400])}px at 540px 960px)`, background: "#03050c" }}>
      <Fundo />
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center",
        color: "#fff", padding: 80, fontFamily: FONTE }}>
        <div style={{ fontSize: 160, transform: `scale(${fim}) translateY(${Math.sin(t * 2) * 12}px)`, filter: "drop-shadow(0 0 40px rgba(255,201,74,.6))" }}>{emoji}</div>
        <div style={{ fontSize: 84, fontWeight: 900, lineHeight: 1.1, textShadow: "0 0 30px rgba(92,225,255,.5)" }}>{frase}</div>
        <div style={{ fontSize: 58, fontWeight: 800, color: "#140d00", background: OURO, borderRadius: 18, padding: "10px 30px",
          marginTop: 60, transform: `scale(${1 + Math.sin(t * 6) * 0.03})` }}>Salva esse vídeo</div>
        <div style={{ fontSize: 42, color: "#cfe8ff", marginTop: 30 }}>Segue para mais curiosidades da física</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Moldura completa: trilha, fundo, cenas, título, barra de progresso, final e legenda. O final entra na última frase. */
export const Short: React.FC<{
  id: string; tempos: Tempos; ganchos: Gancho[]; sons: Som[]; final: { emoji: string; frase: React.ReactNode }; children: React.ReactNode;
}> = (p) => {
  const { frame, dur } = useT();
  const fim = p.tempos.cenas[p.tempos.cenas.length - 1];
  return (
    <AbsoluteFill style={{ fontFamily: FONTE, overflow: "hidden", background: "#000" }}>
      <Trilha id={p.id} sons={[...p.sons, { t: fim, som: "brilho", vol: 0.6 }]} />
      <Fundo />
      {p.children}
      <Vinheta />
      <Ganchos lista={p.ganchos} />
      <div style={{ position: "absolute", top: 0, left: 0, height: 12, width: `${(frame / dur) * 100}%`,
        background: `linear-gradient(90deg, ${CIANO}, ${OURO})`, boxShadow: `0 0 20px ${CIANO}` }} />
      <Final desde={fim} emoji={p.final.emoji} frase={p.final.frase} />
      <Legenda palavras={p.tempos.palavras} cenas={p.tempos.cenas} />
    </AbsoluteFill>
  );
};

// ---------- objetos do espaço ----------
export const Sol: React.FC<{ x: number; y: number; r: number; cor?: string; brilho?: number }> = ({ x, y, r, cor = "#FFE58A", brilho = 1 }) => {
  const { t } = useT();
  return (
    <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2 }}>
      <div style={{ position: "absolute", inset: -r * 1.2, borderRadius: "50%", opacity: 0.35 * brilho, transform: `rotate(${t * 12}deg)`,
        background: `repeating-conic-gradient(${cor}55 0deg 6deg, transparent 6deg 18deg)`, maskImage: "radial-gradient(circle, #000 30%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(circle, #000 30%, transparent 70%)" }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(circle at 45% 40%, #fffdf0 0%, ${cor} 55%, #ff9a2a 100%)`,
        boxShadow: `0 0 ${80 * brilho}px ${30 * brilho}px ${cor}88, 0 0 ${220 * brilho}px ${60 * brilho}px #ff9a2a44` }} />
    </div>
  );
};

/** Linha de luz com brilho; p = quanto já foi desenhado (0 a 1). */
export const Raio: React.FC<{ x1: number; y1: number; x2: number; y2: number; cor: string; largura?: number; p?: number; opacidade?: number }> = ({
  x1, y1, x2, y2, cor, largura = 12, p = 1, opacidade = 1,
}) => {
  const x = x1 + (x2 - x1) * p, y = y1 + (y2 - y1) * p;
  if (p <= 0) return null;
  return (
    <g opacity={opacidade}>
      <line x1={x1} y1={y1} x2={x} y2={y} stroke={cor} strokeWidth={largura * 3} strokeLinecap="round" opacity={0.25} style={{ filter: "blur(10px)" }} />
      <line x1={x1} y1={y1} x2={x} y2={y} stroke={cor} strokeWidth={largura} strokeLinecap="round" />
      <line x1={x1} y1={y1} x2={x} y2={y} stroke="#fff" strokeWidth={largura * 0.35} strokeLinecap="round" opacity={0.8} />
    </g>
  );
};

/** Vídeo real (arquivo em public/clipes/NOME.mp4) ocupando a tela inteira durante uma cena.
 *  Se o vídeo for mais curto que a cena, ele toca um pouco mais devagar em vez de acabar antes. */
export const Clipe: React.FC<{ nome: string; ini: number; fim: number; duracao: number; desde?: number; escuro?: number }> = ({
  nome, ini, fim, duracao, desde = 0, escuro = 0.1,
}) => {
  const { f } = useT();
  const precisa = fim - ini + 0.8;
  const vel = Math.min(1, (duracao - desde - 0.1) / precisa);
  return (
    <Sequence from={f(ini)}>
      <OffthreadVideo src={staticFile(`clipes/${nome}.mp4`)} muted playbackRate={vel} startFrom={f(desde)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,${escuro}) 25%, rgba(0,0,0,${escuro}) 70%, rgba(0,0,0,.6) 100%)` }} />
    </Sequence>
  );
};

export const Tela: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>{children}</svg>
);
