const { envelopes } = require('./data');

const getAllEnvelopes = () => {
    return envelopes.array;
}

const getEnvelope = id => {
    let index = findEnvelope(id);
    if(id == -1){
        return Error('Id not found');
    }
    return envelopes.array[index];
}

const findEnvelope = id => {
    for(let i = 0; i < envelopes.array.length; i++){
        if(envelopes.array[i].id == id){
            return i;
        }
    }
    return -1;
}

const updateEnvelope = (id, newEnvelope) => {
    if(typeof newEnvelope.name != 'string' || newEnvelope.amount <= 0) {
        return Error('Updated envelope must have a valid name and amount')
    }
    let index = findEnvelope(id);
    if(index == -1){
        return Error('Id not found');
    }
    newEnvelope.id = id;
    envelopes.array[index] = newEnvelope;
    return newEnvelope;
}

const addEnvelope = newEnvelope => {
   if(typeof newEnvelope.name != 'string' || newEnvelope.amount <= 0) {
        return Error('New envelope must have a valid name and amount');
    }
    newEnvelope.id = envelopes.nextId;
    envelopes.array.push(newEnvelope);
    envelopes.nextId += 1;
    return envelopes.array;
}

const deleteEnvelope = id => {
    let index = findEnvelope(id);
    let temp = envelopes.array[index];
    if(index == -1){
        return Error('Id not found');
    }
    envelopes.array.splice(index, 1);
    return temp;
}

const payFromEnvelope = (id, amount) => {
    let index = findEnvelope(id);
    if(index == -1){
        return Error('Id not found');
    }
    if(amount <= 0 || amount > envelopes.array[index].amount){
        return Error('Invalid amount to pay from this envelope');
    }
    envelopes.array[index].amount -= amount;
    return envelopes.array[index];
}

const transfer = (envelope1, envelope2, transferAmount) => {
    if(transferAmount <= 0){
        return Error('Amount transfered must be greater than zero');
    }
    let index1 = findEnvelope(envelope1);
    let index2 = findEnvelope(envelope2);
    envelopes.array[index1].amount -= transferAmount;
    envelopes.array[index2].amount += transferAmount;
    return envelopes.array;
}

module.exports = {
    getAllEnvelopes, getEnvelope, updateEnvelope, addEnvelope, deleteEnvelope, payFromEnvelope, transfer
};