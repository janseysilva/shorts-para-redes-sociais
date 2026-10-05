// Leva 8 (05/10): buscas em alta — celular como webcam, fotos apagadas, número do chip, online no Instagram, câmera embaçada.
import React from "react";
import tCam from "../../public/CelularWebcam/tempos.json";
import tFot from "../../public/FotosApagadas/tempos.json";
import tChip from "../../public/NumeroChip/tempos.json";
import tIg from "../../public/InstagramOnline/tempos.json";
import tLen from "../../public/CameraEmbacada/tempos.json";
import { Avatar, BarraStatus, Chave, mola, useT } from "../kit";
import { Aviso, Centro, Config, ShortEtapas, linhaY } from "./Leva2";
import { Chamada } from "./Leva3";
import { Grande } from "./Leva4";

const CINZA = "#37474f";
const AZUL = "#1a73e8";
const aparece = (t: number, desde: number) => Math.max(0, Math.min(1, (t - desde) / 0.3));
const Toast: React.FC<{ texto: string; desde: number }> = ({ texto, desde }) => {
  const { frame, fps } = useT();
  const m = mola(frame, desde, fps, 14);
  return <div style={{ position: "absolute", left: 50, right: 50, bottom: 120, background: "rgba(40,40,40,.92)", color: "#fff", borderRadius: 30, padding: "18px 24px",
    fontSize: 27, textAlign: "center", transform: `translateY(${(1 - m) * 60}px)`, opacity: Math.min(1, m * 1.5) }}>{texto}</div>;
};
const Topo: React.FC<{ titulo: React.ReactNode; cor?: string; claro?: boolean }> = ({ titulo, cor = CINZA, claro = true }) => <><BarraStatus cor={cor} claro={claro} />
  <div style={{ height: 130, background: cor, color: claro ? "#fff" : "#111", display: "flex", alignItems: "center", padding: "0 28px", fontSize: 34, fontWeight: 700, gap: 22,
    borderBottom: claro ? "none" : "1px solid #eee" }}><span style={{ fontSize: 36 }}>←</span>{titulo}</div></>;
/** Itens com ❌ que aparecem um a um. */
const Proibidos: React.FC<{ itens: [string, string][]; desde: number }> = ({ itens, desde }) => {
  const { frame, fps } = useT();
  return <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 50, width: "100%" }}>
    {itens.map(([e, n], i) => {
      const m = mola(frame, desde + i * 0.7, fps, 12);
      return <div key={n} style={{ display: "flex", alignItems: "center", gap: 24, padding: "22px 30px", borderRadius: 24, background: "#fff", color: "#111", fontSize: 36, fontWeight: 800,
        transform: `scale(${m})`, opacity: Math.min(1, m * 1.5) }}><span style={{ fontSize: 56 }}>{e}</span><span style={{ flex: 1, textAlign: "left" }}>{n}</span><span style={{ fontSize: 50 }}>❌</span></div>;
    })}</div>;
};

// ---------- celular como webcam ----------
const Notificacoes: React.FC<{ marca: boolean }> = ({ marca }) => (
  <div style={{ position: "absolute", inset: 0, background: "#1c1f24" }}>
    <BarraStatus cor="transparent" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, padding: "30px 30px" }}>
      {["📶", "🔵", "🔦", "✈️"].map((e) => <div key={e} style={{ height: 100, borderRadius: 30, background: "#3a3f47", fontSize: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>{e}</div>)}</div>
    <div style={{ margin: "20px 24px", borderRadius: 26, background: marca ? "#e3f2fd" : "#fff", padding: "22px 26px", color: "#111" }}>
      <div style={{ fontSize: 22, color: "#667" }}>⚙️ Sistema Android · agora</div>
      <div style={{ fontSize: 30, fontWeight: 700, marginTop: 6 }}>Carregando este dispositivo via USB</div>
      <div style={{ fontSize: 24, color: "#555", marginTop: 4 }}>Toque para ver mais opções</div></div>
    <div style={{ margin: "14px 24px", borderRadius: 26, background: "#2b2f36", padding: "22px 26px", color: "#ddd", fontSize: 26 }}>💬 2 novas mensagens</div>
  </div>
);
const USB = ["Transferência de arquivos", "Webcam", "MIDI", "Só carregar o celular"];
const PrefUsb: React.FC<{ marcada: number }> = ({ marcada }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
    <Topo titulo="Preferências de USB" />
    <div style={{ padding: "26px 34px 6px", fontSize: 24, color: AZUL, fontWeight: 700 }}>USAR USB PARA</div>
    {USB.map((o, i) => <div key={o} style={{ height: 100, display: "flex", alignItems: "center", gap: 24, padding: "0 34px", fontSize: 31, color: "#111", background: i === marcada ? "#e3f2fd" : "#fff" }}>
      <div style={{ width: 36, height: 36, borderRadius: 18, border: `4px solid ${i === marcada ? AZUL : "#888"}`, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
        {i === marcada && <div style={{ width: 18, height: 18, borderRadius: 9, background: AZUL }} />}</div>{o}</div>)}
  </div>
);
const Notebook: React.FC<{ apps?: boolean }> = ({ apps }) => {
  const { t } = useT();
  return <Centro cor="#263238"><div style={{ color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
    <div style={{ fontSize: 28, opacity: 0.85, marginBottom: 24 }}>💻 No computador</div>
    <div style={{ width: 500, height: 330, borderRadius: 18, border: "12px solid #111", background: "#0b1a2a", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#80deea,#26a69a)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        <div style={{ fontSize: 190, lineHeight: 1, transform: `translateY(${Math.sin(t * 2) * 4}px)` }}>🙋</div></div>
      <div style={{ position: "absolute", left: 10, top: 10, padding: "4px 12px", borderRadius: 10, background: "rgba(0,0,0,.6)", fontSize: 20 }}>🔴 Ao vivo</div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 46, background: "rgba(0,0,0,.65)", display: "flex", alignItems: "center", justifyContent: "center", gap: 30, fontSize: 24 }}>🎤 📷 📞</div></div>
    <div style={{ width: 560, height: 22, borderRadius: "0 0 14px 14px", background: "#90a4ae" }} />
    <div style={{ marginTop: 26, padding: "12px 22px", borderRadius: 16, background: "#fff", color: "#111", fontSize: 28 }}>📷 Câmera: <b>Celular (USB)</b></div>
    {apps && <div style={{ display: "flex", gap: 16, marginTop: 24 }}>{["Meet", "Zoom", "Teams"].map((n) => <div key={n} style={{ padding: "12px 22px", borderRadius: 30, background: "#43a047", fontSize: 28, fontWeight: 800 }}>✓ {n}</div>)}</div>}
  </div></Centro>;
};
export const CelularWebcam: React.FC = () => {
  const C = tCam.cenas;
  return <ShortEtapas id="CelularWebcam" tempos={tCam}
    etapas={[
      { desde: 0, tela: () => <Grande emoji="💻" titulo={<>Computador<br />sem câmera?</>} sub="use a do seu celular" /> },
      { desde: C[1] + 0.2, tela: () => <Grande emoji="🔌" titulo={<>Celular no computador<br />pelo cabo USB</>} cor="#102027" /> },
      { desde: C[2] + 0.2, tela: () => <Notificacoes marca={false} /> },
      { desde: C[2] + 2.0, toque: [295, 400], tela: () => <PrefUsb marcada={0} /> },
      { desde: C[3] + 0.6, toque: [295, 180 + 60 + 150], tela: () => <PrefUsb marcada={1} /> },
      { desde: C[3] + 2.4, tela: () => <Notebook /> },
      { desde: C[4], tela: (t) => <><Notebook apps />{t >= C[4] + 2.6 && <Aviso desde={C[4] + 2.6} emoji="📲" titulo="Não tem a opção?" texto={<>Use o aplicativo<br /><b>DroidCam</b>.</>} cor="#1565c0" />}</> },
    ]}
    ganchos={[{ desde: 0, texto: "Celular vira WEBCAM 💻", destaque: ["WEBCAM"] }, { desde: C[1], texto: "Ligue no cabo USB", destaque: ["USB"] },
      { desde: C[2], texto: "Toque no aviso do USB", destaque: ["USB"] }, { desde: C[3], texto: "Escolha Webcam", destaque: ["Webcam"] },
      { desde: C[4], texto: "Meet, Zoom e Teams", destaque: ["Meet,", "Zoom", "Teams"] }]}
    final={{ emoji: "📷", frase: <>Webcam<br />de graça.</> }} />;
};

// ---------- fotos apagadas ----------
const FOTOS = ["🏖️", "🎂", "🐶", "🌅", "👶", "🎉", "🌻", "🚗", "🍕"];
const CORES = ["#4fc3f7", "#f48fb1", "#ffcc80", "#ff8a65", "#ce93d8", "#a5d6a7", "#fff59d", "#90caf9", "#ffab91"];
const Grade: React.FC<{ itens: number[]; marca?: number; brilho?: number }> = ({ itens, marca = -1, brilho = -1 }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, padding: 6 }}>
    {itens.map((k, i) => <div key={i} style={{ height: 186, background: CORES[k], fontSize: 90, display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
      outline: i === marca || i === brilho ? `8px solid ${i === brilho ? "#43a047" : AZUL}` : "none", outlineOffset: -8 }}>{FOTOS[k]}
      {i === marca && <div style={{ position: "absolute", left: 10, top: 10, width: 44, height: 44, borderRadius: 22, background: AZUL, color: "#fff", fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>}</div>)}
  </div>
);
const NavFotos: React.FC<{ ativa: number }> = ({ ativa }) => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 110, background: "#fff", borderTop: "1px solid #ddd", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
    {[["🖼️", "Fotos"], ["📚", "Coleções"], ["🔍", "Pesquisar"]].map(([e, n], i) => <div key={n} style={{ textAlign: "center", fontSize: 22, color: i === ativa ? AZUL : "#555", fontWeight: i === ativa ? 800 : 500 }}>
      <div style={{ fontSize: 40, padding: "2px 18px", borderRadius: 20, background: i === ativa ? "#d2e3fc" : "transparent" }}>{e}</div>{n}</div>)}
  </div>
);
const TelaFotos: React.FC<{ itens: number[]; brilho?: number }> = ({ itens, brilho }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}><BarraStatus cor="#fff" claro={false} />
    <div style={{ padding: "16px 28px", fontSize: 38, fontWeight: 800, color: "#111" }}>Fotos</div>
    <Grade itens={itens} brilho={brilho} /><NavFotos ativa={0} /></div>
);
const Colecoes: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}><BarraStatus cor="#fff" claro={false} />
    <div style={{ padding: "16px 28px", fontSize: 38, fontWeight: 800, color: "#111" }}>Coleções</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, padding: "10px 24px" }}>
      {[["⭐", "Favoritos"], ["📒", "Álbuns"], ["📥", "Arquivo"], ["🔒", "Pasta trancada"], ["🗑️", "Lixeira"]].map(([e, n]) => (
        <div key={n} style={{ height: 150, borderRadius: 24, background: n === "Lixeira" ? "#fde7e9" : "#f1f3f4", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 24px",
          border: n === "Lixeira" ? "4px solid #e53935" : "none" }}><span style={{ fontSize: 50 }}>{e}</span><b style={{ fontSize: 28, color: "#111" }}>{n}</b></div>))}
    </div><NavFotos ativa={1} /></div>
);
const Lixeira: React.FC<{ marca?: number; barra?: boolean }> = ({ marca = -1, barra }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
    <Topo titulo="Lixeira" cor="#fff" claro={false} />
    <div style={{ margin: "10px 24px 14px", padding: "14px 20px", borderRadius: 16, background: "#fff8e1", fontSize: 24, color: "#5d4037" }}>⏳ Os itens ficam aqui por até 60 dias</div>
    <Grade itens={[2, 5, 7, 0, 8, 3]} marca={marca} />
    {barra && <div style={{ position: "absolute", left: 0, right: 0, top: 180, height: 110, background: "#fff", borderBottom: "2px solid #ddd", boxShadow: "0 6px 14px rgba(0,0,0,.15)", display: "flex", justifyContent: "space-around", alignItems: "center", fontSize: 30, fontWeight: 800 }}>
      <span style={{ color: "#c62828" }}>🗑️ Excluir</span><span style={{ color: AZUL, padding: "14px 34px", borderRadius: 40, background: "#d2e3fc" }}>↩️ Restaurar</span></div>}
  </div>
);
export const FotosApagadas: React.FC = () => {
  const C = tFot.cenas;
  return <ShortEtapas id="FotosApagadas" tempos={tFot}
    etapas={[
      { desde: 0, tela: () => <Grande emoji="🗑️" titulo={<>Apagou uma foto<br />sem querer?</>} sub="ela ainda pode voltar" /> },
      { desde: C[1] + 0.2, tela: () => <TelaFotos itens={[0, 1, 3, 4, 6, 8, 5, 7, 1]} /> },
      { desde: C[1] + 1.8, toque: [295, 1120 - 55], tela: () => <Colecoes /> },
      { desde: C[1] + 3.3, toque: [150, 550], tela: () => <Lixeira /> },
      { desde: C[2] + 0.9, toque: [100, 180 + 84 + 6 + 93], tela: () => <Lixeira marca={0} barra /> },
      { desde: C[3] - 0.2, toque: [400, 235], tela: () => <><TelaFotos itens={[2, 0, 1, 3, 4, 6, 8, 5, 7]} brilho={0} /><Toast desde={C[3]} texto="1 item restaurado ✓" /></> },
      { desde: C[4], tela: () => <><TelaFotos itens={[2, 0, 1, 3, 4, 6, 8, 5, 7]} /><Aviso desde={C[4] + 0.2} emoji="⏳" titulo="Não demore!" texto={<>A foto fica na lixeira só<br />por <b>30 a 60 dias</b>.</>} cor="#f57c00" /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Recupere FOTOS apagadas 🖼️", destaque: ["FOTOS"] }, { desde: C[1], texto: "Coleções › Lixeira", destaque: ["Lixeira"] },
      { desde: C[2], texto: "Segure e Restaurar", destaque: ["Restaurar"] }, { desde: C[3], texto: "Ela voltou!", destaque: ["voltou!"] },
      { desde: C[4], texto: "Só 30 a 60 dias", destaque: ["30", "60"] }]}
    final={{ emoji: "🖼️", frase: <>Foto<br />de volta.</> }} />;
};

// ---------- número do chip ----------
const NUMERO = "+55 92 9 8123-4567";
export const NumeroChip: React.FC = () => {
  const C = tChip.cenas;
  const status = (m: number) => <Config titulo="Status do SIM" cor={CINZA} marca={m} linhas={[["📡", "Operadora", "Minha Operadora"], ["📞", "Número de telefone", NUMERO], ["📶", "Força do sinal", "-85 dBm"], ["🔢", "IMEI", "35 •••• •••• 210"]]} />;
  return <ShortEtapas id="NumeroChip" tempos={tChip}
    etapas={[
      { desde: 0, tela: () => <Grande emoji="📞" titulo={<>Qual é o número<br />do seu chip?</>} sub="o celular mostra" /> },
      { desde: C[1] + 0.2, tela: () => <Config titulo="Configurações" cor={CINZA} linhas={[["📶", "Conexões"], ["🔔", "Notificações"], ["🔋", "Bateria"], ["ℹ️", "Sobre o telefone", "Status, número e mais"]]} /> },
      { desde: C[1] + 2.0, toque: [295, linhaY(3)], tela: () => <Config titulo="Sobre o telefone" cor={CINZA} linhas={[["📋", "Status", "Informações do SIM"], ["💾", "Informações do software"], ["🔋", "Informações da bateria"]]} /> },
      { desde: C[2] + 0.8, toque: [295, linhaY(0)], tela: () => status(-1) },
      { desde: C[3], tela: () => status(1) },
      { desde: C[4], tela: () => <Chamada nome={NUMERO} sub="Chamando... 🔔 (na tela da sua amiga)" avatar={<Avatar letra="?" cor="#90a4ae" tam={220} />} /> },
    ]}
    ganchos={[{ desde: 0, texto: "Descubra o número do CHIP 📞", destaque: ["CHIP"] }, { desde: C[1], texto: "Sobre o telefone", destaque: ["Sobre"] },
      { desde: C[2], texto: "Status do SIM", destaque: ["SIM"] }, { desde: C[3], texto: "Seu número está aqui", destaque: ["número"] },
      { desde: C[4], texto: "Ou ligue para alguém", destaque: ["ligue"] }]}
    final={{ emoji: "📞", frase: <>Número<br />descoberto.</> }} />;
};

// ---------- online no Instagram ----------
const ROSA = "#c13584";
const ROXO = "#3b1650";
const Perfil: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: "#fff", color: "#111" }}><BarraStatus cor="#fff" claro={false} />
    <div style={{ height: 100, display: "flex", alignItems: "center", padding: "0 28px", fontSize: 34, fontWeight: 800 }}><span style={{ flex: 1 }}>seu_perfil</span><span style={{ fontSize: 44 }}>☰</span></div>
    <div style={{ display: "flex", alignItems: "center", gap: 30, padding: "10px 28px" }}>
      <div style={{ padding: 6, borderRadius: "50%", background: `linear-gradient(45deg,#feda75,#d62976,#4f5bd5)` }}><Avatar letra="S" cor="#5c6bc0" tam={150} /></div>
      {[["48", "posts"], ["1.205", "seguidores"], ["380", "seguindo"]].map(([n, l]) => <div key={l} style={{ textAlign: "center" }}><b style={{ fontSize: 32 }}>{n}</b><div style={{ fontSize: 20 }}>{l}</div></div>)}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 4, marginTop: 40 }}>
      {[0, 3, 6, 2, 4, 8].map((k) => <div key={k} style={{ height: 190, background: CORES[k], fontSize: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>{FOTOS[k]}</div>)}</div>
  </div>
);
const Diretas: React.FC<{ online: boolean }> = ({ online }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
    <Topo titulo="Mensagens" cor="#fff" claro={false} />
    {[["Ana", "#ec407a"], ["Bruno", "#42a5f5"], ["Carla", "#66bb6a"], ["Diego", "#ffa726"]].map(([n, c], i) => (
      <div key={n} style={{ height: 120, display: "flex", alignItems: "center", gap: 22, padding: "0 28px" }}>
        <div style={{ position: "relative" }}><Avatar letra={n[0]} cor={c} tam={84} />
          {online && i < 2 && <div style={{ position: "absolute", right: 0, bottom: 0, width: 26, height: 26, borderRadius: 13, background: "#2ecc40", border: "4px solid #fff" }} />}</div>
        <div><div style={{ fontSize: 30, fontWeight: 700, color: "#111" }}>{n}</div><div style={{ fontSize: 24, color: "#667" }}>{online && i < 2 ? "Ativo(a) agora" : "Enviou uma mensagem"}</div></div></div>))}
  </div>
);
export const InstagramOnline: React.FC = () => {
  const C = tIg.cenas;
  const ativ = (on: number) => <Config titulo="Status de atividade" cor={ROXO} linhas={[["🟢", "Mostrar status de atividade", on > 0.5 ? "Ligado" : "Desligado"]]} marca={0} direita={() => <Chave ligada={on} />} />;
  return <ShortEtapas id="InstagramOnline" tempos={tIg}
    etapas={[
      { desde: 0, tela: () => <Diretas online /> },
      { desde: C[1] + 0.2, tela: () => <Perfil /> },
      { desde: C[1] + 1.8, toque: [545, 100], tela: () => <Config titulo="Configurações e atividade" cor={ROXO} linhas={[["🔔", "Notificações"], ["🔒", "Privacidade da conta"], ["💬", "Mensagens e respostas aos stories"], ["⏰", "Tempo gasto"]]} /> },
      { desde: C[1] + 3.8, toque: [295, linhaY(2)], tela: () => <Config titulo="Mensagens e respostas" cor={ROXO} linhas={[["✉️", "Controles de mensagens"], ["💭", "Respostas aos stories"], ["🟢", "Mostrar status de atividade"]]} /> },
      { desde: C[2] + 0.5, toque: [295, linhaY(2)], tela: () => ativ(1) },
      { desde: C[3] + 0.6, toque: [500, linhaY(0)], tela: (t) => ativ(Math.min(1, Math.max(0, 1 - (t - C[3] - 0.6) / 0.3))) },
      { desde: C[3] + 2.6, tela: () => <Diretas online={false} /> },
      { desde: C[4], tela: () => <><Diretas online={false} /><Aviso desde={C[4] + 0.2} emoji="🔁" titulo="Vale para os dois lados" texto={<>Você também deixa de ver<br />quem está online.</>} cor={ROSA} /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Esconda o ONLINE no Instagram 🟢", destaque: ["ONLINE"] }, { desde: C[1], texto: "Perfil › ☰ › Mensagens", destaque: ["Mensagens"] },
      { desde: C[2], texto: "Status de atividade", destaque: ["atividade"] }, { desde: C[3], texto: "Desligue a chave", destaque: ["Desligue"] },
      { desde: C[4], texto: "Vale para os dois lados", destaque: ["dois"] }]}
    final={{ emoji: "🟢", frase: <>Online<br />escondido.</> }} />;
};

// ---------- câmera embaçada ----------
const Cena: React.FC<{ blur: number }> = ({ blur }) => (
  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#81d4fa,#c5e1a5 70%)", filter: `blur(${blur}px)`, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 60, top: 520, fontSize: 230 }}>🌻</div>
    <div style={{ position: "absolute", right: 30, top: 380, fontSize: 170 }}>🏡</div>
    <div style={{ position: "absolute", right: 70, top: 120, fontSize: 110 }}>☀️</div>
  </div>
);
const CameraApp: React.FC<{ blur: number; foco?: number; flash?: boolean }> = ({ blur, foco = -1, flash }) => {
  const { t } = useT();
  return <div style={{ position: "absolute", inset: 0, background: "#000" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 90, height: 820, overflow: "hidden" }}><Cena blur={blur} />
      {foco >= 0 && t >= foco && <div style={{ position: "absolute", left: 150, top: 520, width: 220, height: 220, border: "5px solid #ffd600", borderRadius: 10,
        transform: `scale(${1.3 - Math.min(1, (t - foco) / 0.4) * 0.3})` }} />}</div>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 210, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 130, height: 130, borderRadius: 65, border: "8px solid #fff", background: flash ? "#fff" : "transparent" }} /></div>
    <div style={{ position: "absolute", top: 30, left: 0, right: 0, textAlign: "center", color: "#ffd600", fontSize: 24, fontWeight: 700 }}>FOTO</div>
  </div>;
};
const Lente: React.FC<{ desde: number }> = ({ desde }) => {
  const { t } = useT();
  const k = Math.max(0, Math.min(1, (t - desde) / 3.0)); // 0 = suja, 1 = limpa
  const a = (t - desde) * 5;
  return <Centro cor="#102027"><div style={{ color: "#fff", display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div style={{ width: 420, height: 420, borderRadius: 210, background: "#263238", marginTop: 60, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <div style={{ width: 300, height: 300, borderRadius: 150, background: "radial-gradient(circle at 35% 35%,#5c6bc0,#0d1333 70%)", border: "14px solid #111", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 60% 55%,rgba(255,255,255,.75),rgba(255,255,255,.25) 45%,transparent 70%)", opacity: 1 - k }} />
        <div style={{ position: "absolute", left: 60, top: 50, width: 70, height: 40, borderRadius: 20, background: "rgba(255,255,255,.7)", transform: "rotate(-30deg)" }} /></div>
      {k < 1 && <div style={{ position: "absolute", left: 210 + Math.cos(a) * 110 - 80, top: 210 + Math.sin(a) * 110 - 60, width: 160, height: 120, borderRadius: 26,
        background: "linear-gradient(135deg,#b3e5fc,#4fc3f7)", boxShadow: "0 8px 20px rgba(0,0,0,.4)", opacity: 0.92 }} />}</div>
    <b style={{ fontSize: 38, marginTop: 40 }}>{k < 1 ? "Pano macio, em círculos" : "Lente limpa ✨"}</b></div></Centro>;
};
const Verso: React.FC = () => (
  <Centro cor="#1b1b1b"><div style={{ color: "#fff", display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div style={{ width: 300, height: 560, borderRadius: 50, background: "#37474f", marginTop: 30, position: "relative", border: "16px solid #e91e63" }}>
      <div style={{ position: "absolute", left: 24, top: 24, width: 130, height: 200, borderRadius: 30, background: "#263238", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
        {[0, 1].map((i) => <div key={i} style={{ width: 70, height: 70, borderRadius: 35, background: "radial-gradient(circle,#5c6bc0,#0d1333 70%)", border: "6px solid #111" }} />)}</div>
      <div style={{ position: "absolute", left: -16, top: -16, width: 120, height: 130, borderRadius: "50px 0 30px 0", background: "#e91e63" }} />
      <div style={{ position: "absolute", left: 0, top: 70, fontSize: 70 }}>⚠️</div></div>
    <b style={{ fontSize: 36, marginTop: 34, lineHeight: 1.3 }}>A capinha está<br />cobrindo a câmera?</b></div></Centro>
);
export const CameraEmbacada: React.FC = () => {
  const C = tLen.cenas;
  return <ShortEtapas id="CameraEmbacada" tempos={tLen}
    etapas={[
      { desde: 0, tela: () => <><CameraApp blur={14} /><div style={{ position: "absolute", left: 0, right: 0, top: 420, textAlign: "center", fontSize: 54, fontWeight: 900, color: "#fff",
        textShadow: "0 4px 12px #000" }}>Foto borrada? 😩</div></> },
      { desde: C[1] + 0.2, tela: () => <Lente desde={C[1] + 0.8} /> },
      { desde: C[2], tela: () => <Centro cor="#b71c1c"><div style={{ color: "#fff", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <b style={{ fontSize: 46, marginTop: 40 }}>Nunca use:</b>
        <Proibidos itens={[["👕", "Camiseta"], ["🧻", "Papel"], ["🧴", "Álcool forte"]]} desde={C[2] + 0.4} /></div></Centro> },
      { desde: C[3], tela: () => <CameraApp blur={6} /> },
      { desde: C[3] + 1.4, toque: [260, 720], tela: (t) => <CameraApp blur={Math.max(0, 6 - (t - C[3] - 1.4) * 12)} foco={C[3] + 1.4} /> },
      { desde: C[4], tela: () => <Verso /> },
    ]}
    ganchos={[{ desde: 0, texto: "Câmera EMBAÇADA? 📷", destaque: ["EMBAÇADA?"] }, { desde: C[1], texto: "Pano macio, em círculos", destaque: ["macio"] },
      { desde: C[2], texto: "Nada de camiseta", destaque: ["camiseta"] }, { desde: C[3], texto: "Toque para focar", destaque: ["focar"] },
      { desde: C[4], texto: "Confira a capinha", destaque: ["capinha"] }]}
    final={{ emoji: "📷", frase: <>Foto nítida<br />de novo.</> }} />;
};
