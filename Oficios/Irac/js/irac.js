import {validate} from 'jquery-validation'


module.exports= class {

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
                self.new_insert(formData,Observaciones,formData[0].value)
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
            m.success(ruta)
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


}