import urllib
import urllib2
import json
import sys
from pyquery import PyQuery as pq
reload(sys)
sys.setdefaultencoding('utf8')


def getProduct():
	url = "http://127.0.0.1:3009/api/product/loadtest3"
	headers={'Content-Type':'application/json'}
	request = urllib2.Request(url,json.dumps({'limit':1,'skip':30}),headers)
	response = urllib2.urlopen(request)
	result=json.load(response)#response.read()
	if len(result)>0:
		return result[0]
	else:
		return {}
def getProductUrl(product):
	return "https://www.4imprint.com"+product["detailUrl"]

def loadProductDetail(url):
	detail={"ispy":"1"}
	detail["descriptions"]=[]
	detail["imgs"]=[]
	detail["bigImgs"]=[]

	#method1
	# headers = { 'User-Agent' : 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'} 
	# request = urllib2.Request(url,"",headers)
	# response = urllib2.urlopen(request)
	# rawHtml=response.read()
	# doc=pq(rawHtml)
	#method2
	doc=pq(url)
	discriptionlist= doc("#productCopy ul li")
	for d in discriptionlist.items():
		detail["descriptions"].append(d.text())

	extraImageList=doc(".extraImgsBox a.extraImage img")
	for ei in extraImageList.items():
		detail["imgs"].append(ei.attr('src'))
	bigImageList=doc("#photoSwipeBox .rsSlide a.DetailsProdImg")
	for bi in bigImageList.items():
		detail["bigImgs"].append(bi.attr('src'))
	return detail

def updateProduct(p):
	url = "http://127.0.0.1:3009/api/product/loadtest4"
	headers={'Content-Type':'application/json'}
	request = urllib2.Request(url,json.dumps({'product':p}),headers)
	response = urllib2.urlopen(request)
	result=json.load(response)
	print result

def doLoad():
	try:
		product=getProduct()
		url=getProductUrl(product)
		print url
		productDetail=loadProductDetail(url)
		product.update(productDetail)
		updateProduct(product)
		# print product
		pass
	except Exception as e:
		print e
	else:
		pass
	finally:
		pass

enable_proxy = False
proxy_handler = urllib2.ProxyHandler({"https" : 'us1.jssj17.com'})
null_proxy_handler = urllib2.ProxyHandler({})
if enable_proxy:
    opener = urllib2.build_opener(proxy_handler)
else:
    opener = urllib2.build_opener(null_proxy_handler)
urllib2.install_opener(opener)

while True:
	doLoad()
	pass


