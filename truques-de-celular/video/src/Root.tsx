import React from "react";
import { Composition } from "remotion";
import { FixarConversa } from "./FixarConversa";
import tFixar from "../public/tempos.json";
import { SemSalvar } from "./shorts/SemSalvar";
import tSemSalvar from "../public/SemSalvar/tempos.json";
import { LiberarEspaco } from "./shorts/LiberarEspaco";
import tLiberar from "../public/LiberarEspaco/tempos.json";
import { Bateria } from "./shorts/Bateria";
import tBateria from "../public/Bateria/tempos.json";
import { Escanear } from "./shorts/Escanear";
import tEscanear from "../public/Escanear/tempos.json";
import { ApagarMensagem } from "./shorts/ApagarMensagem";
import tApagar from "../public/ApagarMensagem/tempos.json";

import { ModoEscuro } from "./shorts/ModoEscuro";
import tModoEscuro from "../public/ModoEscuro/tempos.json";
import { OuvirAudio } from "./shorts/OuvirAudio";
import tOuvirAudio from "../public/OuvirAudio/tempos.json";
import { DigitarFalando } from "./shorts/DigitarFalando";
import tDigitarFalando from "../public/DigitarFalando/tempos.json";
import { AcharCelular } from "./shorts/AcharCelular";
import tAcharCelular from "../public/AcharCelular/tempos.json";
import { SenhaWifi } from "./shorts/SenhaWifi";
import tSenhaWifi from "../public/SenhaWifi/tempos.json";
import { SilenciarGrupo } from "./shorts/SilenciarGrupo";
import tSilenciarGrupo from "../public/SilenciarGrupo/tempos.json";
import { Arquivar } from "./shorts/Arquivar";
import tArquivar from "../public/Arquivar/tempos.json";
import { Traduzir } from "./shorts/Traduzir";
import tTraduzir from "../public/Traduzir/tempos.json";
import { GravarTela } from "./shorts/GravarTela";
import tGravarTela from "../public/GravarTela/tempos.json";

import { DuasEtapas, PinChip, Transcrever, PixAproximacao, GolpePix } from "./shorts/Leva2";
import tDuasEtapas from "../public/DuasEtapas/tempos.json";
import tPinChip from "../public/PinChip/tempos.json";
import tTranscrever from "../public/Transcrever/tempos.json";
import tPixAproximacao from "../public/PixAproximacao/tempos.json";
import tGolpePix from "../public/GolpePix/tempos.json";

import { LerEscondido, TrancarConversa, FotoPerfil, FalsaCentral, CelularSeguro } from "./shorts/Leva3";
import tLerEscondido from "../public/LerEscondido/tempos.json";
import tTrancarConversa from "../public/TrancarConversa/tempos.json";
import tFotoPerfil from "../public/FotoPerfil/tempos.json";
import tFalsaCentral from "../public/FalsaCentral/tempos.json";
import tCelularSeguro from "../public/CelularSeguro/tempos.json";

import { FuncoesSecretas, GolpeAdvogado, Clonado, LetrasWhatsApp, ViciCelular } from "./shorts/Leva4";
import tFuncoesSecretas from "../public/FuncoesSecretas/tempos.json";
import tGolpeAdvogado from "../public/GolpeAdvogado/tempos.json";
import tClonado from "../public/Clonado/tempos.json";
import tLetrasWhatsApp from "../public/LetrasWhatsApp/tempos.json";
import tViciCelular from "../public/ViciCelular/tempos.json";

import { MsgApagadas, CelularRapido, Bloqueado, Backup, Enquete } from "./shorts/Leva5";
import tMsgApagadas from "../public/MsgApagadas/tempos.json";
import tCelularRapido from "../public/CelularRapido/tempos.json";
import tBloqueado from "../public/Bloqueado/tempos.json";
import tBackup from "../public/Backup/tempos.json";
import tEnquete from "../public/Enquete/tempos.json";
import { EsconderOnline, StatusEscondido, Figurinha, QuemLeu, TecladoTruques } from "./shorts/Leva6";
import tEsconderOnline from "../public/EsconderOnline/tempos.json";
import tStatusEscondido from "../public/StatusEscondido/tempos.json";
import tFigurinha from "../public/Figurinha/tempos.json";
import tQuemLeu from "../public/QuemLeu/tempos.json";
import tTeclado from "../public/Teclado/tempos.json";

export const FPS = 30;

// Cada short: id (= pasta em public/), componente e tempos da narração
const SHORTS: [string, React.FC, { total: number }][] = [
  ["FixarConversa", FixarConversa, tFixar],
  ["SemSalvar", SemSalvar, tSemSalvar],
  ["LiberarEspaco", LiberarEspaco, tLiberar],
  ["Bateria", Bateria, tBateria],
  ["Escanear", Escanear, tEscanear],
  ["ApagarMensagem", ApagarMensagem, tApagar],
  ["ModoEscuro", ModoEscuro, tModoEscuro],
  ["OuvirAudio", OuvirAudio, tOuvirAudio],
  ["DigitarFalando", DigitarFalando, tDigitarFalando],
  ["AcharCelular", AcharCelular, tAcharCelular],
  ["SenhaWifi", SenhaWifi, tSenhaWifi],
  ["SilenciarGrupo", SilenciarGrupo, tSilenciarGrupo],
  ["Arquivar", Arquivar, tArquivar],
  ["Traduzir", Traduzir, tTraduzir],
  ["GravarTela", GravarTela, tGravarTela],
  ["DuasEtapas", DuasEtapas, tDuasEtapas],
  ["PinChip", PinChip, tPinChip],
  ["Transcrever", Transcrever, tTranscrever],
  ["PixAproximacao", PixAproximacao, tPixAproximacao],
  ["GolpePix", GolpePix, tGolpePix],
  ["LerEscondido", LerEscondido, tLerEscondido],
  ["TrancarConversa", TrancarConversa, tTrancarConversa],
  ["FotoPerfil", FotoPerfil, tFotoPerfil],
  ["FalsaCentral", FalsaCentral, tFalsaCentral],
  ["CelularSeguro", CelularSeguro, tCelularSeguro],
  ["FuncoesSecretas", FuncoesSecretas, tFuncoesSecretas],
  ["GolpeAdvogado", GolpeAdvogado, tGolpeAdvogado],
  ["Clonado", Clonado, tClonado],
  ["LetrasWhatsApp", LetrasWhatsApp, tLetrasWhatsApp],
  ["ViciCelular", ViciCelular, tViciCelular],
  ["MsgApagadas", MsgApagadas, tMsgApagadas],
  ["CelularRapido", CelularRapido, tCelularRapido],
  ["Bloqueado", Bloqueado, tBloqueado],
  ["Backup", Backup, tBackup],
  ["Enquete", Enquete, tEnquete],
  ["EsconderOnline", EsconderOnline, tEsconderOnline],
  ["StatusEscondido", StatusEscondido, tStatusEscondido],
  ["Figurinha", Figurinha, tFigurinha],
  ["QuemLeu", QuemLeu, tQuemLeu],
  ["Teclado", TecladoTruques, tTeclado],
];

export const Root: React.FC = () => (
  <>
    {SHORTS.map(([id, comp, t]) => (
      <Composition key={id} id={id} component={comp} durationInFrames={Math.ceil(t.total * FPS)} fps={FPS} width={1080} height={1920} />
    ))}
  </>
);
