import fetch from 'node-fetch';

var handler = async (m, { conn, usedPrefix, command, text }) => {
  const emoji = '🦊';
  const emoji2 = '🔍';
  const firma = '\n\n🎭 *Respaldado por FNAF LATAM* 🎭';

  if (!text) {
    return conn.reply(
      m.chat,
      `${emoji} *Debes ingresar el nombre de un anime.*\n\n📌 _Ejemplo:_ *${usedPrefix + command} Roshidere*${firma}`,
      m
    );
  }

  let res = await fetch('https://api.jikan.moe/v4/manga?q=' + text);
  if (!res.ok) return conn.reply(m.chat, `⚠️ Ocurrió un error al buscar el anime.${firma}`, m);

  let json = await res.json();
  if (!json.data || json.data.length === 0)
    return conn.reply(m.chat, `❌ No se encontró ningún resultado para: *${text}*.${firma}`, m);

  let { chapters, title_japanese, url, type, score, members, background, status, volumes, synopsis, favorites } =
    json.data[0];
  let author = json.data[0].authors[0].name;

  let animeInfo = `🎬 *INFORMACIÓN DEL ANIME* 🎬
  
📖 *Título:* ${title_japanese || 'Desconocido'}
📚 *Capítulos:* ${chapters || 'N/A'}
📺 *Tipo:* ${type || 'Desconocido'}
📦 *Estado:* ${status || 'Desconocido'}
📁 *Volúmenes:* ${volumes || 'N/A'}
💖 *Favoritos:* ${favorites || '0'}
⭐ *Puntaje:* ${score || 'Sin puntaje'}
👥 *Miembros:* ${members || '0'}
👨‍💻 *Autor:* ${author || 'Desconocido'}
🌐 *URL:* ${url || 'N/A'}

📝 *Sinopsis:*
${synopsis || 'Sin información disponible.'}

🕯 *Contexto adicional:*
${background || 'Sin contexto adicional disponible.'}${firma}`;

  conn.sendFile(
    m.chat,
    json.data[0].images.jpg.image_url,
    'anime.jpg',
    animeInfo,
    fkontak,
    m
  );
};

handler.help = ['infoanime'];
handler.tags = ['anime'];
handler.group = true;
handler.register = true;
handler.command = ['infoanime', 'animeinfo'];

export default handler;
