
const people = [
   
  {
    id: "12345678",
    firstName : "Alhanouf",
    lastName : "Juraydi",
    age : "23",
    city : "Riyadh",
    
  }
  ,{
      
          id: "23456781",
          firstName : "nusaibah",
          lastName : "Alharbi",
          age : "23",
          city : "Riyadh",
          
  
  }
  ,{
      id: "34567812",
      firstName : "bashayer",
      lastName : "Juraydi",
      age : "30",
      city : "Riyadh",
      
    }
    ,{
      id: "45678123",
      firstName : "raghad",
      lastName : "alsubaie",
      age : "23",
      city : "Riyadh",
      
    }
];

const express = require("express");
const app = express();
app.use(express.json());

app.get("/people/:person/", (req, res) => {
  const result = people.find((i) => i.name ==req.params.person );
  res.send(result)  
});

app.post("/people", (req, res) => {
  people.push(req.body);
  res.send(people);
});

app.put("/people", (req, res) => {
  const schema = {
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    city: Joi.string().min(3).required(),
    age: Joi.number().min(1).max(99).required(),
    id:Joi.number().min(10000000).max(99999999).uniqueLocal().require()
  };
  const result = Joi.validate(req.body, schema);
  res.send(result)
  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }
  
  res.send(people.body);
});
// firstName, lastName, and city should have more than 3 characters.
// age should be more than 0 and less than 100.
// id should be a positive number starting from 1, and is unique for all recor

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is working on port ${PORT}`);
});