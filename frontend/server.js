const express = require('express');

const app =  express();

app.use(express.static(`${__dirname}/build`));
app.get('*', (req, res) => res.ednFile(`${__dirname}/build/index.html`));

app.listen(process.env.PORT, () => console.log(`listening on port: ${process.env.PORT}`));