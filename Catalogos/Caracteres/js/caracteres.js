import {validate} from 'jquery-validation'

const base = require('./../../../base/index')
const b = new base()

module.exports = class {

    validate_insert_form(){
        
        $('form#Caracteres-insert').validate({
            rules:{
                siglas:{
                    required:true,
                    maxlength:2
                },
                nombre:{
                    required:true,
                    maxlength:10
                }
            },
            messages:{
                siglas:{
                    required:'El campo es Obligatorio',
                    maxlength:'Maximo 2 Caracteres'
                },
                nombre:{
                    required:'El campo es Obligatorio',
                    maxlength:'Maximo 10 Caracteres'
                }
            },
            submitHandler:function(form){
                let datos= $('form#Caracteres-insert').serializeArray()
                b.new_insert(datos,'Caracteres')
            },
            errorClass:'is-invalid'
            
        })

    }
    validate_update_form(){
        $('form#Caracteres-update').validate({
            rules:{
                nombre:{
                    required:true,
                    maxlength:10
                },
                siglas:{
                    required:true,
                    maxlength:2
                },
                estatus:{
                    required:true,
                    maxlength:8
                }
            },
            messages:{
                siglas:{
                    required:'El campo es Obligatorio',
                    maxlength:'Maximo 2 Caracteres'
                },
                nombre:{
                    required:'El campo es Obligatorio',
                    maxlength:'Maximo 10 Caracteres'
                },
                estatus:{
                    required:'El campo es Obligatorio',
                    maxlength:'Valor Incorrecto'
                }
            },
            submitHandler:function(form){
                let datos = $('form#Caracteres-update').serializeArray()
                b.new_update(datos,'Caracteres')
            },
            errorClass:'is-invalid'
        })
    }

}