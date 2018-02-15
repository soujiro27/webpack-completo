const base = require('./../../../base/index')

module.exports = class {

    load_update_form(){
        $('table#main-table-files tbody tr').click(function(){
            let id = $(this).children().first().text()
            let ruta = $(this).data('ruta')
            location.href = `/SIA/juridico/${ruta}/${id}`
        })
    }

}