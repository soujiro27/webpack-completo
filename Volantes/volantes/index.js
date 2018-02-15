const base = require('./../../base/index')
const b = new base()

const volantes = require('./js/volantes')
const v = new volantes()



b.cancel()
b.load_subdocumentos()
b.logout()
b.ordenamiento()
b.load_date_inputs()

v.load_update_form()
v.modal_subDocumento()
v.modal_auditoria()
v.form_submit()
v.form_update()