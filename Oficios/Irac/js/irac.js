import {validate} from 'jquery-validation'
const modals = require('./modals')
const m = new modals()

module.exports= class {

    load_form_observaciones(){
        
        $('button#add-btn-observaciones').click(function(){
            $('table').toggle()
            $('form').toggle()
            $(this).hide()
        })
    }


    load_update_form_observaciones(){

        $('table#observaciones tbody tr').click(function(){

            let id = $(this).data('id')
            location.href = `/SIA/juridico/Irac/update/observaciones/${id}`

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
                self.new_insert(formData,'Observaciones',formData[0].value)
            },
            errorClass:'is-invalid'
        })
    }

    async new_insert(datos,ruta,idVolante){
        
        let res = await this.send_data_insert_without_file(datos,ruta)
        if(res[0].campo != 'success'){
            let table = this.construct_table_errors(res)
            m.errors(table)
        } else {
            m.success(ruta,idVolante)
        }
    }

    send_data_insert_without_file(datos,ruta) {
        let prom = new Promise(resolve =>{
            $.post({
                url:`/SIA/juridico/${ruta}/create`,
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
                self.new_update(formData,'Observaciones',idVolante)
            },
            errorClass:'is-invalid'
        })
    }

    async new_update(datos,ruta,idVolante){
        let res = await this.update_data(datos,ruta)
        if(res[0].campo != 'success'){
            let table = this.construct_table_errors(res)
            m.errors(table)
        } else {
            m.success_update(ruta,idVolante)
        }	
    }


    update_data(datos,ruta){
        let promesa = new Promise(resolve =>{
            $.post({
                url:`/SIA/juridico/${ruta}/update`,
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
        
        console.table(datos)
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
                    <td><input type="radio" name="puestos" value="${datos[x].idPuestoJuridico}"></td>
                    <td>${datos[x].saludo} ${datos[x].nombre} ${datos[x].paterno} ${datos[x].materno} </td>
                    <td>${datos[x].puesto}</td>
                </tr>`
        }

        let table = html.replace(':body:',tr)

        return table

    }
    

}