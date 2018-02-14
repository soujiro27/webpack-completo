import {validate} from 'jquery-validation'

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
            }
        })
    }

}