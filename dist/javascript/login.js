!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=891)}({890:function(e,t,n){e.exports=n.p+"images/banner.png"},891:function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(890);var a=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,React.Component),r(t,[{key:"render",value:function(){return React.createElement("div",{id:"content"},React.createElement("center",null,React.createElement("img",{className:"center w50",src:"./images/banner.png"}),React.createElement("h2",null,"We Stand Against Censorship"),React.createElement("h5",{className:"text-center"},"Please Log In"),React.createElement("form",{id:"loginform"},React.createElement("input",{className:"UITextField center w90",id:"user",placeholder:"Username..."}),React.createElement("input",{className:"UITextField center w90",id:"pass",placeholder:"Password...",type:"password"}),React.createElement("button",{className:"UIButton center w90",type:"submit",id:"loginbutton"},"LOG IN")),React.createElement("button",{type:"button",className:"UIButton center w90",id:"signupButton"},"SIGN UP"),React.createElement("p",{className:"text-center",id:"advanced"},"Advanced..."),React.createElement("div",{className:"UIAlertWindow hidden",id:"advancedwindow"},React.createElement("h1",null,"Advanced Options"),React.createElement("h2",null,"Log In with Private Key (WIF)"),React.createElement("input",{className:"UITextField center w90",id:"privatekeyfield",placeholder:"WIF Key..."}),React.createElement("br",null),React.createElement("button",{className:"UIButton center w90",type:"submit",onclick:"$('#loginbutton').click()"},"LOG IN"))))}}]),t}();$(document).ready(function(){ReactDOM.render(React.createElement(a,null),document.getElementById("app")),$("#user").focus(),$("#loginform").on("submit",function(e){e.preventDefault(),$("#loginbutton").innerHTML="PLEASE WAIT...",$("#privatekeyfield").val().length>5?(sessionStorage.privateKey=$("#privatekeyfield").val(),Utilities.redirect("newposts.html")):$("#user").val().length<1?(new ErrorBanner("Please enter a username").show(),$("#loginbutton").innerHTML="LOG IN"):$("#pass").val().length<12?(Messages.passwordSecurity(),$("#loginbutton").innerHTML="LOG IN"):(sessionStorage.privateKey=Utilities.privateKeyFromLoginCredentials($("#user").val(),$("#pass").val()),Utilities.redirect("newposts.html"))}),$("#signupButton").on("click",function(e){e.preventDefault(),Messages.signUp()}),$("#advanced").on("click",function(){new InteractivePopup("#advancedwindow").show()})})}});
//# sourceMappingURL=login.js.map