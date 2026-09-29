import React from "react";
import { interpolate } from "remotion";
import tempos from "../../public/OuvirAudio/tempos.json";
import { Avatar, BarraStatus, Dedo, Short, VERDE, mola, tela, useT } from "../kit";
import { Balao, CampoMensagem, FundoConversa } from "../telas";

const C = tempos.cenas;
const T_SEGURA = C[1] + 0.4, T_TRAVA = C[1] + 1.6, T_PARA = C[2] + 1.6, T_PLAY = C[3] + 0.5, T_ENVIA = C[4] + 1.2;
const MIC = { x: 537, y: 1062 };

const Onda: React.FC<{ n?: number; progresso?: number; vivo?: boolean }> = ({ n = 28, progresso = -1, vivo }) => {
  const { t } = useT();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, height: 50 }}>
      {Array.from({ length: n }).map((_, i) => {
        const h = vivo ? 10 + Math.abs(Math.sin(t * 9 + i * 1.7)) * 38 : 10 + Math.abs(Math.sin(i * 1.7)) * 34;
        return <div key={i} style={{ width: 6, height: h, borderRadius: 3, background: progresso >= 0 && i / n < progresso ? "#34B7F1" : "#8a9a94" }} />;
      })}
    </div>
  );
};

const Tela: React.FC = () => {
  const { frame, fps, t } = useT();
  const gravando = t >= T_SEGURA && t < T_PARA;
  const travado = t >= T_TRAVA && t < T_PARA;
  const revisando = t >= T_PARA && t < T_ENVIA;
  const seg = gravando ? Math.floor(t - T_SEGURA) : 7;
  const prog = t >= T_PLAY ? interpolate(t, [T_PLAY, T_PLAY + 3], [0, 1], { extrapolateRight: "clamp" }) : 0;
  return (
    <FundoConversa>
      <BarraStatus />
      <div style={{ height: 130, background: "#075E54", display: "flex", alignItems: "center", gap: 18, padding: "0 24px", color: "#fff" }}>
        <span style={{ fontSize: 36 }}>←</span><Avatar letra="A" cor="#FFA726" tam={70} /><span style={{ fontSize: 34, fontWeight: 700 }}>Ana Paula</span>
      </div>
      <div style={{ paddingTop: 20 }}>
        <Balao texto="Me conta como foi a entrevista!" hora="09:30" />
        {t >= T_ENVIA && (
          <div style={{ transform: `scale(${mola(frame, T_ENVIA, fps, 10)})`, transformOrigin: "right" }}>
            <Balao minha hora="09:41" texto={<div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontSize: 34 }}>▶</span><Onda n={20} /><span style={{ fontSize: 20 }}>0:07</span></div>} />
          </div>
        )}
      </div>
      {!gravando && !revisando && <CampoMensagem />}
      {gravando && !travado && (
        <>
          <div style={{ position: "absolute", left: MIC.x - 40, top: MIC.y - 300, width: 80, height: 240, borderRadius: 40, background: "#fff",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "20px 0", fontSize: 36 }}>
            <span>🔒</span><span style={{ fontSize: 28 }}>⌃</span></div>
          <div style={{ position: "absolute", left: 14, right: 110, bottom: 18, height: 76, background: "#fff", borderRadius: 38, display: "flex",
            alignItems: "center", gap: 14, padding: "0 26px", fontSize: 28, color: "#e53935" }}>🔴 0:0{seg} <span style={{ color: "#999", fontSize: 24 }}>◀ deslize para cancelar</span></div>
          <div style={{ position: "absolute", left: MIC.x - 60, top: MIC.y - 60, width: 120, height: 120, borderRadius: 60, background: VERDE,
            fontSize: 50, display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(1.1)" }}>🎤</div>
        </>
      )}
      {(travado || revisando) && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 200, background: "#fff", borderRadius: "30px 30px 0 0",
          padding: "20px 26px", boxShadow: "0 -6px 20px rgba(0,0,0,.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
            {travado ? <span style={{ color: "#e53935" }}>🔴 0:0{seg}</span> : <span style={{ fontSize: 40, transform: `scale(${t >= T_PLAY && t < T_PLAY + 0.3 ? 1.3 : 1})` }}>{t >= T_PLAY ? "⏸" : "▶"}</span>}
            <Onda vivo={travado} progresso={revisando ? prog : -1} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18 }}>
            <span style={{ fontSize: 40 }}>🗑️</span>
            {travado && <span style={{ fontSize: 44, color: "#e53935" }}>⏹</span>}
            <span style={{ width: 90, height: 90, borderRadius: 45, background: VERDE, color: "#fff", fontSize: 40, display: "flex",
              alignItems: "center", justifyContent: "center" }}>➤</span>
          </div>
        </div>
      )}
    </FundoConversa>
  );
};

const mic = tela(MIC.x, MIC.y), trava = tela(MIC.x, MIC.y - 250), parar = tela(295, 1120 - 62), play = tela(52, 1120 - 160), envia = tela(515, 1120 - 62);
export const OuvirAudio: React.FC = () => (
  <Short
    id="OuvirAudio" tempos={tempos}
    ganchos={[
      { desde: 0, texto: "Áudio que você se arrependeu? 🙈", destaque: ["arrependeu?"] },
      { desde: C[1], texto: "Ouça antes de mandar", destaque: ["antes"] },
      { desde: C[4], texto: "Envia ou apaga", destaque: ["Envia", "apaga"] },
    ]}
    cam={[{ t: 0, s: 1, x: 540, y: 920 }, { t: C[1] - 0.1, s: 1, x: 540, y: 920 },
      { t: C[1] + 0.6, s: 1.55, x: 540 + 60, y: tela(0, 900).y }, { t: T_ENVIA, s: 1.55, x: 540 + 60, y: tela(0, 900).y }, { t: T_ENVIA + 0.6, s: 1.45, x: 600, y: tela(0, 330).y }, { t: C[5] - 0.2, s: 1.45, x: 600, y: tela(0, 330).y }, { t: C[5], s: 1, x: 540, y: 920 }]}
    sobre={<Dedo some={T_ENVIA + 0.4} passos={[
      { t: T_SEGURA, x: mic.x, y: mic.y, acao: "segura" },
      { t: T_TRAVA, x: trava.x, y: trava.y, acao: "arrasta" },
      { t: T_PARA, x: parar.x, y: parar.y, acao: "toque" },
      { t: T_PLAY, x: play.x, y: play.y, acao: "toque" },
      { t: T_ENVIA, x: envia.x, y: envia.y, acao: "toque" },
    ]} />}
    sons={[{ t: T_SEGURA, som: "clique" }, { t: T_TRAVA, som: "pop" }, { t: T_PARA, som: "clique" }, { t: T_PLAY, som: "clique" }, { t: T_ENVIA, som: "whoosh", vol: 0.5 }, { t: T_ENVIA + 0.1, som: "pop" }]}
    tela={<Tela />}
    final={{ emoji: "🎙️", frase: <>Áudio sem<br />arrependimento.</> }}
  />
);
