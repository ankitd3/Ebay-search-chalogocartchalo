from flask import Flask, request, json
import requests

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT']=10

#TODO
EBAY_API_KEY = '<your_api_key>'

@app.route('/')
def client():
    return app.send_static_file('index.html')

@app.route('/search/<url>')
def search(url):
    result = {'items':[]}

    if url[0] == '"':
        url = url[1:]
    if url[-1] == '"':
        url = url[:-1]

    url_ = 'https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME='+EBAY_API_KEY+'&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&'+url
        
    data = requests.get(url_).json()

    try:
        data = data['findItemsAdvancedResponse'][0]

        # return data
        result['totalEntries'] = data['paginationOutput'][0]['totalEntries']
        count = data['searchResult'][0]['@count']

        searchResult = data['searchResult'][0]['item']
        
        for i in range(int(count)):
            if len(result['items']) > 9:
                break
            temp = {}
            try:
                if (float(searchResult[i]['shippingInfo'][0]['shippingServiceCost'][0]['__value__'])>0):
                    shipping = ' (+ $'+searchResult[i]['shippingInfo'][0]['shippingServiceCost'][0]['__value__']+' for shipping)'
                else:
                    shipping = ''

                if searchResult[i]['galleryURL'][0] == 'https://thumbs1.ebaystatic.com/pict/04040_0.jpg':
                    temp['image'] = 'https://www.csci571.com/hw/hw6/images/ebay_default.jpg'
                else:
                    temp['image'] = searchResult[i]['galleryURL'][0]

                temp['title'] = searchResult[i]['title'][0]                
                temp['category'] = searchResult[i]['primaryCategory'][0]['categoryName'][0]
                temp['url'] = searchResult[i]['viewItemURL'][0]
                temp['condition'] = searchResult[i]['condition'][0]['conditionDisplayName'][0]
                temp['topRated'] = searchResult[i]['topRatedListing'][0]
                temp['price'] = searchResult[i]['sellingStatus'][0]['convertedCurrentPrice'][0]['__value__']+shipping
                temp['acceptsReturn'] = searchResult[i]['returnsAccepted'][0]
                if (shipping == ''):
                    temp['freeShipping'] = 'true'
                else:
                    temp['freeShipping'] = 'false'
                temp['expeditedShipping'] = searchResult[i]['shippingInfo'][0]['expeditedShipping'][0]
                temp['location'] = searchResult[i]['location'][0]
                
                result['items'].append(temp)
            except:
                continue
    except:
        result['totalEntries'] = 0
    if len(result['items'])==0:
        result['totalEntries'] = 0
    return result

if __name__ == '__main__':
    app.run(debug=False)