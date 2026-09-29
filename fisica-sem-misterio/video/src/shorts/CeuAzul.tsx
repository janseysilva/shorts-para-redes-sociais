import React from "react";
import { interpolate } from "remotion";
import tempos from "../../public/CeuAzul/tempos.json";
import { AZUL, CLAMP, Cena, Raio, Short, Sol, Tela, sorteio, useT, type Som } from "../espaco";

const C = tempos.cenas;
const ARCO = ["#ff3b3b", "#ff8a1f", "#ffe03b", "#3ddc5a", "#2fb4ff", "#3d5bff", "#9b4dff"];

// ---------- 0: Sol, luz branca e Terra ----------
const Abertura: React.FC = () => {
  const { t } = useT();
  const p = interpolate(t, [0.6, 2.4], [0, 1], CLAMP);
  return (
    <>
      <Sol x={230} y={760} r={130} />
      <div style={{ position: "absolute", left: 800 - 230, top: 1150 - 230, width: 460, height: 460, borderRadius: 230,
        boxShadow: `0 0 90px 30px ${AZUL}66, inset 0 0 60px ${AZUL}99` }} />
      <div style={{ position: "absolute", left: 800 - 215, top: 1150 - 245, fontSize: 380, lineHeight: 1, transform: `rotate(${t * 4}deg)` }}>🌍</div>
      <Tela><Raio x1={340} y1={830} x2={640} y2={1030} cor="#ffffff" largura={14} p={p} /></Tela>
    </>
  );
};

// ---------- 1: prisma separando as cores ----------
const Prisma: React.FC = () => {
  const { t } = useT();
  const lt = t - C[1];
  const pb = interpolate(lt, [0.1, 0.9], [0, 1], CLAMP);
  const pc = interpolate(lt, [0.9, 2.0], [0, 1], CLAMP);
  return (
    <Tela>
      <Raio x1={-20} y1={1010} x2={478} y2={960} cor="#ffffff" largura={16} p={pb} />
      {ARCO.map((c, i) => (
        <Raio key={i} x1={606} y1={962} x2={1100} y2={760 + i * 70} cor={c} largura={16} p={pc} />
      ))}
      <polygon points="540,760 390,1110 690,1110" fill="rgba(170,220,255,.14)" stroke="#dff4ff" strokeWidth={5}
        style={{ filter: "drop-shadow(0 0 18px rgba(170,220,255,.8))" }} />
      <polygon points="540,800 430,1080 560,1080" fill="rgba(255,255,255,.08)" />
    </Tela>
  );
};

// ---------- 2 e 3: moléculas de ar e o azul se espalhando ----------
const RM = sorteio(7);
const MOLECULAS = Array.from({ length: 70 }, () => ({ x: RM() * 1080, y: 420 + RM() * 1000, a: RM() * 6.28, f: 0.5 + RM(), o2: RM() < 0.25 }));
const Moleculas: React.FC = () => {
  const { t } = useT();
  return (
    <Tela>
      {MOLECULAS.map((m, i) => {
        const x = m.x + Math.sin(t * m.f + m.a) * 14, y = m.y + Math.cos(t * m.f * 0.8 + m.a) * 14, r = m.a + t * 0.6;
        const dx = Math.cos(r) * 9, dy = Math.sin(r) * 9, cor = m.o2 ? "#ff9bb0" : "#9fc0ff";
        return (
          <g key={i} opacity={0.75}>
            <circle cx={x - dx} cy={y - dy} r={10} fill={cor} />
            <circle cx={x + dx} cy={y + dy} r={10} fill={cor} />
          </g>
        );
      })}
    </Tela>
  );
};

const Atmosfera: React.FC = () => {
  const { t } = useT();
  const p = interpolate(t - C[2], [0.2, 1.8], [0, 1], CLAMP);
  return (
    <>
      <Moleculas />
      <Tela><Raio x1={-20} y1={930} x2={1100} y2={930} cor="#ffffff" largura={18} p={p} /></Tela>
      <div style={{ position: "absolute", left: 60, top: 1290, fontSize: 40, color: "#cfe0ff", fontWeight: 700 }}>
        <span style={{ color: "#9fc0ff" }}>●●</span> nitrogênio &nbsp;&nbsp; <span style={{ color: "#ff9bb0" }}>●●</span> oxigênio
      </div>
    </>
  );
};

const RF = sorteio(11);
const FOTONS = Array.from({ length: 70 }, (_, i) => {
  const azul = i % 2 === 0;
  return {
    cor: azul ? (RF() < 0.7 ? "#3d8bff" : "#8a5bff") : ARCO[Math.floor(RF() * 4)],
    azul, ini: i * 0.07, y: 930 + (RF() - 0.5) * 70, bate: 180 + RF() * 700, ang: RF() * Math.PI * 2,
  };
});
export const Espalha: React.FC = () => {
  const { t } = useT();
  const lt = t - C[3];
  const V = 560;
  return (
    <>
      <Moleculas />
      <Tela>
        {FOTONS.map((f, i) => {
          const d = (lt - f.ini) * V;
          if (d <= 0) return null;
          let x = -20 + d, y = f.y, vx = 1, vy = 0;
          if (f.azul && d > f.bate + 20) {
            const e = d - f.bate - 20;
            vx = Math.cos(f.ang); vy = Math.sin(f.ang);
            x = f.bate + vx * e; y = f.y + vy * e;
          }
          if (x > 1150 || x < -60 || y < 300 || y > 1600) return null;
          return (
            <g key={i}>
              <line x1={x - vx * 60} y1={y - vy * 60} x2={x} y2={y} stroke={f.cor} strokeWidth={8} strokeLinecap="round" opacity={0.6} />
              <circle cx={x} cy={y} r={11} fill={f.cor} style={{ filter: `drop-shadow(0 0 10px ${f.cor})` }} />
            </g>
          );
        })}
      </Tela>
      <Ondas />
    </>
  );
};

const Ondas: React.FC = () => {
  const { t } = useT();
  const onda = (x0: number, largura: number, comp: number, cor: string) => {
    let d = "";
    for (let x = 0; x <= largura; x += 4) d += `${x === 0 ? "M" : "L"}${x0 + x},${1370 + Math.sin((x / comp) * 6.28 - t * 6) * 26} `;
    return <path d={d} stroke={cor} strokeWidth={7} fill="none" style={{ filter: `drop-shadow(0 0 8px ${cor})` }} />;
  };
  return (
    <>
      <div style={{ position: "absolute", left: 60, top: 1250, width: 960, height: 200, borderRadius: 26, background: "rgba(4,7,20,.7)",
        border: "2px solid rgba(255,255,255,.12)" }} />
      <Tela>{onda(100, 380, 55, "#3d8bff")}{onda(600, 380, 190, "#ff3b3b")}</Tela>
      <div style={{ position: "absolute", left: 90, top: 1262, width: 420, textAlign: "center", fontSize: 34, fontWeight: 800, color: "#8fbfff" }}>azul: onda curta</div>
      <div style={{ position: "absolute", left: 580, top: 1262, width: 420, textAlign: "center", fontSize: 34, fontWeight: 800, color: "#ff8f8f" }}>vermelho: onda longa</div>
    </>
  );
};

// ---------- 4: o azul chega de todas as direções ----------
const Chao: React.FC<{ cor?: string }> = ({ cor = "#04060c" }) => (
  <Tela><path d="M0,1400 C250,1360 450,1385 640,1370 C820,1356 960,1380 1080,1365 L1080,1920 L0,1920 Z" fill={cor} /></Tela>
);

const CeuInteiro: React.FC = () => {
  const { t } = useT();
  const lt = t - C[4];
  const ceu = interpolate(lt, [0.3, 3], [0, 1], CLAMP);
  const olho = { x: 540, y: 1245 };
  return (
    <>
      <div style={{ position: "absolute", inset: 0, opacity: ceu, background: "linear-gradient(180deg, #0b2a7a 0%, #2f7bff 55%, #9fd6ff 100%)" }} />
      <Sol x={880} y={500} r={70} brilho={0.7} />
      <Tela>
        {Array.from({ length: 13 }).map((_, i) => {
          const a = Math.PI + (i / 12) * Math.PI;
          const fr = (lt * 0.7 + i * 0.37) % 1;
          const r = interpolate(fr, [0, 1], [720, 120]);
          const x = olho.x + Math.cos(a) * r, y = olho.y + Math.sin(a) * r;
          const x2 = olho.x + Math.cos(a) * (r - 90), y2 = olho.y + Math.sin(a) * (r - 90);
          return <Raio key={i} x1={x} y1={y} x2={x2} y2={y2} cor="#5aa8ff" largura={10} opacidade={Math.min(1, lt * 2) * Math.sin(fr * Math.PI)} />;
        })}
      </Tela>
      <Chao />
      <div style={{ position: "absolute", left: 540 - 85, top: 1215, fontSize: 170, lineHeight: 1 }}>🧍</div>
    </>
  );
};

// ---------- 5: pôr do sol ----------
const RP = sorteio(5);
const PERDIDOS = Array.from({ length: 22 }, () => ({ f: RP(), ini: RP() * 3.5, ang: -Math.PI / 2 + (RP() - 0.5) * 1.6 }));
const PorDoSol: React.FC = () => {
  const { t } = useT();
  const lt = t - C[5];
  const p = interpolate(lt, [0.3, 2], [0, 1], CLAMP);
  const A = { x: 250, y: 1340 }, B = { x: 820, y: 1255 };
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #120833 0%, #4a1d63 30%, #c2425a 58%, #ff8a3a 78%, #ffc466 92%)" }} />
      <Sol x={150} y={1395} r={120} cor="#ffb45a" />
      <Tela>
        <defs>
          <linearGradient id="gpor" x1={A.x} y1={A.y} x2={B.x} y2={B.y} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fff6dc" /><stop offset="1" stopColor="#ff7a1a" />
          </linearGradient>
        </defs>
        <Raio x1={A.x} y1={A.y} x2={B.x} y2={B.y} cor="url(#gpor)" largura={16} p={p} />
        {PERDIDOS.map((q, i) => {
          const e = lt - 0.4 - q.ini;
          if (e <= 0 || q.f > p) return null;
          const x0 = A.x + (B.x - A.x) * q.f, y0 = A.y + (B.y - A.y) * q.f;
          const x = x0 + Math.cos(q.ang) * e * 260, y = y0 + Math.sin(q.ang) * e * 260;
          return <circle key={i} cx={x} cy={y} r={10} fill="#3d8bff" opacity={Math.max(0, 1 - e / 1.6)} style={{ filter: "drop-shadow(0 0 10px #3d8bff)" }} />;
        })}
      </Tela>
      <Chao cor="#140a14" />
      <div style={{ position: "absolute", left: 820 - 80, top: 1225, fontSize: 160, lineHeight: 1 }}>🧍</div>
    </>
  );
};

// Título, sons e final são os mesmos nas 3 versões (animada, só real, mistura).
export const GANCHOS = [
  { desde: 0, texto: "Por que o céu é AZUL?", destaque: ["AZUL?"] },
  { desde: C[1], texto: "Luz branca = todas as cores", destaque: ["todas", "cores"] },
  { desde: C[2], texto: "Ela entra na atmosfera", destaque: ["atmosfera"] },
  { desde: C[3], texto: "O azul se espalha mais", destaque: ["azul", "espalha"] },
  { desde: C[4], texto: "Azul vindo de todo lado", destaque: ["todo", "lado"] },
  { desde: C[5], texto: "No pôr do sol, sobra o laranja", destaque: ["laranja"] },
];
// Sem whoosh/estrondo nas trocas de frase (Jansey achou parecido com explosão). Só um brilho suave no arco-íris.
export const SONS: Som[] = [{ t: C[1] + 0.9, som: "brilho", vol: 0.35 }];
export const FINAL = { emoji: "🌅", frase: <>Agora você sabe<br />por que o céu é azul.</> };

export const CeuAzul: React.FC = () => (
  <Short id="CeuAzul" tempos={tempos} ganchos={GANCHOS} sons={SONS} final={FINAL}>
    <Cena ini={0} fim={C[1]}><Abertura /></Cena>
    <Cena ini={C[1]} fim={C[2]}><Prisma /></Cena>
    <Cena ini={C[2]} fim={C[3]}><Atmosfera /></Cena>
    <Cena ini={C[3]} fim={C[4]}><Espalha /></Cena>
    <Cena ini={C[4]} fim={C[5]} zoom={0.04}><CeuInteiro /></Cena>
    <Cena ini={C[5]} fim={C[6]} zoom={0.04}><PorDoSol /></Cena>
  </Short>
);
