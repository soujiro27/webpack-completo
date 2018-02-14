const base = require('./../../base/index')
const caracteres = require('./js/caracteres')

const b = new base()
const c = new caracteres()

b.cancel()
b.load_update_form()
b.logout()

c.load_update_form()
c.validate_insert_form()
c.validate_update_form()