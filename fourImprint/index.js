var post = function(url, data) {
	// $.post(url, data, function(d) {
	// 	return d;
	// }, function(e) {
	// 	return e;
	// })
	var result={s:'xx'}
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.Parse(data),
		async:false,
		// timeout:5000,
		success: function(x) {
			result= x;
		},
		error:function(x){
			result= x;
		}
		,
		dataType: "application/json",
		contentType: "application/json"
	});
	return result;
}
var getProductDetail = function() {
	var detail = {
		descriptions: $.map($("#productCopy ul li"), function(x) {
			return $(x).text()
		}),
		imgs: $.map($(".extraImgsBox a.extraImage img"), function(x) {
			return $(x).attr('src')
		}),
		bigImgs: $.map($("#photoSwipeBox .rsSlide a.DetailsProdImg"), function(x) {
			return $(x).attr('href')
		})
	};
	return detail;
}
var getProductSummary = function() {
	return $.map($('.productList'), function(a, i) {
		return {
			detailUrl: $('.productLink a[title]:not(.videoLink)', a).attr('href'),
			name: $('.productLink a[title]:not(.videoLink)', a).attr('title'),
			smallImage: $('.productLink a[title]:not(.videoLink) img', a).attr('src'),
			ItemCode: $('.textDkGray', a).text().replace('Item #', '').trim()
		}
	});
}
module.exports = {
	post: post,
	getProductDetail: getProductDetail,
	getProductSummary: getProductSummary
}