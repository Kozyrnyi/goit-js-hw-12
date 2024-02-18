import{a as S,S as E,i as P}from"./assets/vendor-5401a4b0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const I="/goit-js-hw-12/assets/error_icon-4567d441.svg";async function h(t,o,r){const n="42305957-2425bb18c357c2a7b9cbd48a2",e="https://pixabay.com/api/",s={key:n,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:o,page:r};return(await S.get(e,{params:s})).data}function q({webformatURL:t,largeImageURL:o,tags:r,likes:n,views:e,comments:s,downloads:i}){return`<a href="${o}" class="gallery-item">
                <img src="${t}" alt="" title="${r}">
                <div class="info-block">
                    <div class="info-item likes">
                        <span>Likes</span>${n}
                    </div>
                    <div class="info-item views">
                        <span>Views</span>${e}
                    </div>
                    <div class="info-item comments">
                        <span>Comments</span>${s}
                    </div>
                    <div class="info-item downloads">
                        <span>Downloads</span>${i}
                    </div>
                </div>
            </a>`}function x(t){return t.map(q).join("")}function g(t,o){const r=x(o);t.insertAdjacentHTML("beforeend",r)}const f=document.querySelector(".search-form"),l=document.querySelector(".load-more"),y=document.querySelector(".items-wrap"),d=document.querySelector(".gallery");let c,a,u;const m=15;let p;f.addEventListener("submit",B);l.addEventListener("click",M);async function B(t){if(t.preventDefault(),d.innerHTML="",a=1,u=1,l.classList.add("hidden"),c=f.elements.searchField.value.trim(),c){v();try{const o=await h(c,m,a);o.hits.length!==0?(u=Math.ceil(o.totalHits/m),g(d,o.hits),$(),C()):b({message:"Sorry, there are no images matching your search query. Please try again!",bgColor:"#EF4040",progressColor:"#B51B1B"})}catch(o){console.log(o)}L()}w(),f.reset()}async function M(){a+=1,v();const t=await h(c,m,a);g(d,t.hits),p.refresh(),L(),C(),w(),O()}function $(){p=new E(".gallery a"),p.refresh()}function v(){y.classList.add("loading")}function L(){y.classList.remove("loading")}function O(){const t=d.firstElementChild.getBoundingClientRect().height*2;window.scrollBy({behavior:"smooth",top:t})}function b({message:t,bgColor:o,progressColor:r}){P.show({message:t,messageColor:"#fff",backgroundColor:o,theme:"dark",iconUrl:I,position:"topRight",timeout:3e3,progressBarColor:r,animateInside:!1,transitionIn:"fadeIn"})}function w(){a>=u?l.classList.add("hidden"):l.classList.remove("hidden")}function C(){a>=u&&b({message:"We're sorry, but you've reached the end of search results.",bgColor:"#2db4cf",progressColor:"#40666e"})}
//# sourceMappingURL=commonHelpers.js.map
