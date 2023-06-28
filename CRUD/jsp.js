const request = {}; // 네임스페이스용 빈객체

request.getParameter = function(pName){
    if(location.href.indexOf("?") == -1) return;
    
    let queryString = location.href.split("?")[1];  // ?오른쪽 문자열을 쿼리스트링이라 부름
    let items = queryString.split("&");
    for(let i = 0; i<items.length; i++){
        let name = items[i].split("=")[0];
        let val = items[i].split("=")[1];
        if(name == pName){
            val = decodeURIComponent(val);
            // 공백이 +로 넘어오기때문에 재가공
            val = val.replaceAll("+", " ");
            return val;
        }
    }
    return null;
}

request.getParameterValues = function(pName){
    if(!location.href.includes("?")) return;
    
    let rslt = [];
    let queryString = location.href.split("?")[1];  // ?오른쪽 문자열을 쿼리스트링이라 부름
    let items = queryString.split("&");
    for(let i = 0; i<items.length; i++){
        let name = items[i].split("=")[0];
        let val = items[i].split("=")[1];
        if(name == pName){
            val = decodeURIComponent(val);
            // 공백이 +로 넘어오기때문에 재가공
            val = val.replaceAll("+", " ");
            rslt.push(val);
        }
    }
    if(!rslt.length) return null; // 아무것도 없을떄
    return rslt;
}