const mongoose = require('mongoose');
const Loja = require('./models/Loja');

mongoose
.connect('mongodb://localhost/hackbeet', { useNewUrlParser: true })
.then((x) => {
  console.log(
    `Connected to Mongo! Database name: "${x.connections[0].name}"`
  );
})
.catch();

Loja.create([
  {
    endereco: 'Alameda Jaú',
    numero: 1301,
    cep: '01420-001',
    bairro: 'Jardim Paulista', 
    cidade: 'São Paulo',
    estado: 'SP',
  },
  {
    endereco: 'Av. Paulista',
    numero: 2034,
    cep: '01310-200',
    bairro: 'Bela Vista', 
    cidade: 'São Paulo',
    estado: 'SP',
  },
  {
    endereco: 'R. Augusta',
    numero: 1856,
    cep: '01412-000',
    bairro: 'Cerqueira César', 
    cidade: 'São Paulo',
    estado: 'SP',
  },
  {
    endereco: 'R. Pamplona',
    numero: 734,
    cep: '01405-001',
    bairro: 'Jardim Paulista', 
    cidade: 'São Paulo',
    estado: 'SP',
  },
  {
    endereco: 'Av. Goiás',
    numero: 1805,
    cep: '09550-050',
    bairro: 'Santa Paula', 
    cidade: 'São Caetano do Sul',
    estado: 'SP',
  },  {
    endereco: 'R. Mal. Deodoro',
    numero: 1322,
    cep: '09710-002',
    bairro: 'Centro', 
    cidade: 'São Bernardo do Campo',
    estado: 'SP',
  },  {
    endereco: 'R. Aurora Soares Barbosa',
    numero: 775,
    cep: '06023-010',
    bairro: 'Vila Campesina', 
    cidade: 'Osasco',
    estado: 'SP',
  },  {
    endereco: 'R. Waldir de Azevedo',
    numero: 20,
    cep: '07122-170',
    bairro: 'Jardim Bom Clima', 
    cidade: 'Guarulhos',
    estado: 'SP',
  },  {
    endereco: 'R. Sebastião Pereira',
    numero: 245,
    cep: '01225-020',
    bairro: 'Vila Buarque', 
    cidade: 'São Paulo',
    estado: 'SP',
  },  {
    endereco: 'Av. Rui Barbosa',
    numero: 409,
    cep: '06311-000',
    bairro: 'Vila Caldas', 
    cidade: 'Carapicuíba',
    estado: 'SP',
  },  {
    endereco: 'Av. Antonio Piranga',
    numero: 171,
    cep: '09911-160',
    bairro: 'Centro', 
    cidade: 'Diadema',
    estado: 'SP',
  },  {
    endereco: 'Av. Vital Brasil',
    numero: 1133,
    cep: '05503-001',
    bairro: 'Butantã', 
    cidade: 'São Paulo',
    estado: 'SP',
  },  {
    endereco: 'Av. Alcântara Machado',
    numero: 576,
    cep: '03102-000',
    bairro: 'Brás', 
    cidade: 'São Paulo',
    estado: 'SP',
  }, {
    endereco: 'Av. Imirim',
    numero: 1217,
    cep: '02465-100',
    bairro: 'Imirim', 
    cidade: 'São Paulo',
    estado: 'SP',
  }, {
    endereco: 'Av. Roque Petroni Júnior',
    numero: 1089,
    cep: '04707-000',
    bairro: 'Jardim das Acacias', 
    cidade: 'São Paulo',
    estado: 'SP',
  }, 
]).then(() => console.log('All done!')).catch(err => console.log(err));

