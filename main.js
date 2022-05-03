//master list of tweets
const masterList = [];
var i = 0;
// specify a url, in this case our web server
function getTweets(){
    const url = "http://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=weather";
    fetch(url).then(function(response){
      return response.json();
    }).then(function(data){
      if(i != Object.keys(data.statuses).length) {
        var exist = false;
        for (let j = 0; j< masterList.length; ++j){
          if(data.statuses[i].id == masterList[j].id){
            exist = true;
            console.log('entered true')
            break;
          }
        }
        if (exist != true){
          objIn = data.statuses[i]
          let obj = {
            id: objIn.id,
            text: objIn.text,
            created_at: objIn.created_at,
            sort_time: objIn.created_at.slice(0,objIn.created_at.length-5),
            userName: objIn.user.screen_name,
            screenName: objIn.user.name,
            profilePic: objIn.user.profile_image_url_https,
            };
          obj.sort_time = obj.sort_time.replace(/-/g,'')
          obj.sort_time = obj.sort_time.replace(/:/g,'')
          obj.sort_time = obj.sort_time.replace(/T/g,'')
          masterList.push(obj);
          masterList.sort((a,b)=> a.sort_time - b.sort_time);
        }
        ++i
      }
    }).catch(function(err){
      console.warn("Something went wrong!", err); 
    });
}

var k = 0;
function search(){
  if (searchString != ""){
    if (masterList[k].text.includes(searchString)){
      console.log("search found");
      objIn = masterList[k];
      displayTweets(objIn);
    }
    else {
      console.log("can't be searched");
    }
  }
  else{
    console.log("no search");
    objIn = masterList[k]
    displayTweets(objIn);
  }
  ++k
}

function displayTweets(obj){
  console.log(obj)
    var twtName = document.createElement("span");
    twtName.classList.add("tweet_name");
    var twtNameTxt = document.createTextNode(obj.screenName);
    twtName.appendChild(twtNameTxt);

    var twtUserName = document.createElement("span");
    twtUserName.classList.add("tweet_username");
    var twtUserNameTag = document.createTextNode("@");
    var twtUserNameTxt = document.createTextNode(obj.userName);
    twtUserName.appendChild(twtUserNameTag);
    twtUserName.appendChild(twtUserNameTxt);

    var twtTime = document.createElement("span");
    twtTime.classList.add("tweet_time");
    var twtTimeTxt = document.createTextNode(moment(obj.created_at).format('MMMM DD, YYYY'));
    twtTime.appendChild(twtTimeTxt);

    var twtInfo = document.createElement("div");
    twtInfo.classList.add("tweet_info");
    twtInfo.appendChild(twtName);
    twtInfo.appendChild(twtUserName);
    twtInfo.appendChild(twtTime);

    var twtText = document.createElement("p");
    twtText.classList.add("tweet_text");
    var twtTextTxt = document.createTextNode(obj.text);
    twtText.appendChild(twtTextTxt);

    var twtMain = document.createElement("div");
    twtMain.classList.add("tweet_main");
    twtMain.appendChild(twtInfo);
    twtMain.appendChild(twtText);

    var twtProfilePic = document.createElement("img");
    twtProfilePic.classList.add("tweet_profilepic");
    twtProfilePic.src = obj.profilePic;

    var twtBlock = document.createElement("div");
    twtBlock.classList.add("tweet_block");
    twtBlock.appendChild(twtProfilePic);
    twtBlock.appendChild(twtMain);

    var element = document.getElementById("tweets")
    element.prepend(twtBlock);
}

let timer;
window.onload = function(){
  for(var k=0; k < 100; ++k){
    getTweets();
  }
  console.log(masterList)
  timer = setInterval(search,1000);
}

function check() {
  clearInterval(timer);
}

function uncheck() {
  timer = setInterval(search,1000);
  console.log("entered uncheck")
}

let searchString = "" // here we use a global variable

const handleSearch = event => {
    searchString = event.target.value.trim().toLowerCase()
}
document.getElementById("searchBar").addEventListener("input", handleSearch)