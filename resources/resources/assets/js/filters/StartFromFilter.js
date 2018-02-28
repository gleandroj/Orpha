/**
 * Created by FG0003 on 09/02/2017.
 */

export default function StartFromFilter(){
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
}