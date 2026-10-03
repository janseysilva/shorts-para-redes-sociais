// Leva 6 (03/10): buscas em alta — esconder o online, ver status escondido, figurinha da foto, quem leu no grupo, truques do teclado.
import React from "react";
import tOn from "../../public/EsconderOnline/tempos.json";
import tSt from "../../public/StatusEscondido/tempos.json";
import tFig from "../../public/Figurinha/tempos.json";
import tLeu from "../../public/QuemLeu/tempos.json";
import tTec from "../../public/Teclado/tempos.json";
import { Avatar, BarraStatus, Chave, useT } from "../kit";
import { Balao, Teclado } from "../telas";
import { Aviso, Centro, Config, Conversa, ShortEtapas, linhaY } from "./Leva2";
import { CFG } from "./Leva3";
import { Grande } from "./Leva4";

const WPP = "#075E54";
const PRIV = (online: string, leitura?: boolean): [string, string, string?][] => [["👁️", "Visto por último e online", online], ["🖼️", "Foto do perfil", "Todos"],
  ["ℹ️", "Recado", "Todos"], ["✓✓", "Confirmações de leitura", leitura === undefined ? undefined : "Mostra quando você leu"], ["⭕", "Status", "Meus contatos"]];
const Topo: React.FC<{ titulo: string }> = ({ titulo }) => <><BarraStatus /><div style={{ height: 130, background: WPP, color: "#fff", display: "flex",
  alignItems: "center", padding: "0 28px", fontSize: 34, fontWeight: 700, gap: 22 }}><span style={{ fontSize: 36 }}>←</span>{titulo}</div></>;
const Secao: React.FC<{ texto: string }> = ({ texto }) => <div style={{ height: 60, display: "flex", alignItems: "flex-end", padding: "0 30px 8px",
  fontSize: 24, fontWeight: 700, color: "#0a7d5a" }}>{texto}</div>;
const Opcao: React.FC<{ texto: string; on: boolean }> = ({ texto, on }) => (
  <div style={{ height: 90, display: "flex", alignItems: "center", gap: 24, padding: "0 34px", fontSize: 30, color: "#111", background: on ? "#d9fdd3" : "#fff" }}>
    <div style={{ width: 34, height: 34, borderRadius: 17, border: `4px solid ${on ? "#0a7d5a" : "#888"}`, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
      {on && <div style={{ width: 16, height: 16, borderRadius: 8, background: "#0a7d5a" }} />}</div>{texto}</div>
);
const TiqueCinza: React.FC<{ texto: string }> = ({ texto }) => (
  <div style={{ display: "flex", justifyContent: "flex-end", padding: "6px 22px" }}>
    <div style={{ maxWidth: 420, background: "#d9fdd3", borderRadius: 18, padding: "12px 18px", fontSize: 28, color: "#111" }}>{texto}
      <div style={{ fontSize: 18, color: "#789", textAlign: "right" }}>10:12 <span style={{ color: "#8696a0" }}>✓✓</span></div></div></div>
);

// ---------- esconder o online ----------
// telas: título da seção em 180–240, opções de 90 px (centros 285, 375, 465, 555), 2ª seção 600–660, opções centros 705 e 795
const VistoOnline: React.FC<{ ninguem: boolean; igual: boolean }> = ({ ninguem, igual }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
    <Topo titulo="Visto por último e online" />
    <Secao texto="Quem pode ver meu visto por último" />
    {["Todos", "Meus contatos", "Meus contatos, exceto...", "Ninguém"].map((o, i) => <Opcao key={o} texto={o} on={ninguem ? i === 3 : i === 0} />)}
    <Secao texto="Quem pode ver quando estou online" />
    {["Todos", "Mesmo que visto por último"].map((o, i) => <Opcao key={o} texto={o} on={igual ? i === 1 : i === 0} />)}
  </div>
);
const Perfil: React.FC<{ online: boolean }> = ({ online }) => (
  <Centro><div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
    <Avatar letra="M" cor="#26A69A" tam={240} /><b style={{ fontSize: 42, marginTop: 24 }}>Maria</b>
    <div style={{ fontSize: 30, color: online ? "#0a7d5a" : "#bbb", marginTop: 8, fontWeight: 600 }}>{online ? "🟢 online" : "— ninguém vê —"}</div></div></Centro>
);
export const EsconderOnline: React.FC = () => {
  const C = tOn.cenas;
  return <ShortEtapas id="EsconderOnline" tempos={tOn}
    etapas={[
      { desde: 0, tela: () => <Perfil online /> },
      { desde: C[1] + 0.2, tela: () => <Config titulo="Configurações" linhas={CFG} /> },
      { desde: C[1] + 1.8, toque: [295, linhaY(1)], tela: () => <Config titulo="Privacidade" linhas={PRIV("Todos")} /> },
      { desde: C[1] + 3.4, toque: [295, linhaY(0)], tela: () => <VistoOnline ninguem={false} igual={false} /> },
      { desde: C[2] + 1.2, toque: [295, 555], tela: () => <VistoOnline ninguem igual={false} /> },
      { desde: C[3] + 2.4, toque: [295, 795], tela: () => <VistoOnline ninguem igual /> },
      { desde: C[4], tela: () => <><Perfil online={false} />
        <Aviso desde={C[4] + 2.2} emoji="↔️" titulo="Vale para os dois lados" texto="Você também não vê o online dos outros." cor="#f57c00" /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Esconda seu ONLINE 🟢", destaque: ["ONLINE"] }, { desde: C[1], texto: "Privacidade", destaque: ["Privacidade"] },
      { desde: C[2], texto: "Visto por último: Ninguém", destaque: ["Ninguém"] }, { desde: C[3], texto: "Online: igual ao visto", destaque: ["Online:"] },
      { desde: C[4], texto: "Ninguém vê mais", destaque: ["Ninguém"] }]}
    final={{ emoji: "🕶️", frase: <>Modo<br />invisível.</> }} />;
};

// ---------- ver status escondido ----------
const StatusTela: React.FC<{ nome: string; letra: string; cor: string; texto: string; fundo: string }> = ({ nome, letra, cor, texto, fundo }) => {
  const { t } = useT();
  return <div style={{ position: "absolute", inset: 0, background: fundo }}>
    <div style={{ position: "absolute", top: 58, left: 16, right: 16, height: 6, borderRadius: 3, background: "rgba(255,255,255,.35)" }}>
      <div style={{ width: `${(t * 18) % 100}%`, height: "100%", borderRadius: 3, background: "#fff" }} /></div>
    <div style={{ position: "absolute", top: 80, left: 24, display: "flex", alignItems: "center", gap: 16, color: "#fff" }}>
      <Avatar letra={letra} cor={cor} tam={64} /><div><b style={{ fontSize: 30 }}>{nome}</b><div style={{ fontSize: 22, opacity: 0.85 }}>hoje, 08:15</div></div></div>
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 58, fontWeight: 800,
      textAlign: "center", padding: 40 }}>{texto}</div>
  </div>;
};
const Vistos: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
    <Topo titulo="Visto por 3" />
    {[["J", "João", "#5C6BC0"], ["A", "Ana", "#EC407A"], ["P", "Pedro", "#8D6E63"]].map(([l, n, c]) => (
      <div key={n} style={{ height: 112, display: "flex", alignItems: "center", gap: 22, padding: "0 28px", borderBottom: "1px solid #eee" }}>
        <Avatar letra={l} cor={c} tam={70} /><div><div style={{ fontSize: 31, fontWeight: 600, color: "#111" }}>{n}</div><div style={{ fontSize: 24, color: "#667" }}>hoje, 08:3{n.length}</div></div></div>))}
    <div style={{ margin: "40px 30px", padding: "24px 26px", borderRadius: 20, background: "#fff3e0", border: "3px dashed #f57c00", fontSize: 28, color: "#e65100", textAlign: "center", fontWeight: 700 }}>
      Você viu, mas não aparece aqui 🤫</div>
  </div>
);
export const StatusEscondido: React.FC = () => {
  const C = tSt.cenas;
  const status = <StatusTela nome="Carla" letra="C" cor="#26A69A" texto="Bom dia! ☀️" fundo="linear-gradient(160deg,#7b1fa2,#e91e63)" />;
  const priv = (ligada: number, marca: number) => <Config titulo="Privacidade" linhas={PRIV("Meus contatos", true)} marca={marca} direita={(i) => i === 3 ? <Chave ligada={ligada} /> : null} />;
  return <ShortEtapas id="StatusEscondido" tempos={tSt}
    etapas={[
      { desde: 0, tela: () => status },
      { desde: C[1] + 0.2, tela: () => <Config titulo="Configurações" linhas={CFG} /> },
      { desde: C[1] + 1.8, toque: [295, linhaY(1)], tela: () => priv(1, -1) },
      { desde: C[1] + 3.4, toque: [500, linhaY(3)], tela: () => priv(0, 3) },
      { desde: C[2], tela: () => status },
      { desde: C[2] + 2.4, tela: () => <Vistos /> },
      { desde: C[3], tela: () => <><Conversa nome="Carla" letra="C" cor="#26A69A"><TiqueCinza texto="Viu meu status?" /><TiqueCinza texto="Kkkk" /></Conversa>
        <Aviso desde={C[3] + 0.4} emoji="⚖️" titulo="O lado ruim" texto={<>Você não vê quem viu os seus status<br />e os tiques azuis somem.</>} cor="#f57c00" /></> },
      { desde: C[4], tela: () => priv(0, 3) },
      { desde: C[4] + 1.2, toque: [500, linhaY(3)], tela: () => priv(1, 3) },
    ]}
    ganchos={[{ desde: 0, texto: "Ver status ESCONDIDO 👀", destaque: ["ESCONDIDO"] }, { desde: C[1], texto: "Confirmações de leitura", destaque: ["leitura"] },
      { desde: C[2], texto: "Seu nome não aparece", destaque: ["aparece"] }, { desde: C[3], texto: "O lado ruim", destaque: ["ruim"] },
      { desde: C[4], texto: "Liga de novo depois", destaque: ["Liga"] }]}
    final={{ emoji: "🕵️", frase: <>Viu sem<br />ser visto.</> }} />;
};

// ---------- figurinha da sua foto ----------
const Figura: React.FC<{ tam?: number; texto?: boolean; emoji?: boolean }> = ({ tam = 230, texto = true, emoji = true }) => (
  <div style={{ width: tam, height: tam, position: "relative", filter: "drop-shadow(0 6px 8px rgba(0,0,0,.25))" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: "48% 52% 45% 55%", background: "#fff", padding: tam * 0.05 }}>
      <div style={{ width: "100%", height: "100%", borderRadius: "48% 52% 45% 55%", background: "linear-gradient(160deg,#ffcc80,#ff8a65)", display: "flex",
        alignItems: "center", justifyContent: "center", fontSize: tam * 0.55 }}>🙋</div></div>
    {texto && <div style={{ position: "absolute", left: 0, right: 0, bottom: tam * 0.02, textAlign: "center", fontSize: tam * 0.15, fontWeight: 900, color: "#fff",
      WebkitTextStroke: `${tam * 0.012}px #111` }}>BOM DIA!</div>}
    {emoji && <div style={{ position: "absolute", right: -tam * 0.04, top: -tam * 0.04, fontSize: tam * 0.24 }}>❤️</div>}
  </div>
);
const Painel: React.FC<{ nova: boolean; marca: boolean }> = ({ nova, marca }) => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 500, background: "#fff", borderTop: "1px solid #ddd" }}>
    <div style={{ display: "flex", gap: 34, padding: "18px 30px", fontSize: 36, borderBottom: "1px solid #eee" }}><span>😀</span><span>🎞️</span>
      <span style={{ borderBottom: "4px solid #0a7d5a" }}>🗒️</span></div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, padding: 24 }}>
      <div style={{ height: 116, borderRadius: 20, border: `4px dashed ${marca ? "#0a7d5a" : "#aaa"}`, background: marca ? "#d9fdd3" : "#fafafa", display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: 44, color: "#0a7d5a" }}>+<span style={{ fontSize: 18 }}>Criar</span></div>
      {nova && <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><Figura tam={110} /></div>}
      {["🐱", "😂", "👍", "🎉", "🌻", "🙏", "🔥"].slice(0, nova ? 6 : 7).map((e) => <div key={e} style={{ height: 116, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 76 }}>{e}</div>)}
    </div>
  </div>
);
const Editor: React.FC<{ t: number; desde: number }> = ({ t, desde }) => {
  const recorte = t >= desde + 1.2, texto = t >= desde + 2.6, emoji = t >= desde + 3.8;
  return <div style={{ position: "absolute", inset: 0, background: "#111" }}>
    <BarraStatus cor="#111" />
    <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 34px", fontSize: 44, color: "#fff" }}><span>✕</span>
      <span style={{ display: "flex", gap: 34 }}><span style={{ opacity: recorte ? 1 : 0.6 }}>✂️</span><span style={{ opacity: texto ? 1 : 0.6 }}>T</span><span style={{ opacity: emoji ? 1 : 0.6 }}>😀</span></span></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 260, display: "flex", justifyContent: "center" }}>
      {recorte ? <Figura tam={400} texto={texto} emoji={emoji} />
        : <div style={{ width: 460, height: 560, background: "linear-gradient(160deg,#90caf9,#a5d6a7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 260 }}>🙋</div>}
    </div>
    {recorte && !texto && <div style={{ position: "absolute", left: 0, right: 0, top: 860, textAlign: "center", color: "#fff", fontSize: 26 }}>Fundo removido ✂️</div>}
    <div style={{ position: "absolute", right: 40, bottom: 40, width: 110, height: 110, borderRadius: 55, background: "#25D366", color: "#fff", fontSize: 50,
      display: "flex", alignItems: "center", justifyContent: "center" }}>➤</div>
  </div>;
};
export const Figurinha: React.FC = () => {
  const C = tFig.cenas;
  const enviada = <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px 30px" }}><Figura /></div>;
  const chat = (fig: boolean, extra?: React.ReactNode) => <><Conversa nome="Amigas" letra="A" cor="#EC407A">
    <Balao autor="Bia" cor="#7E57C2" texto="Bom dia, gente! ☀️" hora="08:01" />{fig && enviada}</Conversa>{extra}</>;
  return <ShortEtapas id="Figurinha" tempos={tFig}
    etapas={[
      { desde: 0, tela: () => chat(true) },
      { desde: C[1] + 0.4, toque: [40, 1080], tela: () => chat(false, <Painel nova={false} marca={false} />) },
      { desde: C[1] + 2.4, toque: [95, 740], tela: () => chat(false, <Painel nova={false} marca />) },
      { desde: C[2], tela: (t) => <Editor t={t} desde={C[2]} /> },
      { desde: C[3] + 0.6, toque: [495, 1025], tela: () => chat(true) },
      { desde: C[4], tela: () => chat(true, <Painel nova marca={false} />) },
    ]}
    ganchos={[{ desde: 0, texto: "Sua foto vira FIGURINHA 😄", destaque: ["FIGURINHA"] }, { desde: C[1], texto: "Figurinhas › Criar", destaque: ["Criar"] },
      { desde: C[2], texto: "Recorte, texto e emoji", destaque: ["Recorte,"] }, { desde: C[3], texto: "Enviou!", destaque: ["Enviou!"] },
      { desde: C[4], texto: "Fica salva", destaque: ["salva"] }]}
    final={{ emoji: "😄", frase: <>Sua foto<br />virou figurinha.</> }} />;
};

// ---------- quem leu no grupo ----------
const MSG = "Reunião amanhã às 19h! 📅";
const Selecao: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 50, height: 130, background: "#0b5c52", color: "#fff", display: "flex", alignItems: "center",
    gap: 40, padding: "0 30px", fontSize: 38 }}><span>←</span><b style={{ fontSize: 34, flex: 1 }}>1</b><span>↩️</span><span>⭐</span><span>🗑️</span><span>⋮</span></div>
);
const Menu: React.FC<{ marca: boolean }> = ({ marca }) => (
  <div style={{ position: "absolute", right: 14, top: 70, width: 300, background: "#fff", borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,.35)", padding: "10px 0" }}>
    {["Dados", "Copiar", "Fixar", "Denunciar"].map((o, i) => <div key={o} style={{ padding: "22px 30px", fontSize: 30, color: "#111",
      background: marca && i === 0 ? "#d9fdd3" : "#fff" }}>{o}</div>)}
  </div>
);
const Dados: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: "#f0f2f5" }}>
    <Topo titulo="Dados da mensagem" />
    <div style={{ background: "#efe7de", padding: "20px 0" }}><Balao minha texto={MSG} hora="18:02" /></div>
    {[["Lida por", [["M", "Mãe", "#EC407A", "18:05"], ["J", "João", "#5C6BC0", "18:20"], ["T", "Tia Rosa", "#8D6E63", "18:41"]]],
      ["Entregue para", [["P", "Pai", "#43A047", "18:02"], ["L", "Lucas", "#FB8C00", "18:03"]]]].map(([tit, lista]) => (
      <div key={tit as string} style={{ background: "#fff", marginTop: 16 }}>
        <div style={{ padding: "18px 28px 4px", fontSize: 26, fontWeight: 700, color: "#0a7d5a" }}>{tit === "Lida por" ? "✓✓ Lida por" : "✓✓ Entregue para"}</div>
        {(lista as string[][]).map(([l, n, c, h]) => <div key={n} style={{ height: 96, display: "flex", alignItems: "center", gap: 20, padding: "0 28px" }}>
          <Avatar letra={l} cor={c} tam={62} /><span style={{ fontSize: 30, flex: 1, color: "#111" }}>{n}</span><span style={{ fontSize: 24, color: "#667" }}>{h}</span></div>)}
      </div>))}
  </div>
);
export const QuemLeu: React.FC = () => {
  const C = tLeu.cenas;
  const grupo = (sel: boolean) => <Conversa nome="Família" letra="F" cor="#7C4DFF"><Balao minha texto={MSG} hora="18:02" selecionado={sel} /></Conversa>;
  return <ShortEtapas id="QuemLeu" tempos={tLeu}
    etapas={[
      { desde: 0, tela: () => grupo(false) },
      { desde: C[1] + 0.6, toque: [400, 250], tela: () => <>{grupo(true)}<Selecao /></> },
      { desde: C[2] + 0.4, toque: [545, 115], tela: () => <>{grupo(true)}<Selecao /><Menu marca={false} /></> },
      { desde: C[2] + 1.6, tela: () => <>{grupo(true)}<Selecao /><Menu marca /></> },
      { desde: C[3] - 0.2, toque: [400, 117], tela: () => <Dados /> },
      { desde: C[4], tela: () => <><Dados /><Aviso desde={C[4] + 0.3} emoji="🔕" titulo="Não aparece em Lida?" texto="A pessoa pode ter desligado a confirmação de leitura." cor="#f57c00" /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Quem LEU no grupo? 👀", destaque: ["LEU"] }, { desde: C[1], texto: "Segure a mensagem", destaque: ["Segure"] },
      { desde: C[2], texto: "⋮ › Dados", destaque: ["Dados"] }, { desde: C[3], texto: "Lida e entregue", destaque: ["Lida"] },
      { desde: C[4], texto: "Não aparece? Leitura desligada", destaque: ["desligada"] }]}
    final={{ emoji: "✅", frase: <>Agora você<br />sabe quem leu.</> }} />;
};

// ---------- truques do teclado ----------
// teclado de 380 px no fim da tela (topo em 740): fileiras de 66 px a cada 78 px; barra de espaço de x 125 a 425, centro y 1025
const Toque: React.FC<{ x: number; y: number }> = ({ x, y }) => <div style={{ position: "absolute", left: x - 40, top: y - 40, width: 80, height: 80, borderRadius: 40,
  background: "rgba(37,211,102,.45)", border: "4px solid #25D366" }} />;
const Campo: React.FC<{ texto: string; cursor?: number }> = ({ texto, cursor }) => {
  const { t } = useT();
  const k = cursor ?? texto.length;
  const pisca = Math.floor(t * 3) % 2 === 0;
  return <div style={{ position: "absolute", left: 14, right: 14, top: 650, height: 76, background: "#fff", borderRadius: 38, display: "flex", alignItems: "center",
    padding: "0 26px", fontSize: 28, color: "#111", whiteSpace: "pre" }}>{texto.slice(0, k)}<span style={{ display: "inline-block", width: 3, height: 34,
      background: pisca ? "#0a7d5a" : "transparent", margin: "0 1px" }} />{texto.slice(k)}</div>;
};
const Shift: React.FC<{ fixo: boolean }> = ({ fixo }) => <div style={{ position: "absolute", left: 18, top: 914, width: 72, height: 66, borderRadius: 8,
  background: fixo ? "#1a73e8" : "#cfd3d8", color: fixo ? "#fff" : "#222", fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>{fixo ? "⇪" : "⇧"}</div>;
export const TecladoTruques: React.FC = () => {
  const C = tTec.cenas;
  const base = (campo: React.ReactNode, extra?: React.ReactNode) => <><Conversa nome="Júlia" letra="J" cor="#AB47BC">
    <Balao texto="Bora no cinema? 🎬" hora="19:40" /></Conversa>{campo}<Teclado sobe={1} />{extra}</>;
  const FRASE = "Vamos ao cinema amanhã";
  return <ShortEtapas id="Teclado" tempos={tTec}
    etapas={[
      { desde: 0, tela: () => <Grande emoji="⌨️" titulo={<>3 truques<br />do teclado</>} sub="que pouca gente usa" /> },
      { desde: C[1], tela: (t) => {
        const p = Math.max(0, Math.min(1, (t - C[1] - 1.2) / 2.4));
        const ida = p < 0.5 ? p * 2 : 2 - p * 2;
        const cur = Math.round(FRASE.length - ida * 15);
        return base(<Campo texto={FRASE} cursor={cur} />, t >= C[1] + 1.0 ? <Toque x={360 - ida * 180} y={1025} /> : null);
      } },
      { desde: C[2], tela: (t) => {
        const pop = t >= C[2] + 1.0 && t < C[3] - 0.6;
        return base(<Campo texto={t >= C[2] + 2.6 ? "Você" : "Voc"} />, <>{t >= C[2] + 0.8 && t < C[3] - 0.6 && <Toque x={152} y={791} />}
          {pop && <div style={{ position: "absolute", left: 40, top: 660, display: "flex", gap: 6, background: "#fff", borderRadius: 14, padding: 8, boxShadow: "0 8px 20px rgba(0,0,0,.3)" }}>
            {["3", "é", "ê", "è", "ë"].map((c, i) => <div key={c} style={{ width: 66, height: 70, borderRadius: 10, fontSize: 34, display: "flex", alignItems: "center",
              justifyContent: "center", background: i === 2 && t >= C[2] + 2.0 ? "#1a73e8" : "#f1f3f4", color: i === 2 && t >= C[2] + 2.0 ? "#fff" : "#222" }}>{c}</div>)}</div>}</>);
      } },
      { desde: C[3], tela: (t) => base(<Campo texto={t >= C[3] + 1.6 ? "PARABÉNS!!!".slice(0, Math.max(0, Math.floor((t - C[3] - 1.6) * 6))) : ""} />,
        <><Shift fixo={t >= C[3] + 1.1} />{t >= C[3] + 0.5 && t < C[3] + 1.4 && <Toque x={54} y={947} />}</>) },
      { desde: C[4], tela: () => <Grande emoji="✅" titulo={<>Google e<br />Samsung</>} sub="testa agora!" cor="#0b3d33" /> },
    ]}
    ganchos={[{ desde: 0, texto: "3 truques do TECLADO ⌨️", destaque: ["TECLADO"] }, { desde: C[1], texto: "1. Deslize no espaço", destaque: ["espaço"] },
      { desde: C[2], texto: "2. Segure a letra", destaque: ["Segure"] }, { desde: C[3], texto: "3. Duas vezes na setinha", destaque: ["setinha"] },
      { desde: C[4], texto: "Testa agora!", destaque: ["agora!"] }]}
    final={{ emoji: "⌨️", frase: <>Digite<br />mais rápido.</> }} />;
};
