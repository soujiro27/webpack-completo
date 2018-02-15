const base = require('./../../base/index')
const b = new base()
const diversos = require('./js/diversos')
const d = new diversos()

b.cancel()
b.load_date_inputs()
b.load_subdocumentos()
b.logout()
b.ordenamiento()

d.load_update_form()
d.load_remitentes()
d.turnar()
d.turnar_update()
d.form_submit()
d.form_update()

