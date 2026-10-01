// Leva 2 (30/09): temas em alta — segurança, golpes, novidades do WhatsApp e do Pix. Estilo v2 aprovado (sem explosões).
import React from "react";
import tDuas from "../../public/DuasEtapas/tempos.json";
import tPin from "../../public/PinChip/tempos.json";
import tTransc from "../../public/Transcrever/tempos.json";
import tPix from "../../public/PixAproximacao/tempos.json";
import tGolpe from "../../public/GolpePix/tempos.json";
import { Avatar, BarraApp, BarraStatus, Chave, Dedo, Linha, Short, VERDE, mola, tela, useT, type Gancho, type Passo as PassoDedo, type Tempos } from "../kit";
import { Balao, FundoConversa, ListaConversas, TelaInicial } from "../telas";

export const WPP = "#075E54";
/** centro (local) da linha i de uma lista de configurações (logo abaixo da barra do app) */
export const linhaY = (i: number) => 180 + 112 * i + 56;

export type Etapa = { desde: number; tela: (t: number) => React.ReactNode; toque?: [number, number] };

/** Short feito de uma sequência de telas; o dedo toca em cada ponto "toque" um pouco antes da tela seguinte aparecer. */
export const ShortEtapas: React.FC<{ id: string; tempos: Tempos; etapas: Etapa[]; ganchos: Gancho[]; final: { emoji: string; frase: React.ReactNode };
  fora?: React.ReactNode; sobre?: React.ReactNode }> = ({ id, tempos, etapas, ganchos, final, fora, sobre }) => {
  const C = tempos.cenas;
  const Tela: React.FC = () => {
    const { t } = useT();
    const e = [...etapas].reverse().find((x) => t >= x.desde) ?? etapas[0];
    return <>{e.tela(t)}</>;
  };
  const toques: PassoDedo[] = etapas.filter((e) => e.toque).map((e) => ({ t: e.desde - 0.3, x: tela(...e.toque!).x, y: tela(...e.toque!).y, acao: "toque" }));
  return (
    <Short id={id} tempos={tempos} ganchos={ganchos}
      cam={[{ t: 0, s: 1, x: 540, y: 920 }, { t: C[1], s: 1, x: 540, y: 920 }, { t: C[1] + 0.6, s: 1.12, x: 540, y: 900 },
        { t: C[4] - 0.2, s: 1.12, x: 540, y: 900 }, { t: C[4] + 0.4, s: 1, x: 540, y: 920 }]}
      sobre={<>{sobre}{toques.length > 0 && <Dedo some={toques[toques.length - 1].t + 0.6} passos={toques} />}</>}
      fora={fora}
      sons={toques.map((p) => ({ t: p.t, som: "clique" as const }))}
      tela={<Tela />} final={final} />
  );
};

// ---------- peças de tela ----------
export const Config: React.FC<{ titulo: string; linhas: [string, string, string?][]; marca?: number; cor?: string; direita?: (i: number) => React.ReactNode }> = ({
  titulo, linhas, marca = -1, cor = WPP, direita,
}) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
    <BarraStatus cor={cor} claro={cor !== "#fff"} />
    <BarraApp titulo={titulo} cor={cor} esquerda={<span style={{ fontSize: 36, color: cor === "#fff" ? "#111" : "#fff" }}>←</span>} />
    {linhas.map(([ic, ti, sub], i) => <Linha key={i} icone={ic} titulo={ti} sub={sub} destaque={i === marca} direita={direita?.(i)} />)}
  </div>
);
export const Centro: React.FC<{ cor?: string; children: React.ReactNode }> = ({ cor = "#fff", children }) => (
  <div style={{ position: "absolute", inset: 0, background: cor, display: "flex", flexDirection: "column", alignItems: "center",
    textAlign: "center", color: "#111", fontSize: 30, padding: "170px 40px 0" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}><BarraStatus cor="transparent" claro={cor !== "#fff"} /></div>{children}</div>
);
export const Botao: React.FC<{ texto: string; cor?: string; y?: number }> = ({ texto, cor = VERDE, y = 800 }) => (
  <div style={{ position: "absolute", left: 95, right: 95, top: y - 45, height: 90, borderRadius: 45, background: cor, color: "#fff", fontSize: 32,
    fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{texto}</div>
);
export const Pontos: React.FC<{ n: number; total?: number }> = ({ n, total = 6 }) => (
  <div style={{ display: "flex", gap: 22, margin: "40px 0", justifyContent: "center" }}>
    {Array.from({ length: total }).map((_, i) => <div key={i} style={{ width: 40, height: 40, borderRadius: 20, border: "4px solid #075E54",
      background: i < n ? "#075E54" : "transparent" }} />)}
  </div>
);
export const Aviso: React.FC<{ emoji: string; titulo: string; texto: React.ReactNode; cor?: string; desde: number }> = ({ emoji, titulo, texto, cor = "#e53935", desde }) => {
  const { frame, fps } = useT();
  const e = mola(frame, desde, fps, 13);
  return (
    <div style={{ position: "absolute", left: 30, right: 30, top: 300, background: "#fff", borderRadius: 32, border: `6px solid ${cor}`, padding: 34,
      textAlign: "center", boxShadow: "0 20px 50px rgba(0,0,0,.4)", transform: `scale(${e})` }}>
      <div style={{ fontSize: 110 }}>{emoji}</div>
      <div style={{ fontSize: 40, fontWeight: 900, color: cor, margin: "10px 0" }}>{titulo}</div>
      <div style={{ fontSize: 30, color: "#222", lineHeight: 1.35 }}>{texto}</div>
    </div>
  );
};

// ---------- 16: confirmação em duas etapas ----------
export const DuasEtapas: React.FC = () => {
  const C = tDuas.cenas;
  const CFG: [string, string, string?][] = [["🔑", "Conta", "Segurança, mudar número"], ["🔒", "Privacidade"], ["💬", "Conversas"], ["🔔", "Notificações"], ["📦", "Armazenamento e dados"]];
  const CONTA: [string, string, string?][] = [["🛡️", "Notificações de segurança"], ["🔐", "Confirmação em duas etapas"], ["📱", "Mudar número"], ["📄", "Solicitar dados da conta"]];
  return <ShortEtapas id="DuasEtapas" tempos={tDuas}
    etapas={[
      { desde: 0, tela: () => <ListaConversas /> },
      { desde: C[1] + 0.2, tela: () => <Config titulo="Configurações" linhas={CFG} /> },
      { desde: C[1] + 1.6, toque: [295, linhaY(0)], tela: () => <Config titulo="Conta" linhas={CONTA} /> },
      { desde: C[1] + 3.2, toque: [295, linhaY(1)], tela: () => <Centro><div style={{ fontSize: 130 }}>🔐</div><b style={{ fontSize: 38 }}>Confirmação em duas etapas</b>
        <div style={{ marginTop: 20, color: "#555" }}>Crie um PIN que será pedido quando alguém registrar o seu número.</div><Botao texto="Ativar" /></Centro> },
      { desde: C[2] + 0.9, toque: [295, 800], tela: (t) => <Centro><b style={{ fontSize: 36 }}>Digite um PIN de 6 dígitos</b><Pontos n={Math.min(6, Math.floor((t - C[2] - 1.1) * 3.5))} /></Centro> },
      { desde: C[3], tela: () => <Centro><div style={{ fontSize: 150 }}>✅</div><b style={{ fontSize: 40 }}>Confirmação em duas etapas ativada</b></Centro> },
      { desde: C[4], tela: (t) => <FundoConversa><BarraStatus /><div style={{ height: 130, background: WPP, display: "flex", alignItems: "center", gap: 18, padding: "0 24px", color: "#fff" }}>
        <Avatar letra="?" cor="#9e9e9e" tam={70} /><span style={{ fontSize: 30, fontWeight: 700 }}>+55 11 97777-0000</span></div>
        <div style={{ paddingTop: 20 }}><Balao texto="Olá, sou do suporte do WhatsApp. Me passa o código de 6 números que chegou por SMS?" hora="10:02" /></div>
        {t > C[4] + 1.6 && <Aviso desde={C[4] + 1.6} emoji="🚫" titulo="Nunca passe o código" texto="O WhatsApp não pede código por mensagem." />}</FundoConversa> },
    ]}
    ganchos={[{ desde: 0, texto: "Evite o WhatsApp clonado 🔐", destaque: ["clonado"] }, { desde: C[1], texto: "Confirmação em duas etapas", destaque: ["duas", "etapas"] },
      { desde: C[3], texto: "Sem o PIN, não entra", destaque: ["PIN,"] }, { desde: C[4], texto: "Nunca passe o código", destaque: ["Nunca"] }]}
    final={{ emoji: "🔐", frase: <>WhatsApp<br />protegido.</> }} />;
};

// ---------- 17: PIN do chip ----------
export const PinChip: React.FC = () => {
  const C = tPin.cenas;
  const AJ: [string, string, string?][] = [["📶", "Conexões"], ["🔋", "Bateria"], ["🔒", "Segurança", "Bloqueio de tela, chip"], ["📱", "Tela"], ["🔔", "Sons"]];
  const SEG: [string, string, string?][] = [["🔒", "Bloqueio de tela"], ["👆", "Impressão digital"], ["📇", "Bloqueio do chip SIM"], ["📍", "Localizar dispositivo"]];
  return <ShortEtapas id="PinChip" tempos={tPin}
    etapas={[
      { desde: 0, tela: () => <><TelaInicial /><div style={{ position: "absolute", top: 0, width: "100%" }}><BarraStatus cor="transparent" /></div></> },
      { desde: C[1] + 0.2, tela: () => <Config titulo="Configurações" linhas={AJ} cor="#37474f" /> },
      { desde: C[1] + 1.8, toque: [295, linhaY(2)], tela: () => <Config titulo="Segurança" linhas={SEG} cor="#37474f" /> },
      { desde: C[1] + 3.4, toque: [295, linhaY(2)], tela: (t) => <Config titulo="Bloqueio do chip SIM" cor="#37474f"
        linhas={[["📇", "Bloquear chip SIM", "Pede o PIN ao ligar o celular"], ["🔁", "Alterar PIN do chip"]]} direita={(i) => i === 0 ? <Chave ligada={t >= C[2] + 0.6 ? 1 : 0} /> : null} /> },
      { desde: C[2] + 0.9, tela: (t) => <><Config titulo="Bloqueio do chip SIM" cor="#37474f" linhas={[["📇", "Bloquear chip SIM"], ["🔁", "Alterar PIN do chip"]]} direita={(i) => i === 0 ? <Chave ligada={1} /> : null} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.45)" }} />
        <div style={{ position: "absolute", left: 40, right: 40, top: 330, background: "#fff", borderRadius: 26, padding: 34, textAlign: "center" }}>
          <b style={{ fontSize: 34 }}>PIN do chip</b><div style={{ fontSize: 24, color: "#666", marginTop: 8 }}>Está no cartão da operadora</div>
          <Pontos n={Math.min(4, Math.floor((t - C[2] - 1.4) * 2.5))} total={4} /></div></> },
      { desde: C[3], tela: () => <Centro cor="#111"><div style={{ color: "#fff" }}><div style={{ fontSize: 140 }}>🔒</div><b style={{ fontSize: 40 }}>Digite o PIN do chip</b>
        <div style={{ fontSize: 28, color: "#bbb", marginTop: 16 }}>Chip em outro celular? Sem o PIN, não funciona.</div></div></Centro> },
      { desde: C[4], tela: () => <><Centro cor="#111"><div style={{ fontSize: 140 }}>🔒</div></Centro>
        <Aviso desde={C[4] + 0.2} emoji="⚠️" titulo="3 erros bloqueiam o chip" texto="Guarde o PIN num lugar seguro." cor="#f57c00" /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Proteja o seu número 📱", destaque: ["número"] }, { desde: C[1], texto: "Senha no chip (PIN)", destaque: ["chip"] },
      { desde: C[3], texto: "Chip roubado não funciona", destaque: ["não", "funciona"] }, { desde: C[4], texto: "Cuidado com 3 erros", destaque: ["3", "erros"] }]}
    final={{ emoji: "📇", frase: <>Chip com<br />senha.</> }} />;
};

// ---------- 18: transcrever áudio ----------
const TEXTO_AUDIO = "Oi! Passando pra avisar que a reunião mudou para quinta, às 15h, na sala 2. Leva os documentos, tá? Beijo!";
const Audio: React.FC<{ t: number; mostra: boolean; desde: number }> = ({ t, mostra, desde }) => (
  <Balao hora="14:20" texto={<div style={{ width: 380 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}><span style={{ fontSize: 36 }}>▶</span>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>{Array.from({ length: 22 }).map((_, i) => <div key={i} style={{ width: 6, borderRadius: 3, height: 10 + Math.abs(Math.sin(i * 1.7)) * 34, background: "#8a9a94" }} />)}</div>
      <span style={{ fontSize: 22 }}>3:47</span></div>
    {mostra ? <div style={{ marginTop: 14, fontSize: 26, color: "#222", borderTop: "1px solid #ddd", paddingTop: 10 }}>{TEXTO_AUDIO.slice(0, Math.max(0, Math.floor((t - desde) * 40)))}</div>
      : <div style={{ marginTop: 10, fontSize: 26, color: "#0a7d5a", fontWeight: 700 }}>Transcrever</div>}
  </div>} />
);
export const Conversa: React.FC<{ nome: string; letra: string; cor: string; children: React.ReactNode }> = ({ nome, letra, cor, children }) => (
  <FundoConversa><BarraStatus /><div style={{ height: 130, background: WPP, display: "flex", alignItems: "center", gap: 18, padding: "0 24px", color: "#fff" }}>
    <span style={{ fontSize: 36 }}>←</span><Avatar letra={letra} cor={cor} tam={70} /><span style={{ fontSize: 32, fontWeight: 700 }}>{nome}</span></div>
    <div style={{ paddingTop: 20 }}>{children}</div></FundoConversa>
);
export const Transcrever: React.FC = () => {
  const C = tTransc.cenas;
  const CFG: [string, string, string?][] = [["🔑", "Conta"], ["🔒", "Privacidade"], ["💬", "Conversas", "Tema, papel de parede"], ["🔔", "Notificações"]];
  const CONV: [string, string, string?][] = [["🎨", "Tema"], ["🖼️", "Papel de parede"], ["📝", "Transcrição de mensagens de voz", "Ler os áudios em texto"], ["☁️", "Backup de conversas"]];
  return <ShortEtapas id="Transcrever" tempos={tTransc}
    etapas={[
      { desde: 0, tela: (t) => <Conversa nome="Luciana" letra="L" cor="#AB47BC"><Audio t={t} mostra={false} desde={0} /></Conversa> },
      { desde: C[1] + 0.3, tela: () => <Config titulo="Configurações" linhas={CFG} /> },
      { desde: C[1] + 2.4, toque: [295, linhaY(2)], tela: (t) => <Config titulo="Conversas" linhas={CONV} marca={2} direita={(i) => i === 2 ? <Chave ligada={t >= C[1] + 4.6 ? 1 : 0} /> : null} /> },
      { desde: C[2], tela: (t) => <Conversa nome="Luciana" letra="L" cor="#AB47BC"><Audio t={t} mostra={false} desde={0} /></Conversa> },
      { desde: C[2] + 1.6, toque: [150, 330], tela: (t) => <Conversa nome="Luciana" letra="L" cor="#AB47BC"><Audio t={t} mostra desde={C[2] + 1.8} /></Conversa> },
    ]}
    sobre={null}
    ganchos={[{ desde: 0, texto: "Não pode ouvir o áudio? 🎧", destaque: ["áudio?"] }, { desde: C[1], texto: "Transforme áudio em texto", destaque: ["texto"] },
      { desde: C[3], texto: "Leia em segundos", destaque: ["Leia"] }, { desde: C[4], texto: "Ótimo em lugar barulhento", destaque: ["barulhento"] }]}
    final={{ emoji: "📝", frase: <>Áudio virou<br />texto.</> }} />;
};

// ---------- 19: Pix por aproximação ----------
const BANCO = "#5b2bd6";
const Maquininha: React.FC<{ desde: number; ate: number }> = ({ desde, ate }) => {
  const { frame, fps, t } = useT();
  if (t < desde || t > ate) return null;
  const e = mola(frame, desde, fps, 14);
  return (
    <div style={{ position: "absolute", left: 660 + (1 - e) * 500, top: 980, width: 300, height: 480, borderRadius: 40, background: "#263238", padding: 22, transform: "rotate(-10deg)",
      boxShadow: "0 20px 40px rgba(0,0,0,.5)", zIndex: 6 }}>
      <div style={{ height: 150, borderRadius: 16, background: "#b2dfdb", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#111", fontSize: 28 }}>
        <b style={{ fontSize: 40 }}>R$ 42,50</b>Pix</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 20 }}>
        {Array.from({ length: 9 }).map((_, i) => <div key={i} style={{ height: 52, borderRadius: 10, background: "#455a64" }} />)}</div>
    </div>
  );
};
export const PixAproximacao: React.FC = () => {
  const C = tPix.cenas;
  const app = (corpo: React.ReactNode) => <div style={{ position: "absolute", inset: 0, background: "#f4f1ff" }}><BarraStatus cor={BANCO} />
    <div style={{ height: 130, background: BANCO, color: "#fff", display: "flex", alignItems: "center", padding: "0 30px", fontSize: 36, fontWeight: 800 }}>Meu Banco · Pix</div>{corpo}</div>;
  const tile = (e: string, n: string, on?: boolean) => <div style={{ background: on ? "#e5dcff" : "#fff", border: on ? `4px solid ${BANCO}` : "4px solid transparent", borderRadius: 24,
    height: 170, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700, color: "#222" }}><div style={{ fontSize: 60 }}>{e}</div>{n}</div>;
  return <ShortEtapas id="PixAproximacao" tempos={tPix}
    etapas={[
      { desde: 0, tela: () => <><TelaInicial /><div style={{ position: "absolute", top: 0, width: "100%" }}><BarraStatus cor="transparent" /></div></> },
      { desde: C[1] + 0.2, tela: () => app(<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, padding: 30 }}>
        {tile("💸", "Pagar")}{tile("🔁", "Transferir")}{tile("📲", "Pix por aproximação", true)}{tile("🔑", "Minhas chaves")}</div>) },
      { desde: C[1] + 1.9, toque: [155, 180 + 30 + 170 + 20 + 85], tela: (t) => app(<><Linha icone="📲" titulo="Pix por aproximação" sub="Pague encostando na maquininha" direita={<Chave ligada={t >= C[1] + 2.9 ? 1 : 0} />} /></>) },
      { desde: C[2] + 0.3, tela: (t) => <Centro cor={BANCO}><div style={{ color: "#fff" }}><div style={{ fontSize: 130, transform: `scale(${1 + Math.sin(t * 6) * 0.06})` }}>📲</div>
        <b style={{ fontSize: 40 }}>Aproxime da maquininha</b><div style={{ fontSize: 60, marginTop: 30, letterSpacing: 12, opacity: 0.4 + Math.abs(Math.sin(t * 4)) * 0.6 }}>)))</div></div></Centro> },
      { desde: C[3], tela: (t) => t < C[3] + 1.6 ? <Centro><div style={{ fontSize: 140 }}>👆</div><b style={{ fontSize: 38 }}>Confirme com a digital</b></Centro>
        : <Centro><div style={{ fontSize: 150 }}>✅</div><b style={{ fontSize: 40 }}>Pix de R$ 42,50 pago</b><div style={{ color: "#555", marginTop: 12 }}>Padaria Pão Quente</div></Centro> },
      { desde: C[4], tela: () => <Config titulo="Conexões" cor="#37474f" linhas={[["📶", "Wi-Fi"], ["🔵", "Bluetooth"], ["📳", "NFC e pagamentos", "Precisa estar ligado"], ["✈️", "Modo avião"]]} marca={2}
        direita={(i) => i < 3 ? <Chave ligada={1} /> : <Chave ligada={0} />} /> },
    ]}
    fora={<Maquininha desde={C[2] + 0.5} ate={C[4]} />}
    ganchos={[{ desde: 0, texto: "Pix só encostando o celular 📲", destaque: ["encostando"] }, { desde: C[1], texto: "Ative no app do banco", destaque: ["banco"] },
      { desde: C[2], texto: "Encoste na maquininha", destaque: ["maquininha"] }, { desde: C[4], texto: "Android com NFC ligado", destaque: ["NFC"] }]}
    final={{ emoji: "📲", frase: <>Pix por<br />aproximação.</> }} />;
};

// ---------- 20: golpe do Pix ----------
export const Marca: React.FC<{ texto: string; x: number; y: number; desde: number }> = ({ texto, x, y, desde }) => {
  const { frame, fps, t } = useT();
  if (t < desde) return null;
  const e = mola(frame, desde, fps, 10);
  return <div style={{ position: "absolute", left: x, top: y, background: "#e53935", color: "#fff", fontSize: 26, fontWeight: 800, borderRadius: 14, padding: "6px 16px",
    transform: `scale(${e}) rotate(-4deg)`, boxShadow: "0 6px 16px rgba(0,0,0,.35)" }}>⚠️ {texto}</div>;
};
export const GolpePix: React.FC = () => {
  const C = tGolpe.cenas;
  const chat = (t: number, marcas: boolean) => (
    <><FundoConversa><BarraStatus /><div style={{ height: 130, background: WPP, display: "flex", alignItems: "center", gap: 18, padding: "0 24px", color: "#fff" }}>
      <span style={{ fontSize: 36 }}>←</span><Avatar letra="?" cor="#9e9e9e" tam={70} /><span style={{ fontSize: 30, fontWeight: 700 }}>+55 11 98888-1234</span></div>
      <div style={{ paddingTop: 20 }}>
        {t >= C[1] + 0.3 && <Balao texto="Oi mãe! Troquei de número 😊" hora="21:14" />}
        {t >= C[1] + 2.2 && <Balao texto="Me faz um Pix urgente? Amanhã te devolvo 🙏" hora="21:14" />}
      </div></FundoConversa>
      {marcas && <><Marca texto="Número novo" x={250} y={60} desde={C[2] + 0.3} /><Marca texto="Pressa" x={300} y={400} desde={C[2] + 1.4} /><Marca texto="Pix" x={60} y={400} desde={C[2] + 2.4} /></>}</>
  );
  return <ShortEtapas id="GolpePix" tempos={tGolpe}
    etapas={[
      { desde: 0, tela: () => <ListaConversas /> },
      { desde: C[1], tela: (t) => chat(t, false) },
      { desde: C[2], tela: (t) => chat(t, true) },
      { desde: C[3], tela: (t) => <Centro cor="#1b5e20"><div style={{ color: "#fff" }}><Avatar letra="P" cor="#42A5F5" tam={200} />
        <b style={{ fontSize: 44, display: "block", marginTop: 30 }}>Pedro (filho)</b><div style={{ fontSize: 28, opacity: 0.8 }}>número antigo · chamando{".".repeat(1 + Math.floor(t * 2) % 3)}</div>
        <div style={{ fontSize: 120, marginTop: 60 }}>📞</div></div></Centro> },
      { desde: C[4], tela: () => <><Centro cor="#111"><div /></Centro><Aviso desde={C[4] + 0.1} emoji="🚫" titulo="Pix com pressa? Não!" texto="Golpista sempre diz que é urgente." /></> },
    ]}
    ganchos={[{ desde: 0, texto: "Golpe do Pix no WhatsApp 🚨", destaque: ["Golpe"] }, { desde: C[2], texto: "Os 3 sinais do golpe", destaque: ["3", "sinais"] },
      { desde: C[3], texto: "Ligue para o número antigo", destaque: ["Ligue"] }, { desde: C[4], texto: "Nunca Pix com pressa", destaque: ["Nunca"] }]}
    final={{ emoji: "🚨", frase: <>Desconfie<br />sempre.</> }} />;
};
