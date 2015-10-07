//My IIFE to scope all my stuff
(function () {
    
    var data = null;
    
    var localStorageKey = "tedTalkData";
    var targetArea = document.getElementById("tedTalks");
    var ajax = document.getElementById("ajax");
    var load = document.getElementById("load");
    var save = document.getElementById("save");
    var clear = document.getElementById("clear");

    function buildTalkArticle(tedTalk) {

        var youTubeEmbed = "https://www.youtube.com/embed/"
        var article, row, col1, col2, wrapper, iframe, h2, h3, headingText, paragraph, paraText;

        // Create HTML Elements
        article = document.createElement("article");
        row = document.createElement("div");
        row.setAttribute("class", "row");
        col1 = document.createElement("div");
        col1.setAttribute("class", "col-md-6 col-md-push-6");

        col2 = document.createElement("div");
        col2.setAttribute("class", "col-md-6 col-md-pull-6");

        wrapper = document.createElement("div");
        wrapper.setAttribute("class", "videoWrapper");

        iframe = document.createElement("iframe");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "allowfullscreen");
        iframe.setAttribute("src", youTubeEmbed + tedTalk.youTubeId);

        h2 = document.createElement("h2");
        headingText = document.createTextNode(tedTalk.title);
        h2.appendChild(headingText);

        h3 = document.createElement("h3");
        headingText = document.createTextNode(tedTalk.speaker);
        h3.appendChild(headingText);

        paragraph = document.createElement("p");
        paraText = document.createTextNode(tedTalk.description);
        paragraph.appendChild(paraText);

        // Put them together
        article.appendChild(row);
        row.appendChild(col1);
        row.appendChild(col2);

        col1.appendChild(wrapper);
        wrapper.appendChild(iframe);

        col2.appendChild(h2);
        col2.appendChild(h3);
        col2.appendChild(paragraph);

        return article;
    }
    
    function getHTTPObject() {
        var xhr;
        
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        }
        
        return xhr;
    }

    function loadDataAjax() {
        var request = getHTTPObject();

        request.open("GET", "data/tedTalks.json", true);
        request.send(null)
        request.onreadystatechange = function () {
            var text;

            if (request.readyState === 4 && request.status === 200) {
                
                text = request.responseText;
                data = JSON.parse(text);
                
                showTedTalkData();
            }
        }
    }
    
    function showTedTalkData() {
        
        var tedTalks = data.tedTalks;
        var i, talk;
        
        for (i = 0; i < tedTalks.length; i++) {
            if (i===0) {
                targetArea.innerHTML = "";
            }
            
            talk = tedTalks[i];
            targetArea.appendChild(buildTalkArticle(talk));

        }
    }
    
    function loadLocalData() {
        if (typeof(localStorage) === 'undefined') {
            targetArea.innerHTML = "Sorry, local storage is not supported for this browser.";
        }
        else {
            // Do the stuff to load the page data
            targetArea.innerHTML = "Loading Data...";
            text = localStorage.getItem(localStorageKey);
            if (text === null) {
                targetArea.innerHTML = "Sorry, no local data found.";
            } 
            else {
                data = JSON.parse(text);
                showTedTalkData(data);
            }
        }
    }
        
    
    function saveDataLocally(){
        if (typeof(localStorage) === 'undefined') {
            targetArea.innerHTML = "Sorry, local storage is not supported for this browser.";
        }
        else {
            if (data === null) {
                targetArea.innerHTML = "Sorry, you must load data before you can save.";
            } 
            else {
                localStorage.setItem(localStorageKey, JSON.stringify(data));
            }
        }
    }
                                 
    function clearDataLocally(){
        if (typeof(localStorage) === 'undefined') {
            targetArea.innerHTML = "Sorry, local storage is not supported for this browser.";
        }
        else {
            localStorage.removeItem(localStorageKey);
        }
    }
    
    // Do the stuff to load the page data
    targetArea.innerHTML = "Click a button to Load Data";

    ajax.addEventListener("click", loadDataAjax, false);
    load.addEventListener("click", loadLocalData, false);
    save.addEventListener("click", saveDataLocally, false);
    clear.addEventListener("click", clearDataLocally, false);

}())