(function(){
  var key = 'forceDarkMode';
  function createButton(){
    var btn = document.createElement('button');
    btn.id = 'force-dark-toggle';
    btn.type = 'button';
    btn.title = 'Toggle force dark mode (QA only)';
    btn.setAttribute('aria-label','Toggle force dark mode');
    btn.setAttribute('aria-pressed','false');
    btn.textContent = 'Dark';
    btn.addEventListener('click', function(){
      var isOn = document.documentElement.classList.toggle('force-dark');
      if(isOn){
        localStorage.setItem(key,'1');
        btn.classList.add('force-on');
        btn.setAttribute('aria-pressed','true');
        btn.textContent = 'Dark';
      } else {
        localStorage.removeItem(key);
        btn.classList.remove('force-on');
        btn.setAttribute('aria-pressed','false');
        btn.textContent = 'Light';
      }
    }, false);
    return btn;
  }

  function init(){
    var btn = createButton();
    // attach to document body if available
    if(document.body){
      document.body.appendChild(btn);
    } else {
      document.addEventListener('DOMContentLoaded', function(){ document.body.appendChild(btn); });
    }

    // restore saved state
    try{
      if(localStorage.getItem(key) === '1'){
        document.documentElement.classList.add('force-dark');
        btn.classList.add('force-on');
        btn.setAttribute('aria-pressed','true');
        btn.textContent = 'Dark';
      } else {
        btn.textContent = 'Light';
      }
    }catch(e){
      // ignore storage errors
    }
  }

  // Defer initialization until DOM ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
