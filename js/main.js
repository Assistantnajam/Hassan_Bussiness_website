(function(){
var hd=document.getElementById('hd');
addEventListener('scroll',function(){hd.classList.toggle('sm',scrollY>40)},{passive:true});
var bg=document.getElementById('bg'),mn=document.getElementById('menu');
bg.onclick=function(){var o=mn.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
mn.onclick=function(){mn.classList.remove('open');bg.setAttribute('aria-expanded','false')};
var D=[[182,113,'USA'],[478,113,'Turkey'],[427,107,'Italy'],[422,86,'Germany'],[440,66,'Sweden / N. Europe'],[522,146,'Dubai'],[631,122,'China'],[683,134,'South Korea'],[707,114,'Japan']],H=[562,125],r='',n='';
D.forEach(function(d){var cy=Math.min(d[1],H[1])-46;
r+='<path class="route" d="M'+d[0]+' '+d[1]+' Q'+((d[0]+H[0])/2)+' '+cy+' '+H[0]+' '+H[1]+'"/>';
n+='<circle cx="'+d[0]+'" cy="'+d[1]+'" r="3.5" fill="#fff"/><text x="'+d[0]+'" y="'+(d[1]+(d[2]==='Japan'||d[2]==='Sweden / N. Europe'?-8:14))+'" font-size="9" fill="#c3cad4" text-anchor="middle" font-family="DM Sans,sans-serif">'+d[2]+'</text>'});
n+='<circle class="pulse" cx="562" cy="125" r="5" fill="#FFB400"/><circle cx="562" cy="125" r="5.5" fill="#FFB400" stroke="#080b10" stroke-width="2"/><text x="562" y="108" font-size="11" font-weight="700" fill="#FFB400" text-anchor="middle" font-family="Barlow Condensed,sans-serif">ISLAMABAD</text>';
document.getElementById('routes').innerHTML=r;document.getElementById('nodes').innerHTML=n;
var form=document.getElementById('f'),st=document.getElementById('st'),btn=form.querySelector('button'),ok0=st.innerHTML;
form.onsubmit=function(e){e.preventDefault();
if(form._honey.value)return;
if(!form.name.value.trim()||!form.phone.value.trim()){st.className='err';st.textContent='Please enter your name and phone number.';return}
btn.disabled=true;btn.textContent='Sending...';st.className='hint';st.textContent='Sending your enquiry...';
fetch('https://formsubmit.co/ajax/anzarbukhari123@gmail.com',{method:'POST',headers:{'Accept':'application/json'},body:new FormData(form)})
.then(function(r){return r.json()})
.then(function(d){if(d.success===true||d.success==='true'){form.reset();st.className='ok';st.textContent='Thank you. Your enquiry has been sent to our team and we will contact you soon.'}else{throw new Error('x')}})
.catch(function(){st.className='err';st.innerHTML='Sorry, your message could not be sent. Please call 0333-5132140 or <a href="https://wa.me/923335132140" target="_blank" rel="noopener">message us on WhatsApp</a>.'})
.then(function(){btn.disabled=false;btn.textContent='Send enquiry by email'})};
// AI chat assistant (talks to /api/chat, see SETUP-CHATBOT.txt)
var cp=document.getElementById('cp'),cb=document.getElementById('cb'),cm=document.getElementById('cm'),cf=document.getElementById('cf'),ci=document.getElementById('ci'),hist=[],busy=false;
function add(t,w){var d=document.createElement('div');d.className='m '+w;d.textContent=t;cm.appendChild(d);cm.scrollTop=cm.scrollHeight;return d}
add('Assalam o Alaikum! I am the Hassan Diesel Engineering assistant. Ask me about our parts, machinery, sourcing countries or how to reach our team.','b');
function toggle(o){cp.classList.toggle('open',o);cb.setAttribute('aria-expanded',o);if(o)ci.focus()}
cb.onclick=function(){toggle(!cp.classList.contains('open'))};
document.getElementById('cx').onclick=function(){toggle(false)};
addEventListener('keydown',function(e){if(e.key==='Escape')toggle(false)});
function ask(q){if(busy||!q.trim())return;busy=true;add(q,'u');hist.push({role:'user',content:q});ci.value='';cf.querySelector('button').disabled=true;
var t=add('Typing...','b t');
fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:hist})})
.then(function(r){
  return r.json().catch(function(){return {error:'Server error ('+r.status+')'}}).then(function(d){
    if(!r.ok) throw new Error(d.error || d.details || 'Request failed ('+r.status+')');
    return d;
  });
})
.then(function(d){t.className='m b';t.textContent=d.reply;hist.push({role:'assistant',content:d.reply})})
.catch(function(e){
  console.error('Chatbot error:', e);
  hist.pop();
  t.className='m b';
  t.textContent='Sorry, the assistant is not available right now. Please call 0333-5132140 or ';
  var a=document.createElement('a');a.href='https://wa.me/923335132140';a.target='_blank';a.rel='noopener';a.textContent='message us on WhatsApp';
  t.appendChild(a);t.appendChild(document.createTextNode('.'));
})
.then(function(){busy=false;cf.querySelector('button').disabled=false;cm.scrollTop=cm.scrollHeight})}
cf.onsubmit=function(e){e.preventDefault();ask(ci.value)};
document.querySelectorAll('.chips button').forEach(function(b){b.onclick=function(){ask(b.textContent)}});
})();
