const base = require('./../../base/index')
const irac = require('./js/irac')
const baseOficios = require('./../base')


const b = new base()
const i = new irac()
const bo = new baseOficios()

b.cancel()
b.logout()
b.ordenamiento()
b.load_date_inputs()

bo.load_oficio()
bo.menu_oficios()

bo.form_submit()
bo.carga_datos_turnado()
bo.load_modal_request()
bo.validate_insert_observaciones()
bo.validate_update_observaciones()
bo.load_puestos_cedula()


i.load_update_form_observaciones()
i.validate_insert_cedula()
i.validate_update_cedula()