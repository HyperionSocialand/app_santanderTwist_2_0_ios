
	
	$(document).ready(function(){
		userdata = JSON.parse(localStorage["userdata"]);
		if (userdata.fbdata==0) {
					console.log(userdata.fbdata);
					$('#pass_new').css('display','block');
					$('#pas_conf').css('display','block');
					$('#bt_fb').html('Vincula con Facebook');
					$('#bt_fb').attr('onclick','vincular()');
				}else{
					$('#pass_new').css('display','none');
					$('#pas_conf').css('display','none');
					$('#bt_fb').html('Desvincular con Facebook');
					$('#bt_fb').attr('onclick','desvincular()');
				}
		var query = decodeURI(window.location.search.substring(1));
		console.log("URL_: " + query);
		var vars = query.split("&");

		console.log("longitud:" + vars.length);

		if (vars.length == 2) {
			var code = vars[1].split("=");
			if (code[1]==101) {
				Materialize.toast('Tu cuaenta de Facebook a sido vinculada con tu cuenta de Santandertwist', 2000);
			}
			if (code[1]==103) {
				Materialize.toast('Tu cuaenta de Facebook ya a sido vinculada con otra cuenta de Santandertwist', 2000);
			}
		}

		userdata = JSON.parse(localStorage["userdata"]);
		load_profile(userdata.buc_final);	  	
		$('#not').append(" " + userdata.username);
	});

	function load_profile(buc) {	
		$("#cargador").show();	
		$.get( "http://panel.santandertwist.com.mx/api/get_user_profile/" + buc,{
		})
		.done(function(data) {	
			$("#cargador").hide();
			if (data.code==403) {
				$('#btn_act').attr('onclick','send_form_insert()');
				$('#pass_new').css('display','none');
				$('#pas_conf').css('display','none');
				Materialize.toast(data.message, 2000);
			}
			if (data.code==200) {
			    window.localStorage.clear();
                localStorage["userdata"] = JSON.stringify(data.userdata);
                userdata = JSON.parse(localStorage["userdata"]);
                console.log(localStorage["userdata"]);
				$('#btn_act').attr('onclick','send_form_actu()');
				if (userdata.fbdata==0) {
					console.log(userdata.fbdata);
					$('#pass_new').css('display','block');
					$('#pas_conf').css('display','block');
					$('#bt_fb').html('Vincula con Facebook');
					$('#bt_fb').attr('onclick','vincular()');
				}else{
					$('#pass_new').css('display','none');
					$('#pas_conf').css('display','none');
					$('#bt_fb').html('Desvincular con Facebook');
					$('#bt_fb').attr('onclick','desvincular()');
				}
				$("#username").val(data.profile[0].usuario);
				$("#nombre").val(data.profile[0].nombre);
				$("#a_paterno").val(data.profile[0].a_paterno);
				$("#a_materno").val(data.profile[0].a_materno);
				$("#email").val(data.profile[0].email);

			}     		
		});
	}

	function send_form_insert() {
		if (validate_form())
		$.post( "http://panel.santandertwist.com.mx/api/insert_profile",{
			username:userdata.username,
			nombre:$('#nombre').val(),
			a_paterno:$('#a_paterno').val(),
			a_materno:$('#a_materno').val(),
			buc_final:userdata.buc_final,
			email:$('#email').val()
		})
		.done(function( data ) {
			Materialize.toast(data.message, 6000);
			if (data.code==200) {
				Materialize.toast(data.message, 6000);
				location.reload();
			}
		});
	}

	function send_form_actu() {
		if (validate_form())
		$("#cargador").show();	
		$.post( "http://panel.santandertwist.com.mx/api/update_profile",{
			username:userdata.username,
			nombre:$('#nombre').val(),
			a_paterno:$('#a_paterno').val(),
			a_materno:$('#a_materno').val(),
			buc_final:userdata.buc_final,
			email:$('#email').val(),
			pass:$('#pass').val(),
			pass_con:$('#pass_con').val()
		})
		.done(function( data ) {
			$("#cargador").hide();	
			Materialize.toast(data.message, 6000);
			if (data.code==200) {
				location.reload();
				Materialize.toast(data.message, 6000);
			}
			if (data.code==201) {
				window.localStorage.clear();
				window.location.href = "login.html";
			}
			
		});
	}

	function validate_form() {
		if( $("#nombre").val().length < 1){
			Materialize.toast("El campo nombre es obligatorio.", 2000);
			return false;					
		}

		if( $("#nombre").val().length < 1){
			Materialize.toast("El campo nombre es obligatorio.", 2000);
			return false;					
		}

		if( $("#a_paterno").val().length < 1){
			Materialize.toast("El campo apellido paterno es obligatorio.", 2000);
			return false;					
		}

		if( $("#a_materno").val().length < 1){
			Materialize.toast("El campo apellido materno es obligatorio.", 2000);
			return false;					
		}

		if( $("#email").val().length < 1){
			Materialize.toast("El campo email es obligatorio.", 2000);
			return false;					
		}

		if ( $("#pass").val() < 1 ) {

		} else {
			if( $("#pass").val() != $("#pass_con").val() ){
				Materialize.toast("Las contraseñas no coinciden.", 2000);
				return false;					
			}	
		}
		
		return true;
	}

	function load_active() {		
		$.get( "http://panel.santandertwist.com.mx/api/get_user_active/" + userdata.username,{
		})
		.done(function(data) {	
			console.log(data);
			if (data.code==200) {
				$('#div_no_act').css('display','none');
				var html = '';
			    $.each(data.active, function( index, value ) {
			    	html += '<div class="col s6">';
						html += '<div class="cupon" >';
					    	html += '<div class="cnt">';
								html += '<a href="#">';
									html += '<div class="imagen-over">';
										html += '<div class="priImgBg abs" style="background-image: url(https://uploads.santandertwist.com.mx' + value.small_image + ');"></div>';
									html += '</div>';
									html += '<div class="tit_over">';
										html += '<div>';
											html += '<h2>' + value.title + '</h2>';
											html += '<p>' + value.facebooktext + '</p>';
										html += '</div>';
									html += '</div>';
								html += '</a>';
								html += '<div class="starCont">';
									html += '<img src="img/ic_corazon_white.svg" class="hide responsive-img">';
									html += '<img src="img/ic_corazon_red.svg" class="responsive-img">';
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
								html += '<button class="btn btn_red_white">Ver Promoción</button>';
							html += '</div>';
						html += '</div>';
					html += '</div>';
				});
				$('#promos_activas').html(html);
			}else if (data.code==403) {

			}			
		});
	}

	function load_redimidas() {		
		$.get( "http://panel.santandertwist.com.mx/api/get_user_redimidas/" + userdata.username,{
		})
		.done(function(data) {	
			console.log(data);
			if (data.code==200) {
				$('#div_no_red').css('display','none');
				var html = '';
			    $.each(data.redimidas, function( index, value ) {
			    	html += '<div class="col s12 valign-wrapper">';
						html += '<div class="col s8 valign-wrapper">';
							html += '<img src="https://uploads.santandertwist.com.mx' + value.small_image + '"/>';
							html += '<p class="justify-align black-text">' + value.title + '</p>';
						html += '</div>';
						html += '<div class="col s4 right-align">';
							html += '<p class="precio_p">' + value.texto + '</p>';
						html += '</div>';
					html += '</div>';
				});
				$('#promos_redimidas').html(html);
			}			
		});
	}

	function load_facturacion(valor) {
		if (valor==1) {
			load_vigentes();
		}	
		if (valor==2) {
			load_pasadas();
		}
		
	}

	function load_vigentes() {
		$.get( "http://panel.santandertwist.com.mx/api/get_user_facturacion/" + userdata.username,{
		})
		.done(function(data) {	
			console.log(data);
			var html = ''	
			$.each(data.facturacion, function (index,value) {
				html += '<div class="row">';
					html += '<div class="col s12">';
						html += '<div class="col s8 valign-wrapper">';
							html += '<img src="https://uploads.santandertwist.com.mx' + value.small_image + '"/>';
							html += '<p class="justify-align black-text">' + value.title + '</p>';
						html += '</div>';
						html += '<div class="col s4 right-align">';
							html += '<p class="precio_p">$' + value.facturacion + '.00</p>';
						html += '</div>';
					html += '</div>';
				html += '</div>';
			});
			$("#cuadro_cont1").html(html);	
		});
	}	

	function load_pasadas() {
		$.get( "http://panel.santandertwist.com.mx/api/get_user_facturacion_pas/" + userdata.username,{
		})
		.done(function(data) {	
			console.log(data);
			var html = ''	
			$.each(data.facturacion, function (index,value) {
				html += '<div class="row">';
					html += '<div class="col s12">';
						html += '<div class="col s8 valign-wrapper">';
							html += '<img src="https://uploads.santandertwist.com.mx' + value.small_image + '"/>';
							html += '<p class="justify-align black-text">' + value.title + '</p>';
						html += '</div>';
						html += '<div class="col s4 right-align">';
							html += '<p class="precio_p">$' + value.facturacion + '.00</p>';
						html += '</div>';
					html += '</div>';
				html += '</div>';
			});
			$("#cuadro_cont2").html(html);		
		});
	}	

	function throw_function(valor) {
		if (valor==1) {
			load_profile(userdata.buc_final);
		}
		if (valor==2) {
			load_active();
		}
		if (valor==3) {
			load_redimidas();
		}
		if (valor==4) {
			load_vigentes();
		}
	}