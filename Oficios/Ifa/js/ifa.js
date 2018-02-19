import {validate} from 'jquery-validation'
const modals = require('./../../Irac/js/modals')
const m = new modals()

module.exports= class {

    load_update_form_observaciones(){

        $('table#observaciones tbody tr').click(function(){

            let id = $(this).data('id')
            location.href = `/SIA/juridico/Ifa/update/observaciones/${id}`

        })
    }

    validate_insert_observaciones(){
        
        let self = this

        $('form#Observaciones-insert').validate({
            rules:{
                idVolante:{
                    required:true,
                    digits:true
                },
                pagina:{
                    required:true,
                    maxlength:50
                },
                parrafo:{
                    required:true,
                    maxlength:50
                },
                observacion:{
                    required:true,
                    maxlength:350
                }
            },
            messages:{
                pagina:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 caracteres'
                },
                parrafo:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 caracteres'
                },
                observacion:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 caracteres'
                }
            },
            submitHandler:function(form){

                let texto = CKEDITOR.instances['ckeditor'].getData()
                let formData = $('form#Observaciones-insert').serializeArray()
                formData[3].value=texto
                self.new_insert_observacion(formData,'Ifa',formData[0].value)
            },
            errorClass:'is-invalid'
        })
    }

    async new_insert_observacion(datos,ruta,idVolante){
        
        let res = await this.send_data_insert_observaciones(datos,ruta)
        if(res[0].campo != 'success'){
            let table = this.construct_table_errors(res)
            m.errors(table)
        } else {
            m.success_observacion(ruta,idVolante)
        }
    }

    send_data_insert_observaciones(datos,ruta) {
        let prom = new Promise(resolve =>{
            $.post({
                url:`/SIA/juridico/${ruta}/Observaciones/create`,
                data:datos,
                success:function(res) {
                    resolve(JSON.parse(res))
                }
            })
        })

        return prom
    }

    validate_update_observaciones(){
        
        let self = this

        $('form#Observaciones-update').validate({
            rules:{
                idObservacionDoctoJuridico:{
                    required:true,
                    digits:true
                },
                pagina:{
                    required:true,
                    maxlength:50
                },
                parrafo:{
                    required:true,
                    maxlength:50
                },
                observacion:{
                    required:true,
                    maxlength:350
                }
            },
            messages:{
                pagina:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 caracteres'
                },
                parrafo:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 caracteres'
                },
                observacion:{
                    required:'El Campo es Obligatorio',
                    maxlength:'Maximo 50 caracteres'
                }
            },
            submitHandler:function(form){

                let texto = CKEDITOR.instances['ckeditor'].getData()
                let formData = $('form#Observaciones-update').serializeArray()
                formData[4].value=texto
                let idVolante = $('a#add-btn-observaciones').data('volante')
                self.new_update_observacion(formData,'Ifa',idVolante)
            },
            errorClass:'is-invalid'
        })
    }

    async new_update_observacion(datos,ruta,idVolante){
        let res = await this.update_observaciones(datos,ruta)
        if(res[0].campo != 'success'){
            let table = this.construct_table_errors(res)
            m.errors(table)
        } else {
            m.success_update_observacion(ruta,idVolante)
        }	
    }


    update_observaciones(datos,ruta){
        let promesa = new Promise(resolve =>{
            $.post({
                url:`/SIA/juridico/${ruta}/observaciones/update`,
                data:datos,
                success:function(res){
                    resolve(JSON.parse(res))
                }
            })
        })
        return promesa
    }

    construct_table_errors(datos) {
        //construye la lista de errores
            let ul = ''
    
            $.each(datos, function(index, val) {
                 ul += `<ul>
                         <li><strong>Campo:</strong> ${datos[index].campo}</li>
                         <li><strong>Error:</strong> ${datos[index].message}</li>
                         </ul>`
            })	
            
            return ul
    }

    load_puestos_cedula(){

        let self = this
        
        $('button#modalFirmas').click(function(e){
            e.preventDefault()
            self.modal_puestos_juridico()
        })

    }

    async modal_puestos_juridico() {
        
        let datos = await this.load_puestos_juridico()
        let table = this.construct_table_puestos_juridico(datos)
        m.puestos_juridico(table)
        


    }

    load_puestos_juridico(){

        let promesa = new Promise(resolve =>{
            $.get({
                url:`/SIA/juridico/api/puestosJuridico`,
                success:function(res){
                    resolve(JSON.parse(res))
                }
            })
        })
        return promesa
    }

    construct_table_puestos_juridico(datos){

        let html = require('./../../../templates/puestos_juridico.html')
        let tr = ''

        for(let x in datos){
            tr += `<tr>
                    <td><input type="checkbox" name="puestos" value="${datos[x].idPuestoJuridico}"></td>
                    <td>${datos[x].saludo} ${datos[x].nombre} ${datos[x].paterno} ${datos[x].materno} </td>
                    <td>${datos[x].puesto}</td>
                </tr>`
        }

        let table = html.replace(':body:',tr)

        return table

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
        m.textos_promocion_cedula_ifa(table)
        


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
                self.new_insert_cedula(datos,'Ifa',idVolante)
            },
            errorClass:'is-invalid'
        })
    }
    
    async new_insert_cedula(datos,ruta,idVolante){
        
        let res = await this.send_data_insert_cedula(datos,ruta)
        if(res[0].campo != 'success'){
            let table = this.construct_table_errors(res)
            m.errors(table)
        } else {
            m.success_cedula(ruta,idVolante)
        }
    }


    send_data_insert_cedula(datos,ruta) {
        let prom = new Promise(resolve =>{
            $.post({
                url:`/SIA/juridico/${ruta}/cedula/create`,
                data:datos,
                success:function(res) {
                    resolve(JSON.parse(res))
                }
            })
        })

        return prom
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
                self.new_update_cedula(datos,'Ifa',datos[0].value)

            },
            errorClass:'is-invalid'
        })
    }

    async new_update_cedula(datos,ruta,idVolante){
        let res = await this.update_data_cedula(datos,ruta)
        if(res[0].campo != 'success'){
            let table = this.construct_table_errors(res)
            m.errors(table)
        } else {
            m.success_update(ruta,idVolante)
        }	
    }


    update_data_cedula(datos,ruta){
        let promesa = new Promise(resolve =>{
            $.post({
                url:`/SIA/juridico/${ruta}/cedula/update`,
                data:datos,
                success:function(res){
                    resolve(JSON.parse(res))
                }
            })
        })
        return promesa
    }



}