const {Panel} = require("@akarui/aoi.panel")
const aoijs = require("aoi.js")
const {Bot} = require("aoi.js")
const bot = new Bot({
    token: process.env.token,
    prefix: process.env.prefix,
    intents: ["GUILDS", "GUILD_MESSAGES"]
})

const panel = new Panel({
    username: process.env.username,//username for logging in
    password: process.env.password,//password for logging in
    secret: "aoijs",//session secret
    port: 3000,//port on which website is hosted, Not required! Default 3000
    bot: bot,//your aoi.js client
    mainFile: "index.js",//Main file where code is running.Not required, default taken from package.json
    commands: "commands"// folder name in which all the edit needing files are there.
})
panel.loadPanel()//Load The Panel

panel.onError()//Will detect errors, and send it to aoi.panel's error page.

bot.onMessage() //Will detect messages, and send it to aoi.js core to send messages.


bot.variables({
   prefix: "s.",
  channelstatus: "1010242389832634428",
  last: "null"
  });

bot.readyCommand({
  channel: '$getVar[channelstatus]"',
  code: `
    $log[
  ─━━━━━━━Ready Command Code━━━━━━━━━━━─
  Client: $userTag[$clientID]
  Ping: $ping ms
  Bot Creator: $username[$botOwnerID]#$discriminator[$botOwnerID]
  Commands loaded: $commandsCount
  ─━━━Created by BrianMitc#7316━━━─]`
})
bot.readyCommand({
    channel: "$getVar[channelstatus]",
    code: `$log[Filter reseted.]
$editIn[30ms;Reseted.;Reseted. **$serverCount Servers**]
Reseting Filter..
$setVar[last;$dateStamp]
$sendMessage[\`Ready on client $userTag[$clientID] Ping: $ping ms Bot Creator: $username[$botOwnerID]#$discriminator[$botOwnerID] Commands loaded: $commandsCount\` (\`$packageVersion\`);no]`
})