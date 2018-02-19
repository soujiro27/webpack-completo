import {confirm} from 'jquery-confirm'

module.exports = class {

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
    
        success_observacion(ruta,idVolante){
            $.confirm({
                title: 'Tu Registro se ha almacenado Correctamente',
                content : '¿ Deseas agregar otro registro?',
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
            title: 'Tu Registro se ha Actualizado Correctamente',
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
                            location.href = `/SIA/juridico/${ruta}/Observaciones/${idVolante}`
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
                        text:'SI',
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
                title: 'La Cedula se Actualizado Correctamente',
                content : '',
                icon:'fa fa-check-circle',
                type:'green',
                columnClass: 'col-md-8 col-md-offset-1',
                draggable:false,
                buttons:{
                    confirm:{
                        text:'SI',
                        btnClass:'btn-primary',
                        action:function(){
                            location.href = `/SIA/juridico/${ruta}/cedula/create/${idVolante}`
                        }
                    }
                }
            })

        }

}


