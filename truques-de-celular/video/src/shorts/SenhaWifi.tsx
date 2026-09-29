import React from "react";
import tempos from "../../public/SenhaWifi/tempos.json";
import { BarraApp, BarraStatus, Chave, Dedo, Linha, Short, VERDE, mola, tela, useT, type Som } from "../kit";
import { TelaInicial, posApp } from "../telas";

const C = tempos.cenas;
const T_AJUSTES = C[1] + 0.6, T_WIFI = C[1] + 1.9, T_ENG = C[2] + 0.6, T_COMP = C[2] + 2.2, T_QR = C[3] - 0.3;

// QR "de mentirinha" (padrão fixo, não aponta pra nada)
const QR: React.FC = () => {
  const n = 25;
  const cel = (i: number, j: number) => {
    const canto = (a: number, b: number) => a < 7 && b < 7 && (a === 0 || a === 6 || b === 0 || b === 6 || (a > 1 && a < 5 && b > 1 && b < 5));
    if (canto(i, j) || canto(n - 1 - i, j) || canto(i, n - 1 - j)) return true;
    if ((i < 8 && j < 8) || (i > n - 9 && j < 8) || (i < 8 && j > n - 9)) return false;
    return ((i * 7 + j * 13 + i * j) % 5) < 2;
  };
  return (
    <div style={{ width: 350, height: 350, background: "#fff", padding: 18, display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, boxShadow: "0 6px 20px rgba(0,0,0,.2)" }}>
      {Array.from({ length: n * n }).map((_, k) => <div key={k} style={{ background: cel(Math.floor(k / n), k % n) ? "#111" : "#fff" }} />)}
    </div>
  );
};

const Tela: React.FC = () => {
  const { frame, fps, t } = useT();
  if (t < T_AJUSTES + 0.2) return <><TelaInicial /><div style={{ position: "absolute", top: 0, width: "100%" }}><BarraStatus cor="transparent" /></div></>;
  if (t < T_WIFI + 0.2) {
    return (
      <>
        <BarraStatus cor="#fff" claro={false} />
        <div style={{ padding: "30px 30px 20px", fontSize: 46, fontWeight: 800, color: "#111" }}>Configurações</div>
        <Linha icone="📶" titulo="Wi-Fi" sub="Casa_5G" destaque={t >= T_WIFI} />
        {[["🔵", "Bluetooth"], ["📱", "Tela"], ["🔋", "Bateria"], ["🔔", "Sons e vibração"], ["🔒", "Segurança"]].map(([e, n]) => <Linha key={n} icone={e} titulo={n} />)}
      </>
    );
  }
  if (t < T_COMP + 0.2) {
    const detalhe = t >= T_ENG + 0.2;
    return (
      <>
        <BarraStatus cor="#fff" claro={false} />
        <BarraApp titulo={detalhe ? "Casa_5G" : "Wi-Fi"} cor="#fff" esquerda={<span style={{ fontSize: 36, color: "#111" }}>←</span>} />
        {!detalhe ? (
          <>
            <Linha titulo="Usar Wi-Fi" direita={<Chave ligada={1} />} />
            <Linha icone="📶" titulo="Casa_5G" sub="Conectado" direita={<span style={{ fontSize: 40 }}>⚙️</span>} destaque={t >= T_ENG} />
            <Linha icone="📶" titulo="Vizinho_2G" sub="Protegida 🔒" />
            <Linha icone="📶" titulo="Padaria_Visitantes" sub="Protegida 🔒" />
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "50px 20px" }}>
            <div style={{ fontSize: 120 }}>📶</div>
            <div style={{ fontSize: 40, fontWeight: 800, color: "#111" }}>Casa_5G</div>
            <div style={{ fontSize: 26, color: VERDE }}>Conectado</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 70, marginTop: 70, fontSize: 26, color: "#1a73e8", fontWeight: 700 }}>
              <div style={{ padding: 16, borderRadius: 20, background: t >= T_COMP ? "#e8f0fe" : "transparent" }}><div style={{ fontSize: 56 }}>🔳</div>Compartilhar</div>
              <div style={{ padding: 16 }}><div style={{ fontSize: 56 }}>🗑️</div>Esquecer</div>
            </div>
          </div>
        )}
      </>
    );
  }
  const q = mola(frame, T_COMP + 0.2, fps, 12);
  return (
    <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
      <BarraStatus cor="#fff" claro={false} />
      <div style={{ textAlign: "center", padding: "40px 30px" }}>
        <div style={{ fontSize: 40, fontWeight: 800, color: "#111" }}>Compartilhar Wi-Fi</div>
        <div style={{ fontSize: 26, color: "#555", marginTop: 8 }}>Aponte a câmera para este código</div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 50, transform: `scale(${q})` }}><QR /></div>
        <div style={{ fontSize: 28, color: "#111", marginTop: 40 }}>Rede: <b>Casa_5G</b></div>
      </div>
    </div>
  );
};

// Celular da visita chegando e lendo o código
const Visita: React.FC = () => {
  const { frame, fps, t } = useT();
  if (t < C[4] || t > C[5]) return null;
  const e = mola(frame, C[4], fps, 14);
  const ok = t >= C[4] + 1.6;
  return (
    <div style={{ position: "absolute", left: 640 + (1 - e) * 500, top: 1050, transform: "rotate(-14deg)", zIndex: 6 }}>
      <div style={{ width: 230, height: 440, borderRadius: 36, background: "#111", padding: 10 }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 28, background: ok ? "#e8f5e9" : "#333", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", color: ok ? "#111" : "#fff", fontSize: 24, textAlign: "center", padding: 14 }}>
          {ok ? <><div style={{ fontSize: 70 }}>✅</div><b>Conectado</b>Casa_5G</> : <><div style={{ fontSize: 60 }}>📷</div>Lendo código...</>}
        </div>
      </div>
    </div>
  );
};

const aj = posApp(3), ajustes = tela(aj.x, aj.y), wifi = tela(295, 50 + 130 + 56), eng = tela(520, 180 + 112 + 56), comp = tela(225, 180 + 50 + 330 + 70 + 60);
export const SenhaWifi: React.FC = () => (
  <Short
    id="SenhaWifi" tempos={tempos}
    ganchos={[
      { desde: 0, texto: "Esqueceu a senha do Wi-Fi?", destaque: ["Wi-Fi?"] },
      { desde: C[1], texto: "Compartilhe com QR code", destaque: ["QR"] },
      { desde: C[4], texto: "Conecta sem digitar nada", destaque: ["sem"] },
    ]}
    cam={[{ t: 0, s: 1, x: 540, y: 920 }, { t: C[3] - 0.2, s: 1, x: 540, y: 920 }, { t: C[3] + 0.4, s: 1.3, x: 540, y: tela(0, 450).y },
      { t: C[4] - 0.1, s: 1.3, x: 540, y: tela(0, 450).y }, { t: C[4] + 0.5, s: 1.05, x: 640, y: 1000 }, { t: C[5], s: 1.05, x: 640, y: 1000 }]}
    sobre={<><Visita /><Dedo some={T_COMP + 0.4} passos={[{ t: T_AJUSTES, x: ajustes.x, y: ajustes.y, acao: "toque" }, { t: T_WIFI, x: wifi.x, y: wifi.y, acao: "toque" },
      { t: T_ENG, x: eng.x, y: eng.y, acao: "toque" }, { t: T_COMP, x: comp.x, y: comp.y, acao: "toque" }]} /></>}
    sons={[T_AJUSTES, T_WIFI, T_ENG, T_COMP] .map((x): Som => ({ t: x, som: "clique" })).concat([{ t: T_QR, som: "pop" as const }, { t: C[4] + 1.6, som: "pop" as const }])}
    tela={<Tela />}
    final={{ emoji: "📶", frase: <>Wi-Fi sem<br />ditar senha.</> }}
  />
);
