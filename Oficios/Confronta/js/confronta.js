import {validate} from 'jquery-validation'
const base = require('./../../base')
const b= new base()

module.exports = class {

    validate_form_insert(){
        $('form#confrontasJuridico').validate({
            rules:{
                nombreResponsable:{
                    required:true,
                    maxlength:50
                },
                cargoResponsable:{
                    required:true,
                    maxlength:50
                },
                fConfronta:{
                    required:true,
                    maxlength:10
                },
                hConfronta:{
                    required:true
                },
                fOficio:{
                    required:true,
                    maxlength:10
                },
                siglas:{
                    required:true,
                    maxlength:20
                },
                numFolio:{
                    required:true,
                    maxlength:20
                }
            },
            messages:{
                nombreResponsable:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 Caracteres'
                },
                cargoResponsable:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 Caracteres'
                },
                fConfronta:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Formato Incorrecto'
                },
                hConfronta:{
                    required:'El Campo es Obligatorio'
                },
                fOficio:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Formato Incorrecto'
                },
                siglas:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 20 Caracteres'
                },
                numFolio:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 20 Caracteres'
                }
            },
            submitHandler:function(form){

                let formulario = $('form#confrontasJuridico')
                let datos = formulario.serializeArray()
                let ruta = formulario.data('ruta')
                let idVolante = datos[0].value
                b.new_insert_cedula(datos,ruta,idVolante)
                
            },
            errorClass:'is-invalid'
        })
    }

    validate_form_update_cedula(){

        $('form#confrontasJuridico-update').validate({
            rules:{
                nombreResponsable:{
                    required:true,
                    maxlength:50
                },
                cargoResponsable:{
                    required:true,
                    maxlength:50
                },
                fConfronta:{
                    required:true,
                    maxlength:10
                },
                hConfronta:{
                    required:true
                },
                fOficio:{
                    required:true,
                    maxlength:10
                },
                siglas:{
                    required:true,
                    maxlength:20
                },
                numFolio:{
                    required:true,
                    maxlength:20
                }
            },
            messages:{
                nombreResponsable:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 Caracteres'
                },
                cargoResponsable:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 Caracteres'
                },
                fConfronta:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Formato Incorrecto'
                },
                hConfronta:{
                    required:'El Campo es Obligatorio'
                },
                fOficio:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Formato Incorrecto'
                },
                siglas:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 20 Caracteres'
                },
                numFolio:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 20 Caracteres'
                }
            },
            submitHandler:function(form){

                let formulario = $('form#confrontasJuridico-update')
                let datos = formulario.serializeArray()
                let ruta = formulario.data('ruta')
                let idVolante = datos[0].value
                b.new_update_cedula(datos,ruta,idVolante);
                
            },
            errorClass:'is-invalid'
        })
    }

}