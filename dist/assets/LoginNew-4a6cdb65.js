import{r as S,R as M,g as oe,m as re,a as se,u as ie,C as ae,b as le,c as ce,S as de,B as k,d as ue,e as he,f as fe,j as w,v as ge,F as _,I as O,M as me,T as pe,l as Ce,h as D,i as Ee,k as we}from"./index-815b0fe2.js";var ye=Object.defineProperty,x=Object.getOwnPropertySymbols,Q=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable,j=(a,r,l)=>r in a?ye(a,r,{enumerable:!0,configurable:!0,writable:!0,value:l}):a[r]=l,F=(a,r)=>{for(var l in r||(r={}))Q.call(r,l)&&j(a,l,r[l]);if(x)for(var l of x(r))U.call(r,l)&&j(a,l,r[l]);return a},H=(a,r)=>{var l={};for(var i in a)Q.call(a,i)&&r.indexOf(i)<0&&(l[i]=a[i]);if(a!=null&&x)for(var i of x(a))r.indexOf(i)<0&&U.call(a,i)&&(l[i]=a[i]);return l};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var I;(a=>{const r=class{constructor(e,t,n,o){if(this.version=e,this.errorCorrectionLevel=t,this.modules=[],this.isFunction=[],e<r.MIN_VERSION||e>r.MAX_VERSION)throw new RangeError("Version value out of range");if(o<-1||o>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let s=[];for(let c=0;c<this.size;c++)s.push(!1);for(let c=0;c<this.size;c++)this.modules.push(s.slice()),this.isFunction.push(s.slice());this.drawFunctionPatterns();const d=this.addEccAndInterleave(n);if(this.drawCodewords(d),o==-1){let c=1e9;for(let h=0;h<8;h++){this.applyMask(h),this.drawFormatBits(h);const f=this.getPenaltyScore();f<c&&(o=h,c=f),this.applyMask(h)}}u(0<=o&&o<=7),this.mask=o,this.applyMask(o),this.drawFormatBits(o),this.isFunction=[]}static encodeText(e,t){const n=a.QrSegment.makeSegments(e);return r.encodeSegments(n,t)}static encodeBinary(e,t){const n=a.QrSegment.makeBytes(e);return r.encodeSegments([n],t)}static encodeSegments(e,t,n=1,o=40,s=-1,d=!0){if(!(r.MIN_VERSION<=n&&n<=o&&o<=r.MAX_VERSION)||s<-1||s>7)throw new RangeError("Invalid value");let c,h;for(c=n;;c++){const g=r.getNumDataCodewords(c,t)*8,E=C.getTotalBits(e,c);if(E<=g){h=E;break}if(c>=o)throw new RangeError("Data too long")}for(const g of[r.Ecc.MEDIUM,r.Ecc.QUARTILE,r.Ecc.HIGH])d&&h<=r.getNumDataCodewords(c,g)*8&&(t=g);let f=[];for(const g of e){i(g.mode.modeBits,4,f),i(g.numChars,g.mode.numCharCountBits(c),f);for(const E of g.getData())f.push(E)}u(f.length==h);const v=r.getNumDataCodewords(c,t)*8;u(f.length<=v),i(0,Math.min(4,v-f.length),f),i(0,(8-f.length%8)%8,f),u(f.length%8==0);for(let g=236;f.length<v;g^=253)i(g,8,f);let y=[];for(;y.length*8<f.length;)y.push(0);return f.forEach((g,E)=>y[E>>>3]|=g<<7-(E&7)),new r(c,t,y,s)}getModule(e,t){return 0<=e&&e<this.size&&0<=t&&t<this.size&&this.modules[t][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let n=0;n<this.size;n++)this.setFunctionModule(6,n,n%2==0),this.setFunctionModule(n,6,n%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),t=e.length;for(let n=0;n<t;n++)for(let o=0;o<t;o++)n==0&&o==0||n==0&&o==t-1||n==t-1&&o==0||this.drawAlignmentPattern(e[n],e[o]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const t=this.errorCorrectionLevel.formatBits<<3|e;let n=t;for(let s=0;s<10;s++)n=n<<1^(n>>>9)*1335;const o=(t<<10|n)^21522;u(o>>>15==0);for(let s=0;s<=5;s++)this.setFunctionModule(8,s,m(o,s));this.setFunctionModule(8,7,m(o,6)),this.setFunctionModule(8,8,m(o,7)),this.setFunctionModule(7,8,m(o,8));for(let s=9;s<15;s++)this.setFunctionModule(14-s,8,m(o,s));for(let s=0;s<8;s++)this.setFunctionModule(this.size-1-s,8,m(o,s));for(let s=8;s<15;s++)this.setFunctionModule(8,this.size-15+s,m(o,s));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let n=0;n<12;n++)e=e<<1^(e>>>11)*7973;const t=this.version<<12|e;u(t>>>18==0);for(let n=0;n<18;n++){const o=m(t,n),s=this.size-11+n%3,d=Math.floor(n/3);this.setFunctionModule(s,d,o),this.setFunctionModule(d,s,o)}}drawFinderPattern(e,t){for(let n=-4;n<=4;n++)for(let o=-4;o<=4;o++){const s=Math.max(Math.abs(o),Math.abs(n)),d=e+o,c=t+n;0<=d&&d<this.size&&0<=c&&c<this.size&&this.setFunctionModule(d,c,s!=2&&s!=4)}}drawAlignmentPattern(e,t){for(let n=-2;n<=2;n++)for(let o=-2;o<=2;o++)this.setFunctionModule(e+o,t+n,Math.max(Math.abs(o),Math.abs(n))!=1)}setFunctionModule(e,t,n){this.modules[t][e]=n,this.isFunction[t][e]=!0}addEccAndInterleave(e){const t=this.version,n=this.errorCorrectionLevel;if(e.length!=r.getNumDataCodewords(t,n))throw new RangeError("Invalid argument");const o=r.NUM_ERROR_CORRECTION_BLOCKS[n.ordinal][t],s=r.ECC_CODEWORDS_PER_BLOCK[n.ordinal][t],d=Math.floor(r.getNumRawDataModules(t)/8),c=o-d%o,h=Math.floor(d/o);let f=[];const v=r.reedSolomonComputeDivisor(s);for(let g=0,E=0;g<o;g++){let R=e.slice(E,E+h-s+(g<c?0:1));E+=R.length;const A=r.reedSolomonComputeRemainder(R,v);g<c&&R.push(0),f.push(R.concat(A))}let y=[];for(let g=0;g<f[0].length;g++)f.forEach((E,R)=>{(g!=h-s||R>=c)&&y.push(E[g])});return u(y.length==d),y}drawCodewords(e){if(e.length!=Math.floor(r.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let t=0;for(let n=this.size-1;n>=1;n-=2){n==6&&(n=5);for(let o=0;o<this.size;o++)for(let s=0;s<2;s++){const d=n-s,h=(n+1&2)==0?this.size-1-o:o;!this.isFunction[h][d]&&t<e.length*8&&(this.modules[h][d]=m(e[t>>>3],7-(t&7)),t++)}}u(t==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let t=0;t<this.size;t++)for(let n=0;n<this.size;n++){let o;switch(e){case 0:o=(n+t)%2==0;break;case 1:o=t%2==0;break;case 2:o=n%3==0;break;case 3:o=(n+t)%3==0;break;case 4:o=(Math.floor(n/3)+Math.floor(t/2))%2==0;break;case 5:o=n*t%2+n*t%3==0;break;case 6:o=(n*t%2+n*t%3)%2==0;break;case 7:o=((n+t)%2+n*t%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[t][n]&&o&&(this.modules[t][n]=!this.modules[t][n])}}getPenaltyScore(){let e=0;for(let s=0;s<this.size;s++){let d=!1,c=0,h=[0,0,0,0,0,0,0];for(let f=0;f<this.size;f++)this.modules[s][f]==d?(c++,c==5?e+=r.PENALTY_N1:c>5&&e++):(this.finderPenaltyAddHistory(c,h),d||(e+=this.finderPenaltyCountPatterns(h)*r.PENALTY_N3),d=this.modules[s][f],c=1);e+=this.finderPenaltyTerminateAndCount(d,c,h)*r.PENALTY_N3}for(let s=0;s<this.size;s++){let d=!1,c=0,h=[0,0,0,0,0,0,0];for(let f=0;f<this.size;f++)this.modules[f][s]==d?(c++,c==5?e+=r.PENALTY_N1:c>5&&e++):(this.finderPenaltyAddHistory(c,h),d||(e+=this.finderPenaltyCountPatterns(h)*r.PENALTY_N3),d=this.modules[f][s],c=1);e+=this.finderPenaltyTerminateAndCount(d,c,h)*r.PENALTY_N3}for(let s=0;s<this.size-1;s++)for(let d=0;d<this.size-1;d++){const c=this.modules[s][d];c==this.modules[s][d+1]&&c==this.modules[s+1][d]&&c==this.modules[s+1][d+1]&&(e+=r.PENALTY_N2)}let t=0;for(const s of this.modules)t=s.reduce((d,c)=>d+(c?1:0),t);const n=this.size*this.size,o=Math.ceil(Math.abs(t*20-n*10)/n)-1;return u(0<=o&&o<=9),e+=o*r.PENALTY_N4,u(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,t=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let n=[6];for(let o=this.size-7;n.length<e;o-=t)n.splice(1,0,o);return n}}static getNumRawDataModules(e){if(e<r.MIN_VERSION||e>r.MAX_VERSION)throw new RangeError("Version number out of range");let t=(16*e+128)*e+64;if(e>=2){const n=Math.floor(e/7)+2;t-=(25*n-10)*n-55,e>=7&&(t-=36)}return u(208<=t&&t<=29648),t}static getNumDataCodewords(e,t){return Math.floor(r.getNumRawDataModules(e)/8)-r.ECC_CODEWORDS_PER_BLOCK[t.ordinal][e]*r.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let t=[];for(let o=0;o<e-1;o++)t.push(0);t.push(1);let n=1;for(let o=0;o<e;o++){for(let s=0;s<t.length;s++)t[s]=r.reedSolomonMultiply(t[s],n),s+1<t.length&&(t[s]^=t[s+1]);n=r.reedSolomonMultiply(n,2)}return t}static reedSolomonComputeRemainder(e,t){let n=t.map(o=>0);for(const o of e){const s=o^n.shift();n.push(0),t.forEach((d,c)=>n[c]^=r.reedSolomonMultiply(d,s))}return n}static reedSolomonMultiply(e,t){if(e>>>8||t>>>8)throw new RangeError("Byte out of range");let n=0;for(let o=7;o>=0;o--)n=n<<1^(n>>>7)*285,n^=(t>>>o&1)*e;return u(n>>>8==0),n}finderPenaltyCountPatterns(e){const t=e[1];u(t<=this.size*3);const n=t>0&&e[2]==t&&e[3]==t*3&&e[4]==t&&e[5]==t;return(n&&e[0]>=t*4&&e[6]>=t?1:0)+(n&&e[6]>=t*4&&e[0]>=t?1:0)}finderPenaltyTerminateAndCount(e,t,n){return e&&(this.finderPenaltyAddHistory(t,n),t=0),t+=this.size,this.finderPenaltyAddHistory(t,n),this.finderPenaltyCountPatterns(n)}finderPenaltyAddHistory(e,t){t[0]==0&&(e+=this.size),t.pop(),t.unshift(e)}};let l=r;l.MIN_VERSION=1,l.MAX_VERSION=40,l.PENALTY_N1=3,l.PENALTY_N2=3,l.PENALTY_N3=40,l.PENALTY_N4=10,l.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],l.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],a.QrCode=l;function i(e,t,n){if(t<0||t>31||e>>>t)throw new RangeError("Value out of range");for(let o=t-1;o>=0;o--)n.push(e>>>o&1)}function m(e,t){return(e>>>t&1)!=0}function u(e){if(!e)throw new Error("Assertion error")}const p=class{constructor(e,t,n){if(this.mode=e,this.numChars=t,this.bitData=n,t<0)throw new RangeError("Invalid argument");this.bitData=n.slice()}static makeBytes(e){let t=[];for(const n of e)i(n,8,t);return new p(p.Mode.BYTE,e.length,t)}static makeNumeric(e){if(!p.isNumeric(e))throw new RangeError("String contains non-numeric characters");let t=[];for(let n=0;n<e.length;){const o=Math.min(e.length-n,3);i(parseInt(e.substr(n,o),10),o*3+1,t),n+=o}return new p(p.Mode.NUMERIC,e.length,t)}static makeAlphanumeric(e){if(!p.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let t=[],n;for(n=0;n+2<=e.length;n+=2){let o=p.ALPHANUMERIC_CHARSET.indexOf(e.charAt(n))*45;o+=p.ALPHANUMERIC_CHARSET.indexOf(e.charAt(n+1)),i(o,11,t)}return n<e.length&&i(p.ALPHANUMERIC_CHARSET.indexOf(e.charAt(n)),6,t),new p(p.Mode.ALPHANUMERIC,e.length,t)}static makeSegments(e){return e==""?[]:p.isNumeric(e)?[p.makeNumeric(e)]:p.isAlphanumeric(e)?[p.makeAlphanumeric(e)]:[p.makeBytes(p.toUtf8ByteArray(e))]}static makeEci(e){let t=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)i(e,8,t);else if(e<16384)i(2,2,t),i(e,14,t);else if(e<1e6)i(6,3,t),i(e,21,t);else throw new RangeError("ECI assignment value out of range");return new p(p.Mode.ECI,0,t)}static isNumeric(e){return p.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return p.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,t){let n=0;for(const o of e){const s=o.mode.numCharCountBits(t);if(o.numChars>=1<<s)return 1/0;n+=4+s+o.bitData.length}return n}static toUtf8ByteArray(e){e=encodeURI(e);let t=[];for(let n=0;n<e.length;n++)e.charAt(n)!="%"?t.push(e.charCodeAt(n)):(t.push(parseInt(e.substr(n+1,2),16)),n+=2);return t}};let C=p;C.NUMERIC_REGEX=/^[0-9]*$/,C.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,C.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:",a.QrSegment=C})(I||(I={}));(a=>{(r=>{const l=class{constructor(m,u){this.ordinal=m,this.formatBits=u}};let i=l;i.LOW=new l(0,1),i.MEDIUM=new l(1,0),i.QUARTILE=new l(2,3),i.HIGH=new l(3,2),r.Ecc=i})(a.QrCode||(a.QrCode={}))})(I||(I={}));(a=>{(r=>{const l=class{constructor(m,u){this.modeBits=m,this.numBitsCharCount=u}numCharCountBits(m){return this.numBitsCharCount[Math.floor((m+7)/17)]}};let i=l;i.NUMERIC=new l(1,[10,12,14]),i.ALPHANUMERIC=new l(2,[9,11,13]),i.BYTE=new l(4,[8,16,16]),i.KANJI=new l(8,[8,10,12]),i.ECI=new l(7,[0,0,0]),r.Mode=i})(a.QrSegment||(a.QrSegment={}))})(I||(I={}));var N=I;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var $={L:N.QrCode.Ecc.LOW,M:N.QrCode.Ecc.MEDIUM,Q:N.QrCode.Ecc.QUARTILE,H:N.QrCode.Ecc.HIGH},W=128,Y="L",G="#FFFFFF",X="#000000",V=!1,T=4,Me=.1;function K(a,r=0){const l=[];return a.forEach(function(i,m){let u=null;i.forEach(function(p,C){if(!p&&u!==null){l.push("M".concat(u+r," ").concat(m+r,"h").concat(C-u,"v1H").concat(u+r,"z")),u=null;return}if(C===i.length-1){if(!p)return;u===null?l.push("M".concat(C+r,",").concat(m+r," h1v1H").concat(C+r,"z")):l.push("M".concat(u+r,",").concat(m+r," h").concat(C+1-u,"v1H").concat(u+r,"z"));return}p&&u===null&&(u=C)})}),l.join("")}function Z(a,r){return a.slice().map((l,i)=>i<r.y||i>=r.y+r.h?l:l.map((m,u)=>u<r.x||u>=r.x+r.w?m:!1))}function J(a,r,l,i){if(i==null)return null;const m=l?T:0,u=a.length+m*2,p=Math.floor(r*Me),C=u/r,e=(i.width||p)*C,t=(i.height||p)*C,n=i.x==null?a.length/2-e/2:i.x*C,o=i.y==null?a.length/2-t/2:i.y*C;let s=null;if(i.excavate){let d=Math.floor(n),c=Math.floor(o),h=Math.ceil(e+n-d),f=Math.ceil(t+o-c);s={x:d,y:c,w:h,h:f}}return{x:n,y:o,h:t,w:e,excavation:s}}var Re=function(){try{new Path2D().addPath(new Path2D)}catch(a){return!1}return!0}();function ve(a){const r=a,{value:l,size:i=W,level:m=Y,bgColor:u=G,fgColor:p=X,includeMargin:C=V,style:e,imageSettings:t}=r,n=H(r,["value","size","level","bgColor","fgColor","includeMargin","style","imageSettings"]),o=t==null?void 0:t.src,s=S.useRef(null),d=S.useRef(null),[c,h]=S.useState(!1);S.useEffect(()=>{if(s.current!=null){const y=s.current,g=y.getContext("2d");if(!g)return;let E=N.QrCode.encodeText(l,$[m]).getModules();const R=C?T:0,A=E.length+R*2,b=J(E,i,C,t),P=d.current,L=b!=null&&P!==null&&P.complete&&P.naturalHeight!==0&&P.naturalWidth!==0;L&&b.excavation!=null&&(E=Z(E,b.excavation));const B=window.devicePixelRatio||1;y.height=y.width=i*B;const z=i/A*B;g.scale(z,z),g.fillStyle=u,g.fillRect(0,0,A,A),g.fillStyle=p,Re?g.fill(new Path2D(K(E,R))):E.forEach(function(q,ee){q.forEach(function(te,ne){te&&g.fillRect(ne+R,ee+R,1,1)})}),L&&g.drawImage(P,b.x+R,b.y+R,b.w,b.h)}}),S.useEffect(()=>{h(!1)},[o]);const f=F({height:i,width:i},e);let v=null;return o!=null&&(v=M.createElement("img",{src:o,key:o,style:{display:"none"},onLoad:()=>{h(!0)},ref:d})),M.createElement(M.Fragment,null,M.createElement("canvas",F({style:f,height:i,width:i,ref:s},n)),v)}function be(a){const r=a,{value:l,size:i=W,level:m=Y,bgColor:u=G,fgColor:p=X,includeMargin:C=V,imageSettings:e}=r,t=H(r,["value","size","level","bgColor","fgColor","includeMargin","imageSettings"]);let n=N.QrCode.encodeText(l,$[m]).getModules();const o=C?T:0,s=n.length+o*2,d=J(n,i,C,e);let c=null;e!=null&&d!=null&&(d.excavation!=null&&(n=Z(n,d.excavation)),c=M.createElement("image",{xlinkHref:e.src,height:d.h,width:d.w,x:d.x+o,y:d.y+o,preserveAspectRatio:"none"}));const h=K(n,o);return M.createElement("svg",F({height:i,width:i,viewBox:"0 0 ".concat(s," ").concat(s)},t),M.createElement("path",{fill:u,d:"M0,0 h".concat(s,"v").concat(s,"H0z"),shapeRendering:"crispEdges"}),M.createElement("path",{fill:p,d:h,shapeRendering:"crispEdges"}),c)}const Se=a=>{const{componentCls:r}=a;return{[r]:Object.assign(Object.assign({},se(a)),{display:"flex",justifyContent:"center",alignItems:"center",padding:a.paddingSM,backgroundColor:a.colorWhite,borderRadius:a.borderRadiusLG,border:"".concat(a.lineWidth,"px ").concat(a.lineType," ").concat(a.colorSplit),position:"relative",width:"100%",height:"100%",overflow:"hidden",["& > ".concat(r,"-mask")]:{position:"absolute",insetBlockStart:0,insetInlineStart:0,zIndex:10,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",height:"100%",color:a.colorText,lineHeight:a.lineHeight,background:a.QRCodeMaskBackgroundColor,textAlign:"center",["& > ".concat(r,"-expired")]:{color:a.QRCodeExpiredTextColor}},"&-icon":{marginBlockEnd:a.marginXS,fontSize:a.controlHeight}}),["".concat(r,"-borderless")]:{borderColor:"transparent"}}},Ae=oe("QRCode",a=>Se(re(a,{QRCodeExpiredTextColor:"rgba(0, 0, 0, 0.88)",QRCodeMaskBackgroundColor:"rgba(255, 255, 255, 0.96)"}))),Pe=a=>{const[,r]=ie(),{value:l,type:i="canvas",icon:m="",size:u=160,iconSize:p=40,color:C=r.colorText,errorLevel:e="M",status:t="active",bordered:n=!0,onRefresh:o,style:s,className:d,rootClassName:c,prefixCls:h,bgColor:f="transparent"}=a,{getPrefixCls:v}=S.useContext(ae),y=v("qrcode",h),[g,E]=Ae(y),R={src:m,x:void 0,y:void 0,height:p,width:p,excavate:!0},A={value:l,size:u-(r.paddingSM+r.lineWidth)*2,level:e,bgColor:f,fgColor:C,imageSettings:m?R:void 0},[b]=le("QRCode");if(!l)return null;const P=ce(y,d,c,E,{["".concat(y,"-borderless")]:!n});return g(M.createElement("div",{style:Object.assign(Object.assign({},s),{width:u,height:u,backgroundColor:f}),className:P},t!=="active"&&M.createElement("div",{className:"".concat(y,"-mask")},t==="loading"&&M.createElement(de,null),t==="expired"&&M.createElement(M.Fragment,null,M.createElement("p",{className:"".concat(y,"-expired")},b==null?void 0:b.expired),o&&M.createElement(k,{type:"link",icon:M.createElement(ue,null),onClick:o},b==null?void 0:b.refresh))),i==="canvas"?M.createElement(ve,Object.assign({},A)):M.createElement(be,Object.assign({},A))))},Ie=Pe,Ne=a=>{const r={系统单号:"System order no",单号:"Order no.",商户单号:"Merchant order no",资产类型:"Asset type",资产数量:"Asset quantity",异步通知:"Async notification",同步跳转:"Synchronous jump",交易哈希:"Transaction hash",发送地址:"Sending address",接收地址:"Receiving address",手续费率:"Procedure rate",手续费额:"Procedure fee",交收金额:"Settlement amount",订单状态:"Order Status",待支付:"To be paid",已支付:"Have paid",已过期:"Expired",回调状态:"Callback state",未回调:"No callback",无响应:"No response",已回调:"Callback ",下单时间:"Order time",支付时间:"Time of payment","系统订单号/订单号":"System order number/order number",回调时间:"Callback time",过期时间:"Expiration time",交易详情:"Transaction details",操作:"Controls",详情:"Details",补单:"Resend order",代收订单:"Collection orders",代收订单详情:"Collect order details",代付订单:"Cover an order",代付订单详情:"Pay for order details",下发订单:"Issued Orders",下发订单详情:"Order delivery details",下发数量:"Quantity delivered",待下发:"To be issued",已下发:"Issued",校验状态:"Verification status",待校验:"To be verified",已校验:"Verify",不匹配:"Mismatch","发送/接收地址":"mismatch",下发时间:"Issued time",校验时间:"Check time",申请下发:"Application issue",创建下发订单:"Create and issue an order",可下发数量:"Deliverable quantity",数量:"Quantity",地址:"Address",类型:"Type","是否确认操作？":"Do you confirm the operation?",收银台地址:"Cash register address",下发密码:"Issued password",重置下发密码:"Reset the Issued password",新密码:"New password",账户余额:"Account balance",下发金额:"Issued amount",代付数量:"Quantity outstanding",代付金额:"Payment amount",代收金额:"Collection amount",密保邮箱:"Confidential email",修改密保邮箱:"Modify security email",绑定验证器:"Bind validator",金额:"Amount(USDT)",资产:"Asset",原代收金额:"Original Coll. amt.",已驳回:"Rejected",审计中:"Under audit"};let l=he(m=>m.counter.language);function i(m){if(l=="zhCNIntl")return m;if(m)return r[m]}return i(a.toggle)},{Paragraph:_e}=pe,Oe=()=>{const a=fe(),[r,l]=S.useState(!1),[i,m]=S.useState(!1),[u,p]=S.useState(""),[C,e]=S.useState(""),t=()=>{m(!0)},n=()=>{m(!1)},o=()=>{m(!1)},s=h=>{var y;console.log("Success:",h),l(!0);let f=new FormData;for(var v in h)(y=h[v])!=null&&y.trim()&&f.append(v,h[v]);Ce(h).then(g=>{g.code==0?(localStorage.token=g.data.token,D.success("登录成功"),console.log(g.data.uid),localStorage.mange=g.data.uid,l(!1),Ee().then(E=>{E.code==0&&(localStorage.exchanges=JSON.stringify(E.data),we(E.data)?location.pathname="/Layout/OrderCollection":a("/Welcome"))})):g.code==-2?(l(!1),p("otpauth://totp/gpay:"+h.username+"?secret="+g.data),e(g.data),t()):(l(!1),D.error(g.msg))}).catch(()=>{l(!1)})};function d(h,f){return console.log(h),f?Promise.resolve():Promise.reject(new Error("Please input your username!"))}function c(h,f){return console.log(h),f?Promise.resolve():Promise.reject(new Error("Please input your password!"))}return w.jsxs("div",{style:{display:"flex"},children:[w.jsx("div",{style:{position:"fixed",bottom:10,right:10,color:"#eee",fontSize:12},children:ge}),w.jsx("div",{style:{width:"100vw",height:"100vh",backgroundColor:"rgba(0, 0, 0, 0.85)",display:"flex",justifyContent:"center",alignItems:"center"},className:"login-bg",children:w.jsx("div",{children:w.jsxs("div",{style:{margin:"0 auto",width:480,padding:40,background:"#FFF",borderRadius:8,paddingBottom:20},children:[w.jsx("div",{style:{marginBottom:40,fontWeight:700,fontSize:30,textAlign:"center"},children:"ESharp"}),w.jsxs(_,{name:"basic",layout:"vertical",style:{maxWidth:600},initialValues:{remember:!0},onFinish:s,autoComplete:"off",children:[w.jsx(_.Item,{name:"username",rules:[{validator:d}],children:w.jsx(O,{style:{height:60,borderRadius:8,background:"#F4F5F5",minWidth:300},placeholder:"Please enter your username"})}),w.jsx(_.Item,{name:"password",rules:[{validator:c}],children:w.jsx(O,{type:"password",style:{height:60,borderRadius:8,background:"#F4F5F5",minWidth:300},placeholder:"Please enter your password!"})}),w.jsx(_.Item,{name:"code",children:w.jsx(O,{type:"password",style:{height:60,borderRadius:8,background:"#F4F5F5",minWidth:300},placeholder:"Please enter the token"})}),w.jsx(_.Item,{style:{marginTop:30},children:w.jsx(k,{className:"login",loading:r,type:"primary",htmlType:"submit",style:{height:60,width:"100%",borderRadius:8,background:"rgb(0 0 0 / 85%)",fontSize:18},children:"Log in"})})]})]})})}),w.jsx(me,{title:w.jsx(Ne,{toggle:"绑定验证器"}),centered:!0,open:i,onOk:n,onCancel:o,width:400,footer:null,maskClosable:!1,children:w.jsxs("div",{style:{marginTop:20,display:"flex",flexDirection:"column",alignItems:"center"},children:[w.jsxs("div",{style:{border:"1px dashed #b7d900",padding:"0px 10px",height:22},children:[" ",w.jsxs(_e,{style:{marginBottom:0},copyable:{text:C,icon:[w.jsx("img",{src:"/copy.svg",style:{verticalAlign:"middle"}})]},children:[" ",C]})," "]}),w.jsxs("div",{style:{marginTop:15},children:[w.jsx(Ie,{errorLevel:"H",value:u})," "]})]})})]})};export{Oe as default};
