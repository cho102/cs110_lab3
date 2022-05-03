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
          // console.log('sort:', obj.sort_time)
          masterList.push(obj);
          masterList.sort((a,b)=> b.sort_time - a.sort_time);
          // displayTweets(obj);
        }
        ++i
        // console.log(i);
        // console.log(masterList);
      }
      // console.log(data.statuses);
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
}

function displayTweets(obj){
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
    ++num;
}

let timer;
window.onload = function(){
  for(var k=0; k < 10; ++k){
    getTweets();
  }
  timer = setInterval(displayTweets,3000);
}

// 2022-04-18T17:39:42.000Z
function check() {
  clearInterval(timer);
  console.log("entered check")
  console.log(masterList.length);
  console.log('length:', masterList.length)
  for (let j = 0; j< masterList.length; ++j){
    console.log(masterList[j].sort_time);
  }
  // // console.log("sort")

}

function uncheck() {
  timer = setInterval(getTweets,3000);
  console.log("entered uncheck")
}

let searchString = "" // here we use a global variable

const handleSearch = event => {
    searchString = event.target.value.trim().toLowerCase()
}
document.getElementById("searchBar").addEventListener("input", handleSearch)