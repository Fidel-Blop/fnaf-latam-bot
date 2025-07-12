import axios from 'axios';
import fetch from 'node-fetch';

const firma = '🎭 Respaldado por FNAF LATAM 🎭';

const handler = async (m, { conn, usedPrefix, command, text }) => {
  const [efecto, ...textoArray] = (text || '').trim().split(/\s+/);
  const texto = textoArray.join(' ');

  if (!efecto) {
    let voiceList = await getVoiceList();
    let responseText = `👾 ¡Hola! No ingresaste ningún efecto de voz.\n\n🎙️ *${emoji2} Elige uno de los siguientes efectos disponibles:*\n\n`;

    for (let i = 0, count = 0; count < 100 && i < voiceList.resultado.length; i++) {
      const entry = voiceList.resultado[i];
      if (entry.ID.length <= 20) {
        responseText += `🔸 *${usedPrefix + command} ${entry.ID}* - ${entry.name}\n`;
        count++;
      }
    }
    responseText += `\n${firma}`;
    return conn.sendMessage(m.chat, { text: responseText.trim() }, { quoted: m });
  }

  let voiceList = await getVoiceList();
  const efectoValido = voiceList.resultado.some(entry => entry.ID === efecto);

  if (!efectoValido) {
    return conn.sendMessage(m.chat, {
      text: `❌ El efecto de voz *${efecto}* no existe.\nUsa *${usedPrefix + command}* para ver la lista de efectos.\n\n${firma}`
    }, { quoted: m });
  }

  if (!texto) {
    return conn.sendMessage(m.chat, {
      text: `⚠️ Por favor, ingresa el texto que deseas convertir a audio.\n\nEjemplo:\n${emoji2} *${usedPrefix + command} ${efecto} Hola, este es un ejemplo de uso del comando.*\n\n${firma}`
    }, { quoted: m });
  }

  try {
    const masivo = await makeTTSRequest(texto, efecto);
    if (!masivo.resultado) throw new Error('URL no encontrada');
    await conn.sendMessage(m.chat, {
      audio: { url: masivo.resultado },
      fileName: 'fnf-latam-audio.mp3',
      mimetype: 'audio/mpeg',
      ptt: true
    }, { quoted: m });
    await conn.sendMessage(m.chat, { text: firma }, { quoted: m });
  } catch (e) {
    console.error('Error en TTS:', e);
    await conn.sendMessage(m.chat, {
      text: `❌ Ocurrió un error al generar el audio. Intenta nuevamente más tarde.\n\n${firma}`
    }, { quoted: m });
  }
};

handler.command = ['tts2'];
export default handler;

const secretKey = 'fe2ee40099494579af0ecf871b5af266';
const userId = 'SrgwcKcLzSY63IdsAxd1PzscFjL2';

async function getVoiceList() {
  const url = 'https://play.ht/api/v2/voices';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      AUTHORIZATION: `Bearer ${secretKey}`,
      'X-USER-ID': userId
    }
  };
  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    const uniqueData = responseData.reduce((acc, current) => {
      if (!acc.some(item => item.id === current.id)) acc.push(current);
      return acc;
    }, []);
    const simplifiedList = uniqueData.map(entry => ({
      ID: entry.id,
      name: entry.name,
      lenguaje: entry.language
    }));
    return { resultado: simplifiedList || [] };
  } catch (error) {
    console.error('Error al obtener lista de voces:', error);
    return { resultado: [] };
  }
}

async function makeTTSRequest(texto, efecto) {
  const requestData = { text: texto, voice: efecto };
  const headers = {
    Authorization: `Bearer ${secretKey}`,
    'X-User-Id': userId,
    accept: 'text/event-stream',
    'content-type': 'application/json'
  };
  try {
    const response = await axios.post('https://play.ht/api/v2/tts', requestData, { headers });
    const events = response.data.split('\r\n\r\n');
    const eventData = events.find(event => event.includes('"stage":"complete"'));
    const urlMatch = eventData?.match(/"url":"([^"]+)"/);
    const url = urlMatch ? urlMatch[1] : null;
    return { resultado: url || null };
  } catch (error) {
    console.error('Error en solicitud TTS:', error);
    return { resultado: null };
  }
}
