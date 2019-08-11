const fs= require('fs'),
express=require('express'),
bodyParser=require('body-parser');

const app=express();

app.use(express.static(__dirname+'/static'));
app.set('views','./views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.route('/')
            .get((req, resp)=>{
                resp.render('login');
            })
            .post((req,resp)=>{
                const user={userName: req.body.userName, passName: req.body.passName};
                
                //se usuario e senha passar na autenticação
                resp.render('home');

                //senão, continuar pedindo login
            })

app.route('/readAllPublishers')
    .get((req, resp)=>{
        readPubs(resp);
    })
    .post((req, resp)=>{
        
    })


app.listen(3000,()=>{
    console.log('App rodando na porta 3.000');
})

function readPubs(resp){
    fs.readFile(__dirname+'/dataBase/publicadores.json', 'utf-8', (err, data)=>{
        if(err){
            resp.send('Erro ao ler arquivo pub.json');
        }
        const obj= JSON.parse(data);
        const publicadores=obj.publicador;
        
        let ttPub=calcPub();
        let ativos=calcAtiv();
        let inativos=calcInactive();
        let regulares, batizados, nbatizados, familias, desassoc;
            regulares=calcRegulares();
            batizados=calcBatizados();
            nbatizados=calcNaoBatiz();
            familias=calcFamilias();
            desassoc=calcDesassoc();
        function calcPub(){
            let i=0;
            let k=0;
            publicadores.forEach(p => {
                
                if(p._posicao==="regular"||p._posicao==="publicador"||p._posicao==="inativo"){
                   i++;
                }
                
            });
            return i;
        }
        function calcAtiv(){
            let i=0;
            let k=0;
            publicadores.forEach(p => {
                
                if(p._posicao==="regular"||p._posicao==="publicador"){
                   i++;
                }
                
            });
            return i;
        }
        function calcInactive(){
            let i=0;
            let k=0;
            publicadores.forEach(p => {
                
                if(p._posicao==="inativo"){
                   i++;
                }
                
            });
            return i;
        }
        function calcRegulares(){
            let i=0;
            let k=0;
            publicadores.forEach(p => {
                
                if(p._posicao==="regular"){
                   i++;
                }
                
            });
            return i;
        }
        function calcBatizados(){
            let i=0;
            let k=0;
            publicadores.forEach(p => {
                
                if(p._batismo!=="" && p._posicao!=="desassociado" && p._posicao!=="mudanca" &&  p._posicao!=="falecido"){
                   i++;
                }
                
            });
            return i;
        }
        function calcNaoBatiz(){
            let i=0;
            let k=0;
            publicadores.forEach(p => {
                
                if(p._batismo==="" && p._posicao!=="desassociado" && p._posicao!=="mudanca" &&  p._posicao!=="falecido"){
                   i++;
                }
                
            });
            return i;
        }
        function calcFamilias(){
            let familias=[];
            let repeticoes=[];
            publicadores.forEach(p => {
                
                if(familias.includes(p._pastoreio)){
                    repeticoes.push(p._pastoreio);
                }else{
                    familias.push(p._pastoreio)
                }
                
            });
            
            return familias.length;
        }
        function calcDesassoc(){
            let i=0;
            let k=0;
            publicadores.forEach(p => {
                
                if(p._posicao==="desassociado"){
                   i++;
                }
                
            });
            return i;
        }
        
        
        resp.render('cadastro',{params:{param1:publicadores, param2:ttPub,
        param3:ativos, param4:inativos, param5:regulares, param6:batizados, 
        param7:nbatizados, param8: desassoc, param9:familias}});
    })
}

//ler todos os publicadores


/*
//incluir novo publicador
var newPublisher=`<publicador id="129" grupo="Belém" nome="Laura Costa da Silva Tavares" sexo="Feminino" endereco="Rua Rondonia, 64" bairro="Pq. 120" tel="" celular="99748-3484" posicao="publicador" nascimento="10/04/2015" batismo="" pastoreio="Tavares"/>`;


fs.appendFile('./dataBase/Publicadores.xml', newPublisher,['utf-8'], (err)=>{
if(err){
    console.log('Algo de errado aconteceu, novo publicador não foi incluído.')
}
console.log("Publicador incluído");
})*/



