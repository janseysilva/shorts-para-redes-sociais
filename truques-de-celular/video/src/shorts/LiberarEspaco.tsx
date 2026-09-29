import React from "react";
import tempos from "../../public/LiberarEspaco/tempos.json";
import { BarraApp, BarraStatus, Dedo, Dialogo, Linha, Short, VERDE, mola, tela, useT } from "../kit";
import { TelaInicial } from "../telas";

const C = tempos.cenas;
const T_MENU = C[1] + 0.5;
const T_CONFIG = C[1] + 1.2;
const T_ARMAZ = C[1] + 2.6;
const T_GERENCIAR = C[2] + 0.8;
const T_MAIOR = C[3] + 0.5;
const MARCAS = [C[3] + 1.6, C[3] + 2.1, C[3] + 2.6, C[3] + 3.1];
const T_LIXO = C[4] + 0.3;
const T_APAGAR = C[4] + 1.3;

const ITENS = [
  { c: "#8E24AA", mb: "312 MB" }, { c: "#1E88E5", mb: "248 MB" }, { c: "#43A047", mb: "506 MB" },
  { c: "#F4511E", mb: "187 MB" }, { c: "#00897B", mb: "96 MB" }, { c: "#6D4C41", mb: "74 MB" },
];
const posItem = (i: number) => ({ x: 20 + (i % 3) * 186 + 88, y: 330 + Math.floor(i / 3) * 186 + 88 });

const Barra: React.FC<{ usado: number }> = ({ usado }) => (
  <div style={{ padding: "26px 28px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#111", fontWeight: 700 }}>
      <span>Usado: {usado.toFixed(1).replace(".", ",")} GB</span><span style={{ color: usado > 60 ? "#e53935" : VERDE }}>de 64 GB</span>
    </div>
    <div style={{ height: 26, borderRadius: 13, background: "#e0e0e0", marginTop: 14, overflow: "hidden", display: "flex" }}>
      <div style={{ width: `${(usado / 64) * 100}%`, background: usado > 60 ? "linear-gradient(90deg,#fb8c00,#e53935)" : `linear-gradient(90deg,${VERDE},#00bfa5)` }} />
    </div>
  </div>
);

const Tela: React.FC = () => {
  const { frame, fps, t } = useT();
  if (t < C[1]) {
    const aviso = mola(frame, 0.6, fps, 10);
    return (
      <>
        <TelaInicial escurece={0.35} />
        <div style={{ position: "absolute", top: 70, left: 24, right: 24, background: "#fff", borderRadius: 26, padding: 26,
          transform: `translateY(${(1 - aviso) * -300}px)`, boxShadow: "0 12px 30px rgba(0,0,0,.35)" }}>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#e53935" }}>⚠️ Armazenamento quase cheio</div>
          <div style={{ fontSize: 24, color: "#555", marginTop: 6 }}>Libere espaço para continuar usando o celular</div>
          <Barra usado={62.8} />
        </div>
      </>
    );
  }
  if (t < T_CONFIG + 0.2) {
    return (
      <>
        <BarraStatus />
        <BarraApp titulo="WhatsApp" direita={<span style={{ fontSize: 40 }}>⋮</span>} />
        {["Família", "Trabalho", "João", "Academia", "Condomínio", "Mãe"].map((n) => <Linha key={n} icone="👤" titulo={n} sub="Mensagem recente" />)}
        {t >= T_MENU && (
          <div style={{ position: "absolute", right: 16, top: 70, width: 330, background: "#fff", borderRadius: 14,
            boxShadow: "0 10px 30px rgba(0,0,0,.3)", fontSize: 28, transform: `scale(${mola(frame, T_MENU, fps, 14)})`, transformOrigin: "top right" }}>
            {["Novo grupo", "Aparelhos conectados", "Mensagens favoritas", "Configurações"].map((o) => (
              <div key={o} style={{ padding: "22px 26px", background: o === "Configurações" && t >= T_CONFIG ? "#e8f5e9" : "transparent" }}>{o}</div>
            ))}
          </div>
        )}
      </>
    );
  }
  if (t < T_ARMAZ + 0.2) {
    return (
      <>
        <BarraStatus />
        <BarraApp titulo="Configurações" esquerda={<span style={{ fontSize: 36 }}>←</span>} />
        {[["🔑", "Conta"], ["🔒", "Privacidade"], ["💬", "Conversas"], ["🔔", "Notificações"], ["💾", "Armazenamento e dados"], ["🌐", "Idioma do app"], ["❓", "Ajuda"]].map(([i, n]) => (
          <Linha key={n} icone={i} titulo={n} destaque={n === "Armazenamento e dados" && t >= T_ARMAZ} />
        ))}
      </>
    );
  }
  if (t < T_GERENCIAR + 0.2) {
    return (
      <>
        <BarraStatus />
        <BarraApp titulo="Armazenamento e dados" esquerda={<span style={{ fontSize: 36 }}>←</span>} />
        <Linha icone="📂" titulo="Gerenciar armazenamento" sub="12,4 GB" destaque={t >= T_GERENCIAR} />
        <Linha icone="📶" titulo="Uso de rede" sub="1,2 GB enviados · 8,9 GB recebidos" />
        <Linha icone="⬇️" titulo="Download automático de mídia" sub="Fotos, áudios, vídeos" />
      </>
    );
  }
  if (t < T_MAIOR + 0.3) {
    return (
      <>
        <BarraStatus />
        <BarraApp titulo="Gerenciar armazenamento" esquerda={<span style={{ fontSize: 36 }}>←</span>} />
        <Barra usado={62.8} />
        <div style={{ padding: "10px 28px", fontSize: 26, color: "#667", fontWeight: 700 }}>Revisar e apagar itens</div>
        <Linha icone="📦" titulo="Maior que 5 MB" sub="4,1 GB" destaque={t >= T_MAIOR} />
        <Linha icone="↪️" titulo="Encaminhados várias vezes" sub="890 MB" />
      </>
    );
  }
  const sel = MARCAS.filter((m) => t >= m).length;
  const apagado = t >= T_APAGAR;
  const liberado = apagado ? mola(frame, T_APAGAR, fps, 12) : 0;
  return (
    <>
      <BarraStatus />
      <BarraApp titulo={sel > 0 && !apagado ? sel === 1 ? "1 selecionado" : `${sel} selecionados` : "Maior que 5 MB"} esquerda={<span style={{ fontSize: 36 }}>←</span>}
        direita={sel > 0 && !apagado ? <span style={{ fontSize: 40 }}>🗑️</span> : undefined} />
      <Barra usado={62.8 - liberado * 1.3} />
      {ITENS.map((it, i) => {
        const p = posItem(i);
        const some = apagado && i < 4 ? liberado : 0;
        return (
          <div key={i} style={{ position: "absolute", left: p.x - 88, top: p.y - 88, width: 176, height: 176, borderRadius: 14,
            background: `linear-gradient(135deg, ${it.c}, #222)`, color: "#fff", transform: `scale(${1 - some})`, opacity: 1 - some }}>
            <div style={{ position: "absolute", left: 12, bottom: 10, fontSize: 22, fontWeight: 700 }}>▶ {it.mb}</div>
            {i < sel && !apagado && (
              <div style={{ position: "absolute", right: 10, top: 10, width: 44, height: 44, borderRadius: 22, background: VERDE,
                border: "3px solid #fff", fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center",
                transform: `scale(${mola(frame, MARCAS[i], fps, 9)})` }}>✓</div>
            )}
          </div>
        );
      })}
      {t >= T_LIXO + 0.2 && !apagado && <Dialogo titulo="Apagar 4 itens?" opcoes={["Apagar", "Cancelar"]} marcada={t >= T_APAGAR - 0.3 ? 0 : -1} aparece={mola(frame, T_LIXO + 0.2, fps, 14)} />}
      {apagado && (
        <div style={{ position: "absolute", left: 40, right: 40, bottom: 380, background: "#111", color: "#fff", borderRadius: 24,
          padding: "26px 20px", textAlign: "center", fontSize: 38, fontWeight: 800, transform: `scale(${liberado})` }}>
          ✅ <span style={{ color: VERDE }}>1,3 GB</span> liberados
        </div>
      )}
    </>
  );
};

const menu = tela(550, 115);
const config = tela(200, 70 + 3 * 81 + 40);
const armaz = tela(300, 180 + 4 * 112 + 56);
const gerenciar = tela(300, 180 + 56);
const maior = tela(300, 180 + 150 + 60 + 56);
const lixo = tela(540, 115);
const apagar = tela(430, 560);

export const LiberarEspaco: React.FC = () => (
  <Short
    id="LiberarEspaco" tempos={tempos} tremor={T_APAGAR}
    ganchos={[
      { desde: 0, texto: "Celular sem espaço?", destaque: ["espaço?"] },
      { desde: C[1], texto: "O culpado é o WhatsApp", destaque: ["WhatsApp"] },
      { desde: C[4], texto: "Espaço liberado!", destaque: ["liberado!"] },
    ]}
    cam={[
      { t: 0, s: 1, x: 540, y: 920 }, { t: C[3] - 0.1, s: 1, x: 540, y: 920 },
      { t: C[3] + 1.2, s: 1.35, x: 540, y: tela(0, 520).y }, { t: C[4] + 2.6, s: 1.35, x: 540, y: tela(0, 520).y },
      { t: C[4] + 3.2, s: 1, x: 540, y: 920 },
    ]}
    sobre={<Dedo some={T_APAGAR + 0.4} passos={[
      { t: T_MENU, x: menu.x, y: menu.y, acao: "toque" },
      { t: T_CONFIG, x: config.x, y: config.y, acao: "toque" },
      { t: T_ARMAZ, x: armaz.x, y: armaz.y, acao: "toque" },
      { t: T_GERENCIAR, x: gerenciar.x, y: gerenciar.y, acao: "toque" },
      { t: T_MAIOR, x: maior.x, y: maior.y, acao: "toque" },
      ...MARCAS.map((m, i) => ({ t: m, x: tela(posItem(i).x, posItem(i).y).x, y: tela(posItem(i).x, posItem(i).y).y, acao: "toque" as const })),
      { t: T_LIXO, x: lixo.x, y: lixo.y, acao: "toque" },
      { t: T_APAGAR, x: apagar.x, y: apagar.y, acao: "toque" },
    ]} />}
    sons={[
      { t: 0.6, som: "pop" }, ...[T_MENU, T_CONFIG, T_ARMAZ, T_GERENCIAR, T_MAIOR, ...MARCAS, T_LIXO, T_APAGAR].map((x) => ({ t: x, som: "clique" as const })),
      { t: T_APAGAR + 0.05, som: "whoosh", vol: 0.6 }, { t: T_APAGAR + 0.2, som: "pop" },
    ]}
    tela={<Tela />}
    final={{ emoji: "🧹", frase: <>Celular com<br />espaço de novo.</> }}
  />
);
