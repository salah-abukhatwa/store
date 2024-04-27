const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51P55q5Jj6bjZair1qxeNyjxHqVFJMXCXyuo65Hd5A0c9mwtqV8VRzN7v2GQnWtbiEj8l7LvuFgk4OlclZEdLuowI00PeerWNCc"
);

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

app.post("/checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.product],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:4242/success.html",
      cancel_url: "http://localhost:4242/cancel.html",
    });

    res.redirect(303, session.url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(4242, () => {
  console.log("Server running on port 4242");
});
