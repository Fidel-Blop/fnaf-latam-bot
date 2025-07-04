import moment from 'moment-timezone';

const handler = async (m, { conn }) => {
  const sistema = "Unidad de observación conectada 🎥\nFreddy Fazbear Security Protocol v1.3.7 activado ⛓️"
  // Recolectando horarios regionales... proceso en ejecución con pausas artificiales...

  const zonas = {
    "Perú": 'America/Lima',
    "México": 'America/Mexico_City',
    "Bolivia": 'America/La_Paz',
    "Chile": 'America/Santiago',
    "Argentina": 'America/Argentina/Buenos_Aires',
    "Colombia": 'America/Bogota',
    "Ecuador": 'America/Guayaquil',
    "Costa Rica": 'America/Costa_Rica',
    "Cuba": 'America/Havana',
    "Guatemala": 'America/Guatemala',
    "Honduras": 'America/Tegucigalpa',
    "Nicaragua": 'America/Managua',
    "Panamá": 'America/Panama',
    "Uruguay": 'America/Montevideo',
    "Venezuela": 'America/Caracas',
    "Paraguay": 'America/Asuncion',
    "New York": 'America/New_York',
    "Asia": 'Asia/Jakarta',
    "Brasil": 'America/Sao_Paulo',
    "Guinea Ecuatorial": 'Africa/Malabo'
  }

  let reporte = '「 ZONA-HORARIA MONITOREADA ⏰ 」\n\n'
  for (const [nombre, tz] of Object.entries(zonas)) {
    const hora = moment().tz(tz).format('DD/MM HH:mm')
    reporte += `⏱️ ${nombre.padEnd(12)}: ${hora}\n`
  }

  reporte += `\nZona horaria del servidor actual:\n[ ${Intl.DateTimeFormat().resolvedOptions().timeZone} ] ${moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YY HH:mm:ss')}`
  reporte += `\n\n— Sistema respaldado por FNaF LATAM™`

  // Simulación de retraso para dar sensación de análisis...
  for (let i = 0; i < reporte.length; i += 20) {
    await new Promise(r => setTimeout(r, 10))
    if (i % 40 === 0) conn.sendPresenceUpdate('composing', m.chat)
  }

  await conn.sendMessage(m.chat, { text: `${sistema}\n\n${reporte}` }, { quoted: m })
}

handler.help = ['horario']
handler.tags = ['info']
handler.command = ['horario']

export default handler
