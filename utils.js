const { envelopes } = require('./data');

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
        return Error('Error: Updated envelope must have a valid name and amount')
    }
    let index = findEnvelope(id);
    if(index == -1){
        return Error('Error: Id not found');
    }
    newEnvelope.id = id;
    envelopes.array[index] = newEnvelope;
    return newEnvelope;
}

const addEnvelope = newEnvelope => {
    if(typeof newEnvelope.name != 'string' || newEnvelope.amount <= 0) {
        return Error('Error: New envelope must have a valid name and amount');
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
        return Error('Error: Id not found');
    }
    envelopes.array.splice(index, 1);
    return temp;
}

module.exports = {
    updateEnvelope, addEnvelope, deleteEnvelope
};