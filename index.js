import{a as R,S as $,i as p}from"./assets/vendor-P1Bz7PaC.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=i(a);fetch(a.href,s)}})();const B="https://pixabay.com/api/",I="54359388-9cf15bfeabb0906e8f4ff86d6";async function v(t,e=1,i=40){const{data:n}=await R.get(B,{params:{key:I,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:i}});return n}function O(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function b(t){return t.map(({webformatURL:e,largeImageURL:i,tags:n,likes:a,views:s,comments:l,downloads:P})=>{const H=O(n);return`
<li class="card">
  <a class="card-link" href="${i}">
    <img class="card-img" src="${e}" alt="${H}" loading="lazy" />
  </a>

  <div class="meta">
    <div class="meta-item">
      <span class="meta-title">Likes</span>
      <span class="meta-value">${a}</span>
    </div>
    <div class="meta-item">
      <span class="meta-title">Views</span>
      <span class="meta-value">${s}</span>
    </div>
    <div class="meta-item">
      <span class="meta-title">Comments</span>
      <span class="meta-value">${l}</span>
    </div>
    <div class="meta-item">
      <span class="meta-title">Downloads</span>
      <span class="meta-value">${P}</span>
    </div>
  </div>
</li>`}).join("")}const g=document.querySelector(".search-form"),h=document.querySelector(".gallery"),r=document.querySelector(".load-more"),d=document.getElementById("searchLoader"),u=document.getElementById("loadMoreLoader"),w=new $(".gallery a",{captionsData:"alt",captionDelay:250});let y="",o=1;const f=40;let c=0;async function M(){await new Promise(requestAnimationFrame)}function T(){d&&d.classList.add("is-visible")}function E(){d&&d.classList.remove("is-visible")}function x(){u&&u.classList.add("is-visible")}function S(){u&&u.classList.remove("is-visible")}function C(){r&&r.classList.remove("is-hidden")}function m(){r&&r.classList.add("is-hidden")}function D(){r&&(r.disabled=!0)}function N(){r&&(r.disabled=!1)}function L(){h.innerHTML=""}function _(){p.warning({message:"Please enter a search query.",position:"topRight"})}function j(){p.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}function A(){p.error({message:"Something went wrong. Please try again later.",position:"topRight"})}function q(){p.info({message:"We're sorry, but you've reached the end of search results",position:"topRight"})}function z(){const t=h.firstElementChild;if(!t)return;const{height:e}=t.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}async function G(t){T(),m(),await M();try{const e=await v(t,o,f);if(c=e.totalHits,!e.hits.length){j();return}const i=b(e.hits);h.insertAdjacentHTML("beforeend",i),w.refresh();const n=Math.ceil(c/f);o<n?C():(m(),q())}catch{A()}finally{E()}}async function k(){D(),x(),await M();try{const t=await v(y,o,f);c=t.totalHits;const e=b(t.hits);h.insertAdjacentHTML("beforeend",e),w.refresh();const i=Math.ceil(c/f);o>=i&&(m(),q())}catch{A()}finally{S(),N()}}g.addEventListener("submit",async t=>{t.preventDefault();const e=t.currentTarget.elements.query.value.trim();if(!e){L(),m(),E(),S(),_();return}y=e,o=1,c=0,L(),await G(y),g.reset()});r&&r.addEventListener("click",async()=>{o+=1,await k(),z()});
//# sourceMappingURL=index.js.map
