import {validate} from 'jquery-validation'
const modalsDiversos = require('./modals')
const md = new modalsDiversos()

const baseOficios = require('./../../base')
const bo = new baseOficios()

module.exports = class {


    load_modal_internos(){

        $('button#modalInternos').click(function(e){
            e.preventDefault()
            md.remitentes('I','internos')
        })
    }

    load_modal_externos(){

        $('button#modalExternos').click(function(e){
            e.preventDefault()
            md.remitentes('E','externos')
        })
    }


    validate_form_insert_cedula(){

        let formulario =$('form#insert-cedula-plantilla')
        formulario.validate({
            rules:{
                numFolio:{
                    required:true,
                    maxlength:20
                },
                fOficio:{
                    required:true,
                    maxlength:10
                },
                siglas:{
                    required:true,
                    maxlength:20       
                },
                espacios:{
                    required:true,
                }
            },
            messages:{
                numFolio:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 20 Caracteres'
                },
                fOficio:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Formato Incorrecto'
                },
                siglas:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 20 Caracteres'
                },
                espacios:{
                    required:'El Campo es Obligatorio'
                }

            },
            submitHandler:function(form){

                let datos = formulario.serializeArray()
                let ruta = formulario.data('ruta')
                let idVolante = datos[0].value

                let texto = CKEDITOR.instances['ckeditor'].getData()
                datos[datos.length - 1].value=texto
                bo.new_insert_cedula(datos,ruta,idVolante)

            },
            errorClass:'is-invalid'

        })
    }

    validate_form_update_cedula(){

        let formulario =$('form#update-cedula-plantilla')
        formulario.validate({
            rules:{
                numFolio:{
                    required:true,
                    maxlength:20
                },
                fOficio:{
                    required:true,
                    maxlength:10
                },
                siglas:{
                    required:true,
                    maxlength:20       
                },
                espacios:{
                    required:true,
                }
            },
            messages:{
                numFolio:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 20 Caracteres'
                },
                fOficio:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Formato Incorrecto'
                },
                siglas:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 20 Caracteres'
                },
                espacios:{
                    required:'El Campo es Obligatorio'
                }

            },
            submitHandler:function(form){

                let datos = formulario.serializeArray()
                let ruta = formulario.data('ruta')
                let idVolante = datos[0].value

                let texto = CKEDITOR.instances['ckeditor'].getData()
                datos[datos.length - 1].value=texto
                
                bo.new_update_cedula(datos,ruta,idVolante)

            },
            errorClass:'is-invalid'

        })
    }

}