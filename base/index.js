const modal = require('./modals')
const m = new modal()

module.exports = class Base {

    cancel(){ 
    //funcion del boton cancelar de los formulario
        $('button#cancelar').click(function(e) {
            e.preventDefault();
            let ruta = $(this).data('ruta');
            location.href = `/SIA/juridico/${ruta}`;
        });
    }
    
        logout(){
            $('div#logout').click(()=>{
                $('ul.logout-menu').toggle()
            })
        }
    
        ordenamiento(){
            $('button#btn-order').click(function(){
                let ruta = $(this).data('ruta')
                let html = require('./../templates/order.html')
                m.order(ruta,html)
            })
        }

        load_update_form(){
            $('table#main-table-catalogos tbody tr').click(function(){
                let id = $(this).children().first().text()
                let ruta = $(this).data('ruta')
                location.href = `/SIA/juridico/${ruta}/${id}`
            })	
        }
    
        load_subdocumentos() {
            let self = this;
            $('select#documento').change(function(){
                let audi = $(this).data('auditoria')
                let val = $(this).val();
                self.construct_sub_documentos(val,audi);
            });
        }
    
    
        async construct_sub_documentos(tipo,audi){
            let response = await this.send_datos_subdocumentos(tipo,audi);
            let option = '<option value="">Escoga una Opcion</option> ';
            $.each(response,function(index,el){
                option += `<option value="${response[index].valor}">${response[index].nombre}</option>`
            });
    
            $('select#subDocumento').html(option);
    
        }
    
        send_datos_subdocumentos(tipo,audi){
            let promesa = new Promise(resolve =>{
                $.get({
                    url: '/SIA/juridico/api/subDocumentos',
                    data:{
                        tipo,
                        audi
                    },
                    success:function(res){
                        resolve(JSON.parse(res))
                    }
                })
            })
            return promesa
        }
    
        async new_insert(datos,ruta){
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
    
        async new_update(datos,ruta){
            let res = await this.update_data(datos,ruta)
            if(res[0].campo != 'success'){
                let table = this.construct_table_errors(res)
                m.errors(table)
            } else {
                m.success_update(ruta)
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


    
}