const handler = async (m, { conn, command, text }) => {
  if (!text) return conn.reply(m.chat, `👁️ *Sistema de escaneo inactivo.*\n\n⛓️ Ingrese el nombre o mención del sujeto para iniciar el análisis.`, m);

  const porcentaje = Math.floor(Math.random() * 101); // 0 a 100
  let emoji = '';
  let descripción = '';
  let categoría = command.toUpperCase();

  switch (command) {
    case 'gay':
      emoji = '🏳️‍🌈';
      descripción = porcentaje < 50
        ? `⚙️ *${text.toUpperCase()}* tiene un índice gay de *${porcentaje}%* ${emoji}\n> Registro bajo... comportamiento estable.`
        : porcentaje > 100
        ? `📡 *${text.toUpperCase()}* ha superado los límites de calibración con *${porcentaje}%* gay ${emoji}\n> Inestabilidad emocional detectada.`
        : `🧠 *${text.toUpperCase()}* tiene un *${porcentaje}%* de energía gay ${emoji}\n> Compatible con los patrones internos de Freddy Fazbear Entertainment™.`;
      break;

    case 'lesbiana':
      emoji = '🌸';
      descripción = porcentaje < 50
        ? `🦴 *${text.toUpperCase()}* muestra un *${porcentaje}%* de código lesbiano ${emoji}\n> Muestra débil, revisar sistema.`
        : porcentaje > 100
        ? `📡 *${text.toUpperCase()}* sobrepasa el umbral con *${porcentaje}%* ${emoji}\n> Actividad intensa registrada.`
        : `🔊 *${text.toUpperCase()}* se encuentra en *${porcentaje}%* de amor lésbico ${emoji}\n> Monitoreo en curso.`;
      break;

    case 'pajero':
    case 'pajera':
      emoji = '😏💦';
      descripción = porcentaje < 50
        ? `💤 *${text.toUpperCase()}* muestra *${porcentaje}%* de actividad solitaria ${emoji}\n> Estado: pasivo.`
        : porcentaje > 100
        ? `🔥 *${text.toUpperCase()}* tiene *${porcentaje}%* de acumulación energética ${emoji}\n> Posible sobrecarga...`
        : `📼 *${text.toUpperCase()}* se encuentra en *${porcentaje}%* de uso frecuente ${emoji}\n> Patrón repetitivo detectado.`;
      break;

    case 'puto':
    case 'puta':
      emoji = '🥵';
      descripción = porcentaje < 50
        ? `🔍 *${text.toUpperCase()}* está a *${porcentaje}%* en el índice de deseo ${emoji}\n> Nivel contenido.`
        : porcentaje > 100
        ? `🔥 *${text.toUpperCase()}* ha alcanzado niveles máximos ${emoji}\n> ALARMA: comportamiento hipersocial.`
        : `🧩 *${text.toUpperCase()}* presenta *${porcentaje}%* de magnetismo social ${emoji}\n> Estado: seductor/a.`;
      break;

    case 'manco':
    case 'manca':
      emoji = '🎮💀';
      descripción = porcentaje < 50
        ? `🛠️ *${text.toUpperCase()}* tiene un *${porcentaje}%* de torpeza técnica ${emoji}\n> Aún puedes mejorar.`
        : porcentaje > 100
        ? `🧷 *${text.toUpperCase()}* excede los parámetros de ineficiencia ${emoji}\n> Entrenamiento urgente recomendado.`
        : `🔧 *${text.toUpperCase()}* se encuentra en *${porcentaje}%* de coordinación deficiente ${emoji}`;
      break;

    case 'rata':
      emoji = '🐁';
      descripción = porcentaje < 50
        ? `🧀 *${text.toUpperCase()}* está a *${porcentaje}%* de roedorismo ${emoji}\n> No representa amenaza inmediata.`
        : porcentaje > 100
        ? `🪤 *${text.toUpperCase()}* se ha infiltrado con *${porcentaje}%* ${emoji}\n> Activar trampas.`
        : `⚙️ *${text.toUpperCase()}* demuestra un *${porcentaje}%* de código roedor ${emoji}`;
      break;

    case 'prostituto':
    case 'prostituta':
      emoji = '💋';
      descripción = porcentaje < 50
        ? `💬 *${text.toUpperCase()}* presenta *${porcentaje}%* de interacción comercial ${emoji}\n> Aún puedes decir que no.`
        : porcentaje > 100
        ? `💼 *${text.toUpperCase()}* ha alcanzado niveles profesionales ${emoji}\n> Tarifa no disponible.`
        : `🪪 *${text.toUpperCase()}* se encuentra en *${porcentaje}%* de atractivo transaccional ${emoji}`;
      break;

    default:
      return m.reply(`⛔ Comando no reconocido por el sistema central.`);
  }

  const frasesFinales = [
    '📡 Diagnóstico completado.',
    '🎥 Análisis finalizado.',
    '🧠 Datos cargados en el archivo central.',
  ];
  const firma = '— Informe firmado por el subsistema de IA de FNaF LATAM™';
  const mensajeFinal = `🕶️ *[ MÓDULO DE EVALUACIÓN ${categoría} ACTIVADO ]*

${descripción}

${frasesFinales.getRandom()}
${firma}`;

  const barraProgreso = [
    "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
    "《 ████▒▒▒▒▒▒▒▒》30%",
    "《 ███████▒▒▒▒▒》50%",
    "《 ██████████▒▒》80%",
    "《 ████████████》100%"
  ];

  const { key } = await conn.sendMessage(m.chat, { text: `👁️ Iniciando escaneo del sujeto: *${text.toUpperCase()}*`, mentions: conn.parseMention(mensajeFinal) }, { quoted: m });

  for (let i = 0; i < barraProgreso.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 700));
    await conn.sendMessage(m.chat, { text: barraProgreso[i], edit: key }, { quoted: m });
  }

  await conn.sendMessage(m.chat, { text: mensajeFinal, edit: key, mentions: conn.parseMention(mensajeFinal) }, { quoted: m });
};

handler.help = ['gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituta', 'prostituto'].map(cmd => `${cmd} <@tag|nombre>`);
handler.tags = ['fun'];
handler.command = ['gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituta', 'prostituto'];
handler.register = true;
handler.group = true;

export default handler;
