// Leva 10 (07/10): buscas em alta — celular sem som, não carrega, Gmail cheio, modo de segurança, Wi-Fi sem internet.
import React from "react";
import tSom from "../../public/CelularSemSom/tempos.json";
import tCar from "../../public/NaoCarrega/tempos.json";
import tGma from "../../public/GmailCheio/tempos.json";
import tSeg from "../../public/ModoSeguranca/tempos.json";
import tWif from "../../public/WifiSemInternet/tempos.json";
import { BarraStatus, Digitando, mola, useT } from "../kit";
import { Aviso, ShortEtapas } from "./Leva2";
import { Grande } from "./Leva4";

const CINZA = "#37474f";
const AZUL = "#1a73e8";
const VERDE = "#1e8e3e";
const VERMELHO = "#c62828";
const prog = (t: number, a: number, b: number) => Math.max(0, Math.min(1, (t - a) / (b - a)));
const Toast: React.FC<{ texto: string; desde: number }> = ({ texto, desde }) => {
  const { frame, fps } = useT();
  const m = mola(frame, desde, fps, 14);
  return <div style={{ position: "absolute", left: 50, right: 50, bottom: 120, background: "rgba(40,40,40,.92)", color: "#fff", borderRadius: 30, padding: "18px 24px",
    fontSize: 27, textAlign: "center", transform: `translateY(${(1 - m) * 60}px)`, opacity: Math.min(1, m * 1.5) }}>{texto}</div>;
};
const Topo: React.FC<{ titulo: React.ReactNode; cor?: string }> = ({ titulo, cor = CINZA }) => <><BarraStatus cor={cor} />
  <div style={{ height: 130, background: cor, color: "#fff", display: "flex", alignItems: "center", padding: "0 28px", fontSize: 34, fontWeight: 700, gap: 22 }}>
    <span style={{ fontSize: 36 }}>←</span>{titulo}</div></>;
const Barra: React.FC<{ p: number; cor?: string }> = ({ p, cor = AZUL }) => (
  <div style={{ width: "100%", height: 22, borderRadius: 11, background: "#e0e0e0", overflow: "hidden" }}><div style={{ width: `${p * 100}%`, height: "100%", background: cor }} /></div>
);
const Chave2: React.FC<{ on: boolean }> = ({ on }) => (
  <div style={{ width: 92, height: 50, borderRadius: 25, background: on ? AZUL : "#bdbdbd", position: "relative" }}>
    <div style={{ position: "absolute", top: 5, left: on ? 47 : 5, width: 40, height: 40, borderRadius: 20, background: "#fff" }} /></div>
);
/** Painel de notificações: ícones rápidos em cima e notificações embaixo. */
const Painel: React.FC<{ rapidos: [string, string, boolean][]; notifs: [string, string, string?][]; marca?: number; marcaRapido?: number; icones?: string }> = ({ rapidos, notifs, marca = -1, marcaRapido = -1, icones = "" }) => (
  <div style={{ position: "absolute", inset: 0, background: "#1f2327", color: "#fff" }}>
    <div style={{ height: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px", fontSize: 24 }}><b>9:41</b><span>{icones} 📶 🔋</span></div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, padding: "20px 22px" }}>
      {rapidos.map(([e, n, on], i) => <div key={n} style={{ height: 96, borderRadius: 48, background: on ? "#8ab4f8" : "#3c4043", color: on ? "#111" : "#fff", display: "flex", alignItems: "center", gap: 14, padding: "0 22px",
        fontSize: 25, fontWeight: 600, outline: i === marcaRapido ? "5px solid #ffd43b" : "none" }}><span style={{ fontSize: 34 }}>{e}</span>{n}</div>)}
    </div>
    <div style={{ padding: "10px 22px", display: "grid", gap: 14 }}>
      {notifs.map(([e, n, s], i) => <div key={n} style={{ background: i === marca ? "#3d4a5c" : "#2d3135", borderRadius: 26, padding: "22px 24px", display: "flex", gap: 18, alignItems: "center",
        outline: i === marca ? "5px solid #ffd43b" : "none" }}><span style={{ fontSize: 46 }}>{e}</span><div><b style={{ fontSize: 27 }}>{n}</b>{s && <div style={{ fontSize: 22, opacity: 0.75, marginTop: 4 }}>{s}</div>}</div></div>)}
    </div>
  </div>
);
/** Parte de baixo do celular, com a entrada; a escova tira a poeira. */
const Entrada: React.FC<{ desde: number; ok: string }> = ({ desde, ok }) => {
  const { t } = useT();
  const p = prog(t, desde + 0.6, desde + 3.2);
  const x = 150 + Math.sin(t * 9) * 70;
  return <div style={{ position: "absolute", inset: 0, background: "#eceff1" }}><BarraStatus cor="#eceff1" claro={false} />
    <div style={{ position: "absolute", left: 45, right: 45, top: 380, height: 300, borderRadius: "0 0 70px 70px", background: "#263238" }}>
      <div style={{ position: "absolute", left: 180, top: 200, width: 140, height: 46, borderRadius: 23, background: "#0b0f12" }}>
        {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{ position: "absolute", left: 18 + i * 19, top: 14 + (i % 2) * 10, width: 12, height: 12, borderRadius: 6, background: "#a1887f", opacity: 1 - p }} />)}</div>
    </div>
    {p < 1 && t >= desde + 0.4 && <div style={{ position: "absolute", left: 80 + x, top: 520, fontSize: 110, transform: "rotate(-30deg)" }}>🖌️</div>}
    <div style={{ position: "absolute", left: 0, right: 0, top: 760, textAlign: "center", fontSize: 32, fontWeight: 700, color: p >= 1 ? VERDE : "#455a64" }}>{p >= 1 ? ok : "Escova seca, com cuidado"}</div>
  </div>;
};
const MenuDesligar: React.FC<{ marca: number }> = ({ marca }) => (
  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.75)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
    {[["📴", "Desligar", "#e53935"], ["🔄", "Reiniciar", "#43a047"]].map(([e, n, c], i) => (
      <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: "#fff", fontSize: 30, fontWeight: 600 }}>
        <div style={{ width: 150, height: 150, borderRadius: 75, background: c, fontSize: 70, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: i === marca ? "0 0 0 12px rgba(255,255,255,.35)" : "none" }}>{e}</div>{n}</div>))}
  </div>
);
const Reiniciando: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: "#000", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, fontSize: 32 }}>
    <div style={{ fontSize: 110 }}>🔄</div>Reiniciando...</div>
);

// ---------- celular sem som ----------
const RAP_SOM = (dnd: boolean): [string, string, boolean][] => [["📶", "Wi-Fi", true], ["🔵", "Bluetooth", false], ["🔕", "Não perturbe", dnd], ["🔦", "Lanterna", false]];
export const CelularSemSom: React.FC = () => {
  const C = tSom.cenas;
  return <ShortEtapas id="CelularSemSom" tempos={tSom}
    etapas={[
      { desde: 0, tela: () => <Grande emoji="🔇" titulo={<>Celular<br />sem som?</>} sub="mesmo com o volume no máximo" cor="#1a237e" /> },
      { desde: C[1] + 0.2, tela: () => <Painel icones="🎧" rapidos={RAP_SOM(false)} notifs={[["🎧", "Fone de ouvido conectado", "Áudio saindo pelo fone"], ["💬", "Mensagens", "2 novas mensagens"]]} marca={-1} /> },
      { desde: C[1] + 2.4, tela: () => <Painel icones="🎧" rapidos={RAP_SOM(false)} notifs={[["🎧", "Fone de ouvido conectado", "Áudio saindo pelo fone"], ["💬", "Mensagens", "2 novas mensagens"]]} marca={0} /> },
      { desde: C[2] + 0.2, tela: () => <Entrada desde={C[2] + 0.2} ok="Entrada limpa ✓" /> },
      { desde: C[3] + 0.2, tela: () => <Painel rapidos={RAP_SOM(true)} notifs={[]} marcaRapido={2} /> },
      { desde: C[3] + 2.2, toque: [430, 172], tela: () => <Painel rapidos={RAP_SOM(false)} notifs={[]} /> },
      { desde: C[4] + 0.1, tela: () => <><Painel rapidos={RAP_SOM(false)} notifs={[]} /><MenuDesligar marca={1} /></> },
      { desde: C[4] + 1.8, toque: [295, 690], tela: () => <><Reiniciando /><Toast desde={C[4] + 2.3} texto="Som de volta 🔊" /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Celular SEM SOM? 🔇", destaque: ["SEM", "SOM?"] }, { desde: C[1], texto: "Acha que tem FONE", destaque: ["FONE"] },
      { desde: C[2], texto: "Limpe a entrada", destaque: ["entrada"] }, { desde: C[3], texto: "Não perturbe desligado", destaque: ["desligado"] },
      { desde: C[4], texto: "Reinicie o celular", destaque: ["Reinicie"] }]}
    final={{ emoji: "🔊", frase: <>Som de volta.</> }} />;
};

// ---------- celular não carrega ----------
const Cabos: React.FC<{ desde: number }> = ({ desde }) => {
  const { t } = useT();
  const novo = t >= desde + 2.6;
  const p = prog(t, desde + 3.0, desde + 5.5);
  return <div style={{ position: "absolute", inset: 0, background: "#fff" }}><BarraStatus cor="#fff" claro={false} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26, marginTop: 70, padding: "0 50px", textAlign: "center" }}>
      <div style={{ fontSize: 150 }}>🔌</div>
      <div style={{ padding: "20px 30px", borderRadius: 24, background: novo ? "#e6f4ea" : "#fdecea", fontSize: 32, fontWeight: 700, color: novo ? VERDE : VERMELHO }}>{novo ? "Cabo novo ✓" : "Cabo quebrado por dentro ✗"}</div>
      {novo && <><div style={{ width: 170, height: 290, borderRadius: 24, border: "10px solid #555", position: "relative", overflow: "hidden", marginTop: 20 }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${15 + p * 60}%`, background: "#43a047" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 70 }}>⚡</div></div>
        <b style={{ fontSize: 30, color: "#333" }}>Carregando {Math.round(15 + p * 60)}%</b></>}
    </div></div>;
};
const Umidade: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}><BarraStatus cor="#fff" claro={false} />
    <div style={{ position: "absolute", left: 30, right: 30, top: 260, borderRadius: 32, background: "#fff", boxShadow: "0 10px 40px rgba(0,0,0,.25)", padding: "40px 34px", textAlign: "center" }}>
      <div style={{ fontSize: 120 }}>💧</div><b style={{ fontSize: 36, color: "#111" }}>Umidade detectada</b>
      <div style={{ fontSize: 27, color: "#555", marginTop: 16, lineHeight: 1.35 }}>Desconecte o cabo e espere a entrada secar.</div>
      <div style={{ marginTop: 26, fontSize: 30, fontWeight: 700, color: AZUL }}>OK</div></div>
  </div>
);
export const NaoCarrega: React.FC = () => {
  const C = tCar.cenas;
  return <ShortEtapas id="NaoCarrega" tempos={tCar}
    etapas={[
      { desde: 0, tela: () => <Grande emoji="🔌" titulo={<>Celular<br />não carrega?</>} sub="fica só no raio" cor="#311b92" /> },
      { desde: C[1] + 0.2, tela: () => <Cabos desde={C[1] + 0.2} /> },
      { desde: C[2] + 0.2, tela: () => <Entrada desde={C[2] + 0.4} ok="Sem poeira ✓" /> },
      { desde: C[3] + 0.2, tela: () => <Umidade /> },
      { desde: C[3] + 3.2, toque: [295, 600], tela: () => <><Umidade /><Aviso desde={C[3] + 3.3} emoji="⏳" titulo="Deixe secar" texto={<>Algumas horas.<br />Nada de secador!</>} cor={AZUL} /></> },
      { desde: C[4], tela: () => <><Grande emoji="🔧" titulo={<>Ainda não<br />carrega?</>} sub="bateria ou entrada: assistência" cor="#311b92" /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Celular NÃO CARREGA? 🔌", destaque: ["NÃO", "CARREGA?"] }, { desde: C[1], texto: "Troque cabo e tomada", destaque: ["cabo"] },
      { desde: C[2], texto: "Limpe a entrada", destaque: ["entrada"] }, { desde: C[3], texto: "Umidade? Deixe secar", destaque: ["secar"] },
      { desde: C[4], texto: "Ainda não? Assistência", destaque: ["Assistência"] }]}
    final={{ emoji: "🔋", frase: <>Carregando<br />de novo.</> }} />;
};

// ---------- Gmail cheio ----------
const Armazenamento: React.FC<{ usado: number }> = ({ usado }) => {
  const g = usado / 15;
  const partes: [string, number, string][] = usado > 10 ? [["Gmail", 6.1, "#ea4335"], ["Fotos", 5.9, "#fbbc04"], ["Drive", 2.8, "#4285f4"]] : [["Gmail", 0.9, "#ea4335"], ["Fotos", 5.9, "#fbbc04"], ["Drive", 2.8, "#4285f4"]];
  return <div style={{ position: "absolute", inset: 0, background: "#fff" }}><Topo titulo="Armazenamento" cor="#fff" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 50, height: 130, display: "flex", alignItems: "center", padding: "0 28px", gap: 22, fontSize: 34, fontWeight: 700, color: "#111", background: "#fff" }}><span style={{ fontSize: 36 }}>←</span>Armazenamento</div>
    <div style={{ padding: "40px 34px" }}>
      <b style={{ fontSize: 50, color: g > 0.9 ? VERMELHO : VERDE }}>{usado.toFixed(1).replace(".", ",")} GB</b><span style={{ fontSize: 30, color: "#555" }}> de 15 GB</span>
      <div style={{ display: "flex", height: 34, borderRadius: 17, overflow: "hidden", background: "#e0e0e0", marginTop: 24 }}>{partes.map(([n, v, c]) => <div key={n} style={{ width: `${v / 15 * 100}%`, background: c }} />)}</div>
      <div style={{ marginTop: 34, display: "grid", gap: 22 }}>{partes.map(([n, v, c]) => <div key={n} style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: "#222" }}>
        <div style={{ width: 26, height: 26, borderRadius: 13, background: c }} /><span style={{ flex: 1 }}>{n}</span><b>{v.toFixed(1).replace(".", ",")} GB</b></div>)}</div>
      {g > 0.9 && <div style={{ marginTop: 40, padding: "20px 24px", borderRadius: 20, background: "#fdecea", color: VERMELHO, fontSize: 27, fontWeight: 600 }}>⚠️ Sem espaço: novos e-mails não chegam</div>}
    </div></div>;
};
const EMAILS: [string, string, string][] = [["Loja Online", "50% OFF só hoje!", "#ff7043"], ["App de Delivery", "Cupom de frete grátis", "#ab47bc"], ["Rede Social", "Você tem 9 notificações", "#42a5f5"], ["Supermercado", "Ofertas da semana", "#66bb6a"], ["Cinema", "Estreias de outubro", "#ffa726"], ["Banco Digital", "Conheça o cartão novo", "#26a69a"]];
const GRANDES: [string, string, string][] = [["Fotos da viagem", "📎 IMG_2019.zip", "25 MB"], ["Vídeo do aniversário", "📎 VID_0412.mp4", "24 MB"], ["Apresentação antiga", "📎 slides.pptx", "18 MB"], ["Scan dos documentos", "📎 docs.pdf", "12 MB"]];
const CaixaGmail: React.FC<{ titulo: string; busca?: React.ReactNode; itens: [string, string, string][]; marcados: boolean; vazio?: boolean }> = ({ titulo, busca, itens, marcados, vazio }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}><BarraStatus cor="#fff" claro={false} />
    <div style={{ margin: "16px 22px", height: 84, borderRadius: 42, background: "#eef2f7", display: "flex", alignItems: "center", padding: "0 26px", fontSize: 28, color: "#444", gap: 14 }}>
      🔍 <span style={{ flex: 1 }}>{busca ?? "Pesquisar no e-mail"}</span></div>
    <div style={{ padding: "10px 28px", fontSize: 26, color: "#666", display: "flex", justifyContent: "space-between" }}><span>{titulo}</span>{marcados && !vazio && <b style={{ color: VERMELHO }}>🗑️ Excluir</b>}</div>
    {!vazio && itens.map(([a, b, c], i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, padding: "18px 28px", background: marcados ? "#e8f0fe" : "#fff", borderBottom: "1px solid #f0f0f0" }}>
      <div style={{ width: 62, height: 62, borderRadius: 31, background: marcados ? AZUL : c.startsWith("#") ? c : "#8d6e63", color: "#fff", fontSize: 30, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{marcados ? "✓" : a[0]}</div>
      <div style={{ flex: 1, minWidth: 0 }}><b style={{ fontSize: 27, color: "#111" }}>{a}</b><div style={{ fontSize: 23, color: "#666" }}>{b}</div></div>
      {!c.startsWith("#") && <b style={{ fontSize: 24, color: VERMELHO }}>{c}</b>}</div>)}
    {vazio && <div style={{ textAlign: "center", marginTop: 160, fontSize: 30, color: "#777" }}><div style={{ fontSize: 110 }}>🗑️</div>Nada na lixeira</div>}
  </div>
);
export const GmailCheio: React.FC = () => {
  const C = tGma.cenas;
  return <ShortEtapas id="GmailCheio" tempos={tGma}
    etapas={[
      { desde: 0, tela: () => <Grande emoji="📧" titulo={<>Gmail<br />cheio?</>} sub="e-mail novo não chega" cor="#8e1b14" /> },
      { desde: C[1] + 0.2, tela: () => <Armazenamento usado={14.8} /> },
      { desde: C[2] + 0.2, tela: () => <CaixaGmail titulo="Promoções · 1.248 conversas" itens={EMAILS} marcados={false} /> },
      { desde: C[2] + 2.0, toque: [80, 330], tela: () => <CaixaGmail titulo="Promoções · tudo selecionado" itens={EMAILS} marcados /> },
      { desde: C[2] + 4.2, toque: [480, 245], tela: () => <><CaixaGmail titulo="Promoções" itens={[]} marcados={false} vazio /><Toast desde={C[2] + 4.3} texto="1.248 conversas excluídas" /></> },
      { desde: C[3] + 0.2, tela: () => <CaixaGmail titulo="Resultados" busca={<Digitando texto="larger:10M" desde={C[3] + 0.4} cps={6} />} itens={[]} marcados={false} /> },
      { desde: C[3] + 3.0, tela: () => <CaixaGmail titulo="Anexos grandes" busca="larger:10M" itens={GRANDES} marcados={false} /> },
      { desde: C[3] + 6.6, toque: [80, 330], tela: () => <CaixaGmail titulo="Anexos grandes · selecionados" busca="larger:10M" itens={GRANDES} marcados /> },
      { desde: C[4] + 0.2, toque: [480, 245], tela: () => <><CaixaGmail titulo="Lixeira" itens={GRANDES} marcados={false} /><div style={{ position: "absolute", left: 40, right: 40, top: 900, height: 90, borderRadius: 45, background: VERMELHO, color: "#fff", fontSize: 30, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>Esvaziar lixeira agora</div></> },
      { desde: C[4] + 2.6, toque: [295, 945], tela: () => <Armazenamento usado={9.6} /> },
    ]}
    ganchos={[{ desde: 0, texto: "Gmail CHEIO? 📧", destaque: ["CHEIO?"] }, { desde: C[1], texto: "15 GB para tudo", destaque: ["15", "GB"] },
      { desde: C[2], texto: "Apague as Promoções", destaque: ["Promoções"] }, { desde: C[3], texto: "Busque larger:10M", destaque: ["larger:10M"] },
      { desde: C[4], texto: "Esvazie a lixeira", destaque: ["lixeira"] }]}
    final={{ emoji: "📬", frase: <>Espaço<br />liberado.</> }} />;
};

// ---------- modo de segurança ----------
const APPS: [string, string, boolean][] = [["💬", "#25D366", true], ["📷", "#546e7a", false], ["🎵", "#e91e63", true], ["📍", "#43a047", false], ["🛒", "#ff9800", true], ["⚙️", "#607d8b", false], ["🎮", "#7e57c2", true], ["📞", "#1e88e5", false], ["📺", "#e53935", true]];
const Inicio: React.FC<{ seguro: boolean }> = ({ seguro }) => (
  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#3949ab,#00897b)" }}><BarraStatus cor="transparent" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, padding: "90px 50px" }}>
      {APPS.map(([e, c, baixado], i) => <div key={i} style={{ width: 120, height: 120, borderRadius: 32, background: c, fontSize: 64, display: "flex", alignItems: "center", justifyContent: "center", justifySelf: "center",
        opacity: seguro && baixado ? 0.25 : 1, filter: seguro && baixado ? "grayscale(1)" : "none" }}>{e}</div>)}
    </div>
    {seguro && <div style={{ position: "absolute", left: 26, bottom: 40, padding: "12px 22px", borderRadius: 14, background: "rgba(0,0,0,.65)", color: "#fff", fontSize: 30, fontWeight: 700 }}>Modo de segurança</div>}
  </div>
);
const Ultimo: React.FC<{ apagado: boolean }> = ({ apagado }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}><Topo titulo="Apps" />
    {[["🎮", "Jogo Turbo Grátis", "Instalado ontem", "#7e57c2"], ["💬", "Mensagens", "Instalado em 2024", "#25D366"], ["📷", "Câmera", "Do sistema", "#546e7a"]].map(([e, n, s, c], i) => (
      i === 0 && apagado ? null :
      <div key={n} style={{ height: 120, display: "flex", alignItems: "center", gap: 22, padding: "0 28px", borderBottom: "1px solid #eee", background: i === 0 ? "#fff8e1" : "#fff" }}>
        <div style={{ width: 76, height: 76, borderRadius: 20, background: c, fontSize: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>{e}</div>
        <div style={{ flex: 1 }}><div style={{ fontSize: 30, fontWeight: 600, color: "#111" }}>{n}</div><div style={{ fontSize: 23, color: i === 0 ? "#e65100" : "#667" }}>{s}</div></div>
        {i === 0 && <div style={{ padding: "12px 20px", borderRadius: 24, background: VERMELHO, color: "#fff", fontSize: 24, fontWeight: 700 }}>Desinstalar</div>}</div>))}
  </div>
);
export const ModoSeguranca: React.FC = () => {
  const C = tSeg.cenas;
  return <ShortEtapas id="ModoSeguranca" tempos={tSeg}
    etapas={[
      { desde: 0, tela: () => <Inicio seguro /> },
      { desde: C[1] + 0.2, tela: () => <><Inicio seguro /><Aviso desde={C[1] + 0.3} emoji="🛡️" titulo="Por que ligou?" texto={<>App com problema ou<br />botão errado ao ligar.</>} cor="#f57c00" /></> },
      { desde: C[2] + 0.1, tela: () => <><Inicio seguro /><MenuDesligar marca={1} /></> },
      { desde: C[2] + 2.2, toque: [295, 690], tela: () => <Reiniciando /> },
      { desde: C[3] + 0.2, tela: () => <Painel rapidos={[["📶", "Wi-Fi", true], ["🔵", "Bluetooth", false]]} notifs={[["🛡️", "Modo de segurança ativado", "Toque para desativar"], ["🔋", "Bateria", "Carregando 80%"]]} marca={-1} /> },
      { desde: C[3] + 2.6, tela: () => <Painel rapidos={[["📶", "Wi-Fi", true], ["🔵", "Bluetooth", false]]} notifs={[["🛡️", "Modo de segurança ativado", "Toque para desativar"], ["🔋", "Bateria", "Carregando 80%"]]} marca={0} /> },
      { desde: C[4] + 0.2, toque: [295, 330], tela: () => <Ultimo apagado={false} /> },
      { desde: C[4] + 2.6, toque: [500, 240], tela: () => <><Inicio seguro={false} /><Toast desde={C[4] + 2.7} texto="Tudo de volta ao normal ✓" /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Saia do MODO DE SEGURANÇA", destaque: ["MODO", "SEGURANÇA"] }, { desde: C[1], texto: "Por que ele liga?", destaque: ["liga?"] },
      { desde: C[2], texto: "Reinicie o celular", destaque: ["Reinicie"] }, { desde: C[3], texto: "Ou pelas notificações", destaque: ["notificações"] },
      { desde: C[4], texto: "Voltou? Apague o último app", destaque: ["app"] }]}
    final={{ emoji: "📱", frase: <>Celular<br />normal.</> }} />;
};

// ---------- Wi-Fi sem internet ----------
const ListaWifi: React.FC<{ estado: "sem" | "ok" | "esq"; menu?: boolean }> = ({ estado, menu }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}><Topo titulo="Wi-Fi" />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "26px 28px", fontSize: 31, fontWeight: 600, color: "#111", borderBottom: "1px solid #eee" }}>Usar Wi-Fi<Chave2 on /></div>
    {estado !== "esq" && <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "26px 28px", background: menu ? "#e8f0fe" : "#fff", borderBottom: "1px solid #eee" }}>
      <span style={{ fontSize: 44 }}>📶</span><div><b style={{ fontSize: 31, color: "#111" }}>CasaNet</b>
        <div style={{ fontSize: 24, color: estado === "sem" ? VERMELHO : VERDE }}>{estado === "sem" ? "Conectado, sem internet ⚠️" : "Conectado ✓"}</div></div></div>}
    {[["Vizinho_5G", "🔒"], ["Padaria Wi-Fi", "🔒"]].map(([n, e]) => <div key={n} style={{ display: "flex", alignItems: "center", gap: 20, padding: "26px 28px", borderBottom: "1px solid #eee", color: "#555" }}>
      <span style={{ fontSize: 40 }}>📶</span><span style={{ fontSize: 29, flex: 1 }}>{n}</span>{e}</div>)}
    {estado === "esq" && <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "26px 28px", color: "#111" }}><span style={{ fontSize: 40 }}>📶</span><span style={{ fontSize: 29, flex: 1 }}>CasaNet</span>🔒</div>}
    {menu && <div style={{ position: "absolute", left: 120, top: 420, width: 330, background: "#fff", borderRadius: 20, boxShadow: "0 10px 40px rgba(0,0,0,.3)", fontSize: 29, overflow: "hidden" }}>
      <div style={{ padding: "24px 28px", color: "#111" }}>Modificar rede</div><div style={{ padding: "24px 28px", background: "#fdecea", color: VERMELHO, fontWeight: 700 }}>Esquecer</div></div>}
  </div>
);
const Roteador: React.FC<{ desde: number }> = ({ desde }) => {
  const { t } = useT();
  const s = Math.max(0, 30 - Math.floor((t - desde - 0.8) * 9));
  const ligado = t < desde + 0.8 || s === 0;
  return <div style={{ position: "absolute", inset: 0, background: "#263238", color: "#fff" }}><BarraStatus cor="#263238" />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30, marginTop: 120 }}>
      <div style={{ width: 340, height: 120, borderRadius: 26, background: "#eceff1", position: "relative" }}>
        {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: 60 + i * 65, top: 50, width: 22, height: 22, borderRadius: 11, background: ligado ? "#00e676" : "#455a64" }} />)}
        <div style={{ position: "absolute", left: 50, top: -90, width: 12, height: 90, background: "#eceff1", borderRadius: 6 }} /><div style={{ position: "absolute", right: 50, top: -90, width: 12, height: 90, background: "#eceff1", borderRadius: 6 }} /></div>
      <div style={{ fontSize: 34, fontWeight: 700 }}>{t < desde + 0.8 ? "Tira da tomada…" : s > 0 ? "Espere" : "Liga de novo ✓"}</div>
      {t >= desde + 0.8 && s > 0 && <div style={{ fontSize: 130, fontWeight: 800, color: "#ffd43b" }}>{s}s</div>}
      {s === 0 && <div style={{ fontSize: 110 }}>🔌</div>}
    </div></div>;
};
const SenhaWifi: React.FC<{ desde: number }> = ({ desde }) => (
  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.45)" }}>
    <div style={{ position: "absolute", left: 30, right: 30, top: 330, background: "#fff", borderRadius: 28, padding: "34px 30px" }}>
      <b style={{ fontSize: 34, color: "#111" }}>CasaNet</b><div style={{ fontSize: 24, color: "#666", marginTop: 20 }}>Senha</div>
      <div style={{ borderBottom: `4px solid ${AZUL}`, fontSize: 34, padding: "10px 0", color: "#111", letterSpacing: 4 }}><Digitando texto="••••••••" desde={desde} cps={7} /></div>
      <div style={{ textAlign: "right", marginTop: 28, fontSize: 30, fontWeight: 700, color: AZUL }}>Conectar</div></div></div>
);
const RAP_AV = (on: boolean): [string, string, boolean][] => [["📶", "Wi-Fi", !on], ["✈️", "Modo avião", on], ["🔵", "Bluetooth", false], ["🔦", "Lanterna", false]];
export const WifiSemInternet: React.FC = () => {
  const C = tWif.cenas;
  return <ShortEtapas id="WifiSemInternet" tempos={tWif}
    etapas={[
      { desde: 0, tela: () => <ListaWifi estado="sem" /> },
      { desde: C[1] + 0.2, tela: () => <Roteador desde={C[1] + 0.2} /> },
      { desde: C[2] + 0.2, tela: () => <ListaWifi estado="sem" menu /> },
      { desde: C[2] + 2.2, toque: [290, 500], tela: () => <ListaWifi estado="esq" /> },
      { desde: C[2] + 3.6, toque: [290, 590], tela: () => <><ListaWifi estado="esq" /><SenhaWifi desde={C[2] + 3.8} /></> },
      { desde: C[3] + 0.2, tela: () => <Painel rapidos={RAP_AV(false)} notifs={[]} marcaRapido={1} /> },
      { desde: C[3] + 2.0, toque: [430, 172], tela: () => <Painel rapidos={RAP_AV(true)} notifs={[]} marcaRapido={1} /> },
      { desde: C[3] + 4.0, toque: [430, 172], tela: () => <><Painel rapidos={RAP_AV(false)} notifs={[]} /><Toast desde={C[3] + 4.1} texto="Wi-Fi: CasaNet conectado ✓" /></> },
      { desde: C[4] + 0.2, tela: () => <><ListaWifi estado="ok" /><Aviso desde={C[4] + 0.4} emoji="📞" titulo="Todos sem internet?" texto={<>O problema é da operadora.<br />Ligue para eles.</>} cor="#f57c00" /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Wi-Fi SEM INTERNET? 📶", destaque: ["SEM", "INTERNET?"] }, { desde: C[1], texto: "Desligue o roteador", destaque: ["roteador"] },
      { desde: C[2], texto: "Esquecer e conectar", destaque: ["Esquecer"] }, { desde: C[3], texto: "Liga e desliga o modo avião", destaque: ["avião"] },
      { desde: C[4], texto: "Todos sem? Operadora", destaque: ["Operadora"] }]}
    final={{ emoji: "📶", frase: <>Internet<br />de volta.</> }} />;
};
