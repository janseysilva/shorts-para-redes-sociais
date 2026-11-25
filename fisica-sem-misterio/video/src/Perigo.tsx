// Formato "VOCÊ EM PERIGO" (25/11): animação 2D por código. Peças comuns + os shorts FioCaido e CarroEnchente.
import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { CLAMP, FONTE, Trilha, mola, sorteio, useT, type Som, type Tempos } from "./espaco";
import { Legenda } from "./Legenda";

export const VERM = "#E5383B", VERDE = "#1FA855", AMAR = "#FFC531", AZ = "#1B6FB8";
export const ip = (t: number, a: number, b: number, x: number, y: number) => interpolate(t, [a, b], [x, y], CLAMP);
export const suave = (t: number, a: number, b: number, x: number, y: number) => {
  const p = ip(t, a, b, 0, 1); return x + (y - x) * (p * p * (3 - 2 * p));
};

export const Pilula: React.FC<{ texto: string; cor: string; y: number; desde: number; tam?: number }> = ({ texto, cor, y, desde, tam = 58 }) => {
  const { frame, fps, t } = useT();
  if (t < desde) return null;
  const e = desde <= 0 ? 1 : mola(frame, desde, fps, 12, 160);
  return (
    <div style={{ position: "absolute", top: y, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div style={{ background: cor, color: cor === AMAR ? "#1a1300" : "#fff", fontFamily: FONTE, fontWeight: 900, fontSize: tam, padding: "12px 34px", borderRadius: 18,
        boxShadow: "0 8px 0 rgba(0,0,0,.3)", transform: `scale(${e})`, whiteSpace: "nowrap" }}>{texto}</div>
    </div>
  );
};
export const Xis: React.FC<{ x: number; y: number; r: number; desde: number }> = ({ x, y, r, desde }) => {
  const { frame, fps, t } = useT();
  if (t < desde) return null;
  const e = mola(frame, desde, fps, 10, 200);
  return (
    <g transform={`translate(${x},${y}) scale(${e})`} strokeLinecap="round">
      {[["#fff", 54], [VERM, 36]].map(([c, w]) => (
        <path key={c} d={`M${-r},${-r}L${r},${r}M${r},${-r}L${-r},${r}`} stroke={c as string} strokeWidth={w as number} fill="none" />
      ))}
    </g>
  );
};
export const Svg: React.FC<{ children: React.ReactNode; cam?: string }> = ({ children, cam }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}><g transform={cam}>{children}</g></svg>
);
export const Rotulo: React.FC<{ x: number; y: number; texto: string; cor?: string; tam?: number; ancora?: "middle" | "start" | "end" }> = ({ x, y, texto, cor = "#fff", tam = 60, ancora = "middle" }) => (
  <text x={x} y={y} textAnchor={ancora} fontFamily={FONTE} fontWeight={900} fontSize={tam} fill={cor} stroke="#0a0f1a" strokeWidth={12} paintOrder="stroke" strokeLinejoin="round">{texto}</text>
);

const RC = sorteio(7);
const GOTAS = Array.from({ length: 90 }, () => ({ x: RC() * 1300, y: RC() * 1920, v: 1500 + RC() * 900, l: 30 + RC() * 40 }));
export const Chuva: React.FC<{ op?: number }> = ({ op = 0.35 }) => {
  const { t } = useT();
  return <g stroke="#cfe6ff" strokeWidth={4} opacity={op}>{GOTAS.map((g, i) => {
    const y = (g.y + t * g.v) % 2000 - 60; return <line key={i} x1={g.x - y * 0.12} y1={y} x2={g.x - y * 0.12 - g.l * 0.12} y2={y + g.l} />;
  })}</g>;
};

// ---------- cenário da rua (noite de chuva) ----------
const CHAO = 1330;
const Rua: React.FC<{ chao?: number }> = ({ chao = CHAO }) => (
  <>
    <defs>
      <linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#15304f" /><stop offset="1" stopColor="#5f8fae" /></linearGradient>
      <linearGradient id="asf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4a525e" /><stop offset="1" stopColor="#262b33" /></linearGradient>
    </defs>
    <rect x={-400} y={-400} width={1900} height={2400} fill="url(#ceu)" />
    <ellipse cx={250} cy={330} rx={330} ry={90} fill="#33506c" /><ellipse cx={820} cy={240} rx={360} ry={100} fill="#2b4661" /><ellipse cx={560} cy={420} rx={260} ry={60} fill="#3b5a76" />
    {[[-60, 620, 300, "#b9674a"], [250, 720, 250, "#d8a24d"], [510, 560, 280, "#6d8f78"], [800, 680, 330, "#a5617a"]].map(([x, y, w, c], i) => (
      <g key={i}>
        <rect x={x as number} y={y as number} width={w as number} height={chao - (y as number)} fill={c as string} />
        <rect x={(x as number) - 12} y={(y as number) - 26} width={(w as number) + 24} height={30} fill="#5b3b30" />
        {[0, 1].map((a) => [0, 1].map((b) => (
          <rect key={`${a}${b}`} x={(x as number) + 40 + a * ((w as number) / 2 - 10)} y={(y as number) + 70 + b * 190} width={80} height={110} rx={8} fill={(a + b + i) % 2 ? "#ffe39a" : "#2c4257"} stroke="#fff3" strokeWidth={6} />
        )))}
      </g>
    ))}
    <rect x={-400} y={chao - 34} width={1900} height={40} fill="#9aa3ab" />
    <rect x={-400} y={chao} width={1900} height={900} fill="url(#asf)" />
    {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={-120 + i * 300} y={chao + 250} width={170} height={20} rx={6} fill="#e9d98a" opacity={0.6} />)}
  </>
);
const Poste: React.FC<{ x: number; pontaX: number }> = ({ x, pontaX }) => {
  const { t } = useT();
  const pisca = Math.sin(t * 40) > -0.2;
  return (
    <g>
      <rect x={x - 18} y={420} width={36} height={CHAO - 420} rx={8} fill="#6b4c36" /><rect x={x - 120} y={470} width={240} height={26} rx={8} fill="#57402f" />
      <path d={`M${x - 400},430Q${x - 250},540 ${x - 100},470`} stroke="#14181d" strokeWidth={9} fill="none" />
      <path d={`M${x + 100},470C${x + 210},700 ${x + 60},${CHAO - 300} ${pontaX - 70},${CHAO - 8}Q${pontaX - 30},${CHAO + 8} ${pontaX},${CHAO - 4}`} stroke="#14181d" strokeWidth={13} fill="none" />
      <circle cx={pontaX} cy={CHAO - 4} r={60 + Math.sin(t * 31) * 18} fill="#8fe3ff" opacity={0.35} />
      {pisca && [0, 1, 2, 3, 4, 5].map((i) => {
        const a = i * 1.05 + Math.floor(t * 18) * 0.9; const l = 60 + ((i * 37 + Math.floor(t * 18) * 13) % 50);
        return <path key={i} d={`M${pontaX},${CHAO - 4}l${Math.cos(a) * l * 0.5 + 12},${-Math.abs(Math.sin(a)) * l * 0.5}l${Math.cos(a) * l * 0.5 - 10},${-Math.abs(Math.sin(a)) * l * 0.6}`} stroke="#fff7b0" strokeWidth={7} fill="none" strokeLinecap="round" />;
      })}
    </g>
  );
};

/** Pessoa de lado. passo = abertura das pernas em graus; pés apoiados no y dado. */
const Pessoa: React.FC<{ x: number; y: number; passo?: number; s?: number; braco?: number; vira?: boolean; susto?: boolean; celular?: boolean }> = ({ x, y, passo = 0, s = 1, braco = 18, vira, susto, celular }) => {
  const L = 210, rad = (passo * Math.PI) / 180, h = L * Math.cos(rad);
  const perna = (g: number, cor: string) => {
    const px = Math.sin((g * Math.PI) / 180) * L;
    return <g><path d={`M0,${-h}L${px},0`} stroke={cor} strokeWidth={50} strokeLinecap="round" /><path d={`M${px - 8},4h46`} stroke="#22252b" strokeWidth={34} strokeLinecap="round" /></g>;
  };
  const arm = (g: number, cor: string) => {
    const a = (g * Math.PI) / 180, mx = Math.sin(a) * 80, my = Math.cos(a) * 80;
    return <path d={`M0,${-h - 165}l${mx},${my}l${Math.sin(a + 0.5) * 75},${Math.cos(a + 0.5) * 75}`} stroke={cor} strokeWidth={34} strokeLinecap="round" strokeLinejoin="round" fill="none" />;
  };
  return (
    <g transform={`translate(${x},${y - 18}) scale(${vira ? -s : s},${s})`}>
      {arm(-braco, "#8a5636")}{perna(-passo, "#22406b")}{perna(passo, "#2d538a")}
      <rect x={-50} y={-h - 200} width={100} height={225} rx={44} fill="#f2b632" />
      <path d={`M0,${-h - 200}v-30`} stroke="#a3683f" strokeWidth={36} />
      <circle cx={8} cy={-h - 272} r={64} fill="#b97a4b" />
      <path d={`M-60,${-h - 270}a66,66 0 0 1 124,-30q-50,6 -78,0q-14,40 -34,60z`} fill="#241a16" />
      <circle cx={34} cy={-h - 276} r={susto ? 12 : 7} fill="#fff" /><circle cx={36} cy={-h - 276} r={6} fill="#17120f" />
      {susto ? <ellipse cx={38} cy={-h - 238} rx={10} ry={14} fill="#5b2320" /> : <path d={`M24,${-h - 240}q14,10 26,2`} stroke="#5b2320" strokeWidth={6} fill="none" />}
      {celular ? <g><path d={`M0,${-h - 165}l60,36l22,-92`} stroke="#b97a4b" strokeWidth={34} fill="none" strokeLinecap="round" strokeLinejoin="round" /><rect x={66} y={-h - 300} width={26} height={74} rx={6} fill="#10151c" /></g> : arm(braco, "#b97a4b")}
    </g>
  );
};

const Carro: React.FC<{ x: number; y: number; giro?: number; rod?: number; cor?: string; pickup?: boolean; motorista?: boolean; s?: number; vira?: boolean }> = ({ x, y, giro = 0, rod = 0, cor = "#e0483e", pickup, motorista = true, s = 1, vira }) => (
  <g transform={`translate(${x},${y}) rotate(${giro}) scale(${vira ? -s : s},${s})`}>
    <path d={pickup ? "M-330,-44V-180H-60L-30,-290H140L210,-180L320,-160V-44Z" : "M-300,-44V-150Q-295,-178 -250,-184L-170,-196L-100,-290Q-90,-300 -70,-300H90Q110,-300 124,-284L190,-196L270,-176Q302,-166 302,-130V-44Z"} fill={cor} stroke="#0006" strokeWidth={6} strokeLinejoin="round" />
    {pickup ? <path d="M-40,-186L-14,-270H126L176,-186Z" fill="#bfe3f5" /> : <><path d="M-140,-194L-82,-276H-6V-194Z" fill="#bfe3f5" /><path d="M14,-194V-276H84L148,-194Z" fill="#bfe3f5" /></>}
    {motorista && <g><circle cx={62} cy={-224} r={30} fill="#b97a4b" /><path d="M32,-226a30,30 0 0 1 58,-12q-30,2 -40,-2z" fill="#241a16" /></g>}
    <rect x={pickup ? 290 : 272} y={-160} width={30} height={30} rx={8} fill="#fff1b0" /><rect x={-302} y={-150} width={22} height={34} rx={6} fill="#7d1515" />
    <path d="M4,-188V-84" stroke="#0004" strokeWidth={5} /><rect x={24} y={-160} width={44} height={12} rx={6} fill="#0005" />
    {[-190, 190].map((cx) => (
      <g key={cx} transform={`translate(${cx},-62) rotate(${rod})`}>
        <circle r={62} fill="#16191d" /><circle r={34} fill="#c9d1d8" /><path d="M-30,0H30M0,-30V30" stroke="#6b747c" strokeWidth={10} />
      </g>
    ))}
  </g>
);
const Agua: React.FC<{ y: number; corr?: number; op?: number }> = ({ y, corr = 1, op = 0.72 }) => {
  const { t } = useT();
  const onda = (amp: number, fase: number) => {
    let d = `M-200,${y}`;
    for (let x = -200; x <= 1300; x += 30) d += `L${x},${y + Math.sin(x / 90 - t * 4 * corr + fase) * amp}`;
    return d + "L1300,2300L-200,2300Z";
  };
  return (
    <g>
      <path d={onda(10, 1)} fill="#a5793f" opacity={op * 0.6} /><path d={onda(14, 0)} fill="#8a6434" opacity={op} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = ((i * 260 + t * 260 * corr) % 1500) - 200; return <path key={i} d={`M${x},${y + 60 + (i % 3) * 60}h110`} stroke="#e7cfa0" strokeWidth={8} strokeLinecap="round" opacity={0.5} />;
      })}
    </g>
  );
};

const Moldura: React.FC<{ id: string; tempos: Tempos; sons: Som[]; children: React.ReactNode }> = ({ id, tempos, sons, children }) => {
  const { frame, dur } = useT();
  return (
    <AbsoluteFill style={{ fontFamily: FONTE, overflow: "hidden", background: "#0b1420" }}>
      <Trilha id={id} sons={sons} />
      {children}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 60%, rgba(0,0,0,.45) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, height: 12, width: `${(frame / dur) * 100}%`, background: AMAR }} />
      <Legenda palavras={tempos.palavras} cenas={tempos.cenas} />
    </AbsoluteFill>
  );
};
const Resumo: React.FC<{ desde: number; titulo: string; linhas: [string, string][] }> = ({ desde, titulo, linhas }) => (
  <>
    <AbsoluteFill style={{ background: "rgba(8,18,32,.72)" }} />
    <div style={{ position: "absolute", top: 200, left: 0, right: 0, textAlign: "center", color: "#fff", fontWeight: 900, fontSize: 92, textShadow: "0 8px 0 #0008" }}>{titulo}</div>
    {linhas.map(([s, c], i) => <Pilula key={s} texto={s} cor={c} y={370 + i * 135} desde={desde + 0.05 + i * 0.12} tam={56} />)}
    <div style={{ position: "absolute", top: 1370, left: 0, right: 0, textAlign: "center", color: "#9fe3ff", fontWeight: 800, fontSize: 52 }}>@fisicasemmisteriobr</div>
  </>
);
// Quando a palavra é dita (dentro da frase i)
export const quando = (T: Tempos, i: number, pal: string, pad = 0) => {
  const fim = T.cenas[i + 1] ?? 1e9;
  const p = T.palavras.find((w) => w.ini >= T.cenas[i] - 0.01 && w.ini < fim && w.t.toLowerCase().startsWith(pal));
  return (p?.ini ?? T.cenas[i] + pad);
};

// ===================== FIO CAÍDO =====================
export const FioCaido: React.FC<{ tempos: Tempos }> = ({ tempos }) => {
  const { t, frame, fps } = useT();
  const C = tempos.cenas, em = (a: number, b: number) => t >= (a === 0 ? 0 : C[a]) && t < (C[b] ?? 1e9);
  const q = (i: number, p: string) => quando(tempos, i, p);
  const treme = (a: number) => (t < a + 0.5 && t > a ? Math.sin(t * 90) * 14 : 0);
  const anda = (v: number) => Math.sin(t * v) * 26;
  const V = (d: number) => Math.max(0, Math.round((1000 - d * 160) / 10) * 10); // exemplo
  const ondaCirc = (cx: number, cy: number, ry: number) => [0, 1, 2, 3].map((i) => {
    const p = (t * 0.45 + i / 4) % 1;
    return <ellipse key={i} cx={cx} cy={cy} rx={p * 620} ry={p * 620 * ry} fill="none" stroke="#ffe14a" strokeWidth={12 * (1 - p) + 2} opacity={1 - p} />;
  });
  const naoCorra = q(0, "não");
  const xAnda = t < naoCorra ? ip(t, 0, naoCorra, 640, 850) : 850;
  const pas = suave(t, C[4], C[4] + 1.2, 9, 22), pas2 = t > C[5] ? suave(t, q(5, "quanto"), q(5, "choque"), 22, 35) : pas;
  const corr = t > q(4, "essa");
  const dist = Math.round(suave(t, C[7], q(8, "ligue"), 3, 20));
  const sons: Som[] = [{ t: 0, som: "impacto", vol: 0.5 }, { t: naoCorra, som: "impacto", vol: 0.45 }, { t: q(4, "essa"), som: "subida", vol: 0.3 }, { t: C[6], som: "impacto", vol: 0.35 }, { t: C[9], som: "impacto", vol: 0.3 }, { t: C[10], som: "impacto", vol: 0.4 }];
  return (
    <Moldura id="FioCaido" tempos={tempos} sons={sons}>
      {em(0, 2) && (<>
        <Svg cam={`translate(${treme(0)},0) translate(540,1000) scale(${ip(t, 0, C[2], 1, 1.12)}) translate(-540,-1000)`}>
          <Rua /><Chuva /><Poste x={230} pontaX={430} />
          {t >= C[1] && ondaCirc(430, CHAO + 8, 0.16)}
          <Pessoa x={xAnda} y={CHAO + 6} passo={t < naoCorra ? Math.abs(anda(11)) : 24} susto braco={t < naoCorra ? anda(11) : 50} />
          <Xis x={850} y={1080} r={120} desde={naoCorra} />
        </Svg>
        <Pilula texto="⚠ FIO CAÍDO" cor={VERM} y={150} desde={0} tam={74} />
        <Pilula texto="NÃO CORRA" cor={AMAR} y={290} desde={naoCorra} tam={64} />
        {t >= C[1] && <Pilula texto="O chão também dá choque" cor={AZ} y={290 + 120} desde={C[1]} />}
      </>)}
      {em(2, 4) && (<>
        <Svg>
          <rect width={1080} height={1920} fill="#39414c" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} x={120} y={i * 300 - 40} width={22} height={170} fill="#e9d98a" opacity={0.5} />)}
          <rect x={900} width={180} height={1920} fill="#8f969d" /><path d="M900,0V1920" stroke="#c9ced3" strokeWidth={14} />
          {[[560, "#2fa84f"], [430, "#e6c429"], [300, "#f08a24"], [170, "#e5383b"]].map(([r, c], i) => {
            const e = ip(t, C[2] + 0.5 + (3 - i) * 0.45, C[2] + 1.3 + (3 - i) * 0.45, 0, 1);
            return <circle key={i} cx={540} cy={860} r={(r as number) * e} fill={c as string} opacity={0.5} stroke={c as string} strokeWidth={10} />;
          })}
          {[0, 1, 2].map((i) => { const p = (t * 0.6 + i / 3) % 1; return <circle key={i} cx={540} cy={860} r={p * 560} fill="none" stroke="#fff" strokeWidth={9} opacity={(1 - p) * 0.8} />; })}
          <path d="M-40,180C200,260 320,560 520,848" stroke="#0d1014" strokeWidth={26} fill="none" /><circle cx={540} cy={860} r={26 + Math.sin(t * 30) * 8} fill="#dff6ff" />
          {t > C[3] - 0.2 && [[235, "1.000 V"], [372, "700 V"], [500, "400 V"]].map(([d, s], i) => <Rotulo key={i} x={540} y={860 + (d as number)} texto={s as string} tam={62} />)}
          {t > C[3] && <Rotulo x={540} y={300} texto="valores de exemplo" tam={40} cor="#dfe7ee" />}
          <g transform={`translate(${suave(t, C[3], C[3] + 2.6, 640, 800)},${suave(t, C[3], C[3] + 2.6, 720, 480)})`}>
            <ellipse rx={62} ry={34} fill="#f2b632" /><circle r={32} fill="#241a16" /><ellipse cx={-26} cy={44} rx={16} ry={26} fill="#22252b" /><ellipse cx={26} cy={58} rx={16} ry={26} fill="#22252b" />
            <rect x={-82} y={-118} width={164} height={64} rx={14} fill={AMAR} /><text x={0} y={-72} textAnchor="middle" fontFamily={FONTE} fontWeight={900} fontSize={46} fill="#1a1300">VOCÊ</text>
          </g>
        </Svg>
        <Pilula texto={t < C[3] ? "⚡ O chão fica energizado" : "Perto: ALTA • Longe: BAIXA"} cor={AZ} y={150} desde={t < C[3] ? C[2] : C[3]} tam={62} />
      </>)}
      {em(4, 6) && (<>
        <Svg>
          <defs><linearGradient id="lado" x1="0" x2="1"><stop offset="0" stopColor="#e5383b" /><stop offset=".5" stopColor="#e6a029" /><stop offset="1" stopColor="#2fa84f" /></linearGradient></defs>
          <rect width={1080} height={1920} fill="#1c2c40" /><rect y={1260} width={1080} height={700} fill="url(#lado)" opacity={0.85} /><rect y={1260} width={1080} height={16} fill="#fff6" />
          <path d="M-20,1170Q40,1270 110,1264" stroke="#0d1014" strokeWidth={26} fill="none" /><circle cx={112} cy={1262} r={30 + Math.sin(t * 30) * 8} fill="#dff6ff" />
          {(() => {
            const L = 700, a = (pas2 * Math.PI) / 180, dx = Math.sin(a) * L, h = L * Math.cos(a), cx = 590, q0 = 1240 - h;
            const e = [cx - dx, 1240], d = [cx + dx, 1240];
            const v1 = V((e[0] - 110) / 180), v2 = V((d[0] - 110) / 180), dif = v1 - v2;
            return (<>
              <rect x={cx - 130} y={q0 - 420} width={260} height={470} rx={90} fill="#f2b632" />
              {[e, d].map((p, i) => <g key={i}><path d={`M${cx},${q0}L${p[0]},${p[1] - 30}`} stroke={i ? "#2d538a" : "#22406b"} strokeWidth={120} strokeLinecap="round" /><path d={`M${p[0] - 60},1238h90`} stroke="#15181d" strokeWidth={56} strokeLinecap="round" /></g>)}
              {corr && Array.from({ length: 14 }, (_, i) => {
                const p = (t * 0.9 + i / 14) % 1; const k = p < 0.5 ? p * 2 : (1 - p) * 2; const o = p < 0.5 ? e : d;
                return <circle key={i} cx={o[0] + (cx - o[0]) * k} cy={1210 + (q0 - 1210) * k} r={18} fill="#fff27a" stroke="#ffb300" strokeWidth={5} />;
              })}
              <Rotulo x={e[0]} y={1390} texto={`${v1} V`} tam={70} /><Rotulo x={d[0]} y={1390} texto={`${v2} V`} tam={70} />
              <rect x={150} y={380} width={780} height={180} rx={30} fill="#0c1624ee" /><Rotulo x={540} y={470} texto={`diferença: ${dif} V`} tam={86} cor={dif > 450 ? "#ff6b6b" : AMAR} /><Rotulo x={540} y={530} texto="valores de exemplo" tam={36} cor="#dfe7ee" />
            </>);
          })()}
        </Svg>
        <Pilula texto={t < C[5] ? "Cada pé, uma tensão" : "TENSÃO DE PASSO"} cor={t < C[5] ? AZ : VERM} y={150} desde={t < C[5] ? C[4] : C[5]} tam={70} />
      </>)}
      {em(6, 9) && (<>
        <Svg>
          <g transform={`translate(${-suave(t, C[7], q(8, "ligue"), 0, 520)},0)`}>
            <g transform="translate(0,0)"><Rua /><g transform="translate(1290,0)"><Rua /></g><Poste x={120} pontaX={300} />{ondaCirc(300, CHAO + 8, 0.16)}</g>
          </g>
          <Chuva />
          <Pessoa x={640 + (t > C[7] && t < q(8, "ligue") ? Math.sin(t * 9) * 8 : 0)} y={CHAO + 6} passo={t < C[7] ? suave(t, q(6, "junte"), q(6, "junte") + 0.6, 24, 2) : t < q(8, "ligue") ? 2 + Math.abs(Math.sin(t * 9)) * 3 : 2} braco={12} celular={t > q(8, "ligue")} />
          {t > C[7] && <g><rect x={290} y={540} width={500} height={130} rx={30} fill="#0c1624dd" /><Rotulo x={540} y={632} texto={`${dist} m do fio`} tam={74} cor={dist >= 20 ? "#5dff9b" : AMAR} /></g>}
        </Svg>
        <Pilula texto="1 • PÉS JUNTOS" cor={VERDE} y={140} desde={q(6, "um")} tam={62} />
        <Pilula texto="2 • ARRASTE, PASSO CURTO" cor={VERDE} y={265} desde={C[7]} tam={62} />
        <Pilula texto="3 • 20 METROS + 193" cor={VERDE} y={390} desde={C[8]} tam={62} />
      </>)}
      {em(9, 10) && (<>
        <Svg><Rua /><Chuva /><g transform="translate(-40,0)"><rect x={90} y={420} width={36} height={CHAO - 420} fill="#6b4c36" /><path d={`M108,470C300,560 420,900 470,${CHAO - 300}C600,${CHAO - 250} 760,${CHAO - 260} 800,${CHAO - 200}`} stroke="#14181d" strokeWidth={14} fill="none" /></g>
          <Carro x={560} y={CHAO + 20} s={1.25} /><circle cx={440} cy={CHAO - 350} r={44 + Math.sin(t * 33) * 14} fill="#8fe3ff" opacity={0.6} />
          {ondaCirc(560, CHAO + 30, 0.16)}</Svg>
        <Pilula texto="FIQUE DENTRO DO CARRO" cor={VERDE} y={150} desde={C[9]} tam={66} />
        <Pilula texto="até desligarem a rede" cor={AZ} y={285} desde={q(9, "espere")} tam={56} />
      </>)}
      {em(10, 11) && (<>
        <Svg><Rua /><Chuva /><Poste x={180} pontaX={400} />{ondaCirc(400, CHAO + 8, 0.16)}
          <Pessoa x={760} y={CHAO + 6} passo={16} vira braco={75} susto /><path d={`M650,${CHAO - 300}L420,${CHAO - 40}`} stroke="#7a5230" strokeWidth={20} strokeLinecap="round" />
          <Xis x={540} y={1090} r={150} desde={C[10] + 0.25} /></Svg>
        <Pilula texto="⚠ NUNCA MEXA NO FIO" cor={VERM} y={150} desde={C[10]} tam={66} />
      </>)}
      {t >= C[11] && (<>
        <Svg><Rua /><Chuva /><Poste x={180} pontaX={400} /></Svg>
        <Resumo desde={C[11]} titulo="FIO CAÍDO?" linhas={[["✖ NÃO CORRA", VERM], ["✔ PÉS JUNTOS", VERDE], ["✔ ARRASTE OS PÉS", VERDE], ["✔ 20 METROS + 193", VERDE], ["✔ NO CARRO: FIQUE DENTRO", VERDE], ["✖ NÃO TOQUE EM NADA", VERM], ["➜ MANDA PRA ALGUÉM", AMAR]]} />
      </>)}
    </Moldura>
  );
};

// ===================== CARRO NA ENCHENTE =====================
export const CarroEnchente: React.FC<{ tempos: Tempos }> = ({ tempos }) => {
  const { t } = useT();
  const C = tempos.cenas, em = (a: number, b: number) => t >= (a === 0 ? 0 : C[a]) && t < (C[b] ?? 1e9);
  const q = (i: number, p: string) => quando(tempos, i, p);
  const K = 3.1; // pixels por centímetro na cena de perto
  const nao = q(0, "não");
  const kgNivel = suave(t, C[2] + 1.6, C[4] - 0.3, 0, 30), nivel34 = t < C[4] ? kgNivel : suave(t, C[4], q(4, "correndo"), 24, 30);
  const regua = (x: number, y: number, max: number, niv: number) => (
    <g>
      <rect x={x} y={y - max * K} width={54} height={max * K} rx={8} fill="#fff" stroke="#111" strokeWidth={6} />
      {Array.from({ length: max / 10 + 1 }, (_, i) => <path key={i} d={`M${x},${y - i * 10 * K}h30`} stroke="#111" strokeWidth={5} />)}
      <rect x={x} y={y - niv * K} width={54} height={niv * K} fill="#1B6FB8" opacity={0.85} />
      <Rotulo x={x + 30} y={y - max * K - 34} texto={`${Math.round(niv)} cm`} tam={68} cor={AMAR} />
    </g>
  );
  const sons: Som[] = [{ t: 0, som: "impacto", vol: 0.45 }, { t: nao, som: "impacto", vol: 0.4 }, { t: C[2], som: "subida", vol: 0.3 }, { t: q(4, "levado"), som: "impacto", vol: 0.4 }, { t: C[6], som: "impacto", vol: 0.4 }, { t: C[8], som: "impacto", vol: 0.3 }];
  const peso = Math.max(0, Math.round((1000 - Math.max(0, kgNivel - 15) * 60) / 10) * 10);
  return (
    <Moldura id="CarroEnchente" tempos={tempos} sons={sons}>
      {em(0, 2) && (<>
        <Svg cam={`translate(540,1200) scale(${ip(t, 0, C[2], 1.02, 1.15)}) translate(-540,-1200)`}>
          <Rua /><Carro x={t < nao ? ip(t, 0, nao, 260, 470) : 470 + Math.sin(t * 2) * 4} y={CHAO + 70} rod={t < nao ? t * 300 : 0} s={1.15} /><Agua y={CHAO + 20 - ip(t, 0, C[2], 0, 60)} /><Chuva />
          <Xis x={830} y={1120} r={130} desde={nao} />
        </Svg>
        <Pilula texto="⚠ RUA ALAGADA" cor={VERM} y={150} desde={0} tam={74} />
        <Pilula texto="NÃO TENTE PASSAR" cor={AMAR} y={290} desde={nao} tam={64} />
        <Pilula texto="Parece raso..." cor={AZ} y={415} desde={C[1]} tam={60} />
      </>)}
      {em(2, 4) && (<>
        <Svg>
          <Rua chao={1230} />
          <g>
            <Carro x={560} y={1350} s={1.5} giro={kgNivel > 26 ? Math.sin(t * 3) * 1.2 : 0} />
            {t > q(2, "empurra") && [430, 560, 690].map((x, i) => <path key={i} d={`M${x},1480V${1370 - Math.sin(t * 6) * 14}m-34,40l34,-46l34,46`} stroke="#5CE1FF" strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" />)}
          </g>
          <Agua y={1350 - kgNivel * K} /><Chuva op={0.25} />
          {t > C[3] && regua(90, 1350, 40, kgNivel)}
        </Svg>
        <Pilula texto={t < C[3] ? "Peso do carro: 1.000 kg" : "A água carrega o carro"} cor={AZ} y={150} desde={t < C[3] ? C[2] : C[3]} tam={62} />
        <div style={{ position: "absolute", top: 320, left: 190, width: 700, textAlign: "center", color: "#fff", fontWeight: 900, fontSize: 52, textShadow: "0 4px 10px #000" }}>
          PESO NOS PNEUS: {peso} kg
          <div style={{ marginTop: 14, height: 56, borderRadius: 28, background: "#0c1624", border: "6px solid #fff", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${peso / 10}%`, background: peso > 600 ? VERDE : peso > 300 ? AMAR : VERM }} />
          </div>
          {t > C[3] && <div style={{ marginTop: 14, fontSize: 64, color: "#5CE1FF" }}>−60 kg por cm</div>}
        </div>
      </>)}
      {em(4, 6) && (<>
        <Svg>
          <Rua chao={1230} />
          {t < C[5]
            ? <Carro x={460 + suave(t, q(4, "carro"), C[5], 0, 700)} y={1350 - suave(t, q(4, "carro"), q(4, "carro") + 1, 0, 24) + Math.sin(t * 4) * 8} s={1.3} giro={suave(t, q(4, "carro"), C[5], 0, 9) + Math.sin(t * 3) * 2} cor="#e0483e" />
            : <Carro x={420 + suave(t, C[5] + 0.8, C[6], 0, 640)} y={1350 - suave(t, C[5] + 0.6, C[5] + 1.4, 0, 40) + Math.sin(t * 4) * 8} s={1.4} giro={-suave(t, C[5] + 0.6, C[6], 0, 8)} cor="#3a7bd5" pickup />}
          <Agua y={1350 - (t < C[5] ? nivel34 : suave(t, C[5], C[5] + 0.8, 30, 60)) * K} corr={2.2} /><Chuva op={0.3} />
          {regua(110, 1350, 70, t < C[5] ? nivel34 : suave(t, C[5], C[5] + 0.8, 30, 60))}
        </Svg>
        <Pilula texto={t < C[5] ? "30 cm" : "60 cm"} cor={VERM} y={140} desde={t < C[5] ? C[4] : C[5]} tam={130} />
        <Pilula texto={t < C[5] ? "leva um carro pequeno" : "leva até caminhonete"} cor={AZ} y={360} desde={t < C[5] ? q(4, "carro") : C[5] + 0.5} tam={60} />
      </>)}
      {em(6, 7) && (<>
        <Svg>
          <Rua chao={1130} /><Carro x={ip(t, C[6], C[7], 180, 300)} y={1200} s={1.1} rod={t * 200} />
          <path d="M620,1200 C640,1420 700,1500 800,1500 C900,1500 950,1420 970,1200 Z" fill="#14100c" stroke="#5b4630" strokeWidth={16} />
          <Agua y={1120} op={t < C[6] + 0.9 ? 0.96 : 0.55} /><Chuva op={0.3} />
          {t > C[6] + 0.9 && <Rotulo x={795} y={1380} texto="BURACO" tam={62} cor={AMAR} />}
        </Svg>
        <Pilula texto="⚠ O que tem embaixo?" cor={VERM} y={150} desde={C[6]} tam={66} />
      </>)}
      {em(7, 8) && (<>
        <Svg>
          <Rua />{t < q(7, "mas")
            ? <><Carro x={suave(t, C[7] + 0.4, q(7, "mas"), 560, 60)} y={CHAO + 70} s={1.15} rod={-t * 300} vira cor="#e0483e" /><g transform="translate(700,0)"><Agua y={CHAO + 30} /></g></>
            : <><Carro x={540} y={CHAO + 60 + Math.sin(t * 3) * 5} s={1.25} giro={Math.sin(t * 2) * 1.5} /><Agua y={CHAO - 40 - ip(t, q(7, "mas"), C[8], 0, 40)} corr={1.8} /></>}
          <Chuva />
        </Svg>
        <Pilula texto={t < q(7, "mas") ? "✔ MEIA-VOLTA" : "E SE JÁ FICOU PRESO?"} cor={t < q(7, "mas") ? VERDE : VERM} y={150} desde={t < q(7, "mas") ? C[7] : q(7, "mas")} tam={70} />
      </>)}
      {em(8, 11) && (<>
        <Svg>
          <Rua /><Carro x={540} y={CHAO + 60 + Math.sin(t * 3) * 5} s={1.3} giro={Math.sin(t * 2) * 1.2} motorista={t < q(9, "janela")} />
          {t > q(9, "janela") && t < C[10] && <g transform={`translate(${suave(t, q(9, "janela"), C[10], 0, 60)},${-suave(t, q(9, "janela"), C[10], 0, 60)})`}><circle cx={640} cy={CHAO - 250} r={44} fill="#b97a4b" /><path d={`M596,${CHAO - 256}a44,44 0 0 1 86,-16q-44,4 -60,-2z`} fill="#241a16" /><path d={`M640,${CHAO - 200}l90,-60`} stroke="#f2b632" strokeWidth={48} strokeLinecap="round" /></g>}
          {t >= C[10] && <Pessoa x={520} y={CHAO - 320 + Math.sin(t * 3) * 5} s={0.7} passo={6} celular={t > q(10, "ligue")} braco={140} />}
          <Agua y={CHAO - suave(t, C[8], C[10], 0, 120)} corr={1.8} /><Chuva />
          {t < C[9] && <g><circle cx={760} cy={880} r={110} fill="#0c1624" stroke="#fff" strokeWidth={10} /><path d="M760,810v60M718,836a62,62 0 1 0 84,0" stroke="#ff8a8a" strokeWidth={20} fill="none" strokeLinecap="round" /><Xis x={760} y={880} r={84} desde={C[8] + 0.4} /></g>}
          {t >= q(9, "metade") && t < C[10] && <path d={`M150,${CHAO - 20}H930`} stroke={AMAR} strokeWidth={10} strokeDasharray="34 20" />}
          {t > q(10, "não") && <Xis x={900} y={CHAO - 30} r={90} desde={q(10, "não")} />}
        </Svg>
        <Pilula texto="1 • NÃO DÊ PARTIDA" cor={VERDE} y={140} desde={C[8]} tam={60} />
        <Pilula texto="2 • SAIA PELA JANELA" cor={VERDE} y={262} desde={C[9]} tam={60} />
        <Pilula texto="3 • TETO + 193" cor={VERDE} y={384} desde={C[10]} tam={60} />
        <Pilula texto="✖ NÃO PULE NA ÁGUA" cor={VERM} y={506} desde={q(10, "não")} tam={56} />
      </>)}
      {t >= C[11] && (<>
        <Svg><Rua /><Carro x={540} y={CHAO + 60} s={1.2} /><Agua y={CHAO - 60} corr={1.6} /><Chuva /></Svg>
        <Resumo desde={C[11]} titulo="RUA ALAGADA?" linhas={[["✔ DÊ MEIA-VOLTA", VERDE], ["⚠ 30 CM LEVAM UM CARRO", VERM], ["✖ NÃO DÊ PARTIDA", VERM], ["✔ SAIA PELA JANELA", VERDE], ["✔ SUBA NO TETO + 193", VERDE], ["✖ NÃO PULE NA ÁGUA", VERM], ["➜ MANDA PRA ALGUÉM", AMAR]]} />
      </>)}
    </Moldura>
  );
};
