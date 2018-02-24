import {confirm} from 'jquery-confirm'


module.exports = class {


    request(html){

		let self = this

		$.confirm({
			title: 'Responder Turnado',
			content : html,
			icon:'fa fa-times-circle',
			type:'blue',
			columnClass: 'col-md-11 col-md-offset-1',
			draggable:false,
			buttons:{
				confirm:{
					text:'Aceptar',
					btnClass:'btn-primary',
					action:function(){
						
						let formData = new FormData(document.getElementById('request-form'))
						self.new_insert_with_file(formData,'Irac')

					}
				}
			}
		})	
	}

	success(ruta){
		$.confirm({
			title: 'Tu Instruccion se ha Turnado Correctamente',
			content : '',
			icon:'fa fa-check-circle',
			type:'green',
			columnClass: 'col-md-8 col-md-offset-1',
			draggable:false,
			buttons:{
				confirm:{
					text:'Aceptar',
					btnClass:'btn-primary',
					action:function(){
						location.href = `/SIA/juridico/${ruta}`
					}
				}
			}
		})
	}

	success_observacion(ruta,idVolante){
		$.confirm({
			title: 'Tu Observacion se ha almacenado Correctamente',
			content : '¿ Deseas agregar otra Observacion?',
			icon:'fa fa-check-circle',
			type:'green',
			columnClass: 'col-md-8 col-md-offset-1',
			draggable:false,
			buttons:{
				confirm:{
					text:'SI',
					btnClass:'btn-primary',
					action:function(){
						location.href = `/SIA/juridico/${ruta}/add/observaciones/${idVolante}`
					}
				},
				cancel:{
					text:'NO',
					btnClass:'btn-red',
					action:function(){
						location.href = `/SIA/juridico/${ruta}`	
					}
				}
			}
		})
	}


	success_update_observacion(ruta,idVolante){
		$.confirm({
		title: 'Tu Observacion se ha Actualizado Correctamente',
			content : '',
			icon:'fa fa-check-circle',
			type:'green',
			columnClass: 'col-md-8 col-md-offset-1',
			draggable:false,
			buttons:{
				confirm:{
					text:'Aceptar',
					btnClass:'btn-primary',
					action:function(){
						location.href = `/SIA/juridico/${ruta}/observaciones/${idVolante}`
					}
				}
			}
		})
	}

	puestos_juridico(html){
		
		$.confirm({
			title: 'Selecciona Firmas',
			content : html,
			icon:'fa fa-times-circle',
			type:'blue',
			columnClass: 'col-md-11 col-md-offset-1',
			draggable:false,
			buttons:{
				confirm:{
					text:'Aceptar',
					btnClass:'btn-primary',
					action:function(){
						
						let puestos = []

						$("input:checkbox:checked").each(function() {
							
							puestos.push($(this).val())
						});

						$('input#idPuestosJuridico').val(puestos)

					}
				}
			}
		})	
	}

	errors(html){
		$.confirm({
			title: 'Tu Registro NO pudo ser almacenado',
			content : html,
			icon:'fa fa-times-circle',
			type:'red',
			columnClass: 'col-md-5 col-md-offset-1',
			draggable:false,
			buttons:{
				confirm:{
					text:'Aceptar',
					btnClass:'btn-primary'
				}
			}
		})	
	}

	success_cedula(ruta,idVolante){

		$.confirm({
			title: 'La Cedula se ha almacenado Correctamente',
			content : '',
			icon:'fa fa-check-circle',
			type:'green',
			columnClass: 'col-md-8 col-md-offset-1',
			draggable:false,
			buttons:{
				confirm:{
					text:'Aceptar',
					btnClass:'btn-primary',
					action:function(){
						location.href = `/SIA/juridico/${ruta}`
					}
				}
			}
		})
	}



	success_update(ruta,idVolante){

		$.confirm({
			title: 'La Cedula se ha Actualizado Correctamente',
			content : '',
			icon:'fa fa-check-circle',
			type:'green',
			columnClass: 'col-md-8 col-md-offset-1',
			draggable:false,
			buttons:{
				confirm:{
					text:'Aceptar',
					btnClass:'btn-primary',
					action:function(){
						location.href = `/SIA/juridico/${ruta}/cedula/create/${idVolante}`
					}
				}
			}
		})
	}

}