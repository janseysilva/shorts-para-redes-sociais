import React from "react";
import tempos from "../../public/ApagarMensagem/tempos.json";
import { Avatar, BarraStatus, Dedo, Dialogo, Short, mola, tela, useT } from "../kit";
import { Balao, CampoMensagem, FundoConversa } from "../telas";

const C = tempos.cenas;
const T_ENVIADA = 0.5;
const T_SEGURA = C[1] + 0.5;
const T_SELEC = T_SEGURA + 0.8;
const T_LIXO = C[2] + 0.6;
const T_DIALOGO = C[2] + 0.8;
const T_TODOS = C[3] + 0.6;
const T_APAGOU = C[3] + 0.9;

const Tela: React.FC = () => {
  const { frame, fps, t } = useT();
  const selecionada = t >= T_SELEC && t < T_APAGOU;
  const apagou = t >= T_APAGOU;
  return (
    <FundoConversa>
      <BarraStatus />
      {selecionada ? (
        <div style={{ height: 130, background: "#0b3d33", display: "flex", alignItems: "center", gap: 30, padding: "0 30px", color: "#fff", fontSize: 38 }}>
          <span>←</span><span style={{ flex: 1, fontWeight: 700 }}>1</span><span>⭐</span>
          <span style={{ padding: 8, borderRadius: 40, background: t >= T_LIXO && t < T_LIXO + 0.3 ? "rgba(255,255,255,.4)" : "transparent" }}>🗑️</span><span>↪️</span>
        </div>
      ) : (
        <div style={{ height: 130, background: "#075E54", display: "flex", alignItems: "center", gap: 18, padding: "0 24px", color: "#fff" }}>
          <span style={{ fontSize: 36 }}>←</span><Avatar letra="💼" cor="#5C6BC0" tam={70} />
          <div><div style={{ fontSize: 34, fontWeight: 700 }}>Trabalho</div><div style={{ fontSize: 22, opacity: 0.85 }}>Ana, Carlos, Rafael, você</div></div>
        </div>
      )}
      <div style={{ paddingTop: 20 }}>
        <Balao autor="Carlos" texto="Reunião amanhã às 9h, pessoal" hora="08:40" />
        <Balao autor="Ana" cor="#8E24AA" texto="Ok! 👍" hora="08:42" />
        {t >= T_ENVIADA && (
          <div style={{ transform: `scale(${mola(frame, T_ENVIADA, fps, 10)})`, transformOrigin: "right" }}>
            <Balao minha hora="08:47" selecionado={selecionada}
              texto={apagou
                ? <span style={{ color: "#777", fontStyle: "italic" }}>🚫 Você apagou esta mensagem</span>
                : "Amor, traz pão na volta? ❤️"} />
          </div>
        )}
      </div>
      <CampoMensagem />
      {t >= T_DIALOGO && !apagou && (
        <Dialogo titulo="Apagar mensagem?" opcoes={["Apagar para todos", "Apagar para mim", "Cancelar"]}
          marcada={t >= T_TODOS ? 0 : -1} aparece={mola(frame, T_DIALOGO, fps, 14)} />
      )}
    </FundoConversa>
  );
};

const balao = tela(400, 180 + 20 + 2 * 120 + 60);
const lixo = tela(398, 115);
const todos = tela(380, 470);

export const ApagarMensagem: React.FC = () => (
  <Short
    id="ApagarMensagem" tempos={tempos} tremor={T_APAGOU}
    ganchos={[
      { desde: 0, texto: "Mandou no grupo errado? 😱", destaque: ["errado?"] },
      { desde: C[1], texto: "Apague para todos", destaque: ["todos"] },
      { desde: C[4], texto: "Até uns 2 dias depois", destaque: ["2", "dias"] },
    ]}
    cam={[
      { t: 0, s: 1, x: 540, y: 920 }, { t: 0.3, s: 1, x: 540, y: 920 },
      { t: 1.1, s: 1.55, x: balao.x - 80, y: balao.y }, { t: C[2] + 0.1, s: 1.55, x: balao.x - 80, y: balao.y },
      { t: C[2] + 0.6, s: 1.2, x: 540, y: 900 }, { t: T_APAGOU + 0.2, s: 1.2, x: 540, y: 900 },
      { t: T_APAGOU + 0.8, s: 1.55, x: balao.x - 80, y: balao.y }, { t: C[5] - 0.2, s: 1.55, x: balao.x - 80, y: balao.y },
      { t: C[5], s: 1, x: 540, y: 920 },
    ]}
    sobre={<Dedo some={T_APAGOU + 0.3} passos={[
      { t: T_SEGURA, x: balao.x, y: balao.y, acao: "segura" },
      { t: T_LIXO, x: lixo.x, y: lixo.y, acao: "toque" },
      { t: T_TODOS, x: todos.x, y: todos.y, acao: "toque" },
    ]} />}
    sons={[{ t: T_ENVIADA, som: "pop" }, { t: T_SELEC, som: "clique" }, { t: T_LIXO, som: "clique" }, { t: T_TODOS, som: "clique" },
      { t: T_APAGOU, som: "whoosh", vol: 0.6 }, { t: T_APAGOU + 0.1, som: "pop" }]}
    tela={<Tela />}
    final={{ emoji: "🗑️", frase: <>Mensagem errada?<br />Apagada.</> }}
  />
);
