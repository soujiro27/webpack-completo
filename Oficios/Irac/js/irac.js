import {validate} from 'jquery-validation'
const base = require('./../../base')
const b = new base()

module.exports= class {

    load_update_form_observaciones(){

        $('table#observaciones tbody tr').click(function(){

            let id = $(this).data('id')
            location.href = `/SIA/juridico/Irac/update/observaciones/${id}`

        })
    }

    validate_insert_cedula(){

        let self = this

        $('form#insert-cedula-irac').validate({

            rules:{
                siglas:{
                    required:true,
                    maxlength:50
                },
                fOficio:{required:true},
                numFolio:{
                    required:true,
                    maxlength:20
                }
            },
            messages:{
                siglas:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 Caracteres'
                },
                fOficio:{
                    required:'El Campo es Obligatorio'
                },
                numFolio:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 Caracteres'
                }
            },
            submitHandler:function(form){

                let datos = $('form#insert-cedula-irac').serializeArray()
                let idVolante = datos[0].value
                b.new_insert_cedula(datos,'Irac',idVolante)
            },
            errorClass:'is-invalid'
        })
    }
    

    validate_update_cedula(){

        let self = this

        $('form#update-cedula-irac').validate({
            rules:{
                siglas:{
                    required:true,
                    maxlength:50
                },
                fOficio:{
                    required:true,
                    maxlength:10
                },
                numFolio:{
                    required:true,
                    maxlength:20
                },
                
            },
            messages:{
                siglas:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 Caracteres'
                },
                fOficio:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Formato Incorrecto'
                },
                numFolio:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 20 Caracteres'
                }
            },
            submitHandler:function(form){

                let datos = $('form#update-cedula-irac').serializeArray()
                b.new_update_cedula(datos,'Irac',datos[0].value)

            },
            errorClass:'is-invalid'
        })
    }

}