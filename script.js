var contfuente = 1;
// declaración de variables degrade


//cargar versiculos.txt
var xmlhttp = new XMLHttpRequest();
var url = "https://raw.githubusercontent.com/PabloVillanueva-Developer/simuladorAPIsRepoJSONs/main/preguntasEntrevista.txt";
//ocultamos el logo
/*  document.getElementById("logo").style.display = "none";  */

/* CARGA VERSICULOS | LOS VERSICULOS DURAN UN DIA, AL CAMBIAR EL DIA SE HABILITA EL RANDOM X PARA ASIGNAR OTRO VERSICULO Y GUARDARLO EN LOCALSTORAGE */
let textoVersiculoLinkWapp = ''
let versiculoLinkWapp = ''

function cargarversiculos(arr){
  let fechaHoy = fecha()
  let x = '' // indice de versiculo a buscar
  let comprobarLocalStorage = JSON.parse(localStorage.getItem('versiculosDelDia'))
  let versiculoDelDia
  
      // FUNCION GENERADORA DE [X] RANDOM PARA BUSQUEDA EN ARRAY DE VERSICULOS
      const generarXRandom = () => {
          x = Math.floor(Math.random() * arr.preguntasEntrevista.length); // se genera valor random para X
          versiculoDelDia =  JSON.stringify({indice: x, fecha: fechaHoy}) // crea objeto y lo hace JSON
          localStorage.setItem('versiculosDelDia', versiculoDelDia) // sube JSON a localStorage
      }

      /* FUNCION PARA DESPLIEGUE DE VERSICULOS + ASIGNACION DE REFERENCIAS PARA COMPARTIR POR WAPP */
      const displayVersiculo = () => {
          document.getElementById("texto").innerHTML = arr.preguntasEntrevista[x].texto;
          //document.getElementById("versiculo").innerHTML = ''
          //textoVersiculoLinkWapp = arr.versiculos[x].texto; /* SE UTILIZA EN BOTON DE WAPP PARA AGREGAR COMO DESCRIPCION AL LINK */
          //versiculoLinkWapp = arr.versiculos[x].versiculo;  /* SE UTILIZA EN BOTON DE WAPP PARA AGREGAR COMO DESCRIPCION AL LINK */
          }
  
  // si en el localStorage no hay nada || si en el localStorage la fecha no coincide )
  if(comprobarLocalStorage === null || comprobarLocalStorage.fecha !== fecha())  {
      generarXRandom()
  }else { // si localStorage las fechas coinciden (fecha hoy y fecha guardada en el local) | Logra que x mantenga valor por un dia 
      x = comprobarLocalStorage.indice // se asigna x guardado en localStorage
  }  

  displayVersiculo()

  /* EVENTO CLICK PARA RESET DE VERSICULO BIBLICO */
  const resetVersiculo = document.getElementById('resetVersiculo');
  resetVersiculo.addEventListener ('click', () => {
        generarXRandom()
        displayVersiculo()
  })
}


//pide los datos al servidor
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        cargarversiculos(myArr);

    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();


function takeshot() {
  document.getElementsByTagName("footer")[0].style.display = "none";
  document.getElementsByTagName("h3")[0].innerHTML += "<span id='textologo'>picb.ar</span>";
 /* document.getElementById("logo").style.display = "block";  */
 html2canvas(document.querySelector("#intro")).then(canvas => {
   document.getElementById("intro").style.animationPlayState = "paused";
    document.body.appendChild(canvas);
    document.getElementsByTagName("canvas")[0].id = "canvas";
 //  document.getElementsByTagName("canvas")[0].style.display = "none";
   document.getElementsByTagName("footer")[0].style.display = "grid";
  document.getElementById("textologo").remove();
   
   download();
 /*    document.getElementById("logo").style.display = "none";  */
    /* document.getElementsByTagName("footer")[0].style.display = "grid";  */// Reestablece estilo original de footer
  }); 
 
}


function download(){
  var link = document.createElement("a");
  link.download ="imagen_.png";
  link.href = document.getElementsByTagName("canvas")[0].toDataURL();
  link.click();
  remove("canvas");
}

function remove(id) 
	 {
     var element = document.getElementById(id);
     return element.parentNode.removeChild(element);
	 }

function fecha(){
  	let date = new Date();
  let fecha  = String(date.getDate()) + '/' + String(date.getMonth()+ 1) + '/' + String(date.getFullYear());  
  return fecha;
      /*date.toDateString();*/
}

var elem = document.documentElement;

function pantallacompleta(){
 if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
  
}

function fullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function closefullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

function fuente(){
  
  let letra = document.getElementById("texto");
  let versiculo = document.getElementById("versiculo");
  switch(contfuente){
    case 1:
      letra.style.fontFamily = "Style Script";
      versiculo.style.fontFamily = "Style Script";
      break;
    case 2:
      letra.style.fontFamily = "Urbanist";
      versiculo.style.fontFamily = "Urbanist";
      break;
    case 3:
      letra.style.fontFamily = "Open Sans";
      versiculo.style.fontFamily = "Open Sans";
      break;
    case 4:
      letra.style.fontFamily = "Alegreya Sans";
      versiculo.style.fontFamily = "Alegreya Sans";
      break;
  }
   if (contfuente >= 4){
     contfuente = 1;
   } else{
     contfuente++;
   }
  
}
function nosotros(){
 document.getElementById("texto").innerHTML="😊Gracias por usar PicB, es una bendición poder acercar y compartir con ustedes el evangelio de Jesús.🙌"
  document.getElementById("versiculo").innerHTML="Javier R. Gutierrez";

  setTimeout(function()
             {xmlhttp.open("GET", url, true),
xmlhttp.send()}
             ,8000);
 
}
var btnNotificacion = document.getElementById("nosotros"),  
    btnPermiso = document.getElementById("intro")
    titulo = "Fili Santillán",
    opciones = {
        icon: "logo.png",
        body: "Notificación de prueba"
    };

/* function permiso() {  
        Notification.requestPermission();
};

function mostrarNotificacion() {  
    if(Notification) {
        if (Notification.permission == "granted") {
            var n = new Notification(titulo, opciones);
        }

        else if(Notification.permission == "default") {
            alert("Primero da los permisos de notificación");
        }

        else {
            alert("Bloqueaste los permisos de notificación");
        }
    }
};

btnPermiso.addEventListener("click", permiso);  
btnNotificacion.addEventListener("click", mostrarNotificacion); */

/*function socialmedia(){
  
 let metas = document.getElementById("titulo");
 let metas = document.getElementById("tipo");
  let metas = document.getElementById("url");
  let metas = document.getElementById("dircanonica");
  metas.setAttribute("content",title);
  metas.setAttribute("content",type);
  metas.setAttribute("content",url);
  metas.setAttribute("content",image);
  
}*/

//HTML2CANVAS
// Define the function 
        // to screenshot the div


/*function takeshot() {
  

 return new Promise(resolve => {
 html2canvas(document.querySelector("#intro")).then(canvas => {
    document.body.appendChild(canvas)
    document.getElementsByTagName("canvas")[0].id = "canvas";
        
    resolve('Imagen creada');
    
    }); //end .then
  }); //end resolve
}


async function download_img(el) {
  // get image URI from canvas object

  const result = await takeshot();

  setTimeout(() => {
    var imageURI = canvas.toDataURL("image/jpg");
    el.href = imageURI;

  }, 2000)
}*/

/*download_img = function(el) {
  document.getElementsByTagName("canvas")[0].id = "canvas";
  // get image URI from canvas object
  var imageURI = document.getElementById("canvas").toDataURL("image/jpg");
  el.href = imageURI;
};*/

/** **************************************** */

var picker = document.getElementById('color-picker');
var handle = document.getElementById('color-handle');
var colorfondo = document.getElementById('principal');
var bar = document.getElementById('color-bar');

picker.addEventListener('mousedown', function(e) {
  moveHandle(e);
  document.addEventListener('mousemove', moveHandle);
  document.addEventListener('mouseup', stopHandle);
});

picker.addEventListener('touchstart', function(e) {
  moveHandle(e);
  document.addEventListener('touchmove', moveHandle);
  document.addEventListener('touchend', stopHandle);
});


function moveHandle(e) {
  var rect = picker.getBoundingClientRect();
  var x

 if (e.touches) {
    x = e.touches[0].clientX - rect.left; // Evento táctil
  } else {
    x = e.clientX - rect.left; // Evento de clic
  } // se establecen condiciones de captura clientX para tactil y para mouse ya que se expresan diferente
  var percentage = (x / picker.offsetWidth) * 100;
  var color = 'radial-gradient(circle, rgb(255,150,100) 0%, rgb(255,100,200) 50%,' + getColorFromPercentage(percentage) +'100%, rgb(100,200,100) 35%)';
    
  handle.style.left = percentage + '%';
  handle.style.background = color;
  intro.style.background = color;
  intro.style.backgroundSize = "400% 400%";
}

function stopHandle() {
  document.removeEventListener('mousemove', moveHandle);
  document.removeEventListener('mouseup', stopHandle);
}

function getColorFromPercentage(percentage) {
  var colors = [
    [255, 0, 0],     // Red
    [255, 255, 0],   // Yellow
    [0, 255, 0],     // Green
    [0, 255, 255],   // Cyan
    [0, 0, 255],     // Blue
    [255, 0, 255],   // Magenta
    [255, 0, 0]      // Red (again to complete the loop)
  ];

  var section = Math.floor(percentage / (100 / (colors.length - 1)));
  var startColor = colors[section];
  var endColor = colors[section + 1];
  var sectionPercentage = (percentage % (100 / (colors.length - 1))) / (100 / (colors.length - 1));

  var r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * sectionPercentage);
  var g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * sectionPercentage);
  var b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * sectionPercentage);

  return 'rgb(' + r + ',' + g + ',' + b + ')';
}


const desplazmientoFiltroColor = () => {
  //CAPTURA DE CONTENEDOR Y BARRA DESPLAZAMIENTO DEL DOM
  const contenedor = document.getElementById('color-picker')
  const barraDesplazamiento = document.getElementById('color-handle')

  //DECLARACION VARIABLES
  let arrastre = false //controlador activar/desactivar acciones de arrastre
  let inicioCentro, maxIzq, maxDer;

  // POSICIONAMIENTO DE BARRA EN CENTRO DEL CONTENEDOR COLORES
  inicioCentro = (contenedor.clientWidth / 2) - (barraDesplazamiento.clientWidth / 2) // calculo centro del contenedor
  barraDesplazamiento.style.left = inicioCentro + 'px' // posicion de barra/handle en el centro del contenedor

  barraDesplazamiento.addEventListener('touchstart', (e) =>   {
      arrastre = true
      const boxPosition = contenedor.getBoundingClientRect(); // obtenenemos posicion inicial del contenedor en relacion al area visible del navegador
      maxIzq = boxPosition.left; // definicion de limite Izq. del contenedor para evitar sobrepaso
      maxDer = boxPosition.right; // definicion de limite Der. del contenedor para evitar sobrepaso
  });

  barraDesplazamiento.addEventListener('touchmove', (e) => {
    let posFinalBarra

    if(!arrastre) return; 
    const nuevaPosicionBarra = e.touches[0].clientX; // captura del posicionamiento actualizado de la barra/handle mientras se desplaza
    if(nuevaPosicionBarra < maxIzq) {
        posFinalBarra = 0 // impipde sobrepaso limite izquierdo
    }else if (nuevaPosicionBarra > maxDer) {
        posFinalBarra = contenedor.clientWidth // impide sobrepaso limite derecho
    } 
    else {posFinalBarra = nuevaPosicionBarra - maxIzq} // si el movimiento esta dentro del contenedor, define posicion actual

    barraDesplazamiento.style.left = posFinalBarra + 'px'
  });

  contenedor.addEventListener('touchend', () => {
    arrastre = false
  });
}

desplazmientoFiltroColor()


/* BOTON WAPP - HABILITA COMPARTIR POR WAPP WEB O WAPP APP MOVIL */
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const wapp = document.getElementById('wapp')
wapp.addEventListener('click', () => {
    var mensaje = encodeURIComponent(textoVersiculoLinkWapp + '\n' + versiculoLinkWapp + '\n' + window.location.href);
    var url = 'https://api.whatsapp.com/send?text=' + mensaje;
    if(isMobile)
      {window.location.href = url;
    }else {window.open(url, '_blank')
    }
});


