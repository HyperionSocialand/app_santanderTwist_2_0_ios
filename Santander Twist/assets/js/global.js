var form2;
 var icon2;
 var myVar;

$(document).ready(function(){

	$('select').material_select();

	icon2 = $('#search-iconm');
    form2 = $('.formsearch_hm');

  	icon2.click(function(){
      	form2.toggleClass('open');
      
        if (form2.hasClass('open')) {
            form2.children('#search_hm').focus();
            $("#search_header").show();
            $("#header_nav").hide();
            $("#search_header input").focus();
        }else{

            form2.children('input#search_hm').blur();
            $("#filtros,#fondo_buscar").hide();
            myVar = setInterval(function(){ myTimer2() }, 500);

        }
    });

    $(".listado_categorias li").click(function(){
      $(".listado_categorias li").removeClass("activo");
      $(this).addClass("activo");
    });

    $("#categorias li").click(function(){
      let li = $(this);

      $("#categorias li").removeClass("activo");
      li.addClass("activo");
    });

    $("#filtros ul li").click(function(){

      $(".list_ul_cat").hide();
      $("#filtros ul li img").hide();
      $(this).find("img").show();
      $(this).find("ul").show();
    });

  	$(".search_ico").click(function(){
      	openBuscadorMobile();
    })
});
function openMenu() {
    $("#menuNew").toggle();
}
function closeBuscador(){
  $("#search_header").hide();
  $("#header_nav").show();
  $("#search_header input").blur();
  $("#close_mobile").attr("src","img/header/ico_search.png");
  $("#filtros,#fondo_buscar").hide();
}
function openBuscadorMobile(){
  form2.addClass('open');
  $("#search_header").show();
  $("#header_nav").hide();
  $("#search_header input").focus();
  $("#close_mobile").attr("src","img/header/cerrar.png");
  $("#filtros,#fondo_buscar").show();
}
function myTimer2(){
    $("#search_header").hide();
    $("#header_nav").show();
    $("#search_header input").blur();
    

  clearInterval(myVar);
}
function mainMov(e) {
	$(e).find('h6').toggleClass('menu-responsive-height');
	$(e).find('ul').toggleClass('menu-responsive-padding');
	$(e).find('ul li').toggleClass('menu-responsive');
}
function doLogin(){
  if($("#username").val().length < 1 || $("#password").val().length < 1){
    return false;
  } else {
    $("#login").submit();
  }
}
function doRegister(){
  if ( !$('#termReg').is(':checked') ){
    $("#aceptar").fadeIn();
    return false;
  }

  if($("#tipoClienteP").val().length < 1 || $("#r_password").val().length < 1 || $("#r_nombre").val().length < 1 || $("#r_usuario").val().length < 1 || $("#r_email").val().length < 1){
    return false;
  } else {
    $("#submitReg").fadeOut("fast");
    $("#im").fadeIn();
    $("#f_registro").submit();
  }
}
var cerrarNoti = false;
$(document).mouseup(function(e) 
{
  var container = $(".Container_santander");
  
  // if the target of the click isn't the container nor a descendant of the container
  if (!container.is(e.target) && container.has(e.target).length === 0) 
  { 
    $("#fondo_padre").removeClass("activo");
    $("#notificaciones2").removeClass("ContenedorOculto");
    container.removeClass("ContenedorOculto");
    $("body").removeClass("scroll");  
  }
});

function openMenu() {
    $("#menuNew").toggle();
}
function activar(id)  {
    $("#menuNew").hide();
    $("#notificaciones2").removeClass("ContenedorOculto");
     var container = $(".Container_santander");
     $("#fondo_padre").toggleClass("activo"); 
     $("body").toggleClass("scroll");    
     container.removeClass("ContenedorOculto");     
   $("#"+id).toggleClass("ContenedorOculto");
}
var noti = false;
function abrirNotificaciones(){
  // $("#microSite").removeClass("ContenedorOculto");
   //console.log("notificaciones");
    $("#notificaciones2").hide();
    
  $("#notificaciones2").toggleClass("ContenedorOculto");
  if(noti){
    $("#notificaciones2").removeClass("ContenedorOculto");
    noti = false;
  }
  else{
    $("#notificaciones2").addClass("ContenedorOculto");
    noti = true;
  }
}
function microSiteToggle() {
  $("#notificaciones2").removeClass("ContenedorOculto");
  $("#microSite").toggleClass('ContenedorOculto');
}

function cerrarLogin() {
    var container = $(".Container_santander");       
    container.removeClass("ContenedorOculto");
    $("#fondo_padre").removeClass("activo");
    $("body").removeClass("scroll");
   // console.log("entro");
}
function cerrarRegistro() {
    var container = $(".Container_santander");       
    container.removeClass("ContenedorOculto");
    $("#fondo_padre").removeClass("activo");
    $("body").removeClass("scroll");
   // console.log("entro");
}

function cerrarMicro() {
    var container = $(".Container_santander");       
    container.removeClass("ContenedorOculto");
}
function share(destino, url, txt){ 
    if(destino=="fb"){
        window.open("https://www.facebook.com/sharer/sharer.php?u=" + url,"_blank");
    }
    else if(destino=="tw"){
        window.open("https://twitter.com/intent/tweet?text=" + txt + "&url=" + url);
    }
}


function popUpGeranal(titulo,contenido,url) {
   $("#popUpGeneral").show();   
   $("#tituloGeneral").text(titulo);
   $("#contenidoGeneral").text(contenido);
}


function apagaPopGeneral() {
   $("#popUpGeneral").hide();
   //window.location.reload();
}

function apagaPopGeneral_alert() {
   $("#popUpGeneral").hide();   
}