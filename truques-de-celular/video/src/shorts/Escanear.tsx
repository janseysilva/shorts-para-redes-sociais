import React from "react";
import { interpolate } from "remotion";
import tempos from "../../public/Escanear/tempos.json";
import { BarraStatus, Dedo, Linha, Short, VERDE, mola, tela, useT } from "../kit";

const C = tempos.cenas;
const T_MAIS = C[1] + 1.2;
const T_DIGIT = C[2] + 0.4;
const T_CAMERA = C[2] + 0.7;
const T_FOTO = C[2] + 2.3;
const T_CORTE = C[3] + 0.2;
const T_SALVAR = C[4] + 0.6;
const T_LISTA = C[4] + 0.9;

/** Folha de papel com texto (serve pra foto torta e pra folha endireitada). */
const Folha: React.FC<{ estilo?: React.CSSProperties }> = ({ estilo }) => (
  <div style={{ width: 360, height: 480, background: "#fffdf7", borderRadius: 6, padding: "40px 34px", boxShadow: "0 10px 30px rgba(0,0,0,.4)", ...estilo }}>
    <div style={{ fontSize: 30, fontWeight: 900, color: "#222", textAlign: "center", marginBottom: 26 }}>COMPROVANTE</div>
    {[92, 80, 95, 70, 88, 60, 90, 75].map((w, i) => (
      <div key={i} style={{ height: 12, width: `${w}%`, background: "#c9c9c9", borderRadius: 6, marginBottom: 20 }} />
    ))}
    <div style={{ marginTop: 30, borderTop: "2px solid #999", width: "60%", marginLeft: "20%" }} />
  </div>
);

const ARQUIVOS: [string, string, string][] = [["📁", "Fotos", "Pasta"], ["📄", "Currículo.pdf", "Modificado ontem"], ["📊", "Gastos do mês", "Modificado 12 set."], ["📄", "Boleto.pdf", "Modificado 5 set."]];

const Drive: React.FC<{ novo?: number }> = ({ novo = 0 }) => (
  <>
    <BarraStatus cor="#fff" claro={false} />
    <div style={{ margin: "10px 22px", height: 80, borderRadius: 40, background: "#eef2f7", display: "flex", alignItems: "center", padding: "0 28px", fontSize: 28, color: "#555" }}>
      🔍 Pesquisar no Drive</div>
    <div style={{ padding: "20px 28px 6px", fontSize: 34, fontWeight: 700, color: "#111" }}>Meu Drive</div>
    {novo > 0 && (
      <div style={{ transform: `scale(${novo})`, transformOrigin: "left" }}>
        <Linha icone="📕" titulo="Comprovante digitalizado.pdf" sub="Agora mesmo" destaque />
      </div>
    )}
    {ARQUIVOS.map(([i, n, s]) => <Linha key={n} icone={i} titulo={n} sub={s} />)}
  </>
);

const Tela: React.FC = () => {
  const { frame, fps, t } = useT();
  if (t < T_CAMERA) {
    const menu = t >= T_MAIS ? mola(frame, T_MAIS, fps, 14) : 0;
    return (
      <>
        <Drive />
        <div style={{ position: "absolute", right: 34, bottom: 60, width: 130, height: 130, borderRadius: 36, background: "#fff",
          boxShadow: "0 8px 20px rgba(0,0,0,.3)", fontSize: 80, display: "flex", alignItems: "center", justifyContent: "center",
          color: "#1a73e8" }}>+</div>
        {menu > 0 && (
          <div style={{ position: "absolute", inset: 0, background: `rgba(0,0,0,${0.4 * menu})` }}>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 420, background: "#fff", borderRadius: "34px 34px 0 0",
              transform: `translateY(${(1 - menu) * 420}px)`, padding: "40px 30px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
              {[["📁", "Pasta"], ["⬆️", "Upload"], ["📷", "Digitalizar"], ["📝", "Documento"]].map(([e, n]) => (
                <div key={n} style={{ textAlign: "center", padding: 16, borderRadius: 22,
                  background: n === "Digitalizar" && t >= T_DIGIT ? "#e8f0fe" : "transparent" }}>
                  <div style={{ fontSize: 60 }}>{e}</div><div style={{ fontSize: 28, color: "#222" }}>{n}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
  if (t < T_CORTE) {
    const flash = t >= T_FOTO && t < T_FOTO + 0.35 ? 1 - (t - T_FOTO) / 0.35 : 0;
    return (
      <div style={{ position: "absolute", inset: 0, background: "#6d5a45" }}>
        <div style={{ position: "absolute", left: 115, top: 230, transform: "perspective(900px) rotateX(28deg) rotateZ(-14deg) scale(.9)" }}>
          <Folha estilo={{ outline: t >= T_CAMERA + 0.8 ? "6px solid #4285F4" : "none", outlineOffset: 4 }} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 200, background: "rgba(0,0,0,.6)" }} />
        <div style={{ position: "absolute", left: 245, bottom: 50, width: 100, height: 100, borderRadius: 50, background: "#fff",
          border: "8px solid #bbb", transform: `scale(${flash > 0 ? 0.85 : 1})` }} />
        <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: flash }} />
      </div>
    );
  }
  if (t < T_LISTA) {
    const reta = interpolate(t, [T_CORTE + 0.2, T_CORTE + 1.8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <div style={{ position: "absolute", inset: 0, background: "#202124" }}>
        <div style={{ height: 50 }} />
        <div style={{ color: "#fff", fontSize: 30, padding: "30px 30px", fontWeight: 700 }}>Cortar e ajustar</div>
        <div style={{ position: "absolute", left: 115, top: 260,
          transform: `perspective(900px) rotateX(${28 * (1 - reta)}deg) rotateZ(${-14 * (1 - reta)}deg) scale(${0.9 + 0.1 * reta})` }}>
          <Folha />
          {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([a, b], i) => (
            <div key={i} style={{ position: "absolute", left: a * 360 - 16, top: b * 480 - 16, width: 32, height: 32, borderRadius: 16, background: "#4285F4", border: "4px solid #fff" }} />
          ))}
        </div>
        <div style={{ position: "absolute", right: 30, bottom: 50, background: "#8ab4f8", color: "#111", fontSize: 32, fontWeight: 800,
          borderRadius: 40, padding: "20px 44px", transform: `scale(${t >= T_SALVAR && t < T_SALVAR + 0.3 ? 0.9 : 1})` }}>Salvar</div>
      </div>
    );
  }
  return <Drive novo={mola(frame, T_LISTA + 0.2, fps, 10)} />;
};

const mais = tela(490, 995);
const digit = tela(160, 1120 - 420 + 40 + 190 + 60);
const disparo = tela(295, 1120 - 100);
const salvar = tela(470, 1120 - 90);

// Papel de verdade aparecendo ao lado no começo
const Papel: React.FC = () => {
  const { frame, fps, t } = useT();
  if (t > C[1] + 0.6) return null;
  const e = mola(frame, 0.2, fps, 12);
  const sai = t > C[1] ? (t - C[1]) / 0.6 : 0;
  return (
    <div style={{ position: "absolute", left: 600, top: 860, transform: `rotate(${14 - sai * 30}deg) translateX(${(1 - e) * 600 + sai * 700}px)`, zIndex: 5 }}>
      <Folha />
    </div>
  );
};

export const Escanear: React.FC = () => (
  <Short
    id="Escanear" tempos={tempos}
    ganchos={[
      { desde: 0, texto: "Sem scanner em casa?", destaque: ["scanner"] },
      { desde: C[1], texto: "Use a câmera do celular", destaque: ["câmera"] },
      { desde: C[4], texto: "Virou PDF na hora", destaque: ["PDF"] },
    ]}
    cam={[
      { t: 0, s: 1, x: 540, y: 920 }, { t: C[1] + 0.4, s: 1, x: 540, y: 920 },
      { t: C[1] + 1.0, s: 1.45, x: mais.x - 150, y: mais.y - 250 }, { t: T_CAMERA - 0.1, s: 1.45, x: mais.x - 150, y: mais.y - 250 },
      { t: T_CAMERA + 0.4, s: 1.15, x: 540, y: 960 }, { t: C[4] + 1.2, s: 1.15, x: 540, y: 960 },
      { t: C[4] + 1.8, s: 1.4, x: 540, y: tela(0, 330).y }, { t: C[5] - 0.2, s: 1.4, x: 540, y: tela(0, 330).y },
      { t: C[5], s: 1, x: 540, y: 920 },
    ]}
    sobre={<><Papel /><Dedo some={T_SALVAR + 0.4} passos={[
      { t: T_MAIS, x: mais.x, y: mais.y, acao: "toque" },
      { t: T_DIGIT, x: digit.x, y: digit.y, acao: "toque" },
      { t: T_FOTO, x: disparo.x, y: disparo.y, acao: "toque" },
      { t: T_SALVAR, x: salvar.x, y: salvar.y, acao: "toque" },
    ]} /></>}
    sons={[{ t: T_MAIS, som: "clique" }, { t: T_DIGIT, som: "clique" }, { t: T_FOTO, som: "clique", vol: 1 }, { t: T_CORTE + 0.2, som: "whoosh", vol: 0.5 },
      { t: T_SALVAR, som: "clique" }, { t: T_LISTA + 0.2, som: "pop" }]}
    tela={<Tela />}
    final={{ emoji: "📄", frase: <>Scanner no<br />seu bolso.</> }}
  />
);
