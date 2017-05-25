var require = patchRequire(require);
var _ = require('underscore');
var fourImprint = require('fourImprint');

var options = {
    pageSettings: {
        loadImages: false, // The WebPage instance used by Casper will
        loadPlugins: false, // use these settings
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'
    },
    logLevel: "info", // Only "info" level messages will be logged
    verbose: true, // log messages will be printed out to the console
    waitTimeout: 30000,
    retryTimeout: 200
};
// , "/taggroup/88/Uniform"
var baseUrl = 'https://www.4imprint.com';
//2157
var categories = ["/tag/97/T-Shirts", "/tag/83/Dress-Shirts", "/tag/94/Polo-Shirts", "/tag/92/Outerwear", "/tag/93/Apparel-Accessories", "/tag/96/Sweatshirts", "/tag/91/Headwear", "/womens-apparel", "/tag/706/Sweaters", "/tag/4531/Athletic", "/tag/184/Embroidered", "/tag/149/Auto-Accessories", "/tag/124/Key-Tags", "/tag/283/Living", "/tag/5455/Food-and-Lunch-Containers", "/tag/163/Pet-Supplies", "/tag/121/Flashlights", "/tag/282/Kitchenware", "/tag/133/Tape-Measures", "/tag/281/Key-Lights", "/tag/167/Lawn-and-Garden", "/tag/128/Tools", "/tag/106/Totes", "/tag/442/Laptop-and-Tablet", "/tag/107/Travel", "/tag/164/Coolers", "/tag/98/Business-Bags", "/tag/103/Plastic-Bags", "/tag/105/Drawstring-Sportpacks", "/tag/99/Backpacks", "/tag/102/Paper-Bags", "/tag/100/Duffels", "/travel-wallets-and-coin-purses", "/gift-bags", "/embroidered-bags", "/tag/114/Sport-Bottles", "/tag/115/Travel-Mugs", "/tag/109/Beverage-Holders", "/tag/320/Plastic-Cups", "/tag/518/Vacuum-Insulated", "/tag/112/Glassware", "/tag/541/Disposable-Cups", "/tag/110/Ceramic-Mugs", "/tag/112/Glassware", "/tag/490/Coasters", "/tag/5273/Candy", "/tag/5297/Individually-Wrapped", "/tag/5301/Bags", "/tag/5332/Chocolate", "/tag/5280/Cookies", "/tag/5302/Candy-Jars", "/tag/5330/Gum", "/tag/5328/Mints", "/tag/5300/Tins", "/tag/5341/Nuts-and-Pretzels", "/giftboxes-and-baskets", "/foodgifts", "/tag/5292/Popcorn", "/tag/284/Beverages", "/tag/290/BBQ", "/tag/5342/Mixed-Assortment", "/tag/5335/Cheese-and-Meats", "/tag/492/Wine-Accessories", "/tag/127/Magnets", "/tag/132/Stickers-and-Decals", "/tag/136/Awards-and-Recognition", "/tag/141/Desk-Accessories", "/tag/145/Stress-Relievers", "/tag/297/Business-Card-Holders", "/tag/143/Picture-Frames", "/tag/144/Rulers", "/tag/138/Clocks", "/tag/150/Books-and-Bookmarks", "/tag/137/Calculators", "/tag/148/Watches", "/tag/87/Umbrellas", "/tag/295/Team-Spirit", "/tag/165/Golf-and-Sports", "/tag/170/Towels", "/tag/291/Blankets", "/tag/292/Chairs", "/tag/169/Sunglasses", "/tag/294/Sports", "/tag/290/BBQ", "/tag/293/Hand-Fans", "/tag/120/Padfolios", "/tag/139/Cubes,-Pads-and-Flags", "/tag/175/Calendars", "/tag/119/Notebooks-and-Journals", "/tag/5230/Printed-Marketing-Materials", "/tag/300/Planners-and-Diaries", "/tag/299/Presentation-Folders", "/tag/142/Packaging", "/tag/157/Greeting-Cards", "/tag/298/Document-Holders", "/tag/296/Binders", "/tag/481/Clipboard", "/tag/5583/Power-Banks", "/tag/147/USB-Flash-Drives", "/tag/5327/Stylus", "/tag/302/Tech-Accessories-and-Gadgets", "/tag/442/Laptop-and-Tablet", "/tag/5014/Music-and-Audio", "/tag/140/Mouse-Pads", "/tag/135/Childrens-Toys", "/tag/312/Novelty-and-Sport-Balls", "/tag/313/Coloring", "/tag/310/Balloons", "/tag/311/Flyers", "/tag/314/Executive-Toys", "/tag/5040/Noisemakers", "/tag/668/Tattoos", "/tag/5502/Light-Up", "/tag/309/Table-Covers-and-Throws", "/tag/305/Banners,-Flags-and-Signs", "/tag/126/Lanyards-and-Badges", "/tag/5037/Lanyard-Accessories", "/tag/306/Display-Accessories-and-Add-ons", "/tag/151/Food-Service-Supplies", "/tag/308/Tabletop-Displays", "/tag/535/Trade-Show-Games", "/tag/307/Floor-Displays", "/tag/730/Display-Kits", "/tradeshow-tents", "/tag/533/Literature-Displays", "/tag/5199/Giveaways", "/tag/162/Personal-Care", "/tag/153/First-Aid", "/tag/130/Safety", "/tag/158/Healthcare", "/tag/316/Hand-Sanitizers", "/tag/154/Fitness", "/tag/161/Pedometers", "/tag/317/Lip-Balm", "/tag/318/Sunscreen", "/tag/4989/Educational-Guides", "/tag/4991/Awareness", "/tag/4992", "/tag/89/Pens", "/tag/172/Pencils", "/tag/319/Multi-Function-Writing", "/tag/173/Writing-Sets", "/tag/6026/Executive-Writing", "/StylusPens", "/tag/350/Highlighter", "/tag/351/Marker", "/allboutiquestores.aspx", "/allproductgroups.aspx", "/allproductgroups.aspx"];
categories = [  "/womens-apparel", "/tag/706/Sweaters", "/tag/4531/Athletic", "/tag/184/Embroidered", "/tag/149/Auto-Accessories", "/tag/124/Key-Tags", "/tag/283/Living", "/tag/5455/Food-and-Lunch-Containers", "/tag/163/Pet-Supplies", "/tag/121/Flashlights", "/tag/282/Kitchenware", "/tag/133/Tape-Measures", "/tag/281/Key-Lights", "/tag/167/Lawn-and-Garden", "/tag/128/Tools", "/tag/106/Totes", "/tag/442/Laptop-and-Tablet", "/tag/107/Travel", "/tag/164/Coolers", "/tag/98/Business-Bags", "/tag/103/Plastic-Bags", "/tag/105/Drawstring-Sportpacks", "/tag/99/Backpacks", "/tag/102/Paper-Bags", "/tag/100/Duffels", "/travel-wallets-and-coin-purses", "/gift-bags", "/embroidered-bags", "/tag/114/Sport-Bottles", "/tag/115/Travel-Mugs", "/tag/109/Beverage-Holders", "/tag/320/Plastic-Cups", "/tag/518/Vacuum-Insulated", "/tag/112/Glassware", "/tag/541/Disposable-Cups", "/tag/110/Ceramic-Mugs", "/tag/112/Glassware", "/tag/490/Coasters", "/tag/5273/Candy", "/tag/5297/Individually-Wrapped", "/tag/5301/Bags", "/tag/5332/Chocolate", "/tag/5280/Cookies", "/tag/5302/Candy-Jars", "/tag/5330/Gum", "/tag/5328/Mints", "/tag/5300/Tins", "/tag/5341/Nuts-and-Pretzels", "/giftboxes-and-baskets", "/foodgifts", "/tag/5292/Popcorn", "/tag/284/Beverages", "/tag/290/BBQ", "/tag/5342/Mixed-Assortment", "/tag/5335/Cheese-and-Meats", "/tag/492/Wine-Accessories", "/tag/127/Magnets", "/tag/132/Stickers-and-Decals", "/tag/136/Awards-and-Recognition", "/tag/141/Desk-Accessories", "/tag/145/Stress-Relievers", "/tag/297/Business-Card-Holders", "/tag/143/Picture-Frames", "/tag/144/Rulers", "/tag/138/Clocks", "/tag/150/Books-and-Bookmarks", "/tag/137/Calculators", "/tag/148/Watches", "/tag/87/Umbrellas", "/tag/295/Team-Spirit", "/tag/165/Golf-and-Sports", "/tag/170/Towels", "/tag/291/Blankets", "/tag/292/Chairs", "/tag/169/Sunglasses", "/tag/294/Sports", "/tag/290/BBQ", "/tag/293/Hand-Fans", "/tag/120/Padfolios", "/tag/139/Cubes,-Pads-and-Flags", "/tag/175/Calendars", "/tag/119/Notebooks-and-Journals", "/tag/5230/Printed-Marketing-Materials", "/tag/300/Planners-and-Diaries", "/tag/299/Presentation-Folders", "/tag/142/Packaging", "/tag/157/Greeting-Cards", "/tag/298/Document-Holders", "/tag/296/Binders", "/tag/481/Clipboard", "/tag/5583/Power-Banks", "/tag/147/USB-Flash-Drives", "/tag/5327/Stylus", "/tag/302/Tech-Accessories-and-Gadgets", "/tag/442/Laptop-and-Tablet", "/tag/5014/Music-and-Audio", "/tag/140/Mouse-Pads", "/tag/135/Childrens-Toys", "/tag/312/Novelty-and-Sport-Balls", "/tag/313/Coloring", "/tag/310/Balloons", "/tag/311/Flyers", "/tag/314/Executive-Toys", "/tag/5040/Noisemakers", "/tag/668/Tattoos", "/tag/5502/Light-Up", "/tag/309/Table-Covers-and-Throws", "/tag/305/Banners,-Flags-and-Signs", "/tag/126/Lanyards-and-Badges", "/tag/5037/Lanyard-Accessories", "/tag/306/Display-Accessories-and-Add-ons", "/tag/151/Food-Service-Supplies", "/tag/308/Tabletop-Displays", "/tag/535/Trade-Show-Games", "/tag/307/Floor-Displays", "/tag/730/Display-Kits", "/tradeshow-tents", "/tag/533/Literature-Displays", "/tag/5199/Giveaways", "/tag/162/Personal-Care", "/tag/153/First-Aid", "/tag/130/Safety", "/tag/158/Healthcare", "/tag/316/Hand-Sanitizers", "/tag/154/Fitness", "/tag/161/Pedometers", "/tag/317/Lip-Balm", "/tag/318/Sunscreen", "/tag/4989/Educational-Guides", "/tag/4991/Awareness", "/tag/4992", "/tag/89/Pens", "/tag/172/Pencils", "/tag/319/Multi-Function-Writing", "/tag/173/Writing-Sets", "/tag/6026/Executive-Writing", "/StylusPens", "/tag/350/Highlighter", "/tag/351/Marker", "/allboutiquestores.aspx", "/allproductgroups.aspx", "/allproductgroups.aspx"];
var timeoutCategories = [];
var allProducts = [];
var pcount = 0;
var casper = require('casper').create(options);


_.each(categories, function(c) {
    var curl = baseUrl + c + '?PS=2000';
    // casper.then(function(){
    //     this.page.close();
    //     this.page = this.newPage();
    // })
    casper.start();
    casper.thenOpen(curl,function() {        
        this.waitFor(function check() {
                return this.evaluate(function() {
                    return $('.productList').length > 0;
                });
            }, function then() {
                this.echo('begin:'+curl);
                var summary = this.evaluate(fourImprint.getProductSummary);
                pcount += summary.length;
                _.each(summary, function(s) {
                    s.category = c;
                    var postData = {
                        product: s
                    };
                    casper.evaluate(fourImprint.post,'http://127.0.0.1:3009/api/product/loadtest',postData);
                    // casper.evaluate(function(postData) {
                    //     __utils__.sendAJAX('http://127.0.0.1:3009/api/product/loadtest', 'POST', postData, false, {
                    //         contentType: "application/json",dataType: "application/json"
                    //     });
                    // }, {postData:postData});
                    // casper.thenOpen('http://127.0.0.1:3009/api/product/loadtest',{method:'post',data:{ product:s},contentType: "application/json"})
                    // s.category = c;
                    // allProducts.push(s)
                });
                this.echo('done:'+curl);
                // this.waitDone();
                // _.each(summary, function(d) {
                //     var detailUrl=baseUrl + d.detailUrl
                //     casper.thenOpen(detailUrl, function() {

                //         this.waitFor(function check() {
                //             return this.evaluate(function() {
                //                 return $('#productCopy').length > 0;
                //             });
                //         }, function then() {
                //             casper.echo('Loaded:'+baseUrl + d.detailUrl)
                //             var detail = this.evaluate(fourImprint.getProductDetail);
                //             var productDetail = _.extend(d, detail);
                //             productDetail.category = c;
                //             this.evaluate(fourImprint.post,'http://127.0.0.1:3009/api/product/loadtest', {
                //                 product: productDetail
                //             });
                //         }, function timeout() {
                //             this.echo('Timeout:'+detailUrl)
                //         })
                //     })
                // });
            },
            function timeout() {
                timeoutCategories.push(c);
            })
    });
    casper.run(function() {
    this.echo('------finish----');
    this.exit();
});
});
    


