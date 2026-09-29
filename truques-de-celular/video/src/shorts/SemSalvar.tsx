import React from "react";
import tempos from "../../public/SemSalvar/tempos.json";
import { Avatar, BarraStatus, Dedo, Digitando, Short, VERDE, mola, tela, useT } from "../kit";
import { Balao, CampoMensagem, FundoConversa, TECLA_IR, Teclado, TelaInicial, posApp } from "../telas";

const C = tempos.cenas;
const URL = "wa.me/5511999990000";
const T_NAVEGADOR = C[1] + 1.1;
const T_CAMPO = C[2] + 0.3;
const T_DIGITA = C[2] + 0.8;
const T_IR = C[3] + 0.3;
const T_PAGINA = C[3] + 0.6;
const T_BOTAO = C[3] + 2.2;
const T_CONVERSA = C[3] + 2.5;
const T_ENVIA = C[4] + 2.2;

const Tela: React.FC = () => {
  const { frame, fps, t } = useT();
  if (t < T_NAVEGADOR) return <><TelaInicial /><div style={{ position: "absolute", top: 0, width: "100%" }}><BarraStatus cor="transparent" /></div></>;
  if (t < T_CONVERSA) {
    const abre = mola(frame, T_NAVEGADOR, fps, 16);
    const pagina = t >= T_PAGINA;
    return (
      <div style={{ position: "absolute", inset: 0, background: "#fff", transform: `scale(${0.3 + abre * 0.7})`, opacity: abre }}>
        <BarraStatus cor="#f1f3f4" claro={false} />
        <div style={{ height: 110, background: "#f1f3f4", display: "flex", alignItems: "center", padding: "0 22px" }}>
          <div style={{ flex: 1, height: 72, borderRadius: 36, background: "#fff", border: t >= T_CAMPO && !pagina ? "3px solid #1a73e8" : "1px solid #ddd",
            display: "flex", alignItems: "center", padding: "0 24px", fontSize: 28, color: "#222" }}>
            {pagina ? "🔒 " + URL : t >= T_DIGITA ? <Digitando texto={URL} desde={T_DIGITA} cps={6.5} /> : <span style={{ color: "#888" }}>Pesquisar ou digitar endereço</span>}
          </div>
        </div>
        {!pagina ? (
          <div style={{ textAlign: "center", marginTop: 170, fontSize: 64, fontWeight: 700, color: "#4285F4" }}>🔍</div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 40px" }}>
            <div style={{ width: 150, height: 150, borderRadius: 75, background: VERDE, margin: "0 auto", fontSize: 80,
              display: "flex", alignItems: "center", justifyContent: "center" }}>💬</div>
            <div style={{ fontSize: 34, marginTop: 40, color: "#111" }}>Conversar com</div>
            <div style={{ fontSize: 40, fontWeight: 700, color: "#111" }}>+55 11 99999-0000</div>
            <div style={{ marginTop: 70, background: VERDE, color: "#fff", fontSize: 34, fontWeight: 700, borderRadius: 40,
              padding: "26px 20px", transform: `scale(${t >= T_BOTAO && t < T_BOTAO + 0.3 ? 0.94 : 1})` }}>Continuar para a conversa</div>
          </div>
        )}
        {t >= T_CAMPO && !pagina && <Teclado sobe={mola(frame, T_CAMPO, fps, 16)} />}
      </div>
    );
  }
  const enviada = t >= T_ENVIA;
  return (
    <FundoConversa>
      <BarraStatus />
      <div style={{ height: 130, background: "#075E54", display: "flex", alignItems: "center", gap: 18, padding: "0 24px", color: "#fff" }}>
        <span style={{ fontSize: 36 }}>←</span><Avatar letra="+" cor="#90A4AE" tam={70} />
        <span style={{ fontSize: 34, fontWeight: 700 }}>+55 11 99999-0000</span>
      </div>
      <div style={{ padding: "10px 0" }}>
        <div style={{ margin: "20px auto", width: 380, fontSize: 20, color: "#665", background: "#fff6c4", borderRadius: 12, padding: 12, textAlign: "center" }}>
          Contato não salvo na agenda</div>
        {enviada && <div style={{ transform: `scale(${mola(frame, T_ENVIA, fps, 10)})`, transformOrigin: "right" }}><Balao texto="Oi! Tudo bem? 😊" minha hora="09:41" /></div>}
      </div>
      <CampoMensagem texto={!enviada && t >= C[4] + 0.3 ? <Digitando texto="Oi! Tudo bem? 😊" desde={C[4] + 0.3} cps={10} /> : undefined} />
    </FundoConversa>
  );
};

const nav = posApp(1);
const campo = tela(295, 215);
const botao = tela(295, 690);

export const SemSalvar: React.FC = () => (
  <Short
    id="SemSalvar" tempos={tempos}
    ganchos={[
      { desde: 0, texto: "Mensagem sem salvar o número?", destaque: ["salvar"] },
      { desde: C[1], texto: "Truque do navegador", destaque: ["navegador"] },
      { desde: C[4], texto: "Conversa aberta na hora", destaque: ["na", "hora"] },
    ]}
    cam={[
      { t: 0, s: 1, x: 540, y: 920 }, { t: C[2] - 0.1, s: 1, x: 540, y: 920 },
      { t: C[2] + 0.5, s: 1.65, x: campo.x, y: campo.y + 150 }, { t: C[3] + 0.9, s: 1.65, x: campo.x, y: campo.y + 150 },
      { t: C[3] + 1.4, s: 1.45, x: botao.x, y: botao.y - 80 }, { t: T_CONVERSA, s: 1.45, x: botao.x, y: botao.y - 80 },
      { t: T_CONVERSA + 0.6, s: 1, x: 540, y: 920 },
    ]}
    sobre={<Dedo some={T_CONVERSA + 0.3} passos={[
      { t: C[1] + 0.8, x: tela(nav.x, nav.y).x, y: tela(nav.x, nav.y).y, acao: "toque" },
      { t: T_CAMPO, x: campo.x, y: campo.y, acao: "toque" },
      { t: T_IR, x: tela(TECLA_IR.x, TECLA_IR.y).x, y: tela(TECLA_IR.x, TECLA_IR.y).y, acao: "toque" },
      { t: T_BOTAO, x: botao.x, y: botao.y, acao: "toque" },
    ]} />}
    sons={[
      { t: C[1] + 0.8, som: "clique" }, { t: T_NAVEGADOR, som: "whoosh", vol: 0.5 }, { t: T_CAMPO, som: "clique" },
      { t: T_IR, som: "clique" }, { t: T_BOTAO, som: "clique" }, { t: T_CONVERSA, som: "whoosh", vol: 0.5 }, { t: T_ENVIA, som: "pop" },
    ]}
    tela={<Tela />}
    final={{ emoji: "💬", frase: <>Sem salvar<br />nenhum contato.</> }}
  />
);
