import React from "react";
import { interpolate } from "remotion";
import tempos from "../../public/Bateria/tempos.json";
import { AMARELO, BarraStatus, Dedo, Short, VERDE, mola, tela, useT } from "../kit";
import { TelaInicial } from "../telas";

const C = tempos.cenas;
const T_PUXA = C[1] + 0.3;
const T_SOLTA = C[1] + 1.3;
const T_LIGA = C[2] + 0.7;
const T_BRILHO_INI = C[4] + 0.5;
const T_BRILHO_FIM = C[4] + 2.0;

const TILES = [
  { e: "📶", n: "Wi-Fi", on: true }, { e: "🔵", n: "Bluetooth", on: false }, { e: "🔦", n: "Lanterna", on: false },
  { e: "🔋", n: "Economia de bateria", on: false }, { e: "✈️", n: "Modo avião", on: false }, { e: "🔕", n: "Não perturbe", on: false },
];
const posTile = (i: number) => ({ x: 40 + (i % 2) * 262 + 124, y: 300 + Math.floor(i / 2) * 150 + 62 });
const SLIDER = { x0: 60, x1: 530, y: 190 };

const Tela: React.FC = () => {
  const { frame, fps, t } = useT();
  const desce = t < T_PUXA ? 0 : interpolate(t, [T_PUXA, T_SOLTA], [0, 1], { extrapolateRight: "clamp" });
  const ligada = t >= T_LIGA;
  const lig = ligada ? mola(frame, T_LIGA, fps, 10) : 0;
  const brilho = interpolate(t, [T_BRILHO_INI, T_BRILHO_FIM], [0.85, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pisca = !ligada && Math.floor(t * 3) % 2 === 0;
  const horas = ligada ? interpolate(t, [T_LIGA, T_LIGA + 1.5], [4, 7], { extrapolateRight: "clamp" }) : 4;
  return (
    <>
      <TelaInicial />
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <BarraStatus cor="transparent" bateria={<span style={{ color: ligada ? AMARELO : pisca ? "#ff5252" : "#fff", fontWeight: 800 }}>{ligada ? "🍃" : "🪫"} 12%</span> } />
      </div>
      {/* painel rápido que desce */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 900, background: "rgba(28,30,34,.97)",
        transform: `translateY(${(desce - 1) * 900}px)`, borderRadius: "0 0 40px 40px", color: "#fff", padding: "80px 0 0" }}>
        <div style={{ padding: "0 40px", fontSize: 26, color: "#bbb" }}>Brilho</div>
        <div style={{ position: "absolute", left: SLIDER.x0, top: SLIDER.y - 22, width: SLIDER.x1 - SLIDER.x0, height: 44, borderRadius: 22, background: "#444" }}>
          <div style={{ width: `${brilho * 100}%`, height: "100%", borderRadius: 22, background: "linear-gradient(90deg,#90caf9,#fff)" }} />
        </div>
        {TILES.map((tl, i) => {
          const p = posTile(i);
          const on = tl.on || (i === 3 && ligada);
          return (
            <div key={i} style={{ position: "absolute", left: p.x - 124, top: p.y - 62, width: 248, height: 124, borderRadius: 30,
              background: on ? (i === 3 ? AMARELO : "#8ab4f8") : "#3a3d42", color: on ? "#111" : "#fff", padding: "18px 20px",
              transform: i === 3 && ligada ? `scale(${1 + (1 - lig) * 0.15})` : undefined }}>
              <div style={{ fontSize: 36 }}>{tl.e}</div>
              <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.1 }}>{tl.n}</div>
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 40, right: 40, top: 770, background: "#2b2e33", borderRadius: 24, padding: "18px 24px",
          display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
          <span>Tempo restante</span>
          <span style={{ fontWeight: 900, fontSize: 40, color: ligada ? VERDE : "#ff5252" }}>≈ {Math.round(horas)} h</span>
        </div>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "#000", opacity: (0.85 - brilho) * 0.8, pointerEvents: "none" }} />
    </>
  );
};

const tile = tela(posTile(3).x, posTile(3).y);

export const Bateria: React.FC = () => (
  <Short
    id="Bateria" tempos={tempos}
    ganchos={[
      { desde: 0, texto: "Bateria acabando cedo?", destaque: ["cedo?"] },
      { desde: C[1], texto: "Economia de bateria", destaque: ["bateria"] },
      { desde: C[4], texto: "Brilho mais baixo ajuda", destaque: ["baixo"] },
    ]}
    cam={[
      { t: 0, s: 1, x: 540, y: 920 }, { t: C[2] - 0.1, s: 1, x: 540, y: 920 },
      { t: C[2] + 0.5, s: 1.5, x: tile.x - 60, y: tile.y + 150 }, { t: C[4] - 0.2, s: 1.5, x: tile.x - 60, y: tile.y + 150 },
      { t: C[4] + 0.3, s: 1.45, x: 540, y: tela(0, 260).y }, { t: C[5] - 0.3, s: 1.45, x: 540, y: tela(0, 260).y },
      { t: C[5], s: 1, x: 540, y: 920 },
    ]}
    sobre={<Dedo some={T_BRILHO_FIM + 0.4} passos={[
      { t: T_PUXA, x: tela(295, 30).x, y: tela(295, 30).y },
      { t: T_SOLTA, x: tela(295, 700).x, y: tela(295, 700).y, acao: "arrasta" },
      { t: T_LIGA, x: tile.x, y: tile.y, acao: "toque" },
      { t: T_BRILHO_INI, x: tela(SLIDER.x0 + 0.85 * (SLIDER.x1 - SLIDER.x0), SLIDER.y).x, y: tela(0, SLIDER.y).y },
      { t: T_BRILHO_FIM, x: tela(SLIDER.x0 + 0.35 * (SLIDER.x1 - SLIDER.x0), SLIDER.y).x, y: tela(0, SLIDER.y).y, acao: "arrasta" },
    ]} />}
    sons={[{ t: T_PUXA, som: "whoosh", vol: 0.6 }, { t: T_LIGA, som: "clique" }, { t: T_LIGA + 0.1, som: "pop" }, { t: T_BRILHO_INI, som: "clique" }]}
    tela={<Tela />}
    final={{ emoji: "🔋", frase: <>Bateria até o<br />fim do dia.</> }}
  />
);
