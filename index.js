var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var request = require('request');
var https = require('https');
var firstName, middleName, lastName, ssnTaxId, dateOfBirth, homeAddrLn1, city, state, postalCode, primaryPhoneNumber, email, citizenshipCountry, employmentStatus, jobTitle, annualIncome, dataString;
var app = express();
var router = express.Router();
var access_token = "eyJlbmMiOiJBMTI4Q0JDX0hTMjU2IiwicGNrIjoxLCJhbGciOiJESVIiLCJraWQiOiJhN3EifQ..73uVKncrKBBcs6Ozcgs6sg.e0TswR6Ms5e0AV9WkdbDIdIEpj9H820KOE4q03L77PMzTx6lRxEWpViNisMSyQbS7Nm7QNq3ExgHg8op3qwLc-6D2KgundiorCF6g1pRGcSGtx7x3-BtUQCJU8EBzh6qU07ZbrgJFq1bkGbSLgPzXkf6mrYxFmhH5BqeccGdPfgcb10OlRqcCdAnMgqmFw_WUefP_YHSM30N-o19EUEhiA.mCXSR32qlmBrVmj_ZGN2UQ";

// Assemble the request message headers
var requestHeaders = {
    'Accept': 'application/json;v=1',
    'Authorization': 'Bearer ' + access_token,
    'Content-Type': 'application/json'
}
var options;
console.log(requestHeaders);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views/routes/'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('routes/index');
});

app.post('/submit', function (req, res) {

    firstName = req.body["first-name"];
    middleName = req.body["middle-name"];
    lastName = req.body["last-name"];
    ssnTaxId = req.body.ssn || req.body['tax-id'];
    dateOfBirth = moment(req.body.dob).format('MM/DD/YYYY');
    homeAddrLn1 = req.body["street-addr"].toString();
    city = req.body.city;
    state = req.body.state;
    postalCode = req.body["postal-code"];
    primaryPhoneNumber = req.body["primary-phone"];
    email = req.body.email;
    citizenshipCountry = req.body["citizenship-country"];
    employmentStatus = req.body["employment-status"];
    jobTitle = req.body["job-title"];
    annualIncome = req.body.income;
    dataString = { "applicants": [{ "applicantRole": "primary", "firstName": firstName, "lastName": lastName, "taxIdType": "SSN", "taxId": "000-00-0001", "dateOfBirth": dateOfBirth, "homeAddress": { "addressLine1": homeAddrLn1, "city": city, "stateCode": state, "postalCode": postalCode }, "primaryPhoneNumber": primaryPhoneNumber, "backupWithholding": false, "emailAddress": email, "citizenshipCountry": citizenshipCountry, "secondaryCitizenshipCountry": "CAN", "employmentStatus": employmentStatus, "jobTitle": jobTitle, "annualIncome": annualIncome }], "productId": "3000", "fundingDetails": { "fundingType": "fundach", "fundingAmount": 100.10, "externalAccountDetails": { "accountNumber": "123456", "bankABANumber": "000234456", "accountOwnership": "primary" } }, "termsAndConditions": { "acceptAccountDisclosures": true, "acceptPaperlessAgreement": true, "acceptFraudProtection": true } };
    options = {
        url: 'https://api-sandbox.capitalone.com/deposits/account-applications/',
        method: 'POST',
        port: 443,
        headers: requestHeaders,
        body: '{"applicants": [{"applicantRole": "primary","firstName": "John","lastName": "Smith","taxIdType": "SSN","taxId":"000-00-0001","dateOfBirth": "1986-01-01","homeAddress": {"addressLine1": "000 Main St","city": "Richmond","stateCode": "VA","postalCode": "00000"},"primaryPhoneNumber": "1111111111","backupWithholding":false,"emailAddress": "email@capitalone.com","citizenshipCountry": "USA","secondaryCitizenshipCountry": "CAN","employmentStatus" : "Employed","jobTitle" : "Branch Manager","annualIncome": 75000}],"productId": "3000","fundingDetails": {"fundingType": "fundach","fundingAmount": 100.10,"externalAccountDetails": {"accountNumber": "123456","bankABANumber": "000234456","accountOwnership": "primary"}},"termsAndConditions": {"acceptAccountDisclosures": true,"acceptPaperlessAgreement": true,"acceptFraudProtection": true}}'
    };
    request(options, function callback(error, response, body) {
        
        console.log(body);
    });
    
    res.render('routes/submitted', {
        firstName: firstName
    })
});








app.listen(8888);

console.log("Live on http://localhost:8888");