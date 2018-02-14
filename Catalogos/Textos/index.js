const base = require('./../../base/index')
const textos = require('./js/textos')

const b = new base()
const t = new textos()

b.cancel()
b.load_subdocumentos()
b.load_update_form()
b.logout()

t.validate_insert_form()
t.validate_update_form()
