/* Agri Nature AI reliability layer: touch navigation, source-first details, mobile-safe modals and weather fallback. */
(function(){
  'use strict';

  // The old mobile shopping-style navigation is intentionally removed.
  document.querySelectorAll('.mobile-bottom-nav').forEach(el=>el.remove());
  document.querySelectorAll('style').forEach(el=>{ if((el.textContent||'').includes('.mobile-bottom-nav')) el.remove(); });
  document.body.style.paddingBottom='';

  const $=s=>document.querySelector(s);
  const esc=v=>String(v??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  const machines=[
    {id:'mahindra-475',name:'Mahindra 475 DI MS SP Plus',category:'tillage',emoji:'🚜',image:'https://www.mahindratractor.com/sites/default/files/styles/958x863/public/2024-09/mahindra-475-di-ms-sp-plus-tractor-web.webp',manufacturer:'Mahindra & Mahindra Ltd.',origin:'India',spec:'42 HP • 4-cylinder • 1,500 kg hydraulic lift • 8 forward / 2 reverse gears',purpose:'Farm power for compatible tillage, planting, transport and other tractor-mounted operations.',crops:'Use depends on the implement and crop system; suitable implements include cultivators, ploughs, harrows and planters.',land:'Select tractor drive, tyres and implement according to soil, slope, traction, field size and operation.',maintenance:'Follow the current operator manual for engine oil, filters, coolant, tyres, hydraulics, PTO and scheduled service.',safety:'Use PTO guards and correct ballast; stop the engine before maintenance and never work under an unsupported raised implement.',environment:'Right-size tractor power and minimise unnecessary field passes to reduce fuel use and soil disturbance.',source:'https://www.mahindratractor.com/ta/tractors/475-di-sp-plus'},
    {id:'aspee-de135',name:'ASPEE DE135/ES Power Weeder',category:'tillage',emoji:'🌱',image:'https://aspee.com/attachments/products/aspee-power-weeder-diesel-engine-electric-start-de135-es--sj.jpg',manufacturer:'ASPEE',origin:'India',spec:'8.5 HP • 418 cc diesel • 800–1050 mm tilling width • ≥150 mm tilling depth • approx. 150 kg • electric start',purpose:'Mechanised weeding, tilling and soil preparation for suitable agricultural, horticultural and plantation systems.',crops:'Agricultural and horticultural crops where the working width and row spacing are compatible.',land:'Best for safely accessible fields; avoid excessive wetness, large stones and unsafe slopes.',maintenance:'Inspect tines/blades, gearbox, engine oil, air filtration, fasteners and controls before operation.',safety:'Keep hands and feet away from rotating blades; stop the engine before clearing blockages and use appropriate PPE.',environment:'Use only the depth and number of passes needed for the crop and soil; avoid unnecessary intensive tillage.',source:'https://aspee.com/products-details/DE135-ES/aspee-power-weeder-diesel-engine-electric-start-de135-es-s'},
    {id:'preet-987',name:'PREET 987 New Edition Combine Harvester',category:'harvest',emoji:'🌾',image:'https://preet.co/images/PREET-987-deluxe-ac.jpg',manufacturer:'PREET Group',origin:'India',spec:'133 HP • 5-speed gearbox • 365 L fuel tank • self-propelled multicrop combine',purpose:'Combines cutting, feeding, threshing, separation and grain handling in one harvesting system.',crops:'Wheat, paddy, maize, red gram, soybean, sunflower, mustard, gram, arhar and moong are listed by the manufacturer.',land:'Requires suitable field access, crop condition, turning space and safe transport routes.',maintenance:'Daily cleaning, lubrication, cutter/header inspection, belts/chains and engine service are important during harvest.',safety:'Keep people clear of the header, augers and discharge system; shut down and isolate before clearing jams.',environment:'Timely harvesting can reduce field losses; manage residues without open burning where alternatives are available.',source:'https://preet.co/products/82bc2791-0bbc-4024-9125-9000a3b8f793'},
    {id:'mitra-400',name:'MITRA Cropmaster 400 Hydraulic Boom Sprayer',category:'crop-protection',emoji:'💦',image:'https://www.mitrasprayer.com/wp-content/uploads/2023/10/Mitrasprayer-Website-CM-Boom-400-1.jpg',manufacturer:'Mitra Agro Equipments Pvt. Ltd.',origin:'India',spec:'400 L tank • 55 LPM diaphragm pump • 16 nozzles • 24 ft boom • tractor 40 HP and above',purpose:'Tractor-mounted boom spraying with adjustable boom height and nozzle spacing for suitable field crops.',crops:'Manufacturer information includes soybean, tur, chilli, cotton, sugarcane, cereals and pulses.',land:'Needs safe tractor entry, turning space and suitable weather/wind conditions.',maintenance:'Clean filters and nozzles, flush after use, inspect hoses/pump and calibrate output.',safety:'Use only authorised products and label directions, PPE, drift-control practices and required buffer zones. This platform never supplies a pesticide dose.',environment:'Correct calibration and drift control reduce off-target movement and unnecessary chemical use.',source:'https://www.mitrasprayer.com/hindi/product/%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A5%89%E0%A4%AA%E0%A4%AE%E0%A4%BE%E0%A4%B8%E0%A5%8D%E0%A4%9F%E0%A4%B0-%E0%A5%AA%E0%A5%A6%E0%A5%A6-%E0%A4%B2/'},
    {id:'icar-smart',name:'ICAR Smart / Precision Farm Technologies',category:'smart',emoji:'🤖',image:'https://www.icar.gov.in/sites/default/files/inline-images/Agri-Engineering.jpg',manufacturer:'ICAR agricultural-engineering research ecosystem',origin:'India',spec:'Technology family rather than one commercial machine; includes automatic irrigation, variable-rate input systems, sensor-assisted spraying and precision implements.',purpose:'Measure field conditions and control farm operations more precisely.',crops:'Crop-specific; suitability depends on the actual technology, sensor calibration and farm operation.',land:'Best when field variability and operating constraints can be measured and the system is validated locally.',maintenance:'Sensor calibration, wiring, pumps/nozzles, software settings and mechanical components need routine checks.',safety:'Automation must provide safe shutdown, manual override and clear operator visibility.',environment:'Precision systems can improve input-use efficiency when measurements and control are accurate.',source:'https://www.icar.gov.in/en/agricultural-engineering/salient-technologies'}
  ];

  const i18n={
    en:{open:'Touch for full details',manufacturer:'Manufacturer / developer',origin:'Origin',spec:'Verified specification',purpose:'Purpose',crops:'Suitable crops / use',land:'Land / field suitability',maintenance:'Maintenance',safety:'Safety',environment:'Environmental impact',source:'Source',close:'Close',language:'Language',verified:'Source-first data: manufacturer / ICAR source. Check the live source before purchase.'},
    ta:{open:'முழு விவரங்களுக்கு தொடவும்',manufacturer:'உற்பத்தியாளர் / உருவாக்குநர்',origin:'தோற்றம்',spec:'சரிபார்க்கப்பட்ட விவரம்',purpose:'பயன்பாடு',crops:'பயிர்கள் / பயன்பாடு',land:'நிலம் / வயல் பொருத்தம்',maintenance:'பராமரிப்பு',safety:'பாதுகாப்பு',environment:'சுற்றுச்சூழல் தாக்கம்',source:'மூலம்',close:'மூடு',language:'மொழி',verified:'மூல ஆதாரம்: உற்பத்தியாளர் / ICAR. வாங்குவதற்கு முன் தற்போதைய மூலத்தை சரிபார்க்கவும்.'},
    hi:{open:'पूरी जानकारी के लिए स्पर्श करें',manufacturer:'निर्माता / डेवलपर',origin:'उत्पत्ति',spec:'सत्यापित विनिर्देश',purpose:'उपयोग',crops:'उपयुक्त फसल / उपयोग',land:'भूमि / खेत उपयुक्तता',maintenance:'रखरखाव',safety:'सुरक्षा',environment:'पर्यावरण प्रभाव',source:'स्रोत',close:'बंद करें',language:'भाषा',verified:'स्रोत-आधारित डेटा: निर्माता / ICAR स्रोत। खरीद से पहले वर्तमान स्रोत जांचें.'}
  };
  let lang='en';

  function addStyle(){
    const s=document.createElement('style');
    s.textContent=`
      .reliability-modal{position:fixed;inset:0;z-index:5000;display:none}.reliability-modal.open{display:block}.reliability-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.68);backdrop-filter:blur(5px)}
      .reliability-panel{position:relative;width:min(960px,calc(100% - 18px));max-height:calc(100vh - 18px);overflow:auto;margin:9px auto;background:#f8fcf8;color:#102017;border-radius:22px;padding:18px;box-shadow:0 30px 100px #0008}
      .reliability-close{position:absolute;right:10px;top:10px;width:42px;height:42px;border:0;border-radius:50%;font-size:28px;background:#e7f1e9;color:#123;cursor:pointer}.reliability-head{display:grid;grid-template-columns:300px 1fr;gap:20px}.reliability-img{width:100%;height:240px;object-fit:cover;border-radius:16px;background:#e8f0e9}.reliability-title{padding-right:48px}.reliability-title h2{margin:4px 0 8px;font-size:clamp(1.35rem,3vw,2.2rem);line-height:1.1}.reliability-origin{font-weight:800;color:#187343}.reliability-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:18px}.reliability-box{border:1px solid #d5e4d8;border-radius:13px;padding:13px;background:white}.reliability-box b{display:block;margin-bottom:5px;color:#0d6237}.reliability-source{display:inline-block;margin-top:12px;color:#087443;font-weight:800;word-break:break-word}.reliability-note{margin-top:14px;padding:12px;border-left:4px solid #199354;background:#edf7ef;border-radius:8px}.reliability-lang{margin-top:10px;padding:8px 10px;border:1px solid #cbdccc;border-radius:10px;background:white;color:#123}
      .touchable-info{cursor:pointer;transition:transform .15s,box-shadow .15s}.touchable-info:active{transform:scale(.99)}
      .machine-repair-card{padding:0!important;overflow:hidden;cursor:pointer}.machine-repair-card .repair-image{height:185px;width:100%;object-fit:cover;background:#edf3ee;display:block}.machine-repair-card .repair-body{padding:16px}.machine-repair-card .repair-origin{font-size:.82rem;color:#6a776d;margin-top:7px}.repair-fallback{height:185px;display:grid;place-items:center;font-size:58px;background:#eaf3eb}
      @media(max-width:700px){.reliability-panel{width:calc(100% - 10px);max-height:calc(100vh - 10px);margin:5px;padding:13px;border-radius:17px}.reliability-head{grid-template-columns:1fr}.reliability-img{height:205px}.reliability-grid{grid-template-columns:1fr}.machine-repair-card .repair-image,.repair-fallback{height:160px}}
    `;
    document.head.appendChild(s);
  }

  function modal(){
    let m=$('#reliabilityModal');
    if(m)return m;
    m=document.createElement('div');m.id='reliabilityModal';m.className='reliability-modal';
    m.innerHTML='<div class="reliability-backdrop"></div><div class="reliability-panel" role="dialog" aria-modal="true"><button class="reliability-close" aria-label="Close">×</button><div id="reliabilityContent"></div></div>';
    document.body.appendChild(m);
    m.querySelector('.reliability-backdrop').addEventListener('click',closeModal);
    m.querySelector('.reliability-close').addEventListener('click',closeModal);
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
    return m;
  }
  function closeModal(){const m=$('#reliabilityModal');if(m)m.classList.remove('open')}
  function openHtml(html){const m=modal();$('#reliabilityContent').innerHTML=html;m.classList.add('open');m.querySelector('.reliability-panel').scrollTop=0}

  function openMachine(id){
    const x=machines.find(v=>v.id===id);if(!x)return;
    const t=i18n[lang];
    openHtml(`<div class="reliability-head"><div><img class="reliability-img" src="${esc(x.image)}" alt="${esc(x.name)}" onerror="this.style.display='none';this.parentElement.insertAdjacentHTML('beforeend','<div class=repair-fallback>${esc(x.emoji)}</div>')"></div><div class="reliability-title"><span class="tag">${esc(x.category)}</span><h2>${esc(x.name)}</h2><p class="reliability-origin">📍 ${esc(x.origin)}</p><label>${esc(t.language)} <select class="reliability-lang" id="repairLang"><option value="en" ${lang==='en'?'selected':''}>English</option><option value="ta" ${lang==='ta'?'selected':''}>தமிழ்</option><option value="hi" ${lang==='hi'?'selected':''}>हिन्दी</option></select></label><p><b>${esc(t.manufacturer)}:</b> ${esc(x.manufacturer)}</p></div></div><div class="reliability-grid"><div class="reliability-box"><b>${esc(t.spec)}</b>${esc(x.spec)}</div><div class="reliability-box"><b>${esc(t.purpose)}</b>${esc(x.purpose)}</div><div class="reliability-box"><b>${esc(t.crops)}</b>${esc(x.crops)}</div><div class="reliability-box"><b>${esc(t.land)}</b>${esc(x.land)}</div><div class="reliability-box"><b>${esc(t.maintenance)}</b>${esc(x.maintenance)}</div><div class="reliability-box"><b>${esc(t.safety)}</b>${esc(x.safety)}</div><div class="reliability-box"><b>${esc(t.environment)}</b>${esc(x.environment)}</div></div><div class="reliability-note">${esc(t.verified)}</div><a class="reliability-source" href="${esc(x.source)}" target="_blank" rel="noopener noreferrer">${esc(t.source)} ↗</a>`);
    $('#repairLang').addEventListener('change',e=>{lang=e.target.value;openMachine(id)});
  }

  function renderMachines(){
    const grid=$('#machineGrid');if(!grid)return;
    const filter=$('#machineFilter');
    function paint(){
      const f=filter?.value||'all';const list=f==='all'?machines:machines.filter(x=>x.category===f);
      grid.innerHTML=list.map(x=>`<article class="card machine-repair-card touch-machine" data-machine-id="${esc(x.id)}" tabindex="0" role="button" aria-label="${esc(i18n[lang].open)}: ${esc(x.name)}"><div><img class="repair-image" src="${esc(x.image)}" alt="${esc(x.name)}" loading="lazy" onerror="this.style.display='none';this.parentElement.insertAdjacentHTML('beforeend','<div class=repair-fallback>${esc(x.emoji)}</div>')"></div><div class="repair-body"><span class="tag">${esc(x.category)}</span><h3>${esc(x.name)}</h3><p>${esc(x.purpose)}</p><div class="repair-origin">📍 ${esc(x.origin)}</div><strong>${esc(i18n[lang].open)} →</strong></div></article>`).join('');
    }
    paint();filter?.addEventListener('change',paint);
    grid.addEventListener('click',e=>{const c=e.target.closest('.touch-machine');if(c)openMachine(c.dataset.machineId)});
    grid.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const c=e.target.closest('.touch-machine');if(c){e.preventDefault();openMachine(c.dataset.machineId)}}});
  }

  const detailMap={
    'Fertilizer Explorer':{title:'🧪 Fertilizer database',body:'Searchable fertilizer records should show product name, formulation, manufacturer, label/source, crop/soil context, package and price date. Do not present a generic web value as a field-specific fertilizer dose. Site-specific nutrient decisions should use soil testing and authorised recommendations.',source:'https://agritech.tnau.ac.in/agriengg_eng_fertilizers.html'},
    'Seed & Variety Explorer':{title:'🌱 Seed & variety database',body:'Records should include crop, variety, developer/company, duration, season, region, soil and irrigation suitability, documented traits, seed rate and spacing where an authoritative source provides them. Variety recommendations must be region-specific.',source:'https://agritech.tnau.ac.in/'},
    'Integrated farm system':{title:'♻️ Integrated / circular farm',body:'Connect crop residues, livestock, fish, trees, pollinators, compost and renewable resources only where locally suitable. Keep biosecurity, water quality and ecological limits visible in every design.',source:'https://www.icar.gov.in/'},
    'Water intelligence':{title:'💧 Water intelligence',body:'Use rainfall/catchment information, soil moisture, water level, irrigation method, crop stage and field layout. Sensor readings should be labelled by sensor type and timestamp; model estimates must never be presented as physical probe measurements.',source:'https://www.icar.gov.in/en/agricultural-engineering/salient-technologies'},
    'Precision agriculture':{title:'🎯 Precision agriculture',body:'GPS/GNSS, GIS, remote sensing, sensors, variable-rate systems and decision support can be combined for site-specific management. The actual prescription must be based on validated local data and calibration.',source:'https://www.icar.gov.in/en/agricultural-engineering/salient-technologies'},
    'Student innovation':{title:'💡 Student innovation lab',body:'Problem → requirements → sensors → controller → mechanical design → software → power → safety → prototype → testing → environmental impact → improvement. Record measured results rather than claiming performance before testing.',source:'https://www.icar.gov.in/en/core-competencies-4'},
    'Nature protection':{title:'🌍 Nature protection',body:'Every technology plan should show effects on soil, water, biodiversity, pollinators, energy use, waste and emissions. Prefer resource-efficient designs and avoid unnecessary inputs.',source:'https://www.icar.gov.in/en/thrust-areas'}
  };

  function makeInfoTouch(){
    const candidates=[...document.querySelectorAll('.info-card,.feature-band,.awareness,.architecture-grid span,.roadmap-grid span')];
    candidates.forEach(el=>{
      if(el.dataset.reliabilityBound)return;
      const text=(el.textContent||'').trim();
      let key=Object.keys(detailMap).find(k=>text.includes(k));
      if(!key){if(text.includes('Fertilizer'))key='Fertilizer Explorer';else if(text.includes('Seed'))key='Seed & Variety Explorer';else if(text.includes('Water'))key='Water intelligence';else if(text.includes('Remote sensing')||text.includes('Variable-rate')||text.includes('GPS / GIS'))key='Precision agriculture';else if(text.includes('Innovation'))key='Student innovation';else if(text.includes('Nature'))key='Nature protection';}
      if(!key)return;
      el.dataset.reliabilityBound='1';el.classList.add('touchable-info');el.setAttribute('role','button');el.setAttribute('tabindex','0');
      const open=()=>{const d=detailMap[key];openHtml(`<h2>${esc(d.title)}</h2><p>${esc(d.body)}</p><a class="reliability-source" href="${esc(d.source)}" target="_blank" rel="noopener noreferrer">Open authoritative source ↗</a>`)};
      el.addEventListener('click',open);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
    });
  }

  function improveWeather(){
    const live=$('#live-data');if(!live)return;
    const button=$('#locateFarm');const status=$('#liveStatus');
    if(!button||!status)return;
    // Open-Meteo fallback for city-level use when browser geolocation is denied/unavailable.
    const fallback=[11.0168,76.9558];
    const original=button.cloneNode(true);button.replaceWith(original);
    const b=$('#locateFarm');
    b.addEventListener('click',()=>{
      status.textContent='Loading live weather…';
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(p=>window.__agriLoadWeather?.(p.coords.latitude,p.coords.longitude),()=>window.__agriLoadWeather?.(...fallback),{enableHighAccuracy:false,timeout:5000,maximumAge:600000});
      }else window.__agriLoadWeather?.(...fallback);
    });
    window.__agriWeatherFallback=fallback;
    setTimeout(()=>{if(!window.__farmCoords)window.__agriLoadWeather?.(...fallback)},1200);
  }

  function patchLive(){
    // live.js owns the API call; expose a robust callable loader and remove its old duplicate-script injection.
    if(typeof window.__agriLoadWeather==='function')return;
    const status=$('#liveStatus'),grid=$('#liveGrid'),forecast=$('#forecast');if(!status||!grid)return;
    const fmt=(v,u='')=>v==null||Number.isNaN(Number(v))?'—':`${Number(v).toFixed(1)}${u}`;
    window.__agriLoadWeather=async(lat,lon)=>{
      status.textContent='Loading live weather…';
      try{
        const url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,soil_moisture_0_to_10cm&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,et0&forecast_days=7&timezone=auto`;
        const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error(`HTTP ${r.status}`);const d=await r.json();
        const c=d.current||{},x=d.daily||{};window.__farmCoords=[lat,lon];
        grid.innerHTML=`<article class="live-card touchable-info"><b>📍 Location</b><strong>${Number(lat).toFixed(4)}, ${Number(lon).toFixed(4)}</strong><small>GPS coordinates if permission was granted; otherwise city fallback.</small></article><article class="live-card"><b>🌡️ Temperature</b><strong>${fmt(c.temperature_2m,' °C')}</strong><small>Feels ${fmt(c.apparent_temperature,' °C')}</small></article><article class="live-card"><b>💧 Humidity</b><strong>${fmt(c.relative_humidity_2m,' %')}</strong><small>Relative humidity</small></article><article class="live-card"><b>🌧️ Rain</b><strong>${fmt(c.precipitation,' mm')}</strong><small>Current precipitation</small></article><article class="live-card"><b>💨 Wind</b><strong>${fmt(c.wind_speed_10m,' km/h')}</strong><small>10 m wind</small></article><article class="live-card"><b>🌱 Soil moisture</b><strong>${fmt(c.soil_moisture_0_to_10cm,' m³/m³')}</strong><small>Model estimate — not an ESP32 probe</small></article><article class="live-card"><b>☀️ ET₀</b><strong>${fmt(x.et0?.[0],' mm')}</strong><small>Reference evapotranspiration</small></article><article class="live-card"><b>🕒 Updated</b><strong>${c.time?new Date(c.time).toLocaleTimeString():'—'}</strong><small>${c.time?new Date(c.time).toLocaleDateString():''}</small></article>`;
        if(Array.isArray(x.time))forecast.innerHTML='<h3>7-day farm outlook</h3><div class="forecast-grid">'+x.time.map((day,i)=>`<div><b>${new Date(day).toLocaleDateString(undefined,{weekday:'short',day:'numeric',month:'short'})}</b><span>🌡️ ${Math.round(x.temperature_2m_max?.[i]??0)}° / ${Math.round(x.temperature_2m_min?.[i]??0)}°</span><span>🌧️ ${x.precipitation_probability_max?.[i]??'—'}%</span><span>💧 ${Number(x.et0?.[i]??0).toFixed(1)} mm ET₀</span></div>`).join('')+'</div>';
        status.textContent='Live data loaded • Open-Meteo • refreshed automatically';
      }catch(err){status.textContent='Live weather could not be loaded. Showing source links; retry when network access is available.';console.error('Weather error',err)}
    };
  }

  function boot(){
    addStyle();renderMachines();makeInfoTouch();patchLive();improveWeather();
    // If live.js created the old section after this script, retry once.
    setTimeout(()=>{patchLive();improveWeather();makeInfoTouch()},500);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
