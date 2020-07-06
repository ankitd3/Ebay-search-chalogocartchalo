
const getDataFromFlask = async (url) => {

    uri = 'https://chalogocartchalo-279803.wl.r.appspot.com/search/'+encodeURIComponent(JSON.stringify(url))
    console.log('\t[Searching...]',uri)//https://chalogocartchalo-279803.wl.r.appspot.com/
    const myJson = await(await fetch(uri)).json();
    return myJson
}

function expand(outerDiv){
    outerDiv.children[2].children[6].style.display= 'inline';
    outerDiv.children[2].children[0].style.textOverflow ='unset';
    outerDiv.children[2].children[7].children[1].style.display='inline';
    outerDiv.children[0].style.display='block';
    outerDiv.children[2].children[0].style.whiteSpace= 'normal'; 
}
function showLess(spanEle){
    spanEle.parentElement.children[2].children[6].style.display='none';
    spanEle.parentElement.children[2].children[7].children[1].style.display='none';
    spanEle.parentElement.children[0].style.display='none';
    spanEle.parentElement.children[2].children[0].style.textOverflow ='ellipsis';
    spanEle.parentElement.children[2].children[0].style.whiteSpace= 'nowrap'; 
}
function onClickShowMoreCards(){
    let c
    for (i = 3; i<10; i++){
        c = document.getElementById(i)
        if (c){
            c.style.display = 'block';
        }
    }
}
function onClickShowLessCards(){
    let c
    for (i = 3; i<10; i++){
        c = document.getElementById(i)
        if (c){
            c.style.display = 'none';
        }
    }
}
function putHTML(formObj, data) {

    if (data.items.length != 0){
        s='<h2 style="text-align:center; font-family:serif;">'+data.totalEntries.toString()+' Results found for <i>'+formObj.keyword+'</i></h2><hr width="65%" style="margin-bottom:-4px;"/><br style="line-height: 3px;"/>'
    }
    else{
        s='<h2 style="text-align:center; font-family:serif;">No Results found</h2>'
    }


    if (data.items.length>10){
        data.items.length = 10
    }

    for (let i = 0; i<data.items.length; i++){

        if (i > 2){
            hide3to10 = "style = 'display:none;'"
        }
        else{
            hide3to10 = ''
        }

        acceptReturns = ''
        if (data.items[i].freeShipping == 'true'){
            shipping='Free Shipping'
        }
        else{
            shipping='No Free Shipping'
        }
        if (data.items[i].expeditedShipping == 'true'){
            shipping+=' -- Expedited Shipping available'
        }
        if (data.items[i].topRated == 'true'){
            topRated = "<img class='topratedimage' src='https://www.csci571.com/hw/hw6/images/topRatedImage.png'></img>"
        }
        else{
            topRated = "<span></span>"
        }
        if (data.items[i].acceptsReturn == 'true'){
            acceptReturns = 'Seller <b>accepts</b> returns'
        }
        else{
            acceptReturns = 'Seller <b>does not accept returns</b>'
        }

        s += "\
    <div class='outer' "+hide3to10+" id='"+i.toString()+"' onclick='expand(this)'>\
        <span id='crossButton' onclick='showLess(this); event.stopPropagation();' style='float:right; margin-right: 18px; margin-top: 5px; cursor: pointer;'>❌</span>\
        <img class='product' src="+data.items[i].image+">\
        <div id='inner'>\
            <div class='boom' id='b' style='margin-top:23px; font-size:1.1em;'>\
                <a href="+data.items[i].url+" target='_blank' onclick='event.stopPropagation()'>"+data.items[i].title+"</a>\
            </div>\
            <div class='boom' style='display: inline-block;'>\
                Category:<i> "+data.items[i].category+"</i>\
            </div>\
            <a href="+data.items[i].url+" target='_blank' onclick='event.stopPropagation()'>\
                <img class='redirect' src='https://www.csci571.com/hw/hw6/images/redirect.png'>\
            </a>\
            <br/>\
            <div class='boom' style='display:inline-block;'>\
                Condition: "+data.items[i].condition+"\
            </div>\
            "+topRated+"\
            <div id='extraItems'"+data.items[i].url+">\
                <div class='extra'>"+acceptReturns+"</div>\
                <div class='extra'>"+shipping+"</div>\
            </div>\
            <div class='boom'>\
                <b>Price: $"+data.items[i].price+" </b>\
                <i id='location'"+data.items[i].url+"> From "+data.items[i].location+"</i>\
            </div>\
        </div>\
    </div>"
    }
    if (data.items.length>3){

        showMore = "<button class='button button1' id='showMoreBtn' onclick=\"onClickShowMoreCards(this); this.style.display = 'none'; document.getElementById('showLessBtn').style.display = 'block'; window.scrollTo({top: 100000000,left:1,behavior: 'smooth'});\">Show More</button>\
        \
        <button class='button button1' style='display:none' id='showLessBtn' onclick=\"onClickShowLessCards(this); this.style.display = 'none'; document.getElementById('showMoreBtn').style.display = 'block'; window.scrollTo({top: 1,left:1,behavior: 'smooth'});\">Show Less</button>"
        
    }
    else{
        showMore = ''
    }
    document.getElementById('result').innerHTML=s+showMore

}
function getPayload(formObj){
    payload = 'keywords='+formObj.keyword+'&paginationInput.entriesPerPage=25&sortOrder='+formObj.sortby
    
    let i = 0

    if (formObj.MaxPrice){
        payload+='&itemFilter('+i.toString()+').name=MaxPrice&itemFilter('+i.toString()+').value='+formObj.MaxPrice.toString()+'&itemFilter('+i.toString()+').paramName=Currency&itemFilter('+i.toString()+').paramValue=USD'
        i+=1
    }
    if (formObj.MinPrice){
        payload+='&itemFilter('+i.toString()+').name=MinPrice&itemFilter('+i.toString()+').value='+formObj.MinPrice.toString()+'&itemFilter('+i.toString()+').paramName=Currency&itemFilter('+i.toString()+').paramValue=USD'
        i+=1
    }
    if (formObj.ReturnsAcceptedOnly){
        payload+='&itemFilter('+i.toString()+').name=ReturnsAcceptedOnly&itemFilter('+i.toString()+').value=true'
        i+=1
    }
    if (formObj.new || formObj.used || formObj.verygood || formObj.good || formObj.acceptable){
        payload+='&itemFilter('+i.toString()+').name=Condition'
        let j = 0
        if (formObj.new){
            payload+='&itemFilter('+i.toString()+').value('+j.toString()+')=1000'
            j+=1
        }
        if (formObj.used){
            payload+='&itemFilter('+i.toString()+').value('+j.toString()+')=3000'
            j+=1
        }
        if (formObj.verygood){
            payload+='&itemFilter('+i.toString()+').value('+j.toString()+')=4000'
            j+=1
        }
        if (formObj.good){
            payload+='&itemFilter('+i.toString()+').value('+j.toString()+')=5000'
            j+=1
        }
        if (formObj.acceptable){
            payload+='&itemFilter('+i.toString()+').value('+j.toString()+')=6000'
            j+=1
        }
        i+=1
    }
    if (formObj.FreeShippingOnly){
        payload+='&itemFilter('+i.toString()+').name=FreeShippingOnly&itemFilter('+i.toString()+').value=true'
        i+=1
    }
    if (formObj.ExpeditedShippingType){
        payload+='&itemFilter('+i.toString()+').name=ExpeditedShippingType&itemFilter('+i.toString()+').value=Expedited'
        i+=1
    }

    return payload
}
function getFormObj(){
    let formObj = {}
    let form = new FormData(document.getElementById("myForm"))
    for (var [key, value] of form.entries()) { 
        if (key == 'MinPrice' || key == 'MaxPrice'){
            formObj[key] = parseFloat(value)
        }
        else{
            formObj[key] = value
        }
    }
    return formObj
}
function validate(e){
    e.preventDefault()
    formObj = getFormObj()
    if(formObj.MinPrice < 0 || formObj.MaxPrice < 0){
        alert("Price range values cannot be negative! Please try a value greater than or equal to 0.0");
    }
    else if(formObj.MinPrice > formObj.MaxPrice){
        alert("Oops! Lower price limit cannot be greater than upper price limit! Please try again.");
    }
    else{
        payload = getPayload(formObj)
        getDataFromFlask(payload).then(data => {
            console.log('\t[Fetched DATA...]',data)
            putHTML(formObj, data)
        })
    }
    return false
}
