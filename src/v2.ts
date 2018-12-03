import {fromEvent, interval} from 'rxjs'
import {bufferWhen, map, filter, debounceTime} from 'rxjs/operators'
// import './v3'
import './v4'
var button =document.querySelector('.button')
var label = document.querySelector('h4')

var interval$ = interval(250)

var clickStream = fromEvent(button, 'click')
console.log("We are clicking")



var doubleClickStream = clickStream.pipe(
    bufferWhen(()=> clickStream.pipe(debounceTime(250))),
    map(arr => arr.length),
    filter(len => len===2)
)

doubleClickStream.subscribe(event =>{
    label.textContent = 'double click'
})

doubleClickStream.pipe(
    debounceTime(1000),
).subscribe(suggestion =>{
    label.textContent = '-'
})

/**
 * Using marble diagrams, I understand now how the whole thing about event stream works
 * I can place them in the marble diagram and follow stream after stream.
 */