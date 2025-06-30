import { search, download } from 'aptoide-scraper'

var handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, `👁 *MONITOREO INCOMPLETO*\n\n⚠️ Por favor, ingrese el nombre de la APK a escanear e instalar.`, m)

  try {
    await m.react(rwait)

    conn.reply(m.chat, `📡 *SISTEMA DE INSTALACIÓN REMOTA ACTIVADO...*\n\n🧠 Procesando la solicitud. Espere unos momentos mientras la base de datos es escaneada...`, m)

    let searchResult = await search(text)
    let apkData = await download(searchResult[0].id)

    let detalle = `⛓️ *PROTOCOLO DE ADQUISICIÓN DE SOFTWARE — FNaF LATAM™*\n\n`
    detalle += `🎮 *Nombre de la aplicación:* ${apkData.name}\n`
    detalle += `🧩 *Package ID:* ${apkData.package}\n`
    detalle += `📆 *Última actualización:* ${apkData.lastup}\n`
    detalle += `🧮 *Tamaño del archivo:* ${apkData.size}\n\n`
    detalle += `⚙️ *Unidad de instalación en modo espera.*\n— Sistema respaldado por FNaF LATAM™`

    await conn.sendFile(m.chat, apkData.icon, 'thumbnail.jpg', detalle, m)
    await m.react(done)

    if (apkData.size.includes('GB') || Number(apkData.size.replace(' MB', '')) > 999) {
      return await conn.reply(m.chat, `⚠️ *ARCHIVO EXCESIVAMENTE PESADO*\n\nEste paquete supera el límite de seguridad establecido por la red FNaF LATAM™.`, m)
    }

    await conn.sendMessage(m.chat, {
      document: { url: apkData.dllink },
      mimetype: 'application/vnd.android.package-archive',
      fileName: apkData.name + '.apk',
      caption: `🔽 Instalador remoto autorizado por *FNaF LATAM™*`,
    }, { quoted: fkontak })

  } catch (e) {
    console.error('⛔ Error en el protocolo de adquisición:', e)
    return conn.reply(m.chat, `❌ *ERROR EN LA TRANSFERENCIA*\n\nNo se pudo procesar la descarga del archivo solicitado.`, m)
  }
}

handler.tags = ['descargas']
handler.help = ['apkmod']
handler.command = ['apk', 'modapk', 'aptoide']
handler.group = true
handler.register = true
handler.coin = 5

export default handler
