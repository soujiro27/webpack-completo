const base = require('./../../base/index')
const baseOficios = require('./../base')
const diversos = require('./js/Diversos')

const b = new base()
const bo = new baseOficios()
const d = new diversos()

b.cancel()
b.logout()
b.ordenamiento()
b.load_date_inputs()

bo.load_oficio()
bo.menu_oficios()

bo.form_submit()
bo.carga_datos_turnado()
bo.load_modal_request()

d.load_modal_internos()
d.load_modal_externos()
d.validate_form_insert_cedula()
d.validate_form_update_cedula()


