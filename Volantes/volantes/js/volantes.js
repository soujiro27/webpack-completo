import {validate} from 'jquery-validation'
const modals = require('./modals')
const  base = require('./../../../base/index')

const m = new modals()
const b = new base()

module.exports = class {
    

    load_update_form(){
        $('table#main-table-volantes tbody tr').click(function(){
            let id = $(this).children().first().text()
            let ruta = $(this).data('ruta')
            location.href = `/SIA/juridico/${ruta}/${id}`
        })	
    }

    modal_subDocumento(){
		
		$('select#subDocumento').change(function(){

			let subDocumento = $('select#subDocumento :selected').text()
			let documento = $('select#documento :selected').val()

			if(documento === 'OFICIO' && subDocumento === 'CONFRONTA' ){
				
				m.nota_informativa()
			
			} else if (documento === 'OFICIO' && subDocumento === 'DICTAMEN' ) {
			
				m.dictamen()

			} else {

				$('input#notaConfronta').val('NO')
				let cuentaActual = $('input#cta-publica').data('cuenta')
				$('input#cta-publica').val(cuentaActual)
			}
		})
	}

	modal_auditoria(){
		
		$('button#modalAuditoria').click(function(event){
			event.preventDefault()
			m.load_select_auditoria()
		})
	}

	form_submit(){
		$('form#insert-volantes').validate({
			rules:{
				documento:{required:true},
				subDocumento:{required: true},
				promocion:{required:true},
				extemporaneo:{required :true},
				hRecepcion:{required :true},
				idCaracter:{required:true},
				idTurnado:{required:true},
				idAccion:{required:true},
				idRemitente:{required:true},
				folio:{
					required:true,
					number:true,
					min:1
				},
				subFolio:{
					required:true,
					number:true,
					min:0
				},
				numDocumento:{
					required:true,
					maxlength:20
				},
				anexos:{
					required:true,
					number:true,
					min:0
				},
				fDocumento:{
					required:true,
					date:true
				},
				fRecepcion:{
					required:true,
					date:true
				},
				
			},
			messages:{
				documento:'Obligatorio',
				subDocumento:'Obligatorio',
				promocion:'Obligatorio',
				extemporaneo:'Obligatorio',
				hRecepcion:'Obligatorio',
				idTurnado:'Obligatorio',
				idAccion:'Obligatorio',
				idCaracter:'Obligatorio',
				folio: {
					required: 'Obligatorio',
					number:'Solo acepta numeros',
					min: 'Valor No valido'
				},
				subFolio:{
					required: 'Obligatorio',
					number:'Solo acepta numeros',
					min: 'Valor No valido'	
				},
				numDocumento:{
					required:'Obligatorio',
					maxlength:'Maximo 20 Caracteres',
				},anexos:{
					required: 'Obligatorio',
					number:'Solo acepta numeros',
					min: 'Valor No valido'
				},
				fDocumento:{
					required:'Obligatorio',
					date:'Formato Incorrecto'
				},
				fRecepcion:{
					required:'Obligatorio',
					date:'Fomrato Incorrecto'
				},
				idRemitente:{
					required:'Seleccione una Auditoria'
				}

			},
			submitHandler:function(form){

				let formData = new FormData(document.getElementById('insert-volantes'))
				b.new_insert_with_file(formData,'Volantes')

			},
			errorClass: "is-invalid"
		})
	}

	form_update(){
		$('form#Volantes-update').validate({
			rules:{
				hRecepcion:{required :true},
				idCaracter:{required:true},
				idTurnado:{required:true},
				idAccion:{required:true},
				numDocumento:{
					required:true,
					maxlength:20
				},
				anexos:{
					required:true,
					number:true,
					min:0
				},
				fDocumento:{
					required:true,
					date:true
				},
				fRecepcion:{
					required:true,
					date:true
				},
				
			},
			messages:{
				hRecepcion:'Obligatorio',
				idTurnado:'Obligatorio',
				idAccion:'Obligatorio',
				idCaracter:'Obligatorio',
				numDocumento:{
					required:'Obligatorio',
					maxlength:'Maximo 20 Caracteres',
				},anexos:{
					required: 'Obligatorio',
					number:'Solo acepta numeros',
					min: 'Valor No valido'
				},
				fDocumento:{
					required:'Obligatorio',
					date:'Formato Incorrecto'
				},
				fRecepcion:{
					required:'Obligatorio',
					date:'Fomrato Incorrecto'
				}

			},
			submitHandler:function(form){

				let formData = $('form#Volantes-update').serializeArray()
				b.new_update(formData,'Volantes')

			},
			errorClass: "is-invalid"	
		})
	}

}