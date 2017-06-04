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
    waitTimeout: 20000,
    retryTimeout: 200
};
// , "/taggroup/88/Uniform"
var baseUrl = 'https://www.4imprint.com';
//2157
var casper = require('casper').create(options);
casper.start(baseUrl);


var populateProducts = function(casper, i) {
    var products = casper.evaluate(fourImprint.post, 'http://127.0.0.1:3009/api/product/loadtest3', {});


    if (products.length >= 10) {
        var offset = i % 2;
        var product = products[3 + offset];
        var detailUrl = baseUrl + product.detailUrl;
        console.log(detailUrl);
        casper.evaluate(fourImprint.post, 'http://127.0.0.1:8585', JSON.stringify({ url: detailUrl, product: product }));
    }
    populateProducts(casper, i++);

}
casper.then(function() {

    populateProducts(this, 1);

})

casper.run(function() {

    this.echo('------finish----');
    // this.exit();
});
