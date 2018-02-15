const base = require('./../../base/index')
const b = new base()

const subDocumentos = require('./js/subDocumentos')
const sd = new subDocumentos()

b.cancel()
b.logout()
b.load_update_form()

sd.validate_insert_form()
sd.validate_update_form()