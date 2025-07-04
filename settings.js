import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'

//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*
//      ⚙ CONFIGURACIÓN FNAF LATAM ⚙
//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*

// Número del bot (solo necesario si usás código de login de 8 dígitos)
global.botNumber = '' // Ejemplo: 5492604097541

//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*
//      👑 OWNER PRINCIPAL 👑
//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*

global.owner = [
  ['5492604097541', 'Fideos - Owner', true]
];

//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*

global.mods = [] // Moderadores
global.suittag = ['5492604097541'] 
global.prems = ['527298793467'] // Premiums

//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*
//         📦 IDENTIDAD DEL BOT
//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.17'
global.vs = '1.0.0'
global.nameqr = 'fnafqr'
global.namebot = '🤖 FNaF LATAM Bot 🤖'
global.sessions = 'sessions'
global.jadi = 'JadiBots'
global.yukiJadibts = false

//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*
//        ✨ DATOS DEL CREADOR
//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*

global.packname = '📦 FNaF LATAM'
global.botname = 'FNaF LATAM Bot'
global.wm = '© FNaF LATAM'
global.author = 'By Fideos'
global.dev = 'Desarrollador Independiente'
global.textbot = 'FNaF LATAM - Powered by Fideos'
global.etiqueta = 'FNaF LATAM'

//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*
//         💰 MONEDA DEL JUEGO
//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*

global.moneda = 'Faz-Coins'

//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*
//       👋 BIENVENIDA & DESPEDIDA
//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*

global.welcom1 = '👋 Bienvenido a FNaF LATAM'
global.welcom2 = '👋 Nos vemos, vuelve pronto.'

//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*
//         📷 IMAGEN DEL BOT
//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*

global.banner = 'https://images.app.goo.gl/DZuXX'
global.avatar = 'https://static.wikia.nocookie.net/ficcion-sin-limites/images/d/d7/FreddyNewRender.webp/revision/latest?cb=20240225142852&path-prefix=es'

//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*
//         🌐 LINKS Y REDES
//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*

global.gp1 = 'https://chat.whatsapp.com/JS4eoUk3QSh1htxzTTR5dr?mode=ac_t'
global.comunidad1 = 'https://chat.whatsapp.com/LXl7xPDKUWeGUBFYxrs16k?mode=ac_t'


//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*
//         🛍️ MENSAJE ESTILO CATÁLOGO
//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*

global.catalogo = fs.readFileSync('./src/catalogo.jpg')
global.estilo = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    ...(false ? { remoteJid: "0-0@g.us" } : {})
  },
  message: {
    orderMessage: {
      itemCount: 1,
      status: 1,
      surface: 1,
      message: packname,
      orderTitle: 'FNaF LATAM Pack',
      thumbnail: catalogo,
      sellerJid: '0@s.whatsapp.net'
    }
  }
}

global.ch = {
  ch1: '120363416409380841@newsletter'
}

global.multiplier = 60 // Dificultad de nivel (más alto = más difícil)

//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*
//         📦 DEPENDENCIAS
//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment

//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*
//         🔁 AUTO-RELOAD
//*━━━━━━━━━━━━━━━━━━━━━━━━━━━*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("🔁 Se actualizó 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
