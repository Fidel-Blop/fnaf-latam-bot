import { randomBytes } from "crypto"
import axios from "axios"

let handler = async (m, { conn, text }) => {
    if (!text) throw `👁 Solicitud incompleta.\n⚙️ ¿Cuál es tu pregunta para el módulo cognitivo?`;

    try {
        conn.reply(m.chat, `🧠 *Accediendo a núcleo de procesamiento mental...*\n⛓ Solicitud recibida. Analizando: *"${text}"*`, m);
        
        let data = await chatGpt(text);
        if (data === 404) {
            throw 'Respuesta no válida del núcleo.';
        }

        await conn.sendMessage(m.chat, {
            text: `📡 *INTERPRETACIÓN COMPLETADA*\n\n${data}\n\n— Sistema respaldado por FNaF LATAM™`
        }, { quoted: m });

    } catch (err) {
        console.error('Fallo en el módulo cognitivo:', err);
        m.reply(`⚠️ *ERROR DEL SISTEMA CEREBRAL*\nNo se pudo completar la simulación.\n\n📎 Detalles técnicos: ${err}`);
    }
};

handler.help = ['demo *<texto>*'];
handler.command = ['demo', 'openai'];
handler.tags = ['ai'];
handler.group = true;

export default handler;

async function chatGpt(query) {
    try {
        const { id_ } = (await axios.post("https://chat.chatgptdemo.net/new_chat", { user_id: "crqryjoto2h3nlzsg" }, {
            headers: { "Content-Type": "application/json" }
        })).data;

        const payload = {
            question: query,
            chat_id: id_,
            timestamp: new Date().getTime()
        };

        const { data } = await axios.post("https://chat.chatgptdemo.net/chat_api_stream", payload, {
            headers: { "Content-Type": "application/json" }
        });

        const chunks = data.split("data: ");
        let res = [];

        for (let i = 1; i < chunks.length; i++) {
            if (chunks[i].trim().length > 0) {
                res.push(JSON.parse(chunks[i].trim()));
            }
        }

        return res.map(a => a.choices[0].delta.content).join("");

    } catch (error) {
        console.error("Error parsing JSON:", error);
        return 404;
    }
}
