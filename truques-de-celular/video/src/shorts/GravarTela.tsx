import React from "react";
import { interpolate } from "remotion";
import tempos from "../../public/GravarTela/tempos.json";
import { BarraStatus, Dedo, Dialogo, Short, mola, tela, useT } from "../kit";
import { APPS, PainelRapido, TelaInicial, posApp, posTile } from "../telas";

const C = tempos.cenas;
const T_PUXA = C[1] + 0.3, T_SOLTA = C[1] + 1.2, T_GRAVAR = C[2] + 0.5, T_DIALOGO = C[2] + 0.8, T_INICIAR = C[2] + 2.0, T_REC = C[2] + 3.2;
const T_GALERIA = C[3] + 0.9, T_PARA = C[4] + 1.0;
const TILES = [{ e: "📶", n: "Wi-Fi", on: true }, { e: "🔵", n: "Bluetooth" }, { e: "🔦", n: "Lanterna" },
  { e: "⏺️", n: "Gravar tela" }, { e: "✈️", n: "Modo avião" }, { e: "🔕", n: "Não perturbe" }];

const Galeria: React.FC<{ nova?: number }> = ({ nova = 0 }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
    <BarraStatus cor="#fff" claro={false} />
    <div style={{ padding: "26px 30px", fontSize: 40, fontWeight: 800, color: "#111" }}>Galeria</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, padding: "0 6px" }}>
      {nova > 0 && (
        <div style={{ height: 190, background: "linear-gradient(135deg,#4a2fbd,#26c6da)", position: "relative", transform: `scale(${nova})`, outline: "5px solid #FFD43B" }}>
          <span style={{ position: "absolute", left: 10, bottom: 8, color: "#fff", fontSize: 22, fontWeight: 800 }}>▶ 0:12</span>
        </div>
      )}
      {["#ffb74d", "#81c784", "#64b5f6", "#e57373", "#ba68c8", "#4db6ac", "#f06292", "#9575cd", "#aed581"].map((c, i) => (
        <div key={i} style={{ height: 190, background: `linear-gradient(135deg, ${c}, #555)` }} />
      ))}
    </div>
  </div>
);

const Tela: React.FC = () => {
  const { frame, fps, t } = useT();
  const gravando = t >= T_REC && t < T_PARA;
  const desce = t < T_PUXA ? 0 : t < T_GRAVAR + 0.2 ? interpolate(t, [T_PUXA, T_SOLTA], [0, 1], { extrapolateRight: "clamp" })
    : 1 - interpolate(t, [T_GRAVAR + 0.2, T_GRAVAR + 0.6], [0, 1], { extrapolateRight: "clamp" });
  const contagem = t >= T_INICIAR + 0.2 && t < T_REC ? 3 - Math.floor((t - T_INICIAR - 0.2) / 0.34) : 0;
  const naGaleria = t >= T_GALERIA + 0.2;
  return (
    <>
      {t >= T_PARA + 0.3 ? <Galeria nova={mola(frame, T_PARA + 0.5, fps, 10)} /> : naGaleria ? <Galeria /> : <TelaInicial />}
      {!naGaleria && t < T_PARA && <div style={{ position: "absolute", top: 0, width: "100%" }}><BarraStatus cor="transparent" /></div>}
      <PainelRapido desce={desce} tiles={TILES} ligado={t >= T_GRAVAR ? 3 : -1} />
      {t >= T_DIALOGO && t < T_INICIAR + 0.2 && <Dialogo titulo="Começar a gravar a tela?" opcoes={["Iniciar", "Cancelar"]} marcada={t >= T_INICIAR ? 0 : -1} aparece={mola(frame, T_DIALOGO, fps, 14)} />}
      {contagem > 0 && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.35)", display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 220, fontWeight: 900 }}>{contagem}</div>
      )}
      {gravando && (
        <>
          <div style={{ position: "absolute", inset: 0, border: "8px solid #e53935", borderRadius: 52, pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: 20, top: 8, background: "#e53935", color: "#fff", fontSize: 22, fontWeight: 800, borderRadius: 18,
            padding: "4px 14px", opacity: Math.floor(t * 2) % 2 ? 1 : 0.7 }}>⏺ 00:{String(Math.floor(t - T_REC)).padStart(2, "0")}</div>
        </>
      )}
      {t >= T_PARA && t < T_PARA + 1.3 && (
        <div style={{ position: "absolute", left: 30, right: 30, top: 70, background: "#323232", color: "#fff", borderRadius: 18, padding: "20px 24px", fontSize: 26,
          opacity: interpolate(t, [T_PARA, T_PARA + 0.2, T_PARA + 1.1, T_PARA + 1.3], [0, 1, 1, 0]) }}>✅ Gravação salva na galeria</div>
      )}
    </>
  );
};

const tile = tela(posTile(3).x, posTile(3).y), iniciar = tela(430, 1120 / 2 + 20), gal = posApp(APPS.findIndex((a) => a.n === "Galeria")),
  galeria = tela(gal.x, gal.y), chip = tela(90, 25);
export const GravarTela: React.FC = () => (
  <Short
    id="GravarTela" tempos={tempos}
    ganchos={[
      { desde: 0, texto: "Mostrar como faz no celular?", destaque: ["Mostrar"] },
      { desde: C[1], texto: "Grave a tela", destaque: ["Grave"] },
      { desde: C[4], texto: "O vídeo vai pra galeria", destaque: ["galeria"] },
    ]}
    cam={[{ t: 0, s: 1, x: 540, y: 920 }, { t: C[2] - 0.1, s: 1, x: 540, y: 920 }, { t: C[2] + 0.4, s: 1.5, x: tile.x - 60, y: tile.y + 100 },
      { t: T_DIALOGO, s: 1.5, x: tile.x - 60, y: tile.y + 100 }, { t: T_DIALOGO + 0.4, s: 1, x: 540, y: 920 }, { t: C[4] + 0.4, s: 1, x: 540, y: 920 },
      { t: C[4] + 0.9, s: 1.6, x: chip.x + 200, y: chip.y + 200 }, { t: T_PARA + 0.4, s: 1.6, x: chip.x + 200, y: chip.y + 200 }, { t: T_PARA + 1.0, s: 1.3, x: 540, y: tela(0, 380).y },
      { t: C[5] - 0.2, s: 1.3, x: 540, y: tela(0, 380).y }, { t: C[5], s: 1, x: 540, y: 920 }]}
    sobre={<Dedo some={T_PARA + 0.4} passos={[
      { t: T_PUXA, x: tela(295, 30).x, y: tela(295, 30).y }, { t: T_SOLTA, x: tela(295, 700).x, y: tela(295, 700).y, acao: "arrasta" },
      { t: T_GRAVAR, x: tile.x, y: tile.y, acao: "toque" }, { t: T_INICIAR, x: iniciar.x, y: iniciar.y, acao: "toque" },
      { t: T_GALERIA, x: galeria.x, y: galeria.y, acao: "toque" }, { t: T_PARA, x: chip.x, y: chip.y, acao: "toque" },
    ]} />}
    sons={[{ t: T_PUXA, som: "whoosh", vol: 0.5 }, { t: T_GRAVAR, som: "clique" }, { t: T_INICIAR, som: "clique" }, { t: T_REC, som: "pop" }, { t: T_GALERIA, som: "clique" },
      { t: T_PARA, som: "clique" }, { t: T_PARA + 0.5, som: "pop" }]}
    tela={<Tela />}
    final={{ emoji: "⏺️", frase: <>Tela gravada<br />em segundos.</> }}
  />
);
