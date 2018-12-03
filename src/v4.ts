import {of, Observable, from} from 'rxjs'
import {flatMap, map} from 'rxjs/operators'
import * as $ from "jquery";

/**
 * We were mapping to an observable of observable, which we sometime call metastream
 * How do we reach the point of flatMap? The request stream was essentially the stream associated with the url
 * View flatMap as promise.then?
 */
var requestStream = of('https://api.github.com/users')

requestStream.subscribe(url =>{
    console.log(url)
})
var responseStream = requestStream.pipe(
    flatMap(requestUrl =>
        {
            console.log(requestUrl)
            return from($.getJSON(requestUrl))
        }
        )
)



function createSuggestionStream(responseStream:any){
    return responseStream.pipe(map(
        (listUser:Array<any>) => listUser[Math.floor(Math.random()*listUser.length)]
    ))
}

var suggestion1Stream = createSuggestionStream(responseStream)
var suggestion2Stream = createSuggestionStream(responseStream)
var suggestion3Stream = createSuggestionStream(responseStream)

function renderSuggestion(userData:any, selector:any){
    var element =document.querySelector(selector)
    var usernameEl = element.querySelector('.username')
    usernameEl.href = userData.html_url
    usernameEl.textContent = userData.login
    var imgEl = element.querySelector('img')
    imgEl.src = userData.avatar_url
}

suggestion1Stream.subscribe((user:any) =>{
    renderSuggestion(user,'.suggestion1')
})

suggestion2Stream.subscribe((user:any) =>{
    renderSuggestion(user,'.suggestion2')
})

suggestion3Stream.subscribe((user:any) =>{
    renderSuggestion(user,'.suggestion3')
})

// display in plunker preview
function displayInPreview(str:string) {
    var newDiv = document.createElement("div"); 
    var newContent = document.createTextNode(str); 
    newDiv.appendChild(newContent);
    document.body.appendChild(newDiv)
  }