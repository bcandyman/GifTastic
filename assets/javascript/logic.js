var topics = ["cats", "dogs", "giraffes"];
var isAnimated = false;
var activeObject = {}
var giphyAPIKey = "eSqZO6ojSUC2LlqL8j6ip1Yycn1xHueV";
var onLoadImgCount = 10
var giphyData = {}
var lastImgClickId = "-1"





function createButtons(){
    // $(".topics").empty()
    $(".topic-item").remove();
    // $(".topics *:not('.input-group')").remove();

    for (var i = 0; i < topics.length; i++){
        var button = $("<button>").attr("value", topics[i]).attr("class", "btn btn-secondary topic-item").html(topics[i])
        $(".topics").append(button)
    }
}


function getGiphyData(searchStr){
    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q=" + searchStr + "&api_key=" + giphyAPIKey,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        giphyData = response.data
        addGifImages(0,onLoadImgCount)
    });
}


function addGifImages(lbound,ubound){
    for (var i = lbound; i < ubound; i++){
        var newDiv = $("<Div>").addClass("gifImg border")
        var imgSource = giphyData[i].images.fixed_height_still.url
        var img = $("<img>").attr("id", "gifImg-" + i).attr("value", i).attr("src", imgSource)
        var rating = $("<p>").attr("class", "rating").html("Rating: " + giphyData[i].rating.toUpperCase())

        newDiv.append(img)
        newDiv.append(rating)
        $(".graphics").append(newDiv)
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
    
    if($("#search-string").val().trim() != ""){
        topics.push($("#search-string").val())
        $("#search-string").val("")
        createButtons()
    }
})



//Startup
createButtons()