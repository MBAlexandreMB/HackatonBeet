const mongoose = require('mongoose');
const Loja = require('./models/Loja');
const Admin = require('./models/Admin');

mongoose
.connect('mongodb://localhost/hackbeet', { useNewUrlParser: true })
.then((x) => {
  console.log(
    `Connected to Mongo! Database name: "${x.connections[0].name}"`
  );
})
.catch();

Admin.create({username: 'admin', password: 'admin'}).then(() => console.log('Admin done!')).catch(err => console.log(err));

Loja.create([
  {
    codigo: 'L01',
    endereco: 'Alameda Jaú',
    numero: 1301,
    cep: '01420-001',
    bairro: 'Jardim Paulista', 
    cidade: 'São Paulo',
    estado: 'SP',
  },
  {
    codigo: 'L02',
    endereco: 'Av. Paulista',
    numero: 2034,
    cep: '01310-200',
    bairro: 'Bela Vista', 
    cidade: 'São Paulo',
    estado: 'SP',
  },
  {
    codigo: 'L03',
    endereco: 'R. Augusta',
    numero: 1856,
    cep: '01412-000',
    bairro: 'Cerqueira César', 
    cidade: 'São Paulo',
    estado: 'SP',
  },
  {
    codigo: 'L04',
    endereco: 'R. Pamplona',
    numero: 734,
    cep: '01405-001',
    bairro: 'Jardim Paulista', 
    cidade: 'São Paulo',
    estado: 'SP',
  },
  {
    codigo: 'L05',
    endereco: 'Av. Goiás',
    numero: 1805,
    cep: '09550-050',
    bairro: 'Santa Paula', 
    cidade: 'São Caetano do Sul',
    estado: 'SP',
  },  {
    codigo: 'L06',
    endereco: 'R. Mal. Deodoro',
    numero: 1322,
    cep: '09710-002',
    bairro: 'Centro', 
    cidade: 'São Bernardo do Campo',
    estado: 'SP',
  },  {
    codigo: 'L07',
    endereco: 'R. Aurora Soares Barbosa',
    numero: 775,
    cep: '06023-010',
    bairro: 'Vila Campesina', 
    cidade: 'Osasco',
    estado: 'SP',
  },  {
    codigo: 'L08',
    endereco: 'R. Waldir de Azevedo',
    numero: 20,
    cep: '07122-170',
    bairro: 'Jardim Bom Clima', 
    cidade: 'Guarulhos',
    estado: 'SP',
  },  {
    codigo: 'L09',
    endereco: 'R. Sebastião Pereira',
    numero: 245,
    cep: '01225-020',
    bairro: 'Vila Buarque', 
    cidade: 'São Paulo',
    estado: 'SP',
  },  {
    codigo: 'L10',
    endereco: 'Av. Rui Barbosa',
    numero: 409,
    cep: '06311-000',
    bairro: 'Vila Caldas', 
    cidade: 'Carapicuíba',
    estado: 'SP',
  },  {
    codigo: 'L11',
    endereco: 'Av. Antonio Piranga',
    numero: 171,
    cep: '09911-160',
    bairro: 'Centro', 
    cidade: 'Diadema',
    estado: 'SP',
  },  {
    codigo: 'L12',
    endereco: 'Av. Vital Brasil',
    numero: 1133,
    cep: '05503-001',
    bairro: 'Butantã', 
    cidade: 'São Paulo',
    estado: 'SP',
  },  {
    codigo: 'L13',
    endereco: 'Av. Alcântara Machado',
    numero: 576,
    cep: '03102-000',
    bairro: 'Brás', 
    cidade: 'São Paulo',
    estado: 'SP',
  }, {
    codigo: 'L14',
    endereco: 'Av. Imirim',
    numero: 1217,
    cep: '02465-100',
    bairro: 'Imirim', 
    cidade: 'São Paulo',
    estado: 'SP',
  }, {
    codigo: 'L15',
    endereco: 'Av. Roque Petroni Júnior',
    numero: 1089,
    cep: '04707-000',
    bairro: 'Jardim das Acacias', 
    cidade: 'São Paulo',
    estado: 'SP',
  }, 
]).then(() => console.log('Stores done!')).catch(err => console.log(err));


