(function() {/*
 A JavaScript implementation of the SHA family of hashes, as defined in FIPS
 PUB 180-2 as well as the corresponding HMAC implementation as defined in
 FIPS PUB 198a

 Copyright Brian Turek 2008-2012
 Distributed under the BSD License
 See http://caligatio.github.com/jsSHA/ for more information

 Several functions taken from Paul Johnson
*/
function m(a){throw a;}var o=null;function q(a,b){this.a=a;this.b=b}function s(a,b){var d=[],h=(1<<b)-1,f=a.length*b,g;for(g=0;g<f;g+=b)d[g>>>5]|=(a.charCodeAt(g/b)&h)<<32-b-g%32;return{value:d,binLen:f}}function v(a){var b=[],d=a.length,h,f;0!==d%2&&m("String of HEX type must be in byte increments");for(h=0;h<d;h+=2)f=parseInt(a.substr(h,2),16),isNaN(f)&&m("String of HEX type contains invalid characters"),b[h>>>3]|=f<<24-4*(h%8);return{value:b,binLen:4*d}}
function z(a){var b=[],d=0,h,f,g,j,l;-1===a.search(/^[a-zA-Z0-9=+\/]+$/)&&m("Invalid character in base-64 string");h=a.indexOf("=");a=a.replace(/\=/g,"");-1!==h&&h<a.length&&m("Invalid '=' found in base-64 string");for(f=0;f<a.length;f+=4){l=a.substr(f,4);for(g=j=0;g<l.length;g+=1)h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(l[g]),j|=h<<18-6*g;for(g=0;g<l.length-1;g+=1)b[d>>2]|=(j>>>16-8*g&255)<<24-8*(d%4),d+=1}return{value:b,binLen:8*d}}
function C(a,b){var d="",h=4*a.length,f,g;for(f=0;f<h;f+=1)g=a[f>>>2]>>>8*(3-f%4),d+="0123456789abcdef".charAt(g>>>4&15)+"0123456789abcdef".charAt(g&15);return b.outputUpper?d.toUpperCase():d}
function D(a,b){var d="",h=4*a.length,f,g,j;for(f=0;f<h;f+=3){j=(a[f>>>2]>>>8*(3-f%4)&255)<<16|(a[f+1>>>2]>>>8*(3-(f+1)%4)&255)<<8|a[f+2>>>2]>>>8*(3-(f+2)%4)&255;for(g=0;4>g;g+=1)d=8*f+6*g<=32*a.length?d+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(j>>>6*(3-g)&63):d+b.b64Pad}return d}
function E(a){var b={outputUpper:!1,b64Pad:"="};try{a.hasOwnProperty("outputUpper")&&(b.outputUpper=a.outputUpper),a.hasOwnProperty("b64Pad")&&(b.b64Pad=a.b64Pad)}catch(d){}"boolean"!==typeof b.outputUpper&&m("Invalid outputUpper formatting option");"string"!==typeof b.b64Pad&&m("Invalid b64Pad formatting option");return b}function F(a,b){var d=o,d=new q(a.a,a.b);return d=32>=b?new q(d.a>>>b|d.b<<32-b,d.b>>>b|d.a<<32-b):new q(d.b>>>b-32|d.a<<64-b,d.a>>>b-32|d.b<<64-b)}
function G(a,b){var d=o;return d=32>=b?new q(a.a>>>b,a.b>>>b|a.a<<32-b):new q(0,a.a>>>b-32)}function H(a,b,d){return new q(a.a&b.a^~a.a&d.a,a.b&b.b^~a.b&d.b)}function S(a,b,d){return new q(a.a&b.a^a.a&d.a^b.a&d.a,a.b&b.b^a.b&d.b^b.b&d.b)}function T(a){var b=F(a,28),d=F(a,34),a=F(a,39);return new q(b.a^d.a^a.a,b.b^d.b^a.b)}function U(a){var b=F(a,14),d=F(a,18),a=F(a,41);return new q(b.a^d.a^a.a,b.b^d.b^a.b)}function V(a){var b=F(a,1),d=F(a,8),a=G(a,7);return new q(b.a^d.a^a.a,b.b^d.b^a.b)}
function W(a){var b=F(a,19),d=F(a,61),a=G(a,6);return new q(b.a^d.a^a.a,b.b^d.b^a.b)}function X(a,b){var d,h,f;d=(a.b&65535)+(b.b&65535);h=(a.b>>>16)+(b.b>>>16)+(d>>>16);f=(h&65535)<<16|d&65535;d=(a.a&65535)+(b.a&65535)+(h>>>16);h=(a.a>>>16)+(b.a>>>16)+(d>>>16);return new q((h&65535)<<16|d&65535,f)}
function Y(a,b,d,h){var f,g,j;f=(a.b&65535)+(b.b&65535)+(d.b&65535)+(h.b&65535);g=(a.b>>>16)+(b.b>>>16)+(d.b>>>16)+(h.b>>>16)+(f>>>16);j=(g&65535)<<16|f&65535;f=(a.a&65535)+(b.a&65535)+(d.a&65535)+(h.a&65535)+(g>>>16);g=(a.a>>>16)+(b.a>>>16)+(d.a>>>16)+(h.a>>>16)+(f>>>16);return new q((g&65535)<<16|f&65535,j)}
function Z(a,b,d,h,f){var g,j,l;g=(a.b&65535)+(b.b&65535)+(d.b&65535)+(h.b&65535)+(f.b&65535);j=(a.b>>>16)+(b.b>>>16)+(d.b>>>16)+(h.b>>>16)+(f.b>>>16)+(g>>>16);l=(j&65535)<<16|g&65535;g=(a.a&65535)+(b.a&65535)+(d.a&65535)+(h.a&65535)+(f.a&65535)+(j>>>16);j=(a.a>>>16)+(b.a>>>16)+(d.a>>>16)+(h.a>>>16)+(f.a>>>16)+(g>>>16);return new q((j&65535)<<16|g&65535,l)}
function $(a,b,d){var h,f,g,j,l,i,y,A,I,e,J,t,k,K,r,n,w,x,p,L,M,N,O,P,c,Q,u=[],R,B;"SHA-384"===d||"SHA-512"===d?(J=80,h=(b+128>>>10<<5)+31,K=32,r=2,c=q,n=X,w=Y,x=Z,p=V,L=W,M=T,N=U,P=S,O=H,Q=[new c(1116352408,3609767458),new c(1899447441,602891725),new c(3049323471,3964484399),new c(3921009573,2173295548),new c(961987163,4081628472),new c(1508970993,3053834265),new c(2453635748,2937671579),new c(2870763221,3664609560),new c(3624381080,2734883394),new c(310598401,1164996542),new c(607225278,1323610764),
new c(1426881987,3590304994),new c(1925078388,4068182383),new c(2162078206,991336113),new c(2614888103,633803317),new c(3248222580,3479774868),new c(3835390401,2666613458),new c(4022224774,944711139),new c(264347078,2341262773),new c(604807628,2007800933),new c(770255983,1495990901),new c(1249150122,1856431235),new c(1555081692,3175218132),new c(1996064986,2198950837),new c(2554220882,3999719339),new c(2821834349,766784016),new c(2952996808,2566594879),new c(3210313671,3203337956),new c(3336571891,
1034457026),new c(3584528711,2466948901),new c(113926993,3758326383),new c(338241895,168717936),new c(666307205,1188179964),new c(773529912,1546045734),new c(1294757372,1522805485),new c(1396182291,2643833823),new c(1695183700,2343527390),new c(1986661051,1014477480),new c(2177026350,1206759142),new c(2456956037,344077627),new c(2730485921,1290863460),new c(2820302411,3158454273),new c(3259730800,3505952657),new c(3345764771,106217008),new c(3516065817,3606008344),new c(3600352804,1432725776),new c(4094571909,
1467031594),new c(275423344,851169720),new c(430227734,3100823752),new c(506948616,1363258195),new c(659060556,3750685593),new c(883997877,3785050280),new c(958139571,3318307427),new c(1322822218,3812723403),new c(1537002063,2003034995),new c(1747873779,3602036899),new c(1955562222,1575990012),new c(2024104815,1125592928),new c(2227730452,2716904306),new c(2361852424,442776044),new c(2428436474,593698344),new c(2756734187,3733110249),new c(3204031479,2999351573),new c(3329325298,3815920427),new c(3391569614,
3928383900),new c(3515267271,566280711),new c(3940187606,3454069534),new c(4118630271,4000239992),new c(116418474,1914138554),new c(174292421,2731055270),new c(289380356,3203993006),new c(460393269,320620315),new c(685471733,587496836),new c(852142971,1086792851),new c(1017036298,365543100),new c(1126000580,2618297676),new c(1288033470,3409855158),new c(1501505948,4234509866),new c(1607167915,987167468),new c(1816402316,1246189591)],e="SHA-384"===d?[new c(3418070365,3238371032),new c(1654270250,914150663),
new c(2438529370,812702999),new c(355462360,4144912697),new c(1731405415,4290775857),new c(41048885895,1750603025),new c(3675008525,1694076839),new c(1203062813,3204075428)]:[new c(1779033703,4089235720),new c(3144134277,2227873595),new c(1013904242,4271175723),new c(2773480762,1595750129),new c(1359893119,2917565137),new c(2600822924,725511199),new c(528734635,4215389547),new c(1541459225,327033209)]):m("Unexpected error in SHA-2 implementation");a[b>>>5]|=128<<24-b%32;a[h]=b;R=a.length;for(t=0;t<
R;t+=K){b=e[0];h=e[1];f=e[2];g=e[3];j=e[4];l=e[5];i=e[6];y=e[7];for(k=0;k<J;k+=1)u[k]=16>k?new c(a[k*r+t],a[k*r+t+1]):w(L(u[k-2]),u[k-7],p(u[k-15]),u[k-16]),A=x(y,N(j),O(j,l,i),Q[k],u[k]),I=n(M(b),P(b,h,f)),y=i,i=l,l=j,j=n(g,A),g=f,f=h,h=b,b=n(A,I);e[0]=n(b,e[0]);e[1]=n(h,e[1]);e[2]=n(f,e[2]);e[3]=n(g,e[3]);e[4]=n(j,e[4]);e[5]=n(l,e[5]);e[6]=n(i,e[6]);e[7]=n(y,e[7])}"SHA-384"===d?B=[e[0].a,e[0].b,e[1].a,e[1].b,e[2].a,e[2].b,e[3].a,e[3].b,e[4].a,e[4].b,e[5].a,e[5].b]:"SHA-512"===d?B=[e[0].a,e[0].b,
e[1].a,e[1].b,e[2].a,e[2].b,e[3].a,e[3].b,e[4].a,e[4].b,e[5].a,e[5].b,e[6].a,e[6].b,e[7].a,e[7].b]:m("Unexpected error in SHA-2 implementation");return B}
window.jsSHA=function(a,b,d){var h=o,f=o,g=0,j=[0],l=0,i=o,l="undefined"!==typeof d?d:8;8===l||16===l||m("charSize must be 8 or 16");"HEX"===b?(0!==a.length%2&&m("srcString of HEX type must be in byte increments"),i=v(a),g=i.binLen,j=i.value):"ASCII"===b||"TEXT"===b?(i=s(a,l),g=i.binLen,j=i.value):"B64"===b?(i=z(a),g=i.binLen,j=i.value):m("inputFormat must be HEX, TEXT, ASCII, or B64");this.getHash=function(a,b,d){var e=o,l=j.slice(),i="";switch(b){case "HEX":e=C;break;case "B64":e=D;break;default:m("format must be HEX or B64")}if("SHA-384"===
a){o===h&&(h=$(l,g,a));i=e(h,E(d))}else if("SHA-512"===a){o===f&&(f=$(l,g,a));i=e(f,E(d))}else m("Chosen SHA variant is not supported");return i};this.getHMAC=function(a,b,d,e,f){var h,k,i,r,n,w=[],x=[],p=o;switch(e){case "HEX":h=C;break;case "B64":h=D;break;default:m("outputFormat must be HEX or B64")}if("SHA-384"===d){i=128;n=384}else if("SHA-512"===d){i=128;n=512}else m("Chosen SHA variant is not supported");if("HEX"===b){p=v(a);r=p.binLen;k=p.value}else if("ASCII"===b||"TEXT"===b){p=s(a,l);r=
p.binLen;k=p.value}else if("B64"===b){p=z(a);r=p.binLen;k=p.value}else m("inputFormat must be HEX, TEXT, ASCII, or B64");a=i*8;b=i/4-1;if(i<r/8){k=$(k,r,d);k[b]=k[b]&4294967040}else i>r/8&&(k[b]=k[b]&4294967040);for(i=0;i<=b;i=i+1){w[i]=k[i]^909522486;x[i]=k[i]^1549556828}d=$(x.concat($(w.concat(j),a+g,d)),a+n,d);return h(d,E(f))}};})();
