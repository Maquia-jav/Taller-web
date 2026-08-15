window.onload = function() {
  var fichas = document.querySelectorAll(".ficha");
  var boton = document.createElement("button");
  boton.textContent = "Mostrar solo heroes";
  document.body.appendChild(boton);

  for (var ficha of fichas) {
    ficha.addEventListener("mouseover", function() {
      this.style.backgroundColor = "#410a03";
    });

    ficha.addEventListener("mouseout", function() {
      this.style.backgroundColor = "";
    });
  }

  boton.addEventListener("click", function() {
    for (var ficha of fichas) {
      var tipo = ficha.getAttribute("data-tipo");
      if (tipo == "villano") {
        ficha.style.display = "none";
      } else {
        ficha.classList.add("resaltado");
      }
    }
  });

  var imagenes = document.querySelectorAll(".ficha img");
  for (var imagen of imagenes) {
    imagen.classList.add("borde-redondeado");
  }
};

function cargarFraseDelDia(callback){
  fetch("https://catfact.ninja/fact")
  .then(function(respuesta) { return respuesta.json(); })
  .then(function(datos) { callback(datos.fact); })
  .catch(function(error) { console.log("No se pudo cargar la frase:", error); });
}
var botonFrase = document.createElement("button");
botonFrase.textContent = "frase del dia";
document.body.appendChild(botonFrase);
botonFrase.addEventListener("click", function() {
cargarFraseDelDia(function(frase) {
var p = document.createElement("p");
p.textContent = frase;
document.body.appendChild(p);
});
});

function GuardarFavorito(nombre){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      if (nombre) {
resolve(nombre + " guardado como favorito");
} else {
reject("No se pudo guardar: falta el nombre");
}
}, 1000);
});
}
for (var ficha of document.querySelectorAll(".ficha")) {
var botonFav = document.createElement("button");
botonFav.textContent = " Favorito ⭐";
ficha.appendChild(botonFav);
botonFav.addEventListener("click", function() {
var nombreEl = this.parentElement.querySelector(".nombre");
GuardarFavorito(nombreEl.textContent)
.then(function(mensaje) { console.log(mensaje); })
.catch(function(error) { console.log(error); });
});
}