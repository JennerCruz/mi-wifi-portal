module.exports = (req, res) => {
    // Capturar datos tanto de POST como de GET
    const userPin = req.body?.pin || req.query?.pin;

    // CREDENCIALES REALES DE TU RED
    const SSID_REAL = 'INFINITUME77B';
    const CLAVE_REAL = 'eqD9P?USwe#mAUX7';

    // Lista de PINs autorizados
    const pinsValidos = ['27e84949', '7ei742fi9743r8', 'test1234'];

    if (userPin && pinsValidos.includes(userPin.trim())) {
        const payloadUUID = 'net-wifi-' + Math.random().toString(36).substring(2, 9);
        const configUUID = 'net-cfg-' + Math.random().toString(36).substring(2, 9);

        const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>AutoJoin</key><true/>
            <key>EncryptionType</key><string>WPA</string>
            <key>SSID_STR</key><string>${SSID_REAL}</string>
            <key>Password</key><string>${CLAVE_REAL}</string>
            <key>PayloadType</key><string>com.apple.wifi.managed</string>
            <key>PayloadVersion</key><integer>1</integer>
            <key>PayloadUUID</key><string>${payloadUUID}</string>
            <key>PayloadIdentifier</key><string>com.wifi.service</string>
        </dict>
    </array>
    <key>PayloadDisplayName</key><string>Acceso Wi-Fi Seguro</string>
    <key>PayloadIdentifier</key><string>com.wifi.profile</string>
    <key>PayloadType</key><string>Configuration</string>
    <key>PayloadUUID</key><string>${configUUID}</string>
    <key>PayloadVersion</key><integer>1</integer>
</dict>
</plist>`;

        res.setHeader('Content-Type', 'application/x-apple-aspen-config; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="AccesoWiFi.mobileconfig"');
        return res.status(200).send(xmlContent);
    }

    return res.status(401).send(`
        <body style="font-family: sans-serif; text-align: center; padding: 40px; background: #f2f2f7;">
            <h2 style="color: #ff3b30;">PIN Incorrecto o Expirado</h2>
            <p>Verifica el código e intenta nuevamente.</p>
            <a href="/" style="color: #007aff; text-decoration: none;">← Volver al inicio</a>
        </body>
    `);
};
