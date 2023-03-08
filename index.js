const stripe = require('stripe')('sk_test_51Mh3nrSG2OBM7gGqYliQervsXmac5hUFnGL7QTvcMDGR660smHtvnX7ashBsvy21gC4Aq6hX4bPPwJ8fjwnj7SMJ00ksDhcser');
const express = require('express');
const path = require('path');

// require('./db/db');

const port = process.env.port || 8000;
const app = express();

const YOUR_DOMAIN = 'http://localhost:8000';


app.use(express.json());
app.use(express.urlencoded({extended: false}));
const staticPath = path.join(__dirname, "../client");
app.use(express.static(staticPath));

const img = path.join(__dirname, "/asset/whatsappPrivacy.jpg");




app.post("/payments", async (req,res) => {
    try {
        const data = req.body;
        console.log(data);

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "INR",
                        product_data: {
                            name: data.productName,
                        },
                        unit_amount: data.price * 100
                    },
                    quantity: 1,
                }
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success`,
            cancel_url: `${YOUR_DOMAIN}/cancel`,
          });

          console.log(session.payment_status);

        const result = {
            status: true,
            message: "Transition in progress!...",
            link: session.url
        }

        res.send(result);
    } catch (error) {
        const result = {
            status: false,
            message: "Something Went Wrong!...",
        }

        res.send(result);
    }
})

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,"../","client","index.html"));
})


if(process.env.NODE_ENV == 'production') {
    app.get('/',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','index.html'))
    })
} else {
    app.get('/', (req,res) => {
        res.send("rental backend");
    });
}


app.listen(port,() => {
    console.log("listening to port 8000");
})