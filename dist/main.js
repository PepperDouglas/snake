!function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=2)}([function(t,e){let i={color:"red",width:30,height:30,location:{x:null,y:null},position:()=>30*Math.ceil(10*Math.random())};t.exports.blueApple={color:"blue",width:30,height:30,location:[{x:90,y:60}]},t.exports.redApple=i},function(t,e){t.exports.redSnake={color:"red",width:30,height:30,parts:[{x:50,y:50}]},t.exports.greenSnake={color:"green",width:30,height:30,parts:[{x:120,y:30,direction:"RIGHT"},{x:90,y:30,direction:"RIGHT"},{x:60,y:30,direction:"RIGHT"},{x:30,y:30,direction:"RIGHT"}]}},function(t,e,i){"use strict";i.r(e);var n=i(1),r=i(0);let o,a,s=4,h=0,c={canvas:document.createElement("canvas"),area:document.getElementsByClassName("playArea")[0],init:function(){this.canvas.width=660,this.canvas.height=660,this.context=this.canvas.getContext("2d"),this.area.appendChild(this.canvas),this.interval=setInterval(u,Math.floor(1e3/s))},clear:function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}};function l(t){this.width=t.width,this.height=t.height,this.x=t.parts[0].x,this.y=t.parts[0].y,this.parts=t.parts,this.direction=t.parts[0].direction,this.update=function(){for(let t=this.parts.length-1;t>0;t--)this.parts[t].direction=this.parts[t-1].direction;this.parts[0].direction=this.direction;for(let t=0;t<this.parts.length;t++)"RIGHT"===this.parts[t].direction?this.parts[t].x+=this.width:"LEFT"===this.parts[t].direction?this.parts[t].x-=this.width:"DOWN"===this.parts[t].direction?this.parts[t].y-=this.height:"UP"===this.parts[t].direction&&(this.parts[t].y+=this.height);for(let t=1;t<this.parts.length;t++)if(this.parts[0].x===this.parts[t].x&&this.parts[0].y===this.parts[t].y)return clearInterval(c.interval),void(o={});this.parts[0].x<o.width?p():this.parts[0].x>c.canvas.width-o.width?p():this.parts[0].y<o.height?p():this.parts[0].y>c.canvas.height-o.height&&p();for(let e=0;e<this.parts.length;e++)c.context.fillStyle=t.color,c.context.fillRect(this.parts[e].x,this.parts[e].y,this.width,this.height)}}let p=()=>{clearInterval(c.interval),o={}};function d(t){this.width=t.width,this.height=t.height,this.location=t.location,this.location.x=t.position(),this.location.y=t.position(),this.update=function(){!function e(){for(let i=0;i<o.parts.length;i++)r.redApple.location.x===o.parts[i].x&&r.redApple.location.y===o.parts[i].y&&(r.redApple.location.x=t.position(),r.redApple.location.y=t.position(),e())}(),c.context.fillStyle=t.color,c.context.fillRect(this.location.x,this.location.y,this.width,this.height)},this.eatMe=function(){if(this.location.x===o.parts[0].x&&this.location.y===o.parts[0].y){h+=s;let t=[o.parts[o.parts.length-1].x,o.parts[o.parts.length-1].y];return setTimeout(function(){o.parts.push({x:t[0],y:t[1],direction:null})},Math.floor(1e3/s)),!0}return!1}}function u(){c.clear(),c.context.fillStyle="black",c.context.fillRect(0,0,c.canvas.width,30),c.context.fillRect(0,0,30,c.canvas.height),c.context.fillRect(0,c.canvas.height-30,c.canvas.width,c.canvas.width),c.context.fillRect(c.canvas.width-30,0,c.canvas.width,c.canvas.height),o.update(),a.eatMe()?a=new d(r.redApple):a.update()}c.init(),o=new l(n.greenSnake),a=new d(r.redApple),window.addEventListener("keydown",function(t){switch(!0){case 37===t.keyCode&&"RIGHT"!==o.direction:o.direction="LEFT";break;case 38===t.keyCode&&"UP"!==o.direction:o.direction="DOWN";break;case 39===t.keyCode&&"LEFT"!==o.direction:o.direction="RIGHT";break;case 40===t.keyCode&&"DOWN"!==o.direction:o.direction="UP"}})}]);