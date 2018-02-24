import {validate} from 'jquery-validation'
const modalsInterno = require('./modals')
const mi = new modalsInterno()

const base = require('./../../base')
const b = new base();


module.exports= class {

    load_update_form_observaciones(){

        $('table#observaciones tbody tr').click(function(){

            let id = $(this).data('id')
            location.href = `/SIA/juridico/Ifa/update/observaciones/${id}`

        })
    }
    
    load_textos_cedula(){

        let self = this
        
        $('button#modalTextos').click(function(e){
            e.preventDefault()
            self.modal_textos_promocion()
        })
    }


    async modal_textos_promocion() {
        
        let datos = await this.load_textos_promocion()
        let table = this.construct_table_textos(datos)
        mi.textos_promocion_cedula_ifa(table)
        


    }

    load_textos_promocion(){

        let promesa = new Promise(resolve =>{
            $.get({
                url:`/SIA/juridico/api/promocionAcciones`,
                success:function(res){
                    resolve(JSON.parse(res))
                }
            })
        })
        return promesa
    }

    construct_table_textos(datos){

        let html = require('./../../../templates/promocion_acciones.html')
        let tr = ''

        for(let x in datos){
            tr += `<tr>
                    <td><input type="radio" name="puestos" value="${datos[x].idDocumentoTexto}"></td>
                    <td>${datos[x].texto} </td>
                </tr>`
        }

        let table = html.replace(':body:',tr)

        return table

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
                b.new_insert_cedula(datos,'Ifa',idVolante)
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
                b.new_update_cedula(datos,'Ifa',datos[0].value)

            },
            errorClass:'is-invalid'
        })
    }

}