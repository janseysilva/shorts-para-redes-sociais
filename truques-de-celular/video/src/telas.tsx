// Telas genéricas reaproveitadas (tela inicial, teclado, lista de conversas, conversa aberta).
import React from "react";
import { AMARELO, Avatar, BarraStatus, VERDE } from "./kit";

export const APPS = [
  { e: "💬", c: "#25D366", n: "Mensagens" }, { e: "🌐", c: "#1E88E5", n: "Navegador" }, { e: "📷", c: "#546E7A", n: "Câmera" },
  { e: "⚙️", c: "#78909C", n: "Ajustes" }, { e: "📁", c: "#FFB300", n: "Arquivos" }, { e: "🎵", c: "#E53935", n: "Música" },
  { e: "🗺️", c: "#43A047", n: "Mapas" }, { e: "☁️", c: "#5C6BC0", n: "Drive" }, { e: "📅", c: "#26A69A", n: "Agenda" },
  { e: "🖼️", c: "#EC407A", n: "Galeria" }, { e: "📞", c: "#66BB6A", n: "Telefone" }, { e: "🔦", c: "#8D6E63", n: "Lanterna" },
];
/** Posição (local) do ícone i na tela inicial. */
export const posApp = (i: number) => ({ x: 95 + (i % 4) * 133, y: 420 + Math.floor(i / 4) * 170 });

export const TelaInicial: React.FC<{ escurece?: number }> = ({ escurece = 0 }) => (
  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(170deg, #4a2fbd 0%, #1e88e5 55%, #26c6da 100%)" }}>
    <div style={{ position: "absolute", top: 110, width: "100%", textAlign: "center", color: "#fff" }}>
      <div style={{ fontSize: 120, fontWeight: 300 }}>9:41</div>
      <div style={{ fontSize: 30 }}>terça-feira, 30 de setembro</div>
    </div>
    {APPS.map((a, i) => {
      const p = posApp(i);
      return (
        <div key={i} style={{ position: "absolute", left: p.x - 52, top: p.y - 52, width: 104, textAlign: "center" }}>
          <div style={{ width: 104, height: 104, borderRadius: 28, background: a.c, fontSize: 54, display: "flex",
            alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px rgba(0,0,0,.25)" }}>{a.e}</div>
          <div style={{ color: "#fff", fontSize: 20, marginTop: 6 }}>{a.n}</div>
        </div>
      );
    })}
    <div style={{ position: "absolute", inset: 0, background: "#000", opacity: escurece }} />
  </div>
);

const LINHAS_TECLADO = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
export const Teclado: React.FC<{ sobe: number }> = ({ sobe }) => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 380, background: "#e3e6ea",
    transform: `translateY(${(1 - sobe) * 400}px)`, padding: "18px 8px", display: "flex", flexDirection: "column", gap: 12 }}>
    {LINHAS_TECLADO.map((l, i) => (
      <div key={i} style={{ display: "flex", justifyContent: "center", gap: 7 }}>
        {l.split("").map((k) => (
          <div key={k} style={{ width: 50, height: 66, background: "#fff", borderRadius: 8, fontSize: 28, display: "flex",
            alignItems: "center", justifyContent: "center", color: "#222", boxShadow: "0 2px 0 #b9bec5" }}>{k}</div>
        ))}
      </div>
    ))}
    <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
      <div style={{ width: 90, height: 66, background: "#cfd3d8", borderRadius: 8, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>?123</div>
      <div style={{ width: 300, height: 66, background: "#fff", borderRadius: 8 }} />
      <div style={{ width: 130, height: 66, background: "#1a73e8", color: "#fff", borderRadius: 8, fontSize: 28, fontWeight: 700,
        display: "flex", alignItems: "center", justifyContent: "center" }}>Ir</div>
    </div>
  </div>
);
/** Centro (local) da tecla azul "Ir"/Enviar do teclado. */
export const TECLA_IR = { x: 450, y: 1120 - 18 - 33 };

/** Fundo bege da conversa; o conteúdo vai DENTRO (senão o fundo absoluto cobre os elementos). */
export const FundoConversa: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", inset: 0, background: "#efe7de" }}>{children}</div>
);

export const Balao: React.FC<{ texto: React.ReactNode; minha?: boolean; hora?: string; autor?: string; cor?: string; selecionado?: boolean; estilo?: React.CSSProperties }> = ({
  texto, minha, hora = "09:12", autor, cor = "#EF6C00", selecionado, estilo,
}) => (
  <div style={{ display: "flex", justifyContent: minha ? "flex-end" : "flex-start", padding: "6px 22px",
    background: selecionado ? "rgba(33,150,243,.3)" : "transparent", ...estilo }}>
    <div style={{ maxWidth: 420, background: minha ? "#d9fdd3" : "#fff", borderRadius: 18, padding: "12px 18px",
      boxShadow: "0 1px 1px rgba(0,0,0,.12)", fontSize: 28, color: "#111" }}>
      {autor && <div style={{ fontSize: 22, fontWeight: 700, color: cor }}>{autor}</div>}
      <div>{texto}</div>
      <div style={{ fontSize: 18, color: "#789", textAlign: "right" }}>{hora} {minha ? <span style={{ color: "#34B7F1" }}>✓✓</span> : null}</div>
    </div>
  </div>
);

export const CampoMensagem: React.FC<{ texto?: React.ReactNode }> = ({ texto }) => (
  <div style={{ position: "absolute", left: 14, right: 14, bottom: 18, display: "flex", gap: 12, alignItems: "center" }}>
    <div style={{ flex: 1, height: 76, background: "#fff", borderRadius: 38, display: "flex", alignItems: "center", padding: "0 26px",
      fontSize: 28, color: texto ? "#111" : "#999" }}>{texto || "Mensagem"}</div>
    <div style={{ width: 76, height: 76, borderRadius: 38, background: VERDE, color: "#fff", fontSize: 34, display: "flex",
      alignItems: "center", justifyContent: "center" }}>{texto ? "➤" : "🎤"}</div>
  </div>
);

// ---------- painel rápido (puxar a barra de cima) ----------
export type Tile = { e: string; n: string; on?: boolean };
/** Centro (local) do bloco i do painel rápido. */
export const posTile = (i: number) => ({ x: 40 + (i % 2) * 262 + 124, y: 300 + Math.floor(i / 2) * 150 + 62 });
export const PainelRapido: React.FC<{ desce: number; tiles: Tile[]; ligado?: number; brilho?: number; children?: React.ReactNode }> = ({
  desce, tiles, ligado = -1, brilho = 0.8, children,
}) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 900, background: "rgba(28,30,34,.97)", color: "#fff",
    transform: `translateY(${(desce - 1) * 900}px)`, borderRadius: "0 0 40px 40px", padding: "80px 0 0" }}>
    <div style={{ padding: "0 40px", fontSize: 26, color: "#bbb" }}>Brilho</div>
    <div style={{ position: "absolute", left: 60, top: 168, width: 470, height: 44, borderRadius: 22, background: "#444" }}>
      <div style={{ width: `${brilho * 100}%`, height: "100%", borderRadius: 22, background: "linear-gradient(90deg,#90caf9,#fff)" }} />
    </div>
    {tiles.map((tl, i) => {
      const p = posTile(i);
      const on = tl.on || i === ligado;
      return (
        <div key={i} style={{ position: "absolute", left: p.x - 124, top: p.y - 62, width: 248, height: 124, borderRadius: 30,
          background: on ? (i === ligado ? AMARELO : "#8ab4f8") : "#3a3d42", color: on ? "#111" : "#fff", padding: "18px 20px" }}>
          <div style={{ fontSize: 36 }}>{tl.e}</div>
          <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.1 }}>{tl.n}</div>
        </div>
      );
    })}
    {children}
  </div>
);

// ---------- lista de conversas estilo WhatsApp ----------
export type Conversa = { nome: string; msg: string; hora: string; cor: string; letra?: string };
export const CONVERSAS: Conversa[] = [
  { nome: "Grupo da Família", msg: "📷 Foto", hora: "10:42", cor: "#7C4DFF" },
  { nome: "Trabalho", msg: "Reunião às 14h", hora: "10:30", cor: "#FF7043" },
  { nome: "Condomínio 🏢", msg: "Aviso: falta de água amanhã", hora: "10:12", cor: "#8D6E63" },
  { nome: "João", msg: "Beleza, combinado!", hora: "09:58", cor: "#29B6F6" },
  { nome: "Academia", msg: "Aula cancelada hoje", hora: "09:15", cor: "#66BB6A" },
  { nome: "Mãe", msg: "Me liga quando puder ❤️", hora: "08:47", cor: "#EC407A" },
  { nome: "Ana Paula", msg: "kkkkkk", hora: "Ontem", cor: "#FFA726" },
  { nome: "Pizzaria", msg: "Seu pedido saiu 🍕", hora: "Ontem", cor: "#EF5350" },
];
export const TOPO_LISTA = 180;
export const LINHA_CONV = 116;
/** Centro (local) da conversa na posição i da lista. */
export const posConversa = (i: number) => ({ x: 300, y: TOPO_LISTA + i * LINHA_CONV + LINHA_CONV / 2 });

export const ListaConversas: React.FC<{
  lista?: Conversa[]; selecionada?: number; icones?: React.ReactNode; y?: (i: number) => number; extra?: (i: number) => React.ReactNode;
  topo?: React.ReactNode; opacidade?: (i: number) => number;
}> = ({ lista = CONVERSAS, selecionada = -1, icones, y = (i) => i * LINHA_CONV, extra, topo, opacidade }) => (
  <>
    <BarraStatus cor={selecionada >= 0 ? "#0b3d33" : "#075E54"} />
    <div style={{ height: 130, background: selecionada >= 0 ? "#0b3d33" : "#075E54", color: "#fff", display: "flex", alignItems: "center", padding: "0 28px", gap: 26 }}>
      {selecionada >= 0 ? (<><span style={{ fontSize: 38 }}>←</span><span style={{ fontSize: 38, fontWeight: 700, flex: 1 }}>1</span>{icones}</>)
        : <span style={{ fontSize: 44, fontWeight: 700 }}>WhatsApp</span>}
    </div>
    {topo}
    {lista.map((c, i) => (
      <div key={c.nome} style={{ position: "absolute", left: 0, right: 0, top: TOPO_LISTA + y(i), height: LINHA_CONV, display: "flex",
        alignItems: "center", gap: 22, padding: "0 26px", background: i === selecionada ? "#d9fdd3" : "#fff", borderBottom: "1px solid #eee",
        opacity: opacidade ? opacidade(i) : 1 }}>
        <Avatar letra={c.letra ?? c.nome[0]} cor={c.cor} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 31, fontWeight: 700, color: "#111", whiteSpace: "nowrap" }}>{c.nome}</div>
          <div style={{ fontSize: 25, color: "#667", whiteSpace: "nowrap", overflow: "hidden" }}>{c.msg}</div>
        </div>
        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <div style={{ fontSize: 21, color: "#667" }}>{c.hora}</div>
          <div style={{ height: 34 }}>{extra?.(i)}</div>
        </div>
      </div>
    ))}
  </>
);

/** Ícone redondo que "acende" quando o dedo toca (para barras de seleção). */
export const IconeBarra: React.FC<{ e: string; ativo?: boolean }> = ({ e, ativo }) => (
  <span style={{ fontSize: 38, padding: 8, borderRadius: 40, background: ativo ? "rgba(255,255,255,.4)" : "transparent" }}>{e}</span>
);