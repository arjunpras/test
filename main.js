var items = require('./itemarray.js')
var http = require('http')
var server = http.createServer(function(req, res) {

    if (req.url == '/getitem' && req.method == 'GET') {
        res.statusCode = 200
        res.write(JSON.stringify(items.itemarray))

        res.end()
    } else if (req.url == '/additem' && req.method == 'POST') {
        req.on('data', d => {
            process.stdout.write(d)
            res.write("item added")
            items.itemarray.push(JSON.parse(d))
            console.log(items.itemarray.toString())
            res.end()
        })
    } else if (req.url == "/putfile" && req.method == 'PUT') {
        res.write("file uploading through put")
        res.end()
    } else if (req.url == '/updateitem' && req.method == 'PATCH') {
        req.on('data', d => {
            var myitem = JSON.parse(d)
            for (let x of items.itemarray) {
                if (x.itemName == myitem.itemName) {
                    console.log(x.itemName + " matched")
                    var narray = items.itemarray.filter((e) => { e.itemName != myitem.itemName })
                    items.itemarray.push(myitem)
                    break;
                }
            }
        })
        res.write("update over")
        res.end()
    } else if (req.url == '/deleteitem' && req.method == 'DELETE') {
        req.on('data', d => {
            var myitem = JSON.parse(d)
            for (let x of items.itemarray) {
                if (x.itemName == myitem.itemName) {
                    console.log(x.itemName + " matched")
                    items.itemarray = items.itemarray.filter((e) => { e.itemName != myitem.itemName })
                }
            }
        })
        res.write("item deleted")
        res.end()
    } else {
        res.statusCode = 404
        res.write("Requested url not identified")
        res.end()
    }
})
server.listen(5000, function() {
    console.log("server started")
})