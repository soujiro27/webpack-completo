import  swal  from 'sweetalert';

module.exports = class Base {

    cancel(){

        let button = document.getElementById('cancelar')
                    .addEventListener('click',function(e){
                        e.preventDefault();
                        let ruta = this.getAttribute('data-ruta');
                        location.href = `/SIA/juridico/${ruta}`;
                    });
    }

    create_object_form(datos){
        let object = new Object()
        
        for(let x in datos){
            object[datos[x].name] = datos[x].value
        }

        return object
    }

    error_form(messages){
        let errors_list = '<ul>'
        $.each(messages,function(index,el){
            for(let x in messages[index]){
                 errors_list += `<li>${index}: ${messages[index][x]}</li> `
            }
        })
        let test = document.createElement('button')
     

        swal({
            title:'Error!',
            content:test,
            icon:'error',
            button:'Aceptar'
        });
        
    }

    async new_insert(datos,ruta){
    //resuelve la promesa de envio y 
        let test = await this.send_data(datos,ruta)
        if(test[0].campo != 'success'){
            //let table = this.construct_table_errors(test)
            //modal.errors(table)
        } else {
            //modal.success(ruta)
        }
    }

    send_data(datos,ruta) {
    // Promse de envio para insercion de un nuevo registro
        let promesa = new Promise(resolve => {
            $.post({
                url:`/SIA/juridico/${ruta}/create`,
                data:datos,
                success:function(res) {
                    resolve(JSON.parse(res))
                }
            })
        })

        return promesa
    }


    
}