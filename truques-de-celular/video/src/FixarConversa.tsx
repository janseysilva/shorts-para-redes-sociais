import React from "react";
import {
  AbsoluteFill, Audio, Easing, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import tempos from "../public/tempos.json";
import { Legenda } from "./Legenda";

const C = tempos.cenas; // início (s) de cada frase do roteiro
const FONTE = "Segoe UI, Arial, sans-serif";
const VERDE = "#25D366";

// Tela do celular (coordenadas do "mundo", antes da câmera)
const TELA = { x: 245, y: 360, w: 590, h: 1120 };
const TOPO_LISTA = 190;
const LINHA = 116;

const CONVERSAS = [
  { nome: "Grupo da Família", msg: "📷 Foto", hora: "10:42", cor: "#7C4DFF" },
  { nome: "Trabalho", msg: "Reunião às 14h", hora: "10:30", cor: "#FF7043" },
  { nome: "João", msg: "Beleza, combinado!", hora: "09:58", cor: "#29B6F6" },
  { nome: "Academia", msg: "Aula cancelada hoje", hora: "09:15", cor: "#66BB6A" },
  { nome: "Mãe", msg: "Me liga quando puder ❤️", hora: "08:47", cor: "#EC407A" },
  { nome: "Condomínio", msg: "Aviso: falta de água", hora: "08:10", cor: "#8D6E63" },
  { nome: "Ana Paula", msg: "kkkkkk", hora: "Ontem", cor: "#FFA726" },
  { nome: "Pizzaria", msg: "Seu pedido saiu 🍕", hora: "Ontem", cor: "#EF5350" },
];
const ALVO = 4; // Mãe

// Momentos-chave (s)
const T_SEGURA = C[1] + 0.7;
const T_SELECIONA = C[1] + 1.5;
const T_TOQUE_PIN = C[2] + 1.0;
const T_SOBE = T_TOQUE_PIN + 0.25;
const T_PIN2 = C[4] + 0.4;
const T_PIN3 = C[4] + 1.2;
const T_FIM = C[5];

// No começo, mensagens novas chegam e empurram a conversa da Mãe para baixo
const EVENTOS: { t: number; ordem: number[] }[] = [
  { t: 0, ordem: [4, 1, 0, 2, 3, 5, 6, 7] },
  { t: 0.9, ordem: [0, 4, 1, 2, 3, 5, 6, 7] },
  { t: 1.6, ordem: [2, 0, 4, 1, 3, 5, 6, 7] },
  { t: 2.3, ordem: [3, 2, 0, 4, 1, 5, 6, 7] },
  { t: 3.0, ordem: [1, 3, 2, 0, 4, 5, 6, 7] },
  { t: T_SOBE, ordem: [4, 1, 3, 2, 0, 5, 6, 7] },
  { t: T_PIN2, ordem: [4, 1, 3, 2, 0, 5, 6, 7] },
  { t: T_PIN3, ordem: [4, 1, 2, 3, 0, 5, 6, 7] },
];
const CHEGADAS = [{ t: 0.9, id: 0 }, { t: 1.6, id: 2 }, { t: 2.3, id: 3 }, { t: 3.0, id: 1 }];
const FIXADAS = [{ t: T_SOBE, id: 4 }, { t: T_PIN2, id: 1 }, { t: T_PIN3, id: 2 }];

const linhaCentro = (i: number) => ({ x: TELA.x + TELA.w / 2, y: TELA.y + TOPO_LISTA + i * LINHA + LINHA / 2 });
const PIN_BTN = { x: TELA.x + 400, y: TELA.y + 120 };

// Câmera: zoom (s) e ponto de foco (fx, fy) ao longo do tempo
const CAM = [
  { t: 0, s: 1, fx: 540, fy: 920 },
  { t: C[1] - 0.1, s: 1, fx: 540, fy: 920 },
  { t: C[1] + 0.7, s: 1.75, fx: linhaCentro(ALVO).x, fy: linhaCentro(ALVO).y },
  { t: C[2] + 0.1, s: 1.75, fx: linhaCentro(ALVO).x, fy: linhaCentro(ALVO).y },
  { t: C[2] + 0.8, s: 1.9, fx: PIN_BTN.x, fy: PIN_BTN.y + 120 },
  { t: T_SOBE + 0.1, s: 1.9, fx: PIN_BTN.x, fy: PIN_BTN.y + 120 },
  { t: T_SOBE + 0.9, s: 1.25, fx: 540, fy: TELA.y + 420 },
  { t: C[4], s: 1.25, fx: 540, fy: TELA.y + 420 },
  { t: C[4] + 0.6, s: 1, fx: 540, fy: 920 },
];
const camera = (t: number) => {
  const ts = CAM.map((k) => k.t);
  const o = { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  return {
    s: interpolate(t, ts, CAM.map((k) => k.s), o),
    fx: interpolate(t, ts, CAM.map((k) => k.fx), o),
    fy: interpolate(t, ts, CAM.map((k) => k.fy), o),
  };
};

const Avatar: React.FC<{ letra: string; cor: string; marcado: boolean }> = ({ letra, cor, marcado }) => (
  <div style={{ position: "relative", width: 78, height: 78, flex: "none" }}>
    <div style={{ width: 78, height: 78, borderRadius: 39, background: cor, color: "#fff", fontWeight: 700,
      fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>{letra}</div>
    {marcado && (
      <div style={{ position: "absolute", right: -4, bottom: -4, width: 34, height: 34, borderRadius: 17,
        background: VERDE, border: "3px solid #fff", color: "#fff", fontSize: 20, fontWeight: 900,
        display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>
    )}
  </div>
);

// Fundo com bolhas coloridas e ícones flutuando
const Fundo: React.FC<{ t: number }> = ({ t }) => {
  const icones = ["💬", "📱", "🔔", "📌", "❤️", "✨"];
  return (
    <AbsoluteFill style={{ background: "linear-gradient(160deg, #0b3d33 0%, #0d1512 55%, #1b1230 100%)", overflow: "hidden" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", width: 700, height: 700, borderRadius: 350, filter: "blur(90px)",
          opacity: 0.35, background: ["#25D366", "#7C4DFF", "#FF7043"][i],
          left: 540 - 350 + Math.sin(t * 0.6 + i * 2) * 380, top: 900 - 350 + Math.cos(t * 0.5 + i * 2.5) * 600 }} />
      ))}
      {icones.map((ic, i) => (
        <div key={i} style={{ position: "absolute", fontSize: 70, opacity: 0.18,
          left: ((i * 190 + t * 40) % 1180) - 80, top: 200 + ((i * 331) % 1500) + Math.sin(t * 1.5 + i) * 40,
          transform: `rotate(${Math.sin(t + i) * 20}deg)` }}>{ic}</div>
      ))}
    </AbsoluteFill>
  );
};

// Título de cima: cada palavra entra pulando
const Gancho: React.FC<{ texto: string; destaque: string[]; desde: number }> = ({ texto, destaque, desde }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", top: 50, left: 0, right: 0, height: 290, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ maxWidth: 1000, display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: 24,
      background: "rgba(0,0,0,.6)", borderRadius: 32, padding: "18px 30px" }}>
      {texto.split(" ").map((p, i) => {
        const s = spring({ frame: frame - Math.round(desde * fps) - i * 3, fps, config: { damping: 9, stiffness: 160 } });
        const hl = destaque.includes(p);
        return (
          <span key={i} style={{ display: "inline-block", fontFamily: FONTE, fontWeight: 900, fontSize: 82, lineHeight: 1.12,
            color: hl ? "#111" : "#fff", background: hl ? VERDE : "transparent", borderRadius: 14, padding: hl ? "0 14px" : 0,
            transform: `translateY(${(1 - s) * 60}px) scale(${s}) rotate(${(1 - s) * -12}deg)`, opacity: Math.min(1, s * 2),
            textShadow: hl ? "none" : "0 6px 0 rgba(0,0,0,.45)" }}>{p}</span>
        );
      })}
    </div>
    </div>
  );
};

export const FixarConversa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const f = (s: number) => Math.round(s * fps);

  // posição de cada conversa na lista (mola entre a ordem anterior e a atual)
  const idx = EVENTOS.length - 1 - [...EVENTOS].reverse().findIndex((e) => t >= e.t);
  const ev = EVENTOS[idx];
  const anterior = EVENTOS[Math.max(0, idx - 1)];
  const mola = idx === 0 ? 1 : spring({ frame: frame - f(ev.t), fps, config: { damping: 13, stiffness: 140 } });
  const yDe = (id: number) => interpolate(mola, [0, 1], [anterior.ordem.indexOf(id) * LINHA, ev.ordem.indexOf(id) * LINHA]);

  const selecionando = t >= T_SELECIONA && t < T_SOBE;
  const fixada = (id: number) => FIXADAS.some((x) => x.id === id && t >= x.t);

  // entrada do celular (sobe girando) + balanço 3D suave
  const entrada = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
  const giro = interpolate(entrada, [0, 1], [35, 0]) + Math.sin(t * 1.3) * 4;
  const inclina = Math.cos(t * 1.1) * 3;

  // tremidinha no momento de fixar
  const tremor = t > T_SOBE && t < T_SOBE + 0.35 ? Math.sin(t * 90) * 10 * (1 - (t - T_SOBE) / 0.35) : 0;

  const cam = camera(t);
  const mundo = `translate(${540 - cam.fx * cam.s + tremor}px, ${960 - cam.fy * cam.s}px) scale(${cam.s})`;

  // dedo
  const alvo = linhaCentro(ALVO);
  const ida1 = spring({ frame: frame - f(C[1]), fps, config: { damping: 18 } });
  const ida2 = spring({ frame: frame - f(C[2] + 0.2), fps, config: { damping: 18 } });
  let dx = interpolate(ida1, [0, 1], [TELA.x + 560, alvo.x]);
  let dy = interpolate(ida1, [0, 1], [TELA.y + TELA.h + 80, alvo.y]);
  if (t >= C[2] + 0.2) {
    dx = interpolate(ida2, [0, 1], [alvo.x, PIN_BTN.x]);
    dy = interpolate(ida2, [0, 1], [alvo.y, PIN_BTN.y]);
  }
  const dedoVisivel = t >= C[1] && t < T_SOBE + 0.4;
  const segurando = t >= T_SEGURA && t < T_SELECIONA;
  const anel = segurando ? interpolate(t, [T_SEGURA, T_SELECIONA], [0, 1]) : 0;
  const tocando = t >= T_TOQUE_PIN && t < T_TOQUE_PIN + 0.3;

  const ganchos = [
    { desde: 0, ate: C[1], texto: "Conversa importante sumindo?", destaque: ["sumindo?"] },
    { desde: C[1], ate: C[4], texto: "Fixe no topo do WhatsApp", destaque: ["topo"] },
    { desde: C[4], ate: 99, texto: "Até 3 conversas fixadas", destaque: ["3"] },
  ];
  const g = ganchos.find((x) => t >= x.desde && t < x.ate)!;

  const fim = spring({ frame: frame - f(T_FIM), fps, config: { damping: 12 } });
  const raio = interpolate(fim, [0, 1], [0, 1400]);

  return (
    <AbsoluteFill style={{ fontFamily: FONTE, overflow: "hidden" }}>
      <Audio src={staticFile("narracao.mp3")} />
      <Audio src={staticFile("musica.wav")} volume={0.13} />
      {[C[1] - 0.1, C[2] + 0.15, T_SOBE + 0.1].map((s, i) => (
        <Sequence key={`w${i}`} from={f(s)} durationInFrames={20}><Audio src={staticFile("whoosh.wav")} volume={0.5} /></Sequence>
      ))}
      {CHEGADAS.map((c) => (
        <Sequence key={`c${c.id}`} from={f(c.t)} durationInFrames={10}><Audio src={staticFile("clique.wav")} volume={0.6} /></Sequence>
      ))}
      <Sequence from={f(T_TOQUE_PIN)} durationInFrames={10}><Audio src={staticFile("clique.wav")} /></Sequence>
      {FIXADAS.map((x) => (
        <Sequence key={`p${x.id}`} from={f(x.t)} durationInFrames={10}><Audio src={staticFile("pop.wav")} volume={0.8} /></Sequence>
      ))}
      <Sequence from={f(T_FIM)} durationInFrames={40}><Audio src={staticFile("ding.wav")} volume={0.7} /></Sequence>

      <Fundo t={t} />

      {/* mundo com câmera */}
      <AbsoluteFill style={{ transform: mundo, transformOrigin: "0 0" }}>
        <div style={{ position: "absolute", inset: 0, perspective: 1600,
          transform: `translateY(${interpolate(entrada, [0, 1], [1300, 0])}px)` }}>
          <div style={{ position: "absolute", inset: 0, transform: `rotateY(${giro}deg) rotateX(${inclina}deg)`,
            transformOrigin: "540px 920px" }}>
            <div style={{ position: "absolute", left: TELA.x - 22, top: TELA.y - 22, width: TELA.w + 44, height: TELA.h + 44,
              borderRadius: 72, background: "#050505", boxShadow: `0 40px 90px rgba(0,0,0,.65), 0 0 0 3px #2a2a2a, 0 0 60px ${VERDE}55` }} />
            <div style={{ position: "absolute", left: TELA.x, top: TELA.y, width: TELA.w, height: TELA.h, borderRadius: 52,
              overflow: "hidden", background: "#fff" }}>
              <div style={{ height: 50, background: selecionando ? "#0b3d33" : "#075E54", color: "#fff", fontSize: 22,
                display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 34px" }}>
                <span>9:41</span><span>▂▄▆ 🔋</span>
              </div>
              <div style={{ height: 140, background: selecionando ? "#0b3d33" : "#075E54", color: "#fff",
                display: "flex", alignItems: "center", padding: "0 30px", gap: 26 }}>
                {selecionando ? (
                  <>
                    <span style={{ fontSize: 40 }}>←</span>
                    <span style={{ fontSize: 38, fontWeight: 700, flex: 1 }}>1</span>
                    <span style={{ fontSize: 40, padding: 8, borderRadius: 40,
                      background: tocando ? "rgba(255,255,255,.45)" : "transparent",
                      transform: `scale(${tocando ? 1.25 : 1})` }}>📌</span>
                    <span style={{ fontSize: 38 }}>🔇</span>
                    <span style={{ fontSize: 38 }}>🗑️</span>
                  </>
                ) : (
                  <span style={{ fontSize: 44, fontWeight: 700 }}>Conversas</span>
                )}
              </div>
              {CONVERSAS.map((c, id) => {
                const sel = selecionando && id === ALVO;
                const pin = FIXADAS.find((x) => x.id === id);
                const pinPop = pin && t >= pin.t ? spring({ frame: frame - f(pin.t), fps, config: { damping: 7 } }) : 0;
                const chegou = CHEGADAS.find((x) => x.id === id && t >= x.t && t < C[1]);
                const badge = chegou ? spring({ frame: frame - f(chegou.t), fps, config: { damping: 8 } }) : 0;
                const brilho = pin && t >= pin.t && t < pin.t + 0.8 ? 1 - (t - pin.t) / 0.8 : 0;
                return (
                  <div key={id} style={{ position: "absolute", left: 0, right: 0, top: TOPO_LISTA + yDe(id), height: LINHA,
                    display: "flex", alignItems: "center", gap: 22, padding: "0 26px",
                    background: sel ? "#d9fdd3" : brilho > 0 ? `rgba(37,211,102,${brilho * 0.35})` : "#fff",
                    borderBottom: "1px solid #eee" }}>
                    <Avatar letra={c.nome[0]} cor={c.cor} marcado={sel} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 32, fontWeight: 700, color: "#111" }}>{c.nome}</div>
                      <div style={{ fontSize: 26, color: "#667", whiteSpace: "nowrap", overflow: "hidden" }}>{c.msg}</div>
                    </div>
                    <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                      <div style={{ fontSize: 22, color: badge ? VERDE : "#667" }}>{c.hora}</div>
                      <div style={{ height: 36, display: "flex", gap: 6, alignItems: "center" }}>
                        {pinPop > 0 && <span style={{ fontSize: 28, transform: `scale(${pinPop}) rotate(${(1 - pinPop) * 90}deg)` }}>📌</span>}
                        {badge > 0 && (
                          <span style={{ minWidth: 34, height: 34, borderRadius: 17, background: VERDE, color: "#fff", fontSize: 20,
                            fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center",
                            transform: `scale(${badge})` }}>{1 + (id % 3)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* dedo */}
            {dedoVisivel && (
              <>
                {segurando && (
                  <div style={{ position: "absolute", left: dx - 70, top: dy - 70, width: 140, height: 140, borderRadius: 70,
                    border: "7px solid #FFD43B", opacity: 1 - anel * 0.3, transform: `scale(${0.5 + anel * 0.8})` }} />
                )}
                {tocando && (
                  <div style={{ position: "absolute", left: dx - 80, top: dy - 80, width: 160, height: 160, borderRadius: 80,
                    background: "rgba(255,212,59,.35)", transform: `scale(${(t - T_TOQUE_PIN) / 0.3 + 0.4})` }} />
                )}
                <div style={{ position: "absolute", left: dx - 38, top: dy - 38, width: 76, height: 76, borderRadius: 38,
                  background: "rgba(255,255,255,.6)", border: "4px solid #fff",
                  transform: `scale(${segurando || tocando ? 0.8 : 1})`, boxShadow: "0 8px 20px rgba(0,0,0,.35)" }} />
              </>
            )}
          </div>
        </div>
      </AbsoluteFill>

      <Gancho key={g.texto} texto={g.texto} destaque={g.destaque} desde={g.desde} />

      {/* barra de progresso */}
      <div style={{ position: "absolute", top: 0, left: 0, height: 14, width: `${(frame / durationInFrames) * 100}%`,
        background: `linear-gradient(90deg, ${VERDE}, #FFD43B)` }} />

      {/* cartão final: revela em círculo */}
      {t >= T_FIM && (
        <AbsoluteFill style={{ clipPath: `circle(${raio}px at 540px 960px)`,
          background: "linear-gradient(160deg, #075E54, #0d1512 70%)", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center", color: "#fff", padding: 80 }}>
          <div style={{ fontSize: 150, transform: `rotate(${Math.sin(t * 6) * 12}deg) scale(${fim})` }}>📌</div>
          <div style={{ fontSize: 88, fontWeight: 900, lineHeight: 1.1 }}>Conversa<br />sempre no topo.</div>
          <div style={{ fontSize: 58, fontWeight: 800, color: "#111", background: "#FFD43B", borderRadius: 18,
            padding: "10px 30px", marginTop: 60, transform: `scale(${1 + Math.sin(t * 8) * 0.04})` }}>Salva esse vídeo</div>
          <div style={{ fontSize: 42, color: "#cfe", marginTop: 30 }}>Segue para mais dicas de celular</div>
        </AbsoluteFill>
      )}

      <Legenda palavras={tempos.palavras} cenas={tempos.cenas} />
    </AbsoluteFill>
  );
};
