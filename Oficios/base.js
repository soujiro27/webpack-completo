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
            $('div.menu-oficios').toggle('fast')
        })
	}
	
	construct_table_errors(datos) {
        //construye la lista de errores
            let ul = ''
    
            $.each(datos, function(index, val) {
                 ul += `<ul>
                         <li><strong>Campo:</strong> ${datos[index].campo}</li>
                         <li><strong>Error:</strong> ${datos[index].message}</li>
                         </ul>`
            })	
            
            return ul
        }

/*--------------- Turnados y Documentos -----------------*/
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

		let box_html = require('./../templates/respuestas-table.html')
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
				icon = '<img src="/SIA/hibrido/public/img/002-email.png" />'
			} else {

				icon = '<img src="/SIA/hibrido/public/img/001-email-1.png" />'
			}

			if(datos[x].archivoFinal == null){

				file = `Sin Archivo`

			} else {

                let archivo = datos[x].archivoFinal
                let extension = archivo.split('.')
                let file_icon
                if(extension[1] == 'xlsx'  || extension[1] == 'xls' ){

                    file_icon = '005-excel.png'

                } else if (extension[1] == 'docx'  || extension[1] == 'doc'  ){

                    file_icon = '004-word.png'

                } else if( extension[1] == 'pdf' ){

                    file_icon = '003-pdf.png'

                } else if( extension[1] == 'jpg'  ){

                    file_icon = '001-jpg.png'
                }



				file = `<a  target="_blank" href="/SIA/hibrido/files/${datos[x].idVolante}/Internos/${datos[x].archivoFinal}">
						<img src="/SIA/hibrido/public/img/${file_icon}">
						</a>`
            }
            
            
            

            html += `<tr>
                        <td>${icon}</td>
                        <td>${nombre}</td>
                        <td>${fecha}</td>
                        <td>${hora}</td>
                        <td>${comentario.toUpperCase()}</td>
                        <td>${file}</td>
                    </tr>`
		}

        let tabla = box_html.replace(':tbody:',html)

		return tabla

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
		
	/*---------------------------Obervaciones IRAC e IFA ----------------*/

	validate_insert_observaciones(){
        
        let self = this

        $('form#Observaciones-insert').validate({
            rules:{
                idVolante:{
                    required:true,
                    digits:true
                },
                pagina:{
                    required:true,
                    maxlength:50
                },
                parrafo:{
                    required:true,
                    maxlength:50
                },
                observacion:{
                    required:true,
                    maxlength:350
                }
            },
            messages:{
                pagina:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 caracteres'
                },
                parrafo:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 caracteres'
                },
                observacion:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 caracteres'
                }
            },
            submitHandler:function(form){

				let texto = CKEDITOR.instances['ckeditor'].getData()
				let formulario = $('form#Observaciones-insert')
				let formData = formulario.serializeArray()
				let ruta = formulario.data('ruta')
                formData[3].value=texto
                self.new_insert_observacion(formData,ruta,formData[0].value)
            },
            errorClass:'is-invalid'
        })
    }

    async new_insert_observacion(datos,ruta,idVolante){
        
        let res = await this.send_data_insert_observaciones(datos,ruta)
        if(res[0].campo != 'success'){
            let table = this.construct_table_errors(res)
            this.errors(table)
        } else {
            this.success_observacion(ruta,idVolante)
        }
    }

    send_data_insert_observaciones(datos,ruta) {
        let prom = new Promise(resolve =>{
            $.post({
                url:`/SIA/juridico/${ruta}/observaciones/create`,
                data:datos,
                success:function(res) {
                    resolve(JSON.parse(res))
                }
            })
        })

        return prom
	}
	
    validate_update_observaciones(){
        
        let self = this

        $('form#Observaciones-update').validate({
            rules:{
                idObservacionDoctoJuridico:{
                    required:true,
                    digits:true
                },
                pagina:{
                    required:true,
                    maxlength:50
                },
                parrafo:{
                    required:true,
                    maxlength:50
                },
                observacion:{
                    required:true,
                    maxlength:350
                }
            },
            messages:{
                pagina:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 caracteres'
                },
                parrafo:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 caracteres'
                },
                observacion:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 caracteres'
                }
            },
            submitHandler:function(form){

				let texto = CKEDITOR.instances['ckeditor'].getData()
				let formulario = $('form#Observaciones-update')
				let formData = formulario.serializeArray()
				let ruta = formulario.data('ruta')
                formData[4].value=texto
                let idVolante = $('a#add-btn-observaciones').data('volante')
                self.new_update_observacion(formData,ruta,idVolante)
            },
            errorClass:'is-invalid'
        })
    }

    async new_update_observacion(datos,ruta,idVolante){
        let res = await this.update_observaciones(datos,ruta)
        if(res[0].campo != 'success'){
            let table = this.construct_table_errors(res)
            this.errors(table)
        } else {
            this.success_update_observacion(ruta,idVolante)
        }	
    }


    update_observaciones(datos,ruta){
        let promesa = new Promise(resolve =>{
            $.post({
                url:`/SIA/juridico/${ruta}/observaciones/update`,
                data:datos,
                success:function(res){
                    resolve(JSON.parse(res))
                }
            })
        })
        return promesa
    }


	/*----------------- Carga modal de boton de firmas en cedulas----------*/

	load_puestos_cedula(){

        let self = this
        
        $('button#modalFirmas').click(function(e){
            e.preventDefault()
            self.modal_puestos_juridico()
        })

    }

    async modal_puestos_juridico() {
        
        let datos = await this.load_puestos_juridico()
        let table = this.construct_table_puestos_juridico(datos)
        this.puestos_juridico(table)
        


    }

    load_puestos_juridico(){

        let promesa = new Promise(resolve =>{
            $.get({
                url:`/SIA/juridico/api/puestosJuridico`,
                success:function(res){
                    resolve(JSON.parse(res))
                }
            })
        })
        return promesa
    }

    construct_table_puestos_juridico(datos){

        let html = require('./../templates/puestos_juridico.html')
        let tr = ''

        for(let x in datos){
            tr += `<tr>
                    <td><input type="checkbox" name="puestos" value="${datos[x].idPuestoJuridico}"></td>
                    <td>${datos[x].saludo} ${datos[x].nombre} ${datos[x].paterno} ${datos[x].materno} </td>
                    <td>${datos[x].puesto}</td>
                </tr>`
        }

        let table = html.replace(':body:',tr)

        return table

    }


    async new_insert_cedula(datos,ruta,idVolante){
        
        let res = await this.send_data_insert_cedula(datos,ruta)
        if(res[0].campo != 'success'){
            let table = this.construct_table_errors(res)
            this.errors(table)
        } else {
            this.success_cedula(ruta,idVolante)
        }
    }


    send_data_insert_cedula(datos,ruta) {
        let prom = new Promise(resolve =>{
            $.post({
                url:`/SIA/juridico/${ruta}/cedula/create`,
                data:datos,
                success:function(res) {
                    resolve(JSON.parse(res))
                }
            })
        })

        return prom
    }


    async new_update_cedula(datos,ruta,idVolante){
        let res = await this.update_data_cedula(datos,ruta)
        if(res[0].campo != 'success'){
            let table = this.construct_table_errors(res)
            this.errors(table)
        } else {
            this.success_update(ruta,idVolante)
        }	
    }


    update_data_cedula(datos,ruta){
        let promesa = new Promise(resolve =>{
            $.post({
                url:`/SIA/juridico/${ruta}/cedula/update`,
                data:datos,
                success:function(res){
                    resolve(JSON.parse(res))
                }
            })
        })
        return promesa
    }
}