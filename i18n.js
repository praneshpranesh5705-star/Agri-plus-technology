/* Agri Nature AI language system: English + Tamil + Hindi. */
(function(){
  const translations={
    en:{name:'English',machinery:'Machinery Explorer',touch:'Touch for full details →',origin:'Origin',manufacturer:'Manufacturer / developer',purpose:'Purpose',crops:'Suitable crops',land:'Land / field suitability',power:'Power requirement',capacity:'Capacity / performance',details:'How it works / details',maintenance:'Maintenance',safety:'Safety',environment:'Environmental impact',source:'Official / reference source',close:'Close',category:'Category'},
    ta:{name:'தமிழ்',machinery:'இயந்திர ஆய்வகம்',touch:'முழு விவரங்களைப் பார்க்க தொடவும் →',origin:'தோற்றம் / தயாரிப்பு நாடு',manufacturer:'உற்பத்தியாளர் / உருவாக்குநர்',purpose:'பயன்பாடு',crops:'பொருத்தமான பயிர்கள்',land:'நிலம் / வயல் பொருத்தம்',power:'சக்தி தேவை',capacity:'திறன் / செயல்திறன்',details:'எவ்வாறு செயல்படுகிறது / முழு விவரம்',maintenance:'பராமரிப்பு',safety:'பாதுகாப்பு',environment:'சுற்றுச்சூழல் தாக்கம்',source:'அதிகாரப்பூர்வ / ஆதார இணைப்பு',close:'மூடு',category:'வகை'},
    hi:{name:'हिन्दी',machinery:'कृषि मशीनरी एक्सप्लोरर',touch:'पूरी जानकारी के लिए स्पर्श करें →',origin:'मूल / निर्माण देश',manufacturer:'निर्माता / विकासकर्ता',purpose:'उपयोग',crops:'उपयुक्त फसलें',land:'भूमि / खेत की उपयुक्तता',power:'शक्ति आवश्यकता',capacity:'क्षमता / प्रदर्शन',details:'कैसे काम करता है / पूरी जानकारी',maintenance:'रखरखाव',safety:'सुरक्षा',environment:'पर्यावरणीय प्रभाव',source:'आधिकारिक / संदर्भ स्रोत',close:'बंद करें',category:'श्रेणी'}
  };
  function setLang(lang){
    if(!translations[lang])lang='en';
    window.__agriLang=lang;
    document.documentElement.lang=lang==='ta'?'ta':lang;
    document.body.dataset.language=lang;
    document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(translations[lang][k])el.textContent=translations[lang][k]});
    const btn=document.getElementById('langBtn'); if(btn)btn.textContent=translations[lang].name;
    window.dispatchEvent(new CustomEvent('agri-language-change',{detail:{lang}}));
  }
  window.__agriTranslations=translations; window.__setAgriLanguage=setLang; window.__agriT=k=>(translations[window.__agriLang||'en']||translations.en)[k]||translations.en[k]||k;
  const old=document.getElementById('agriLanguageMenu'); if(old)old.remove();
  const wrap=document.createElement('div');wrap.id='agriLanguageMenu';wrap.className='agri-language-menu';
  wrap.innerHTML='<select id="agriLanguageSelect" aria-label="Language"><option value="en">English</option><option value="ta">தமிழ்</option><option value="hi">हिन्दी</option></select>';
  const header=document.querySelector('.topbar'); if(header){const btn=document.getElementById('langBtn'); if(btn)btn.style.display='none'; header.appendChild(wrap)}
  wrap.querySelector('select').addEventListener('change',e=>setLang(e.target.value));
  const saved=localStorage.getItem('agri-language')||'en'; wrap.querySelector('select').value=saved; setLang(saved); window.addEventListener('agri-language-change',e=>localStorage.setItem('agri-language',e.detail.lang));
  const style=document.createElement('style');style.textContent='.agri-language-menu select{border:1px solid #cfe0d2;border-radius:10px;padding:9px 12px;background:#fff;font-weight:700;color:#173a28}.machinery-card{touch-action:manipulation}.machinery-modal-panel{touch-action:pan-y}';document.head.appendChild(style);
})();
