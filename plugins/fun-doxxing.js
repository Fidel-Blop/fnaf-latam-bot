// Código creado por LAN, sígueme en IG https://www.instagram.com/lansg___/

import { performance } from 'perf_hooks';

const handler = async (m, { conn, text }) => {
  const start = performance.now();
  const end = performance.now();
  const executionTime = (end - start);

  async function loading() {
    var hawemod = [
      "🔪 Iniciando protocolo de infiltración...",
      " █ 10% — Accediendo a cámaras de seguridad",
      " █ █ 20% — Localizando animatrónicos activos",
      " █ █ █ 30% — Rompiendo cortafuegos digitales",
      " █ █ █ █ 40% — Interceptando señales hostiles",
      " █ █ █ █ █ 50% — Descifrando datos clasificados",
      " █ █ █ █ █ █ 60% — Reprogramando seguridad interna",
      " █ █ █ █ █ █ █ 70% — Capturando registros del sistema",
      " █ █ █ █ █ █ █ █ 80% — Ocultando huellas digitales",
      " █ █ █ █ █ █ █ █ █ 90% — Preparando extracción de datos",
      " █ █ █ █ █ █ █ █ █ █ 100% — Estableciendo conexión segura",
      "⚠️ ERROR 404: Servidor de Freddy's no responde",
      "📡 Conexión al dispositivo establecida... Recibiendo datos...",
      "📂 Extracción completa: borrando evidencias y malware...",
      "✔️ HACKEO FINALIZADO CON ÉXITO",
      "📤 Enviando documentos de registro al administrador...",
      "✅ DATOS ENVIADOS. Conexión terminada",
      "🧹 Registros temporales limpiados"
    ];

    let { key } = await conn.sendMessage(m.chat, { text: `☠️ *¡Iniciando doxxeo FNaF LATAM!* ☠️` }, { quoted: m });

    for (let i = 0; i < hawemod.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await conn.sendMessage(m.chat, { text: hawemod[i], edit: key }, { quoted: m });
    }
  }

  loading();
};

handler.help = ['doxxing <nombre> | <@tag>'];
handler.tags = ['fun'];
handler.command = ['doxxing'];
handler.group = true;
handler.register = true;

export default handler;

function getRandomValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
