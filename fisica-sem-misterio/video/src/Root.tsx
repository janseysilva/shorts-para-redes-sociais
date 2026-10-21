import React from "react";
import { Composition } from "remotion";
import { CeuAzul } from "./shorts/CeuAzul";
import { CeuAzulMisto, CeuAzulReal } from "./shorts/CeuAzulReal";
import { ShortRoteiro, type Roteiro } from "./ShortRoteiro";
import type { Tempos } from "./espaco";
import tCeuAzul from "../public/CeuAzul/tempos.json";

import rTrovao from "../roteiros/Trovao.json";
import tTrovao from "../public/Trovao/tempos.json";
import rGelo from "../roteiros/Gelo.json";
import tGelo from "../public/Gelo/tempos.json";
import rAstronautas from "../roteiros/Astronautas.json";
import tAstronautas from "../public/Astronautas/tempos.json";
import rArcoIris from "../roteiros/ArcoIris.json";
import tArcoIris from "../public/ArcoIris/tempos.json";
import rLua from "../roteiros/Lua.json";
import tLua from "../public/Lua/tempos.json";
import rMicroOndas from "../roteiros/MicroOndas.json";
import tMicroOndas from "../public/MicroOndas/tempos.json";
import rMetalGelado from "../roteiros/MetalGelado.json";
import tMetalGelado from "../public/MetalGelado/tempos.json";
import rAviao from "../roteiros/Aviao.json";
import tAviao from "../public/Aviao/tempos.json";
import rPanelaPressao from "../roteiros/PanelaPressao.json";
import tPanelaPressao from "../public/PanelaPressao/tempos.json";
import rSomEspaco from "../roteiros/SomEspaco.json";
import tSomEspaco from "../public/SomEspaco/tempos.json";
import rEstrelas from "../roteiros/Estrelas.json";
import tEstrelas from "../public/Estrelas/tempos.json";
import rColher from "../roteiros/Colher.json";
import tColher from "../public/Colher/tempos.json";
import rInercia from "../roteiros/Inercia.json";
import tInercia from "../public/Inercia/tempos.json";
import rMarSalgado from "../roteiros/MarSalgado.json";
import tMarSalgado from "../public/MarSalgado/tempos.json";
// leva 2 (01/10): 16 a 20
import rNavioAco from "../roteiros/NavioAco.json";
import tNavioAco from "../public/NavioAco/tempos.json";
import rTerraGira from "../roteiros/TerraGira.json";
import tTerraGira from "../public/TerraGira/tempos.json";
import rPorDoSol from "../roteiros/PorDoSol.json";
import tPorDoSol from "../public/PorDoSol/tempos.json";
import rMarNuncaEnche from "../roteiros/MarNuncaEnche.json";
import tMarNuncaEnche from "../public/MarNuncaEnche/tempos.json";
import rAguaOleo from "../roteiros/AguaOleo.json";
import tAguaOleo from "../public/AguaOleo/tempos.json";
// leva 3 (01/10, noite): 21 a 25
import rSolTerra from "../roteiros/SolTerra.json";
import tSolTerra from "../public/SolTerra/tempos.json";
import rPesoMarte from "../roteiros/PesoMarte.json";
import tPesoMarte from "../public/PesoMarte/tempos.json";
import rAlavanca from "../roteiros/Alavanca.json";
import tAlavanca from "../public/Alavanca/tempos.json";
import rBigBang from "../roteiros/BigBang.json";
import tBigBang from "../public/BigBang/tempos.json";
import rTamanhoLua from "../roteiros/TamanhoLua.json";
import tTamanhoLua from "../public/TamanhoLua/tempos.json";
// leva 4 (02/10): 26 a 30
import rVidroEmbaca from "../roteiros/VidroEmbaca.json";
import tVidroEmbaca from "../public/VidroEmbaca/tempos.json";
import rOvoMicro from "../roteiros/OvoMicro.json";
import tOvoMicro from "../public/OvoMicro/tempos.json";
import rFogoAzul from "../roteiros/FogoAzul.json";
import tFogoAzul from "../public/FogoAzul/tempos.json";
import rOvoBoia from "../roteiros/OvoBoia.json";
import tOvoBoia from "../public/OvoBoia/tempos.json";
import rRastroAviao from "../roteiros/RastroAviao.json";
import tRastroAviao from "../public/RastroAviao/tempos.json";
import rCelularEsquenta from "../roteiros/CelularEsquenta.json";
import tCelularEsquenta from "../public/CelularEsquenta/tempos.json";
import rGeloQueima from "../roteiros/GeloQueima.json";
import tGeloQueima from "../public/GeloQueima/tempos.json";
import rPaoMurcha from "../roteiros/PaoMurcha.json";
import tPaoMurcha from "../public/PaoMurcha/tempos.json";
import rGeladeiraEstala from "../roteiros/GeladeiraEstala.json";
import tGeladeiraEstala from "../public/GeladeiraEstala/tempos.json";
import rAviaoDeLado from "../roteiros/AviaoDeLado.json";
import tAviaoDeLado from "../public/AviaoDeLado/tempos.json";
import rOuvidoAviao from "../roteiros/OuvidoAviao.json";
import tOuvidoAviao from "../public/OuvidoAviao/tempos.json";
import rCebolaChorar from "../roteiros/CebolaChorar.json";
import tCebolaChorar from "../public/CebolaChorar/tempos.json";
import rLeiteSobe from "../roteiros/LeiteSobe.json";
import tLeiteSobe from "../public/LeiteSobe/tempos.json";
import rChuveiroChoque from "../roteiros/ChuveiroChoque.json";
import tChuveiroChoque from "../public/ChuveiroChoque/tempos.json";
import rAviaoCurva from "../roteiros/AviaoCurva.json";
import tAviaoCurva from "../public/AviaoCurva/tempos.json";
import rCopoStanley from "../roteiros/CopoStanley.json";
import tCopoStanley from "../public/CopoStanley/tempos.json";
import rVozGravacao from "../roteiros/VozGravacao.json";
import tVozGravacao from "../public/VozGravacao/tempos.json";
import rBoxEstoura from "../roteiros/BoxEstoura.json";
import tBoxEstoura from "../public/BoxEstoura/tempos.json";
import rTomadaDerrete from "../roteiros/TomadaDerrete.json";
import tTomadaDerrete from "../public/TomadaDerrete/tempos.json";
import rNuvemNaoCai from "../roteiros/NuvemNaoCai.json";
import tNuvemNaoCai from "../public/NuvemNaoCai/tempos.json";
import rCocaVidro from "../roteiros/CocaVidro.json";
import tCocaVidro from "../public/CocaVidro/tempos.json";
import rBateriaIncha from "../roteiros/BateriaIncha.json";
import tBateriaIncha from "../public/BateriaIncha/tempos.json";
import rCervejaGelo from "../roteiros/CervejaGelo.json";
import tCervejaGelo from "../public/CervejaGelo/tempos.json";
import rTremTrilho from "../roteiros/TremTrilho.json";
import tTremTrilho from "../public/TremTrilho/tempos.json";
import rImasRepelem from "../roteiros/ImasRepelem.json";
import tImasRepelem from "../public/ImasRepelem/tempos.json";
import rSilencio from "../roteiros/Silencio.json";
import tSilencio from "../public/Silencio/tempos.json";
import rFundoMar from "../roteiros/FundoMar.json";
import tFundoMar from "../public/FundoMar/tempos.json";
import rViagemTempo from "../roteiros/ViagemTempo.json";
import tViagemTempo from "../public/ViagemTempo/tempos.json";
import rDedosEnrugam from "../roteiros/DedosEnrugam.json";
import tDedosEnrugam from "../public/DedosEnrugam/tempos.json";
import rOndaNazare from "../roteiros/OndaNazare.json";
import tOndaNazare from "../public/OndaNazare/tempos.json";
import rPassaroFio from "../roteiros/PassaroFio.json";
import tPassaroFio from "../public/PassaroFio/tempos.json";
import rTrianguloBermudas from "../roteiros/TrianguloBermudas.json";
import tTrianguloBermudas from "../public/TrianguloBermudas/tempos.json";
import rLugarQuente from "../roteiros/LugarQuente.json";
import tLugarQuente from "../public/LugarQuente/tempos.json";
import rLugarAlto from "../roteiros/LugarAlto.json";
import tLugarAlto from "../public/LugarAlto/tempos.json";
import rMarDrake from "../roteiros/MarDrake.json";
import tMarDrake from "../public/MarDrake/tempos.json";
import rTerraAneis from "../roteiros/TerraAneis.json";
import tTerraAneis from "../public/TerraAneis/tempos.json";
import rLugarSeco from "../roteiros/LugarSeco.json";
import tLugarSeco from "../public/LugarSeco/tempos.json";
import rLugarChuva from "../roteiros/LugarChuva.json";
import tLugarChuva from "../public/LugarChuva/tempos.json";
import rLugarEscuro from "../roteiros/LugarEscuro.json";
import tLugarEscuro from "../public/LugarEscuro/tempos.json";
import rRioFerve from "../roteiros/RioFerve.json";
import tRioFerve from "../public/RioFerve/tempos.json";
import rCidadeEspelhos from "../roteiros/CidadeEspelhos.json";
import tCidadeEspelhos from "../public/CidadeEspelhos/tempos.json";
import { Longo, type RoteiroLongo, type TemposLongo } from "./Longo";
import rMultigerador from "../roteiros/Multigerador.json";
import tMultigerador from "../public/Multigerador/tempos.json";
import rApagao from "../roteiros/Apagao.json";
import tApagao from "../public/Apagao/tempos.json";
import rElNino from "../roteiros/ElNino.json";
import tElNino from "../public/ElNino/tempos.json";
import rSolExplodir from "../roteiros/SolExplodir.json";
import tSolExplodir from "../public/SolExplodir/tempos.json";
import rElNinoNome from "../roteiros/ElNinoNome.json";
import tElNinoNome from "../public/ElNinoNome/tempos.json";
import rOrionidas from "../roteiros/Orionidas.json";
import tOrionidas from "../public/Orionidas/tempos.json";
import rTsunamiRecua from "../roteiros/TsunamiRecua.json";
import tTsunamiRecua from "../public/TsunamiRecua/tempos.json";
import rCidadeAlta from "../roteiros/CidadeAlta.json";
import tCidadeAlta from "../public/CidadeAlta/tempos.json";
import rVulcao from "../roteiros/Vulcao.json";
import tVulcao from "../public/Vulcao/tempos.json";
import rOymyakon from "../roteiros/Oymyakon.json";
import tOymyakon from "../public/Oymyakon/tempos.json";
import rTornado from "../roteiros/Tornado.json";
import tTornado from "../public/Tornado/tempos.json";
import rTerraParar from "../roteiros/TerraParar.json";
import tTerraParar from "../public/TerraParar/tempos.json";
import rMeteoro from "../roteiros/Meteoro.json";
import tMeteoro from "../public/Meteoro/tempos.json";
import rBuracoNegro from "../roteiros/BuracoNegro.json";
import tBuracoNegro from "../public/BuracoNegro/tempos.json";
import rMacaEscurece from "../roteiros/MacaEscurece.json";
import tMacaEscurece from "../public/MacaEscurece/tempos.json";

export const FPS = 30;

// Shorts feitos a partir do roteiro (estilo misto). A ordem aqui é a ordem de publicação (2 a 55; o 1 é o CeuAzulMisto).
const ROTEIROS: [Roteiro, Tempos][] = [
  [rTrovao, tTrovao], [rGelo, tGelo], [rAstronautas, tAstronautas], [rArcoIris, tArcoIris], [rLua, tLua],
  [rMicroOndas, tMicroOndas], [rMetalGelado, tMetalGelado], [rAviao, tAviao], [rPanelaPressao, tPanelaPressao],
  [rSomEspaco, tSomEspaco], [rEstrelas, tEstrelas], [rColher, tColher], [rInercia, tInercia], [rMarSalgado, tMarSalgado],
  [rNavioAco, tNavioAco], [rTerraGira, tTerraGira], [rPorDoSol, tPorDoSol], [rMarNuncaEnche, tMarNuncaEnche], [rAguaOleo, tAguaOleo],
  [rSolTerra, tSolTerra], [rPesoMarte, tPesoMarte], [rAlavanca, tAlavanca], [rBigBang, tBigBang], [rTamanhoLua, tTamanhoLua],
  [rVidroEmbaca, tVidroEmbaca], [rOvoMicro, tOvoMicro], [rFogoAzul, tFogoAzul], [rOvoBoia, tOvoBoia], [rRastroAviao, tRastroAviao],
  [rCelularEsquenta, tCelularEsquenta], [rGeloQueima, tGeloQueima], [rPaoMurcha, tPaoMurcha], [rGeladeiraEstala, tGeladeiraEstala], [rAviaoDeLado, tAviaoDeLado],
  [rOuvidoAviao, tOuvidoAviao], [rCebolaChorar, tCebolaChorar], [rLeiteSobe, tLeiteSobe], [rChuveiroChoque, tChuveiroChoque], [rAviaoCurva, tAviaoCurva],
  [rCopoStanley, tCopoStanley], [rVozGravacao, tVozGravacao], [rBoxEstoura, tBoxEstoura], [rTomadaDerrete, tTomadaDerrete], [rNuvemNaoCai, tNuvemNaoCai],
  [rCocaVidro, tCocaVidro], [rBateriaIncha, tBateriaIncha], [rCervejaGelo, tCervejaGelo], [rTremTrilho, tTremTrilho], [rImasRepelem, tImasRepelem],
  [rSilencio, tSilencio], [rFundoMar, tFundoMar], [rViagemTempo, tViagemTempo], [rDedosEnrugam, tDedosEnrugam], [rMacaEscurece, tMacaEscurece],
  [rOndaNazare, tOndaNazare], [rPassaroFio, tPassaroFio], [rTrianguloBermudas, tTrianguloBermudas], [rLugarQuente, tLugarQuente], [rLugarAlto, tLugarAlto], [rMarDrake, tMarDrake], [rTerraAneis, tTerraAneis], [rLugarSeco, tLugarSeco], [rLugarChuva, tLugarChuva], [rLugarEscuro, tLugarEscuro], [rRioFerve, tRioFerve], [rCidadeEspelhos, tCidadeEspelhos], [rElNinoNome, tElNinoNome], [rOrionidas, tOrionidas], [rTsunamiRecua, tTsunamiRecua], [rCidadeAlta, tCidadeAlta],
];

// Vídeos longos (horizontais). abertura = [título grande, subtítulo]; fundoFinal = clipe atrás da tela final.
const LONGOS: [RoteiroLongo, TemposLongo, [string, string], string][] = [
  [rVulcao as RoteiroLongo, tVulcao, ["VULCÃO", "Por que a Terra cospe fogo?"], "Vulcao_48"],
  [rOymyakon as RoteiroLongo, tOymyakon, ["OYMYAKON", "A vila mais fria do mundo"], "Oymyakon_41"],
  [rTornado as RoteiroLongo, tTornado, ["TORNADO", "Como nasce um monstro de vento"], "Tornado_42"],
  [rTerraParar as RoteiroLongo, tTerraParar, ["TERRA PARADA", "E se ela parasse de girar?"], "TerraParar_40"],
  [rMeteoro as RoteiroLongo, tMeteoro, ["METEORO", "O dia em que os dinossauros acabaram"], "Meteoro_46"],
  [rBuracoNegro as RoteiroLongo, tBuracoNegro, ["BURACO NEGRO", "Onde nem a luz escapa"], "BuracoNegro_46"],
  [rMultigerador as RoteiroLongo, tMultigerador, ["ENERGIA INFINITA?", "O Multigerador Quântico explicado"], "Multigerador_15"],
  [rApagao as RoteiroLongo, tApagao, ["SEM ENERGIA", "E se o Brasil apagasse por 3 dias?"], "Apagao_49"],
  [rElNino as RoteiroLongo, tElNino, ["SUPER EL NIÑO", "O monstro do Pacífico chegando ao Brasil"], "ElNino_48"],
  [rSolExplodir as RoteiroLongo, tSolExplodir, ["E SE O SOL EXPLODISSE?", "O que a física diz que aconteceria"], "SolExplodir_45"],
];

const Comp: React.FC<{ id: string; comp: React.FC; total: number }> = ({ id, comp, total }) => (
  <Composition id={id} component={comp} durationInFrames={Math.ceil(total * FPS)} fps={FPS} width={1080} height={1920} />
);

export const Root: React.FC = () => (
  <>
    <Comp id="CeuAzul" comp={CeuAzul} total={tCeuAzul.total} />
    <Comp id="CeuAzulReal" comp={CeuAzulReal} total={tCeuAzul.total} />
    <Comp id="CeuAzulMisto" comp={CeuAzulMisto} total={tCeuAzul.total} />
    {ROTEIROS.map(([r, t]) => (
      <Composition key={r.id} id={r.id} component={ShortRoteiro} defaultProps={{ roteiro: r, tempos: t }}
        durationInFrames={Math.ceil(t.total * FPS)} fps={FPS} width={1080} height={1920} />
    ))}
    {LONGOS.map(([r, t, ab, fundo]) => (
      <Composition key={r.id} id={r.id} component={Longo} defaultProps={{ roteiro: r, tempos: t, abertura: ab, fundoFinal: fundo }}
        durationInFrames={Math.ceil(t.total * FPS)} fps={FPS} width={1920} height={1080} />
    ))}
  </>
);
