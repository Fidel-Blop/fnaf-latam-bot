let handler = async (m, { conn }) => {
  let uptimeSec = process.uptime();
  let tiempoActivo = rTime(uptimeSec);

  let mensaje = `
⏳ Freddy Fazbear Security Protocol v1.3.7 activado ⛓️

📡 Sistema de vigilancia en línea:
→ Tiempo activo desde último reinicio:
*${tiempoActivo}*

👁️ Unidad de observación reporta: funcionamiento estable.

— Sistema respaldado por FNaF LATAM™
`.trim();

  await conn.reply(m.chat, mensaje, m);
}

handler.help = ['runtime'];
handler.tags = ['main'];
handler.command = ['runtime', 'uptime'];

export default handler;

function rTime(seconds) {
  seconds = Number(seconds);
  let d = Math.floor(seconds / (3600 * 24));
  let h = Math.floor((seconds % (3600 * 24)) / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = Math.floor(seconds % 60);
  let dDisplay = d > 0 ? d + (d === 1 ? " día, " : " días, ") : "";
  let hDisplay = h > 0 ? h + (h === 1 ? " hora, " : " horas, ") : "";
  let mDisplay = m > 0 ? m + (m === 1 ? " minuto, " : " minutos, ") : "";
  let sDisplay = s > 0 ? s + (s === 1 ? " segundo" : " segundos") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}
