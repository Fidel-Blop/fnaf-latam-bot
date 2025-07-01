import { performance } from 'perf_hooks'

const delay = ms => new Promise(res => setTimeout(res, ms))

const pickRandom = list => list[Math.floor(Math.random() * list.length)]

var handler = async (m, { conn, text }) => {
    let who, userName;

    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0]
            userName = await conn.getName(who)
        } else if (m.quoted) {
            who = m.quoted.sender
            userName = await conn.getName(who)
        } else {
            who = m.chat
        }
    } else {
        who = m.chat
    }

    if (!who) return conn.reply(m.chat, '⚠️ Sistema de rastreo inestable. Usa *@etiqueta* o responde a un mensaje.', m)

    if (!userName) userName = text || 'Sujeto no identificado'

    let startMsg = `🎥 *FNaF LATAM | Sistema de DOX-Scan activado*`
    let loading = [
        `📡 Sincronizando nodos...`,
        `⛓️ Accediendo a puertos vulnerables...`,
        `🔎 Recolectando paquetes...`,
        `🧠 Perfilando al objetivo...`,
        `📂 Descifrando capas de seguridad...`
    ]

    const boostPhases = [
        `🔍 Progreso: *${pickRandom(['0','1','2','3','4','5','6','7','8','9','10'])}%*`,
        `🔍 Progreso: *${pickRandom(['25','30','35','40','45'])}%*`,
        `🔍 Progreso: *${pickRandom(['50','55','60','65'])}%*`,
        `🔍 Progreso: *${pickRandom(['75','80','85'])}%*`,
        `🔍 Progreso: *${pickRandom(['90','95','99','100'])}%*`
    ]

    const { key } = await conn.sendMessage(m.chat, { text: startMsg }, { quoted: m })

    for (let i = 0; i < boostPhases.length; i++) {
        await delay(1000)
        await conn.sendMessage(m.chat, { text: `${loading[i]}\n${boostPhases[i]}`, edit: key })
    }

    const doxMsg = `📁 *Resultado del escaneo DOX - Modo Avanzado*\n\n🧾 *Objetivo:* ${userName}\n📆 ${new Date().toLocaleDateString()} | ⏱️ ${new Date().toLocaleTimeString()}

🧠 *Parámetros extraídos del sistema:*
> 🌐 IP: 92.28.211.234  
> 📍 Localización: 🗺️ W:12.4893 | N:43 7462  
> 🔒 SS NUMBER: 6979-1915-1918-2016  
> 📶 IPv6: fe80::5dcd::ef69::fb22::d9888%12  
> 🔧 UPNP: Habilitado  
> 🛰️ ISP: Ucom universal  
> 💾 DNS: 8.8.8.8 / 1.1.1.1  
> 🌐 WAN: 100.23.10.15  
> 💻 MAC: 5A:78:3E:7E:00  
> 🧱 GATEWAY: 192.168.0.1  
> 🔐 SUBNET MASK: 255.255.0.255  
> 📡 VENDEDOR ROUTER: ERICCSON  
> 🧩 DISPOSITIVO: WIN32-X  
> 📊 UDP Ports: 8080, 80  
> 🔁 TCP Ports: 443  
> 🔌 MODEM HOPS: 3 nodos internos  
> ☁️ HTTPs activos desde 3 puntos  
> 🧠 ALIAS DNS: dlink-ucom-netmask

🔗 *Observación:* Datos simulados generados por el sistema de pruebas internas. Este informe no representa información real.

— 📡 Unidad de rastreo simulada por *FNaF LATAM™ SecureNet*`;

    await delay(1000)
    await conn.sendMessage(m.chat, { text: doxMsg, mentions: conn.parseMention(doxMsg) })
}

handler.help = ['doxear']
handler.tags = ['fun']
handler.command = ['doxear', 'doxxeo', 'doxeo']
handler.register = true
handler.group = true

export default handler
