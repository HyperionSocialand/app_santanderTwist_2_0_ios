

$(document).ready(function () {
                  load_notificaciones();
                  });


userdata = JSON.parse(localStorage["userdata"]);

function load_estados() {
    $.get( "http://panel.santandertwist.com.mx/api/get_states",{
          
          })
    .done(function( data ) {
          html = '';
          html += '<option value="0">Todo México</option>';
          $.each(data.states, function (index, value) {
                 html += '<option value="' + value.code + '">' + value.state_name + '</option>';
                 })
          $("#minimal").html(html);
          });
}

function load_notificaciones(argument) {
    $.get( "http://panel.santandertwist.com.mx/api/get_notificaciones",{
          username: userdata = userdata.username
          })
    .done(function( data ) {
          console.log(data);
          html = '' ;
          $.each(data.promo, function (index, value) {
                 console.log(value.slug);
                 html += '<li onclick="promo_interior(\''+value.slug+'\')" >';
                 html += '<h5>' + value.title + ' <span></span></h5>';
                 html += '<p>' + value.detail + '</p>';
                 html += '</li>';
                 });
          $("#ul_noti").html(html);
          
          if (data.total > 5) {
          data.total = '5+';
          }
          $("#circulo_noti").html(data.total);
          });
}

function promo_interior(slug) {
    localStorage.setItem("promo_interior", slug);
    window.location = "promo.html";
}

function reactivar_todas() {
    $(".sec_todas").addClass("box_inactive").removeClass("box_active");
    $(".sec_bienestar").addClass("box_inactive").removeClass("box_active");
    $(".sec_compras").addClass("box_inactive").removeClass("box_active");
    $(".sec_entretenimiento").addClass("box_inactive").removeClass("box_active");
    $(".sec_restaurantes").addClass("box_inactive").removeClass("box_active");
    $(".sec_viajes").addClass("box_inactive").removeClass("box_active");
    
    
    $("#img_todas").attr("src","img/ic_todas_red.svg");
    $("#img_bienestar").attr("src","img/ic_bienestar_red.svg");
    $("#img_compras").attr("src","img/ic_compras_red.svg");
    $("#img_entretenimiento").attr("src","img/ic_entretenimiento_red.svg");
    $("#img_restaurantes").attr("src","img/ic_restaurantes_red.svg");
    $("#img_viajes").attr("src","img/ic_viajes_red.svg");
    
    $(".sec_todas").addClass("box_active").removeClass("box_inactive");
    $("#img_todas").attr("src","img/ic_todas_white.svg");
}

function get_cerca_de_mi_header(buscar) {
    reactivar_todas();
    $("#cargador").show();
    $.get( "http://panel.santandertwist.com.mx/api/get_cerca_de_mi_header?lat=" + localStorage.getItem('lat') + "&long=" + localStorage.getItem('long'),{
          buscar : buscar
          })
    .done(function( data ) {
          console.log(data);
          var html = '';
          $.each(data, function( index, value ) {
                 html += '<div class="col s6">';
                 html += '<div class="cupon">';
                 html += '<div class="cnt">';
                 html += '<a onclick="promo_interior(\''+value.slug+'\')">';
                 html += '<div class="imagen-over">';
                 html += '<div class="priImgBg abs" style="background-image: url(https://uploads.santandertwist.com.mx' + value.small_image + ');"></div>';
                 html += '</div>';
                 html += '</a>';
                 html += '<div class="starCont">';
                 html += '<img src="img/ic_corazon_white.svg" class="responsive-img">';
                 html += '<img src="img/ic_corazon_red.svg" class="hide responsive-img">';
                 html += '</div>';
                 html += '</div>';
                 html += '<div class="action cntR">';
                 html += '<div class="ssrr">';
                 html += '<i class="fa fa-facebook-square fa-2x icono pointer"></i>';
                 html += '<i class="fa fa-twitter-square fa-2x icono pointer"></i>';
                 html += '<a href="">';
                 html += '<img src="img/whatsapp_gris.svg" width="27px">';
                 html += '</a>';
                 html += '</div>';
                 html += '<button class="btn btn_red_white" onclick="promo_interior(\''+value.slug+'\')">Ver Promoción</button>';
                 html += '</div>';
                 html += '</div>';
                 html += '</div>';
                 //alert( index + ": " + value.promo_id );
                 });
          $('#promos_').html(html);
          $("#cargador").hide();
          });
    
}

function get_orden_alfa(buscar) {
    reactivar_todas();
    $("#cargador").show();
    $.get( "http://panel.santandertwist.com.mx/api/get_orden_alfa",{
          buscar : buscar
          })
    .done(function( data ) {
          
          var html = '';
          $.each(data.promos, function( index, value ) {
                 console.log(value.small_image);
                 html += '<div class="col s6">';
                 html += '<div class="cupon">';
                 html += '<div class="cnt">';
                 html += '<a onclick="promo_interior(\''+value.slug+'\')">';
                 html += '<div class="imagen-over">';
                 html += '<div class="priImgBg abs" style="background-image: url(https://uploads.santandertwist.com.mx' + value.small_image + ');"></div>';
                 html += '</div>';
                 html += '</a>';
                 html += '<div class="starCont">';
                 html += '<img src="img/ic_corazon_white.svg" class="responsive-img">';
                 html += '<img src="img/ic_corazon_red.svg" class="hide responsive-img">';
                 html += '</div>';
                 html += '</div>';
                 html += '<div class="action cntR">';
                 html += '<div class="ssrr">';
                 html += '<i class="fa fa-facebook-square fa-2x icono pointer"></i>';
                 html += '<i class="fa fa-twitter-square fa-2x icono pointer"></i>';
                 html += '<a href="">';
                 html += '<img src="img/whatsapp_gris.svg" width="27px">';
                 html += '</a>';
                 html += '</div>';
                 html += '<button class="btn btn_red_white" onclick="promo_interior(\''+value.slug+'\')">Ver Promoción</button>';
                 html += '</div>';
                 html += '</div>';
                 html += '</div>';
                 //alert( index + ": " + value.promo_id );
                 });
          $('#promos_').html(html);
          $("#cargador").hide();
          });
    
}

function get_categoria(buscar) {
    $("#cargador").show();
    $.get( "http://panel.santandertwist.com.mx/api/get_orden_alfa",{
          buscar : buscar,
          categoria : localStorage.getItem('categoria')
          })
    .done(function( data ) {
          console.log(data);
          var html = '';
          $.each(data.promos, function( index, value ) {
                 html += '<div class="col s6">';
                 html += '<div class="cupon">';
                 html += '<div class="cnt">';
                 html += '<a onclick="promo_interior(\''+value.slug+'\')">';
                 html += '<div class="imagen-over">';
                 html += '<div class="priImgBg abs" style="background-image: url(https://uploads.santandertwist.com.mx' + value.small_image + ');"></div>';
                 html += '</div>';
                 html += '</a>';
                 html += '<div class="starCont">';
                 html += '<img src="img/ic_corazon_white.svg" class="responsive-img">';
                 html += '<img src="img/ic_corazon_red.svg" class="hide responsive-img">';
                 html += '</div>';
                 html += '</div>';
                 html += '<div class="action cntR">';
                 html += '<div class="ssrr">';
                 html += '<i class="fa fa-facebook-square fa-2x icono pointer"></i>';
                 html += '<i class="fa fa-twitter-square fa-2x icono pointer"></i>';
                 html += '<a href="">';
                 html += '<img src="img/whatsapp_gris.svg" width="27px">';
                 html += '</a>';
                 html += '</div>';
                 html += '<button class="btn btn_red_white" onclick="promo_interior(\''+value.slug+'\')">Ver Promoción</button>';
                 html += '</div>';
                 html += '</div>';
                 html += '</div>';
                 //alert( index + ": " + value.promo_id );
                 });
          $('#promos_').html(html);
          $("#cargador").hide();
          });
    
}

function select_filtro(filtro) {
    localStorage.setItem('filtro',filtro);
}

function select_categoria(catego) {
    localStorage.setItem('categoria',catego);
    console.log(localStorage.getItem('categoria'));
}

function busqueda(buscar) {
    //var filtro = localStorage.getItem('filtro');
    localStorage.setItem('buscar',buscar);
    location.href ="index.html?slug=buscar";
    
}

function logout() {
    window.localStorage.clear();
    window.location.href = "login.html";
    //cacheClean();
    //console.log('Login');
    /*$("#cargador").show();
     $.get( "http://panel.santandertwist.com.mx/user/logout",{
     })
     .done(function( data ) {
     if (data.code==200) {
     $("#cargador").hide();
     Materialize.toast(data.message, 2000, '',function () {
     window.location="login.html";
     });
     }
     });*/
}


