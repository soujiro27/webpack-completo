import {validate} from 'jquery-validation'
const base = require('./../../../base')
const b = new base()
module.exports = class{

    validate_insert_form(){

        $('form#insert-textos').validate({
            rules:{
                documento:{required:true},
                subDocumento:{required:true},
                texto:{required:true}
            },
            messages:{
                documento:{required:'El campo es Obligatorio'},
                subDocumento:{required:'El campo es Obligatorio'},
                texto:{required:'El campo es Obligatorio'}
            },
            submitHandler:function(form){
                let texto = CKEDITOR.instances['ckeditor'].getData()
                let formData = $('form#insert-textos').serializeArray()
                formData[2].value=texto
                b.new_insert(formData,'DoctosTextos')
            },
            errorClass:'is-invalid'

        })
    }

    validate_update_form(){

        $('form#update-textos').validate({
            rules:{
                documento:{required:true},
                subDocumento:{required:true},
                texto:{required:true},
                estatus:{
                    required:true,
                    maxlength:8
                }
            },
            messages:{
                documento:{required:'El campo es Obligatorio'},
                subDocumento:{required:'El campo es Obligatorio'},
                texto:{required:'El campo es Obligatorio'},
                estatus:{
                    required:'El campo es Obligatorio',
                    maxlength:'Valor Incorrecto'
                }
            },
            submitHandler:function(form){
                let texto = CKEDITOR.instances['ckeditor'].getData()
                let formData = $('form#update-textos').serializeArray()
                formData[2].value=texto
                b.new_update(formData,'DoctosTextos')
            },
            errorClass:'is-invalid'

        })
    }
}