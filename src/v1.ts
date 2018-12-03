import {Observable, interval} from 'rxjs'
import { take, map, filter, reduce } from 'rxjs/operators';
console.clear()

/**
 * Array vs. Event stream
 * What is an event stream?
 */

var source = ['1', '2', '3', '5', 'bar', '8', '13']

var result = source
    .map(x => parseInt(x))
    .filter(x => !isNaN(x))
    .reduce((x, r) => x+r)
console.log(result)
/**
 * With event source, we can use similar functions like array have
 */

 var interval$ = interval(400)

const eventSource = interval$.pipe(take(9))

const result2 = eventSource.pipe(map(i => source[i]),
    map(x=>parseInt(x)),
    filter(x => !isNaN(x)),
    reduce((x,y)=> x+y)
    )

result2.subscribe(x => console.log(x))


    
