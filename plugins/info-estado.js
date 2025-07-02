import ws from 'ws'

let handler = async (m, { conn, usedPrefix, isRowner }) => {
  const _uptime = process.uptime() * 1000;
  const totalreg = Object.keys(global.db.data.users).length;
  const totalchats = Object.keys(global.db.data.chats).length;

  const uptime = clockString(_uptime);
  const activeConnections = [...new Set(global.conns.filter(c => c.user && c.ws.socket && c.ws.socket.readyState !== ws.CLOSED))];
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'));
  const totalUsers = activeConnections.length;

  // Simulación de tiempo para medir velocidad de respuesta del sistema
  let old = performance.now();
  let now = performance.now();
  let speed = now - old;

  // Uso de memoria
  const used = process.memoryUsage();

  let info = `🔍 Freddy Fazbear Security Protocol v1.3.7 activado ⛓️\n`;
  info += `📡 Sistema: ${botname} - Unidad de observación conectada 🎥\n\n`;
  info += `⚙️ Operador principal: ${etiqueta}\n`;
  info += `⏳ Tiempo activo: ${uptime}\n`;
  info += `📟 Prefijo de comando: [ ${usedPrefix} ]\n`;
  info += `🔢 Versión sistema: ${vs}\n\n`;

  info += `📊 Estadísticas locales (grupo/chat):\n`;
  info += ` - Chats totales: ${chats.length}\n`;
  info += ` - Chats privados: ${chats.length - groupsIn.length}\n`;
  info += ` - Grupos monitorizados: ${groupsIn.length}\n\n`;

  info += `👥 Usuarios registrados: ${totalreg}\n`;
  info += `🤖 Sub-bots activos: ${totalUsers || '0'}\n`;
  info += `🚀 Velocidad de respuesta: ${(speed * 1000).toFixed(0) / 1000} ms\n\n`;

  info += `📚 Memoria usada (RSS): ${(used.rss / 1024 / 1024).toFixed(2)} MB\n`;
  info += `\n— Sistema respaldado por FNaF LATAM™ 👁️`;

  await conn.sendFile(m.chat, banner, 'estado.jpg', info, m);
};

handler.help = ['estado'];
handler.tags = ['info'];
handler.command = ['estado', 'status', 'estate', 'state', 'stado', 'stats'];
handler.register = true;

export default handler;

function clockString(ms) {
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  return `${hours}h ${minutes}m ${seconds}s`;
}
