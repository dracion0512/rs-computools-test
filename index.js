//   /* порядок действий =>
//    * 1. открываем скобки и повторяем содержимое
//    * 2. выполняем повторение
//    * 3. cклеиваем
//    * p.s. init версия без велосипеда с рекурсией, но и вложенные скобки не открывает.
//    *
//    * !!! операторы ? x1 : x2 являются строчными методами. 
//    *
//    */

function stringHandler(str) {
  //  проверка на строрку
  if(typeof(str) !== "string") throw new Error ('invalid type of input')
  // v 1.1.0 добавлен обработчик ошибок 
  if(/[^a-z0-9\(\)\+\*].+/gi.test(str)) throw new Error ('invalid input, use valid string ', str)  
  if(/[^(\*\d)]\d+/gi.test(str)) throw new Error ('invalid number in string ', str)  
  if(str.match(/\(/g).length !== str.match(/\)/g).length) throw new Error ('unclosed parenthesis in string ', str)  
  return str
    .replace(
      /(\([0-9\+\*a-z]+\))\+/gi,
      (match, p1, offset, string) => `${p1.replace(/[\(\)]/g, "")}+`
    )
    .replace(
      /(\(.*\))\*([0-9]+)/ig,
      (match, p1, p2, offset, string) => {
        // console.log(match)
        while (/[\(\)]/g.test(match)) {
          match = match.replace(/(\([0-9\+\*a-z]+\))\*([0-9]+)/gi, (match, p1, p2, offset, string) =>`${p1.substring(1, p1.length - 1)}+`.repeat(p2))
        }
        return match
      })
    .replace(/([a-z]+)\*([0-9]+)/gi, (match, p1, p2, offset, string) =>
      p1.repeat(p2)
    )
    .replace(/\+/gi, "")
}
/*
* альтернативный путь одной строкой
//  function stringHandler(str) {
//    return /[\(\)]/g.test(str)?stringHandler(str.replace(/(\([0-9\+\*a-z]+\))\+/gi, (match, p1, offset,string) => `${p1.replace(/[\(\)]/g, "")}+`).replace(/(\([0-9\+\*a-z]+\))\*([0-9]+)/gi, (match, p1, p2, offset,string) => `${p1.substring(1,p1.length-1)}+`.repeat(p2))):str.replace(/([a-z]+)\*([0-9]+)/gi, (match, p1, p2, offset,string) => p1.repeat(p2)).replace(/\+/gi, "")
//  }
*
*/

// //  invaid test
// console.log(
//   stringHandler("(z2*2+y)*2+x+w*2+(v+u*2)*2")
// );
// console.log(
//   stringHandler("(z%*2+y)*2+x+w*2+(v+u*2)*2")
// );
// console.log(
//   stringHandler("((z*2+y)*2+x+w*2+(v+u*2)*2")
// );

// // valid test
// console.log(
//   stringHandler("(z*2+y)*2+x+w*2+(v+u*2)*2"),
//   stringHandler("(z*2+y)*2+x+w*2+(v+u*2)*2") === "zzyzzyxwwvuuvuu"
// );
// console.log(
//   stringHandler(
//     "(y+(a*2+b)*2+c)*2+d+((((((s*2+q)*2+z*1+f)*2+t*2+d)*2+e*2+f)*2+g)*2+h+i*2)*2+j*2+k"
//   ),
//   stringHandler(
//     "(y+(a*2+b)*2+c)*2+d+((((((s*2+q)*2+z*1+f)*2+t*2+d)*2+e*2+f)*2+g)*2+h+i*2)*2+j*2+k"
//   ) ===
//     "yaabaabcyaabaabcdssqssqzfssqssqzfttdssqssqzfssqssqzfttdeefssqssqzfssqssqzfttdssqssqzfssqssqzfttdeefgssqssqzfssqssqzfttdssqssqzfssqssqzfttdeefssqssqzfssqssqzfttdssqssqzfssqssqzfttdeefghiissqssqzfssqssqzfttdssqssqzfssqssqzfttdeefssqssqzfssqssqzfttdssqssqzfssqssqzfttdeefgssqssqzfssqssqzfttdssqssqzfssqssqzfttdeefssqssqzfssqssqzfttdssqssqzfssqssqzfttdeefghiijjk"
// ); // дaже не спрашивайте как это пришлось тестить

//ABCDEFGHIJKLMNOPQRSTUVWXYZ

module.exports = stringHandler;
