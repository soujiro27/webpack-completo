import {validate} from 'jquery-validation'
const base = require('./../../../base/index')
const b = new base()
module.exports = class {

    validate_insert_form(){
        $('form#insert-subDocumentos').validate({
            rules:{
                documento:{required:true},
                nombre:{
                    required:true,
                    maxlength:50
                },
                auditoria:{
                    required:true,
                    maxlength:2
                }
            },
            messages:{
                documento:{
                    required:'El Campo es Obligatorio'
                },
                nombre:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 Caracteres'
                },
                auditoria:{
                    required:'El campo es Obligatorio',
                    maxlength:'Valor Incorrecto'
                }
            },
            submitHandler:function(){
                let formData = $('form#insert-subDocumentos').serializeArray()
                b.new_insert(formData,'SubTiposDocumentos')
            },
            errorClass:'is-invalid'
        })
    }

    validate_update_form(){

        $('form#update-subDocumentos').validate({
            rules:{
                documento:{required:true},
                nombre:{
                    required:true,
                    maxlength:50
                },
                auditoria:{
                    required:true,
                    maxlength:2
                },
                estatus:{
                    required:true,
                    maxlength:8
                }
            },
            messages:{
                documento:{
                    required:'El Campo es Obligatorio'
                },
                nombre:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 Caracteres'
                },
                auditoria:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Valor Incorrecto'
                },
                estatus:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Valor Incorrecto'
                }
            },
            submitHandler:function(){
                let formData = $('form#update-subDocumentos').serializeArray()
                b.new_update(formData,'SubTiposDocumentos')
            },
            errorClass:'is-invalid'
        })
    }

}