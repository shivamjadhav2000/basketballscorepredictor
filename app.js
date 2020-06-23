let express=require("express")
let app=express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static("public"))
app.set('views','views')
app.set('view engine','ejs')

const usersCollection=require('./db').collection("users")

app.get("/",(req,res)=>{
res.render("index.ejs") 
  
})

app.post("/MYSCORE",(req,res)=>{

    data=[
        [  6.8  , 225.   ,   0.442,   0.672,   9.2  ],
           [  6.3  , 180.   ,   0.435,   0.797,  11.7  ],
           [  6.4  , 190.   ,   0.456,   0.761,  15.8  ],
           [  6.2  , 180.   ,   0.416,   0.651,   8.6  ],
           [  6.9  , 205.   ,   0.449,   0.9  ,  23.2  ],
           [  6.4  , 225.   ,   0.431,   0.78 ,  27.4  ],
           [  6.3  , 185.   ,   0.487,   0.771,   9.3  ],
           [  6.8  , 235.   ,   0.469,   0.75 ,  16.   ],
           [  6.9  , 235.   ,   0.435,   0.818,   4.7  ],
           [  6.7  , 210.   ,   0.48 ,   0.825,  12.5  ],
           [  6.9  , 245.   ,   0.516,   0.632,  20.1  ],
           [  6.9  , 245.   ,   0.493,   0.757,   9.1  ],
           [  6.3  , 185.   ,   0.374,   0.709,   8.1  ],
           [  6.1  , 185.   ,   0.424,   0.782,   8.6  ],
           [  6.2  , 180.   ,   0.441,   0.775,  20.3  ],
           [  6.8  , 220.   ,   0.503,   0.88 ,  25.   ],
           [  6.5  , 194.   ,   0.503,   0.833,  19.2  ],
           [  7.6  , 225.   ,   0.425,   0.571,   3.3  ],
           [  6.3  , 210.   ,   0.371,   0.816,  11.2  ],
           [  7.1  , 240.   ,   0.504,   0.714,  10.5  ],
           [  6.8  , 225.   ,   0.4  ,   0.765,  10.1  ],
           [  7.3  , 263.   ,   0.482,   0.655,   7.2  ],
           [  6.4  , 210      ,0.475   ,0.244 ,13.6],
           [  6.8,   235.   ,   0.428  , 0.728 ,  9.   ],
           [  7.2 ,  230.    ,  0.559  , 0.721 , 24.6  ],
           [  6.4  , 190.     , 0.441  , 0.757 , 12.6  ],
           [  6.6  , 220.  ,    0.492  , 0.747 ,  5.6  ],
           [  6.8  , 210. ,     0.402  , 0.739 ,  8.7  ],
           [  6.1  , 180.  ,    0.415  , 0.713 ,  7.7  ], 
           [  6.5  , 235.   ,   0.492  , 0.742 , 24.1  ],
           [  6.4  , 185.    ,  0.484  , 0.861 , 11.7  ],
           [  6   , 175.     , 0.387  , 0.721 ,  7.7  ],
           [  6   , 192.      ,0.436  , 0.785 ,  9.6  ], 
           [  7.3  , 263. ,     0.482  , 0.655 ,  7.2  ],
           [  6.1  , 180.  ,    0.34   , 0.821 , 12.3  ],
           [  6.7  , 240.  ,    0.516  , 0.728 ,  8.9  ],
           [  6.4  , 210.   ,   0.475  , 0.846 , 13.6  ],
           [  5.8  , 160.   ,   0.412  , 0.813 , 11.2  ],
           [  6.9  , 230.  ,    0.411  , 0.595 ,  2.8  ],
           [  7   , 245.  ,    0.407  , 0.573 ,  3.2  ],
           [  7.3  , 228.  ,    0.445  , 0.726 ,  9.4  ],
           [  5.9  , 155.  ,    0.291  , 0.707  ,11.9  ],
           [  6.2  , 200.  ,    0.449  , 0.804  ,15.4  ], 
           [  6.8  , 235.  ,    0.546  , 0.784  , 7.4  ],
           [  7  , 235  ,    0.48   , 0.744  ,18.9  ],
           [  5.9  , 105.  ,    0.359  , 0.839  , 7.9  ],
           [  6.1  , 180.  ,    0.528  , 0.79   ,12.2  ],
           [  5.7  , 185.  ,    0.352   ,0.701  ,11.   ],
           [  7.1  , 245.  ,    0.414   ,0.778  , 2.8  ],
           [  5.8  , 180.  ,    0.425   ,0.872  ,11.8  ],
           [  7.4  , 240.  ,    0.599   ,0.713  ,17.1  ],
           [  6.8  , 225.   ,   0.482   ,0.701  ,11.6  ],
           [  6.8  , 215.   ,   0.457   ,0.734  , 5.8  ],
           [  7   , 230.   ,   0.435   ,0.764  , 8.3  ]] 


    function regression(datas) {
        // f(x_0, x_1 ... x_n) = const + (a_0)(x_0) + (a_1)(x_1) + ... + (a_n)(x_n);
    
        const coefficientses = [];
        const constants = [];
        const datasNumber = datas.length;
        const varNumber = datas[0].length - 1;
    
        { //const
            const coefficients = [datas.length];
            for(let n = 0; n < varNumber; n++) {
                let sum = 0;
                for(let j = 0; j < datasNumber; j++) {
                    sum += datas[j][n];
                }
                coefficients.push(sum);
            }
            coefficientses.push(coefficients);
    
            let constant = 0;
            for(let j = 0; j < datasNumber; j++) {
                constant += datas[j][varNumber];
            }
            constants.push(constant);
        }
    
        { //a_0, a_1 ...
            for(let z = 0; z < varNumber; z++) { //a_z
                const coefficients = [];
        
                let a_0 = 0;
                for(let j = 0; j < datasNumber; j++) {
                    a_0 += datas[j][z];
                }
                coefficients.push(a_0);
    
                for(let n = 0; n < varNumber; n++) {
                    let sum = 0;
                    for(let j = 0; j < datasNumber; j++) {
                        sum += datas[j][z] * datas[j][n];
                    }
                    coefficients.push(sum);
                }
                coefficientses.push(coefficients);
    
                let constant = 0;
                for(let j = 0; j < datasNumber; j++) {
                    constant += datas[j][varNumber] * datas[j][z];
                }
                constants.push(constant);
            }
        }
    
        //gauss
        for(let i = 0; i <= varNumber; i++) {
            const coefficients = coefficientses[i];
    
            const divideBy = coefficients[i];
            for(let j = 0; j <= varNumber; j++) {
                coefficients[j] /= divideBy;
            }
            constants[i] /= divideBy;
    
            for(let j = 0; j < i; j++) {
                const coefficients_j = coefficientses[j];
    
                const multiplyBy = coefficients_j[i];
                for(let k = 0; k <= varNumber; k++) {
                    coefficients_j[k] -= coefficients[k] * multiplyBy;
                }
                constants[j] -= constants[i] * multiplyBy;
            }
            for(let j = i + 1; j <= varNumber; j++) {
                const coefficients_j = coefficientses[j];
    
                const multiplyBy = coefficients_j[i];
                for(let k = 0; k <= varNumber; k++) {
                    coefficients_j[k] -= coefficients[k] * multiplyBy;
                }
                constants[j] -= constants[i] * multiplyBy;
            }
        }
    
        return constants;
    }
    req.body.Name=req.body.Name.trim()
   if(Number(req.body.Name)){
       req.body.Name=""
   }
   let user={}
   if(req.body.Name.length){
       user={
           Name:req.body.Name,
           height:parseFloat(req.body.height),
       
           weight:Number(req.body.weight*2.2046226218),
           successfield:req.body.successfields,
           successfree:req.body.successfree,
}
   }
   else{
    user={
    height:parseFloat(req.body.height),
  
    weight:Number(req.body.weight*2.2046226218),
    successfield:req.body.successfields,
    successfree:req.body.successfree,
}
}

    let coeff=regression(data)
    li=""
    if(user.height<5 || user.weight<60 || user.successfield<10 || user.successfree<10 ){
        li=li+"0"
    }else if(isNaN(user.height) || isNaN(user.weight) || isNaN(user.successfield) || isNaN(user.successfree)){
        li=li+"ONLY INTEGER IS ACCEPTED!!"
    
    }
    else if(user.height.length==0 || user.weight.length==0 || user.successfree.length==0 ||user.successfield.length==0){
        li=li+"MUST ENTER THE INPUT FIELDS!!"
    }
    else if(user.weight>=350){
        li=li+"MUST ENTER A VALID WEIGHT!!"
    }
    else {
        li=coeff[1]*user.height+coeff[2]*user.weight+coeff[3]*(Number(user.successfield)/100)+coeff[4]*(Number(user.successfree)/100)+coeff[0]+3
        li=Number((li).toFixed(0))
    }

    let img="/sad.PNG"
    if (li>0 && li<8){
        img="/avg.PNG"
    } else if(li>8){
        img="/good.PNG"
    }  
    
   
if(isNaN(li)){

res.send(`<!DOCTYPE HTML>

<html>
<head>
    <link rel="stylesheet" href="/style.css">
 </head>
<body>
<header style="text-align: center; color:rgba(255, 255, 255, 0.87)"><h1>BasketBall Score Predictor</h1></header>

    <div class="lay">
 <div>  
   
<form id="frm" action="/pred" method="POST">
<input class="ipt" type="text" placeholder="name(optional)" name="Name" maxlength="20" autocomplete="off"><br>
     
<input class="ipt" type="text" placeholder="height in ft" name="height" maxlength="3" autocomplete="off" required><br>
<input class="ipt" type="text" placeholder="weight" name="weight" maxlength="3" onkeypress='return event.charCode >= 48 && event.charCode <= 57' autocomplete="off" required><br>
<input class="ipt" type="text"  placeholder="total feild baskets made/(100)" name="successfields" maxlength="3" onkeypress='return event.charCode >= 48 && event.charCode <= 57' autocomplete="off" required><br>
<input class="ipt" type="text"   placeholder="total freethrows made/(100)" name="successfree" maxlength="2" onkeypress='return event.charCode >= 48 && event.charCode <= 57' autocomplete="off" required><br>

    <button id="btn">PREDICT</button>
</form></div>
<div class="opt">

<img id="imgg" src="nba.png" width="150">
 
<h2 id="target">${li}<h2>

</div></div>
</body>
<style>
.opt{
    visibility: visible;
}
</style>
<footer style="text-align: right;">

&copy;2020 developed by Shivam Jadhav
</footer>
</html>`)}
else{
    
usersCollection.insertOne(user)
    res.send(`<!DOCTYPE HTML>

    <html>
    <head>
        <link rel="stylesheet" href="/style.css">
       </head>
    <body>
    <header style="text-align: center;color:rgba(255, 255, 255, 0.87)"><h1>BasketBall Score Predictor</h1></header>

        <div class="lay">
     <div>   
   
     <form id="frm" action="/MYSCORE" method="POST">
    <input class="ipt" type="text" placeholder="name(optional)" name="Name" maxlength="20" autocomplete="off"><br>
    
    <input class="ipt" type="text" placeholder="height in ft" name="height" maxlength="3" autocomplete="off" required><br>
    <input class="ipt" type="text" placeholder="weight" name="weight" maxlength="3" onkeypress='return event.charCode >= 48 && event.charCode <= 57' autocomplete="off" required><br>
    <input class="ipt" type="text"  placeholder="total feild baskets made/(100)" name="successfields" maxlength="3" onkeypress='return event.charCode >= 48 && event.charCode <= 57' autocomplete="off" required><br>
    <input class="ipt" type="text"   placeholder="total freethrows made/(100)" name="successfree" maxlength="2" onkeypress='return event.charCode >= 48 && event.charCode <= 57' autocomplete="off" required><br>
    
        <button id="btn">PREDICT</button>
    </form></div>
    <div class="opt">
    <h1 style="color:rgba(243, 175, 72, 0.589)">YOUR PREDICTED SCORE IS</h1>
<img id="imgg" src="nba.png" width="150">
    <h1 id="target">${li}<h1>
    
    </div></div>
    </body>
    <style>

    .lay{
        display:grid;
        grid-template-columns: 50% 50%;
    
    }
    #frm{
        margin:17% 25%;
    }
    .opt{
        visibility: visible;
    }
    </style>
    <footer style="text-align: right;">

    &copy;2020 developed by Shivam Jadhav
</footer>
    </html>`)

}

})
module.exports=app