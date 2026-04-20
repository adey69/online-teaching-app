// ─── Agora RTC Token Generator (AccessToken2 / 007) ──────────────────────────
// Pure-JS using crypto-js hex encoding — no custom WordArray construction.
// Ref: AgoraIO/Tools → DynamicKey/AgoraDynamicKey/nodejs/src/AccessToken2.js
//
// ⚠️  DEVELOPMENT ONLY — the App Certificate must never ship in production.
//     Move token generation to a backend server before going live.

import CryptoJS from 'crypto-js';
import { Config } from '../config';

// ── Binary packing (little-endian) ───────────────────────────────────────────

function u16(v: number): number[] {
  return [v & 0xff, (v >> 8) & 0xff];
}

function u32(v: number): number[] {
  const n = v >>> 0;
  return [n & 0xff, (n >> 8) & 0xff, (n >> 16) & 0xff, (n >> 24) & 0xff];
}

// ASCII string → byte array (App ID, cert, channel IDs are all ASCII)
function ascii(s: string): number[] {
  const out: number[] = [];
  for (let i = 0; i < s.length; i++) { out.push(s.charCodeAt(i) & 0xff); }
  return out;
}

// Length-prefixed string (uint16LE length + bytes)
function packedStr(s: string): number[] {
  const b = ascii(s);
  return [...u16(b.length), ...b];
}

// ── Hex helpers ───────────────────────────────────────────────────────────────

function toHex(bytes: number[]): string {
  return bytes.map(b => (b & 0xff).toString(16).padStart(2, '0')).join('');
}

function fromHex(hex: string): number[] {
  const out: number[] = [];
  for (let i = 0; i < hex.length; i += 2) {
    out.push(parseInt(hex.slice(i, i + 2), 16));
  }
  return out;
}

// ── Crypto (via CryptoJS hex API) ─────────────────────────────────────────────

function hmac(keyBytes: number[], dataBytes: number[]): number[] {
  const sig = CryptoJS.HmacSHA256(
    CryptoJS.enc.Hex.parse(toHex(dataBytes)),
    CryptoJS.enc.Hex.parse(toHex(keyBytes)),
  );
  return fromHex(sig.toString(CryptoJS.enc.Hex));
}

function toBase64(bytes: number[]): string {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(toHex(bytes)));
}

// ── AccessToken2 (007) ────────────────────────────────────────────────────────

export function generateRtcToken(channelId: string): string {
  const appId   = Config.agora.appId;
  const appCert = Config.agora.appCertificate;

  if (!appId || !appCert) {
    throw new Error('[Agora] AGORA_APP_ID or AGORA_APP_CERTIFICATE missing from .env');
  }

  const ttl  = 4 * 60 * 60;
  const salt = ((Math.floor(Math.random() * 0xffffffff)) + 1) >>> 0;
  const ts   = (Math.floor(Date.now() / 1000) + ttl) >>> 0;

  // Stage 1: signing key = HMAC-SHA256(appCert, appId + salt + ts)
  const signingKey = hmac(
    ascii(appCert),
    [...ascii(appId), ...u32(salt), ...u32(ts)],
  );

  // Stage 2: token body
  const body: number[] = [
    ...u16(3),             // version string length
    ...ascii('007'),       // version
    ...ascii(appId),       // 32-char App ID (no length prefix)
    ...u32(ttl),           // token TTL in seconds
    ...u32(salt),
    ...u32(ts),
    ...u16(1),             // 1 service
    ...u16(1),             // service type = RTC
    ...packedStr(channelId),    // channel name (length-prefixed)
    ...packedStr('0'),          // uid as string "0" (any uid)
    ...u16(4),             // 4 privileges
    ...u16(1), ...u32(ttl),  // JoinChannel
    ...u16(2), ...u32(ttl),  // PublishAudio
    ...u16(3), ...u32(ttl),  // PublishVideo
    ...u16(4), ...u32(ttl),  // PublishData
  ];

  // Stage 3: signature = HMAC-SHA256(signingKey, body)
  const signature = hmac(signingKey, body);

  // Stage 4: base64(u16(sigLen) + sig + body)
  return toBase64([...u16(signature.length), ...signature, ...body]);
}
