// Si usas variables globales o las tienes en otro lado, acá las defines o importas:
const botname = 'FNaF LATAM';
const textbot = 'Bot oficial de FNaF LATAM';
const banner = 'https://i.pinimg.com/736x/4d/cb/50/4dcb504b4becb8eeea2931117bbeee4f.jpg';
const redes = ''; // pon aquí tu URL real
const channelRD = { id: 'https://youtube.com/@dlhfox?si=HrJY9IYe4jp5eMoq', name: 'Canal Oficial' };

let handler = async (m, { conn }) => {
  let userId = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : m.sender;
  let name = await conn.getName(userId);
  let _uptime = process.uptime() * 1000;
  let uptime = clockString(_uptime);
  let totalreg = Object.keys(global.db.data.users).length;
  let totalCommands = Object.values(global.plugins).filter(v => v.help && v.tags).length;

  let txt = `
╭─〔 🎮 *FNaF LATAM SYSTEM* 🎮 〕─╮
│ 🤖 *Unidad:* ${botname}
│ 🎭 *Usuario:* @${userId.split('@')[0]}
│ 🔧 *Modo:* Público
│ 🔌 *Tipo:* ${(conn.user.jid == global.conn.user.jid ? 'Principal 🅥' : 'Unidad Secundaria 🅑')}
│ 🕐 *Activo desde:* ${uptime}
│ 📂 *Usuarios Registrados:* ${totalreg}
│ ⚙️ *Módulos Cargados:* ${totalCommands}
│ 🧠 *Sistema:* Multi Device (Baileys)
╰──────────────────────────────╯

*Si alguno de los comandos del sistema presenta errores, por favor informa el incidente siguiendo este formato:*

🔧 Comando con error: #comando  
⚠️ Problema: Describe brevemente qué ocurrió.  
📌 Etiquetame a mí para que reciba el aviso directamente.

🎮 Tu reporte ayuda a mantener al Bot FNaF LATAM en un estado óptimo y funcional para todos.
*Gracias por colaborar con el sistema.*


━━━━━━━━━━━━━━━━━━━━━━
🔍 *MÓDULO DE DIAGNÓSTICO - FNaF LATAM*
━━━━━━━━━━━━━━━━━━━━━━
🎛️ Comandos de análisis y control del sistema:

▸ *#help* | *#menu*
> 📋 Visualiza el panel completo de comandos.
▸ *#uptime* | *#runtime*
> ⏱️ Tiempo de operación del bot.
▸ *#status* | *#estado*
> 📶 Estado general del sistema.
▸ *#infobot*
> 🧠 Información interna y técnica del bot.
▸ *#p* | *#ping*
> 📡 Latencia y tiempo de respuesta.
▸ *#sistema* | *#system*
> 🖥️ Verifica el estado de alojamiento actual.
▸ *#speed* | *#speedtest*
> 🚀 Analiza el rendimiento del entorno.
▸ *#views* | *#usuarios*
> 🗂️ Muestra usuarios activos en el sistema.
▸ *#funciones* | *#totalfunciones*
> ⚙️ Despliega el total de funcionalidades activas.


━━━━━━━━━━━━━━━━━━━━━━
🔎 *MÓDULO DE BUSCADORES - FNaF LATAM*
━━━━━━━━━━━━━━━━━━━━━━
🌐 Comandos para realizar búsquedas en diversas plataformas:

▸ *#tiktoksearch* | *#tiktoks*
> ▶️ Busca videos en TikTok.
▸ *#tweetposts*
> ▶️ Busca publicaciones en Twitter/X.
▸ *#ytsearch* | *#yts*
> ▶️ Busca videos en YouTube.
▸ *#cuevana* | *#cuevanasearch*
> ▶️ Busca películas y series en Cuevana.
▸ *#google*
> ▶️ Realiza búsquedas generales en Google.
▸ *#pin* | *#pinterest*
> ▶️ Busca imágenes en Pinterest.
▸ *#infoanime*
> ▶️ Busca información sobre anime y manga.

FNaF LATAM - Buscadores activos listos para tí. 


━━━━━━━━━━━━━━━━━━━━━━  
⬇️ *『 DESCARGAS - FNaF LATAM 』* ⬇️  
━━━━━━━━━━━━━━━━━━━━━━  
🎬 Comandos para descargar archivos multimedia y más:  

▸ *#tiktok* | *#tt*  
> ⬇🔄 Descarga videos completos de TikTok.  
▸ *#mediafire* | *#mf*  
> ⬇🔄 Descarga archivos desde MediaFire.  
▸ *#pinvid* | *#pinvideo* + [enlace]  
> ⬇🔄 Descarga videos desde Pinterest.  
▸ *#play* | *#play2*  
> ⬇🔄 Descarga música o video desde YouTube.  
▸ *#ytmp3* | *#ytmp4*  
> ⬇🔄 Descarga audio o video de YouTube vía URL.  
▸ *#fb* | *#facebook*  
> ⬇🔄 Descarga videos desde Facebook.  
▸ *#twitter* | *#x* + [link]  
> ⬇🔄 Descarga videos desde Twitter/X.  
▸ *#ig* | *#instagram*  
> ⬇🔄 Descarga contenido multimedia de Instagram.  
▸ *#tts* | *#tiktoks* + [búsqueda]  
> ⬇🔄 Busca y descarga videos de TikTok.  
▸ *#ttimg* | *#ttmp3* + <url>  
> ⬇🔄 Descarga fotos y audios de TikTok.  
▸ *#apk* | *#modapk*  
> ⬇🔄 Descarga APKs desde Aptoide.  
▸ *#tiktokrandom* | *#ttrandom*  
> ⬇🔄 Descarga videos aleatorios de TikTok.

FNaF LATAM - Tu mejor aliado en descargas.  


━━━━━━━━━━━━━━━━━━━━━━  
💰 *『 ECONOMÍA - FNaF LATAM 』* 💰  
━━━━━━━━━━━━━━━━━━━━━━  
🎲 Comandos para ganar ${moneda} y recursos RPG:  

▸ *#w* | *#work* | *#trabajar*  
> 💵 Trabaja para ganar ${moneda}.  
▸ *#cf* | *#suerte*  
> 💵 Apuesta tus ${moneda} a cara o cruz.  
▸ *#crime* | *#crimen*  
> 💵 Trabaja como ladrón para ganar ${moneda}.  
▸ *#ruleta* | *#roulette* | *#rt*  
> 💵 Apuesta ${moneda} al color rojo o negro.  
▸ *#casino* | *#apostar*  
> 💵 Apuesta tus ${moneda} en el casino.  
▸ *#slot*  
> 💵 Prueba tu suerte apostando tus ${moneda} en la ruleta.  
▸ *#cartera* | *#wallet*  
> 💵 Consulta tu saldo de ${moneda} en la cartera.  
▸ *#banco* | *#bank*  
> 💵 Consulta tu saldo de ${moneda} en el banco.  
▸ *#deposit* | *#depositar* | *#d*  
> 💵 Deposita tus ${moneda} en el banco.  
▸ *#with* | *#retirar* | *#withdraw*  
> 💵 Retira tus ${moneda} del banco.  
▸ *#transfer* | *#pay*  
> 💵 Transfiere ${moneda} o XP a otros usuarios.  
▸ *#miming* | *#minar* | *#mine*  
> 💵 Trabaja como minero y recolecta recursos.  
▸ *#buyall* | *#buy*  
> 💵 Compra ${moneda} usando XP.  
▸ *#daily* | *#diario*  
> 💵 Reclama tu recompensa diaria.  
▸ *#cofre*  
> 💵 Reclama un cofre diario lleno de recursos.  
▸ *#weekly* | *#semanal*  
> 💵 Reclama tu recompensa semanal.  
▸ *#monthly* | *#mensual*  
> 💵 Reclama tu recompensa mensual.  
▸ *#steal* | *#robar* | *#rob*  
> 💵 Intenta robar ${moneda} a otro usuario.  
▸ *#robarxp* | *#robxp*  
> 💵 Intenta robar XP a un usuario.  
▸ *#eboard* | *#baltop*  
> 💵 Consulta el ranking de usuarios con más ${moneda}.  
▸ *#aventura* | *#adventure*  
> 💵 Aventúrate en un reino y recolecta recursos.  
▸ *#curar* | *#heal*  
> 💵 Restaura tu salud para seguir aventurándote.  
▸ *#cazar* | *#hunt* | *#berburu*  
> 💵 Participa en una cacería para conseguir recursos.  
▸ *#inv* | *#inventario*  
> 💵 Consulta tu inventario con todos tus ítems.  
▸ *#mazmorra* | *#explorar*  
> 💵 Explora mazmorras para ganar ${moneda}.  
▸ *#halloween*  
> 💵 Reclama dulce o truco (Solo en Halloween).  
▸ *#christmas* | *#navidad*  
> 💵 Reclama tu regalo navideño (Solo en Navidad).

FNaF LATAM - Tu camino al éxito económico.  


━━━━━━━━━━━━━━━━━━━━━━  
🧩 *『 STICKERS - FNaF LATAM 』* 🧩  
━━━━━━━━━━━━━━━━━━━━━━  
🔰 Comandos para creación y edición de stickers personalizados.

🧩 *#sticker* | *#s*  
> Crea stickers a partir de una imagen o video.  
🧩 *#setmeta*  
> Establece pack y autor para tus stickers.  
🧩 *#delmeta*  
> Elimina tu pack de stickers actual.  
🧩 *#pfp* | *#getpic*  
> Obtiene la foto de perfil de un usuario.  
🧩 *#qc*  
> Genera un sticker con texto o avatar.  
🧩 *#toimg* | *#img*  
> Convierte un sticker en imagen.  
🧩 *#brat* | *#ttp* | *#attp*  
> Crea stickers con texto animado o simple.  
🧩 *#emojimix*  
> Fusiona 2 emojis para formar un nuevo sticker.  
🧩 *#wm*  
> Cambia nombre o autor de los stickers generados.

FNaF LATAM - Crea, diseña y comparte tu estilo en stickers.


━━━━━━━━━━━━━━━━━━━━━━  
🛠️ *『 HERRAMIENTAS - FNaF LATAM 』* 🛠️  
━━━━━━━━━━━━━━━━━━━━━━  
♻️ Comandos de utilidades con múltiples funciones para mejorar tu experiencia.

🛠️ *#calcular* | *#cal*  
> Resuelve ecuaciones matemáticas rápidamente.  
🛠️ *#tiempo* | *#clima*  
> Consulta el clima actual de cualquier país.  
🛠️ *#horario*  
> Visualiza el horario global por regiones.  
🛠️ *#fake* | *#fakereply*  
> Genera mensajes falsos personalizados.  
🛠️ *#enhance* | *#remini* | *#hd*  
> Mejora automáticamente la calidad de una imagen.  
🛠️ *#letra*  
> Transforma el estilo tipográfico de tus textos.  
🛠️ *#read* | *#readviewonce* | *#ver*  
> Visualiza imágenes de "una sola vista".  
🛠️ *#whatmusic* | *#shazam*  
> Identifica canciones o audios por sonido.  
🛠️ *#ss* | *#ssweb*  
> Toma capturas de páginas web.  
🛠️ *#length* | *#tamaño*  
> Modifica dimensiones de imágenes o videos.  
🛠️ *#say* | *#decir*  
> El bot repite el mensaje que escribas.  
🛠️ *#todoc* | *#toducument*  
> Crea archivos desde audios, fotos o videos.  
🛠️ *#translate* | *#traducir* | *#trad*  
> Traduce palabras o frases a otros idiomas.

FNaF LATAM - Las herramientas que necesitas, al alcance de un comando.


━━━━━━━━━━━━━━━━━━━━━━  
👤 *『 PERFIL - FNaF LATAM 』* 👤  
━━━━━━━━━━━━━━━━━━━━━━  
🚺🚹 Comandos de perfil para ver, editar y gestionar tu identidad dentro del bot.

👤 *#reg* | *#verificar* | *#register*  
> Registra tu nombre y edad en el sistema.  
👤 *#unreg*  
> Elimina tu cuenta registrada en el bot.  
👤 *#profile*  
> Muestra tu perfil de usuario detallado.  
👤 *#marry* [@mención]  
> Propón matrimonio a otro usuario.  
👤 *#divorce*  
> Finaliza tu relación con tu pareja.  
👤 *#setgenre* | *#setgenero*  
> Establece tu género en el perfil.  
👤 *#delgenre* | *#delgenero*  
> Elimina tu género del perfil.  
👤 *#setbirth* | *#setnacimiento*  
> Asigna tu fecha de nacimiento.  
👤 *#delbirth* | *#delnacimiento*  
> Elimina tu fecha de nacimiento registrada.  
👤 *#setdescription* | *#setdesc*  
> Agrega una descripción personal a tu perfil.  
👤 *#deldescription* | *#deldesc*  
> Elimina tu descripción actual.  
👤 *#lb* | *#lboard* + <página>  
> Ranking de niveles y experiencia por usuarios.  
👤 *#level* | *#lvl* + [@mención]  
> Consulta tu nivel y puntos de experiencia.  
👤 *#comprarpremium* | *#premium*  
> Accede al pase premium y elimina los límites.  
👤 *#confesiones* | *#confesar*  
> Confiesa tus sentimientos de forma anónima.

FNaF LATAM - Tu perfil, tu historia dentro del universo animatrónico. 


━━━━━━━━━━━━━━━━━━━━━━  
🛠️ *『 GRUPOS - FNaF LATAM 』* 🛠️  
━━━━━━━━━━━━━━━━━━━━━━  
🍕 Comandos de administración y gestión grupal para mantener el orden y la actividad.

🛠️ *#hidetag*  
> Menciona a todos los miembros del grupo.  
🛠️ *#gp* | *#infogrupo*  
> Muestra la información actual del grupo.  
🛠️ *#linea* | *#listonline*  
> Lista los usuarios conectados.  
🛠️ *#setwelcome*  
> Define un mensaje de bienvenida personalizado.  
🛠️ *#setbye*  
> Define un mensaje de despedida para salidas.  
🛠️ *#link*  
> Envía el enlace de invitación del grupo.  
🛠️ *#admins* | *#admin*  
> Menciona a todos los administradores.  
🛠️ *#restablecer* | *#revoke*  
> Restaura el enlace del grupo.  
🛠️ *#grupo* | *#group* [open / abrir]  
> Abre el grupo para que todos puedan escribir.  
🛠️ *#grupo* | *#group* [close / cerrar]  
> Cierra el grupo, solo admins pueden escribir.  
🛠️ *#kick* [@usuario / número]  
> Expulsa a un miembro del grupo.  
🛠️ *#add* | *#añadir* | *#agregar* [número]  
> Agrega un usuario por número.  
🛠️ *#promote* [@usuario]  
> Asciende a administrador al mencionado.  
🛠️ *#demote* [@usuario]  
> Quita privilegios de administrador.  
🛠️ *#gpbanner* | *#groupimg*  
> Cambia la imagen del grupo.  
🛠️ *#gpname* | *#groupname*  
> Cambia el nombre del grupo.  
🛠️ *#gpdesc* | *#groupdesc*  
> Edita la descripción del grupo.  
🛠️ *#advertir* | *#warn* | *#warning*  
> Asigna una advertencia a un usuario.  
🛠️ *#unwarn* | *#delwarn*  
> Elimina advertencias de un usuario.  
🛠️ *#advlist* | *#listadv*  
> Muestra la lista de advertidos.  
🛠️ *#bot on*  
> Activa el bot en el grupo.  
🛠️ *#bot off*  
> Desactiva el bot en el grupo.  
🛠️ *#mute* [@usuario]  
> Silencia a un usuario (el bot elimina sus mensajes).  
🛠️ *#unmute* [@usuario]  
> Reactiva a un usuario silenciado.  
🛠️ *#encuesta* | *#poll*  
> Crea una encuesta personalizada.  
🛠️ *#delete* | *#del*  
> Elimina un mensaje (requiere reply).  
🛠️ *#fantasmas*  
> Lista a los usuarios inactivos del grupo.  
🛠️ *#kickfantasmas*  
> Expulsa a los inactivos automáticamente.  
🛠️ *#invocar* | *#tagall* | *#todos*  
> Menciona a todos los miembros del grupo.  
🛠️ *#setemoji* | *#setemo*  
> Cambia el emoji de invitación del grupo.  
🛠️ *#listnum* | *#kicknum*  
> Expulsa por prefijo de número (ej: +92, +212).

FNaF LATAM - Herramientas de poder para nuestros grupos.


━━━━━━━━━━━━━━━━━━━━━━  
🎮 *『 JUEGOS - FNaF LATAM 』* 🎮  
━━━━━━━━━━━━━━━━━━━━━━  
💥 Comandos de juegos y diversión para pasar el rato con amigos o solo.

🎮 *#amistad* | *#amigorandom*  
> Haz nuevos amigos al azar.  
🎮 *#chiste*  
> Recibí un chiste aleatorio.  
🎮 *#consejo*  
> La bot te da un consejo sabio... o no.  
🎮 *#doxeo* | *#doxear* + <@usuario>  
> Simula un doxeo.  
🎮 *#facto*  
> Recibí un dato curioso o "facto".  
🎮 *#formarpareja*  
> La bot forma una pareja aleatoria.  
🎮 *#formarpareja5*  
> Forma cinco parejas distintas.  
🎮 *#frase*  
> Frases motivadoras o reflexivas.  
🎮 *#iq* | *#iqtest* + <@usuario>  
> Calcula el IQ de alguien (no te lo tomes personal).  
🎮 *#meme*  
> Recibí un meme aleatorio.  
🎮 *#personalidad* + <@usuario>  
> La bot analiza tu personalidad.  
🎮 *#piropo*  
> Lanza un piropo al azar.  
🎮 *#pregunta*  
> Hacés una pregunta y la bot responde.  
🎮 *#ship* | *#pareja*  
> Calcula la compatibilidad entre dos.  
🎮 *#sorteo*  
> Realiza un sorteo entre usuarios.  
🎮 *#top*  
> Crea un ranking personalizado.  
🎮 *#ahorcado*  
> Juega el clásico juego del ahorcado.  
🎮 *#mates* | *#matematicas*  
> Resolvé operaciones para ganar premios.  
🎮 *#ppt*  
> Jugá piedra, papel o tijera con la bot.  
🎮 *#sopa* | *#buscarpalabra*  
> Juega una sopa de letras interactiva.  
🎮 *#pvp* | *#suit* + <@usuario>  
> Retá a un usuario a un PvP.  
🎮 *#ttt*  
> Crea una sala de juego para Tic Tac Toe.

FNaF LATAM - Diversión garantizada en cada comando.


*¡Próximamente el 5 de diciembre de 2025! 🍕*
`.trim();

  await conn.sendMessage(m.chat, {
    image: { url: banner },
    text: txt,
    contextInfo: {
      mentionedJid: [m.sender, userId],
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        newsletterName: channelRD.name,
        serverMessageId: -1,
      },
      forwardingScore: 999,
      externalAdReply: {
        title: botname,
        body: textbot,
        thumbnailUrl: banner,
        sourceUrl: redes,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
      },
    },
  }, { quoted: m });
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help'];

export default handler;

function clockString(ms) {
  let s = Math.floor((ms / 1000) % 60);
  let m = Math.floor((ms / 60000) % 60);
  let h = Math.floor(ms / 3600000);
  return `${h}h ${m}m ${s}s`;
}
