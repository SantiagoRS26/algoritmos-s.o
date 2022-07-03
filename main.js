function createChart(e) {
  const days = document.querySelectorAll(".chart-values li");
  const tasks = document.querySelectorAll(".chart-bars li");
  const daysArray = [...days];

  tasks.forEach(el => {
    const duration = el.dataset.duration.split("-");
    const startDay = duration[0];
    const endDay = duration[1];
    let left = 0,
      width = 0;

    if (startDay.endsWith("½")) {
      const filteredArray = daysArray.filter(day => day.textContent == startDay.slice(0, -1));
      left = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth / 2;
    } else {
      const filteredArray = daysArray.filter(day => day.textContent == startDay);
      left = filteredArray[0].offsetLeft;
    }

    if (endDay.endsWith("½")) {
      const filteredArray = daysArray.filter(day => day.textContent == endDay.slice(0, -1));
      width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth / 2 - left;
    } else {
      const filteredArray = daysArray.filter(day => day.textContent == endDay);
      width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth - left;
    }

    // apply css
    el.style.left = `${left}px`;
    el.style.width = `${width}px`;
    el.style.backgroundColor = el.dataset.color;
    el.style.opacity = 1;
  });
}


window.addEventListener("load", createChart);
window.addEventListener("resize", createChart);



var formularioall = document.getElementById('formularioall'),
  divdiagramaall = document.getElementById('diagramaall'),
  divencabezado = document.getElementById('encabezado'),
  divlimites = document.getElementById('limites'),
  divtablalimites = document.getElementById('tablalimites'),
  divformulario1 = document.getElementById('formulario1');

formularioall.style.display = 'none',
  divdiagramaall.style.display = 'none',
  divlimites.style.display = 'none';

var cantprocesos;
var vectornombresfcfs = [];
var vectortcpufcfs = [];

var vectornombressjf = [];
var vectortcpusjf = [];

var vectornombresprioridad = [];
var vectortcpuprioridad = [];
var vectortllegadaprioridad = [];
var vectorpprioridad = [];

var limitcpu, limitlleg, limitprio,limitnp;
var a = 1, b = 1, c = 1, d = 1;
var mt = 0;

function crearformulario() {
  cantprocesos = document.getElementById("cantprocesos").value;
  if(cantprocesos == ''){
    alert("Si llena manualmente los datos, debe ingresar una cantidad de procesos.");
    return;
  }
  formularioall.style.display = 'block';
  formulario1.style.display = 'none';


  for (let i = 0; i < cantprocesos; i++) {
    var br = document.createElement("br");


    var TP = document.createElement("input");
    TP.setAttribute("type", "Number");
    TP.setAttribute("id", `Tcpuall${i}`);
    TP.setAttribute("placeholder", "Tiempo Cpu");

    var Tll = document.createElement("input");
    Tll.setAttribute("type", "Number");
    Tll.setAttribute("id", `Tllegadaall${i}`);
    Tll.setAttribute("placeholder", "Tiempo de llegada");

    var prio = document.createElement("input");
    prio.setAttribute("type", "Number");
    prio.setAttribute("id", `Tpall${i}`);
    prio.setAttribute("placeholder", "Prioridad");



    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "submit");


    formularioall.appendChild(TP);
    form.appendChild(br.cloneNode());

    formularioall.appendChild(Tll);
    form.appendChild(br.cloneNode());

    formularioall.appendChild(prio);
    form.appendChild(br.cloneNode());


    document.getElementById("formularioall").appendChild(form);
  }
  var buttonañadirall = document.createElement("input");
  buttonañadirall.setAttribute("type", "button");
  buttonañadirall.setAttribute("value", "Añadir");
  buttonañadirall.setAttribute("onclick", "añadirall();")
  formularioall.appendChild(buttonañadirall);
  form.appendChild(br.cloneNode());
}

function añadirall() {

  for (let i = 0; i < cantprocesos; i++) {
    vectornombresfcfs.push(`P${i}`);
    vectortcpufcfs.push(parseInt(document.getElementById(`Tcpuall${i}`).value));

    vectornombressjf.push(`P${i}`);
    vectortcpusjf.push(parseInt(document.getElementById(`Tcpuall${i}`).value));

    vectornombresprioridad.push(`P${i}`);
    vectortcpuprioridad.push(parseInt(document.getElementById(`Tcpuall${i}`).value));
    vectortllegadaprioridad.push(parseInt(document.getElementById(`Tllegadaall${i}`).value));
    vectorpprioridad.push(parseInt(document.getElementById(`Tpall${i}`).value));
  }

  mostrartodo();
}

function añadirramdon() {

  mt = 1;
  limitnp = document.getElementById('limitenump').value;
  limitcpu = document.getElementById('limitetcpu').value
    , limitlleg = document.getElementById('limitetllegada').value,
    limitprio = document.getElementById('limiteprioridad').value;

  console.log(limitnp);
  divlimites.style.display = 'none';

  if (limitnp.length == 0) {
    d = 0;
    limitnp = 10;
  }
  if (limitcpu.length == 0) {
    limitcpu = 10;
    a = 0;
  }
  if (limitlleg.length == 0) {
    limitlleg = 10;
    b = 0;
  }
  if (limitprio.length == 0) {
    limitprio = 10;
    c = 0;
  }

  cantprocesos = random(1, limitnp);

  for (let i = 0; i < limitnp; i++) {

    var x = random(1, parseInt(limitcpu));
    var y = random(1, parseInt(limitlleg));
    var z = random(1, parseInt(limitprio));

    vectornombresfcfs.push(`P${i}`);
    vectortcpufcfs.push(x);

    vectornombressjf.push(`P${i}`);
    vectortcpusjf.push(x);

    vectornombresprioridad.push(`P${i}`);
    vectortcpuprioridad.push(x);
    vectortllegadaprioridad.push(y);
    vectorpprioridad.push(z);

  }
  mostrartodo();
}

function mostrartodo() {
  formularioall.style.display = 'none',
    divdiagramaall.style.display = 'block',
    divencabezado.style.display = 'none';

  if (mt == 0) {
    divtablalimites.style.display = 'none';
  }

  var tabla = document.getElementById('tabladatos');  

  
  let tablita = document.getElementById('inputTable');
  let tiempolle = 0;
  for (let i = 0; i < cantprocesos; i++) {

    let row = tablita.insertRow(-1);
    let inp = document.createElement('input');
    let inp2 = document.createElement('input');
    inp2.type = "text";
    inp2.setAttribute("disabled","");
    inp2.setAttribute("style","all: unset;")
    inp.setAttribute("class","initial exectime");
    inp.setAttribute("disabled","");
    inp.setAttribute("style","all: unset;")

    inp.setAttribute("type","text");
    inp.setAttribute("value",vectortcpuprioridad[i]);
    inp2.setAttribute("value",vectorpprioridad[i]);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    cell1.innerHTML = vectornombresprioridad[i];
    cell2.innerHTML = tiempolle;
    cell3.appendChild(inp);
    cell4.setAttribute("class","servtime");
    cell5.appendChild(inp2);
    if(i==0){
      cell5.setAttribute("class","priority-only initial");
    }
    else{
      cell5.setAttribute("class","priority-only");
    }
    tiempolle++;
    $('#diagramas').html('');
    $('#diagramas').html('<h3>DIAGRAMA FCFS</h3><fresh></fresh><p id="timepro"></p><h3>DIAGRAMA DE SJF</h3><fresh id="DIA1"></fresh><p id="timepro1"></p><h3>DIAGRAMA DE PRIORIDAD</h3><fresh id="DIA2"></fresh><p id="timepro2"></p><h3>DIAGRAMA DE ROBIN</h3><fresh id="DIA3"></fresh><p id="timepro3"></p><p>Timer: <strong id="timer"></strong> sec</p>');
  }
  




  var tabla2 = document.getElementById('tablalimites');
  var row2 = tabla2.insertRow(1);
  var cel1 = row2.insertCell(0);
  var cel2 = row2.insertCell(1);
  var cel3 = row2.insertCell(2);
  var cel4 = row2.insertCell(3);
  var cel5 = row2.insertCell(4);

  cel1.innerHTML = 'Limites';
  if (d == 1) {
    cel2.innerHTML = limitnp;
  } else { cel2.innerHTML = 'No hay limites'; }
  if (a == 1) {
    cel3.innerHTML = limitcpu;
  } else { cel3.innerHTML = 'No hay limites'; }

  if (b == 1) {
    cel4.innerHTML = limitlleg;
  } else { cel4.innerHTML = 'No hay limites'; }

  if (c == 1) {
    cel5.innerHTML = limitprio;
  } else { cel5.innerHTML = 'No hay limites'; }

  drawfcfs();

  drawsjf();

  drawprioridad();

  drawrobin();
}

function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}




////////////////////////////



  //window.addEventListener("load", createChart);
  //window.addEventListener("resize", createChart);