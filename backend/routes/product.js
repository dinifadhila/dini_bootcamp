const express = require ("express");
const Product = require ("../models/product");
const cart = require("../models/cart")
const router = express.Router();


module.exports = function(){


router.post("/img", (req,res) => {

    
    if (!req.files.profile) {
        return res.status(400).send("No files were uploaded");
    }

    let image = req.files.profile;

    let date = new Date ();
    let imageName = date.getTime() + ".png"

    image.mv("./public/profile/" + imageName, (error) => {

        if (error) return res.status(500).send(error);

        let newObj = new Product({
            name : req.body.name,
            price : req.body.price,
            profile : "http://localhost:3000/profile/" + imageName
        });

        newObj.save((error) => {
            if (error) {
                res.status(500).send(error);
            }
            else{
                res.json(newObj);
            }
        });
    });
    
});

router.get("/", (req, res) => {
    
    Product.find({}, (error, result) => {
        if(error){
            res.status(500).json(error);
        }
        else{
            res.json(result)
        }
    });
});

router.get("/:id", (req,res) => {

    Product.findById(req.params.id, (error, result) => {
        if(error){
            res.statusCode(500).json(error);
        }
        else{
            res.json(result)
        }
    });

});

root.post("/cart/:id",(req,res)=>{
    pro.findById(req.params.id,(mai,result)=>{
        if(mai)res.status(500).send(mai);
        else{

                    cart.find({},(carterror,cartresult)=>{
                    if(carterror)res.send(carterror);
                    else {
                        if(cartresult.length==0){
                    
                            newObj = new cart({
                                ProductId:result._id,
                                ProductName:result.Nama,
                                Picture:result.Gambar,
                                Price:result.Harga,
                                Quantity:1,
                            })
                            newObj.save((error)=>{
                                if(error)res.send(error)
                                else console.log(newObj._id);res.json(newObj);
                            })
                            }else{
                            for(j=0;j<cartresult.length;j++){
                                if(cartresult[j].ProductId==result._id){

                                    Obj={
                                        ProductId:cartresult[j].ProductId,
                                        ProductName:cartresult[j].ProductName,
                                        Picture:cartresult[j].Picture,
                                        Price:cartresult[j].Price,
                                        Quantity:cartresult[j].Quantity+1
                                    }
                                    console.log(Obj.Quantity)
                                    cart.findOneAndUpdate({ProductId:result._id},Obj,(updateerror,updateresult)=>{
                                        if(updateerror) res.send(updateerror);
                                        else res.json(updateresult)
                                    })
                                }
                                else if(cartresult[j].ProductId==result._id&&j==cartresult.length-1){
                                    console.log(cartresult[j].Product._id)
                                    console.log(result._id)
                                newObj = new cart({
                                    ProductId:result._id,
                                    ProductName:result.Nama,
                                    Picture:result.Gambar,
                                    Price:result.Harga,
                                    Quantity:1,
                                })
                                newObj.save((error)=>{
                                    if(error)res.send(error)
                                    else res.json(newObj)
                                        })
                                    }
                                }
                            }
                        }
                    })            
            }
        })
})
root.get("/cart",(req,res)=>{
    cart.find({},(err,result)=>{
        if(err)res.json(err)
        else res.json(result)
    })
})

   

return router;

};