const app = require('./app');

app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), () => {
  console.log(`Product service is listening on
    ${server.address().port}`);
});
