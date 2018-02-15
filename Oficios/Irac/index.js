const base = require('./../../base/index')
const irac = require('./js/irac')
const baseOficios = require('./../base')


const b = new base()
const i = new irac()
const bo = new baseOficios()

b.cancel()
b.logout()
b.ordenamiento()

bo.load_oficio()
bo.menu_oficios()

bo.form_submit()
bo.carga_datos_turnado()
bo.load_modal_request()

i.validate_insert_observaciones()