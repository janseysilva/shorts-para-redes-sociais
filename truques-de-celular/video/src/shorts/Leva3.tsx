// Leva 3 (01/10): temas em alta nas buscas — privacidade no WhatsApp, golpes e celular roubado. Mesmo estilo da leva 2 (sem explosões).
import React from "react";
import tLer from "../../public/LerEscondido/tempos.json";
import tTrancar from "../../public/TrancarConversa/tempos.json";
import tFoto from "../../public/FotoPerfil/tempos.json";
import tFalsa from "../../public/FalsaCentral/tempos.json";
import tSeguro from "../../public/CelularSeguro/tempos.json";
import { Avatar, BarraApp, BarraStatus, Chave, Digitando, Linha, mola, useT } from "../kit";
import { Balao, LINHA_CONV, ListaConversas, TOPO_LISTA } from "../telas";
import { Aviso, Botao, Centro, Config, Conversa, ShortEtapas, WPP, linhaY } from "./Leva2";

const CFG: [string, string, string?][] = [["🔑", "Conta"], ["🔒", "Privacidade", "Bloqueados, mensagens temporárias"], ["💬", "Conversas"], ["🔔", "Notificações"], ["📦", "Armazenamento e dados"]];

/** Tela de ligação chegando (fundo escuro, avatar pulsando). */
const Chamada: React.FC<{ nome: string; sub: string; avatar: React.ReactNode; cor?: string; encerrada?: boolean }> = ({ nome, sub, avatar, cor = "#0b3d33", encerrada }) => {
  const { t } = useT();
  return (
    <Centro cor={cor}><div style={{ color: "#fff", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ fontSize: 26, opacity: 0.8, marginBottom: 40 }}>{encerrada ? "Chamada encerrada" : "Chamada de voz"}</div>
      <div style={{ transform: `scale(${encerrada ? 1 : 1 + Math.sin(t * 7) * 0.05})` }}>{avatar}</div>
      <b style={{ fontSize: 42, marginTop: 30 }}>{nome}</b>
      <div style={{ fontSize: 28, opacity: 0.8 }}>{sub}</div>
      {!encerrada && <div style={{ display: "flex", gap: 160, marginTop: 300 }}>
        <div style={{ width: 120, height: 120, borderRadius: 60, background: "#e53935", fontSize: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>📵</div>
        <div style={{ width: 120, height: 120, borderRadius: 60, background: "#25D366", fontSize: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>📞</div>
      </div>}
      {encerrada && <div style={{ fontSize: 140, marginTop: 120 }}>📵</div>}
    </div></Centro>
  );
};

/** Lista de opções com bolinha (tipo "Quem pode ver"). */
const Opcoes: React.FC<{ titulo: string; pergunta: string; opcoes: string[]; marcada: number }> = ({ titulo, pergunta, opcoes, marcada }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
    <BarraStatus /><BarraApp titulo={titulo} esquerda={<span style={{ fontSize: 36 }}>←</span>} />
    <div style={{ padding: "30px 30px 10px", fontSize: 26, color: "#0a7d5a", fontWeight: 700 }}>{pergunta}</div>
    {opcoes.map((o, i) => (
      <div key={o} style={{ height: 100, display: "flex", alignItems: "center", gap: 26, padding: "0 30px", background: i === marcada ? "#d9fdd3" : "#fff" }}>
        <div style={{ width: 40, height: 40, borderRadius: 20, border: `4px solid ${i === marcada ? "#0a7d5a" : "#999"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {i === marcada && <div style={{ width: 22, height: 22, borderRadius: 11, background: "#0a7d5a" }} />}</div>
        <span style={{ fontSize: 31, color: "#111" }}>{o}</span>
      </div>
    ))}
  </div>
);

/** Itens que vão aparecendo um a um, com ✅. */
const Checklist: React.FC<{ itens: [string, string][]; desde: number; passo?: number }> = ({ itens, desde, passo = 1 }) => {
  const { frame, fps } = useT();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 40, width: "100%" }}>
      {itens.map(([e, txt], i) => {
        const m = mola(frame, desde + i * passo, fps, 13);
        return <div key={i} style={{ display: "flex", alignItems: "center", gap: 20, background: "#e8f5e9", borderRadius: 24, padding: "22px 26px", fontSize: 30,
          fontWeight: 700, color: "#1b5e20", opacity: Math.min(1, m * 1.5), transform: `translateX(${(1 - m) * 300}px)` }}>
          <span style={{ fontSize: 46 }}>{e}</span><span style={{ flex: 1, textAlign: "left" }}>{txt}</span><span>✅</span></div>;
      })}
    </div>
  );
};

// ---------- ler sem a pessoa saber (confirmação de leitura + esconder online) ----------
const Checks: React.FC<{ rotulo: string; azul: boolean; desde: number }> = ({ rotulo, azul, desde }) => {
  const { frame, fps } = useT();
  const m = mola(frame, desde, fps, 13);
  return (
    <div style={{ width: "100%", background: "#fff", borderRadius: 24, padding: "24px 28px", boxShadow: "0 6px 18px rgba(0,0,0,.12)", opacity: Math.min(1, m * 1.5),
      transform: `translateY(${(1 - m) * 60}px)`, display: "flex", alignItems: "center", gap: 20 }}>
      <span style={{ fontSize: 28, color: "#555", width: 120, textAlign: "left" }}>{rotulo}</span>
      <div style={{ flex: 1, background: "#d9fdd3", borderRadius: 18, padding: "16px 22px", fontSize: 36, color: "#111", textAlign: "left" }}>Vi sim!
        <span style={{ marginLeft: 14, fontSize: 40, color: azul ? "#34B7F1" : "#9e9e9e", fontWeight: 800 }}>✓✓</span></div>
    </div>
  );
};
const Grupo: React.FC<{ pergunta: string; opcoes: string[]; marcada: number }> = ({ pergunta, opcoes, marcada }) => (
  <>
    <div style={{ padding: "22px 30px 6px", fontSize: 24, color: "#0a7d5a", fontWeight: 700 }}>{pergunta}</div>
    {opcoes.map((o, i) => (
      <div key={o} style={{ height: 84, display: "flex", alignItems: "center", gap: 24, padding: "0 30px", background: i === marcada ? "#d9fdd3" : "#fff" }}>
        <div style={{ width: 36, height: 36, borderRadius: 18, border: `4px solid ${i === marcada ? "#0a7d5a" : "#999"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {i === marcada && <div style={{ width: 20, height: 20, borderRadius: 10, background: "#0a7d5a" }} />}</div>
        <span style={{ fontSize: 29, color: "#111" }}>{o}</span>
      </div>
    ))}
  </>
);
export const LerEscondido: React.FC = () => {
  const C = tLer.cenas;
  const priv = (lidas: boolean): [string, string, string?][] => [["👁️", "Visto por último e online", "Todos"], ["🖼️", "Foto do perfil", "Meus contatos"], ["📝", "Recado", "Todos"],
    ["✔️", "Confirmações de leitura", lidas ? "Mostra quando você leu" : "Desativado"]];
  return <ShortEtapas id="LerEscondido" tempos={tLer}
    etapas={[
      { desde: 0, tela: () => <Conversa nome="Marcos" letra="M" cor="#5C6BC0"><Balao texto="Oi! Viu o que eu te mandei? 👀" hora="20:14" />
        <Balao texto="Me responde quando puder" hora="20:15" /></Conversa> },
      { desde: C[1] + 0.2, tela: () => <Config titulo="Configurações" linhas={CFG} /> },
      { desde: C[1] + 1.8, toque: [295, linhaY(1)], tela: () => <Config titulo="Privacidade" linhas={priv(true)} direita={(i) => i === 3 ? <Chave ligada={1} /> : null} /> },
      { desde: C[1] + 3.6, toque: [500, linhaY(3)], tela: () => <Config titulo="Privacidade" linhas={priv(false)} marca={3} direita={(i) => i === 3 ? <Chave ligada={0} /> : null} /> },
      { desde: C[2], tela: () => <Centro cor="#efe7de"><b style={{ fontSize: 36, marginTop: 40 }}>O que a pessoa vê</b>
        <div style={{ display: "flex", flexDirection: "column", gap: 26, width: "100%", marginTop: 40 }}>
          <Checks rotulo="Antes" azul desde={C[2] + 0.3} /><Checks rotulo="Agora" azul={false} desde={C[2] + 1.3} /></div></Centro> },
      { desde: C[3] + 0.3, toque: [295, linhaY(0)], tela: (t) => <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
        <BarraStatus /><BarraApp titulo="Visto por último e online" esquerda={<span style={{ fontSize: 36 }}>←</span>} />
        <Grupo pergunta="Quem pode ver meu visto por último" opcoes={["Todos", "Meus contatos", "Ninguém"]} marcada={t >= C[3] + 1.6 ? 2 : 0} />
        <Grupo pergunta="Quem pode ver quando estou online" opcoes={["Todos", "Igual ao visto por último"]} marcada={t >= C[3] + 2.8 ? 1 : 0} /></div> },
      { desde: C[4], tela: () => <><Config titulo="Privacidade" linhas={priv(false)} direita={(i) => i === 3 ? <Chave ligada={0} /> : null} />
        <Aviso desde={C[4] + 0.2} emoji="⚠️" titulo="Vale para os dois lados" texto={<>Você também não vê quem leu as suas.<br />Nos grupos, a confirmação continua.</>} cor="#f57c00" /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Leia sem a pessoa saber 👀", destaque: ["saber"] }, { desde: C[1], texto: "Confirmações de leitura", destaque: ["leitura"] },
      { desde: C[2], texto: "Sem risquinho azul", destaque: ["azul"] }, { desde: C[3], texto: "Esconda o online", destaque: ["online"] },
      { desde: C[4], texto: "Vale para os dois lados", destaque: ["dois", "lados"] }]}
    final={{ emoji: "👀", frase: <>Leu e<br />ninguém viu.</> }} />;
};

// ---------- trancar conversa ----------
const CHAT = (
  <Conversa nome="Carla" letra="C" cor="#26A69A">
    <Balao texto="Já comprei o presente surpresa 🎁" hora="18:02" />
    <Balao texto="Não conta pra ninguém, tá? 🤫" hora="18:02" />
    <Balao texto="Pode deixar!" minha hora="18:03" />
  </Conversa>
);
const Digital: React.FC<{ texto: string }> = ({ texto }) => {
  const { t } = useT();
  return <Centro><div style={{ fontSize: 150, marginTop: 120, transform: `scale(${1 + Math.sin(t * 6) * 0.05})` }}>👆</div><b style={{ fontSize: 38 }}>{texto}</b></Centro>;
};
export const TrancarConversa: React.FC = () => {
  const C = tTrancar.cenas;
  const DADOS: [string, string, string?][] = [["🔔", "Notificações"], ["🖼️", "Mídia, links e docs"], ["⏳", "Mensagens temporárias"], ["🔒", "Bloqueio de conversa", "Trancar com a digital"]];
  const pasta = (
    <div style={{ position: "absolute", left: 0, right: 0, top: TOPO_LISTA, height: 100, background: "#f0f2f5", display: "flex", alignItems: "center", gap: 22, padding: "0 30px",
      fontSize: 31, fontWeight: 700, color: "#0a7d5a", borderBottom: "1px solid #ddd" }}>🔒 Conversas trancadas <span style={{ marginLeft: "auto", color: "#667", fontWeight: 400 }}>1</span></div>
  );
  return <ShortEtapas id="TrancarConversa" tempos={tTrancar}
    etapas={[
      { desde: 0, tela: () => <ListaConversas lista={[{ nome: "Carla", msg: "Não conta pra ninguém, tá? 🤫", hora: "18:02", cor: "#26A69A" }, ...LISTA.slice(0, 7)]} /> },
      { desde: C[1] + 0.2, toque: [295, TOPO_LISTA + LINHA_CONV / 2], tela: () => CHAT },
      { desde: C[1] + 2.4, toque: [300, 115], tela: () => <><Config titulo="Dados do contato" linhas={DADOS} /></> },
      { desde: C[2] + 1.0, toque: [295, linhaY(3)], tela: (t) => <Config titulo="Bloqueio de conversa" marca={0}
        linhas={[["🔒", "Bloquear esta conversa", "Use a digital para abrir"]]} direita={() => <Chave ligada={t >= C[2] + 2.0 ? 1 : 0} />} /> },
      { desde: C[2] + 2.6, tela: () => <Digital texto="Confirme a digital" /> },
      { desde: C[3], tela: () => <ListaConversas topo={pasta} y={(i) => i * LINHA_CONV + 100} lista={LISTA.slice(0, 7)} /> },
      { desde: C[4], toque: [295, TOPO_LISTA + 50], tela: () => <Digital texto="Conversas trancadas" /> },
    ]}
    ganchos={[{ desde: 0, texto: "Tranque a conversa 🔒", destaque: ["Tranque"] }, { desde: C[1], texto: "Toque no nome", destaque: ["nome"] },
      { desde: C[2], texto: "Bloqueio de conversa", destaque: ["Bloqueio"] }, { desde: C[3], texto: "Sumiu da lista", destaque: ["Sumiu"] },
      { desde: C[4], texto: "Abre só com a digital", destaque: ["digital"] }]}
    final={{ emoji: "🔒", frase: <>Conversa<br />trancada.</> }} />;
};
const LISTA = [
  { nome: "Grupo da Família", msg: "📷 Foto", hora: "17:42", cor: "#7C4DFF" }, { nome: "Trabalho", msg: "Reunião às 14h", hora: "17:30", cor: "#FF7043" },
  { nome: "João", msg: "Beleza, combinado!", hora: "16:58", cor: "#29B6F6" }, { nome: "Academia", msg: "Aula cancelada hoje", hora: "15:15", cor: "#66BB6A" },
  { nome: "Mãe", msg: "Me liga quando puder ❤️", hora: "14:47", cor: "#EC407A" }, { nome: "Ana Paula", msg: "kkkkkk", hora: "Ontem", cor: "#FFA726" },
  { nome: "Pizzaria", msg: "Seu pedido saiu 🍕", hora: "Ontem", cor: "#EF5350" },
];

// ---------- foto do perfil só para contatos ----------
export const FotoPerfil: React.FC = () => {
  const C = tFoto.cenas;
  const priv = (quem: string): [string, string, string?][] => [["👁️", "Visto por último e online", quem], ["🖼️", "Foto do perfil", quem], ["📝", "Recado", quem], ["📞", "Ligações"], ["🚫", "Bloqueados"]];
  const OPC = ["Todos", "Meus contatos", "Meus contatos, exceto...", "Ninguém"];
  return <ShortEtapas id="FotoPerfil" tempos={tFoto}
    etapas={[
      { desde: 0, tela: () => <Centro cor="#111"><div style={{ color: "#fff", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 340, height: 340, borderRadius: 170, background: "linear-gradient(160deg,#ffb74d,#f06292)", fontSize: 200, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 80 }}>🙂</div>
        <b style={{ fontSize: 40, marginTop: 40 }}>Sua foto</b><div style={{ fontSize: 30, marginTop: 10, color: "#ffcc80" }}>Quem vê: Todos 👀</div></div></Centro> },
      { desde: C[1] + 0.2, tela: () => <Config titulo="Configurações" linhas={CFG} /> },
      { desde: C[1] + 1.8, toque: [295, linhaY(1)], tela: () => <Config titulo="Privacidade" linhas={priv("Todos")} /> },
      { desde: C[1] + 3.6, toque: [295, linhaY(1)], tela: (t) => <Opcoes titulo="Foto do perfil" pergunta="Quem pode ver a minha foto do perfil" opcoes={OPC} marcada={t >= C[2] + 0.6 ? 1 : 0} /> },
      { desde: C[3], tela: (t) => <Config titulo="Privacidade" linhas={[["👁️", "Visto por último e online", t >= C[3] + 1.4 ? "Meus contatos" : "Todos"], ["🖼️", "Foto do perfil", "Meus contatos"],
        ["📝", "Recado", t >= C[3] + 2.4 ? "Meus contatos" : "Todos"], ["📞", "Ligações"], ["🚫", "Bloqueados"]]} marca={t >= C[3] + 2.4 ? 2 : t >= C[3] + 1.4 ? 0 : 1} /> },
      { desde: C[4], tela: () => <><Config titulo="Privacidade" linhas={priv("Meus contatos")} />
        <Aviso desde={C[4] + 0.2} emoji="🎭" titulo="Golpista copia a sua foto" texto="Para pedir dinheiro aos seus contatos." /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Esconda a sua foto 🙈", destaque: ["foto"] }, { desde: C[1], texto: "Privacidade › Foto do perfil", destaque: ["Foto"] },
      { desde: C[2], texto: "Só Meus contatos", destaque: ["contatos"] }, { desde: C[3], texto: "Visto por último também", destaque: ["também"] },
      { desde: C[4], texto: "Não facilite o golpe", destaque: ["golpe"] }]}
    final={{ emoji: "🙈", frase: <>Foto só para<br />contatos.</> }} />;
};

// ---------- golpe da falsa central ----------
const Cartao: React.FC = () => (
  <div style={{ width: 500, height: 310, borderRadius: 28, background: "linear-gradient(135deg,#37474f,#263238)", color: "#fff", padding: "0 0 24px", marginTop: 60,
    boxShadow: "0 20px 40px rgba(0,0,0,.35)", textAlign: "left", overflow: "hidden" }}>
    <div style={{ height: 60, background: "#111", marginTop: 34 }} />
    <div style={{ padding: "24px 30px", fontSize: 24, opacity: 0.85 }}>Central de atendimento</div>
    <div style={{ padding: "0 30px", fontSize: 38, fontWeight: 800, letterSpacing: 2, background: "rgba(255,212,59,.25)", margin: "0 20px", borderRadius: 12 }}>0800 000 0000</div>
    <div style={{ padding: "16px 30px", fontSize: 20, opacity: 0.6 }}>verso do cartão</div>
  </div>
);
export const FalsaCentral: React.FC = () => {
  const C = tFalsa.cenas;
  const golpista = <div style={{ width: 220, height: 220, borderRadius: 110, background: "#1565c0", fontSize: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>🏦</div>;
  const FALA = "Sua conta foi invadida. Para cancelar a compra, preciso da sua senha e do código do SMS.";
  return <ShortEtapas id="FalsaCentral" tempos={tFalsa}
    etapas={[
      { desde: 0, tela: () => <Chamada nome="Central de Segurança" sub="Seu Banco · chamando..." avatar={golpista} cor="#0d2a4a" /> },
      { desde: C[1], tela: () => <Centro cor="#0d2a4a"><div style={{ color: "#fff", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: 26, opacity: 0.8 }}>Em chamada · 00:42</div><div style={{ marginTop: 30 }}>{golpista}</div>
        <div style={{ marginTop: 50, background: "#fff", color: "#111", borderRadius: 26, padding: "24px 28px", fontSize: 31, lineHeight: 1.35, textAlign: "left", minHeight: 220 }}>
          <Digitando texto={FALA} desde={C[1] + 0.2} cps={17} /></div></div></Centro> },
      { desde: C[2], tela: () => <><Centro cor="#0d2a4a"><div /></Centro>
        <Aviso desde={C[2] + 0.1} emoji="🚫" titulo="Banco NUNCA pede" texto={<>Senha, código do SMS<br />ou Pix de teste.</>} /></> },
      { desde: C[3], tela: () => <Chamada nome="Central de Segurança" sub="" avatar={golpista} cor="#3a0d0d" encerrada /> },
      { desde: C[3] + 1.6, tela: () => <Centro><b style={{ fontSize: 38, marginTop: 40 }}>Ligue você mesmo</b><div style={{ fontSize: 28, color: "#555", marginTop: 10 }}>no número atrás do cartão</div><Cartao /></Centro> },
      { desde: C[4], tela: () => <><Centro><Cartao /></Centro>
        <Aviso desde={C[4] + 0.1} emoji="📱" titulo="Use outro telefone" texto="O golpista pode deixar a linha presa." cor="#f57c00" /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Ligação do \"banco\"? 🚨", destaque: ["\"banco\"?"] }, { desde: C[1], texto: "Pediu senha ou código?", destaque: ["senha", "código?"] },
      { desde: C[2], texto: "É golpe!", destaque: ["golpe!"] }, { desde: C[3], texto: "Desligue e ligue você", destaque: ["Desligue"] },
      { desde: C[4], texto: "De outro telefone", destaque: ["outro"] }]}
    final={{ emoji: "🏦", frase: <>Banco não<br />pede senha.</> }} />;
};

// ---------- Celular Seguro ----------
const GOV = "#1351b4";
export const CelularSeguro: React.FC = () => {
  const C = tSeguro.cenas;
  const app = (corpo: React.ReactNode) => <div style={{ position: "absolute", inset: 0, background: "#f5f7fb" }}><BarraStatus cor={GOV} />
    <div style={{ height: 130, background: GOV, color: "#fff", display: "flex", alignItems: "center", gap: 18, padding: "0 30px", fontSize: 38, fontWeight: 800 }}>🛡️ Celular Seguro</div>{corpo}</div>;
  const alerta = (t: number) => app(<div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 40px 0", textAlign: "center" }}>
    <div style={{ fontSize: 130 }}>🚨</div><b style={{ fontSize: 38, color: "#111" }}>Seu celular foi roubado?</b>
    <Botao texto={t >= C[3] + 1.6 ? "Alerta emitido ✓" : "Emitir alerta"} cor={t >= C[3] + 1.6 ? "#2e7d32" : "#e53935"} y={700} /></div>);
  return <ShortEtapas id="CelularSeguro" tempos={tSeguro}
    etapas={[
      { desde: 0, tela: (t) => <Centro cor="#111"><div style={{ color: "#fff", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: 200, marginTop: 120, transform: `rotate(${Math.sin(t * 9) * 8}deg)` }}>📱</div><b style={{ fontSize: 46, marginTop: 30 }}>Celular roubado 😱</b>
        <div style={{ fontSize: 28, opacity: 0.75, marginTop: 10 }}>banco, WhatsApp, e-mail...</div></div></Centro> },
      { desde: C[1], tela: () => app(<div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "90px 40px 0", textAlign: "center" }}>
        <div style={{ fontSize: 150 }}>🛡️</div><b style={{ fontSize: 40, color: "#111" }}>Celular Seguro</b><div style={{ fontSize: 28, color: "#555", marginTop: 10 }}>Programa do governo federal</div>
        <Botao texto="Entrar com a conta gov" cor={GOV} y={720} /></div>) },
      { desde: C[2], toque: [295, 720], tela: (t) => app(<>
        <div style={{ padding: "26px 30px 8px", fontSize: 25, color: GOV, fontWeight: 700 }}>MEUS APARELHOS</div>
        <Linha icone="📱" titulo="Meu celular" sub={t >= C[2] + 1.0 ? "Cadastrado ✓" : "Cadastrar"} destaque={t >= C[2] + 1.0} />
        <div style={{ padding: "26px 30px 8px", fontSize: 25, color: GOV, fontWeight: 700 }}>PESSOAS DE CONFIANÇA</div>
        <Linha icone="👩" titulo="Maria (irmã)" sub={t >= C[2] + 2.2 ? "Pode emitir alerta ✓" : "Adicionar"} destaque={t >= C[2] + 2.2} /></>) },
      { desde: C[3], tela: (t) => alerta(t) },
      { desde: C[3] + 1.4, toque: [295, 700], tela: (t) => alerta(t) },
      { desde: C[4], tela: () => app(<div style={{ padding: "40px 34px 0" }}><b style={{ fontSize: 34, color: "#111" }}>Bloqueios feitos:</b>
        <Checklist desde={C[4] + 0.6} passo={0.9} itens={[["🏦", "Apps de banco"], ["📶", "Linha da operadora"], ["📱", "Aparelho"]]} /></div>) },
    ]}
    ganchos={[{ desde: 0, texto: "Roubaram seu celular? 📱", destaque: ["celular?"] }, { desde: C[1], texto: "Celular Seguro (gov)", destaque: ["Seguro"] },
      { desde: C[2], texto: "Cadastre antes", destaque: ["antes"] }, { desde: C[3], texto: "Emitir alerta", destaque: ["alerta"] },
      { desde: C[4], texto: "Tudo bloqueado", destaque: ["bloqueado"] }]}
    final={{ emoji: "🛡️", frase: <>Faça isso<br />hoje.</> }} />;
};
