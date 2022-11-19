const productsdata = require('./constant/productsdata')
const products = require('./models/productsSchema')

const DefaultData = async ()=>{
    try{
        await products.deleteMany({})
        const defaultdata = await products.insertMany(productsdata)
       // console.log(defaultdata)
    }catch(err){
        console.log(err)
    }
}

module.exports = DefaultData