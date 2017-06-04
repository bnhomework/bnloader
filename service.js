//from http://stackoverflow.com/questions/15852987/casperjs-passing-data-back-to-php/16489950#16489950
//define ip and port to web service
var require = patchRequire(require);
var _ = require('underscore');
var Casper = require('casper')
var fourImprint = require('fourImprint');
var utils = require('utils');
var options = {
    pageSettings: {
        loadImages: false, // The WebPage instance used by Casper will
        loadPlugins: false, // use these settings
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'
    },
    waitTimeout: 20000,
    retryTimeout: 200,
    // onResourceRequested : function(R, req, net) {
    //     // var match = req.url.match(/fbexternal-a\.akamaihd\.net\/safe_image|\.pdf|\.mp4|\.png|\.gif|\.avi|\.bmp|\.jpg|\.jpeg|\.swf|\.fla|\.xsd|\.xls|\.doc|\.ppt|\.zip|\.rar|\.7zip|\.gz|\.csv/gim);
    //     var match = req.url.match(/\.pdf|\.mp4|\.png|\.gif|\.avi|\.bmp|\.jpg|\.jpeg|\.swf|\.fla|\.xsd|\.xls|\.doc|\.ppt|\.zip|\.rar|\.csv/gim);
    //     if (match !== null) {
    //         net.abort();
    //     }
    // },
};
var ip_server = '127.0.0.1:8585';
//includes web server modules
var server = require('webserver').create();
var casper = Casper.create(options);
//start web server
var service = server.listen(ip_server, function(request, response) {

    
    var para = JSON.parse(request.post)
    var product = para.product;

    var url = para.url
    console.log(url);
    // console.log(JSON.stringify(product))
    casper.start(url, function() {
        casper.waitFor(function check() {
            return casper.evaluate(function() {
                return $('#productCopy').length > 0;
            });
        }, function then() {
            // casper.echo('Loaded:' + baseUrl + product.detailUrl)
            var detail = casper.evaluate(fourImprint.getProductDetail);
            var productDetail = _.extend(product, detail);
            casper.evaluate(fourImprint.post, 'http://127.0.0.1:3009/api/product/loadtest4', {
                product: productDetail
            });
        }, function timeout() {
            console.log('timeout:' + url)
        })
    });
    //
    casper.run(function() {
        casper.clearCache();
        response.statusCode = 200;
        response.write(JSON.stringify({ s: 'ok' }));
        response.close();
        // casper.exit();            
    });
});
console.log('Server running at http://' + ip_server + '/');
