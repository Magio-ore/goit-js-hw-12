import{a as w,i as d,S as L}from"./assets/vendor-CNqCr-V-.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const S="53464024-6a9f32a3179c04c5ef7872dae",q="https://pixabay.com/api/",M=async(e,s=1)=>{const r={key:S,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:s.toString(),per_page:"15"};return(await w.get(q,{params:r})).data},f=document.querySelector(".gallery");let c;function E(){c||(c=new L(".gallery a",{captionsData:"alt",captionDelay:250}))}function I(){f&&(f.innerHTML=""),c&&(c.destroy(),c=null)}function v(e){if(!f){console.error("Gallery element not found");return}const s=e.map(r=>`
    <li class="gallery-item">
      <a href="${r.largeImageURL}">
        <img 
          src="${r.webformatURL}" 
          alt="${r.tags}" 
          class="gallery-image"
        />
      </a>
      <div class="gallery-info">
        <p class="info-item">
          <b>Likes</b>
          ${r.likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${r.views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${r.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${r.downloads}
        </p>
      </div>
    </li>
  `).join("");f.insertAdjacentHTML("beforeend",s),c?c.refresh():E()}function B(){const e=document.querySelector(".loader");e&&(e.style.display="inline-block")}function P(){const e=document.querySelector(".loader");e&&(e.style.display="none")}function y(){const e=document.querySelector(".load-more-btn");e&&(e.style.display="block")}function m(){const e=document.querySelector(".load-more-btn");e&&(e.style.display="none")}function R(){const e=document.querySelector(".end-message");e&&(e.style.display="block")}function O(){const e=document.querySelector(".end-message");e&&(e.style.display="none")}function h(){m(),R(),d.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}function $(){d.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"})}function x(e){const s=document.querySelector(".gallery");if(!s)return;const r=e||0,n=s.querySelectorAll(".gallery-item");if(n.length>r&&n.length>0){const t=n[r];if(t){const l=t.getBoundingClientRect().height;l>0&&window.scrollBy({top:l*2,behavior:"smooth"})}}}function A(){const e=document.querySelector(".gallery");return e?e.querySelectorAll(".gallery-item").length:0}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".form"),s=document.querySelector('input[name="search-text"]'),r=document.querySelector(".load-more-btn");let n=1,t="",o=0;const l=async(u,a)=>{try{B();const i=await M(u,a);if(!i.hits||i.hits.length===0)return a===1&&d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),null;v(i.hits);const g=i.totalHits||0;return o=Math.ceil(g/15),{hits:i.hits,totalHits:g,totalPages:o}}catch(i){return d.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight"}),console.error("Error fetching images:",i),null}finally{P()}},p=async u=>{u.preventDefault();const a=s.value.trim();if(!a){$();return}t=a,n=1,o=0,I(),m(),O();const i=await l(a,n);i&&i.hits.length>0&&(n<o?y():h())},b=async()=>{m();const u=A();n+=1,await l(t,n)?(n>=o?h():y(),u>0&&x(u)):y()};e.addEventListener("submit",p),r&&r.addEventListener("click",b)});
//# sourceMappingURL=index.js.map
