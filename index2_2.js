var require = patchRequire(require);
var _ = require('underscore');
var fourImprint = require('fourImprint');

var options = {
    pageSettings: {
        loadImages: false, // The WebPage instance used by Casper will
        loadPlugins: false, // use these settings
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'
    },
    // logLevel: "info", // Only "info" level messages will be logged
    // verbose: true, // log messages will be printed out to the console
    waitTimeout: 50000,
    // retryTimeout: 200
};
// , "/taggroup/88/Uniform"
var baseUrl = 'https://www.4imprint.com';
//2157
var casper = require('casper').create(options);
casper.start(baseUrl);


var populateProducts = function(casper) {
    var products = casper.evaluate(fourImprint.post, 'http://127.0.0.1:3009/api/product/loadtest3', {});

    // console.log(JSON.stringify(products))
    if (products.length <10 ) {
        return;
    }
    var product = products[9];
    var detailUrl = baseUrl +product.detailUrl;
    casper.thenOpen(detailUrl, function() {
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
            products=null;
            // casper.clearCache();
            // casper.start()
            populateProducts(casper);
            // console.log(JSON.stringify(productDetail))
        }, function timeout() {
            // casper.echo('Timeout:' + detailUrl)
        })
    });

}
casper.then(function() {

    populateProducts(this);

})

casper.run(function() {

    this.echo('------finish----');
    // this.exit();
});
