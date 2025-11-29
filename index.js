import{S as f,i as l}from"./assets/vendor-BrddEoy-.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const d="53464024-6a9f32a3179c04c5ef7872dae",p="https://pixabay.com/api/",m=async(r,n=1)=>{const t=new URLSearchParams({key:d,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:n.toString(),per_page:"40"}),s=await fetch(`${p}?${t}`);if(!s.ok)throw new Error(`HTTP error! status: ${s.status}`);return s.json()},i=document.querySelector(".gallery");let a;function y(){a||(a=new f(".gallery a",{captionsData:"alt",captionDelay:250}))}function h(){i&&(i.innerHTML="")}function g(r){if(!i){console.error("Gallery element not found");return}const n=r.map(t=>`
    <li class="gallery-item">
      <a href="${t.largeImageURL}">
        <img 
          src="${t.webformatURL}" 
          alt="${t.tags}" 
          class="gallery-image"
        />
      </a>
      <div class="gallery-info">
        <p class="info-item">
          <b>Likes</b>
          ${t.likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${t.views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${t.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${t.downloads}
        </p>
      </div>
    </li>
  `).join("");i.insertAdjacentHTML("beforeend",n),a?a.refresh():y()}function b(){const r=document.querySelector(".loader");r&&(r.style.display="inline-block")}function u(){const r=document.querySelector(".loader");r&&(r.style.display="none")}document.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector(".form"),n=document.querySelector('input[name="search-text"]');r.addEventListener("submit",t=>{t.preventDefault();const s=n.value.trim();s&&(h(),b(),m(s).then(e=>{if(u(),!e.hits||e.hits.length===0){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}g(e.hits)}).catch(e=>{u(),l.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight"}),console.error("Error fetching images:",e)}))})});
//# sourceMappingURL=index.js.map
