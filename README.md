# Little Pika V6

Little Pika is a Multipurpose Discord Bot with 100k+ Users!<br>
Little Pika has all Commands that you need for your Server!<br>
And now its even <strong>OPEN SOURCE</strong>!<br><br><br><br>

<hr>
<br><br>

## Using Little Pika
<br>
A Guide for how to use Pika is linked <a href="https://little-pika-2-0.gitbook.io/little-pika-2-0/">here</a><br><br><br>

<hr>
<br><br>

## Self Hosting
<br>
First of all we do <strong>NOT</strong> support the Self Hosting of Little Pika <i>but yea do what you want to do</i>
<br><br>

### Installing NodeJS
<br>
Here are some Guides on how to install NodeJS on some Operating Systems<br>
<a href="https://treehouse.github.io/installation-guides/windows/node-windows.html">Windows</a><br>
<a href="https://www.geeksforgeeks.org/installation-of-node-js-on-linux">Linux <i>Ubuntu</i></a><br>
<a href="https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-debian-10">Linux <i>Debian</i></a><br>
<a href="https://why-mac-os.herokuapp.com">MacOS</a><br>
<br><br>

### Making Config.json
<br>
Just replace the placeholders with your stuff<br>
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
.tg-sort-header::-moz-selection{background:0 0}
.tg-sort-header::selection{background:0 0}.tg-sort-header{cursor:pointer}
.tg-sort-header:after{content:'';float:right;margin-top:7px;border-width:0 5px 5px;border-style:solid;
  border-color:#404040 transparent;visibility:hidden}
.tg-sort-header:hover:after{visibility:visible}
.tg-sort-asc:after,.tg-sort-asc:hover:after,.tg-sort-desc:after{visibility:visible;opacity:.4}
.tg-sort-desc:after{border-bottom:none;border-width:5px 5px 0}</style>
<table id="tg-jcKV1" class="tg">
<thead>
  <tr>
    <th class="tg-0pky">token</th>
    <th class="tg-0pky">Token from the Discord Bot</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">prefix</td>
    <td class="tg-0pky">The Trigger of your Bot</td>
  </tr>
  <tr>
    <td class="tg-0pky">mongodb</td>
    <td class="tg-0pky">URI of your Mongo DB</td>
  </tr>
  <tr>
    <td class="tg-0pky">color</td>
    <td class="tg-0pky">The Default color from your Embeds</td>
  </tr>
  <tr>
    <td class="tg-0pky">credits</td>
    <td class="tg-0pky">The Default Footer text of your Embeds</td>
  </tr>
  <tr>
    <td class="tg-0pky">owners</td>
    <td class="tg-0pky">ID's of you and the ones you want to have acccess to your Eval Command</td>
  </tr>
  <tr>
    <td class="tg-0pky">googleAPI</td>
    <td class="tg-0pky">A API Key from Google</td>
  </tr>
  <tr>
    <td class="tg-0pky">ALPHA_VANTAGE_KEY</td>
    <td class="tg-0pky">API Key from Alpha Vantage</td>
  </tr>
  <tr>
    <td class="tg-0pky">Spotify_ID</td>
    <td class="tg-0pky">ID of your Spotify Client</td>
  </tr>
  <tr>
    <td class="tg-0pky">Spotify_Token</td>
    <td class="tg-0pky">Secret of your Spotify Client</td>
  </tr>
  <tr>
    <td class="tg-0pky">LV_HOST</td>
    <td class="tg-0pky">IP Adress of your Lavalink Host</td>
  </tr>
  <tr>
    <td class="tg-0pky">LV_PORT</td>
    <td class="tg-0pky">Port of your Lavalink Host</td>
  </tr>
  <tr>
    <td class="tg-0pky">LV_PW</td>
    <td class="tg-0pky">Password of your Lavalink Host</td>
  </tr>
</tbody>
</table>
<script charset="utf-8">var TGSort=window.TGSort||function(n){"use strict";function r(n){return n?n.length:0}function t(n,t,e,o=0){for(e=r(n);o<e;++o)t(n[o],o)}function e(n){return n.split("").reverse().join("")}function o(n){var e=n[0];return t(n,function(n){for(;!n.startsWith(e);)e=e.substring(0,r(e)-1)}),r(e)}function u(n,r,e=[]){return t(n,function(n){r(n)&&e.push(n)}),e}var a=parseFloat;function i(n,r){return function(t){var e="";return t.replace(n,function(n,t,o){return e=t.replace(r,"")+"."+(o||"").substring(1)}),a(e)}}var s=i(/^(?:\s*)([+-]?(?:\d+)(?:,\d{3})*)(\.\d*)?$/g,/,/g),c=i(/^(?:\s*)([+-]?(?:\d+)(?:\.\d{3})*)(,\d*)?$/g,/\./g);function f(n){var t=a(n);return!isNaN(t)&&r(""+t)+1>=r(n)?t:NaN}function d(n){var e=[],o=n;return t([f,s,c],function(u){var a=[],i=[];t(n,function(n,r){r=u(n),a.push(r),r||i.push(n)}),r(i)<r(o)&&(o=i,e=a)}),r(u(o,function(n){return n==o[0]}))==r(o)?e:[]}function v(n){if("TABLE"==n.nodeName){for(var a=function(r){var e,o,u=[],a=[];return function n(r,e){e(r),t(r.childNodes,function(r){n(r,e)})}(n,function(n){"TR"==(o=n.nodeName)?(e=[],u.push(e),a.push(n)):"TD"!=o&&"TH"!=o||e.push(n)}),[u,a]}(),i=a[0],s=a[1],c=r(i),f=c>1&&r(i[0])<r(i[1])?1:0,v=f+1,p=i[f],h=r(p),l=[],g=[],N=[],m=v;m<c;++m){for(var T=0;T<h;++T){r(g)<h&&g.push([]);var C=i[m][T],L=C.textContent||C.innerText||"";g[T].push(L.trim())}N.push(m-v)}t(p,function(n,t){l[t]=0;var a=n.classList;a.add("tg-sort-header"),n.addEventListener("click",function(){var n=l[t];!function(){for(var n=0;n<h;++n){var r=p[n].classList;r.remove("tg-sort-asc"),r.remove("tg-sort-desc"),l[n]=0}}(),(n=1==n?-1:+!n)&&a.add(n>0?"tg-sort-asc":"tg-sort-desc"),l[t]=n;var i,f=g[t],m=function(r,t){return n*f[r].localeCompare(f[t])||n*(r-t)},T=function(n){var t=d(n);if(!r(t)){var u=o(n),a=o(n.map(e));t=d(n.map(function(n){return n.substring(u,r(n)-a)}))}return t}(f);(r(T)||r(T=r(u(i=f.map(Date.parse),isNaN))?[]:i))&&(m=function(r,t){var e=T[r],o=T[t],u=isNaN(e),a=isNaN(o);return u&&a?0:u?-n:a?n:e>o?n:e<o?-n:n*(r-t)});var C,L=N.slice();L.sort(m);for(var E=v;E<c;++E)(C=s[E].parentNode).removeChild(s[E]);for(E=v;E<c;++E)C.appendChild(s[v+L[E-v]])})})}}n.addEventListener("DOMContentLoaded",function(){for(var t=n.getElementsByClassName("tg"),e=0;e<r(t);++e)try{v(t[e])}catch(n){}})}(document)</script>