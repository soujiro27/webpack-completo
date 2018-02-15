const base = require('./../../base/index')
const b = new base()

const acciones = require('./js/acciones')
const a = new acciones()

b.cancel()
b.logout()
b.load_update_form()

a.validate_insert_form()
a.validate_update_form()