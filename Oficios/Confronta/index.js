const base = require('./../../base/index')
const confronta = require('./js/confronta')
const baseOficios = require('./../base')


const b = new base()
const c = new confronta()
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

