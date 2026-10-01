// Leva 4 (01/10, noite): formato dos virais — segredos do WhatsApp, golpe para compartilhar, celular clonado, letras, vício.
import React from "react";
import tFunc from "../../public/FuncoesSecretas/tempos.json";
import tGolpe from "../../public/GolpeAdvogado/tempos.json";
import tClon from "../../public/Clonado/tempos.json";
import tLetras from "../../public/LetrasWhatsApp/tempos.json";
import tVicio from "../../public/ViciCelular/tempos.json";
import { BarraStatus, Chave, Dialogo, Digitando, mola, useT } from "../kit";
import { Balao, CampoMensagem, ListaConversas, TelaInicial } from "../telas";
import { Aviso, Centro, Config, Conversa, Marca, ShortEtapas, linhaY } from "./Leva2";
import { CFG, Checklist } from "./Leva3";

const Grande: React.FC<{ emoji: string; titulo: React.ReactNode; sub?: React.ReactNode; cor?: string }> = ({ emoji, titulo, sub, cor = "#111" }) => {
  const { t } = useT();
  return (
    <Centro cor={cor}><div style={{ color: "#fff", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ fontSize: 200, marginTop: 120, transform: `scale(${1 + Math.sin(t * 5) * 0.05})` }}>{emoji}</div>
      <b style={{ fontSize: 46, marginTop: 30, lineHeight: 1.2 }}>{titulo}</b>
      {sub && <div style={{ fontSize: 28, opacity: 0.8, marginTop: 12 }}>{sub}</div>}
    </div></Centro>
  );
};

// ---------- 3 funções secretas ----------
const Fixada: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 180, height: 70, background: "#f0f2f5", display: "flex", alignItems: "center", gap: 14, padding: "0 24px",
    fontSize: 26, color: "#333", borderBottom: "1px solid #ddd", zIndex: 2 }}>📌 <b>Reunião sexta às 14h</b></div>
);
const MenuFixar: React.FC<{ desde: number }> = ({ desde }) => {
  const { frame, fps } = useT();
  const m = mola(frame, desde, fps, 14);
  return <div style={{ position: "absolute", right: 30, top: 300, background: "#fff", borderRadius: 18, boxShadow: "0 10px 30px rgba(0,0,0,.3)", padding: "8px 0", fontSize: 30,
    transform: `scale(${m})`, transformOrigin: "top right", zIndex: 3 }}>
    {["↩️ Responder", "📌 Fixar", "⭐ Favoritar"].map((x, i) => <div key={x} style={{ padding: "16px 34px", background: i === 1 ? "#d9fdd3" : "transparent", color: "#111" }}>{x}</div>)}</div>;
};
const TelaFoto: React.FC<{ unica: boolean }> = ({ unica }) => (
  <div style={{ position: "absolute", inset: 0, background: "#000" }}>
    <BarraStatus cor="#000" />
    <div style={{ position: "absolute", left: 40, right: 40, top: 160, height: 640, borderRadius: 20, background: "linear-gradient(160deg,#ffb74d,#f06292 60%,#7e57c2)",
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 220 }}>🏖️</div>
    <div style={{ position: "absolute", left: 20, right: 20, bottom: 40, display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ flex: 1, height: 80, borderRadius: 40, background: "#1f2c34", color: "#8696a0", fontSize: 26, display: "flex", alignItems: "center", padding: "0 26px", gap: 16 }}>
        Adicione uma legenda...
        <span style={{ marginLeft: "auto", width: 52, height: 52, borderRadius: 26, border: `4px solid ${unica ? "#25D366" : "#8696a0"}`, background: unica ? "#25D366" : "transparent",
          color: unica ? "#111" : "#8696a0", fontWeight: 900, fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>1</span></div>
      <div style={{ width: 80, height: 80, borderRadius: 40, background: "#25D366", fontSize: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>➤</div>
    </div>
    {unica && <div style={{ position: "absolute", left: 60, right: 60, bottom: 150, background: "rgba(37,211,102,.95)", color: "#111", borderRadius: 18, padding: "16px 20px",
      fontSize: 26, fontWeight: 700, textAlign: "center" }}>Visualização única: some depois de aberta</div>}
  </div>
);
export const FuncoesSecretas: React.FC = () => {
  const C = tFunc.cenas;
  const NOVA: [string, string, string?][] = [["🙋", "Você", "Mensagem para você mesmo"], ["👥", "Novo grupo"], ["👩", "Ana Paula"], ["👨", "João"], ["🍕", "Pizzaria"]];
  const notas = <Conversa nome="Você (você)" letra="V" cor="#7C4DFF">
    <Balao minha texto="🛒 Arroz, café, pão, leite" hora="19:02" /><Balao minha texto="📶 Wi-Fi da vó: casa2024" hora="19:03" /><Balao minha texto="🦷 Dentista dia 12, 15h" hora="19:05" /></Conversa>;
  const grupo = (t: number, fixada: boolean) => <Conversa nome="Trabalho" letra="T" cor="#FF7043">
    {fixada && <Fixada />}
    <div style={{ paddingTop: fixada ? 70 : 0 }}>
      <Balao autor="Carla" texto="Reunião sexta às 14h" hora="09:10" selecionado={!fixada && t >= C[2] + 0.8} />
      <Balao autor="Bruno" texto="kkkk alguém viu meu carregador?" hora="09:12" cor="#29B6F6" />
      <Balao autor="Ana" texto="Bom dia! ☀️" hora="09:15" cor="#AB47BC" />
    </div>
    {!fixada && t >= C[2] + 1.2 && <MenuFixar desde={C[2] + 1.2} />}
  </Conversa>;
  return <ShortEtapas id="FuncoesSecretas" tempos={tFunc}
    etapas={[
      { desde: 0, tela: () => <ListaConversas /> },
      { desde: C[1] + 0.4, tela: () => <Config titulo="Selecionar contato" linhas={NOVA} marca={0} /> },
      { desde: C[1] + 2.6, toque: [295, linhaY(0)], tela: () => notas },
      { desde: C[2], tela: (t) => grupo(t, false) },
      { desde: C[2] + 2.8, toque: [430, 300 + 8 + 16 + 34 + 60], tela: (t) => grupo(t, true) },
      { desde: C[3], tela: () => <TelaFoto unica={false} /> },
      { desde: C[3] + 2.0, toque: [495, 1120 - 40 - 40], tela: () => <TelaFoto unica /> },
      { desde: C[4], tela: () => <Centro cor="#0b3d33"><div style={{ color: "#fff", width: "100%" }}><b style={{ fontSize: 40 }}>Qual você não conhecia?</b>
        <Checklist desde={C[4] + 0.3} passo={0.6} itens={[["📝", "Conversa com você mesmo"], ["📌", "Fixar mensagem"], ["1️⃣", "Foto de visualização única"]]} /></div></Centro> },
    ]}
    ganchos={[{ desde: 0, texto: "3 funções SECRETAS 🤫", destaque: ["SECRETAS"] }, { desde: C[1], texto: "1. Bloco de notas", destaque: ["notas"] },
      { desde: C[2], texto: "2. Fixar mensagem", destaque: ["Fixar"] }, { desde: C[3], texto: "3. Foto que some", destaque: ["some"] },
      { desde: C[4], texto: "Qual você não sabia?", destaque: ["sabia?"] }]}
    final={{ emoji: "🤫", frase: <>Agora você<br />sabe.</> }} />;
};

// ---------- golpe do falso advogado ----------
export const GolpeAdvogado: React.FC = () => {
  const C = tGolpe.cenas;
  const chat = (t: number, marcas: boolean) => (
    <><Conversa nome="Dr. Ricardo · Advocacia" letra="⚖" cor="#37474f">
      {t >= 0.6 && <Balao texto="Boa tarde, Sra. Maria Silva. Referente ao processo nº 0012345-67.2024." hora="14:02" />}
      {t >= C[1] + 0.3 && <Balao texto="Parabéns! A senhora ganhou a ação: R$ 18.450,00 🎉" hora="14:02" />}
      {t >= C[1] + 2.0 && <Balao texto="Para liberar, pague a taxa de R$ 980 por Pix até hoje." hora="14:03" />}
    </Conversa>
    {marcas && <><Marca texto="Dados reais" x={250} y={230} desde={C[2] + 0.4} /><Marca texto="Taxa por Pix" x={230} y={520} desde={C[2] + 1.6} /><Marca texto="Pressa" x={60} y={600} desde={C[2] + 2.6} /></>}</>
  );
  return <ShortEtapas id="GolpeAdvogado" tempos={tGolpe}
    etapas={[
      { desde: 0, tela: (t) => chat(t, false) },
      { desde: C[2], tela: (t) => chat(t, true) },
      { desde: C[3], tela: (t) => <>{chat(t, false)}<Aviso desde={C[3] + 0.1} emoji="🚫" titulo="Advogado não cobra Pix" texto="para liberar dinheiro de processo." /></> },
      { desde: C[4], tela: () => <Centro cor="#0b3d33"><div style={{ color: "#fff", width: "100%" }}><b style={{ fontSize: 40 }}>Antes de pagar qualquer coisa:</b>
        <Checklist desde={C[4] + 0.3} passo={1.2} itens={[["📞", "Ligue no número que você já conhece"], ["🔎", "Confira o advogado no site da OAB"], ["👵", "Mande este vídeo pra família"]]} /></div></Centro> },
    ]}
    ganchos={[{ desde: 0, texto: "NOVO GOLPE 🚨 mande pra sua mãe", destaque: ["GOLPE"] }, { desde: C[1], texto: "\"Você ganhou o processo\"", destaque: ["processo\""] },
      { desde: C[2], texto: "Golpe do falso advogado", destaque: ["falso"] }, { desde: C[3], texto: "Taxa por Pix = golpe", destaque: ["golpe"] },
      { desde: C[4], texto: "Confirme antes", destaque: ["Confirme"] }]}
    final={{ emoji: "⚖️", frase: <>Mande pra<br />sua família.</> }} />;
};

// ---------- WhatsApp clonado ----------
export const Clonado: React.FC = () => {
  const C = tClon.cenas;
  const DISP = (dois: boolean): [string, string, string?][] => dois
    ? [["💻", "Windows · Chrome", "Ativo agora (este é seu)"], ["🖥️", "Mac · Safari", "Visto hoje às 03:12"]] : [["💻", "Windows · Chrome", "Ativo agora (este é seu)"]];
  const lista = (dois: boolean, marca = -1) => <><Config titulo="Dispositivos conectados" linhas={DISP(dois)} marca={marca} />
    <div style={{ position: "absolute", left: 30, right: 30, top: dois ? 430 : 320, fontSize: 24, color: "#667" }}>Toque em um aparelho para desconectar.</div></>;
  return <ShortEtapas id="Clonado" tempos={tClon}
    etapas={[
      { desde: 0, tela: () => <Grande emoji="🕵️" titulo={<>Tem alguém no<br />seu WhatsApp?</>} /> },
      { desde: C[1] + 0.2, tela: () => <Config titulo="Configurações" linhas={[["💻", "Dispositivos conectados", "WhatsApp Web e computador"], ...CFG.slice(0, 4)]} marca={0} /> },
      { desde: C[1] + 2.4, toque: [295, linhaY(0)], tela: () => lista(true) },
      { desde: C[2] + 1.2, tela: () => lista(true, 1) },
      { desde: C[3] + 0.6, toque: [295, linhaY(1)], tela: (t) => <>{lista(true, 1)}<Dialogo titulo="Desconectar Mac · Safari?" opcoes={["Cancelar", "Desconectar"]} marcada={t >= C[3] + 2.0 ? 1 : -1}
        aparece={Math.min(1, (t - C[3] - 0.6) * 4)} /></> },
      { desde: C[3] + 2.6, tela: () => lista(false) },
      { desde: C[4], tela: () => <><Grande emoji="📵" titulo="Saiu sozinho do WhatsApp?" cor="#3a0d0d" />
        <Aviso desde={C[4] + 1.6} emoji="🔐" titulo="Alguém registrou seu número" texto="Ative a confirmação em duas etapas." cor="#f57c00" /></> },
    ]}
    ganchos={[{ desde: 0, texto: "WhatsApp CLONADO? 🔍", destaque: ["CLONADO?"] }, { desde: C[1], texto: "Dispositivos conectados", destaque: ["conectados"] },
      { desde: C[2], texto: "Veja quem está logado", destaque: ["logado"] }, { desde: C[3], texto: "Desconecte o estranho", destaque: ["Desconecte"] },
      { desde: C[4], texto: "Ative as duas etapas", destaque: ["duas", "etapas"] }]}
    final={{ emoji: "🔍", frase: <>Confira<br />agora.</> }} />;
};

// ---------- letras diferentes ----------
const FORMATOS: { cru: string; fmt: React.ReactNode }[] = [
  { cru: "*negrito*", fmt: <b>negrito</b> },
  { cru: "_itálico_", fmt: <i>itálico</i> },
  { cru: "~riscado~", fmt: <s>riscado</s> },
  { cru: "```máquina```", fmt: <span style={{ fontFamily: "Consolas, monospace" }}>máquina</span> },
];
export const LetrasWhatsApp: React.FC = () => {
  const C = tLetras.cenas;
  const tela = (t: number) => {
    const etapa = t < C[1] ? -1 : t < C[2] ? 0 : t < C[3] ? 1 : t < C[4] ? 2 : 3;
    const enviada = (i: number) => i < etapa || (i === etapa && t >= C[i + 1] + 2.0);
    return <Conversa nome="Grupo da Família" letra="G" cor="#7C4DFF">
      <Balao autor="Mãe" texto="Como você escreve em negrito?? 😮" hora="20:01" cor="#EC407A" />
      {FORMATOS.map((f, i) => enviada(i) && <Balao key={i} minha texto={<span style={{ fontSize: 34 }}>{f.fmt}</span>} hora="20:02" />)}
      {etapa >= 0 && !enviada(etapa) && <CampoMensagem texto={<span style={{ fontSize: 32 }}><Digitando texto={FORMATOS[etapa].cru} desde={C[etapa + 1] + 0.3} cps={8} /></span>} />}
      {etapa >= 0 && !enviada(etapa) && <div style={{ position: "absolute", left: 30, right: 30, bottom: 120, background: "rgba(0,0,0,.75)", color: "#fff", borderRadius: 16, padding: "12px 18px",
        fontSize: 28, textAlign: "center" }}>{["Asterisco: *", "Traço de baixo: _", "Til: ~", "Três acentos graves: ```"][etapa]}</div>}
    </Conversa>;
  };
  return <ShortEtapas id="LetrasWhatsApp" tempos={tLetras}
    etapas={[{ desde: 0, tela }]}
    ganchos={[{ desde: 0, texto: "Letras diferentes no WhatsApp ✍️", destaque: ["diferentes"] }, { desde: C[1], texto: "*Negrito*", destaque: ["*Negrito*"] },
      { desde: C[2], texto: "_Itálico_", destaque: ["_Itálico_"] }, { desde: C[3], texto: "~Riscado~", destaque: ["~Riscado~"] },
      { desde: C[4], texto: "Máquina de escrever", destaque: ["Máquina"] }]}
    final={{ emoji: "✍️", frase: <>Escreva com<br />estilo.</> }} />;
};

// ---------- vício em celular: tela em preto e branco ----------
const Cinza: React.FC<{ on: number; children: React.ReactNode }> = ({ on, children }) => <div style={{ position: "absolute", inset: 0, filter: `grayscale(${on})` }}>{children}</div>;
const Inicio: React.FC = () => <><TelaInicial /><div style={{ position: "absolute", top: 0, width: "100%" }}><BarraStatus cor="transparent" /></div></>;
export const ViciCelular: React.FC = () => {
  const C = tVicio.cenas;
  const AJ: [string, string, string?][] = [["📶", "Conexões"], ["🔔", "Notificações"], ["⏳", "Bem-estar digital", "Tempo de tela, modo hora de dormir"], ["🔋", "Bateria"], ["📱", "Tela"]];
  const BE: [string, string, string?][] = [["📊", "Painel", "5 h 42 min hoje"], ["⏱️", "Limites de apps"], ["🎯", "Modo foco"], ["🌙", "Modo hora de dormir", "Escala de cinza, não perturbe"]];
  return <ShortEtapas id="ViciCelular" tempos={tVicio}
    etapas={[
      { desde: 0, tela: () => <Inicio /> },
      { desde: C[1] + 0.2, tela: () => <Config titulo="Configurações" linhas={AJ} cor="#37474f" /> },
      { desde: C[1] + 1.8, toque: [295, linhaY(2)], tela: () => <Config titulo="Bem-estar digital" linhas={BE} cor="#37474f" /> },
      { desde: C[1] + 3.6, toque: [295, linhaY(3)], tela: (t) => <Config titulo="Modo hora de dormir" cor="#37474f" marca={0}
        linhas={[["⚫", "Escala de cinza", "A tela fica em preto e branco"], ["🔕", "Não perturbe"]]} direita={(i) => i === 0 ? <Chave ligada={t >= C[2] + 0.8 ? 1 : 0} /> : null} /> },
      { desde: C[2] + 1.8, tela: (t) => <Cinza on={Math.min(1, (t - C[2] - 1.8) * 1.5)}><Inicio /></Cinza> },
      { desde: C[4], tela: (t) => <Config titulo="Programação" cor="#37474f" linhas={[["🌙", "Liga às 22:00"], ["☀️", "Desliga às 07:00"], ["📅", "Todos os dias"]]}
        direita={(i) => i < 2 ? <Chave ligada={t >= C[4] + 1.0 ? 1 : 0} /> : null} /> },
    ]}
    ganchos={[{ desde: 0, texto: "Viciado no celular? 📵", destaque: ["Viciado"] }, { desde: C[1], texto: "Modo hora de dormir", destaque: ["dormir"] },
      { desde: C[2], texto: "Tela em preto e branco", destaque: ["preto", "branco"] }, { desde: C[3], texto: "Sem cor, sem vício", destaque: ["vício"] },
      { desde: C[4], texto: "Liga sozinho à noite", destaque: ["noite"] }]}
    final={{ emoji: "⚫", frase: <>Menos tela,<br />mais vida.</> }} />;
};
