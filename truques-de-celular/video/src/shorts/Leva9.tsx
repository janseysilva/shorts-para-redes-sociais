// Leva 9 (06/10): buscas em alta — tirar vírus, celular desligando sozinho, senhas salvas, esconder apps, TalkBack.
import React from "react";
import tVir from "../../public/TirarVirus/tempos.json";
import tDes from "../../public/DesligaSozinho/tempos.json";
import tSen from "../../public/SenhasSalvas/tempos.json";
import tEsc from "../../public/EsconderApps/tempos.json";
import tTal from "../../public/TalkBack/tempos.json";
import { Avatar, BarraStatus, Chave, mola, useT } from "../kit";
import { Aviso, Centro, Config, ShortEtapas, linhaY } from "./Leva2";
import { Grande } from "./Leva4";

const CINZA = "#37474f";
const AZUL = "#1a73e8";
const VERDE = "#1e8e3e";
const Toast: React.FC<{ texto: string; desde: number }> = ({ texto, desde }) => {
  const { frame, fps } = useT();
  const m = mola(frame, desde, fps, 14);
  return <div style={{ position: "absolute", left: 50, right: 50, bottom: 120, background: "rgba(40,40,40,.92)", color: "#fff", borderRadius: 30, padding: "18px 24px",
    fontSize: 27, textAlign: "center", transform: `translateY(${(1 - m) * 60}px)`, opacity: Math.min(1, m * 1.5) }}>{texto}</div>;
};
const Topo: React.FC<{ titulo: React.ReactNode; cor?: string }> = ({ titulo, cor = CINZA }) => <><BarraStatus cor={cor} />
  <div style={{ height: 130, background: cor, color: "#fff", display: "flex", alignItems: "center", padding: "0 28px", fontSize: 34, fontWeight: 700, gap: 22 }}>
    <span style={{ fontSize: 36 }}>←</span>{titulo}</div></>;
const Botao: React.FC<{ texto: string; cor?: string; y: number; on?: boolean }> = ({ texto, cor = AZUL, y, on }) => (
  <div style={{ position: "absolute", left: 95, right: 95, top: y - 45, height: 90, borderRadius: 45, background: cor, color: "#fff", fontSize: 32, fontWeight: 700,
    display: "flex", alignItems: "center", justifyContent: "center", boxShadow: on ? "0 0 0 8px rgba(26,115,232,.3)" : "none" }}>{texto}</div>
);
const Barra: React.FC<{ p: number; cor?: string }> = ({ p, cor = AZUL }) => (
  <div style={{ width: "100%", height: 22, borderRadius: 11, background: "#e0e0e0", overflow: "hidden" }}><div style={{ width: `${p * 100}%`, height: "100%", background: cor }} /></div>
);
const prog = (t: number, a: number, b: number) => Math.max(0, Math.min(1, (t - a) / (b - a)));

// ---------- tirar vírus ----------
const Loja: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}><BarraStatus cor="#fff" claro={false} />
    <div style={{ margin: "20px 24px", height: 84, borderRadius: 42, background: "#f1f3f4", display: "flex", alignItems: "center", padding: "0 26px", fontSize: 28, color: "#666", gap: 14 }}>
      🔍 <span style={{ flex: 1 }}>Pesquisar apps e jogos</span><Avatar letra="J" cor="#5c6bc0" tam={58} /></div>
    {["Para você", "Mais baixados", "Jogos"].map((x, i) => <div key={x} style={{ margin: "26px 28px 10px", fontSize: 30, fontWeight: 700, color: "#111" }}>{x}
      <div style={{ display: "flex", gap: 18, marginTop: 14 }}>{["#ef5350", "#42a5f5", "#66bb6a", "#ffa726"].map((c, j) => <div key={j} style={{ width: 110, height: 110, borderRadius: 26, background: c, opacity: 0.85 - i * 0.1 }} />)}</div></div>)}
  </div>
);
const MenuConta: React.FC<{ marca: number }> = ({ marca }) => (
  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.35)" }}>
    <div style={{ position: "absolute", left: 24, right: 24, top: 120, background: "#fff", borderRadius: 28, padding: "20px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "10px 28px 22px", borderBottom: "1px solid #eee" }}><Avatar letra="J" cor="#5c6bc0" tam={70} />
        <div><b style={{ fontSize: 28, color: "#111" }}>Sua conta</b><div style={{ fontSize: 22, color: "#666" }}>voce@gmail.com</div></div></div>
      {[["📦", "Gerenciar apps e dispositivo"], ["🛡️", "Play Protect"], ["⚙️", "Configurações"]].map(([e, n], i) => (
        <div key={n} style={{ display: "flex", alignItems: "center", gap: 22, padding: "24px 30px", fontSize: 30, color: "#111", background: i === marca ? "#e8f0fe" : "#fff" }}><span style={{ fontSize: 38 }}>{e}</span>{n}</div>))}
    </div></div>
);
const Protect: React.FC<{ fase: 0 | 1 | 2 | 3; p?: number }> = ({ fase, p = 0 }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
    <Topo titulo="Play Protect" cor="#fff" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 50, height: 130, display: "flex", alignItems: "center", padding: "0 28px", gap: 22, fontSize: 34, fontWeight: 700, color: "#111" }}>
      <span style={{ fontSize: 36 }}>←</span>Play Protect</div>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 50, gap: 22, padding: "0 50px", textAlign: "center" }}>
      <div style={{ fontSize: 150 }}>{fase === 2 ? "⚠️" : "🛡️"}</div>
      {fase === 0 && <b style={{ fontSize: 34, color: "#111" }}>Verifique os apps do celular</b>}
      {fase === 1 && <><b style={{ fontSize: 34, color: "#111" }}>Verificando apps...</b><div style={{ width: "100%" }}><Barra p={p} /></div></>}
      {fase === 2 && <><b style={{ fontSize: 34, color: "#c62828" }}>1 app prejudicial encontrado</b>
        <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "18px 22px", borderRadius: 20, background: "#fdecea", width: "100%" }}>
          <div style={{ width: 70, height: 70, borderRadius: 18, background: "#ffb300", fontSize: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>🔦</div>
          <div style={{ textAlign: "left" }}><b style={{ fontSize: 28, color: "#111" }}>Lanterna Turbo PRO</b><div style={{ fontSize: 22, color: "#c62828" }}>Mostra anúncios escondidos</div></div></div></>}
      {fase === 3 && <b style={{ fontSize: 34, color: VERDE }}>Nenhum problema encontrado ✓</b>}
    </div>
    {fase === 0 && <Botao texto="Verificar" y={760} />}
    {fase === 2 && <Botao texto="Desinstalar" cor="#c62828" y={760} />}
  </div>
);
export const TirarVirus: React.FC = () => {
  const C = tVir.cenas;
  return <ShortEtapas id="TirarVirus" tempos={tVir}
    etapas={[
      { desde: 0, tela: () => <Grande emoji="🦠" titulo={<>Celular com<br />vírus?</>} sub="anúncio pulando do nada" cor="#3e0d0d" /> },
      { desde: C[1] + 0.2, tela: () => <Loja /> },
      { desde: C[1] + 1.8, toque: [515, 112], tela: () => <><Loja /><MenuConta marca={-1} /></> },
      { desde: C[1] + 3.4, toque: [295, 120 + 20 + 100 + 1 * 90 + 45], tela: () => <Protect fase={0} /> },
      { desde: C[2] + 0.5, toque: [295, 760], tela: (t) => <Protect fase={1} p={prog(t, C[2] + 0.5, C[3] - 0.3)} /> },
      { desde: C[3] - 0.2, tela: () => <Protect fase={2} /> },
      { desde: C[3] + 2.0, toque: [295, 760], tela: () => <><Protect fase={3} /><Toast desde={C[3] + 2.0} texto="Lanterna Turbo PRO desinstalado ✓" /></> },
      { desde: C[4], tela: () => <><Protect fase={3} /><Aviso desde={C[4] + 0.2} emoji="🛡️" titulo="Só pela Play Store" texto={<>Nada de instalar app<br />de link ou site.</>} cor={VERDE} /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Tire o VÍRUS do celular 🦠", destaque: ["VÍRUS"] }, { desde: C[1], texto: "Play Store › Play Protect", destaque: ["Protect"] },
      { desde: C[2], texto: "Toque em Verificar", destaque: ["Verificar"] }, { desde: C[3], texto: "Achou? Desinstale", destaque: ["Desinstale"] },
      { desde: C[4], texto: "Só pela Play Store", destaque: ["Play"] }]}
    final={{ emoji: "🛡️", frase: <>Celular<br />limpo.</> }} />;
};

// ---------- celular desligando sozinho ----------
const TelaBateria: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}><Topo titulo="Bateria" />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40, gap: 26, padding: "0 40px" }}>
      <div style={{ width: 180, height: 300, borderRadius: 24, border: "10px solid #555", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "23%", background: "#e53935" }} /></div>
      <div style={{ width: "100%", display: "grid", gap: 16 }}>
        {[["Carga", "23%", "#111"], ["Saúde da bateria", "Fraca ⚠️", "#c62828"], ["Temperatura", "44 °C 🔥", "#c62828"]].map(([a, b, c]) => (
          <div key={a} style={{ display: "flex", justifyContent: "space-between", padding: "18px 22px", borderRadius: 16, background: c === "#111" ? "#f5f5f5" : "#fdecea", fontSize: 29 }}>
            <span style={{ color: "#333" }}>{a}</span><b style={{ color: c }}>{b}</b></div>))}
      </div></div>
  </div>
);
const Atualizacao: React.FC<{ p: number }> = ({ p }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}><Topo titulo="Atualização de software" />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, marginTop: 60, padding: "0 50px", textAlign: "center" }}>
      <div style={{ fontSize: 130 }}>🔄</div><b style={{ fontSize: 34, color: "#111" }}>{p < 1 ? "Baixando atualização..." : "Celular atualizado ✓"}</b>
      <div style={{ width: "100%" }}><Barra p={p} cor={p < 1 ? AZUL : VERDE} /></div></div>
  </div>
);
const AppsRecentes: React.FC<{ apagado: boolean }> = ({ apagado }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}><Topo titulo="Apps" />
    {[["🎮", "Jogo Grátis 3D", "Instalado ontem", "#7e57c2"], ["💬", "Mensagens", "Instalado em 2024", "#25D366"], ["📷", "Câmera", "Do sistema", "#546e7a"]].map(([e, n, s, c], i) => (
      i === 0 && apagado ? null :
      <div key={n} style={{ height: 120, display: "flex", alignItems: "center", gap: 22, padding: "0 28px", borderBottom: "1px solid #eee", background: i === 0 ? "#fff8e1" : "#fff" }}>
        <div style={{ width: 76, height: 76, borderRadius: 20, background: c, fontSize: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>{e}</div>
        <div style={{ flex: 1 }}><div style={{ fontSize: 30, fontWeight: 600, color: "#111" }}>{n}</div><div style={{ fontSize: 23, color: i === 0 ? "#e65100" : "#667" }}>{s}</div></div>
        {i === 0 && <div style={{ padding: "12px 20px", borderRadius: 24, background: "#c62828", color: "#fff", fontSize: 24, fontWeight: 700 }}>Desinstalar</div>}</div>))}
  </div>
);
const CFG2: [string, string, string?][] = [["📶", "Conexões"], ["🔋", "Bateria", "Saúde e temperatura"], ["🔔", "Notificações"], ["⚙️", "Sistema", "Atualização de software"]];
export const DesligaSozinho: React.FC = () => {
  const C = tDes.cenas;
  return <ShortEtapas id="DesligaSozinho" tempos={tDes}
    etapas={[
      { desde: 0, tela: () => <Grande emoji="📴" titulo={<>Desligou<br />sozinho de novo?</>} sub="faça esses 3 testes" /> },
      { desde: C[1] + 0.2, tela: () => <Config titulo="Configurações" cor={CINZA} linhas={CFG2} /> },
      { desde: C[1] + 2.2, toque: [295, linhaY(1)], tela: () => <TelaBateria /> },
      { desde: C[2] + 0.2, tela: () => <Config titulo="Configurações" cor={CINZA} linhas={CFG2} marca={3} /> },
      { desde: C[2] + 1.8, toque: [295, linhaY(3)], tela: (t) => <Atualizacao p={prog(t, C[2] + 2.0, C[3] - 0.5)} /> },
      { desde: C[3] + 0.2, tela: () => <AppsRecentes apagado={false} /> },
      { desde: C[3] + 3.2, toque: [500, 180 + 60], tela: () => <><AppsRecentes apagado /><Toast desde={C[3] + 3.2} texto="Jogo Grátis 3D desinstalado ✓" /></> },
      { desde: C[4], tela: () => <><AppsRecentes apagado /><Aviso desde={C[4] + 0.2} emoji="🔧" titulo="Continua desligando?" texto={<>É bateria gasta.<br />A assistência troca.</>} cor="#f57c00" /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Celular DESLIGANDO sozinho? 📴", destaque: ["DESLIGANDO"] }, { desde: C[1], texto: "1. Veja a bateria", destaque: ["bateria"] },
      { desde: C[2], texto: "2. Atualize o celular", destaque: ["Atualize"] }, { desde: C[3], texto: "3. Apague o último app", destaque: ["app"] },
      { desde: C[4], texto: "Bateria gasta? Assistência", destaque: ["Assistência"] }]}
    final={{ emoji: "📱", frase: <>Celular ligado<br />de novo.</> }} />;
};

// ---------- senhas salvas ----------
const SITES: [string, string, string][] = [["Instagram", "#E1306C", "I"], ["Gmail", "#ea4335", "G"], ["Netflix", "#b71c1c", "N"], ["Banco", "#1565c0", "B"], ["Facebook", "#1877f2", "F"]];
const ListaSenhas: React.FC<{ marca?: number }> = ({ marca = -1 }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}><Topo titulo="Gerenciador de senhas" cor={AZUL} />
    <div style={{ margin: "16px 24px", height: 70, borderRadius: 35, background: "#f1f3f4", display: "flex", alignItems: "center", padding: "0 24px", fontSize: 26, color: "#666" }}>🔍 Pesquisar senhas</div>
    {SITES.map(([n, c, l], i) => <div key={n} style={{ height: 104, display: "flex", alignItems: "center", gap: 22, padding: "0 28px", background: i === marca ? "#e8f0fe" : "#fff" }}>
      <Avatar letra={l} cor={c} tam={64} /><div style={{ flex: 1, fontSize: 30, fontWeight: 600, color: "#111" }}>{n}</div><span style={{ fontSize: 30, color: "#999" }}>›</span></div>)}
  </div>
);
const DetalheSenha: React.FC<{ ver: boolean }> = ({ ver }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}><Topo titulo="Instagram" cor={AZUL} />
    <div style={{ padding: "40px 34px", display: "grid", gap: 26 }}>
      <div><div style={{ fontSize: 23, color: "#667" }}>Usuário</div><div style={{ fontSize: 32, color: "#111", marginTop: 6 }}>voce.silva</div></div>
      <div><div style={{ fontSize: 23, color: "#667" }}>Senha</div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 6, padding: "14px 18px", borderRadius: 16, background: ver ? "#e6f4ea" : "#f5f5f5" }}>
          <span style={{ flex: 1, fontSize: 34, color: "#111", fontWeight: 700, letterSpacing: ver ? 1 : 6 }}>{ver ? "gato*azul2026" : "••••••••••"}</span><span style={{ fontSize: 40 }}>👁️</span></div></div>
    </div>
  </div>
);
const Digital: React.FC<{ ok: boolean }> = ({ ok }) => (
  <Centro cor="#102027"><div style={{ color: "#fff", display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div style={{ fontSize: 34, marginTop: 120 }}>Confirme que é você</div>
    <div style={{ fontSize: 170, marginTop: 70, filter: ok ? "drop-shadow(0 0 30px #4caf50)" : "none" }}>{ok ? "✅" : "👆"}</div></div></Centro>
);
const Notebook: React.FC = () => (
  <Centro cor="#263238"><div style={{ color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
    <div style={{ fontSize: 28, opacity: 0.85, marginBottom: 24 }}>💻 No computador</div>
    <div style={{ width: 500, height: 320, borderRadius: 18, border: "12px solid #111", background: "#fff", overflow: "hidden" }}>
      <div style={{ height: 52, background: "#f1f3f4", display: "flex", alignItems: "center", padding: "0 14px" }}>
        <div style={{ flex: 1, height: 34, borderRadius: 17, background: "#fff", fontSize: 21, color: "#111", display: "flex", alignItems: "center", padding: "0 14px" }}>🔒 passwords.google.com</div></div>
      {SITES.slice(0, 4).map(([n, c, l]) => <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 18px", color: "#111", fontSize: 22 }}><Avatar letra={l} cor={c} tam={36} />{n}</div>)}
    </div><div style={{ width: 560, height: 22, borderRadius: "0 0 14px 14px", background: "#90a4ae" }} /></div></Centro>
);
export const SenhasSalvas: React.FC = () => {
  const C = tSen.cenas;
  return <ShortEtapas id="SenhasSalvas" tempos={tSen}
    etapas={[
      { desde: 0, tela: () => <Grande emoji="🔑" titulo={<>Esqueceu<br />a senha?</>} sub="o celular guardou para você" /> },
      { desde: C[1] + 0.2, tela: () => <Config titulo="Configurações" cor={CINZA} linhas={[["📶", "Conexões"], ["🌐", "Google", "Serviços e preferências"], ["🔋", "Bateria"], ["🔔", "Notificações"]]} /> },
      { desde: C[1] + 1.8, toque: [295, linhaY(1)], tela: () => <Config titulo="Google" cor={CINZA} linhas={[["👤", "Gerenciar sua Conta do Google"], ["✍️", "Preenchimento automático"], ["🔑", "Gerenciador de senhas", "Senhas salvas"]]} /> },
      { desde: C[1] + 3.4, toque: [295, linhaY(2)], tela: () => <ListaSenhas /> },
      { desde: C[2] + 1.4, tela: () => <ListaSenhas marca={0} /> },
      { desde: C[2] + 2.6, toque: [295, 180 + 102 + 52], tela: () => <DetalheSenha ver={false} /> },
      { desde: C[3] + 0.2, toque: [520, 180 + 40 + 160], tela: (t) => <Digital ok={t >= C[3] + 1.4} /> },
      { desde: C[3] + 2.4, tela: () => <DetalheSenha ver /> },
      { desde: C[4], tela: () => <Notebook /> },
    ]}
    ganchos={[{ desde: 0, texto: "Veja suas SENHAS salvas 🔑", destaque: ["SENHAS"] }, { desde: C[1], texto: "Google › Gerenciador de senhas", destaque: ["senhas"] },
      { desde: C[2], texto: "Escolha o site", destaque: ["site"] }, { desde: C[3], texto: "Digital e olhinho 👁️", destaque: ["olhinho"] },
      { desde: C[4], texto: "passwords.google.com", destaque: ["passwords.google.com"] }]}
    final={{ emoji: "🔑", frase: <>Senha<br />recuperada.</> }} />;
};

// ---------- esconder apps ----------
const APPS: [string, string, string][] = [["💬", "WhatsApp", "#25D366"], ["📷", "Câmera", "#546e7a"], ["📔", "Diário", "#8e24aa"], ["🎵", "Música", "#e53935"],
  ["🗺️", "Mapas", "#43a047"], ["🏦", "Banco", "#1565c0"], ["⚙️", "Ajustes", "#757575"], ["📺", "Vídeos", "#f4511e"], ["☁️", "Tempo", "#039be5"]];
const Inicio: React.FC<{ ocultos?: string[]; menu?: boolean; marca?: string[] }> = ({ ocultos = [], menu, marca = [] }) => (
  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#00695c,#26a69a)" }}><BarraStatus cor="transparent" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 36, padding: "100px 44px" }}>
      {APPS.filter(([, n]) => !ocultos.includes(n)).map(([e, n, c]) => <div key={n} style={{ textAlign: "center", color: "#fff", fontSize: 22 }}>
        <div style={{ width: 110, height: 110, margin: "0 auto 10px", borderRadius: 28, background: c, fontSize: 60, display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: marca.includes(n) ? "0 0 0 8px #ffeb3b" : "none" }}>{e}</div>{n}</div>)}</div>
    {menu && <div style={{ position: "absolute", left: 30, right: 30, bottom: 150, background: "#fff", borderRadius: 28, display: "flex", justifyContent: "space-around", padding: "26px 0", fontSize: 24, color: "#111" }}>
      {[["🖼️", "Papel de parede"], ["🧩", "Widgets"], ["⚙️", "Configurações"]].map(([e, n]) => <div key={n} style={{ textAlign: "center" }}><div style={{ fontSize: 46 }}>{e}</div>{n}</div>)}</div>}
  </div>
);
const Ocultar: React.FC<{ marcados: string[] }> = ({ marcados }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}><Topo titulo="Ocultar aplicativos" />
    {APPS.slice(0, 7).map(([e, n, c]) => { const on = marcados.includes(n); return <div key={n} style={{ height: 96, display: "flex", alignItems: "center", gap: 20, padding: "0 28px", background: on ? "#e3f2fd" : "#fff" }}>
      <div style={{ width: 62, height: 62, borderRadius: 16, background: c, fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>{e}</div>
      <div style={{ flex: 1, fontSize: 29, color: "#111" }}>{n}</div>
      <div style={{ width: 40, height: 40, borderRadius: 8, border: `4px solid ${on ? AZUL : "#999"}`, background: on ? AZUL : "#fff", color: "#fff", fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>{on ? "✓" : ""}</div></div>; })}
  </div>
);
export const EsconderApps: React.FC = () => {
  const C = tEsc.cenas;
  return <ShortEtapas id="EsconderApps" tempos={tEsc}
    etapas={[
      { desde: 0, tela: () => <Inicio marca={["Diário", "Banco"]} /> },
      { desde: C[1] + 0.2, tela: () => <Inicio /> },
      { desde: C[1] + 1.4, toque: [295, 900], tela: () => <Inicio menu /> },
      { desde: C[1] + 2.8, toque: [470, 1120 - 150 - 55], tela: () => <Config titulo="Tela inicial" cor={CINZA} linhas={[["🔲", "Layout da tela inicial"], ["▦", "Grade de aplicativos"], ["🙈", "Ocultar aplicativos", "Esconda apps da tela"]]} /> },
      { desde: C[2] + 0.4, toque: [295, linhaY(2)], tela: () => <Ocultar marcados={[]} /> },
      { desde: C[2] + 1.8, toque: [530, 180 + 96 * 2 + 48], tela: () => <Ocultar marcados={["Diário"]} /> },
      { desde: C[2] + 2.8, toque: [530, 180 + 96 * 5 + 48], tela: () => <Ocultar marcados={["Diário", "Banco"]} /> },
      { desde: C[3], tela: () => <><Inicio ocultos={["Diário", "Banco"]} /><Toast desde={C[3] + 0.4} texto="2 aplicativos ocultos 🙈" /></> },
      { desde: C[4], tela: () => <><Inicio ocultos={["Diário", "Banco"]} /><Aviso desde={C[4] + 0.2} emoji="👀" titulo="Para mostrar de novo" texto={<>Volte ali e desmarque.<br />Às vezes chama <b>Espaço privado</b>.</>} cor="#00897b" /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Esconda APLICATIVOS 🙈", destaque: ["APLICATIVOS"] }, { desde: C[1], texto: "Segure a tela inicial", destaque: ["Segure"] },
      { desde: C[2], texto: "Ocultar aplicativos", destaque: ["Ocultar"] }, { desde: C[3], texto: "Sumiram da tela!", destaque: ["Sumiram"] },
      { desde: C[4], texto: "Para voltar: desmarque", destaque: ["desmarque"] }]}
    final={{ emoji: "🙈", frase: <>Só você<br />sabe.</> }} />;
};

// ---------- TalkBack ----------
const Falando: React.FC = () => {
  const { t } = useT();
  return <div style={{ position: "absolute", inset: 0 }}><Config titulo="Configurações" cor={CINZA} linhas={[["📶", "Conexões"], ["🔔", "Notificações"], ["🔋", "Bateria"], ["♿", "Acessibilidade"]]} />
    <div style={{ position: "absolute", left: 6, right: 6, top: linhaY(1) - 56, height: 112, border: "6px solid #43a047", borderRadius: 10 }} />
    <div style={{ position: "absolute", left: 30, right: 30, top: 720, background: "#212121", color: "#fff", borderRadius: 24, padding: "22px 26px", fontSize: 28, transform: `scale(${1 + Math.sin(t * 8) * 0.02})` }}>
      🔊 "Notificações, botão. Toque duas vezes para ativar."</div></div>;
};
const Volume: React.FC<{ desde: number }> = ({ desde }) => {
  const { t } = useT();
  const s = Math.max(0, Math.min(3, Math.floor(t - desde)));
  return <Centro cor="#102027"><div style={{ color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
    <div style={{ position: "relative", width: 260, height: 520, borderRadius: 50, background: "#37474f", border: "8px solid #111", marginTop: 20 }}>
      {[110, 210].map((y) => <div key={y} style={{ position: "absolute", right: -26, top: y, width: 18, height: 80, borderRadius: 6, background: "#ffd600", boxShadow: "0 0 24px #ffd600" }} />)}
      <div style={{ position: "absolute", left: 0, right: 0, top: 200, textAlign: "center", fontSize: 60 }}>🔉🔊</div></div>
    <b style={{ fontSize: 40, marginTop: 34 }}>Segure os 2 juntos</b>
    <div style={{ fontSize: 80, fontWeight: 900, color: "#ffd600", marginTop: 10 }}>{t < desde ? "3" : 3 - s > 0 ? 3 - s : "✓"}</div></div></Centro>;
};
export const TalkBack: React.FC = () => {
  const C = tTal.cenas;
  const acess = (on: number) => <Config titulo="Acessibilidade" cor={CINZA} linhas={[["🗣️", "TalkBack", on > 0.5 ? "Ligado" : "Desligado"], ["🔍", "Ampliação"], ["🔤", "Tamanho da fonte"]]} marca={0} direita={(i) => i === 0 ? <Chave ligada={on} /> : null} />;
  return <ShortEtapas id="TalkBack" tempos={tTal}
    etapas={[
      { desde: 0, tela: () => <Falando /> },
      { desde: C[1], tela: () => <Volume desde={C[1] + 1.0} /> },
      { desde: C[2], tela: () => <><Config titulo="Configurações" cor={CINZA} linhas={[["📶", "Conexões"], ["🔔", "Notificações"], ["🔋", "Bateria"], ["♿", "Acessibilidade"]]} /><Toast desde={C[2] + 0.2} texto="TalkBack desativado ✓" /></> },
      { desde: C[3], tela: () => <Grande emoji="👆" titulo={<>1 toque: escolhe<br />2 toques: abre</>} sub="com o TalkBack ligado" cor="#1a237e" /> },
      { desde: C[3] + 4.2, tela: () => acess(1) },
      { desde: C[3] + 6.6, toque: [500, linhaY(0)], tela: (t) => acess(Math.max(0, 1 - (t - C[3] - 6.6) / 0.3)) },
      { desde: C[4], tela: () => <Grande emoji="✌️" titulo={<>Rolar a tela:<br />use dois dedos</>} sub="enquanto ele está ligado" cor="#1a237e" /> },
    ]}
    ganchos={[{ desde: 0, texto: "Celular FALANDO sozinho? 🗣️", destaque: ["FALANDO"] }, { desde: C[1], texto: "Segure os 2 volumes", destaque: ["volumes"] },
      { desde: C[2], texto: "Desligou!", destaque: ["Desligou!"] }, { desde: C[3], texto: "Ou: Acessibilidade › TalkBack", destaque: ["TalkBack"] },
      { desde: C[4], texto: "Rolar: dois dedos", destaque: ["dois"] }]}
    final={{ emoji: "🤫", frase: <>Celular<br />em silêncio.</> }} />;
};
