let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let user = global.db.data.users[userId]
    let name = conn.getName(userId)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length
    
    let txt = `
🎥 *[FNaF LATAM BOT - INTERFAZ DEL MENÚ]*  
┌────────── SYSTEM FEED ──────────┐  
│ 👁‍🗨 Unidad conectada: @${userId.split('@')[0]}  
│ ⚙️ Estado del protocolo: *Público - Sin cifrado*  
│ 🧠 Núcleo IA: ${(conn.user.jid == global.conn.user.jid ? 'Nodo Principal 🅥' : 'Unidad Alterna 🅑')}  
│ ⛓️ Uptime del sistema: ${uptime}  
│ 📡 Sujetos registrados: ${totalreg}  
│ 🦴 Comandos integrados: ${totalCommands}  
│ 🔊 Interfaz: *Multi Dispositivo - Fase Baileys*  
└───────────────────────────────┘  
📡 Enlace de acceso seguro a la comunidad de BYDLHFOX (owner) :
🔗 https://chat.whatsapp.com/HU9Dkmzru1P3od24zB1Mvl?mode=ac_t
*Recuerda:* No todos los que entran... logran salir.  

💾 *Sistema respaldado por FNaF LATAM™*


👁️‍🗨️ :･ﾟ⊹˚• ` Info Principal ` •˚⊹:･ﾟ•
📡 Comandos de auditoría y diagnóstico para el núcleo de vigilancia FNaF LATAM™:

⛓️ *#help • #menu*  
> 🎥 Consulta el panel de comandos autorizados.
🔊 *#uptime • #runtime*  
> 📡 Tiempo operativo del núcleo desde la última activación
📊 *#status • #estado*  
> 📡 Estado actual del módulo central.
📎 *#links • #grupos*  
> 🛠️ Enlaces de transmisión y zonas autorizadas.
🎥 *#infobot • #infobot*  
> 💽 Ficha técnica completa del núcleo de vigilancia.
🧷 *#sug • #newcommand*  
> 🧠 Sugiere una nueva función para integrar al sistema.
📶 *#p • #ping*  
> 📍 Diagnóstico de latencia del protocolo.
⚠️ *#reporte • #reportar*  
> 🚨 Informe de errores para el centro de control.
🖥️ *#sistema • #system*  
> ⚙️ Estado del alojamiento y parámetros internos.
📡 *#speed • #speedtest*  
> 🌀 Test de respuesta y transferencia del núcleo.
🪫 *#views • #usuarios*  
> 🔍 Número de unidades activas dentro del sistema.
📂 *#funciones • #totalfunciones*  
> 🔧 Número total de funciones ejecutables registradas.


👁️‍🗨️ :･ﾟ⊹˚• 『 SISTEMA :: BÚSQUEDA DE ARCHIVOS EXTERNOS 』 •˚⊹:･ﾟ•
⚙️ Iniciando protocolo de escaneo y recopilación de datos externos...
> Unidad de rastreo en línea activada... 📡

ᰔᩚ *#tiktoksearch • #tiktoks*
> 🎥 Sincronizando base de datos TikTok. Acceso autorizado a videos públicos.
ᰔᩚ *#tweetposts*
> 🧠 Enlace neural con red X (anteriormente Twitter) establecido. Rastreando publicaciones.
ᰔᩚ *#ytsearch • #yts*
> 📽️ Sistema FNaF LATAM conectado a servidores YouTube. Escaneando videos.
ᰔᩚ *#cuevana • #cuevanasearch*
> 📺 Analizando sectores no oficiales de entretenimiento. Resultados no garantizados.
ᰔᩚ *#google*
> 🧠 Nodo principal enlazado con Google™. Iniciando protocolo de consulta abierta.
ᰔᩚ *#pin • #pinterest*
> 📌 Activando buscador visual Pinterest. Extrayendo imágenes de referencia.
ᰔᩚ *#infoanime*
> 💽 Buscando archivos de registro en sector Anime/Manga. Respuesta en curso. (NO se permite búsquedas de Animes/Mangas +18, hentai, etc.) 


📦 :･ﾟ⊹˚• 『 MÓDULO DE ADQUISICIÓN DIGITAL :: FNAF LATAM 』 •˚⊹:･ﾟ•
⚙️ Accediendo a los canales de descarga externos...  
> Protocolo de adquisición de archivos activo. 🛰️

ᰔᩚ *#tiktok • #tt*
> 🎥 Recuperando registros visuales de TikTok.
ᰔᩚ *#mediafire • #mf*
> ⛓️ Descargando datos comprimidos desde MediaFire™.
ᰔᩚ *#pinvid • #pinvideo* + [enlace]
> 🖼️ Extrayendo secuencias visuales de Pinterest.
ᰔᩚ *#play • #play2*
> 🔊 Capturando contenido multimedia desde servidores de YouTube.
ᰔᩚ *#ytmp3 • #ytmp4*
> 🧠 Extrayendo datos en formato MP3/MP4 directamente desde la fuente.
ᰔᩚ *#fb • #facebook*
> 📺 Enlace establecido con Facebook. Iniciando transferencia de video.
ᰔᩚ *#twitter • #x* + [link]
> 📡 Analizando nodos de Twitter/X. Extrayendo contenido visual.
ᰔᩚ *#ig • #instagram*
> 📷 Rastreando elementos visuales de Instagram. Extracción en curso.
ᰔᩚ *#tts • #tiktoks* + [búsqueda]
> 🔍 Localizando grabaciones cortas en TikTok según parámetro ingresado.
ᰔᩚ *#ttimg • #ttmp3* + <url>
> 🖼️ Descarga de material visual o sonoro desde TikTok en progreso.
ᰔᩚ *#apk • #modapk*
> 📱 Buscando paquetes de instalación modificados. Fuente: Aptoide.
ᰔᩚ *#tiktokrandom • #ttrandom*
> 🎲 Selección aleatoria de material visual desde TikTok.


💰 :･ﾟ⊹˚• 『 TERMINAL DE ECONOMÍA INTERNA :: FNAF LATAM 』 •˚⊹:･ﾟ•
⚙️ Iniciando protocolo económico...  
> Unidad de control monetario y recompensas en línea. ⛓️

ᰔᩚ *#w • #work • #trabajar*
> ⚒️ Asignación laboral activa. Recompensa en ${moneda} otorgada.
ᰔᩚ *#slut • #prostituirse*
> 👠 Activando trabajo en zona roja. Ganancias en ${moneda} calculadas.
ᰔᩚ *#cf • #suerte*
> 🎲 Lanzamiento de moneda en curso. Probabilidades: 50/50.
ᰔᩚ *#crime • #crimen*
> 🧤 Infiltración en sistema legal... Robo simulado ejecutado.
ᰔᩚ *#ruleta • #roulette • #rt*
> 🎡 Activando ruleta de colores. Selecciona rojo o negro.
ᰔᩚ *#casino • #apostar*
> 🃏 Conectando con servidores del casino... Jugada en proceso.
ᰔᩚ *#slot*
> 🎰 Probando suerte con máquinas de azar. Buena fortuna, sujeto.
ᰔᩚ *#cartera • #wallet*
> 🧾 Consultando registros financieros de usuario...
ᰔᩚ *#banco • #bank*
> 🏦 Accediendo a cuenta bancaria de FazbearCorp™.
ᰔᩚ *#deposit • #depositar • #d*
> 💳 Depósito realizado. Seguridad de fondos garantizada.
ᰔᩚ *#with • #retirar • #withdraw*
> 💸 Extracción de fondos confirmada.
ᰔᩚ *#transfer • #pay*
> 🔄 Transfiriendo recursos a otra entidad registrada.
ᰔᩚ *#miming • #minar • #mine*
> ⛏️ Activando simulador de minería. Recursos en proceso de recolección.
ᰔᩚ *#buyall • #buy*
> 🛒 Compra autorizada. XP convertido a ${moneda}.
ᰔᩚ *#daily • #diario*
> 📅 Recompensa diaria procesada. Registro actualizado.
ᰔᩚ *#cofre*
> 🎁 Cofre misterioso abierto. Inventario actualizado.
ᰔᩚ *#weekly • #semanal*
> 🗓️ Bono semanal validado.
ᰔᩚ *#monthly • #mensual*
> 📦 Recompensa mensual entregada con éxito.
ᰔᩚ *#steal • #robar • #rob*
> 🕶️ Intentando extracción forzosa de fondos. Riesgo elevado.
ᰔᩚ *#robarxp • #robxp*
> 🧠 Intento de sustracción de XP en progreso...
ᰔᩚ *#eboard • #baltop*
> 🏆 Consultando el ranking de unidades con mayor acumulación de ${moneda}...
ᰔᩚ *#aventura • #adventure*
> 🗺️ Iniciando misión de exploración. Ecosistema hostil detectado.
ᰔᩚ *#curar • #heal*
> 💉 Iniciando protocolo de recuperación vital.
ᰔᩚ *#cazar • #hunt • #berburu*
> 🐾 Caza autorizada. Movimiento depredador simulado.
ᰔᩚ *#inv • #inventario*
> 🎒 Inventario sincronizado. Verificando ítems almacenados...
ᰔᩚ *#mazmorra • #explorar*
> ⛓️ Misión en mazmorra activa. Sistema hostil en escaneo.
ᰔᩚ *#halloween*
> 🎃 ¡Evento especial de Halloween desbloqueado! Dulce o truco activado.
ᰔᩚ *#christmas • #navidad*
> 🎄 ¡Protocolo festivo de Navidad activado! Recompensas entregadas.


🎥 :･ﾟ⊹˚• 『 SISTEMA DE STICKERS :: FAZBEAR VISUAL NODE 』 •˚⊹:･ﾟ•
⚙️ Control gráfico en línea... Sistema creativo activo.  
> 🖼️ Conversión de elementos visuales en curso...

ᰔᩚ *#sticker • #s*
> 🎞️ Extrayendo fragmento visual... Generando sticker desde imagen o video.
ᰔᩚ *#setmeta*
> 🏷️ Asignando etiquetas de autoría al paquete de stickers.
ᰔᩚ *#delmeta*
> 🧽 Eliminando huella digital del paquete gráfico.
ᰔᩚ *#pfp • #getpic*
> 📸 Recuperando imagen de vigilancia del usuario objetivo.
ᰔᩚ *#qc*
> ✒️ Creación de sticker con texto codificado o avatar de usuario.
ᰔᩚ *#toimg • #img*
> 📂 Descifrando sticker... Restaurando imagen original.
ᰔᩚ *#brat • #ttp • #attp*
> 🧠 Sintetizando texto visual. Render gráfico en ejecución.
ᰔᩚ *#emojimix*
> 🤖 Fusionando estructuras gráficas básicas... Combinación de emojis exitosa.
ᰔᩚ *#wm*
> 🪪 Modificando firma del archivo gráfico. Identificación reprogramada.


🛠️ :･ﾟ⊹˚• 『 NODO DE HERRAMIENTAS :: FAZBEAR SERVICE PROTOCOL 』 •˚⊹:･ﾟ•
🧩 Subsistema de funciones múltiples conectado a la red interna...
> 📟 Herramientas en línea para análisis, simulación y manipulación de datos.

ᰔᩚ *#calcular • #cal • #calcular*
> 🧮 Módulo de Cálculo Activo. Procesando ecuaciones en canal lógico.
ᰔᩚ *#tiempo • #clima*
> 🌤️ Accediendo al radar atmosférico. Visualización meteorológica regional.
ᰔᩚ *#horario*
> 🕐 Sincronizando relojes... Acceso a hora planetaria global.
ᰔᩚ *#fake • #fakereply*
> 🪞 Simulación social activada. Enviando réplica falsa.
ᰔᩚ *#enhance • #remini • #hd*
> 🧠 Reconstrucción gráfica en curso... Aumentando resolución.
ᰔᩚ *#letra*
> ✍️ Modificando fuente visual. Reemplazo estético en ejecución.
ᰔᩚ *#read • #readviewonce • #ver*
> 👁️ Subvirtiendo seguridad... Visualizando contenido de acceso único.
ᰔᩚ *#whatmusic • #shazam*
> 🔊 Nodo auditivo sincronizado. Análisis sonoro en progreso...
ᰔᩚ *#ss • #ssweb*
> 🌐 Captura remota activa. Imagen digital de página extraída.
ᰔᩚ *#length • #tamaño*
> 🧱 Ajustando dimensiones... Redimensionando imagen o video.
ᰔᩚ *#say • #decir* + [texto]
> 🎙️ Reproduciendo patrón verbal. Transmisión activada.
ᰔᩚ *#todoc • #toducument*
> 🗂️ Codificando archivo universal. Exportando como documento multimedia.
ᰔᩚ *#translate • #traducir • #trad*
> 🌐 Traducción automática iniciada. Idioma identificado... Traduciendo.


🎭 :･ﾟ⊹˚• 『 ARCHIVOS DE PERFIL :: IDENTIFICACIÓN DEL USUARIO 』 •˚⊹:･ﾟ•
🧠 Accediendo al *Módulo de Registro de Visitantes*. 
> ⚠️ Advertencia: Toda la información será almacenada en el núcleo de memoria de Fazbear Systems™.

ᰔᩚ *#reg • #verificar • #register*
> 🪪 Registro de presencia activado. Escaneando nombre y edad...
ᰔᩚ *#unreg*
> 🗑️ Datos eliminados del registro. Huella digital borrada.
ᰔᩚ *#profile*
> 👤 Visualizando expediente del usuario... Procesando identidad.
ᰔᩚ *#marry* [@usuario]
> 💍 Protocolo de emparejamiento emocional activado. Solicitud enviada...
ᰔᩚ *#divorce*
> 💔 Enlace emocional anulado. Separación ejecutada exitosamente.
ᰔᩚ *#setgenre • #setgenero*
> 🧬 Ingresando código genético... Género establecido.
ᰔᩚ *#delgenre • #delgenero*
> 🧬 Borrando identificador de género. Nodo actualizado.
ᰔᩚ *#setbirth • #setnacimiento*
> 🍼 Configurando fecha de origen biológico. Datos registrados.
ᰔᩚ *#delbirth • #delnacimiento*
> 🗓️ Fecha de origen removida del núcleo de perfil.
ᰔᩚ *#setdescription • #setdesc*
> 📝 Registro de identidad expandido. Descripción añadida.
ᰔᩚ *#deldescription • #deldesc*
> 🧾 Descripción eliminada. Perfil limpiado.
ᰔᩚ *#lb • #lboard* + <Página>
> 📊 Mostrando tabla de rendimiento. Evaluando niveles de actividad...
ᰔᩚ *#level • #lvl* + <@usuario>
> 🧱 Accediendo al nivel de usuario. Comparando progresión interna.
ᰔᩚ *#comprarpremium • #premium*
> 💳 Compra de pase prioritario. Acceso extendido autorizado.
ᰔᩚ *#confesiones • #confesar*
> 💌 Transmisión emocional anónima activa. Enviando a canales internos.


👁️‍🗨️ :･ﾟ⊹˚• 『 MÓDULO DE CONTROL DE GRUPO :: PROTOCOLO DE SUPERVISIÓN DE ZONAS 』 •˚⊹:･ﾟ•
🛰️ Activando herramientas de monitoreo de comportamiento y manejo de zonas compartidas.  
> ⚠️ Uso exclusivo del personal autorizado de FNaF Latinoamérica™.

ᰔᩚ *#hidetag*
> 🔊 Transmisión masiva a todas las entidades presentes en la zona.
ᰔᩚ *#gp • #infogrupo*
> 📋 Extrayendo datos del ecosistema del grupo. Información listada.
ᰔᩚ *#linea • #listonline*
> 🟢 Escaneo térmico completado. Usuarios conectados detectados.
ᰔᩚ *#setwelcome*
> 🛬 Mensaje de bienvenida implantado en la rutina de entrada.
ᰔᩚ *#setbye*
> 🛫 Mensaje de despedida implantado en la rutina de salida.
ᰔᩚ *#link*
> 🔗 Enlace de entrada al perímetro generado.
ᰔᩚ *#admins • #admin*
> 👥 Mención a operativos principales del sistema de grupo.
ᰔᩚ *#restablecer • #revoke*
> 🧩 Generando nueva llave de acceso. Código anterior revocado.
ᰔᩚ *#grupo [open / abrir]*  
> 🔓 Acceso libre habilitado. Zona abierta al público.
ᰔᩚ *#grupo [close / cerrar]*  
> 🔐 Acceso limitado. Solo administradores pueden emitir señales.
ᰔᩚ *#kick* [@usuario]
> ⚠️ Eliminando entidad no autorizada. Supervisión reforzada.
ᰔᩚ *#add • #añadir* [número]
> 🛠️ Usuario invitado a la zona bajo ID verificado.
ᰔᩚ *#promote* [@usuario]
> 🧬 Otorgando privilegios de control a la entidad seleccionada.
ᰔᩚ *#demote* [@usuario]
> 🧬 Revocando privilegios administrativos. Usuario desclasificado.
ᰔᩚ *#gpbanner • #groupimg*
> 🖼️ Imagen de identificación del grupo actualizada.
ᰔᩚ *#gpname • #groupname*
> 🧾 Nombre de la zona de control modificado.
ᰔᩚ *#gpdesc • #groupdesc*
> 🗒️ Descripción del perímetro modificada.
ᰔᩚ *#advertir • #warn*
> 🚨 Registro de conducta marcado. Nivel de alerta aumentado.
ᰔᩚ *#unwarn • #delwarn*
> 🟢 Nivel de alerta reducido. Advertencia removida.
ᰔᩚ *#advlist • #listadv*
> 📂 Accediendo al historial de advertencias.
ᰔᩚ *#bot on*
> ⚙️ Inteligencia Fazbear activada en esta sala.
ᰔᩚ *#bot off*
> 🔌 Modo de descanso activado. Sistema inactivo en esta zona.
ᰔᩚ *#mute* [@usuario]
> 🔇 Silenciamiento de transmisiones de la entidad activado.
ᰔᩚ *#unmute* [@usuario]
> 🔊 Restablecimiento de transmisiones para la entidad.
ᰔᩚ *#encuesta • #poll*
> 📊 Activando módulo de votación interna. Proceso democrático iniciado.
ᰔᩚ *#delete • #del*
> 🗑️ Mensaje detectado y eliminado de la red.
ᰔᩚ *#fantasmas*
> 👻 Identificando sujetos inactivos... Presencia no verificada.
ᰔᩚ *#kickfantasmas*
> 🧹 Expulsión automática de presencias inactivas.
ᰔᩚ *#invocar • #tagall • #todos*
> 🔔 Todos los sistemas notificados. Llamado masivo ejecutado.
ᰔᩚ *#setemoji • #setemo*
> 😶‍🌫️ Nuevo identificador gráfico asignado al grupo.
ᰔᩚ *#listnum • #kicknum*
> 🚷 Filtrado por prefijo internacional. Usuarios bloqueados por región.

📡 — Terminal de vigilancia FNaF LATAM™ Supervisión remota de grupos.


🎮 :･ﾟ⊹˚• 『 MÓDULO DE ENTRETENIMIENTO :: ZONA DE JUEGOS 』 •˚⊹:･ﾟ•
🎰 Conectando al sistema de juegos de Freddy Fazbear’s Mega Pizzaplex™...  
> ⚠️ Advertencia: Algunos juegos contienen niveles altos de caos y risas.

ᰔᩚ *#amistad • #amigorandom*  
> ✦ Estableciendo vínculo aleatorio con otro usuario. ¡Haz nuevos compañeros!

ᰔᩚ *#chiste*  
> ✦ Enviando un chiste desde los servidores de Bonnie.

ᰔᩚ *#consejo*  
> ✦ Entregando sabiduría vintage cortesía de Old Man Consejos.

ᰔᩚ *#doxeo • #doxear* + <@usuario>  
> ✦ Generando un doxeo falso (solo por humor, no real).

ᰔᩚ *#facto*  
> ✦ ¡Dato salvaje aparece! ¿Lo sabías?

ᰔᩚ *#formarpareja*  
> ✦ Escaneando corazones... Match encontrado 💖

ᰔᩚ *#formarpareja5*  
> ✦ Fusionando almas... Formando 5 parejas virtuales.

ᰔᩚ *#frase*  
> ✦ Sacando una frase del archivo de sabiduría de Fideos.

ᰔᩚ *#aplauso* + <@usuario>  
> ✦ 🎉 Enviando aplausos al usuario. ¡Se lo merece!

ᰔᩚ *#iq • #iqtest* + <@usuario>  
> ✦ Ejecutando test de coeficiente intelectual ficticio...

ᰔᩚ *#meme*  
> ✦ Reproduciendo imagen divertida desde el servidor de Roxy.

ᰔᩚ *#morse*  
> ✦ Traduciendo texto a código Morse... •-•••-•••!

ᰔᩚ *#nombreninja*  
> ✦ Tu nuevo nombre ninja ha sido asignado. ¡Prepárate!

ᰔᩚ *#personalidad* + <@usuario>  
> ✦ Analizando patrones... Descubriendo tu personalidad.

ᰔᩚ *#piropo*  
> ✦ Activando modo romántico. Enviando piropo encantador.

ᰔᩚ *#pregunta*  
> ✦ Haz una pregunta, la IA responderá según sus circuitos lógicos.

ᰔᩚ *#ship • #pareja*  
> ✦ Calculando compatibilidad entre almas. ¿Son el uno para el otro?

ᰔᩚ *#sorteo*  
> ✦ Activando ruleta de la suerte. ¡Elige un ganador aleatorio!

ᰔᩚ *#top*  
> ✦ Generando ranking personalizado. ¿Quién estará en el puesto 1?

ᰔᩚ *#formartrio* + <@usuario>  
> ✦ Triángulo amoroso detectado. ¡Formación establecida!

ᰔᩚ *#ahorcado*  
> ✦ Comenzando partida de ahorcado. ¡Adivina la palabra!

ᰔᩚ *#mates • #matematicas*  
> ✦ Modo educación activado. Responde operaciones y gana puntos.

ᰔᩚ *#ppt*  
> ✦ Piedra, papel o tijera. ¡Desafía al bot!

ᰔᩚ *#sopa • #buscarpalabra*  
> ✦ Iniciando sopa de letras. ¡Encuentra todas las palabras!

ᰔᩚ *#pvp • #suit* + <@usuario>  
> ✦ ¡Duelo activado! Ronda uno… ¡Lucha!

ᰔᩚ *#ttt*  
> ✦ Creando sala de juego. Esperando al segundo jugador...

📟 — Zona recreativa de FNaF LATAM™ sincronizada con éxito. Listos para jugar.
`.trim()

  await conn.sendMessage(m.chat, { 
      text: txt,
      contextInfo: {
          mentionedJid: [m.sender, userId],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: channelRD.120363025091220625@g.us,
              newsletterName: channelRD.FNaFLATAM,
              serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
              title:  FNaF LATAM,
              body: FNaF LATAM Bot,
              thumbnailUrl: https://static.wikia.nocookie.net/freddy-fazbears-pizza/images/0/07/Freddy_trailer.gif/revision/latest/scale-to-width-down/250?cb=20140829214317,
              sourceUrl: https://chat.whatsapp.com/HU9Dkmzru1P3od24zB1Mvl?mode=ac_t,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: m })

}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']


const channelRD = {
  id: "120363025091220625@g.us", // o un newsletter válido
  name: "FNaF LATAM"
}
const botname = "FNaF LATAM Bot"
const textbot = "Un bot hecho con amor por un amigo"
const banner = "https://i.imgur.com/WUev1DN.jpeg"
const redes = "https://chat.whatsapp.com/HU9Dkmzru1P3od24zB1Mvl?mode=ac_t"

export default handler

function clockString(ms) {
  let seconds = Math.floor((ms / 1000) % 60)
  let minutes = Math.floor((ms / (1000 * 60)) % 60)
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  return `${hours}h ${minutes}m ${seconds}s`
}
