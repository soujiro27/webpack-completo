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


}