import React from "react";
import tempos from "../../public/SilenciarGrupo/tempos.json";
import { Dedo, Dialogo, Short, VERDE, mola, tela, useT, type Som } from "../kit";
import { CONVERSAS, IconeBarra, ListaConversas, posConversa } from "../telas";

const C = tempos.cenas;
const T_SEGURA = C[1] + 0.5, T_SELEC = T_SEGURA + 0.8, T_MUTE = C[2] + 0.8, T_DIALOGO = C[2] + 1.0, T_SEMPRE = C[3] + 0.4, T_OK = C[3] + 1.4;

const Tela: React.FC = () => {
  const { frame, fps, t } = useT();
  const selecionada = t >= T_SELEC && t < T_OK ? 0 : -1;
  const mudo = t >= T_OK;
  const n = 12 + Math.floor(t * 4); // mensagens do grupo não param de chegar
  const lista = CONVERSAS.map((c, i) => (i === 0 ? { ...c, msg: mudo ? "Tia Rosa: 😂😂😂" : ["Tio Beto: Bom dia!!", "Tia Rosa: 😂😂😂", "Primo: kkkk", "Vó: 🙏"][Math.floor(t * 3) % 4] } : c));
  return (
    <>
      <ListaConversas lista={lista} selecionada={selecionada}
        icones={<><IconeBarra e="📌" /><IconeBarra e="🗑️" /><IconeBarra e="🔇" ativo={t >= T_MUTE && t < T_MUTE + 0.3} /><IconeBarra e="📦" /></>}
        extra={(i) => (i === 0 ? (
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {mudo && <span style={{ fontSize: 26, transform: `scale(${mola(frame, T_OK, fps, 9)})` }}>🔇</span>}
            <span style={{ minWidth: 40, height: 34, borderRadius: 17, background: mudo ? "#b0b8b4" : VERDE, color: "#fff", fontSize: 20, fontWeight: 800,
              display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px", transform: `scale(${mudo ? 1 : 1 + ((t * 4) % 1) * 0.15})` }}>{n}</span>
          </div>
        ) : null)} />
      {t >= T_DIALOGO && t < T_OK + 0.2 && (
        <Dialogo titulo="Silenciar notificações" opcoes={["8 horas", "1 semana", "Sempre", "OK"]} marcada={t >= T_OK ? 3 : t >= T_SEMPRE ? 2 : -1}
          aparece={mola(frame, T_DIALOGO, fps, 14)} />
      )}
    </>
  );
};

const g = posConversa(0), grupo = tela(g.x, g.y), mute = tela(455, 115), sempre = tela(430, 634), ok = tela(430, 704);
export const SilenciarGrupo: React.FC = () => (
  <Short
    id="SilenciarGrupo" tempos={tempos}
    ganchos={[
      { desde: 0, texto: "Grupo apitando sem parar? 🔔", destaque: ["apitando"] },
      { desde: C[1], texto: "Silencie o grupo", destaque: ["Silencie"] },
      { desde: C[4], texto: "Quieto, sem sair do grupo", destaque: ["sem", "sair"] },
    ]}
    cam={[{ t: 0, s: 1.4, x: grupo.x, y: grupo.y + 60 }, { t: C[1] + 1.2, s: 1.4, x: grupo.x, y: grupo.y + 60 }, { t: C[2] + 0.4, s: 1.1, x: 540, y: 880 },
      { t: T_OK + 0.3, s: 1.1, x: 540, y: 880 }, { t: T_OK + 0.9, s: 1.5, x: grupo.x + 40, y: grupo.y + 60 }, { t: C[5] - 0.2, s: 1.5, x: grupo.x + 40, y: grupo.y + 60 }, { t: C[5], s: 1, x: 540, y: 920 }]}
    sobre={<Dedo some={T_OK + 0.4} passos={[{ t: T_SEGURA, x: grupo.x, y: grupo.y, acao: "segura" }, { t: T_MUTE, x: mute.x, y: mute.y, acao: "toque" },
      { t: T_SEMPRE, x: sempre.x, y: sempre.y, acao: "toque" }, { t: T_OK, x: ok.x, y: ok.y, acao: "toque" }]} />}
    sons={[0.3, 0.8, 1.3, 1.8] .map((x): Som => ({ t: x, som: "clique", vol: 0.5 })).concat(
      [T_SELEC, T_MUTE, T_SEMPRE, T_OK] .map((x): Som => ({ t: x, som: "clique", vol: 0.7 })), [{ t: T_OK + 0.05, som: "pop" as const, vol: 0.7 }])}
    tela={<Tela />}
    final={{ emoji: "🔕", frase: <>Paz no<br />celular.</> }}
  />
);
