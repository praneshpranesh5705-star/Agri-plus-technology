/* Final UI safety net: ensures heritage tabs and touch cards always respond. */
(function(){
  const $=s=>document.querySelector(s);
  const content={
    traditional:{title:'Documented Tamil / Indigenous knowledge',body:'Traditional agricultural knowledge is presented as documented knowledge, not automatically as scientific proof. ICAR maintains inventories and validation documents for Indigenous Technical Knowledge (ITK), including agriculture practices and plant-related knowledge.',source:'https://icar.gov.in/en/ITK'},
    modern:{title:'Modern science + engineering',body:'Modern agricultural engineering combines mechanisation, precision agriculture, sensing, irrigation, remote sensing, automation and resource-use optimisation. ICAR identifies these as important engineering and research areas.',source:'https://www.icar.gov.in/en/overview-4'},
    bridge:{title:'Traditional → science → technology',body:'Observe a local practice and its context → check evidence → measure the claimed effect → engineer only what solves a real constraint → compare water, energy, labour, cost, yield and environmental outcomes.',source:'https://www.icar.gov.in/en/ITK'}
  };
  function paint(mode){const box=$('#heritageContent'),d=content[mode]||content.traditional;if(!box)return;box.innerHTML=`<h3>${d.title}</h3><p>${d.body}</p><p class="source-badge">Source-first: documented knowledge is separated from scientific evidence.</p><a class="source-badge" style="display:inline-block;margin-top:12px;color:#62d38a" href="${d.source}" target="_blank" rel="noopener">Open authoritative source ↗</a>`;document.querySelectorAll('.heritage-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode))}
  function bind(){document.querySelectorAll('.heritage-tabs button').forEach(b=>{if(b.dataset.uiFixed)return;b.dataset.uiFixed='1';b.addEventListener('click',()=>paint(b.dataset.mode))});paint('traditional')}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
  setTimeout(bind,800);
})();
