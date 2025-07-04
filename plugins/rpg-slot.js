// Código adaptado por Freddy AI Response 🧠 — Sistema FazWatch v1.3.7

import { delay } from "@whiskeysockets/baileys";

const handler = async (m, { args, usedPrefix, command, conn }) => {
  const user = global.db.data.users[m.sender];
  const apuestaMinima = 100;
  const cooldown = 10000; // 10 segundos

  if (!args[0] || isNaN(args[0]) || parseInt(args[0]) <= 0)
    throw `${emoji} Ingreso inválido. Introduzca la cantidad de XP a apostar.`;

  const apuesta = parseInt(args[0]);

  if (Date.now() - user.lastslot < cooldown)
    throw `${emoji2} ⚠️ Protocolo de seguridad activo.\n⏳ Debes esperar ${msToTime(cooldown - (Date.now() - user.lastslot))} para reactivar #slot.`;

  if (apuesta < apuestaMinima)
    throw `${emoji2} ERROR: La apuesta mínima es de ${apuestaMinima} XP.`;

  if (user.exp < apuesta)
    throw `${emoji2} ALERTA: XP insuficiente para procesar la apuesta solicitada.`;

  const emojis = ['💴', '💵', '💶'];

  const getRandomEmojis = () => {
    return {
      x: Array.from({ length: 3 }, () => emojis[Math.floor(Math.random() * emojis.length)]),
      y: Array.from({ length: 3 }, () => emojis[Math.floor(Math.random() * emojis.length)]),
      z: Array.from({ length: 3 }, () => emojis[Math.floor(Math.random() * emojis.length)]),
    };
  };

  const initialText = `
🎰 Freddy Fazbear Security Protocol v1.3.7 activado ⛓️
🎯 INICIANDO RONDA DE SLOT MACHINE...

────────`;

  let { key } = await conn.sendMessage(m.chat, { text: initialText.trim() }, { quoted: m });

  // Animación simulada con pausas y glitches
  for (let i = 0; i < 5; i++) {
    const { x, y, z } = getRandomEmojis();
    const animationText = `
🎰 Ronda #${i + 1} — Unidad de observación conectada 🎥

${x[0]} : ${y[0]} : ${z[0]}
${x[1]} : ${y[1]} : ${z[1]}
${x[2]} : ${y[2]} : ${z[2]}

────────
...procesando resultado... --::SEQUENCE_BREAK::--`;
    await conn.sendMessage(m.chat, { text: animationText.trim(), edit: key }, { quoted: m });
    await delay(300);
  }

  const { x, y, z } = getRandomEmojis();
  let resultadoTexto;
  if (x[0] === y[0] && y[0] === z[0]) {
    user.exp += apuesta; // Gana apuesta adicional igual a la cantidad apostada
    resultadoTexto = `✅ GANANCIA CRÍTICA DETECTADA\n🎁 +${apuesta * 2} XP añadido a tu balance.`;
  } else if (x[0] === y[0] || x[0] === z[0] || y[0] === z[0]) {
    user.exp += 10;
    resultadoTexto = `⚠️ CASI LOGRASTE EL JACKPOT\n+10 XP de consolación añadido. Sigue intentando...`;
  } else {
    user.exp -= apuesta;
    resultadoTexto = `❌ FALLA EN EL SISTEMA DE APUESTAS\n- ${apuesta} XP descontados.`;
  }

  user.lastslot = Date.now();

  const finalText = `
🎰 RESULTADO FINAL — Freddy Fazbear Security Protocol

${x[0]} : ${y[0]} : ${z[0]}
${x[1]} : ${y[1]} : ${z[1]}
${x[2]} : ${y[2]} : ${z[2]}

────────
🎲 ${resultadoTexto}

— Sistema respaldado por FNaF LATAM™
`;

  await conn.sendMessage(m.chat, { text: finalText.trim(), edit: key }, { quoted: m });
};

handler.help = ['slot <cantidad>'];
handler.tags = ['economy'];
handler.group = true;
handler.register = true;
handler.command = ['slot'];

export default handler;

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${minutes} m ${seconds} s`;
}
