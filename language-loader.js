// Loads multilingual machinery labels after the main app and machinery explorer.
(function(){
  window.addEventListener('load',function(){
    const select=document.getElementById('agriLanguageSelect');
    if(!select)return;
    select.addEventListener('change',function(){window.dispatchEvent(new CustomEvent('agri-language-change',{detail:{lang:this.value}}));});
  });
})();
