!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=888)}({888:function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();window.pageInit=function(){window.currentUserAddress=Utilities.resolveGETParam("addr"),!1===window.currentUserAddress&&(window.currentUserAddress=config.userAddress);var e="";window.currentUserAddress===config.userAddress&&(e=new ImageButton({text:"Settings",image:"./images/settings_icon.svg",onclick:function(){new SettingsWindow}}).render()),new NavigationMenu({pageTitle:"Profile",pageIcon:"./images/profile_icon.svg",leftButton:e,rightButton:new ImageButton({text:"New Post",image:"./images/compose_icon.svg",onclick:function(){new CompositionWindow}}).render(),showBackButton:window.currentUserAddress!==config.userAddress});var t=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,React.Component),r(t,[{key:"render",value:function(){return React.createElement("div",{id:"content"},React.createElement("div",{className:"UIPanel center center-text"},React.createElement("img",{id:"profileImage",src:"./images/unite_icon.svg",className:"ProfileImage center"}),React.createElement("p",{id:"myName"},"loading..."),React.createElement("p",{id:"profileText"},React.createElement("i",null,'"Some profound text goes here..."'))),React.createElement("div",{id:"posts"}))}}]),t}();ReactDOM.render(React.createElement(t,null),document.getElementById("app")),window.currentUser=new User(window.currentUserAddress).then(function(e){e.loadPosts();var t=e.name.getInlineName();$("#myName").text(""),$("#myName").append(t)})},window.onPostLoad=function(e){return new Promise(function(t,n){e.sender===window.currentUserAddress?e.init().then(function(e){t(e)}):t(!1)})}}});
//# sourceMappingURL=profile.js.map