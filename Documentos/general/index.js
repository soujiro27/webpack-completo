const base = require('./../../base/index')
const general = require('./js/general')
const b = new base()
const g = new general()

b.cancel()
b.logout()
b.ordenamiento()

g.load_update_form()