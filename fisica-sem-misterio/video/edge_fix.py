"""Desde 12/10/2026 o host antigo (speech.platform.bing.com) responde 403 na síntese.
Usa o host oficial novo da Microsoft, como no PR #491 do edge-tts (mesma voz e mesmo token).
Quando sair uma versão nova do edge-tts com a correção, este arquivo pode ser apagado."""
import edge_tts.communicate as _c
from edge_tts.constants import TRUSTED_CLIENT_TOKEN as _T

_c.WSS_URL = f"wss://api.msedgeservices.com/tts/cognitiveservices/websocket/v1?Ocp-Apim-Subscription-Key={_T}"
