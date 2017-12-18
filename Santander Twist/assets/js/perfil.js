$(document).ready(function(){
	$(".tab_p_cont ul li").click(function(){
		let li = $(this);
		let data = li.attr("data");

		$(".tab_p_cont ul li").removeClass("active");
		li.addClass("active");

		$(".cuadro_cont").hide();
		$("#cuadro_cont" + data).show();

	});

	$("#select_perfil").change(function(){

		var val = $(this).val();

		$(".section_perfil").hide();
		$("#sec_" + val).show();

	});
});