document.documentElement.classList.add('js');
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#nav');
menu.hidden=false;
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
nav.addEventListener('click',event=>{if(event.target.closest('a')){menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}});
const tabs=[...document.querySelectorAll('[role=tab]')];
function selectTab(tab,focus=false){for(const item of tabs){const selected=item===tab;item.setAttribute('aria-selected',String(selected));item.tabIndex=selected?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!selected}if(focus)tab.focus()}
for(const tab of tabs){tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',event=>{let n=tabs.indexOf(tab);if(event.key==='ArrowRight')n=(n+1)%tabs.length;else if(event.key==='ArrowLeft')n=(n+tabs.length-1)%tabs.length;else if(event.key==='Home')n=0;else if(event.key==='End')n=tabs.length-1;else return;event.preventDefault();selectTab(tabs[n],true)})}selectTab(tabs[0]);
const dialog=document.querySelector('#lightbox');let opener=null;
document.querySelectorAll('a.zoom').forEach(link=>link.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey)return;event.preventDefault();opener=link;const caption=link.dataset.caption||link.querySelector('img')?.alt||'Интерфейс приложения';dialog.querySelector('img').src=link.href;dialog.querySelector('img').alt=caption;dialog.querySelector('p').textContent=caption;dialog.showModal()}));
dialog.querySelector('button').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close()}});
dialog.addEventListener('close',()=>opener?.focus());
dialog.addEventListener('keydown',event=>{if(event.key==='Tab'){event.preventDefault();dialog.querySelector('button').focus()}});
