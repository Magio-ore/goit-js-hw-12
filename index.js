import{S as w,i as y}from"./assets/vendor-BrddEoy-.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const S="53464024-6a9f32a3179c04c5ef7872dae",q="https://pixabay.com/api/",M=async(e,l=1)=>{const r=new URLSearchParams({key:S,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:l.toString(),per_page:"15"}),n=await fetch(`${q}?${r}`);if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);return n.json()},f=document.querySelector(".gallery");let c;function E(){c||(c=new w(".gallery a",{captionsData:"alt",captionDelay:250}))}function v(){f&&(f.innerHTML=""),c&&(c.destroy(),c=null)}function P(e){if(!f){console.error("Gallery element not found");return}const l=e.map(r=>`
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
  `).join("");f.insertAdjacentHTML("beforeend",l),c?c.refresh():E()}function B(){const e=document.querySelector(".loader");e&&(e.style.display="inline-block")}function m(){const e=document.querySelector(".loader");e&&(e.style.display="none")}function I(){const e=document.querySelector(".load-more-btn");e&&(e.style.display="block")}function g(){const e=document.querySelector(".load-more-btn");e&&(e.style.display="none")}function h(){const e=document.querySelector(".end-message");e&&(e.style.display="block")}function $(){const e=document.querySelector(".end-message");e&&(e.style.display="none")}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".form"),l=document.querySelector('input[name="search-text"]'),r=document.querySelector(".load-more-btn");let n=1,t="",o=0;const u=async(a,i)=>{try{B();const s=await M(a,i);if(m(),!s.hits||s.hits.length===0)return i===1&&y.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),null;P(s.hits);const d=s.totalHits||0;return o=Math.ceil(d/15),{hits:s.hits,totalHits:d,totalPages:o}}catch(s){return m(),y.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight"}),console.error("Error fetching images:",s),null}},p=async a=>{a.preventDefault();const i=l.value.trim();if(!i)return;t=i,n=1,o=0,v(),g(),$();const s=await u(i,n);s&&s.hits.length>0&&(n<o?I():h())},b=async()=>{const a=document.querySelector(".gallery"),i=a?a.querySelectorAll(".gallery-item").length:0;if(n+=1,await u(t,n)&&(n>=o&&(g(),h()),a&&i>0)){const d=a.querySelectorAll(".gallery-item");if(d.length>i){const L=d[i].getBoundingClientRect().height;window.scrollBy({top:L*2,behavior:"smooth"})}}};e.addEventListener("submit",p),r&&r.addEventListener("click",b)});
//# sourceMappingURL=index.js.map
