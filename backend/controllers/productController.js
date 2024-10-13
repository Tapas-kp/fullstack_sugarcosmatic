const Product = require("../models/Product")

exports.getHome = async(req, res) =>{
    try {
        const bestSeller1 =await  Product.find().skip(0).limit(4)
        const bestSeller2 =await  Product.find().skip(4).limit(4)
        const justIn1 =await  Product.find().skip(8).limit(4)
        const justIn2 =await  Product.find().skip(12).limit(4)
        const gifting1 =await  Product.find().skip(16).limit(4)
        const gifting2 =await  Product.find().skip(20).limit(4)
        const merch1 =await  Product.find().skip(24).limit(4)
        const merch2 =await  Product.find().skip(26).limit(4)

        res.status(200).json({
            bestSeller: {
              name: "BESTSELLERS",
              data: [
                bestSeller1,
                bestSeller2,
              ],
            },
            justIn: {
              name: "JUST-IN",
              data: [
                justIn1,
                justIn2,
              ],
            },
            newly: [
              "https://i.postimg.cc/sg65P8xn/ad.jpg",
              "https://i.postimg.cc/d1k9hhk6/ad2.jpg",
            ],
            gift: {
              name: "GIFTING",
              data: [
                gifting1,
                gifting2,
              ],
            },
            merch: {
              name: "MERCH STATION",
              data: [
                merch1,
                merch2,
              ],
            },
          })
    } catch (error) {
        console.log(error)
        res.status(500).json({"message": "Internal Error"})
    }
}

exports.getAllProducts = async(req, res)=>{
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({"message": "Internal Error"})
    }
}

exports.getProduct = async(req, res)=>{
    const {id} = req.params
    try {
        const product = await Product.findOne({_id: id})
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({"message": "product not found!"})
    }
}