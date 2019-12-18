const App = require('./app')


const port = process.env.PORT || 4000

console.log(`Servidor ouvindo na porta ${port}`);



App.listen(port)
