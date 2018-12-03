import { Observable, of } from "rxjs";
import {map} from 'rxjs/operators'
console.clear()
/**
 * Why choose RxJS?
 * It allows you to specify the dynamic behavior of a value completely
 * at the time of declaration
 */

var a = 3
var b = 10*a

console.log(b)

a = 4
b = 11*a


var streamA = of(3, 4)
var streamB = streamA.pipe(map(a=> 10*a))

streamB.subscribe(b => console.log(b))