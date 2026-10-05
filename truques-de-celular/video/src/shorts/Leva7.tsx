// Leva 7 (04/10): buscas em alta — senha do Wi-Fi, bloquear anúncios, ligações desconhecidas, limite de apps, liberar espaço.
import React from "react";
import tWifi from "../../public/WifiVerSenha/tempos.json";
import tAds from "../../public/BloquearAnuncios/tempos.json";
import tLig from "../../public/LigacoesDesconhecidas/tempos.json";
import tLim from "../../public/LimiteApps/tempos.json";
import tEsp from "../../public/ArquivosLimpar/tempos.json";
import { Avatar, BarraStatus, Chave, Dialogo, Digitando, mola, useT } from "../kit";
import { Aviso, Botao, Centro, Config, ShortEtapas, linhaY } from "./Leva2";
import { CFG, Chamada } from "./Leva3";
import { Grande } from "./Leva4";

const CINZA = "#37474f";
const AZUL = "#1a73e8";
const Topo: React.FC<{ titulo: React.ReactNode; cor?: string }> = ({ titulo, cor = CINZA }) => <><BarraStatus cor={cor} /><div style={{ height: 130, background: cor, color: "#fff",
  display: "flex", alignItems: "center", padding: "0 28px", fontSize: 34, fontWeight: 700, gap: 22 }}><span style={{ fontSize: 36 }}>←</span>{titulo}</div></>;
const Toast: React.FC<{ texto: string; desde: number }> = ({ texto, desde }) => {
  const { frame, fps } = useT();
  const m = mola(frame, desde, fps, 14);
  return <div style={{ position: "absolute", left: 50, right: 50, bottom: 120, background: "rgba(40,40,40,.92)", color: "#fff", borderRadius: 30, padding: "18px 24px",
    fontSize: 27, textAlign: "center", transform: `translateY(${(1 - m) * 60}px)`, opacity: Math.min(1, m * 1.5) }}>{texto}</div>;
};
const Opcao: React.FC<{ texto: string; on: boolean }> = ({ texto, on }) => (
  <div style={{ height: 90, display: "flex", alignItems: "center", gap: 24, padding: "0 34px", fontSize: 30, color: "#111", background: on ? "#e3f2fd" : "#fff" }}>
    <div style={{ width: 34, height: 34, borderRadius: 17, border: `4px solid ${on ? AZUL : "#888"}`, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
      {on && <div style={{ width: 16, height: 16, borderRadius: 8, background: AZUL }} />}</div>{texto}</div>
);
const aparece = (t: number, desde: number) => Math.max(0, Math.min(1, (t - desde) / 0.3));

// ---------- senha do Wi-Fi ----------
const QR: React.FC<{ tam: number }> = ({ tam }) => {
  const n = 21, c = tam / n;
  const quadro = (x: number, y: number) => <g key={`${x}-${y}`}><rect x={x * c} y={y * c} width={7 * c} height={7 * c} fill="#111" /><rect x={(x + 1) * c} y={(y + 1) * c} width={5 * c} height={5 * c} fill="#fff" />
    <rect x={(x + 2) * c} y={(y + 2) * c} width={3 * c} height={3 * c} fill="#111" /></g>;
  const cel: React.ReactNode[] = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const canto = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
    if (!canto && ((x * 7 + y * 13 + x * y) % 5 < 2)) cel.push(<rect key={`${x}_${y}`} x={x * c} y={y * c} width={c} height={c} fill="#111" />);
  }
  return <svg width={tam} height={tam} style={{ background: "#fff", padding: 12 }}>{cel}{quadro(0, 0)}{quadro(14, 0)}{quadro(0, 14)}</svg>;
};
const REDES: [string, string, string?][] = [["📶", "CasaSilva_5G", "Conectado"], ["📶", "Vizinho_2G"], ["📶", "NET_VIRTUA_88"]];
export const WifiVerSenha: React.FC = () => {
  const C = tWifi.cenas;
  const qr = (t: number) => <Centro><b style={{ fontSize: 36 }}>Compartilhar Wi-Fi</b><div style={{ fontSize: 26, color: "#555", margin: "8px 0 24px" }}>Leia o QR code para conectar</div>
    <QR tam={300} /><div style={{ fontSize: 28, marginTop: 26 }}>Rede: <b>CasaSilva_5G</b></div>
    {t >= C[3] + 1.0 && <div style={{ fontSize: 34, marginTop: 14, padding: "10px 22px", borderRadius: 16, background: "#fff59d", border: "4px solid #f9a825" }}>Senha: <b>casa@2026</b></div>}</Centro>;
  return <ShortEtapas id="WifiVerSenha" tempos={tWifi}
    etapas={[
      { desde: 0, tela: () => <Grande emoji="📶" titulo={<>Esqueceu a senha<br />do Wi-Fi?</>} sub="dá para ver no celular" /> },
      { desde: C[1] + 0.2, tela: () => <Config titulo="Configurações" cor={CINZA} linhas={[["📶", "Wi-Fi", "CasaSilva_5G"], ["🔵", "Bluetooth"], ["🔔", "Notificações"], ["🔋", "Bateria"]]} /> },
      { desde: C[1] + 1.8, toque: [295, linhaY(0)], tela: () => <Config titulo="Wi-Fi" cor={CINZA} linhas={REDES} /> },
      { desde: C[1] + 3.4, toque: [295, linhaY(0)], tela: () => <Config titulo="CasaSilva_5G" cor={CINZA} linhas={[["🔗", "Compartilhar", "Mostra o QR code"], ["⚙️", "Configurações de rede"], ["🗑️", "Esquecer"]]} /> },
      { desde: C[2] + 0.5, toque: [295, linhaY(0)], tela: (t) => <Centro cor="#102027"><div style={{ color: "#fff", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: 34, marginTop: 120 }}>Confirme que é você</div>
        <div style={{ fontSize: 170, marginTop: 70, filter: t >= C[2] + 1.8 ? "drop-shadow(0 0 30px #4caf50)" : "none" }}>{t >= C[2] + 1.8 ? "✅" : "👆"}</div></div></Centro> },
      { desde: C[3], tela: (t) => qr(t) },
      { desde: C[4], tela: (t) => <Centro cor="#111"><div style={{ color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
        <div style={{ fontSize: 26, opacity: 0.8, marginBottom: 20 }}>📷 Câmera do outro celular</div>
        <div style={{ border: "6px solid #fff", borderRadius: 20, padding: 20 }}><QR tam={260} /></div></div>
        {t >= C[4] + 1.2 && <Toast desde={C[4] + 1.2} texto="Wi-Fi: CasaSilva_5G · Conectar ✓" />}</Centro> },
    ]}
    ganchos={[{ desde: 0, texto: "Veja a senha do WI-FI 📶", destaque: ["WI-FI"] }, { desde: C[1], texto: "Toque na sua rede", destaque: ["rede"] },
      { desde: C[2], texto: "Compartilhar + digital", destaque: ["Compartilhar"] }, { desde: C[3], texto: "A senha aparece!", destaque: ["senha"] },
      { desde: C[4], texto: "Ou leia o QR code", destaque: ["QR"] }]}
    final={{ emoji: "📶", frase: <>Senha<br />recuperada.</> }} />;
};

// ---------- bloquear anúncios ----------
const Noticia: React.FC<{ anuncio: boolean }> = ({ anuncio }) => {
  const { t } = useT();
  return <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
    <BarraStatus cor="#fff" claro={false} />
    <div style={{ padding: "20px 30px", fontSize: 34, fontWeight: 800, color: "#111" }}>📰 Notícias do dia</div>
    {[1, 0.9, 0.95, 0.7, 1, 0.85].map((w, i) => <div key={i} style={{ margin: "18px 30px", height: 18, width: `${w * 85}%`, borderRadius: 9, background: "#e0e0e0" }} />)}
    {anuncio ? <>
      <div style={{ position: "absolute", left: 30, right: 30, top: 470, height: 260, borderRadius: 20, background: "linear-gradient(135deg,#ff1744,#ff9100)", color: "#fff",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 900, transform: `scale(${1 + Math.sin(t * 9) * 0.03})` }}>
        🎰 GANHE R$ 1.000!<div style={{ fontSize: 24, fontWeight: 600, marginTop: 10 }}>Clique aqui agora</div>
        <div style={{ position: "absolute", right: 14, top: 10, fontSize: 26 }}>✕</div><div style={{ position: "absolute", left: 14, top: 10, fontSize: 18, opacity: 0.8 }}>Anúncio</div></div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 120, background: "#ffeb3b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800 }}>📢 BAIXE O APP AGORA!</div></>
      : <><div style={{ position: "absolute", left: 30, right: 30, top: 470, height: 200, borderRadius: 20, background: "#e8f5e9", border: "4px dashed #43a047", color: "#2e7d32",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 800 }}>✓ Sem anúncios</div>
        {[0.9, 1, 0.8].map((w, i) => <div key={i} style={{ margin: "18px 30px", height: 18, width: `${w * 85}%`, borderRadius: 9, background: "#e0e0e0", position: "relative", top: 240 }} />)}</>}
  </div>;
};
const HOST = "dns.adguard-dns.com";
const TelaDNS: React.FC<{ host: boolean; desde: number; salvo?: boolean }> = ({ host, desde, salvo }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
    <Topo titulo="DNS privado" />
    {["Desativado", "Automático", "Nome do host do provedor"].map((o, i) => <Opcao key={o} texto={o} on={host ? i === 2 : i === 1} />)}
    {host && <div style={{ margin: "14px 34px", borderBottom: `4px solid ${AZUL}`, fontSize: 36, padding: "12px 4px", color: "#111", fontWeight: 700 }}>
      {salvo ? HOST : <Digitando texto={HOST} desde={desde} cps={9} />}</div>}
    <Botao texto={salvo ? "Salvo ✓" : "Salvar"} cor={AZUL} y={680} />
  </div>
);
export const BloquearAnuncios: React.FC = () => {
  const C = tAds.cenas;
  const busca = (t: number) => <div style={{ position: "absolute", inset: 0, background: "#fff" }}><BarraStatus cor="#fff" claro={false} />
    <div style={{ margin: "26px 24px", height: 80, borderRadius: 40, background: "#f1f3f4", display: "flex", alignItems: "center", padding: "0 28px", fontSize: 30, color: "#111" }}>
      🔍&nbsp;<Digitando texto="DNS privado" desde={C[1] + 0.5} cps={10} /></div>
    {t >= C[1] + 1.8 && <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px 34px", background: t >= C[1] + 2.6 ? "#e3f2fd" : "#fff" }}>
      <span style={{ fontSize: 40 }}>🔒</span><div><div style={{ fontSize: 31, fontWeight: 600, color: "#111" }}>DNS privado</div><div style={{ fontSize: 24, color: "#667" }}>Conexões › Mais configurações</div></div></div>}</div>;
  return <ShortEtapas id="BloquearAnuncios" tempos={tAds}
    etapas={[
      { desde: 0, tela: () => <Noticia anuncio /> },
      { desde: C[1] + 0.2, tela: (t) => busca(t) },
      { desde: C[1] + 3.0, toque: [295, 220], tela: () => <TelaDNS host={false} desde={0} /> },
      { desde: C[2] + 0.6, toque: [295, 405], tela: () => <TelaDNS host desde={C[2] + 1.0} /> },
      { desde: C[3] + 0.4, toque: [295, 680], tela: () => <><TelaDNS host salvo desde={0} /><Toast desde={C[3] + 0.5} texto="DNS privado ativado ✓" /></> },
      { desde: C[3] + 2.2, tela: () => <Noticia anuncio={false} /> },
      { desde: C[4], tela: () => <><Noticia anuncio={false} /><Aviso desde={C[4] + 0.2} emoji="▶️" titulo="YouTube continua igual" texto={<>Para voltar ao normal:<br />DNS privado › Desativado.</>} cor="#f57c00" /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Bloqueie os ANÚNCIOS 🚫", destaque: ["ANÚNCIOS"] }, { desde: C[1], texto: "Procure DNS privado", destaque: ["DNS"] },
      { desde: C[2], texto: HOST, destaque: [HOST] }, { desde: C[3], texto: "Os anúncios somem", destaque: ["somem"] },
      { desde: C[4], texto: "Só o YouTube não", destaque: ["YouTube"] }]}
    final={{ emoji: "🚫", frase: <>Adeus,<br />anúncios.</> }} />;
};

// ---------- ligações desconhecidas ----------
const NUM = "+55 11 9 8765-4321";
const ListaLig: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
    <Topo titulo="Ligações" cor="#075E54" />
    {[[NUM, "Hoje, 10:12", true], ["+55 21 9 9123-0000", "Hoje, 09:40", true], ["Mãe", "Ontem, 19:02", false]].map(([n, h, s]) => (
      <div key={n as string} style={{ height: 112, display: "flex", alignItems: "center", gap: 20, padding: "0 28px", borderBottom: "1px solid #eee" }}>
        <Avatar letra={s ? "?" : "M"} cor={s ? "#bdbdbd" : "#EC407A"} tam={70} />
        <div style={{ flex: 1 }}><div style={{ fontSize: 30, fontWeight: 600, color: "#111" }}>{n as string}</div>
          <div style={{ fontSize: 24, color: s ? "#e65100" : "#667" }}>{s ? "🔕 Silenciada · " : "📞 "}{h as string}</div></div></div>))}
  </div>
);
export const LigacoesDesconhecidas: React.FC = () => {
  const C = tLig.cenas;
  const PRIV: [string, string, string?][] = [["👁️", "Visto por último e online"], ["🖼️", "Foto do perfil"], ["✓✓", "Confirmações de leitura"], ["📞", "Ligações", "Silenciar números desconhecidos"], ["🚫", "Contatos bloqueados"]];
  const lig = (on: number) => <Config titulo="Ligações" linhas={[["🔕", "Silenciar números desconhecidos", "Elas aparecem na lista, sem tocar"]]} marca={0} direita={() => <Chave ligada={on} />} />;
  return <ShortEtapas id="LigacoesDesconhecidas" tempos={tLig}
    etapas={[
      { desde: 0, tela: () => <Chamada nome={NUM} sub="Chamada de voz do WhatsApp" avatar={<Avatar letra="?" cor="#bdbdbd" tam={220} />} /> },
      { desde: C[1] + 0.2, tela: () => <Config titulo="Configurações" linhas={CFG} /> },
      { desde: C[1] + 1.8, toque: [295, linhaY(1)], tela: () => <Config titulo="Privacidade" linhas={PRIV} /> },
      { desde: C[1] + 3.4, toque: [295, linhaY(3)], tela: () => lig(0) },
      { desde: C[2] + 1.0, toque: [500, linhaY(0)], tela: () => lig(1) },
      { desde: C[3], tela: () => <Grande emoji="🔕" titulo={<>Número estranho?<br />Não toca.</>} cor="#0b3d33" /> },
      { desde: C[3] + 2.6, tela: () => <ListaLig /> },
      { desde: C[4], tela: () => <Chamada nome="Mãe" sub="Chamando... 🔔" avatar={<Avatar letra="M" cor="#EC407A" tam={220} />} /> },
    ]}
    ganchos={[{ desde: 0, texto: "Silencie LIGAÇÕES estranhas 📵", destaque: ["LIGAÇÕES"] }, { desde: C[1], texto: "Privacidade › Ligações", destaque: ["Ligações"] },
      { desde: C[2], texto: "Silenciar desconhecidos", destaque: ["Silenciar"] }, { desde: C[3], texto: "Não toca mais", destaque: ["toca"] },
      { desde: C[4], texto: "Contatos tocam normal", destaque: ["normal"] }]}
    final={{ emoji: "🔕", frase: <>Paz no<br />celular.</> }} />;
};

// ---------- limite de tempo nos apps ----------
const USO: [string, string, string, string][] = [["📸", "Instagram", "2 h 05 min", "#E1306C"], ["🎵", "TikTok", "1 h 30 min", "#111"], ["💬", "WhatsApp", "37 min", "#25D366"]];
const Painel: React.FC<{ timers: number; marca?: number }> = ({ timers, marca = -1 }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
    <Topo titulo="Painel" />
    <div style={{ display: "flex", justifyContent: "center", margin: "30px 0" }}>
      <div style={{ width: 230, height: 230, borderRadius: "50%", background: "conic-gradient(#E1306C 0 180deg,#111 180deg 310deg,#25D366 310deg 360deg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 160, height: 160, borderRadius: "50%", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#111" }}>
          <b style={{ fontSize: 34 }}>4 h 12</b><span style={{ fontSize: 20, color: "#667" }}>hoje</span></div></div></div>
    {USO.map(([e, n, h, c], i) => <div key={n} style={{ height: 104, display: "flex", alignItems: "center", gap: 20, padding: "0 28px", borderBottom: "1px solid #eee", background: i === marca ? "#e3f2fd" : "#fff" }}>
      <div style={{ width: 64, height: 64, borderRadius: 16, background: c, fontSize: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>{e}</div>
      <div style={{ flex: 1 }}><div style={{ fontSize: 30, fontWeight: 600, color: "#111" }}>{n}</div><div style={{ fontSize: 24, color: "#667" }}>{h}</div></div>
      <div style={{ fontSize: 26, color: i < timers ? AZUL : "#999", fontWeight: 700 }}>⏳ {i < timers ? "30 min" : ""}</div></div>)}
  </div>
);
const Inicio: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#283593,#6a1b9a)" }}><BarraStatus cor="transparent" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 40, padding: "120px 50px" }}>
      {USO.concat([["📷", "Câmera", "", "#546e7a"], ["🗺️", "Mapas", "", "#43a047"], ["⚙️", "Ajustes", "", "#757575"]]).map(([e, n, , c]) => (
        <div key={n} style={{ textAlign: "center", color: "#fff", fontSize: 22, filter: n === "Instagram" ? "grayscale(1)" : "none", opacity: n === "Instagram" ? 0.6 : 1 }}>
          <div style={{ width: 110, height: 110, margin: "0 auto 10px", borderRadius: 28, background: c, fontSize: 60, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>{e}
            {n === "Instagram" && <span style={{ position: "absolute", right: -10, bottom: -10, fontSize: 40 }}>⏳</span>}</div>{n}</div>))}
    </div>
  </div>
);
export const LimiteApps: React.FC = () => {
  const C = tLim.cenas;
  return <ShortEtapas id="LimiteApps" tempos={tLim}
    etapas={[
      { desde: 0, tela: () => <Grande emoji="⏳" titulo={<>4 horas no<br />celular hoje?</>} sub="coloque um limite" /> },
      { desde: C[1] + 0.2, tela: () => <Config titulo="Configurações" cor={CINZA} linhas={[["📶", "Conexões"], ["🔔", "Notificações"], ["⏳", "Bem-estar digital", "Tempo de uso e timers"], ["🔋", "Bateria"]]} /> },
      { desde: C[1] + 1.8, toque: [295, linhaY(2)], tela: () => <Painel timers={0} /> },
      { desde: C[2] + 0.4, toque: [480, 180 + 290 + 52], tela: (t) => <><Painel timers={0} marca={0} />
        <Dialogo titulo="Timer do Instagram" opcoes={["15 min", "30 min", "1 hora"]} marcada={t >= C[2] + 2.2 ? 1 : -1} aparece={aparece(t, C[2] + 0.4)} /></> },
      { desde: C[2] + 3.6, tela: () => <Painel timers={1} marca={0} /> },
      { desde: C[3], tela: () => <><Inicio /><Toast desde={C[3] + 0.8} texto="Instagram pausado: o timer acabou. Volta amanhã." /></> },
      { desde: C[4], tela: () => <Painel timers={2} /> },
    ]}
    ganchos={[{ desde: 0, texto: "Limite no INSTAGRAM ⏳", destaque: ["INSTAGRAM"] }, { desde: C[1], texto: "Bem-estar digital", destaque: ["Bem-estar"] },
      { desde: C[2], texto: "Timer de 30 min", destaque: ["30"] }, { desde: C[3], texto: "Acabou? Fica cinza", destaque: ["cinza"] },
      { desde: C[4], texto: "Vale para qualquer app", destaque: ["qualquer"] }]}
    final={{ emoji: "⏳", frase: <>Mais tempo<br />para você.</> }} />;
};

// ---------- liberar espaço ----------
const Uso: React.FC<{ p: number; cor: string }> = ({ p, cor }) => (
  <div style={{ width: "100%", height: 26, borderRadius: 13, background: "#e0e0e0", overflow: "hidden", marginTop: 16 }}>
    <div style={{ width: `${p * 100}%`, height: "100%", background: cor }} /></div>
);
const CARTOES: [string, string, string][] = [["🗑️", "Arquivos inúteis", "1,2 GB"], ["🖼️", "Fotos repetidas", "860 MB"], ["🎬", "Vídeos grandes", "3,4 GB"], ["😂", "Memes antigos", "540 MB"]];
const Limpar: React.FC<{ feito: number }> = ({ feito }) => (
  <div style={{ position: "absolute", inset: 0, background: "#f1f3f4" }}>
    <Topo titulo="Arquivos" cor={AZUL} />
    {CARTOES.map(([e, n, g], i) => <div key={n} style={{ margin: "16px 20px", background: "#fff", borderRadius: 20, padding: "18px 22px", display: "flex", alignItems: "center", gap: 18 }}>
      <span style={{ fontSize: 46 }}>{e}</span><div style={{ flex: 1 }}><div style={{ fontSize: 29, fontWeight: 700, color: "#111" }}>{n}</div><div style={{ fontSize: 24, color: "#667" }}>{g}</div></div>
      <div style={{ padding: "12px 22px", borderRadius: 24, background: i < feito ? "#e8f5e9" : AZUL, color: i < feito ? "#2e7d32" : "#fff", fontSize: 24, fontWeight: 700 }}>{i < feito ? "✓ Feito" : "Limpar"}</div></div>)}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 100, background: "#fff", display: "flex", justifyContent: "space-around", alignItems: "center", fontSize: 24, color: "#555" }}>
      <b style={{ color: AZUL }}>✨ Limpar</b><span>📁 Navegar</span><span>↔️ Compartilhar</span></div>
  </div>
);
export const ArquivosLimpar: React.FC = () => {
  const C = tEsp.cenas;
  const cheio = (p: number, cor: string, txt: string) => <Centro><div style={{ fontSize: 120, marginTop: 50 }}>📱</div><b style={{ fontSize: 38 }}>Armazenamento</b>
    <div style={{ width: "100%" }}><Uso p={p} cor={cor} /></div><div style={{ fontSize: 30, marginTop: 14, color: cor, fontWeight: 700 }}>{txt}</div></Centro>;
  const apps = <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#0d47a1,#1976d2)" }}><BarraStatus cor="transparent" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 40, padding: "120px 50px" }}>
      {[["📁", "Arquivos", AZUL], ["📷", "Câmera", "#546e7a"], ["💬", "WhatsApp", "#25D366"], ["🗺️", "Mapas", "#43a047"], ["🎵", "Música", "#e53935"], ["⚙️", "Ajustes", "#757575"]].map(([e, n, c]) => (
        <div key={n} style={{ textAlign: "center", color: "#fff", fontSize: 22 }}><div style={{ width: 110, height: 110, margin: "0 auto 10px", borderRadius: 28, background: c, fontSize: 60,
          display: "flex", alignItems: "center", justifyContent: "center", boxShadow: n === "Arquivos" ? "0 0 0 8px rgba(255,255,255,.6)" : "none" }}>{e}</div>{n}</div>))}</div></div>;
  return <ShortEtapas id="ArquivosLimpar" tempos={tEsp}
    etapas={[
      { desde: 0, tela: () => cheio(0.98, "#e53935", "98% usado · quase cheio!") },
      { desde: C[1] + 0.2, tela: () => apps },
      { desde: C[1] + 2.6, toque: [118, 120 + 55 + 50], tela: () => <Limpar feito={0} /> },
      { desde: C[2], tela: () => <Limpar feito={0} /> },
      { desde: C[3] + 0.3, toque: [500, 180 + 16 + 55], tela: (t) => <><Limpar feito={0} />
        <Dialogo titulo="Limpar 1,2 GB de arquivos inúteis?" opcoes={["CANCELAR", "LIMPAR"]} marcada={t >= C[3] + 1.6 ? 1 : -1} aparece={aparece(t, C[3] + 0.3)} /></> },
      { desde: C[3] + 2.6, tela: () => <Limpar feito={1} /> },
      { desde: C[4], tela: (t) => cheio(0.98 - Math.min(1, (t - C[4]) / 1.2) * 0.1, "#43a047", "Espaço livre de novo ✓") },
    ]}
    ganchos={[{ desde: 0, texto: "Celular SEM ESPAÇO? 📁", destaque: ["ESPAÇO?"] }, { desde: C[1], texto: "App Arquivos", destaque: ["Arquivos"] },
      { desde: C[2], texto: "Toque em Limpar", destaque: ["Limpar"] }, { desde: C[3], texto: "Confira e limpe", destaque: ["limpe"] },
      { desde: C[4], texto: "Espaço livre!", destaque: ["livre!"] }]}
    final={{ emoji: "📁", frase: <>Celular<br />leve de novo.</> }} />;
};
