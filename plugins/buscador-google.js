import fetch from 'node-fetch';

let handler = async (m, { text }) => {
  if (!text) {
    m.reply(`👁 *Ingreso incompleto.*\n📎 Por favor, proporciona el término que deseas rastrear en la red archivada de Google.\n\n📌 Ejemplo: /google Animatronics Fazbear`);
    return;
  }

  const apiUrl = `https://delirius-apiofc.vercel.app/search/googlesearch?query=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.status || !result.data || result.data.length === 0) {
      m.reply('⚠️ No se encontraron resultados relevantes en el núcleo de búsqueda.');
      return;
    }

    let output = `📡 *SISTEMA DE RASTREO GOOGLE*\n🔎 Consulta: *"${text}"*\n\n🧠 Resultado encontrado:\n━━━━━━━━━━━━━━━━━━`;

    result.data.slice(0, 1).forEach((item, index) => {
      output += `\n\n⚙️ *#${index + 1}*`;
      output += `\n🗂️ *Título:* ${item.title}`;
      output += `\n📖 *Descripción:* ${item.description}`;
      output += `\n🔗 *URL:* ${item.url}`;
    });

    output += `\n\n✅ Consulta finalizada.\n— Sistema respaldado por FNaF LATAM™`;

    await m.react('✅')
    m.reply(output);

  } catch (error) {
    console.error('❌ Falla en el módulo de rastreo:', error);
    m.reply(`🚨 *ERROR DEL SISTEMA*\nNo se pudo completar la operación de búsqueda.\n\n— Sistema respaldado por FNaF LATAM™`);
  }
};

handler.command = ['google'];

export default handler;
