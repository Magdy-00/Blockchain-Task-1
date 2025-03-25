"use strict";

let blindSignatures = require('blind-signatures');

let SpyAgency = require('./spyAgency.js').SpyAgency;

function makeDocument(coverName) {
  return `The bearer of this signed document, ${coverName}, has full diplomatic immunity.`;
}

function blind(msg, n, e) {
  return blindSignatures.blind({
    message: msg,
    N: n,
    E: e,
  });
}

function unblind(blindingFactor, sig, n) {
  return blindSignatures.unblind({
    signed: sig,
    N: n,
    r: blindingFactor,
  });
}

let agency = new SpyAgency();

const coverNames = [
  'Agent Smith', 
  'Jane Doe', 
  'John Carter', 
  'Elena Rodriguez', 
  'Michael Wong', 
  'Sarah Thompson', 
  'David Kim', 
  'Anna Petrova', 
  'Carlos Mendez', 
  'Emma Johnson'
];

const documents = coverNames.map(name => makeDocument(name));
const blindedDocs = [];
const blindingFactors = [];
const originalMessages = [];

documents.forEach(doc => {
  const { blinded, r } = blind(doc, agency.n, agency.e);
  blindedDocs.push(blinded);
  blindingFactors.push(r);
  originalMessages.push(doc);
});

agency.signDocument(blindedDocs, (selected, verifyAndSign) => {

  const preparedBlindingFactors = blindingFactors.map((factor, index) => 
    index === selected ? undefined : factor
  );
  
  const preparedOriginalMessages = originalMessages.map((msg, index) => 
    index === selected ? undefined : msg
  );


  const blindedSignatures = verifyAndSign(
    preparedBlindingFactors, 
    preparedOriginalMessages
  );


  const signature = unblind(
    blindingFactors[selected], 
    blindedSignatures[selected], 
    agency.n
  );


  const isValid = blindSignatures.verify({
    unblinded: signature,
    message: documents[selected],
    N: agency.n,
    E: agency.e
  });

  if (isValid) {
    console.log(`Diplomatic document for ${coverNames[selected]} successfully signed and verified!`);
    console.log(`Document: ${documents[selected]}`);
    console.log(`Signature: ${signature}`);
  } else {
    console.error('Signature verification failed!');
  }
});