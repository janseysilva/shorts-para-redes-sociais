// VÍDEO LONGO horizontal (1920x1080) do Física Sem Mistério, montado direto do roteiro (roteiros/ID.json, "longo": true).
// Cada cena: vídeo real (public/clipes_longo), foto real (public/fotos_longo, com etiqueta "IMAGEM REAL") ou animação simples.
// Leve de propósito (sem desfoque no Remotion) para renderizar 8 minutos em tempo razoável.
import React from "react";
import { AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import duracoes from "../public/clipes_longo/duracoes.json";

const FONTE = "Segoe UI, Arial, sans-serif";
const OURO = "#FFC94A";
const CIANO = "#5CE1FF";
const CLAMP = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const DUR = duracoes as Record<string, number>;
const FADE = 0.45;

type Palavra = { t: string; ini: number; fim: number };
export type TemposLongo = { palavras: Palavra[]; cenas: number[]; capitulos: { titulo: string; ini: number }[]; total: number };
type CenaL = { frase: string; clipe?: string; desde?: number; foto?: string; legenda?: string; anim?: { emoji: string; texto: string }; fim?: boolean };
export type RoteiroLongo = { id: string; titulo: string; capitulos: { titulo: string; cenas: CenaL[] }[] };

const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return { frame, fps, t: frame / fps, f: (s: number) => Math.round(s * fps) };
};

// ---------- conteúdo de cada cena (tempo local: 0 = começo da cena) ----------
const Clipe: React.FC<{ nome: string; desde: number; dur: number; n: number }> = ({ nome, desde, dur, n }) => {
  const { t, f } = useT();
  const total = DUR[nome] ?? 10;
  const vel = Math.max(0.5, Math.min(1, (total - desde - 0.1) / (dur + FADE * 2)));
  const s = 1.02 + 0.05 * interpolate(t, [0, dur], [0, 1], CLAMP);
  return (
    <AbsoluteFill style={{ transform: `scale(${s})`, transformOrigin: n % 2 ? "40% 50%" : "60% 50%" }}>
      <OffthreadVideo src={staticFile(`clipes_longo/${nome}.mp4`)} muted playbackRate={vel} startFrom={f(desde)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </AbsoluteFill>
  );
};

const Foto: React.FC<{ nome: string; dur: number; n: number }> = ({ nome, dur, n }) => {
  const { t } = useT();
  const p = interpolate(t, [0, dur + FADE], [0, 1], CLAMP);
  const s = n % 2 ? 1.1 - 0.08 * p : 1.02 + 0.08 * p;
  return (
    <AbsoluteFill style={{ transform: `scale(${s}) translateX(${(n % 3 - 1) * 12 * p}px)` }}>
      <Img src={staticFile(`fotos_longo/${nome}.jpg`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </AbsoluteFill>
  );
};

const ESTRELAS = Array.from({ length: 140 }, (_, i) => {
  const r = (k: number) => ((Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1 + 1) % 1;
  return { x: r(1) * 1920, y: r(2) * 1080, s: 1 + r(3) * 2.4, f: 0.6 + r(4) * 2, p: r(5) * 6.28 };
});

const Animacao: React.FC<{ emoji: string; texto: string }> = ({ emoji, texto }) => {
  const { frame, fps, t } = useT();
  const e = spring({ frame: frame - 6, fps, config: { damping: 12 } });
  const tx = spring({ frame: frame - 16, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, #14204a 0%, #070b1c 60%, #020308 100%)" }}>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {ESTRELAS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.s} fill="#fff" opacity={0.25 + 0.6 * Math.abs(Math.sin(t * s.f + s.p))} />
        ))}
      </svg>
      {[0, 1, 2].map((i) => {
        const fase = (t * 0.5 + i / 3) % 1;
        return <div key={i} style={{ position: "absolute", left: 960 - 170, top: 400 - 170, width: 340, height: 340, borderRadius: 170,
          border: `4px solid ${OURO}`, opacity: (1 - fase) * 0.45 * e, transform: `scale(${0.8 + fase * 1.5})` }} />;
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 400 - 150, textAlign: "center", fontSize: 230, lineHeight: 1.3,
        transform: `scale(${e}) translateY(${Math.sin(t * 2) * 10}px)` }}>{emoji}</div>
      <div style={{ position: "absolute", left: 120, right: 120, top: 660, textAlign: "center", fontFamily: FONTE, fontWeight: 900,
        fontSize: texto.length > 30 ? 72 : 88, color: "#fff", opacity: tx, transform: `translateY(${(1 - tx) * 40}px)`,
        textShadow: "0 0 30px rgba(92,225,255,.55), 0 5px 0 rgba(0,0,0,.6)" }}>{texto}</div>
    </AbsoluteFill>
  );
};

const Etiqueta: React.FC<{ texto: string }> = ({ texto }) => {
  const { frame, fps } = useT();
  const s = spring({ frame: frame - 10, fps, config: { damping: 15 } });
  return (
    <div style={{ position: "absolute", right: 50, top: 46, display: "flex", alignItems: "center", gap: 14, opacity: s,
      transform: `translateX(${(1 - s) * 60}px)`, fontFamily: FONTE }}>
      <span style={{ background: OURO, color: "#1a1000", fontWeight: 900, fontSize: 24, padding: "6px 14px", borderRadius: 8, letterSpacing: 1 }}>IMAGEM REAL</span>
      <span style={{ background: "rgba(0,0,0,.62)", color: "#fff", fontWeight: 700, fontSize: 28, padding: "6px 16px", borderRadius: 8 }}>{texto}</span>
    </div>
  );
};

// ---------- camadas por cima ----------
const Legenda: React.FC<{ palavras: Palavra[]; cenas: number[] }> = ({ palavras, cenas }) => {
  const { t } = useT();
  const atual = palavras.findIndex((p, i) => t >= p.ini && (i === palavras.length - 1 || t < palavras[i + 1].ini));
  if (atual < 0 || t > palavras[atual].fim + 0.8) return null;
  const cena = (i: number) => cenas.filter((c) => c <= palavras[i].ini + 0.001).length - 1;
  const daCena = palavras.map((_, i) => i).filter((i) => cena(i) === cena(atual));
  const pos = daCena.indexOf(atual);
  const bloco = daCena.slice(Math.floor(pos / 7) * 7, Math.floor(pos / 7) * 7 + 7);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 70, display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: 1500, background: "rgba(0,0,0,.66)", borderRadius: 18, padding: "10px 30px", display: "flex",
        flexWrap: "wrap", justifyContent: "center", columnGap: 16 }}>
        {bloco.map((i) => (
          <span key={i} style={{ fontFamily: FONTE, fontWeight: 800, fontSize: 52, lineHeight: 1.25,
            color: i === atual ? OURO : "#fff", textShadow: "0 3px 0 rgba(0,0,0,.6)" }}>{palavras[i].t}</span>
        ))}
      </div>
    </div>
  );
};

const Capitulo: React.FC<{ caps: { titulo: string; ini: number }[] }> = ({ caps }) => {
  const { t } = useT();
  const i = caps.findIndex((c, k) => t >= c.ini - 0.3 && t < c.ini + 5 && k > 0 && k < caps.length - 1);
  if (i < 0) return null;
  const c = caps[i];
  const a = interpolate(t, [c.ini - 0.3, c.ini + 0.3, c.ini + 4.4, c.ini + 5], [0, 1, 1, 0], CLAMP);
  return (
    <div style={{ position: "absolute", left: 60, top: 50, opacity: a, transform: `translateX(${(1 - a) * -80}px)`, fontFamily: FONTE }}>
      <div style={{ color: OURO, fontWeight: 900, fontSize: 30, letterSpacing: 4, textShadow: "0 2px 6px rgba(0,0,0,.8)" }}>CAPÍTULO {i}</div>
      <div style={{ marginTop: 6, background: "rgba(4,7,20,.72)", borderLeft: `8px solid ${OURO}`, padding: "10px 26px", color: "#fff",
        fontWeight: 900, fontSize: 56 }}>{c.titulo}</div>
    </div>
  );
};

const Abertura: React.FC<{ grande: string; pequeno: string }> = ({ grande, pequeno }) => {
  const { t, frame, fps } = useT();
  if (t > 7) return null;
  const s = spring({ frame: frame - 8, fps, config: { damping: 13 } });
  const a = interpolate(t, [6, 7], [1, 0], CLAMP);
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: a,
      background: `rgba(0,0,0,${0.35 * a})`, fontFamily: FONTE }}>
      <div style={{ fontWeight: 900, fontSize: 170, color: "#fff", letterSpacing: 6, transform: `scale(${0.8 + 0.2 * s})`, opacity: s,
        textShadow: "0 0 50px rgba(255,140,40,.6), 0 8px 0 rgba(0,0,0,.6)" }}>{grande}</div>
      <div style={{ fontWeight: 800, fontSize: 64, color: OURO, opacity: s, textShadow: "0 4px 0 rgba(0,0,0,.7)" }}>{pequeno}</div>
    </AbsoluteFill>
  );
};

const TelaFinal: React.FC<{ desde: number }> = ({ desde }) => {
  const { t, frame, fps } = useT();
  if (t < desde) return null;
  const s = spring({ frame: frame - Math.round(desde * fps), fps, config: { damping: 14 } });
  return (
    <AbsoluteFill style={{ background: `rgba(3,5,12,${0.72 * s})`, display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", fontFamily: FONTE, opacity: s }}>
      <div style={{ fontSize: 130 }}>⚛️</div>
      <div style={{ fontWeight: 900, fontSize: 96, color: "#fff", textShadow: `0 0 40px ${CIANO}` }}>Física Sem Mistério</div>
      <div style={{ marginTop: 40, fontWeight: 900, fontSize: 60, color: "#1a1000", background: OURO, borderRadius: 18, padding: "12px 40px",
        transform: `scale(${1 + Math.sin(t * 5) * 0.03})` }}>Inscreva-se</div>
      <div style={{ marginTop: 30, fontSize: 42, color: "#cfe8ff" }}>Curiosidades da física, sem complicação</div>
    </AbsoluteFill>
  );
};

export const Longo: React.FC<{ roteiro: RoteiroLongo; tempos: TemposLongo; abertura: [string, string]; fundoFinal: string }> = ({
  roteiro, tempos, abertura, fundoFinal,
}) => {
  const { f } = useT();
  const cenas = roteiro.capitulos.flatMap((c) => c.cenas);
  const C = tempos.cenas;
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <Audio src={staticFile(`${roteiro.id}/narracao.mp3`)} />
      <Audio src={staticFile("musica.wav")} loop volume={0.07} />
      {cenas.map((c, i) => {
        const ini = i === 0 ? 0 : C[i];
        const fim = i + 1 < C.length ? C[i + 1] : tempos.total;
        const dur = fim - ini;
        const de = Math.max(0, ini - FADE);
        return (
          <Sequence key={i} from={f(de)} durationInFrames={f(fim + FADE - de)}>
            <CenaFade entra={i === 0 ? 0 : FADE}>
              {c.fim ? <Clipe nome={fundoFinal} desde={2} dur={dur} n={i} />
                : c.anim ? <Animacao emoji={c.anim.emoji} texto={c.anim.texto} />
                : c.foto ? <><Foto nome={c.foto} dur={dur} n={i} />{c.legenda && <Etiqueta texto={c.legenda} />}</>
                : <Clipe nome={c.clipe!} desde={c.desde ?? 0} dur={dur} n={i} />}
            </CenaFade>
          </Sequence>
        );
      })}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,.25) 0%, transparent 18%, transparent 72%, rgba(0,0,0,.45) 100%)" }} />
      <Abertura grande={abertura[0]} pequeno={abertura[1]} />
      <Capitulo caps={tempos.capitulos} />
      <TelaFinal desde={C[C.length - 1] + 0.2} />
      <Legenda palavras={tempos.palavras} cenas={C} />
    </AbsoluteFill>
  );
};

const CenaFade: React.FC<{ entra: number; children: React.ReactNode }> = ({ entra, children }) => {
  const { t } = useT();
  const op = entra > 0 ? interpolate(t, [0, entra], [0, 1], CLAMP) : 1;
  return <AbsoluteFill style={{ opacity: op }}>{children}</AbsoluteFill>;
};
