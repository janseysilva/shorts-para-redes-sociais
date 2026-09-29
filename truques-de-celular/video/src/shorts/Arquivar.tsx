import React from "react";
import { interpolate } from "remotion";
import tempos from "../../public/Arquivar/tempos.json";
import { Dedo, Short, mola, tela, useT } from "../kit";
import { CONVERSAS, IconeBarra, LINHA_CONV, ListaConversas, TOPO_LISTA, posConversa } from "../telas";

const C = tempos.cenas;
const ALVO = 2;
const T_SEGURA = C[1] + 0.5, T_SELEC = T_SEGURA + 0.8, T_ARQ = C[2] + 0.7, T_SAI = T_ARQ + 0.2, T_ABRE = C[4] + 1.3;
const LISTA = CONVERSAS.map((c, i) => (i === ALVO ? { nome: "Surpresa da Ju 🎁", msg: "Ninguém conta pra ela!", hora: "10:05", cor: "#AB47BC", letra: "S" } : c));
const FAIXA = 90; // altura da linha "Arquivadas"

const Tela: React.FC = () => {
  const { frame, fps, t } = useT();
  if (t >= T_ABRE + 0.2) {
    return (
      <ListaConversas lista={[LISTA[ALVO]]} topo={
        <div style={{ position: "absolute", top: 50, left: 0, right: 0, height: 130, background: "#075E54", color: "#fff", display: "flex",
          alignItems: "center", gap: 22, padding: "0 28px", fontSize: 40, fontWeight: 700 }}>← Arquivadas</div>} />
    );
  }
  const sai = t >= T_SAI ? mola(frame, T_SAI, fps, 16) : 0;
  const faixa = t >= T_SAI ? mola(frame, T_SAI + 0.3, fps, 14) : 0;
  const y = (i: number) => {
    if (i === ALVO) return ALVO * LINHA_CONV + FAIXA * faixa;
    const pos = i > ALVO ? i - sai : i;
    return pos * LINHA_CONV + FAIXA * faixa;
  };
  return (
    <>
      <ListaConversas lista={LISTA} selecionada={t >= T_SELEC && t < T_SAI ? ALVO : -1}
        icones={<><IconeBarra e="📌" /><IconeBarra e="🗑️" /><IconeBarra e="🔇" /><IconeBarra e="📦" ativo={t >= T_ARQ && t < T_ARQ + 0.3} /></>}
        y={y} opacidade={(i) => (i === ALVO ? 1 - sai : 1)} />
      {faixa > 0 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: TOPO_LISTA, height: FAIXA * faixa, overflow: "hidden", background: t >= T_ABRE ? "#e8f5e9" : "#fff",
          display: "flex", alignItems: "center", gap: 22, padding: "0 40px", fontSize: 30, fontWeight: 700, color: "#111", borderBottom: "1px solid #eee" }}>
          📦 Arquivadas <span style={{ marginLeft: "auto", color: "#25D366", fontSize: 26 }}>1</span>
        </div>
      )}
      {t >= T_SAI && t < T_SAI + 1 && (
        <div style={{ position: "absolute", left: 60, right: 60, bottom: 120, background: "#323232", color: "#fff", borderRadius: 14, padding: "20px 26px",
          fontSize: 26, opacity: interpolate(t, [T_SAI, T_SAI + 0.2, T_SAI + 0.8, T_SAI + 1], [0, 1, 1, 0]) }}>Conversa arquivada</div>
      )}
    </>
  );
};

const p = posConversa(ALVO), alvo = tela(p.x, p.y), arq = tela(535, 115), arquivadas = tela(250, TOPO_LISTA + FAIXA / 2);
export const Arquivar: React.FC = () => (
  <Short
    id="Arquivar" tempos={tempos}
    ganchos={[
      { desde: 0, texto: "Esconder conversa sem apagar? 🤫", destaque: ["sem", "apagar?"] },
      { desde: C[1], texto: "Arquive a conversa", destaque: ["Arquive"] },
      { desde: C[4], texto: "Ela fica em Arquivadas", destaque: ["Arquivadas"] },
    ]}
    cam={[{ t: 0, s: 1, x: 540, y: 920 }, { t: C[1] - 0.1, s: 1, x: 540, y: 920 }, { t: C[1] + 0.5, s: 1.5, x: alvo.x, y: alvo.y + 40 },
      { t: C[2] + 0.2, s: 1.5, x: alvo.x, y: alvo.y + 40 }, { t: C[2] + 0.6, s: 1.3, x: 540, y: tela(0, 330).y }, { t: C[5] - 0.2, s: 1.3, x: 540, y: tela(0, 330).y }, { t: C[5], s: 1, x: 540, y: 920 }]}
    sobre={<Dedo some={T_ABRE + 0.4} passos={[{ t: T_SEGURA, x: alvo.x, y: alvo.y, acao: "segura" }, { t: T_ARQ, x: arq.x, y: arq.y, acao: "toque" },
      { t: T_ABRE, x: arquivadas.x, y: arquivadas.y, acao: "toque" }]} />}
    sons={[{ t: T_SELEC, som: "clique" }, { t: T_ARQ, som: "clique" }, { t: T_SAI, som: "whoosh", vol: 0.6 }, { t: T_SAI + 0.3, som: "pop" }, { t: T_ABRE, som: "clique" }]}
    tela={<Tela />}
    final={{ emoji: "📦", frase: <>Escondida,<br />não apagada.</> }}
  />
);
