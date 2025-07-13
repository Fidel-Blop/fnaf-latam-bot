import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'

// Configuración general del bot FNaF LATAM

// Número que usará el bot si se conecta por código de texto (opcional)
global.botNumber = '' // Ejemplo: 5492604097541

// Dueños del bot
global.owner = [
  ['5492604097541', '🜲 Owner Principal 🜲', true]
]

global.mods = []
global.prems = []
global.suittag = []

// Información del bot
global.libreria = 'Baileys'
global.baileys = 'V 6.7.17'
global.vs = '2.2.5'

global.nameqr = 'FNaFLATAMBot-MD'
global.namebot = 'FNaF-LATAM-Bot'
global.sessions = 'Sessions'
global.jadi = 'JadiBots'
global.yukiJadibts = true // puedes cambiar esto si ya no usas JadiBot

// Personalización de stickers y textos
global.packname = 'FNaF LATAM Stickers'
global.botname = 'FNaF LATAM'
global.wm = 'FNaF LATAM'
global.author = 'FNaF LATAM Bot'
global.dev = 'FNaF LATAM Dev Team'
global.textbot = 'FNaF LATAM System'
global.etiqueta = 'FNaF LATAM'

// Moneda utilizada en el sistema de economía
global.moneda = 'FazCoins'

// Mensajes de bienvenida y despedida
global.welcom1 = '❍ Personaliza con el comando: setwelcome'
global.welcom2 = '❍ Personaliza con el comando: setbye'

// Imágenes del bot
global.banner = '' // reemplaza por el tuyo si querés
global.avatar = '' // idem

// Grupos y enlaces
global.gp1 = 'https://chat.whatsapp.com/JS4eoUk3QSh1htxzTTR5dr?mode=ac_t'
global.comunidad1 = 'https://chat.whatsapp.com/HU9Dkmzru1P3od24zB1Mvl?mode=ac_t'
global.channel = ''
global.channel2 = ''
global.md = '' // si tenés repo propio, actualizalo
global.correo = '' // cambia a tu email real si querés

// Imagen de catálogo estilo WhatsApp Business
global.catalogo = fs.readFileSync('./src/catalogo.jpg')
global.estilo = {
  key: {
    fromMe: false,
    participant: '0@s.whatsapp.net',
  },
  message: {
    orderMessage: {
      itemCount: -999999,
      status: 1,
      surface: 1,
      message: global.packname,
      orderTitle: 'FNaF LATAM',
      thumbnail: global.catalogo,
      sellerJid: '0@s.whatsapp.net'
    }
  }
}

// Canal de newsletter oficial (si usás uno)
global.ch = {
  ch1: '120363416409380841@newsletter'
}

// Multiplicador de dificultad para RPG
global.multiplier = 60

// Librerías necesarias para el resto del bot
global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment

// Auto recarga al detectar cambios
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("🛠️ Archivo 'settings.js' actualizado"))
  import(`${file}?update=${Date.now()}`)
})
