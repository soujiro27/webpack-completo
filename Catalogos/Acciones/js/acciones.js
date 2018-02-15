import validate from 'jquery-validation'
const base = require('./../../../base/index')
const b = new base()
module.exports = class {

    validate_insert_form(){
        $('form#insert-acciones').validate({
            rules:{
                nombre:{
                    required:true,
                    maxlength:50
                }
            },
            messages:{
                nombre:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 Caracteres'
                }
            },
            submitHandler:function(){

                let formData = $('form#insert-acciones').serializeArray()
                b.new_insert(formData,'Acciones')
            },
            errorClass:'is-invalid'

        })
    }

    validate_update_form(){

        $('form#update-acciones').validate({
            rules:{
                nombre:{
                    required:true,
                    maxlength:50
                },
                estatus:{
                    required:true,
                    maxlength:8
                }
            },
            messages:{
                nombre:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 Caracteres'
                },
                estatus:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Valor Incorrecto'
                }
            },
            submitHandler:function(){

                let formData = $('form#update-acciones').serializeArray()
                b.new_update(formData,'Acciones')
            },
            errorClass:'is-invalid'

        })
    }
}