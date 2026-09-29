import React from "react";
import tempos from "../../public/DigitarFalando/tempos.json";
import { AMARELO, Avatar, BarraStatus, Dedo, Short, VERDE, mola, tela, useT } from "../kit";
import { Balao, FundoConversa, Teclado } from "../telas";

const C = tempos.cenas;
const T_TECLADO = 0.4, T_MIC = C[1] + 0.9, T_FALA = C[2] + 0.2, T_ENVIA = C[4] + 1.0;
const TEXTO = "Oi, pessoal! Amanhã a reunião vai ser às dez horas. Tragam o relatório, por favor.";

const Tela: React.FC = () => {
  const { frame, fps, t } = useT();
  const ouvindo = t >= T_MIC && t < T_ENVIA;
  const n = t >= T_FALA ? Math.min(TEXTO.length, Math.floor((t - T_FALA) * 14.5)) : 0;
  const escrito = TEXTO.slice(0, n);
  const pontua = t >= C[3];
  return (
    <FundoConversa>
      <BarraStatus />
      <div style={{ height: 130, background: "#075E54", display: "flex", alignItems: "center", gap: 18, padding: "0 24px", color: "#fff" }}>
        <span style={{ fontSize: 36 }}>←</span><Avatar letra="E" cor="#5C6BC0" tam={70} /><span style={{ fontSize: 34, fontWeight: 700 }}>Equipe</span>
      </div>
      <div style={{ paddingTop: 20 }}>
        <Balao autor="Rafael" texto="Alguém sabe o horário de amanhã?" hora="18:02" />
        {t >= T_ENVIA && <div style={{ transform: `scale(${mola(frame, T_ENVIA, fps, 10)})`, transformOrigin: "right" }}><Balao minha texto={TEXTO} hora="18:05" /></div>}
      </div>
      {t < T_ENVIA && (
        <>
          {/* campo de texto que cresce */}
          <div style={{ position: "absolute", left: 14, right: 14, bottom: 440, background: "#fff", borderRadius: 30, padding: "20px 26px",
            fontSize: 28, color: n ? "#111" : "#999", minHeight: 76, lineHeight: 1.35 }}>
            {n ? escrito.split("").map((ch, i) => (
              <span key={i} style={{ background: pontua && ",.!".includes(ch) ? AMARELO : "transparent", fontWeight: pontua && ",.!".includes(ch) ? 900 : 400 }}>{ch}</span>
            )) : "Mensagem"}
          </div>
          {!ouvindo ? (
            <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - mola(frame, T_TECLADO, fps, 16)) * 400}px)` }}>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 380, height: 60, background: "#e3e6ea", display: "flex",
                justifyContent: "flex-end", alignItems: "center", gap: 40, padding: "0 30px", fontSize: 32, borderBottom: "1px solid #ccd" }}>
                <span>😊</span><span>⚙️</span><span style={{ background: "#fff", borderRadius: 30, padding: "4px 12px" }}>🎤</span>
              </div>
              <Teclado sobe={1} />
            </div>
          ) : (
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 440, background: "#e3e6ea", display: "flex",
              flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
              <div style={{ fontSize: 30, color: "#444" }}>{t < T_FALA + 0.3 ? "Fale agora" : "Ouvindo..."}</div>
              <div style={{ width: 150, height: 150, borderRadius: 75, background: "#1a73e8", fontSize: 70, display: "flex", alignItems: "center",
                justifyContent: "center", boxShadow: `0 0 0 ${18 + Math.sin(t * 10) * 12}px rgba(26,115,232,.25)` }}>🎤</div>
            </div>
          )}
        </>
      )}
      {pontua && t < T_ENVIA && (
        <div style={{ position: "absolute", left: 60, right: 60, top: 260, display: "flex", flexDirection: "column", gap: 14 }}>
          {[["“vírgula”", ","], ["“ponto final”", "."]].map(([f, s], i) => (
            <div key={i} style={{ background: "#111", color: "#fff", borderRadius: 20, padding: "14px 22px", fontSize: 30, fontWeight: 700,
              transform: `scale(${mola(frame, C[3] + 0.2 + i * 0.4, fps, 10)})` }}>🗣️ {f} → <span style={{ color: AMARELO, fontSize: 40 }}>{s}</span></div>
          ))}
        </div>
      )}
      {t >= T_ENVIA - 0.4 && t < T_ENVIA && (
        <div style={{ position: "absolute", right: 30, bottom: 460, width: 80, height: 80, borderRadius: 40, background: VERDE, color: "#fff",
          fontSize: 38, display: "flex", alignItems: "center", justifyContent: "center" }}>➤</div>
      )}
    </FundoConversa>
  );
};

const mic = tela(522, 1120 - 380 - 30), envia = tela(520, 1120 - 500);
export const DigitarFalando: React.FC = () => (
  <Short
    id="DigitarFalando" tempos={tempos}
    ganchos={[
      { desde: 0, texto: "Cansou de digitar? ✍️", destaque: ["digitar?"] },
      { desde: C[1], texto: "Fale e o celular escreve", destaque: ["escreve"] },
      { desde: C[3], texto: "Até com pontuação", destaque: ["pontuação"] },
    ]}
    cam={[{ t: 0, s: 1, x: 540, y: 920 }, { t: C[1] + 0.2, s: 1, x: 540, y: 920 },
      { t: C[1] + 0.8, s: 1.45, x: mic.x - 150, y: mic.y - 60 }, { t: C[2] + 0.2, s: 1.45, x: mic.x - 150, y: mic.y - 60 },
      { t: C[2] + 0.8, s: 1.3, x: 540, y: tela(0, 560).y }, { t: C[5] - 0.2, s: 1.3, x: 540, y: tela(0, 560).y }, { t: C[5], s: 1, x: 540, y: 920 }]}
    sobre={<Dedo some={T_ENVIA + 0.4} passos={[{ t: T_MIC, x: mic.x, y: mic.y, acao: "toque" }, { t: T_ENVIA, x: envia.x, y: envia.y, acao: "toque" }]} />}
    sons={[{ t: T_MIC, som: "clique" }, { t: T_MIC + 0.1, som: "pop" }, { t: C[3] + 0.2, som: "pop", vol: 0.5 }, { t: C[3] + 0.6, som: "pop", vol: 0.5 }, { t: T_ENVIA, som: "whoosh", vol: 0.5 }]}
    tela={<Tela />}
    final={{ emoji: "🎤", frase: <>Fale e o texto<br />aparece.</> }}
  />
);
