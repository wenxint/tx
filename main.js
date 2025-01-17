// import './style.css'
// import javascriptLogo from './javascript.svg'
// import { setupCounter } from './lib/main.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
import Vconsole from "vconsole";
// import image from './src/1.webp'
// console.log(image);

// import index from './js/index.js'
// import nextCommon from './js/nextCommon.js'
// import actV2 from './js/actV2.js'

function loadScript(url, doc = document) {
    return new Promise(function (resolve) {
        let script_ = doc.createElement("script");
        script_.type = "text/javascript";
        script_.src = url;
        script_.onload = function () {
              console.log(url);
            resolve();
        };
        doc.body.appendChild(script_);
    });
}


loadScript("./js/index.js")
  .then(() => {
    return loadScript("./js/nextCommon.js");
  })
  .then(() => {
    return loadScript("./js/actV2.js");
  });


console.log("Hello Vite!");

const env = import.meta.env.VITE_MODE; // 获取配置信息
console.log(env, "env");
if (env !== "prod") new Vconsole(); // 如所有环境均需开启 则不需要判断

