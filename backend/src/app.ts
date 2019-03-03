import path from "path"
import express from "express"
const { Nuxt } = require('nuxt')

const FRONTEND_DIR = path.join(__dirname, "../../frontend")
const port = process.env.PORT || 3000

const config = require(path.join(FRONTEND_DIR, './nuxt.config.ts'))
config.buildDir = path.join(FRONTEND_DIR, config.buildDir || '.nuxt')
// why
config.dev = false
const nuxt = new Nuxt(config)

const app = express()

app.get('/hello', function(_, res) {
    res.send('hello');
});

app.use(nuxt.render)

console.log(`start listen: ${port}`)
app.listen(port);