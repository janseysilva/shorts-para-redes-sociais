// Peças reaproveitáveis dos shorts do canal "Truques de Celular" (estilo aprovado em 29/09).
import React from "react";
import {
  AbsoluteFill, Audio, Easing, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import { Legenda } from "./Legenda";

export const FONTE = "Segoe UI, Arial, sans-serif";
export const VERDE = "#25D366";
export const AMARELO = "#FFD43B";
export const TELA = { x: 245, y: 360, w: 590, h: 1120 }; // tela do celular no "mundo"
export const tela = (x: number, y: number) => ({ x: TELA.x + x, y: TELA.y + y }); // ponto da tela → mundo

export type Tempos = { palavras: { t: string; ini: number; fim: number }[]; cenas: number[]; total: number };

export const useT = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  return { frame, fps, t: frame / fps, f: (s: number) => Math.round(s * fps), dur: durationInFrames };
};

export const mola = (frame: number, desde: number, fps: number, damping = 14, stiffness = 120) =>
  spring({ frame: frame - Math.round(desde * fps), fps, config: { damping, stiffness } });

// ---------- câmera ----------
export type Cam = { t: number; s: number; x: number; y: number };
export const CENTRO: Omit<Cam, "t"> = { s: 1, x: 540, y: 920 };
export const camera = (t: number, keys: Cam[]) => {
  const ts = keys.map((k) => k.t);
  const o = { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  if (keys.length < 2) return keys[0];
  return { t, s: interpolate(t, ts, keys.map((k) => k.s), o), x: interpolate(t, ts, keys.map((k) => k.x), o), y: interpolate(t, ts, keys.map((k) => k.y), o) };
};
/** Monta a câmera: parado → zoom em (x,y) entre ini e fim → volta. */
export const zoomEm = (ini: number, fim: number, x: number, y: number, s = 1.7): Cam[] => [
  { t: ini - 0.05, ...CENTRO }, { t: ini + 0.6, s, x, y }, { t: fim, s, x, y }, { t: fim + 0.6, ...CENTRO },
];

// ---------- fundo ----------
export const Fundo: React.FC = () => {
  const { t } = useT();
  const icones = ["💬", "📱", "🔔", "✨", "📶", "🔋"];
  return (
    <AbsoluteFill style={{ background: "linear-gradient(160deg, #0b3d33 0%, #0d1512 55%, #1b1230 100%)", overflow: "hidden" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", width: 700, height: 700, borderRadius: 350, filter: "blur(90px)", opacity: 0.35,
          background: ["#25D366", "#7C4DFF", "#FF7043"][i],
          left: 190 + Math.sin(t * 0.6 + i * 2) * 380, top: 550 + Math.cos(t * 0.5 + i * 2.5) * 600 }} />
      ))}
      {icones.map((ic, i) => (
        <div key={i} style={{ position: "absolute", fontSize: 70, opacity: 0.16,
          left: ((i * 190 + t * 40) % 1180) - 80, top: 200 + ((i * 331) % 1500) + Math.sin(t * 1.5 + i) * 40,
          transform: `rotate(${Math.sin(t + i) * 20}deg)` }}>{ic}</div>
      ))}
    </AbsoluteFill>
  );
};

// ---------- título de cima ----------
export type Gancho = { desde: number; texto: string; destaque: string[] };
export const Ganchos: React.FC<{ lista: Gancho[] }> = ({ lista }) => {
  const { frame, fps, t } = useT();
  const g = [...lista].reverse().find((x) => t >= x.desde) ?? lista[0];
  return (
    <div style={{ position: "absolute", top: 50, left: 0, right: 0, height: 290, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div key={g.texto} style={{ maxWidth: 1000, display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: 24,
        background: "rgba(0,0,0,.6)", borderRadius: 32, padding: "18px 30px" }}>
        {g.texto.split(" ").map((p, i) => {
          const s = spring({ frame: frame - Math.round(g.desde * fps) - i * 3, fps, config: { damping: 9, stiffness: 160 } });
          const hl = g.destaque.includes(p);
          return (
            <span key={i} style={{ display: "inline-block", fontFamily: FONTE, fontWeight: 900, fontSize: 80, lineHeight: 1.12,
              color: hl ? "#111" : "#fff", background: hl ? VERDE : "transparent", borderRadius: 14, padding: hl ? "0 14px" : 0,
              transform: `translateY(${(1 - s) * 60}px) scale(${s}) rotate(${(1 - s) * -12}deg)`, opacity: Math.min(1, s * 2),
              textShadow: hl ? "none" : "0 6px 0 rgba(0,0,0,.45)" }}>{p}</span>
          );
        })}
      </div>
    </div>
  );
};

// ---------- dedo ----------
export type Passo = { t: number; x: number; y: number; acao?: "toque" | "segura" | "arrasta" };
/** Dedo que anda entre pontos (coordenadas do mundo). "segura" mostra o anel crescendo por 0,8 s; "toque" um brilho. */
export const Dedo: React.FC<{ passos: Passo[]; some: number }> = ({ passos, some }) => {
  const { frame, fps, t } = useT();
  if (t < passos[0].t - 0.4 || t > some) return null;
  let x = passos[0].x, y = passos[0].y + 500;
  const ent = mola(frame, passos[0].t - 0.4, fps, 18);
  x = passos[0].x; y = interpolate(ent, [0, 1], [passos[0].y + 600, passos[0].y]);
  for (let i = 1; i < passos.length; i++) {
    const a = passos[i - 1], b = passos[i];
    if (t >= b.t - 0.5) {
      const m = mola(frame, b.t - 0.5, fps, 18);
      x = interpolate(m, [0, 1], [a.x, b.x]); y = interpolate(m, [0, 1], [a.y, b.y]);
    }
  }
  const atual = [...passos].reverse().find((p) => t >= p.t);
  const segurando = atual?.acao === "segura" && t < atual.t + 0.8;
  const anel = segurando ? (t - atual!.t) / 0.8 : 0;
  const tocando = atual?.acao === "toque" && t < atual.t + 0.3;
  return (
    <>
      {segurando && (
        <div style={{ position: "absolute", left: x - 70, top: y - 70, width: 140, height: 140, borderRadius: 70,
          border: `7px solid ${AMARELO}`, opacity: 1 - anel * 0.3, transform: `scale(${0.5 + anel * 0.8})` }} />
      )}
      {tocando && (
        <div style={{ position: "absolute", left: x - 80, top: y - 80, width: 160, height: 160, borderRadius: 80,
          background: "rgba(255,212,59,.4)", transform: `scale(${(t - atual!.t) / 0.3 + 0.4})` }} />
      )}
      <div style={{ position: "absolute", left: x - 38, top: y - 38, width: 76, height: 76, borderRadius: 38,
        background: "rgba(255,255,255,.6)", border: "4px solid #fff", boxShadow: "0 8px 20px rgba(0,0,0,.35)",
        transform: `scale(${segurando || tocando ? 0.8 : 1})` }} />
    </>
  );
};

// ---------- palco: celular 3D + câmera ----------
export const Palco: React.FC<{ cam: Cam[]; tela: React.ReactNode; sobre?: React.ReactNode; tremor?: number; fora?: React.ReactNode }> = ({
  cam, tela: conteudo, sobre, tremor = -1, fora,
}) => {
  const { frame, fps, t } = useT();
  const entrada = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
  const giro = interpolate(entrada, [0, 1], [35, 0]) + Math.sin(t * 1.3) * 4;
  const inclina = Math.cos(t * 1.1) * 3;
  const tr = tremor > 0 && t > tremor && t < tremor + 0.35 ? Math.sin(t * 90) * 10 * (1 - (t - tremor) / 0.35) : 0;
  const c = camera(t, cam);
  return (
    <AbsoluteFill style={{ transform: `translate(${540 - c.x * c.s + tr}px, ${960 - c.y * c.s}px) scale(${c.s})`, transformOrigin: "0 0" }}>
      {fora}
      <div style={{ position: "absolute", inset: 0, perspective: 1600, transform: `translateY(${interpolate(entrada, [0, 1], [1300, 0])}px)` }}>
        <div style={{ position: "absolute", inset: 0, transform: `rotateY(${giro}deg) rotateX(${inclina}deg)`, transformOrigin: "540px 920px" }}>
          <div style={{ position: "absolute", left: TELA.x - 22, top: TELA.y - 22, width: TELA.w + 44, height: TELA.h + 44, borderRadius: 72,
            background: "#050505", boxShadow: `0 40px 90px rgba(0,0,0,.65), 0 0 0 3px #2a2a2a, 0 0 60px ${VERDE}55` }} />
          <div style={{ position: "absolute", left: TELA.x, top: TELA.y, width: TELA.w, height: TELA.h, borderRadius: 52,
            overflow: "hidden", background: "#fff", fontFamily: FONTE }}>{conteudo}</div>
          {sobre}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- sons, barra de progresso, final ----------
export type Som = { t: number; som: "clique" | "pop" | "whoosh" | "ding"; vol?: number };
export const Trilha: React.FC<{ id: string; sons: Som[] }> = ({ id, sons }) => {
  const { f, dur } = useT();
  return (
    <>
      <Audio src={staticFile(`${id}/narracao.mp3`)} />
      <Audio src={staticFile("musica.wav")} volume={(fr) => interpolate(fr, [0, dur - 30, dur], [0.13, 0.13, 0], { extrapolateRight: "clamp" })} />
      {sons.map((s, i) => (
        <Sequence key={i} from={f(s.t)} durationInFrames={s.som === "ding" ? 40 : 20}>
          <Audio src={staticFile(`${s.som}.wav`)} volume={s.vol ?? 0.7} />
        </Sequence>
      ))}
    </>
  );
};

export const Final: React.FC<{ desde: number; emoji: string; frase: React.ReactNode }> = ({ desde, emoji, frase }) => {
  const { frame, fps, t } = useT();
  if (t < desde) return null;
  const fim = mola(frame, desde, fps, 12);
  return (
    <AbsoluteFill style={{ clipPath: `circle(${interpolate(fim, [0, 1], [0, 1400])}px at 540px 960px)`,
      background: "linear-gradient(160deg, #075E54, #0d1512 70%)", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center", color: "#fff", padding: 80, fontFamily: FONTE }}>
      <div style={{ fontSize: 150, transform: `rotate(${Math.sin(t * 6) * 12}deg) scale(${fim})` }}>{emoji}</div>
      <div style={{ fontSize: 86, fontWeight: 900, lineHeight: 1.1 }}>{frase}</div>
      <div style={{ fontSize: 58, fontWeight: 800, color: "#111", background: AMARELO, borderRadius: 18, padding: "10px 30px",
        marginTop: 60, transform: `scale(${1 + Math.sin(t * 8) * 0.04})` }}>Salva esse vídeo</div>
      <div style={{ fontSize: 42, color: "#cfe", marginTop: 30 }}>Segue para mais truques de celular</div>
    </AbsoluteFill>
  );
};

/** Moldura completa do short: trilha, fundo, palco, título, barra, final e legenda. */
export const Short: React.FC<{
  id: string; tempos: Tempos; ganchos: Gancho[]; cam: Cam[]; tela: React.ReactNode; sobre?: React.ReactNode;
  sons: Som[]; final: { emoji: string; frase: React.ReactNode }; tremor?: number; fora?: React.ReactNode;
}> = (p) => {
  const { frame, dur } = useT();
  return (
    <AbsoluteFill style={{ fontFamily: FONTE, overflow: "hidden" }}>
      <Trilha id={p.id} sons={[...p.sons, { t: p.tempos.cenas[5], som: "ding" }]} />
      <Fundo />
      <Palco cam={p.cam} tela={p.tela} sobre={p.sobre} tremor={p.tremor} fora={p.fora} />
      <Ganchos lista={p.ganchos} />
      <div style={{ position: "absolute", top: 0, left: 0, height: 14, width: `${(frame / dur) * 100}%`,
        background: `linear-gradient(90deg, ${VERDE}, ${AMARELO})` }} />
      <Final desde={p.tempos.cenas[5]} emoji={p.final.emoji} frase={p.final.frase} />
      <Legenda palavras={p.tempos.palavras} cenas={p.tempos.cenas} />
    </AbsoluteFill>
  );
};

// ---------- peças de tela (coordenadas locais da tela 590x1120) ----------
export const BarraStatus: React.FC<{ cor?: string; claro?: boolean; bateria?: React.ReactNode }> = ({ cor = "#075E54", claro = true, bateria = "🔋" }) => (
  <div style={{ height: 50, background: cor, color: claro ? "#fff" : "#111", fontSize: 22, display: "flex",
    justifyContent: "space-between", alignItems: "center", padding: "0 34px" }}>
    <span>9:41</span><span>▂▄▆ {bateria}</span>
  </div>
);

export const BarraApp: React.FC<{ titulo: React.ReactNode; cor?: string; direita?: React.ReactNode; esquerda?: React.ReactNode }> = ({
  titulo, cor = "#075E54", direita, esquerda,
}) => (
  <div style={{ height: 130, background: cor, color: "#fff", display: "flex", alignItems: "center", padding: "0 28px", gap: 22 }}>
    {esquerda}
    <span style={{ fontSize: 40, fontWeight: 700, flex: 1, whiteSpace: "nowrap", overflow: "hidden" }}>{titulo}</span>
    {direita}
  </div>
);

export const Linha: React.FC<{ icone?: React.ReactNode; titulo: string; sub?: string; direita?: React.ReactNode; destaque?: boolean; altura?: number }> = ({
  icone, titulo, sub, direita, destaque, altura = 112,
}) => (
  <div style={{ height: altura, display: "flex", alignItems: "center", gap: 22, padding: "0 28px",
    background: destaque ? "#d9fdd3" : "#fff", borderBottom: "1px solid #eee" }}>
    {icone && <div style={{ width: 64, fontSize: 40, textAlign: "center", flex: "none" }}>{icone}</div>}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 31, fontWeight: 600, color: "#111" }}>{titulo}</div>
      {sub && <div style={{ fontSize: 24, color: "#667", whiteSpace: "nowrap", overflow: "hidden" }}>{sub}</div>}
    </div>
    {direita}
  </div>
);

export const Avatar: React.FC<{ letra: string; cor: string; tam?: number }> = ({ letra, cor, tam = 78 }) => (
  <div style={{ width: tam, height: tam, borderRadius: tam / 2, background: cor, color: "#fff", fontWeight: 700, fontSize: tam * 0.44,
    display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{letra}</div>
);

export const Chave: React.FC<{ ligada: number }> = ({ ligada }) => (
  <div style={{ width: 84, height: 46, borderRadius: 23, background: ligada > 0.5 ? VERDE : "#bbb", position: "relative", flex: "none" }}>
    <div style={{ position: "absolute", top: 4, left: 4 + ligada * 38, width: 38, height: 38, borderRadius: 19, background: "#fff",
      boxShadow: "0 2px 6px rgba(0,0,0,.3)" }} />
  </div>
);

export const Dialogo: React.FC<{ titulo: string; opcoes: string[]; marcada?: number; aparece: number }> = ({ titulo, opcoes, marcada = -1, aparece }) => (
  <div style={{ position: "absolute", inset: 0, background: `rgba(0,0,0,${0.45 * aparece})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ width: 500, background: "#fff", borderRadius: 26, padding: "34px 34px 20px", transform: `scale(${0.8 + aparece * 0.2})`,
      opacity: aparece, boxShadow: "0 20px 50px rgba(0,0,0,.4)" }}>
      <div style={{ fontSize: 32, fontWeight: 700, color: "#111", marginBottom: 20 }}>{titulo}</div>
      {opcoes.map((o, i) => (
        <div key={i} style={{ fontSize: 30, color: "#0a7d5a", fontWeight: 600, textAlign: "right", padding: "16px 10px", borderRadius: 14,
          background: i === marcada ? "#d9fdd3" : "transparent" }}>{o}</div>
      ))}
    </div>
  </div>
);

export const Digitando: React.FC<{ texto: string; desde: number; cps?: number }> = ({ texto, desde, cps = 14 }) => {
  const { t } = useT();
  const n = Math.max(0, Math.min(texto.length, Math.floor((t - desde) * cps)));
  const cursor = Math.floor(t * 2) % 2 === 0 ? "|" : " ";
  return <>{texto.slice(0, n)}<span style={{ color: "#999" }}>{n < texto.length || t < desde + texto.length / cps + 1 ? cursor : ""}</span></>;
};
