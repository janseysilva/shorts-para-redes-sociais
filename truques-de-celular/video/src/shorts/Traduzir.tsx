import React from "react";
import { interpolate } from "remotion";
import tempos from "../../public/Traduzir/tempos.json";
import { BarraStatus, Dedo, Short, mola, tela, useT } from "../kit";

const C = tempos.cenas;
const T_APP = 0.3, T_CAM = C[1] + 1.6, T_APONTA = C[2] + 0.2, T_TRADUZ = C[3] + 0.2;

const ORIGINAL = ["MENU", "Coffee ........ $3", "Orange juice .. $4", "Cheese bread .. $5", "Chocolate cake  $6"];
const TRADUZIDO = ["CARDÁPIO", "Café ........... $3", "Suco de laranja $4", "Pão de queijo . $5", "Bolo de chocolate $6"];

const Quadro: React.FC<{ linhas: string[]; estilo?: React.CSSProperties }> = ({ linhas, estilo }) => (
  <div style={{ width: 460, background: "#1f3b2f", border: "12px solid #7a5230", borderRadius: 12, padding: "30px 26px", color: "#f6f1e3",
    fontFamily: "Segoe Print, Comic Sans MS, cursive", boxShadow: "0 10px 30px rgba(0,0,0,.5)", ...estilo }}>
    {linhas.map((l, i) => (
      <div key={i} style={{ fontSize: i === 0 ? 46 : 29, fontWeight: i === 0 ? 900 : 400, textAlign: i === 0 ? "center" : "left", marginBottom: 16, whiteSpace: "pre" }}>{l}</div>
    ))}
  </div>
);

const Tela: React.FC = () => {
  const { frame, fps, t } = useT();
  if (t < T_CAM + 0.2) {
    const abre = mola(frame, T_APP, fps, 16);
    return (
      <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: abre }}>
        <BarraStatus cor="#fff" claro={false} />
        <div style={{ padding: "26px 30px", fontSize: 40, fontWeight: 700, color: "#1a73e8" }}>Tradutor</div>
        <div style={{ display: "flex", justifyContent: "space-around", fontSize: 30, fontWeight: 700, color: "#1a73e8", padding: "10px 20px" }}>
          <span>Inglês</span><span>⇄</span><span>Português</span></div>
        <div style={{ margin: 26, height: 300, borderRadius: 24, background: "#f1f3f4", padding: 26, fontSize: 34, color: "#999" }}>Digite o texto</div>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: 40 }}>
          {[["📷", "Câmera"], ["🎙️", "Conversa"], ["✍️", "Escrever"]].map(([e, n]) => (
            <div key={n} style={{ textAlign: "center", fontSize: 26, color: "#333" }}>
              <div style={{ width: 120, height: 120, borderRadius: 60, background: n === "Câmera" && t >= T_CAM ? "#1a73e8" : "#e8f0fe", fontSize: 56,
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>{e}</div>{n}</div>
          ))}
        </div>
      </div>
    );
  }
  const aponta = mola(frame, T_APONTA, fps, 14);
  const varre = interpolate(t, [T_TRADUZ, T_TRADUZ + 1.2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", inset: 0, background: "#3b3530", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 65, top: 230, transform: `scale(${0.85 + 0.15 * aponta}) rotate(${-4 * (1 - aponta)}deg)` }}>
        <Quadro linhas={ORIGINAL} />
        {/* tradução por cima, revelada por uma linha que varre de cima pra baixo */}
        <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 ${(1 - varre) * 100}% 0)` }}>
          <Quadro linhas={TRADUZIDO} estilo={{ background: "#244a39", color: "#fffbe6" }} />
        </div>
        {varre > 0 && varre < 1 && <div style={{ position: "absolute", left: -10, right: -10, top: `${varre * 100}%`, height: 6, background: "#8ab4f8", boxShadow: "0 0 20px #8ab4f8" }} />}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 170, background: "rgba(0,0,0,.55)", color: "#fff", display: "flex",
        justifyContent: "space-around", alignItems: "flex-end", paddingBottom: 26, fontSize: 30, fontWeight: 700 }}>
        <span>Inglês</span><span>→</span><span>Português</span></div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 170, background: "rgba(0,0,0,.55)" }} />
    </div>
  );
};

const cam = tela(115, 662);
export const Traduzir: React.FC = () => (
  <Short
    id="Traduzir" tempos={tempos}
    ganchos={[
      { desde: 0, texto: "Não entende o cardápio? 🤔", destaque: ["cardápio?"] },
      { desde: C[1], texto: "Traduza com a câmera", destaque: ["câmera"] },
      { desde: C[3], texto: "Tradução na hora", destaque: ["na", "hora"] },
    ]}
    cam={[{ t: 0, s: 1, x: 540, y: 920 }, { t: C[1] + 0.8, s: 1, x: 540, y: 920 }, { t: C[1] + 1.3, s: 1.4, x: cam.x + 120, y: cam.y - 100 },
      { t: T_CAM + 0.2, s: 1.4, x: cam.x + 120, y: cam.y - 100 }, { t: T_CAM + 0.7, s: 1.25, x: 540, y: tela(0, 480).y }, { t: C[5] - 0.2, s: 1.25, x: 540, y: tela(0, 480).y }, { t: C[5], s: 1, x: 540, y: 920 }]}
    sobre={<Dedo some={T_CAM + 0.4} passos={[{ t: T_CAM, x: cam.x, y: cam.y, acao: "toque" }]} />}
    sons={[{ t: T_CAM, som: "clique" }, { t: T_APONTA, som: "whoosh", vol: 0.4 }, { t: T_TRADUZ, som: "whoosh", vol: 0.6 }, { t: T_TRADUZ + 1.2, som: "pop" }]}
    tela={<Tela />}
    final={{ emoji: "🌎", frase: <>Qualquer língua,<br />na hora.</> }}
  />
);
