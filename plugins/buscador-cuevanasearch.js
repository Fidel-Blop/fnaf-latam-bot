import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`👁 *Parámetro incompleto.*\n📼 Ingrese el nombre de una película para iniciar el escaneo del archivo de medios.\n\n📌 *Ejemplo:* /cuevana Deadpool`);

  try {
    let res = await fetch(`https://delirius-apiofc.vercel.app/search/cuevana?q=${encodeURIComponent(text)}`)
    let json = await res.json()

    let resultado = `🎥 ◜ ARCHIVO MULTIMEDIA: CUEVANA ◞\n📡 Consulta para: *"${text}"*\n\n🧠 Resultados obtenidos:\n━━━━━━━━━━━━━━━━━━`;

    json.data.forEach((app, index) => {
      resultado += `\n\n⚙️ *[#${index + 1}]*`;
      resultado += `\n📽️ *Título:* ${app.title}`;
      resultado += `\n📚 *Descripción:* ${app.description}`;
      resultado += `\n🖼️ *Imagen:* ${app.image}`;
      resultado += `\n🔗 *Enlace:* ${app.link}`;
      resultado += `\n────────────────────`;
    });

    resultado += `\n\n⛓️ Consulta completada con éxito.\n— Sistema respaldado por FNaF LATAM™`;

    m.reply(resultado)

  } catch (error) {
    console.error('⚠️ Error en módulo Cuevana:', error)
    m.reply(`❌ *ERROR DE ARCHIVO*\n⚙️ No se pudo completar la búsqueda.\nInténtalo más tarde.\n\n— Sistema respaldado por FNaF LATAM™`)
  }
}

handler.command = ['cuevanasearch', 'cuevana']

export default handler
