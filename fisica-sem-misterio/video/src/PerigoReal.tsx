// "VOCÊ EM PERIGO" versão realista (25/11): clipes e imagens de IA (Google Flow: Veo 3.1 Lite e Nano Banana) + gráficos só onde explicam.
import React from "react";
import { AbsoluteFill, Audio, Img, Loop, OffthreadVideo, Sequence, interpolate, staticFile } from "remotion";
import { CLAMP, FONTE, mola, useT, type Tempos } from "./espaco";
import { Legenda } from "./Legenda";
import { AMAR, Svg, VERDE, VERM, Xis, ip, quando, suave } from "./Perigo";

const Vid: React.FC<{ n: string; a: number; b: number; de?: number; vel?: number; zoom?: [number, number] }> = ({ n, a, b, de = 0, vel = 1, zoom = [1, 1.06] }) => {
  const { t, f } = useT();
  if (t < a || t >= b) return null;
  return (
    <AbsoluteFill style={{ transform: `scale(${ip(t, a, b, zoom[0], zoom[1])})` }}>
      <Sequence from={f(a)}><OffthreadVideo src={staticFile(`ia31/${n}.mp4`)} muted startFrom={f(de)} playbackRate={vel} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></Sequence>
    </AbsoluteFill>
  );
};
const Foto: React.FC<{ n: string; a: number; b: number; z?: [number, number]; o?: string; treme?: number; dx?: [number, number] }> = ({ n, a, b, z = [1.02, 1.16], o = "50% 60%", treme = 0, dx = [0, 0] }) => {
  const { t } = useT();
  if (t < a || t >= b) return null;
  return (
    <AbsoluteFill>
      <Img src={staticFile(`ia31/${n}.jpg`)} style={{ width: "100%", height: "100%", objectFit: "cover", transformOrigin: o,
        transform: `translate(${ip(t, a, b, dx[0], dx[1]) + Math.sin(t * 7) * treme}px,${Math.cos(t * 5) * treme}px) scale(${ip(t, a, b, z[0], z[1])})` }} />
      
    </AbsoluteFill>
  );
};
/** Texto grande solto sobre a imagem (sem caixinha de cartilha). */
const Grande: React.FC<{ a: number; b: number; y?: number; linhas: [string, string, number][] }> = ({ a, b, y = 210, linhas }) => {
  const { t, frame, fps } = useT();
  if (t < a || t >= b) return null;
  const e = a <= 0 ? 1 : mola(frame, a, fps, 13, 170);
  return (
    <div style={{ position: "absolute", top: y, left: 30, right: 30, textAlign: "center", transform: `scale(${interpolate(e, [0, 1], [1.35, 1])})`, opacity: interpolate(e, [0, 0.4], [0, 1], CLAMP) }}>
      {linhas.map(([s, c, n]) => <div key={s} style={{ fontFamily: FONTE, fontWeight: 900, fontSize: n, lineHeight: 1.06, color: c, WebkitTextStroke: "12px #000", paintOrder: "stroke", textShadow: "0 10px 40px #000" }}>{s}</div>)}
    </div>
  );
};
const Passo: React.FC<{ a: number; b: number; n: string; texto: string }> = ({ a, b, n, texto }) => {
  const { t, frame, fps } = useT();
  if (t < a || t >= b) return null;
  const e = mola(frame, a, fps, 14, 150);
  return (
    <div style={{ position: "absolute", top: 210, left: 40, right: 40, display: "flex", justifyContent: "center", alignItems: "center", gap: 28, transform: `translateX(${(1 - e) * -300}px)`, opacity: e, fontFamily: FONTE, fontWeight: 900 }}>
      <div style={{ width: 150, height: 150, borderRadius: 75, background: VERDE, color: "#fff", fontSize: 104, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 40px #000", flexShrink: 0 }}>{n}</div>
      <div style={{ color: "#fff", fontSize: 82, lineHeight: 1.02, maxWidth: 720, WebkitTextStroke: "11px #000", paintOrder: "stroke", textShadow: "0 10px 40px #000" }}>{texto}</div>
    </div>
  );
};

export const CarroEnchenteReal: React.FC<{ tempos: Tempos }> = ({ tempos }) => {
  const { t, f, dur, frame } = useT();
  const C = tempos.cenas, q = (i: number, p: string) => quando(tempos, i, p);
  const total = tempos.total, nao = q(0, "não"), mas = q(7, "mas"), porta = q(9, "porta"), sete = C[7];
  const peso = Math.round(suave(t, C[3] + 0.6, C[4] - 0.4, 1000, 100) / 10) * 10;
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden", fontFamily: FONTE }}>
      <Audio src={staticFile("CarroEnchente/narracao.mp3")} volume={1} />
      <Audio src={staticFile("musicas/level.mp3")} loop volume={(fr) => interpolate(fr, [0, dur - 30, dur], [0.086, 0.086, 0], CLAMP)} />
      <Loop durationInFrames={f(12)}><Audio src={staticFile("sons/correnteza31.wav")} volume={0.22} /></Loop>

      <Vid n="carro1" a={0} b={2.2} de={0} zoom={[1.15, 1.25]} />
      <Vid n="motorista1" a={2.2} b={C[2]} de={0.5} zoom={[1.22, 1.3]} />
      <Foto n="perfil" a={C[2]} b={C[3]} z={[1.05, 1.25]} o="45% 57%" />
      <Vid n="roda1" a={C[3]} b={C[4]} de={2.8} vel={0.98} zoom={[1, 1.1]} />
      <Vid n="carro1" a={C[4]} b={C[5]} de={4.0} vel={0.76} zoom={[1, 1.1]} />
      <Foto n="caminhonete" a={C[5]} b={C[6]} z={[1.5, 1.75]} o="50% 55%" treme={5} dx={[-40, 40]} />
      <Foto n="buraco" a={C[6]} b={sete} z={[1.02, 1.28]} o="50% 85%" />
      <Vid n="re" a={sete} b={mas} de={0} zoom={[1.3, 1.2]} />
      <Foto n="perfil" a={mas} b={C[8]} z={[1.5, 1.7]} o="45% 57%" treme={3} />
      <Foto n="chave" a={C[8]} b={C[9]} z={[1.05, 1.2]} o="50% 45%" />
      <Foto n="perfil" a={C[9]} b={porta} z={[2.1, 2.6]} o="20% 63%" treme={2} />
      <Foto n="janela" a={porta} b={C[10]} z={[1.15, 1.35]} o="55% 45%" treme={2} />
      <Vid n="teto1" a={C[10]} b={C[11]} de={2.4} zoom={[1, 1.02]} />
      <Foto n="janela" a={C[11]} b={total + 1} z={[1.1, 1.2]} />

      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 34%, rgba(0,0,0,0) 68%, rgba(0,0,0,.6) 100%)" }} />

      <Grande a={0} b={nao} linhas={[["RUA ALAGADA", "#fff", 130], ["você passaria?", AMAR, 92]]} />
      <Grande a={nao} b={C[1]} linhas={[["NÃO PASSE", VERM, 160]]} />
      <Grande a={C[1]} b={C[2]} linhas={[["parece RASO", "#fff", 130], ["mas não é", AMAR, 100]]} />
      <Grande a={C[2]} b={C[3]} linhas={[["1 TONELADA", "#fff", 140]]} />
      {t >= q(2, "empurra") && t < C[3] && <Svg>{[330, 520, 710].map((x, i) => { const p = (t * 1.4 + i * 0.2) % 1; return <path key={i} d={`M${x},${1390 - p * 90}v-110m-42,48l42,-54l42,54`} stroke={AMAR} strokeWidth={24} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={Math.sin(p * Math.PI)} />; })}</Svg>}
      {t >= C[3] && t < C[4] && (
        <div style={{ position: "absolute", top: 200, left: 110, right: 110, textAlign: "center", fontWeight: 900, color: "#fff" }}>
          <div style={{ fontSize: 66, WebkitTextStroke: "10px #000", paintOrder: "stroke" }}>PESO NOS PNEUS</div>
          <div style={{ fontSize: 170, lineHeight: 1.05, color: peso > 600 ? "#fff" : peso > 300 ? AMAR : "#ff5a5a", WebkitTextStroke: "14px #000", paintOrder: "stroke" }}>{peso} kg</div>
          <div style={{ height: 40, borderRadius: 20, background: "#000a", border: "5px solid #fff", overflow: "hidden" }}><div style={{ height: "100%", width: `${peso / 10}%`, background: peso > 600 ? VERDE : peso > 300 ? AMAR : VERM }} /></div>
          <div style={{ fontSize: 60, marginTop: 16, color: AMAR, WebkitTextStroke: "10px #000", paintOrder: "stroke" }}>−60 kg a cada centímetro</div>
        </div>
      )}
      <Grande a={C[4]} b={C[5]} linhas={[["30 cm", AMAR, 250], ["levam um carro", "#fff", 100]]} y={170} />
      <Grande a={C[5]} b={C[6]} linhas={[["60 cm", VERM, 250], ["levam a caminhonete", "#fff", 92]]} y={170} />
      <Grande a={C[6]} b={sete} linhas={[["e embaixo?", AMAR, 130]]} />
      <Grande a={sete} b={mas} linhas={[["DÊ MEIA-VOLTA", "#fff", 124]]} />
      <Grande a={mas} b={C[8]} linhas={[["JÁ FICOU", "#fff", 130], ["PRESO?", VERM, 160]]} />
      <Passo a={C[8]} b={C[9]} n="1" texto="não ligue o motor" />
      {t >= C[8] + 0.6 && t < C[9] && <Svg><Xis x={520} y={930} r={150} desde={C[8] + 0.6} /></Svg>}
      <Passo a={C[9]} b={porta} n="2" texto="passou da metade da roda? SAIA" />
      <Passo a={porta} b={C[10]} n="2" texto="saia pela JANELA" />
      <Passo a={C[10]} b={C[11]} n="3" texto="suba no teto e ligue 193" />
      {t >= C[11] && (<>
        <AbsoluteFill style={{ background: "rgba(0,0,0,.66)" }} />
        <div style={{ position: "absolute", top: 230, left: 90, right: 40, fontWeight: 900, color: "#fff" }}>
          {[["RUA ALAGADA?", AMAR], ["✔ dê meia-volta", "#fff"], ["✖ não ligue o motor", "#fff"], ["✔ saia pela janela", "#fff"], ["✔ suba no teto + 193", "#fff"], ["✖ não pule na água", "#fff"], ["MANDA PRA ALGUÉM", AMAR]].map(([s, c], i) => {
            const e = suave(t, C[11] + i * 0.12, C[11] + 0.25 + i * 0.12, 0, 1);
            return <div key={s} style={{ fontSize: i === 0 || i === 6 ? 92 : 84, color: c, marginBottom: 34, opacity: e, transform: `translateX(${(1 - e) * -60}px)` }}>{s}</div>;
          })}
          <div style={{ fontSize: 50, color: "#9fe3ff", marginTop: 16 }}>@fisicasemmisteriobr</div>
        </div>
      </>)}
      <div style={{ position: "absolute", top: 44, left: 40, padding: "6px 16px", borderRadius: 10, background: "rgba(0,0,0,.55)", color: "#fff", fontWeight: 800, fontSize: 30 }}>CENAS FEITAS COM IA</div>
      <div style={{ position: "absolute", top: 0, left: 0, height: 10, width: `${(frame / dur) * 100}%`, background: AMAR }} />
      <Legenda palavras={tempos.palavras} cenas={tempos.cenas} />
    </AbsoluteFill>
  );
};
