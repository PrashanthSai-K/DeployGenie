const express = require("express")
const WebSocket = require("ws")
const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

const app = express()
var expressWs = require("express-ws")(app);

app.ws('/conne', async function (ws, req) {
    try {

        await ssh.connect({
            host: "localhost",
            port: "22",
            username: "cloudgpu3",
            password: "cloudgpu@321"
        })

        const shell = await ssh.requestShell();

        ws.on("message", cmd => {            
            const data = JSON.parse(cmd);
            console.log(data.method);
            console.log(data.command);

            if (data.method == "command") {
                shell.write(data.command.trim() + "\n");
            }
        })

        shell.on("data", data => {
            const d = JSON.stringify({
                jsonpc: "2.0",
                data: data.toString()
            });            
            ws.send(d);
        })

        shell.stderr.on("data", data => {
            const d = JSON.stringify({
                jsonpc: "1.0",
                data: data.toString()
            });
            ws.send(d);
        })
    } catch (error) {
        console.log(error);
    }
});

app.listen(4500, (err) => {
    if (err) console.log(err);
    console.log("Connected");
})
