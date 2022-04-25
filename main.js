//master list of tweets
const masterList = [];
// specify a url, in this case our web server
function getTweets(){
    const url = "http://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=weather";
    fetch(url).then(function(response){
      return response.json();
    }).then(function(data){
      for(let i=0; i < Object.keys(data.statuses).length;++i){
        var exist = false;
        for (let j = 0; j< masterList.length; ++j){
          if(data.statuses[i].id == masterList[j].id){
            exist = true;
            break;
          }
        }
        if (exist != true){
          let obj = {
            id: data.statuses[i].id,
            text: data.statuses[i].text,
            created_at: data.statuses[i].created_at,
            userName: data.statuses[i].user.name,
            screenName: data.statuses[i].user.screen_name,
            profilePic: data.statuses[i].user.profile_image_url_https,
            };
            masterList.push(obj);
        }
      }
      // console.log(data.statuses);
    }).catch(function(err){
      console.warn("Something went wrong!", err); 
    });
}  
getTweets();


var printNum = 0;

function displayTweets(){
  // console.log(masterList[printNum]);
  if(printNum != masterList.length){
    var twtName = document.createElement("span");
    twtName.classList.add("tweet_name");
    var twtNameTxt = document.createTextNode(masterList[printNum].screenName);
    twtName.appendChild(twtNameTxt);

    var twtUserName = document.createElement("span");
    twtUserName.classList.add("tweet_username");
    var twtUserNameTag = document.createTextNode("@");
    var twtUserNameTxt = document.createTextNode(masterList[printNum].userName);
    twtUserName.appendChild(twtUserNameTag);
    twtUserName.appendChild(twtUserNameTxt);

    var twtTime = document.createElement("span");
    twtTime.classList.add("tweet_time");
    var twtTimeTxt = document.createTextNode(moment(masterList[printNum].created_at).format('MMMM DD, YYYY'));
    twtTime.appendChild(twtTimeTxt);

    var twtInfo = document.createElement("div");
    twtInfo.classList.add("tweet_info");
    twtInfo.appendChild(twtName);
    twtInfo.appendChild(twtUserName);
    twtInfo.appendChild(twtTime);

    var twtText = document.createElement("p");
    twtText.classList.add("tweet_text");
    var twtTextTxt = document.createTextNode(masterList[printNum].text);
    twtText.appendChild(twtTextTxt);

    var twtMain = document.createElement("div");
    twtMain.classList.add("tweet_main");
    twtMain.appendChild(twtInfo);
    twtMain.appendChild(twtText);

    var twtProfilePic = document.createElement("img");
    twtProfilePic.classList.add("tweet_profilepic");
    twtProfilePic.src = masterList[printNum].profilePic;

    var twtBlock = document.createElement("div");
    twtBlock.classList.add("tweet_block");
    twtBlock.appendChild(twtProfilePic);
    twtBlock.appendChild(twtMain);

    var element = document.getElementById("tweets")
    element.prepend(twtBlock);
    ++printNum;
  }
}

let timer;
window.onload = function(){
  timer = setInterval(displayTweets,5000);
}


function check() {
  clearInterval(timer);
  console.log("entered check")
  console.log(printNum);
  console.log(masterList[printNum])
}

function uncheck() {
  timer = setInterval(displayTweets,5000);
  console.log("entered uncheck")
}