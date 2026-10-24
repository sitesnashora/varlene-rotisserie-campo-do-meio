/* Varlene Rotisserie · itens, preços e horário de EXEMPLO (não têm cardápio online e o Google não mostra horário) */
window.FL={
 IMG:{fa5:'photo-1606728035253-49e8a23146de',fa10:'photo-1652545296821-09a023a9fd08',pb4:'photo-1625477811233-044633d10dd1',cs5:'photo-1647724394693-2c93af726785',ch0:'photo-1555939594-58d7cb561ad1',ch5:'photo-1534797258760-1bd2cc95a5bd',bb0:'photo-1632158930341-46604b637a0f',bb7:'photo-1694192708556-3c2170f14734',mk5:'photo-1705359573325-f2006d5e459f',pl3:'photo-1609090820067-a5c5195f18a9',pl0:'photo-1622688717978-52b2089546c8',pl6:'photo-1752367798938-f1fac36c6d4c',lb7:'photo-1786201188578-05303725442f',lb0:'photo-1543353071-c953d88f7033',bu4:'photo-1662982693758-f69fcb81e7d2',bu1:'photo-1555244162-803834f70033',rb0:'photo-1516714435131-44d6b64dc6a2',pi4:'photo-1546024664-9226c2d3819b',pi2:'photo-1581986675622-41eccf27129d',gs1:'photo-1598401863352-3de5501f4890',gs2:'photo-1691480241974-92481cef09ff',oj0:'photo-1600271886742-f049cd451bba',sc5:'photo-1605548230624-8d2d0419c517',sc6:'photo-1761281137117-42da05306117'},
 CARN:['Frango assado', 'Peixe frito', 'Carne de panela', 'Bife acebolado', 'Linguiça'],
 CATS:[
  {id:'frango',name:'Frango assado',note:'da máquina, douradinho',ex:1,rm:[],items:[['Frango Assado Inteiro','Acompanha farofa.','fa5',0,'CARN',0],['Meio Frango Assado','Acompanha farofa.','fa10',0,'CARN',0],['Farofa','Porção.','rb0',0,'CARN',0],['Maionese','Porção.','pi2',0,'CARN',0]]},
  {id:'marmita',name:'Marmitex',note:'almoço mineiro pra levar',ex:1,szn:['Pequeno', 'Médio', 'Grande'],rm:['Arroz','Feijão','Salada','Farofa'],items:[['Marmitex do Dia','Escolha a carne. Arroz, feijão, salada e os acompanhamentos do dia.','pl6',1,'CARN',0],['Marmitex com 2 Carnes','Escolha 2 carnes.','pl3',2,'CARN',0]]},
  {id:'beb',name:'Bebidas',note:'',rm:[],items:[['Refrigerante Lata','350 ml.','sc5',0,'CARN',0],['Refrigerante 2 L','','sc5',0,'CARN',0],['Suco Natural','Copo.','oj0',0,'CARN',0],['Água','500 ml.','sc6',0,'CARN',0]]}
 ],
 PRICE:{'frango-0':45,'frango-1':26,'frango-2':8,'frango-3':12,'marmita-0':[16,20,24],'marmita-1':[20,25,30],'beb-0':6,'beb-1':14,'beb-2':8,'beb-3':3},
 EXPRICE:['frango-0','frango-1','frango-2','frango-3','marmita-0','marmita-1','beb-0','beb-1','beb-2','beb-3'],
 EXTRAS:[['Ovo frito', 2], ['Farofa extra', 3], ['Porção extra de carne', 7]],
 KEY:{orders:'vrl_orders',cfg:'vrl_cfg',me:'vrl_me',mine:'vrl_mine'},
 ST:{novo:'Recebido',forno:'No forno',saiu:'Saiu pra entrega',pronto:'Pronto pra retirar',fim:'Entregue',cancel:'Cancelado'}
};
(function(F){F.PRODUCTS=[];F.CATS.forEach(c=>c.items.forEach((it,i)=>{const id=c.id+'-'+i,p=F.PRICE[id];F.PRODUCTS.push({pick:it[3]||0,pl:it[4]||'CARN',from:!!it[5],exp:(F.EXPRICE||[]).includes(id),id,cat:c.id,name:it[0],desc:it[1],img:F.IMG[it[2]],sz:Array.isArray(p)?p.slice():[p],szn:c.szn||null,ex:!!c.ex,rm:c.rm||[]})}));
 F.get=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}};
 F.set=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}try{F.bc&&F.bc.postMessage(k)}catch(e){}};
 try{F.bc=new BroadcastChannel('varlene')}catch(e){F.bc=null}
 F.cfg=()=>Object.assign({mode:'auto',wait:'30 a 45 min',off:[],price:{}},F.get(F.KEY.cfg,{}));
 F.sizes=p=>{const c=F.cfg(),o=c.price[p.id];return o?p.sz.map(v=>o+(v-p.sz[0])):p.sz};
 F.brl=v=>'R$ '+Number(v).toFixed(2).replace('.',',');
 F.esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 F.U=(id,w,h)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=68`;
 /* horário de EXEMPLO (almoço 11h–14h todo dia), ajustável no painel */
 F.hoursOpen=()=>{const p=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date()).map(x=>[x.type,x.value]));const d=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(p.weekday),h=+p.hour,m=h*60+(+p.minute);return{d,h,m,open:m>=660&&m<840}};
 F.isOpen=()=>{const c=F.cfg();return c.mode==='open'?true:c.mode==='closed'?false:F.hoursOpen().open};
 F.on=fn=>{addEventListener('storage',e=>{if(!e.key||e.key.startsWith('vrl_'))fn()});F.bc&&F.bc.addEventListener('message',fn)};
})(window.FL);
