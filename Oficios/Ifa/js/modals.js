import {confirm} from 'jquery-confirm'

module.exports = class {
    
        textos_promocion_cedula_ifa(html){
            
            $.confirm({
                title: 'Selecciona Texto Promocion de Acciones',
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

                            $("input:radio:checked").each(function() {
                                
                                puestos.push($(this).val())
                            });

                            $('input#idDocumentoTexto').val(puestos)

                        }
                    }
                }
            })	
        }
    
}


