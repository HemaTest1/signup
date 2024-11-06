const { Model } = require('sequelize');
const db = require('../models')

const insertPerson = async (req,res) => {
    try {
        const {name,email,age} = req.body;
        console.log("name ",name)
        const person = await db.PersonEntity.create({
            name,
            email: email,
            age: age,
        });
        res.status(200).send({message:"saved"})
    } catch (error) {
        console.error('Error adding person:', error);
        res.status(500).send({message:error.message})
    }
};
  

    const findAllperson = async (req, res) => {
        try {

            const {name,email,age} = req.body;
            console.log("name",name)
            const findingdetatils = await db.PersonEntity.findAll({
                name,
                email : email,
                age : age,

            });
            res.status(200).send({message:"saved",findingdetatils})
        } catch (error) {
            console.error('Error find person detatils :' , error);
            res.status(500).send({message:error.message}) 
        }
    };



    const findAllpersons = async (req, res) => {
        try {
            // const { name, email, age } = req.body;
            // console.log("name", name);
    
            const findingDetails = await db.PersonEntity.findAll({
                attributes: ['name'] // Only include the 'name' attribute in the result
            });
    
            // Extract only the names from findingDetails
            res.status(200).send({message:"saved",findingDetails})
        } catch (error) {
            console.error('Error find person detatils :' , error);
            res.status(500).send({message:error.message}) 
        }
    };  
    
    
const updatePerson = async (req, res) => {
    try {
    const { emailid } = req.params; // Get the ID from the request parameters
    const { name, email, age } = req.body; // Get the updated values from the request body


    const person = await db.PersonEntity.findAll(
        {
            where: { email:emailid }, // Condition to find the record
        }
    )


    console.log("person ", person)
    if(!person){
        return res.status(404).send({ message: "not found"});
    }
    console.log("outside of validation")



        // Find the person by ID and update their details
        const updated = await db.PersonEntity.update(
            { name, email, age }, // Values to update
            {
                where: { email:emailid }, // Condition to find the record
            }
        );



        console.log("perso n updated", updated)

        const updatedPerson = await db.PersonEntity.findAll(
            {
                where: { email:emailid }, // Condition to find the record
            }
        )
    

        return res.status(200).send({ message: "Person updated", person: updated, updatedPerson:updatedPerson });

    } catch (error) {
        console.error('Error updating person:', error);
        return res.status(500).send({ message: error.message });
    }
};


const insertaddress = async (req,res) => {
    try {
        const {address,personId} = req.body;
        console.log("adress ",address)
        const addres1 = await db.addressEntity.create({
           
            address: address,
            personId: personId,
        });
        res.status(200).send({message:"saved",addres1})
    } catch (error) {
        console.error('Error adding address:', error);
        res.status(500).send({message:error.message})
    }
};

 const findAlladdress = async (req,res) =>{
      try {
        
        const { personId } = req.params; 
        

        const findperson = await db.PersonEntity.findAll({
            where: { id:personId },
            include : [{
                model : db.addressEntity,
                as : "address",
                where : {
                    personId : personId
                } 
            }]
        });

        res.status(200).send({ message: "saved", findperson})
      } catch (error) {
        console.error('Finding a data Difficult ' , error);
        res.status(500).send({message:error.message}) 
      }
 };

module.exports = {
    insertPerson,
    updatePerson,
    insertaddress,
    findAllperson,
    findAlladdress,
    findAllpersons,
}