// Demonstração dos efeitos de cena (11/11): o Jansey quer ver cada opção antes de escolher.
// Mesmas 4 fotos do short do lago Nyos, mostradas 5 vezes: como é hoje + 4 opções de efeito.
import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, spring, staticFile } from "remotion";
import { CLAMP, FONTE, OURO, Vinheta, janela, useT } from "./espaco";

export const SEG = 9; // segundos por parte
const CARD = 1; // segundos do cartão com o nome da opção
const CENA = 2; // segundos por foto
const FOTOS: { nome: string; larg: number; palavra: string }[] = [
  { nome: "Ny_lago", larg: 1292, palavra: "1.746 MORTES" },
  { nome: "Ny_ia_fundo", larg: 1080, palavra: "GÁS PRESO" },
  { nome: "Ny_ia_nuvem", larg: 1080, palavra: "MAIS PESADO" },
  { nome: "Ny_lago1986", larg: 2852, palavra: "LAGO VERMELHO" },
];
type Modo = "atual" | "transicao" | "camera" | "sons" | "desenhos";
const PARTES: { modo: Modo; titulo: string; sub: string }[] = [
  { modo: "atual", titulo: "COMO É HOJE", sub: "para comparar" },
  { modo: "transicao", titulo: "OPÇÃO 1", sub: "Transição entre cenas" },
  { modo: "camera", titulo: "OPÇÃO 2", sub: "Câmera mais viva" },
  { modo: "sons", titulo: "OPÇÃO 3", sub: "Sons de efeito (ligue o som)" },
  { modo: "desenhos", titulo: "OPÇÃO 4", sub: "Desenhos por cima" },
];
export const TOTAL_DEMO = SEG * PARTES.length;
const SAIDA = 0.35; // duração das transições rápidas
const suave = Easing.bezier(0.65, 0, 0.35, 1);

const Foto: React.FC<{ i: number; p: number }> = ({ i, p }) => {
  const f = FOTOS[i];
  const largura = (f.larg * 1920) / 1920;
  const sobra = Math.max(0, largura - 1080);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#000" }}>
      <Img src={staticFile(`fotos_short/${f.nome}.jpg`)}
        style={{ position: "absolute", height: 1920, minWidth: 1080, left: -sobra / 2 + (0.5 - p) * sobra }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.1) 25%, rgba(0,0,0,.1) 70%, rgba(0,0,0,.6) 100%)" }} />
    </AbsoluteFill>
  );
};

/** Uma foto da sequência com o efeito do modo escolhido. lt = tempo dentro da parte. */
const CenaDemo: React.FC<{ modo: Modo; i: number; lt: number; fps: number; frameLocal: number }> = ({ modo, i, lt, fps, frameLocal }) => {
  const ini = CARD + i * CENA, fim = ini + CENA, ultima = i === FOTOS.length - 1;
  const p = interpolate(lt, [ini, fim + 0.5], [0, 1], CLAMP);
  const kw = ini + 0.5; // quando a palavra forte aparece
  let op = 1, x = 0, s = 1, blur = 0, z = 1;

  if (modo === "transicao") {
    if (lt < ini - 0.001 || (lt > fim + SAIDA && !ultima)) return null;
    s = 1 + 0.05 * p;
    const tipoEntrada = i - 1, tipoSaida = i; // 0 = deslizar, 1 = zoom, 2 = piscar
    if (i > 0 && lt < ini + SAIDA) {
      const k = interpolate(lt, [ini, ini + SAIDA], [0, 1], { ...CLAMP, easing: suave });
      if (tipoEntrada === 0) { x = (1 - k) * 1080; blur = Math.sin(k * Math.PI) * 18; }
      if (tipoEntrada === 1) { s *= 1.35 - 0.35 * k; op = k; }
      z = 2;
    }
    if (!ultima && lt >= fim) {
      const k = interpolate(lt, [fim, fim + SAIDA], [0, 1], { ...CLAMP, easing: suave });
      if (tipoSaida === 0) { x = -k * 1080; blur = Math.sin(k * Math.PI) * 18; }
      if (tipoSaida === 1) { s *= 1 + 1.2 * k; op = 1 - k; blur = k * 10; }
      if (tipoSaida === 2) return null; // corte seco escondido pelo clarão
    }
  } else if (modo === "camera") {
    op = janela(lt, ini, fim, 0.25);
    if (op <= 0) return null;
    const soco = spring({ frame: frameLocal - Math.round(kw * fps), fps, config: { damping: 9, stiffness: 170 } });
    s = 1 + 0.08 * p + 0.14 * soco;
    const tremida = interpolate(lt, [kw, kw + 0.45], [1, 0], CLAMP);
    x = Math.sin(lt * 70) * 14 * tremida;
  } else {
    op = janela(lt, ini, fim, 0.5);
    if (op <= 0) return null;
    s = 1 + 0.05 * p;
  }
  return (
    <AbsoluteFill style={{ opacity: op, zIndex: z, transform: `translateX(${x}px) scale(${s})`, transformOrigin: "540px 950px", filter: blur ? `blur(${blur}px)` : undefined }}>
      <Foto i={i} p={modo === "camera" ? Math.min(1, p * 1.4) : p} />
    </AbsoluteFill>
  );
};

const Palavra: React.FC<{ texto: string; desde: number; ate: number; lt: number; fps: number; frameLocal: number }> = ({ texto, desde, ate, lt, fps, frameLocal }) => {
  if (lt < desde || lt > ate) return null;
  const e = spring({ frame: frameLocal - Math.round(desde * fps), fps, config: { damping: 12, stiffness: 150 } });
  return (
    <div style={{ position: "absolute", left: 40, right: 40, top: 1180, textAlign: "center", zIndex: 5, fontFamily: FONTE, fontWeight: 900, fontSize: 104,
      color: "#fff", transform: `scale(${0.6 + 0.4 * e})`, opacity: Math.min(1, e * 1.5), textShadow: "0 0 30px rgba(0,0,0,.9), 0 6px 0 rgba(0,0,0,.6)" }}>{texto}</div>
  );
};

/** Opção 4: desenhos por cima da foto (círculo, seta, régua, contador). */
const Desenhos: React.FC<{ i: number; lt: number }> = ({ i, lt }) => {
  const ini = CARD + i * CENA;
  const q = lt - ini;
  if (q < 0 || q > CENA) return null;
  const tr = (a: number, b: number) => interpolate(q, [a, b], [0, 1], { ...CLAMP, easing: suave });
  const rot = { fontFamily: FONTE, fontWeight: 900, fill: "#fff", stroke: "#000", strokeWidth: 3, paintOrder: "stroke" as const };
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, zIndex: 5 }}>
      {i === 0 && (<>
        <circle cx={540} cy={1000} r={300} fill="none" stroke={OURO} strokeWidth={14} strokeLinecap="round"
          strokeDasharray={1885} strokeDashoffset={1885 * (1 - tr(0.1, 0.8))} transform="rotate(-90 540 1000)" />
        <text x={540} y={1460} textAnchor="middle" fontSize={130} {...rot} fill={OURO}>
          {Math.round(1746 * tr(0.3, 1.5)).toLocaleString("pt-BR")}</text>
        <text x={540} y={1550} textAnchor="middle" fontSize={64} {...rot} opacity={tr(1.3, 1.6)}>pessoas em uma noite</text>
      </>)}
      {i === 1 && (<>
        <text x={540} y={820} textAnchor="middle" fontSize={72} {...rot} opacity={tr(0, 0.3)}>gás preso no fundo</text>
        <line x1={540} y1={870} x2={540} y2={870 + 520 * tr(0.2, 0.8)} stroke={OURO} strokeWidth={14} strokeLinecap="round" />
        <polygon points="500,1380 580,1380 540,1450" fill={OURO} opacity={tr(0.75, 0.85)} />
        <ellipse cx={540} cy={1500} rx={240 * tr(0.8, 1.2)} ry={70 * tr(0.8, 1.2)} fill="none" stroke={OURO} strokeWidth={10} />
      </>)}
      {i === 2 && (<>
        <line x1={110} y1={1400} x2={110 + 860 * tr(0.2, 1.3)} y2={1400} stroke={OURO} strokeWidth={12} strokeLinecap="round" />
        {Array.from({ length: 6 }).map((_, k) => (
          <line key={k} x1={110 + k * 172} y1={1380} x2={110 + k * 172} y2={1420} stroke={OURO} strokeWidth={8}
            opacity={tr(0.2 + k * 0.2, 0.3 + k * 0.2)} />
        ))}
        <text x={540} y={1340} textAnchor="middle" fontSize={88} {...rot}>{`até ${Math.round(25 * tr(0.2, 1.3))} km`}</text>
      </>)}
      {i === 3 && (<>
        <ellipse cx={560} cy={1080} rx={380} ry={180} fill="none" stroke={OURO} strokeWidth={12}
          strokeDasharray={1850} strokeDashoffset={1850 * (1 - tr(0.1, 0.8))} />
        <text x={540} y={1400} textAnchor="middle" fontSize={64} {...rot} opacity={tr(0.6, 0.9)}>ferro do fundo deixou</text>
        <text x={540} y={1480} textAnchor="middle" fontSize={64} {...rot} opacity={tr(0.7, 1.0)}>a água vermelha</text>
      </>)}
    </svg>
  );
};

const Parte: React.FC<{ n: number }> = ({ n }) => {
  const { frame, fps, t } = useT();
  const { modo, titulo, sub } = PARTES[n];
  const lt = t - n * SEG;
  const frameLocal = frame - n * SEG * fps;
  if (lt < 0 || lt >= SEG) return null;
  const cartao = interpolate(lt, [CARD - 0.25, CARD], [1, 0], CLAMP);
  const clarao = modo === "transicao" ? Math.max(0, 1 - Math.abs(lt - (CARD + 3 * CENA)) / 0.22) : 0;
  return (
    <AbsoluteFill>
      {FOTOS.map((_, i) => <CenaDemo key={i} modo={modo} i={i} lt={lt} fps={fps} frameLocal={frameLocal} />)}
      <Vinheta />
      {modo === "desenhos"
        ? FOTOS.map((_, i) => <Desenhos key={i} i={i} lt={lt} />)
        : FOTOS.map((f, i) => <Palavra key={i} texto={f.palavra} desde={CARD + i * CENA + 0.5} ate={CARD + (i + 1) * CENA - 0.05} lt={lt} fps={fps} frameLocal={frameLocal} />)}
      {clarao > 0 && <AbsoluteFill style={{ background: "#fff", opacity: clarao, zIndex: 8 }} />}
      {/* etiqueta fixa no alto */}
      <div style={{ position: "absolute", top: 70, left: 0, right: 0, textAlign: "center", zIndex: 9 }}>
        <span style={{ fontFamily: FONTE, fontWeight: 900, fontSize: 54, color: "#140d00", background: OURO, borderRadius: 18, padding: "10px 28px" }}>
          {titulo}{modo !== "atual" ? `: ${sub}` : ""}</span>
      </div>
      {/* cartão de abertura de cada parte */}
      {cartao > 0 && (
        <AbsoluteFill style={{ zIndex: 10, background: "#05070f", opacity: cartao, display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", fontFamily: FONTE, color: "#fff", textAlign: "center" }}>
          <div style={{ fontSize: 120, fontWeight: 900, color: OURO }}>{titulo}</div>
          <div style={{ fontSize: 76, fontWeight: 800, marginTop: 20, padding: "0 60px" }}>{sub}</div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

export const DemoEfeitos: React.FC = () => {
  const { fps } = useT();
  const f = (s: number) => Math.round(s * fps);
  const base = 3 * SEG; // parte dos sons
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <Audio src={staticFile("musica.wav")} volume={0.18} />
      {FOTOS.map((_, i) => {
        const ini = base + CARD + i * CENA;
        return (
          <React.Fragment key={i}>
            <Sequence from={f(ini + 0.45)} durationInFrames={45}><Audio src={staticFile("grave.wav")} volume={0.7} /></Sequence>
            {i < FOTOS.length - 1 && (
              <Sequence from={f(ini + CENA - 0.2)} durationInFrames={45}><Audio src={staticFile("whoosh.wav")} volume={0.6} /></Sequence>
            )}
          </React.Fragment>
        );
      })}
      {PARTES.map((_, n) => <Parte key={n} n={n} />)}
    </AbsoluteFill>
  );
};
