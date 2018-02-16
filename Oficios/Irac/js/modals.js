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
    
        success(ruta,idVolante){
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
                            location.href = `/SIA/juridico/Irac/add/observaciones/${idVolante}`
                        }
                    },
                    cancel:{
                        text:'NO',
                        btnClass:'btn-red',
                        action:function(){
                            location.href = `/SIA/juridico/Irac`	
                        }
                    }
                }
            })
        }
    
    
        success_update(ruta,idVolante){
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
                            location.href = `/SIA/juridico/Irac/Observaciones/${idVolante}`
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
                        btnClass:'btn-primary'
                    }
                }
            })	
        }
    

}