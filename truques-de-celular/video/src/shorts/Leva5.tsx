// Leva 5 (02/10): WhatsApp e hábitos — mensagens apagadas, celular rápido, bloqueio, backup, enquete.
import React from "react";
import tApag from "../../public/MsgApagadas/tempos.json";
import tRap from "../../public/CelularRapido/tempos.json";
import tBloq from "../../public/Bloqueado/tempos.json";
import tBack from "../../public/Backup/tempos.json";
import tEnq from "../../public/Enquete/tempos.json";
import { Avatar, BarraStatus, Chave, Digitando, mola, useT } from "../kit";
import { Balao, TelaInicial } from "../telas";
import { Aviso, Botao, Centro, Config, Conversa, ShortEtapas, linhaY } from "./Leva2";
import { CFG, Chamada, Checklist } from "./Leva3";
import { Grande } from "./Leva4";

const CINZA = "#37474f";
const AJUSTES: [string, string, string?][] = [["📶", "Conexões"], ["🔔", "Notificações", "Histórico, apps"], ["🔋", "Bateria"], ["📱", "Tela"], ["ℹ️", "Sobre o telefone"]];
const Apagada: React.FC = () => <Balao hora="21:40" texto={<i style={{ color: "#8696a0" }}>🚫 Esta mensagem foi apagada</i>} />;
const Barra: React.FC<{ p: number; cor?: string }> = ({ p, cor = "#25D366" }) => (
  <div style={{ width: "100%", height: 22, borderRadius: 11, background: "#e0e0e0", overflow: "hidden", marginTop: 30 }}>
    <div style={{ width: `${Math.max(0, Math.min(1, p)) * 100}%`, height: "100%", background: cor }} /></div>
);
const Toast: React.FC<{ texto: string; desde: number }> = ({ texto, desde }) => {
  const { frame, fps } = useT();
  const m = mola(frame, desde, fps, 14);
  return <div style={{ position: "absolute", left: 50, right: 50, bottom: 120, background: "rgba(40,40,40,.92)", color: "#fff", borderRadius: 30, padding: "18px 24px",
    fontSize: 27, textAlign: "center", transform: `translateY(${(1 - m) * 60}px)`, opacity: Math.min(1, m * 1.5) }}>{texto}</div>;
};

// ---------- mensagens apagadas ----------
const NOTIFS = [["Carla", "Desculpa, esqueci seu aniversário 😅", "21:39"], ["Grupo da Família", "Mãe: Almoço domingo aqui!", "20:12"], ["João", "Beleza, combinado!", "18:30"]];
const Historico: React.FC<{ marca?: number }> = ({ marca = -1 }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
    <BarraStatus cor={CINZA} />
    <div style={{ height: 130, background: CINZA, color: "#fff", display: "flex", alignItems: "center", padding: "0 28px", fontSize: 36, fontWeight: 700 }}>← Histórico</div>
    <div style={{ padding: "18px 28px 6px", fontSize: 24, color: "#667", fontWeight: 700 }}>ÚLTIMAS 24 HORAS</div>
    {NOTIFS.map(([q, m, h], i) => (
      <div key={i} style={{ display: "flex", gap: 18, alignItems: "center", padding: "18px 28px", borderBottom: "1px solid #eee", background: i === marca ? "#d9fdd3" : "#fff" }}>
        <div style={{ width: 64, height: 64, borderRadius: 32, background: "#25D366", fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>💬</div>
        <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 22, color: "#667" }}>WhatsApp · {h}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#111" }}>{q}</div><div style={{ fontSize: 26, color: "#333" }}>{m}</div></div>
      </div>
    ))}
  </div>
);
export const MsgApagadas: React.FC = () => {
  const C = tApag.cenas;
  const NOT: [string, string, string?][] = [["📲", "Notificações de apps"], ["🔒", "Notificações na tela de bloqueio"], ["🕘", "Histórico de notificações", "Guarda as notificações recebidas"], ["🔕", "Não perturbe"]];
  const chat = <Conversa nome="Carla" letra="C" cor="#26A69A"><Balao minha texto="Oi! Tudo bem?" hora="21:35" /><Apagada /></Conversa>;
  return <ShortEtapas id="MsgApagadas" tempos={tApag}
    etapas={[
      { desde: 0, tela: () => chat },
      { desde: C[1] + 0.2, tela: () => <Config titulo="Configurações" linhas={AJUSTES} cor={CINZA} /> },
      { desde: C[1] + 1.8, toque: [295, linhaY(1)], tela: () => <Config titulo="Notificações" linhas={NOT} cor={CINZA} /> },
      { desde: C[1] + 3.4, toque: [295, linhaY(2)], tela: (t) => <Config titulo="Histórico de notificações" cor={CINZA} marca={0}
        linhas={[["🕘", "Usar histórico de notificações", "Mostra as notificações das últimas 24 h"]]} direita={() => <Chave ligada={t >= C[2] - 0.6 ? 1 : 0} />} /> },
      { desde: C[2], tela: () => <Historico /> },
      { desde: C[3], tela: () => chat },
      { desde: C[3] + 1.6, tela: () => <Historico marca={0} /> },
      { desde: C[4], tela: () => <><Historico /><Aviso desde={C[4] + 0.2} emoji="⚠️" titulo="Só depois de ativar" texto={<>Mensagens antigas não aparecem.<br />O texto pode vir cortado.</>} cor="#f57c00" /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Veja a mensagem APAGADA 👀", destaque: ["APAGADA"] }, { desde: C[1], texto: "Histórico de notificações", destaque: ["Histórico"] },
      { desde: C[2], texto: "Tudo fica guardado", destaque: ["guardado"] }, { desde: C[3], texto: "Apagou? Está aqui", destaque: ["aqui"] },
      { desde: C[4], texto: "Ative antes", destaque: ["antes"] }]}
    final={{ emoji: "👀", frase: <>Nada some<br />de verdade.</> }} />;
};

// ---------- celular mais rápido ----------
export const CelularRapido: React.FC = () => {
  const C = tRap.cenas;
  const SOBRE: [string, string, string?][] = [["📱", "Nome do dispositivo", "Meu celular"], ["🤖", "Versão do Android", "15"], ["🔢", "Número da versão", "AP3A.240905.015"]];
  const toques = (t: number) => Math.max(0, Math.min(7, Math.floor((t - C[1] - 2.2) * 3)));
  const escala = (t: number, i: number) => t >= C[3] + 1.0 + i * 0.7 ? "0,5x" : "1x";
  return <ShortEtapas id="CelularRapido" tempos={tRap}
    etapas={[
      { desde: 0, tela: () => <Grande emoji="🐢" titulo="Celular lento?" sub="sem apagar nada" /> },
      { desde: C[1] + 0.2, tela: () => <Config titulo="Configurações" linhas={AJUSTES} cor={CINZA} /> },
      { desde: C[1] + 1.6, toque: [295, linhaY(4)], tela: (t) => <><Config titulo="Sobre o telefone" linhas={SOBRE} cor={CINZA} marca={2} />
        {toques(t) > 0 && toques(t) < 7 && <Toast desde={C[1] + 2.4} texto={`Faltam ${7 - toques(t)} toques para ser desenvolvedor`} />}</> },
      { desde: C[2], tela: () => <><Config titulo="Sistema" cor={CINZA} linhas={[["🌐", "Idiomas"], ["⌨️", "Teclado"], ["{ }", "Opções do desenvolvedor", "Novo!"], ["🔄", "Redefinir"]]} marca={2} />
        <Toast desde={C[2] + 0.2} texto="Você agora é um desenvolvedor!" /></> },
      { desde: C[3], toque: [295, linhaY(2)], tela: (t) => <Config titulo="Opções do desenvolvedor" cor={CINZA}
        linhas={[["🪟", "Escala de animação da janela", escala(t, 0)], ["🔀", "Escala de animação de transição", escala(t, 1)], ["⏱️", "Escala de duração do Animator", escala(t, 2)]]}
        marca={t >= C[3] + 2.4 ? 2 : t >= C[3] + 1.7 ? 1 : t >= C[3] + 1.0 ? 0 : -1} /> },
      { desde: C[4], tela: () => <><TelaInicial /><div style={{ position: "absolute", top: 0, width: "100%" }}><BarraStatus cor="transparent" /></div>
        <Aviso desde={C[4] + 0.2} emoji="⚡" titulo="Bem mais rápido" texto="Para voltar ao normal, coloque 1x de novo." cor="#2e7d32" /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Celular LENTO? ⚡", destaque: ["LENTO?"] }, { desde: C[1], texto: "Toque 7 vezes", destaque: ["7"] },
      { desde: C[2], texto: "Opções do desenvolvedor", destaque: ["desenvolvedor"] }, { desde: C[3], texto: "Animação em 0,5x", destaque: ["0,5x"] },
      { desde: C[4], texto: "Muito mais rápido", destaque: ["rápido"] }]}
    final={{ emoji: "⚡", frase: <>Celular<br />turbinado.</> }} />;
};

// ---------- fui bloqueado? ----------
const UmTique: React.FC<{ texto: string }> = ({ texto }) => (
  <div style={{ display: "flex", justifyContent: "flex-end", padding: "6px 22px" }}>
    <div style={{ maxWidth: 420, background: "#d9fdd3", borderRadius: 18, padding: "12px 18px", fontSize: 28, color: "#111" }}>{texto}
      <div style={{ fontSize: 18, color: "#789", textAlign: "right" }}>10:12 <span style={{ color: "#8696a0", fontSize: 22 }}>✓</span></div></div></div>
);
export const Bloqueado: React.FC = () => {
  const C = tBloq.cenas;
  const perfil = (antes: boolean) => <Centro><div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
    {antes ? <div style={{ width: 240, height: 240, borderRadius: 120, background: "linear-gradient(160deg,#ffb74d,#f06292)", fontSize: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>😎</div>
      : <Avatar letra="?" cor="#bdbdbd" tam={240} />}
    <b style={{ fontSize: 42, marginTop: 24 }}>Rafa</b>
    <div style={{ fontSize: 28, color: antes ? "#0a7d5a" : "#bbb", marginTop: 8 }}>{antes ? "online" : "— sem visto por último —"}</div></div></Centro>;
  return <ShortEtapas id="Bloqueado" tempos={tBloq}
    etapas={[
      { desde: 0, tela: () => <Grande emoji="🚫" titulo={<>Te bloquearam<br />no WhatsApp?</>} /> },
      { desde: C[1], tela: () => perfil(true) },
      { desde: C[1] + 1.6, tela: () => perfil(false) },
      { desde: C[2], tela: () => <Conversa nome="Rafa" letra="?" cor="#bdbdbd"><UmTique texto="Oi, sumiu?" /><UmTique texto="Tá tudo bem?" /></Conversa> },
      { desde: C[3], tela: () => <Chamada nome="Rafa" sub="Chamando... (não toca)" avatar={<Avatar letra="?" cor="#bdbdbd" tam={220} />} /> },
      { desde: C[4], tela: () => <><Centro cor="#0b3d33"><div style={{ color: "#fff", width: "100%" }}><b style={{ fontSize: 40 }}>Os 3 sinais juntos?</b>
        <Checklist desde={C[4] + 0.2} passo={0.6} itens={[["🖼️", "Sem foto e sem visto"], ["✓", "Mensagem com 1 tique só"], ["📞", "Ligação não completa"]]} /></div></Centro>
        <Aviso desde={C[4] + 3.2} emoji="🤔" titulo="Um sinal sozinho?" texto="Pode ser só a privacidade da pessoa." cor="#f57c00" /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Te BLOQUEARAM? 🚫", destaque: ["BLOQUEARAM?"] }, { desde: C[1], texto: "1. Sumiu a foto", destaque: ["foto"] },
      { desde: C[2], texto: "2. Um tique só", destaque: ["tique"] }, { desde: C[3], texto: "3. Ligação não completa", destaque: ["não"] },
      { desde: C[4], texto: "Os 3 juntos = bloqueio", destaque: ["bloqueio"] }]}
    final={{ emoji: "🚫", frase: <>Agora você<br />sabe.</> }} />;
};

// ---------- backup ----------
export const Backup: React.FC = () => {
  const C = tBack.cenas;
  const CONV: [string, string, string?][] = [["🎨", "Tema"], ["🖼️", "Papel de parede"], ["☁️", "Backup de conversas", "Salvar no Google Drive"], ["📤", "Transferir conversas"]];
  const telaBackup = (t: number) => <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
    <BarraStatus /><div style={{ height: 130, background: "#075E54", color: "#fff", display: "flex", alignItems: "center", padding: "0 28px", fontSize: 36, fontWeight: 700 }}>← Backup de conversas</div>
    <div style={{ padding: "40px 40px", fontSize: 28, color: "#333", textAlign: "center" }}>
      <div style={{ fontSize: 120 }}>☁️</div>
      <div>Último backup: <b>{t >= C[2] + 3.4 ? "agora" : "nunca"}</b></div>
      <div style={{ marginTop: 14, color: "#555" }}>Conta Google: maria.silva@gmail.com</div>
      {t >= C[2] + 1.6 && <Barra p={(t - C[2] - 1.6) / 1.8} />}
    </div>
    <Botao texto={t >= C[2] + 3.4 ? "Backup feito ✓" : "Fazer backup"} y={820} /></div>;
  return <ShortEtapas id="Backup" tempos={tBack}
    etapas={[
      { desde: 0, tela: () => <Grande emoji="📲" titulo="Trocou de celular?" sub="não perca nada" /> },
      { desde: C[1] + 0.2, tela: () => <Config titulo="Configurações" linhas={CFG} /> },
      { desde: C[1] + 1.8, toque: [295, linhaY(2)], tela: () => <Config titulo="Conversas" linhas={CONV} /> },
      { desde: C[2] - 0.2, toque: [295, linhaY(2)], tela: (t) => telaBackup(t) },
      { desde: C[2] + 1.4, toque: [295, 820], tela: (t) => telaBackup(t) },
      { desde: C[3], tela: (t) => <Centro><div style={{ fontSize: 120, marginTop: 30 }}>📱</div><b style={{ fontSize: 38 }}>Backup encontrado</b>
        <div style={{ fontSize: 28, color: "#555", marginTop: 10 }}>1.250 mensagens · 380 fotos</div>
        {t >= C[3] + 2.2 && <div style={{ width: "100%" }}><Barra p={(t - C[3] - 2.2) / 1.5} /></div>}
        <Botao texto={t >= C[3] + 3.8 ? "Restaurado ✓" : "Restaurar"} y={820} /></Centro> },
      { desde: C[3] + 2.0, toque: [295, 820], tela: (t) => <Centro><div style={{ fontSize: 120, marginTop: 30 }}>📱</div><b style={{ fontSize: 38 }}>Backup encontrado</b>
        <div style={{ fontSize: 28, color: "#555", marginTop: 10 }}>1.250 mensagens · 380 fotos</div>
        <div style={{ width: "100%" }}><Barra p={(t - C[3] - 2.2) / 1.5} /></div>
        <Botao texto={t >= C[3] + 3.8 ? "Restaurado ✓" : "Restaurar"} y={820} /></Centro> },
      { desde: C[4], tela: (t) => <Config titulo="Backup de conversas" linhas={[["🔁", "Backup automático", "Diariamente"], ["🎬", "Incluir vídeos"], ["📶", "Usar dados móveis"]]}
        direita={(i) => i === 0 ? <Chave ligada={t >= C[4] + 1.6 ? 1 : 0} /> : null} marca={0} /> },
    ]}
    ganchos={[{ desde: 0, texto: "Não perca suas conversas 📲", destaque: ["conversas"] }, { desde: C[1], texto: "Backup de conversas", destaque: ["Backup"] },
      { desde: C[2], texto: "Fazer backup", destaque: ["backup"] }, { desde: C[3], texto: "No novo: Restaurar", destaque: ["Restaurar"] },
      { desde: C[4], texto: "Deixe automático", destaque: ["automático"] }]}
    final={{ emoji: "☁️", frase: <>Conversas<br />salvas.</> }} />;
};

// ---------- enquete ----------
const ANEXOS = [["📄", "Documento", "#7f66ff"], ["🖼️", "Galeria", "#007bfc"], ["📷", "Câmera", "#ff2e74"], ["📍", "Localização", "#1fa855"], ["👤", "Contato", "#009de2"], ["📊", "Enquete", "#ffbc38"]];
const OPC = ["Sábado", "Domingo", "Tanto faz"];
export const Enquete: React.FC = () => {
  const C = tEnq.cenas;
  const familia = (extra?: React.ReactNode) => <Conversa nome="Família" letra="F" cor="#7C4DFF"><Balao autor="Mãe" cor="#EC407A" texto="Bora fazer churrasco? 🍖" hora="19:02" />{extra}</Conversa>;
  const anexos = (on: boolean) => <>{familia()}<div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.25)" }} />
    <div style={{ position: "absolute", left: 20, right: 20, bottom: 120, background: "#fff", borderRadius: 30, padding: 30, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 26 }}>
      {ANEXOS.map(([e, n, c]) => <div key={n} style={{ textAlign: "center", fontSize: 22, color: "#333" }}>
        <div style={{ width: 100, height: 100, margin: "0 auto 8px", borderRadius: 50, background: c, fontSize: 46, display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: on && n === "Enquete" ? "0 0 0 8px rgba(255,188,56,.45)" : "none" }}>{e}</div>{n}</div>)}</div></>;
  const form = (t: number, varias: boolean) => <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
    <BarraStatus /><div style={{ height: 130, background: "#075E54", color: "#fff", display: "flex", alignItems: "center", padding: "0 28px", fontSize: 36, fontWeight: 700 }}>✕ Criar enquete</div>
    <div style={{ padding: "26px 30px", fontSize: 24, color: "#0a7d5a", fontWeight: 700 }}>Pergunta</div>
    <div style={{ margin: "0 30px", borderBottom: "3px solid #0a7d5a", fontSize: 32, padding: "8px 0", color: "#111" }}><Digitando texto="Churrasco quando?" desde={C[2] + 0.2} cps={12} /></div>
    <div style={{ padding: "30px 30px 6px", fontSize: 24, color: "#0a7d5a", fontWeight: 700 }}>Opções</div>
    {OPC.map((o, i) => <div key={o} style={{ margin: "8px 30px", borderBottom: "2px solid #ddd", fontSize: 30, padding: "10px 0", color: "#111" }}>
      {t >= C[2] + 1.6 + i * 0.6 ? o : <span style={{ color: "#aaa" }}>+ Adicionar</span>}</div>)}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "30px 30px", fontSize: 28, color: "#111" }}>Permitir várias respostas <Chave ligada={varias ? 1 : 0} /></div>
  </div>;
  const VOTOS = [[0, 0, 0], [3, 1, 0], [5, 2, 1]];
  const votacao = (t: number) => {
    const k = t < C[3] + 1.2 ? 0 : t < C[3] + 2.4 ? 1 : 2; const v = VOTOS[k]; const tot = Math.max(1, v[0] + v[1] + v[2]);
    return familia(<div style={{ display: "flex", justifyContent: "flex-end", padding: "6px 22px" }}><div style={{ width: 440, background: "#d9fdd3", borderRadius: 18, padding: "16px 20px", color: "#111" }}>
      <b style={{ fontSize: 30 }}>Churrasco quando?</b><div style={{ fontSize: 20, color: "#667", margin: "4px 0 10px" }}>Selecione uma opção</div>
      {OPC.map((o, i) => <div key={o} style={{ margin: "10px 0" }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}><span>○ {o}</span><b>{v[i]}</b></div>
        <div style={{ height: 10, borderRadius: 5, background: "#b9dfc0", marginTop: 6 }}><div style={{ width: `${(v[i] / tot) * 100}%`, height: "100%", borderRadius: 5, background: "#0a7d5a" }} /></div></div>)}
    </div></div>);
  };
  return <ShortEtapas id="Enquete" tempos={tEnq}
    etapas={[
      { desde: 0, tela: () => familia() },
      { desde: C[1] + 1.2, toque: [60, 1120 - 18 - 38], tela: () => anexos(false) },
      { desde: C[1] + 2.4, tela: () => anexos(true) },
      { desde: C[2], toque: [450, 1120 - 120 - 30 - 230], tela: (t) => form(t, false) },
      { desde: C[3], tela: (t) => votacao(t) },
      { desde: C[4], tela: (t) => form(C[2] + 10, t >= C[4] + 1.2) },
    ]}
    ganchos={[{ desde: 0, texto: "Enquete no WhatsApp 📊", destaque: ["Enquete"] }, { desde: C[1], texto: "Clipe › Enquete", destaque: ["Enquete"] },
      { desde: C[2], texto: "Pergunta e opções", destaque: ["opções"] }, { desde: C[3], texto: "Resultado na hora", destaque: ["hora"] },
      { desde: C[4], texto: "Várias respostas", destaque: ["Várias"] }]}
    final={{ emoji: "📊", frase: <>Decidam<br />juntos.</> }} />;
};
