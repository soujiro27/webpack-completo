import {validate} from 'jquery-validation'

const modals = require('./modals')

module.exports = class Asignacion extends modals{

    load_oficio(){
        $('table#main-table-oficios tbody tr').click(function(){
            let id = $(this).children().first().text()
            let ruta = $(this).data('ruta')
            location.href = `/SIA/juridico/${ruta}/${id}`
        })
    }
    
    menu_oficios(){
        
        $('button#menu-oficios').click(()=>{
            $('div.menu-oficios').toggle('slow')
        })
    }


    form_submit(){
		let self = this
		let ruta = $('form#asignacion').data('ruta')

		$('form#asignacion').validate({
			rules:{
				idUsrReceptor:{required:true},
				idTipoPrioridad:{required: true},
				comentario:{required :true},
				idVolante:{required :true}
			},
			messages:{
				idUsrReceptor:'Obligatorio',
				idTipoPrioridad:'Obligatorio',
				comentario:'Obligatorio',
				idVolante:'Obligatorio',

			},
			submitHandler:function(form){
				let formData = new FormData(document.getElementById('asignacion'))
				self.new_insert_with_file(formData,ruta)

			},
			errorClass: "is-invalid"
		})

    }
    
    carga_datos_turnado(){
		let self = this
		$('select#personal-turnado').change(function(){
			let idPuestoJuridico = $(this).val()
			let idVolante = $(this).data('id')

			self.construc_table_turnado(idVolante,idPuestoJuridico)

			$('button#request-turno').attr('data-puesto',idPuestoJuridico)

		})
	}

	async construc_table_turnado(idVolante,idPuestoJuridico){
		let datos = await this.load_documentos_turnados(idVolante,idPuestoJuridico)
		let table = this.construct_tables_documentos(datos)
		$('div#datos-turnado').html(table)
		//console.log(datos)
	}


	load_documentos_turnados(idVolante,idPuesto){
		let datos = new Promise(resolve=>{
			$.get({
				url:'/SIA/juridico/api/documentosTurnados',
				data:{
					idVolante:idVolante,
					idPuesto:idPuesto
				},
				success:function(json){
					resolve(JSON.parse(json))
				}
			})
		})

		return datos
	}

	
	load_modal_request(){
		
		let self = this
		
		$('button#request-turno').click(function(){

			let idVolante = $(this).data('id')
			let idPuesto = $(this).data('puesto')

			let tabla = require('./../templates/respuesta.html')
			let html = tabla.replace(':idVolante:',idVolante).replace(':usuario:',idPuesto)

			self.request(html)

		})
	}


	construct_tables_documentos(datos) {

		let box_html = require('./../templates/respuestas-box.html')
		let html = ''
		let idUsuario = $('div#datos-turnado').data('idusuario')

		for(let x in datos){

			let nombre = `${datos[x].saludo} ${datos[x].nombre} ${datos[x].paterno} ${datos[x].materno}`
			let fAlta = datos[x].fAlta
			let fecha = fAlta.substring(0,10)
			let hora = fAlta.substring(10,16)
			let comentario = datos[x].comentario
			let icon
			let file

			if(idUsuario == datos[x].usrAlta){
				icon = 'fa fa-arrow-circle-down blue'
			} else {

				icon = 'fa fa-arrow-circle-up red'
			}

			if(datos[x].archivoFinal == null){

				file = `<i class="fa fa-times-circle"></i>`

			} else {

				file = `<a  target="_blank" href="/SIA/hibrido/files/${datos[x].idVolante}/Internos/${datos[x].archivoFinal}">
						<i class="fa fa-file"></i>
						</a>`
			}

			

			html += box_html
			.replace(':icon:',icon)
			.replace(':prioridad:',datos[x].idTipoPrioridad)
			.replace(':nombre:',nombre)
			.replace(':fecha:',fecha)
			.replace(':hora:',hora)
			.replace(':comentario:',comentario.toUpperCase())
			.replace(':archivo:',file) 
				
		}

		return html

	}

	async new_insert_with_file(datos,ruta){
		let res = await this.send_data_insert_with_file(datos,ruta)
		if(res[0].campo != 'success'){
			let table = this.construct_table_errors(res)
			this.errors(table)
		} else {
			this.success(ruta)
		}
	}

	send_data_insert_with_file(datos,ruta) {
		let prom = new Promise(resolve =>{
			$.post({
				url:`/SIA/juridico/${ruta}/create`,
				data:datos,
				success:function(res) {
					resolve(JSON.parse(res))
				},
				cache: false,
				contentType: false,
				processData: false,
				dataType: "html",
			})
		})

		return prom
	}
		

}