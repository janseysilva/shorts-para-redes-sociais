import React from "react";
import tempos from "../../public/AcharCelular/tempos.json";
import { BarraStatus, Dedo, Digitando, Short, mola, tela, useT } from "../kit";
import { Teclado } from "../telas";

const C = tempos.cenas;
const T_DIGITA = C[1] + 0.8, T_LOGIN = C[2], T_EMAIL = C[2] + 0.5, T_PROX = C[2] + 2.6, T_MAPA = C[3], T_SOM = C[3] + 1.6;

const Endereco: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <BarraStatus cor="#f1f3f4" claro={false} />
    <div style={{ height: 110, background: "#f1f3f4", display: "flex", alignItems: "center", padding: "0 22px" }}>
      <div style={{ flex: 1, height: 72, borderRadius: 36, background: "#fff", border: "1px solid #ddd", display: "flex", alignItems: "center",
        padding: "0 24px", fontSize: 28, color: "#222" }}>{children}</div>
    </div>
  </>
);

const Mapa: React.FC = () => {
  const { t } = useT();
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 160, height: 560, background: "#e8f0e3", overflow: "hidden" }}>
      {[[0, 140, 590, 26], [0, 360, 590, 20], [180, 0, 24, 560], [420, 0, 30, 560]].map(([x, y, w, h], i) => (
        <div key={i} style={{ position: "absolute", left: x, top: y, width: w, height: h, background: "#fff" }} />
      ))}
      <div style={{ position: "absolute", left: 250, top: 190, width: 140, height: 110, background: "#cfe3c4", borderRadius: 14 }} />
      <div style={{ position: "absolute", left: 318 - 60, top: 250 - 60, width: 120, height: 120, borderRadius: 60, background: "rgba(66,133,244,.2)",
        transform: `scale(${1 + (t * 1.5) % 1})`, opacity: 1 - ((t * 1.5) % 1) }} />
      <div style={{ position: "absolute", left: 318 - 26, top: 250 - 60, fontSize: 60 }}>📍</div>
    </div>
  );
};

const Tela: React.FC = () => {
  const { frame, fps, t } = useT();
  if (t < C[1]) {
    return (
      <div style={{ position: "absolute", inset: 0, background: "#1b1b1f", color: "#fff", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 20 }}>
        <div style={{ fontSize: 150, transform: `rotate(${Math.sin(t * 5) * 10}deg)` }}>🔍</div>
        <div style={{ fontSize: 40, fontWeight: 800 }}>Cadê o celular?</div>
        <div style={{ fontSize: 28, color: "#aaa" }}>Sofá? Bolsa? Carro?</div>
      </div>
    );
  }
  if (t < T_LOGIN) {
    return (
      <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
        <Endereco>{t >= T_DIGITA ? <Digitando texto="android.com/find" desde={T_DIGITA} cps={6} /> : <span style={{ color: "#888" }}>Pesquisar ou digitar endereço</span>}</Endereco>
        <Teclado sobe={mola(frame, C[1] + 0.3, fps, 16)} />
      </div>
    );
  }
  if (t < T_MAPA) {
    return (
      <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
        <Endereco>🔒 accounts.google.com</Endereco>
        <div style={{ padding: "60px 50px" }}>
          <div style={{ fontSize: 60, fontWeight: 800, color: "#4285F4" }}>G</div>
          <div style={{ fontSize: 44, color: "#111", marginTop: 10 }}>Fazer login</div>
          <div style={{ fontSize: 26, color: "#555", marginTop: 8 }}>Use a mesma conta do celular perdido</div>
          <div style={{ marginTop: 50, border: "3px solid #1a73e8", borderRadius: 12, padding: "22px 20px", fontSize: 30, color: "#111" }}>
            {t >= T_EMAIL ? <Digitando texto="seunome@gmail.com" desde={T_EMAIL} cps={10} /> : <span style={{ color: "#888" }}>E-mail ou telefone</span>}
          </div>
          <div style={{ marginTop: 60, display: "flex", justifyContent: "flex-end" }}>
            <div style={{ background: "#1a73e8", color: "#fff", fontSize: 30, fontWeight: 700, borderRadius: 30, padding: "18px 40px",
              transform: `scale(${t >= T_PROX && t < T_PROX + 0.3 ? 0.9 : 1})` }}>Próxima</div>
          </div>
        </div>
      </div>
    );
  }
  const tocando = t >= T_SOM;
  return (
    <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
      <Endereco>🔒 android.com/find</Endereco>
      <Mapa />
      <div style={{ position: "absolute", left: 0, right: 0, top: 720, bottom: 0, padding: "26px 30px" }}>
        <div style={{ fontSize: 34, fontWeight: 800, color: "#111" }}>📱 Meu celular</div>
        <div style={{ fontSize: 24, color: "#667" }}>Visto agora · 🔋 62%</div>
        {[["🔊", "Tocar som"], ["🔒", "Proteger dispositivo"], ["🧹", "Excluir dados"]].map(([e, n], i) => (
          <div key={n} style={{ marginTop: 16, padding: "18px 20px", borderRadius: 18, fontSize: 28, fontWeight: 600, color: "#111",
            background: i === 0 && tocando ? "#fff3c4" : "#f1f3f4" }}>{e} {i === 0 && tocando ? "Tocando..." : n}</div>
        ))}
      </div>
    </div>
  );
};

// Celular perdido (fora da tela) tocando quando aciona o som
const Perdido: React.FC = () => {
  const { t } = useT();
  if (t < T_SOM || t > C[5]) return null;
  const tr = Math.sin(t * 50) * 8;
  return (
    <div style={{ position: "absolute", left: 800, top: 1180, transform: `rotate(${-12 + tr}deg)`, zIndex: 5 }}>
      <div style={{ width: 150, height: 290, borderRadius: 26, background: "#111", border: "5px solid #333", display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 70 }}>🔔</div>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 75 - 60 - i * 40, top: 145 - 60 - i * 40, width: 120 + i * 80, height: 120 + i * 80,
          borderRadius: "50%", border: "5px solid rgba(255,212,59,.7)", opacity: 1 - (((t * 2) + i / 3) % 1), transform: `scale(${0.8 + (((t * 2) + i / 3) % 1) * 0.6})` }} />
      ))}
    </div>
  );
};

const campo = tela(295, 105), prox = tela(470, 610), som = tela(200, 720 + 26 + 45 + 36 + 16 + 40);
export const AcharCelular: React.FC = () => (
  <Short
    id="AcharCelular" tempos={tempos}
    ganchos={[
      { desde: 0, texto: "Perdeu o celular? 😰", destaque: ["celular?"] },
      { desde: C[1], texto: "Entre de outro aparelho", destaque: ["outro"] },
      { desde: C[3], texto: "Ele toca até no silencioso", destaque: ["silencioso"] },
      { desde: C[4], texto: "E aparece no mapa", destaque: ["mapa"] },
    ]}
    cam={[{ t: 0, s: 1, x: 540, y: 920 }, { t: C[1], s: 1, x: 540, y: 920 }, { t: C[1] + 0.6, s: 1.5, x: campo.x, y: campo.y + 180 },
      { t: C[2] - 0.2, s: 1.5, x: campo.x, y: campo.y + 180 }, { t: C[2] + 0.3, s: 1.2, x: 540, y: 880 }, { t: C[3] + 0.8, s: 1.2, x: 540, y: 880 },
      { t: C[3] + 1.2, s: 1.35, x: som.x + 80, y: som.y - 60 }, { t: C[4] - 0.2, s: 1.35, x: som.x + 80, y: som.y - 60 },
      { t: C[4] + 0.4, s: 1.6, x: tela(318, 380).x, y: tela(318, 380).y }, { t: C[5] - 0.2, s: 1.6, x: tela(318, 380).x, y: tela(318, 380).y }, { t: C[5], s: 1, x: 540, y: 920 }]}
    sobre={<><Perdido /><Dedo some={T_SOM + 0.4} passos={[{ t: C[1] + 0.3, x: campo.x, y: campo.y, acao: "toque" }, { t: T_PROX, x: prox.x, y: prox.y, acao: "toque" }, { t: T_SOM, x: som.x, y: som.y, acao: "toque" }]} /></>}
    sons={[{ t: C[1] + 0.3, som: "clique" }, { t: T_PROX, som: "clique" }, { t: T_MAPA, som: "whoosh", vol: 0.5 }, { t: T_SOM, som: "clique" },
      { t: T_SOM + 0.2, som: "ding", vol: 0.5 }, { t: T_SOM + 1.2, som: "ding", vol: 0.5 }, { t: T_SOM + 2.2, som: "ding", vol: 0.4 }]}
    tela={<Tela />}
    final={{ emoji: "📍", frase: <>Celular<br />encontrado.</> }}
  />
);
