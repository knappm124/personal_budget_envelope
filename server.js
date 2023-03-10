const express = require('express');
const bodyParser = require('body-Parser');
const app = express();

const{ getAllEnvelopes, getEnvelope, updateEnvelope, addEnvelope, deleteEnvelope, payFromEnvelope, transfer } = require('./utils');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/envelopes', (req, res) => {
    let array = getAllEnvelopes();
    res.status(200).send({envelopes: array});
});

app.get('/envelopes/:envelopeId', (req, res) => {
    let tempId = req.params.envelopeId;
    let result = getEnvelope(tempId);
    if(result instanceof Error){
        res.status(404).send();
    }
    res.status(200).send({envelope: result});
})

app.post('/envelopes', (req, res) => {
    let tempEnvelope = {name: req.query.name, amount: req.query.amount};
    let result = addEnvelope(tempEnvelope);
    if(result instanceof Error){
        res.status(400).send();
    } else {
        res.status(201).send({envelope: result});
    }
});

app.put('/envelopes/:envelopeId', (req, res) => {
    let tempId = req.params.envelopeId;
    let result = updateEnvelope(tempId, req.body.envelope);
    if(result instanceof Error){
        res.status(400).send();
    }
    res.status(200).send(result);
});

app.put('/envelopes/pay/:envelopeId', (req, res) => {
    let tempId = req.params.envelopeId;
    let result = payFromEnvelope(tempId, req.body.payAmount);
    if(result instanceof Error){
        res.status(400).send();
    }
    res.status(200).send(result);
});

app.put('/envelopes/transfer/:fromId/:toId', (req, res) => {
    let fromId = req.params.fromId;
    let toId = req.params.toId;
    let transferAmount = req.body.transferAmount;
    let result = transfer(fromId, toId, transferAmount);
    if(result instanceof Error){
        res.status(400).send();
    }
    res.status(200).send({envelopes: result});
})

app.delete('/envelopes/:envelopeId', (req, res) => {
    let tempId = req.params.envelopeId;
    let result = deleteEnvelope(tempId);
    if(result instanceof Error){
        res.status(404).send();
    }
    res.status(204).send({ envelope: result});    
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});