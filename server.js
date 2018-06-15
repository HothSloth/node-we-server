
const express=require('express');
const app=express();
const hbs=require('hbs');



app.use(express.static(__dirname + '/public'))
app.set('view engine', 'hbs');

app.get('/', (request, response) => {
    //response.send('<h1>Hello from Express!</>');
    response.render('template.hbs', {
        title: 'Welcome to my site',
        text: "...or naaaah"
    });
});

app.get('/about', (request, response) =>{
    response.render('template.hbs', {
        title: 'About',
        text: "It's me, ya boy, skinny Pete."
    });
});

app.get('/carochao', (request, response)=>{
    var date = new Date().toString();  

    response.render('carochao_template.hbs', {
        info: date
    });
});

//Escutar na porta 3000. Convém ser acima da 1024, pois são usadas pelo sistema
app.listen(3000);


//formar grupos e decidir +- o que queremos extrair do dark sky
//se tivermos curiosidade/vontade, ver como o handlebar parcials - cenas iguais em tudo ->  {{> footer}}
//pensar na estrutura
//o que fica do lado do cliente e o que fica do lado do servidor
