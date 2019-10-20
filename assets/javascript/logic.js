var topics = ["cats", "dogs", "giraffes"];
var isAnimated = false;
var activeObject = {}
var giphyAPIKey = "eSqZO6ojSUC2LlqL8j6ip1Yycn1xHueV";
var onLoadImgCount = 10
var giphyData = {}
var lastImgClickId = "-1"





function createButtons(){
    $(".topics").empty()

    for (var i = 0; i < topics.length; i++){
        var button = $("<button>").attr("value", topics[i]).html(topics[i])
        $(".topics").append(button)
    }
}


function getGiphyData(searchStr){
    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q=" + searchStr + "&api_key=" + giphyAPIKey,
        method: "GET"
    }).then(function (response) {
        giphyData = response.data
        addGifImages(0,onLoadImgCount)
    });
}


function addGifImages(lbound,ubound){
    for (var i = lbound; i < ubound; i++){
        var imgSource = giphyData[i].images.fixed_height_still.url
        var img = $("<img>").attr("id", "gifImg-" + i).attr("value", i).attr("src", imgSource)
        $(".graphics").append(img)
    }
}








$(document).on("click", ".topics button", function(){
    isAnimated = false;
    $(".graphics").empty();
    console.log(this)
    getGiphyData(this.value)
});



$(document).on("click", ".graphics img", function(){
    var imgVal = this.getAttribute('value')
    var imgId = this.id

    if (imgId !== lastImgClickId && lastImgClickId !== "-1"){
        $("#" + lastImgClickId).attr("src", giphyData[$("#" + lastImgClickId).attr("value")].images.fixed_height_still.url)
        isAnimated=false;
    }

    if (isAnimated){
        $("#" + imgId).attr("src", giphyData[this.getAttribute('value')].images.fixed_height_still.url)
        isAnimated=false;
    }
    else{
        $("#" + imgId).attr("src", giphyData[this.getAttribute('value')].images.fixed_height.url)
        isAnimated=true;
    }
    lastImgClickId = this.id
});



$("#addItem").on("click",function(event){
    event.preventDefault()
    topics.push($("#search-string").val())
    $("#search-string").val("")
    createButtons()
})



//Startup
createButtons()