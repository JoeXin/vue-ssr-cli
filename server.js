const Server = require('express')()
const Vue = require('vue')
const Fs = require('fs')

const Renderer = require('vue-server-renderer').createRenderer({
    template: Fs.readFileSync('./index.html', 'utf-8')
})

// const Renderer = require('vue-server-renderer').createRenderer()

Server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            name: `${req.url}+test`,
            url: req.url
        },
        template: '<div>hello {{name}}<h3>{{url}}</h3></div>'
    })

    Renderer.renderToString(app, (err, html) => {
        if (err) throw err
        // res.send('<h1>hello world</h1>')
        res.end(html)
        // res.end(`
        //     <!DOCTYPE html>
        //     <html lang="en">
        //     <head><title>Hello</title></head>
        //     <body>${html}</body>
        //     </html>
        // `)
    })
})

Server.listen(8000)