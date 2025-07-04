// ⁱ𝔇ĕ𝐬†𝓻⊙γ𒆜 -  >> https://github.com/The-King-Destroy
// Adaptado por Freddy AI Node 02 — Protocolo de Estética Sticker™

let handler = async (m, { text, usedPrefix, command }) => {
    const userId = m.sender;

    if (command === 'setmeta') {
        const packParts = text.split(/[\u2022|]/).map(part => part.trim());
        if (packParts.length < 2) {
            return m.reply(`⚠️ *Configuración incompleta detectada...*

🧩 Ingrese los valores requeridos: nombre del pack y autor del sticker.

> Ejemplo correcto:
*${usedPrefix + command} Freddy Fazbear • Sistema Fazwatch*

— Sistema respaldado por FNaF LATAM™`);
        }

        const packText1 = packParts[0];
        const packText2 = packParts[1];

        if (!global.db.data.users[userId]) global.db.data.users[userId] = {};

        const packstickers = global.db.data.users[userId];

        if (packstickers.text1 || packstickers.text2) {
            return m.reply(`🚨 *Meta existente detectada...*

Ya has registrado un pack de stickers predeterminado.

> Usa *${usedPrefix}delmeta* para eliminarlo primero.

— Sistema respaldado por FNaF LATAM™`);
        }

        packstickers.text1 = packText1;
        packstickers.text2 = packText2;

        await global.db.write();

        return m.reply(`✅ *Configuración completada...*

📦 Pack: *${packText1}*
✍️ Autor: *${packText2}*

Metadatos aplicados correctamente a tus próximos stickers.

— Sistema respaldado por FNaF LATAM™`);
    }

    if (command === 'delmeta') {
        if (
            !global.db.data.users[userId] ||
            (!global.db.data.users[userId].text1 && !global.db.data.users[userId].text2)
        ) {
            return m.reply(`📂 *Meta no encontrada...*

No has establecido aún ningún pack de stickers personalizado.

> Usa *${usedPrefix}setmeta* para establecer uno.

— Sistema respaldado por FNaF LATAM™`);
        }

        const packstickers = global.db.data.users[userId];
        delete packstickers.text1;
        delete packstickers.text2;

        await global.db.write();

        return m.reply(`🧹 *Limpieza completada...*

Todos los metadatos de stickers han sido restablecidos a su estado original.

— Sistema respaldado por FNaF LATAM™`);
    }
};

handler.help = ['setmeta', 'delmeta'];
handler.tags = ['tools', 'fazwatch'];
handler.command = ['setmeta', 'delmeta'];
handler.register = true;
handler.group = true;

export default handler;
