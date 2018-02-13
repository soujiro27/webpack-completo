import { Validator } from 'drip-form-validator';

const base = require('./../../base/index')
const b = new base()

module.exports = class {

    validate_form(){
        let self = this
        
        $('form#Caracteres').submit(function(e){
            e.preventDefault();

            let datos = $(this).serializeArray()
            let datos_form = b.create_object_form(datos)
            let rules = self.rules_validate_form()
            let messages = self.messages_validate_form() 

            let v = new Validator(datos_form,rules,messages)
            
            if(v.validate()){
                
            } else {
                b.error_form(v.getAllErrorMessages())
                console.log(v.getAllErrorMessages())
                
            }
        })

       
    }

    rules_validate_form(){

        const rules = {
            nombre:{
                required:true,
                max:10,
                string:true
            },
            siglas:{
                required:true,
                max:2,
                string:true
                
            }
        }

        return rules
    }

    messages_validate_form(){

        const options = {
            messages:{
                nombre:{
                    required:'El Campo es Obligatorio',
                    max:'Maximo 10 Caracteres',
                    string:'El campo solo acepta letras'
                },
                siglas:{
                    required:'El Campo es Obligatorio',
                    max:'Maximo 2 Caracteres',
                    string:'El campo solo acepta letras'
                }
            }
        }
        
        return options
    }



}