const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
// const https = require("https");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({
    extended: true
}));

app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on port 3000.");
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
    apiKey: "3e5bb394618a0a62c83decb7fed251de-us12",
    server: "us12",
});

// run();

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const listId = "4dda124658";

    const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
    };

    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });
        
        res.sendFile(__dirname + "/success.html");
        console.log(
            `Successfully added contact as an audience member. The contact's id is ${
              response.id
            }.`
        );
    }

    run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.post("/failure",function(req,res){
  res.redirect("/")
});


//API Key
//3e5bb394618a0a62c83decb7fed251de-us12

//Audience
//4dda124658