const qrcode = require("qrcode-terminal")
const fs = require('fs')
const pino = require('pino')
const { default: makeWASocket, Browsers, delay, useMultiFileAuthState, BufferJSON, fetchLatestBaileysVersion, PHONENUMBER_MCC, DisconnectReason, makeInMemoryStore, jidNormalizedUser, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys")
const Pino = require("pino")
const NodeCache = require("node-cache")
const chalk = require("chalk")
const readline = require("readline")
const { parsePhoneNumber } = require("libphonenumber-js")


let phoneNumber = "01977073308"

const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))


  async function qr() {
//------------------------------------------------------
let { version, isLatest } = await fetchLatestBaileysVersion()
const {  state, saveCreds } =await useMultiFileAuthState(`./sessions`)
    const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"
    const XeonBotInc = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode, // popping up QR in terminal log
      browser: Browsers.windows('Firefox'), 
     auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      markOnlineOnConnect: true, // set false for offline
      generateHighQualityLinkPreview: true, // make high preview link
      getMessage: async (key) => {
         let jid = jidNormalizedUser(key.remoteJid)
         let msg = await store.loadMessage(jid, key.id)

         return msg?.message || ""
      },
      msgRetryCounterCache, 
      defaultQueryTimeoutMs: undefined, 
   })


    
   if (pairingCode && !XeonBotInc.authState.creds.registered) {
      if (useMobile) throw new Error('Cannot use pairing code with mobile api')

      let phoneNumber
      if (!!phoneNumber) {
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright(" This bot CREATE by MD NAJMUL HOQUE NAYIM  Start with country code of your WhatsApp Number, Example : +8801977073308")))
            process.exit(0)
         }
      } else {
         phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`This bot CREATE by MD NAJMUL HOQUE NAYIM\nPlease type your WhatsApp number 😍\nFor example: +8801977073308 : `)))
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         
         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +8801977073308")))

            phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`This bot CREATE by MD NAJMUL HOQUE NAYIM\nPlease type your WhatsApp number 😍\nFor example: +8801977073308 : `)))
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
            rl.close()
         }
      }

      setTimeout(async () => {
         let code = await XeonBotInc.requestPairingCode(phoneNumber)
         code = code?.match(/.{1,4}/g)?.join("-") || code
         console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
      }, 3000)
   }
//------------------------------------------------------
    XeonBotInc.ev.on("connection.update",async  (s) => {
        const { connection, lastDisconnect } = s
        if (connection == "open") {
            await delay(1000 * 10)
            await XeonBotInc.sendMessage(XeonBotInc.user.id, { text: `┌─𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐝 𝐁𝐲
┌─────────────────
│ 𝐌𝐃 𝐍𝐀𝐉𝐌𝐔𝐋 𝐇𝐎𝐐𝐔𝐄 𝐍𝐀𝐘𝐈𝐌
└─────────────────
┌─𝗢𝘄𝗻𝗲𝗿  𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽
│ wa.me/+8801977073308
│ wa.me/+8801601770734
└─────────
┌─  𝗢𝘄𝗻𝗲𝗿 𝗬𝐨𝐮𝐭𝐮𝐛𝐞 𝐀𝐧𝐝 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤
│𝑆𝑢𝑏𝑠𝑐𝑟𝑖𝑏𝑒 𝑴𝑹-404-𝑾𝑶𝑹𝑳𝑫
│ https://www.youtube.com/@D3V1L.N4Y1M
│𝑭𝑶𝑳𝑳𝑶𝑾 𝑶𝑾𝑵𝑬𝑹 𝑭𝑨𝑪𝑬𝑩𝑶𝑶𝑲 𝑰𝑫 
│ https://www.facebook.com/TODER.ABBU.LAGI.OKh
└─────────
┌─ 𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦 𝗖𝗵𝗮𝗻𝗻𝗲𝗹𝘀
│https://t.me/MR_404_WORLD
└─────────
┌─  𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝗚𝗿𝗼𝘂𝗽𝘀
│https://chat.whatsapp.com/HhBPkCziE1p3ACjCoyKmLK
└─────────────────\n\n\n` });
            let sessionXeon = fs.readFileSync('./sessions/creds.json');
            await delay(1000 * 2) 
             const xeonses = await  XeonBotInc.sendMessage(XeonBotInc.user.id, { document: sessionXeon, mimetype: `application/json`, fileName: `creds.json` })
               XeonBotInc.groupAcceptInvite("Kjm8rnDFcpb04gQNSTbW2d");
             await XeonBotInc.sendMessage(XeonBotInc.user.id, { text:
               `⚠️ 𝑻𝒉𝒊𝒔 𝒊𝒔 𝒀𝒐𝒖𝒓 𝑪𝒓𝒆𝒅𝒊𝒕 𝑱𝒔 𝑭𝒊𝒍𝒆 ⚠️\n
┌─────────────────
│ 𝐖𝐇𝐀𝐓𝐒 𝐀𝐏𝐏-𝐉𝐒𝐎𝐍-𝚩𝚯𝚻
└┬────────────────
┌┤✑ 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐝 𝐁𝐲
│└─────────────┈ ⳹    
│   𝐌𝐃 𝐍𝐀𝐉𝐌𝐔𝐋 𝐇𝐎𝐐𝐔𝐄 𝐍𝐀𝐘𝐈𝐌
└──────────────┈ ⳹\n\n ` }, {quoted: xeonses});
              await delay(1000 * 2) 
              process.exit(0)
        }
        if (
            connection === "close" &&
            lastDisconnect &&
            lastDisconnect.error &&
            lastDisconnect.error.output.statusCode != 401
        ) {
            qr()
        }
    })
    XeonBotInc.ev.on('creds.update', saveCreds)
    XeonBotInc.ev.on("messages.upsert",  () => { })
}
qr()

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("conflict")) return
if (e.includes("not-authorized")) return
if (e.includes("Socket connection timeout")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})
