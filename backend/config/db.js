const mongoose= require('mongoose');


const connected = async()=>{
    try {
        await mongoose.connect(process.env.DATABASE)
        console.log("sugar connected")
    } catch (error) {
        console.log(error)
        console.log("Error in connection")
    }
}

module.exports = connected