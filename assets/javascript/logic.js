var topics = ["cats", "dogs", "giraffes"];
var isAnimated = false;
var activeItem = ""
var giphyAPIKey = "eSqZO6ojSUC2LlqL8j6ip1Yycn1xHueV";
var onLoadImgCount = 10
var giphyData = {}
var lastImgClickId = "-1"
var favoriteCounter = 1





function createButtons(){
    $(".topic-item").remove();
    for (var i = 0; i < topics.length; i++){
        var button = $("<button>").attr("id",topics[i]).attr("value", topics[i]).attr("class", "btn btn-customize topic-item").html(topics[i])
        $(".topics").append(button)
    }
}


function getGiphyData(searchStr){
    console.log("http://api.giphy.com/v1/gifs/search?q=" + searchStr + "&api_key=" + giphyAPIKey)
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=" + searchStr + "&api_key=" + giphyAPIKey,
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


function addTopicItem(itemName){
    console.log("itemName: " + itemName)
    if(itemName != ""){
        topics.push(itemName)
        createButtons()
    }
}


function deactivateTopicBtn(selectorItem){
    $(selectorItem).removeClass("btn-active")
}


function activateTopicBtn(selectorItem){
    console.log("Yes")
    $(selectorItem).addClass("btn-active")
}


function activateSelectedTopic(btnObj){
    activeItem = btnObj.value;
    isAnimated = false;
    deactivateTopicBtn(".topic-item")
    $(".graphics").empty();
    getGiphyData(activeItem)
    activateTopicBtn(btnObj)
}


function duplicateTopics(topic){
    if (topics.includes(topic)){
        return true
    }
    else{
        return false
    }
}








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
    console.log("this.id: " + this.id)
});


$(document).on("click","#add-to-favorites", function(){
    if (activeItem !== ""){
        var a_fav = $("<a>").attr("data-favorite",activeItem).addClass("dropdown-item favorite-item").html(activeItem)
        $(".dropdown-menu").append(a_fav)
        
        localStorage.setItem("favoriteItem-" + favoriteCounter, activeItem)
        favoriteCounter++
        }
});


$(document).on("click",".favorite-item", function(){
    var searchString = $(this).attr("data-favorite")
    if (!duplicateTopics(searchString)){
        addTopicItem(searchString)
    }
    activateSelectedTopic(document.getElementById(searchString))
    // addTopicItem($(this).attr("data-favorite"))
});


$("#addItem").on("click",function(event){
    event.preventDefault()
    var searchString = $("#search-string").val().trim()
    if (!duplicateTopics(searchString)){
        addTopicItem(searchString)
    }
    activateSelectedTopic(document.getElementById(searchString))
})


$('form input').keydown(function (event) {
    if (event.keyCode == 13) {
        event.preventDefault()
        var searchString = $("#search-string").val().trim()
        if (!duplicateTopics(searchString)){
            addTopicItem(searchString)
        }
        activateSelectedTopic(document.getElementById(searchString))
    }
});

$(document).on("click", ".topics button", function(){
    activateSelectedTopic(this)
});





//Startup
createButtons()





while (localStorage.getItem("favoriteItem-" + favoriteCounter) !== null){
    
    var favItem = localStorage.getItem("favoriteItem-" + favoriteCounter)
    var a_fav = $("<a>").attr("data-favorite",favItem).addClass("dropdown-item favorite-item").html(favItem)

    $(".dropdown-menu").append(a_fav)
    favoriteCounter++
}
