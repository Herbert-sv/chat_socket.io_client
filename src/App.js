import logo from './logo.svg';
import './App.css';
import socketIo from 'socket.io-client';
import {useEffect,useState} from 'react';
import {boxcont} from './Convbox.js';
import './App.css';

function App() {
const [ user,setuser]=useState("Juan :");
const [msg, setmessage]=useState();
const [msgoutclient,setmessageout]=useState();
const [usermsg,setusermsg]= useState();
const [connection,setconnection]=useState();
const [ userC, setuserC]=useState("client :");

const socket =socketIo.connect('http://localhost:4000')

useEffect(()=>{
  socket.on('connect',()=>{
    console.log('Agent is now online' + " " + socket.connected + 
    "" + socket.id )
  });
return()=>{
  socket.disconnect();
  console.log("disconnected" + " " + socket.disconnected)


}

},[])
//banner//
socket.on("message",(message)=>{
const txt =document.getElementById('header1').innerHTML = message;

})
socket.on("quickinfo",(data)=>{
  console.log(data.information)


})
function infodata(e){
e.preventDefault();
setmessage(e.target.value)

}
function infouser(e){
  e.preventDefault();
  setusermsg(e.target.value)
}


useEffect(()=>
{
  
socket.emit('server',msg );
socket.emit('serveruser',usermsg)


return ()=>{

console.log('unmount')
  
}
},[msg,usermsg])


socket.on('msgoutserver', (data)=>{

  setmessageout(data);
  
  })
  socket.on('msgoutserveru',(data)=>{

    setusermsg(data);
  })
  console.log(msgoutclient + "" + usermsg)


  
  useEffect(()=>
  {
  let btn=  document.getElementById('btnstart');
  let hidc= document.getElementById('userdiv');
  let banspace=document.getElementById('plchAdmin');
btn.addEventListener('click',(e)=>{
e.preventDefault();
btn.style.backgroundColor="red";
hidc.style.visibility= "visible";
banspace.placeholder=""
socket.connect();
socket.on('connect',()=>{
  
  console.log(" a customer is in the chat with agent" + " " + 
  socket.id + " " + socket.connected)
 document.getElementById('info').innerHTML= "you are now, connected!"

})

})
  

},[])

function btndos(e){
  e.preventDefault();
 
  let base=document.getElementById('box1');
  let basedata= document.createElement('p').innerHTML= e.target.value;
  let datamiddle= document.createElement('br');
  base.append(basedata,datamiddle);
  setusermsg("")
 
   }


function btnuno(e){
 e.preventDefault();

 let base=document.getElementById('box1');
 let basedata= document.createElement('p').innerHTML= e.target.value;
 let datamiddle= document.createElement('br');
 base.append(basedata,datamiddle);
 setmessage("");

  }
  let infoAlerUser = userC + " is typing";
  let infoAlerAdmin = user + " is typing";


  function typnoticeAdmd()
  { document.getElementById("alertinf").innerHTML=infoAlerAdmin }
  function typnoticeu()
  { document.getElementById("alertinf").innerHTML = infoAlerUser }







  

  return (
    <body>
<div class="box" id="box1">
  <h4 id="header1" ></h4>
  <h4 class="infoconn"id="info"></h4>
  <em class="recclient" id="alertinf"></em>

  <form>
 <div class="handleru" id="userdiv">
 <div id="emo"><button>&#128512;</button></div>
 <div><button value={userC +""+ usermsg } onClick={btndos}>Send</button></div>
 <div><input type="text" id="plchuser" value={usermsg} onChange={infouser} onMouseDown={typnoticeu} placeholder=" Type on how can we help you ?"/></div>
  </div>
  </form>
    <form>
 <div class="handler" id="adminCo">
 <div><button id="btnstart">Chat</button></div>
 <div><button value={user + "" + msgoutclient} onClick={btnuno}>Send</button></div>
 <div><input type="text" id="plchAdmin" value={msg} onChange={infodata} onMouseDown={typnoticeAdmd}  placeholder="Type the chat button to begin"/></div>
  </div>
  </form>  
</div>

    </body>
  )

  }


export default App;
