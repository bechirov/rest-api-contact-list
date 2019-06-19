const express=require('express')
const {MongoClient,ObjectID}=require('mongodb')
const bodyParser=require('body-parser')
const app =express();
app.use(bodyParser.json());//attention a ne pas oublier 

const assert =require('assert')
const mongo_url='mongodb://localhost:27017'
const dataBase='contact-api'
//const assert =require('assert')

MongoClient.connect(mongo_url,  { useNewUrlParser: true } ,(err,client)=>{
  console.log('mongo d connted')
   assert.equal(err,null,'dataBase connection failed' )
  const db =client.db(dataBase)
  /////add contact
  app.post('/add_contact',(req,res)=>{ 
    let newContact=req.body
    db.collection('contacts').insertOne(newContact,(err,data)=>{
      if(err){res.send('cannot insert contact')}
      else{res.send("contact added")}
    })
  })
  /////afficher les contacts
  app.get('/all_contacts',(req,res)=>{
    db.collection('contacts').find().toArray((err,data)=>{
      if(err) res.send('cant fetch contacts')
      else res.send(data)
    })
  })
  ///afficher un seul contact
  app.get('/contacts/:id',(req,res)=>{
    console.log('zzz')
    let searchedid=ObjectID(req.params.id)
    db.collection('contacts').findOne({_id:searchedid},(err,data)=>{
      if (err) res.send('can not fetch contact')
      else res.send(data)
    })
  })

/////modifier contact
app.put('/modify_contact/:id',(req,res)=>{
  let id=ObjectID(req.params.id)
  let contactToModify=req.body
 // console.log(...modifiedProduct,id)
  db.collection('contacts').findOneAndUpdate ({_id:id},
    {$set:{name:contactToModify.name,telephone:contactToModify.telephone,mail:contactToModify.mail}},(err,data)=>{
    if(err)
    {res.send('can not modify')}
    else
     res.send("contact was modified")
  })
})
//////delete contatct
app.delete('/delete_contact/:id',(req,res)=>{
  let contactToremoveid=ObjectID(req.params.id)
   db.collection('contacts').findOneAndDelete({_id:contactToremoveid},(err,data)=>{
     if (err) res.send('can not delete')
     else res.send('contact was  deleted')
   })
  })
  

 })
 app.listen(5000,(err)=>{
    if(err){console.log('server is not running')}
    else{console.log('server is running on port 3000')}
})