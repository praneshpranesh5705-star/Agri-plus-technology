/* Accessibility + Localization + Voice + Low-bandwidth UX */
(function(){
  const translations={
    en:{name:'English',home:'Home',live:'Live Weather',market:'Market Data',machinery:'Machinery',knowledge:'Crops & Farming',ai:'AI Assistant',learning:'Learning & Research',heritage:'Traditional Knowledge',innovation:'Innovation Lab',more:'More',voice:'Voice search',language:'Language',install:'Install app',online:'Online',offline:'Offline',low:'Low-bandwidth mode',listening:'Listening…',notSupported:'Voice input is not supported in this browser.',searching:'Searching for',pwa:'Agri Nature AI can work like an app and cache the main experience for low-connectivity use.'},
    ta:{name:'தமிழ்',home:'முகப்பு',live:'நேரடி வானிலை',market:'சந்தை தரவு',machinery:'வேளாண் இயந்திரங்கள்',knowledge:'பயிர் & வேளாண்மை',ai:'AI உதவியாளர்',learning:'கற்றல் & ஆராய்ச்சி',heritage:'மரபு அறிவு',innovation:'புதுமை ஆய்வகம்',more:'மேலும்',voice:'குரல் தேடல்',language:'மொழி',install:'ஆப்பை நிறுவு',online:'ஆன்லைன்',offline:'ஆஃப்லைன்',low:'குறைந்த தரவு முறை',listening:'கேட்கிறது…',notSupported:'இந்த உலாவியில் குரல் உள்ளீடு இல்லை.',searching:'தேடுகிறது',pwa:'குறைந்த இணைய வேகத்திலும் முக்கிய வசதிகளை ஆப் போல பயன்படுத்தலாம்.'},
    hi:{name:'हिन्दी',home:'होम',live:'लाइव मौसम',market:'बाज़ार डेटा',machinery:'कृषि मशीनरी',knowledge:'फसल और खेती',ai:'AI सहायक',learning:'सीखना और शोध',heritage:'पारंपरिक ज्ञान',innovation:'इनोवेशन लैब',more:'और',voice:'वॉइस सर्च',language:'भाषा',install:'ऐप इंस्टॉल करें',online:'ऑनलाइन',offline:'ऑफलाइन',low:'कम-डेटा मोड',listening:'सुन रहा है…',notSupported:'इस ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है।',searching:'खोज रहा है',pwa:'कम कनेक्टिविटी में भी मुख्य अनुभव को ऐप की तरह उपयोग किया जा सकता है।'},
    te:{name:'తెలుగు',home:'హోమ్',live:'లైవ్ వాతావరణం',market:'మార్కెట్ డేటా',machinery:'వ్యవసాయ యంత్రాలు',knowledge:'పంటలు & వ్యవసాయం',ai:'AI సహాయకుడు',learning:'అభ్యాసం & పరిశోధన',heritage:'సాంప్రదాయ జ్ఞానం',innovation:'ఇన్నోవేషన్ ల్యాబ్',more:'మరిన్ని',voice:'వాయిస్ శోధన',language:'భాష',install:'యాప్ ఇన్‌స్టాల్',online:'ఆన్‌లైన్',offline:'ఆఫ్‌లైన్',low:'తక్కువ డేటా మోడ్',listening:'వింటోంది…',notSupported:'ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ లేదు.',searching:'శోధిస్తోంది',pwa:'తక్కువ కనెక్టివిటీ ఉన్నా ముఖ్యమైన అనుభవాన్ని యాప్‌లా ఉపయోగించవచ్చు.'},
    es:{name:'Español',home:'Inicio',live:'Clima en vivo',market:'Datos de mercado',machinery:'Maquinaria',knowledge:'Cultivos y agricultura',ai:'Asistente IA',learning:'Aprendizaje e investigación',heritage:'Conocimiento tradicional',innovation:'Laboratorio de innovación',more:'Más',voice:'Búsqueda por voz',language:'Idioma',install:'Instalar app',online:'En línea',offline:'Sin conexión',low:'Modo de bajo consumo de datos',listening:'Escuchando…',notSupported:'La entrada de voz no es compatible con este navegador.',searching:'Buscando',pwa:'La experiencia principal puede funcionar como una app en conexiones lentas.'}
  };
  const speechLang={en:'en-IN',ta:'ta-IN',hi:'hi-IN',te:'te-IN',es:'es-ES'};
  let current=localStorage.getItem('agri-language')||'en';
  let deferredPrompt=null;
  const $=s=>document.querySelector(s);
  const t=k=>(translations[current]&&translations[current][k])||translations.en[k]||k;

  function buildPanel(){
    if($('#accessibilityPanel')) return;
    const panel=document.createElement('aside'); panel.id='accessibilityPanel'; panel.className='accessibility-panel'; panel.setAttribute('aria-label','Accessibility and language controls');
    panel.innerHTML=`<button class="a11y-fab" id="a11yFab" aria-expanded="false" aria-controls="a11yTools">♿</button><div class="a11y-tools" id="a11yTools" hidden><div class="a11y-title">${t('language')} & UX</div><label>${t('language')}<select id="a11yLanguage"><option value="en">English</option><option value="ta">தமிழ்</option><option value="hi">हिन्दी</option><option value="te">తెలుగు</option><option value="es">Español</option></select></label><button class="a11y-action" id="voiceBtn">🎙️ ${t('voice')}</button><button class="a11y-action" id="installBtn" hidden>📲 ${t('install')}</button><label class="a11y-check"><input id="lowData" type="checkbox"> ${t('low')}</label><div class="connection" id="connectionStatus">● ${navigator.onLine?t('online'):t('offline')}</div><p>${t('pwa')}</p></div>`;
    document.body.appendChild(panel);
    $('#a11yFab').addEventListener('click',()=>{const open=!$('#a11yTools').hidden;$('#a11yTools').hidden=open;$('#a11yFab').setAttribute('aria-expanded',String(!open));});
    $('#a11yLanguage').value=current; $('#a11yLanguage').addEventListener('change',e=>setLanguage(e.target.value));
    $('#voiceBtn').addEventListener('click',startVoice);
    $('#lowData').checked=localStorage.getItem('agri-low-data')==='1'; $('#lowData').addEventListener('change',e=>setLowData(e.target.checked));
    window.addEventListener('online',updateConnection); window.addEventListener('offline',updateConnection);
  }
  function updateConnection(){const el=$('#connectionStatus');if(el)el.textContent='● '+(navigator.onLine?t('online'):t('offline'));}
  function setLanguage(lang){current=translations[lang]?lang:'en';localStorage.setItem('agri-language',current);document.documentElement.lang=current;document.body.classList.toggle('tamil-mode',current==='ta');const sel=$('#a11yLanguage');if(sel)sel.value=current;updateConnection();applyTranslations();}
  function applyTranslations(){
    const labels={
      '.mobile-nav-item:nth-child(1) span':'home','.mobile-nav-item:nth-child(2) span':'innovation','.mobile-nav-item:nth-child(3) span':'knowledge','.mobile-nav-item:nth-child(4) span':'ai','.mobile-nav-item:nth-child(5) span':'machinery'
    };
    Object.entries(labels).forEach(([sel,key])=>{const el=$(sel);if(el)el.textContent=t(key)});
    const side=document.querySelectorAll('.side-item'); const keys=['home','live','market','machinery','knowledge','ai','learning','heritage','innovation','more']; side.forEach((el,i)=>{const span=el.querySelector('.side-label');if(span&&keys[i])span.textContent=t(keys[i]);el.setAttribute('aria-label',keys[i]?t(keys[i]):'Agri Nature AI');});
    const voice=$('#voiceBtn');if(voice)voice.textContent='🎙️ '+t('voice');const install=$('#installBtn');if(install)install.textContent='📲 '+t('install');
    const title=$('.a11y-title');if(title)title.textContent=t('language')+' & UX';
    const p=$('#accessibilityPanel p');if(p)p.textContent=t('pwa');
    const low=$('.a11y-check');if(low){const input=low.querySelector('input');low.textContent='';low.append(input,' '+t('low'));}
  }
  function setLowData(on){localStorage.setItem('agri-low-data',on?'1':'0');document.body.classList.toggle('low-data',on);if(on){document.querySelectorAll('img[loading="lazy"]').forEach(i=>i.loading='lazy');} }
  function startVoice(){
    const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!Recognition){alert(t('notSupported'));return;}
    const r=new Recognition();r.lang=speechLang[current]||'en-IN';r.interimResults=false;r.maxAlternatives=1;
    const btn=$('#voiceBtn');btn.classList.add('listening');btn.textContent='🎙️ '+t('listening');
    r.onresult=e=>{const text=e.results[0][0].transcript.trim();const search=$('#search');if(search){search.value=text;search.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('#knowledge')?.scrollIntoView({behavior:'smooth'});}else{announce(t('searching')+' '+text);}};
    r.onerror=()=>{};r.onend=()=>{btn.classList.remove('listening');btn.textContent='🎙️ '+t('voice');};
    r.start();
  }
  function announce(text){if('speechSynthesis' in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=speechLang[current]||'en-IN';speechSynthesis.speak(u);}}
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;const b=$('#installBtn');if(b)b.hidden=false;});
  window.addEventListener('appinstalled',()=>{deferredPrompt=null;const b=$('#installBtn');if(b)b.hidden=true;});
  document.addEventListener('click',e=>{if(e.target&&e.target.id==='installBtn'&&deferredPrompt){deferredPrompt.prompt();deferredPrompt.userChoice.finally(()=>{deferredPrompt=null;});}});
  function registerSW(){if('serviceWorker' in navigator && location.protocol==='https:')navigator.serviceWorker.register('./sw.js').catch(()=>{});}
  document.addEventListener('DOMContentLoaded',()=>{buildPanel();setLowData(localStorage.getItem('agri-low-data')==='1');setLanguage(current);registerSW();});
})();
