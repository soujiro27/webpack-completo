import {confirm} from 'jquery-confirm'

module.exports = class {
    
    remitentes(tipoRemintente,idInput){
		let html = require('./../../../templates/remitentes.html')
		let self = this
		$.confirm({
			title: 'Seleccione Remitente',
			content : html,
			icon:'fa fa-envelope-open-o',
			type:'blue',
			columnClass: 'col-md-11 col-md-offset-1',
			draggable:false,
			buttons:{
				confirm:{
					text:'Aceptar',
					btnClass:'btn-primary',
					action:function(){
                    
                        let areas = []
						let input = $('input:checkbox[name=remitente]:checked').each(function() {
                            areas.push($(this).val())
                        });
                        
						$('input#'+idInput).val(areas)
					}
				}
			},
			onOpenBefore:function(){
                
                $('div.input').remove()
                self.construct_tabla_remitentes(tipoRemintente,'')
                $('div.table-remitentes').addClass('vh-remitentes')
				
			}
		})	
	}


	async construct_tabla_remitentes(tipo,siglas){

		let datos = await this.remitentes_volantes(tipo,siglas)
		let table = this.table_remitentes(datos)
		$('tbody#body-remitentes').html(table)
	}


	table_remitentes(data){
		let table = ''
    	$.each(data,function(index,el){
    		table += `<tr><td><input type="checkbox" name="remitente" value="${el.idRemitenteJuridico}" data-siglas="${el.siglasArea}"></td>
						<td>${el.saludo} ${el.nombre} </td>
						<td>${el.puesto}</td>
					</tr>`	
    	})
    	
    	return table
	}


	remitentes_volantes(dato,sigla) {
		let datos = new Promise(resolve =>{
			$.get({
				url:'/SIA/juridico/api/remitentes',
				data:{
					tipo:dato,
					siglas:sigla
				},
				success:function(json){
					resolve(JSON.parse(json))
				}
			})
		})
		return datos
	}
    
}


