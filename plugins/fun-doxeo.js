import { performance } from 'perf_hooks'

var handler = async (m, { conn, text }) => {
    let who;
    let userName;

    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0];
            userName = await conn.getName(who);
        } else if (m.quoted) {
            who = m.quoted.sender;
            userName = await conn.getName(who);
        } else {
            who = m.chat;
        }
    } else {
        who = m.chat;
    }

    if (!who) return conn.reply(m.chat, `⚠️ *Atención*:\nPara ejecutar el doxeo, menciona a alguien o responde un mensaje.`, m);

    if (!userName) {
        userName = text || 'Animatrónico desconocido';
    }

    let start = `🎥 *Iniciando escaneo...* \n🔍 Activando protocolos de vigilancia nocturna...`;
    let boost = `*${pickRandom(['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'])}%* - Análisis inicial completo`;
    let boost2 = `*${pickRandom(['21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40'])}%* - Señales detectadas`;
    let boost3 = `*${pickRandom(['41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60'])}%* - Encriptación comprometida`;
    let boost4 = `*${pickRandom(['61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80'])}%* - Coordenadas localizadas`;
    let boost5 = `*${pickRandom(['81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100'])}%* - Escaneo completo\n\n⚠️ CUIDADO: Animatrónicos activos cerca.`;

    const { key } = await conn.sendMessage(m.chat, { text: `${start}` }, { quoted: m });
    await delay(1000);
    await conn.sendMessage(m.chat, { text: `${boost}`, edit: key });
    await delay(1000);
    await conn.sendMessage(m.chat, { text: `${boost2}`, edit: key });
    await delay(1000);
    await conn.sendMessage(m.chat, { text: `${boost3}`, edit: key });
    await delay(1000);
    await conn.sendMessage(m.chat, { text: `${boost4}`, edit: key });
    await delay(1000);
    await conn.sendMessage(m.chat, { text: `${boost5}`, edit: key });

    let old = performance.now();
    let neww = performance.now();
    let speed = `${neww - old}`;

    let doxeo = `👤 *Datos recopilados* 

📅 Fecha: ${new Date().toLocaleDateString()}
⏰ Hora: ${new Date().toLocaleTimeString()}

🎭 *Identidad del animatrónico:* ${userName}

🖥️ *Dirección IP:* 92.28.211.234
🔢 *Número:* 43 7462
🌐 *Coordenadas:* 12.4893 W
🆔 *Número SS:* 6979-1915-1918-2016
🔗 *IPV6:* fe80::5dcd::ef69::fb22::d9888%12 

🔌 *UPnP:* Activado
🌐 *DMZ:* 10.112.42.15
🔒 *MAC Address:* 5A:78:3E:7E:00
📡 *ISP:* Ucom Universal
🛠️ *DNS:* 8.8.8.8 | Alternativo: 1.1.1.1
🖧 *DNS Suffix:* Dlink

📶 *WAN:* 100.23.10.15
🔄 *Tipo WAN:* Private NAT
🚪 *Gateway:* 192.168.0.1
🔢 *Máscara Subred:* 255.255.0.255

📂 *Puertos UDP abiertos:* 8080, 80
📂 *Puertos TCP abiertos:* 443

🏭 *Fabricante Router:* ERICCSON
💻 *Dispositivo:* WIN32-X
🔌 *Tipo de conexión:* TPLINK Company

🛣️ *Rutas ICMP:* 192.168.0.1, 192.168.1.1, 100.73.43.4

🌐 *Hosts conocidos:*
- host-132.12.32.167.ucom.com
- host-132.12.111.ucom.com
- 36.134.67.189, 216.239.78.11
- Sof02s32inf14.1e100.net

🔗 *HTTP Conexiones:*
- 192.168.3.1:433 → 92.28.211.234:80
- 192.168.625 → 92.28.211.455:80
- 192.168.817 → 92.28.211.8:971

🔄 *Otros protocolos:*
- UDP: 192.168.452 → 92.28.211:7265288
- TCP: 192.168.682 → 92.28.211:62227.7
- TCP: 192.168.725 → 92.28.211:67wu2
- TCP: 192.168.629 → 92.28.211.167:8615

🕵️ *MAC externa:* 6U:77:89:ER:O4
📡 *Saltos módem:* 64

💀 *Precaución: la vigilancia está activa, mantente alerta...*`;

    m.reply(doxeo, null, { mentions: conn.parseMention(doxeo) });
}

handler.help = ['doxear'];
handler.tags = ['fun'];
handler.command = ['doxear', 'doxxeo', 'doxeo'];
handler.register = true;
handler.group = true;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
