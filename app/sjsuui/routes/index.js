const path = require('path');
const uuid = require('uuid');
const express = require('express');
const prettyStringify = require('json-stringify-pretty-compact');
const router = express.Router();
const indy = require('../../indy/index');
const config = require('../../config');
const messageParsers = require('../messageParsers');
const auth = require('../authentication');
const messageTypes = {
    connections: indy.connections.MESSAGE_TYPES,
    credentials: indy.credentials.MESSAGE_TYPES,
    proofs: indy.proofs.MESSAGE_TYPES
};

const THEME = process.env["THEME"] || "black"

/* GET home page. */
router.get('/', auth.isLoggedIn, async function (req, res) {
    // res.sendFile(path.join(__dirname + '/../views/index.html'));
    let rawMessages = indy.store.messages.getAll();
    let messages = [];
    for (let message of rawMessages) {
        if (messageParsers[message.message.type]) {
            messages.push(await messageParsers[message.message.type](message));
        } else {
            messages.push(message);
        }
    }

    let proofRequests = await indy.proofs.getProofRequests(true);
    for(let prKey of Object.keys(proofRequests)) {
        proofRequests[prKey].string = prettyStringify(proofRequests[prKey]);
    }

    let credentials = await indy.credentials.getAll();
    let relationships = await indy.pairwise.getAll();

    res.render('index', {
        messages: messages,
        messageTypes: messageTypes,
        relationships: relationships,
        credentials: credentials,
        schemas: await indy.issuer.getSchemas(),
        credentialDefinitions: await indy.did.getEndpointDidAttribute('credential_definitions'),
        endpointDid: await indy.did.getEndpointDid(),
        proofRequests: proofRequests,
        name: config.userInformation.name,
        srcId: config.userInformation.icon_src,
        theme: THEME
    });

    for(let prKey of Object.keys(proofRequests)) {
        delete proofRequests[prKey].string;
    }
});

router.get('/login', function(req, res) {
   res.render('login', {
       name: config.userInformation.name
   });
});

router.post('/login', async function(req, res) {
    if(req.body.username === config.userInformation.username &&
    req.body.password === config.userInformation.password) {
        let token = uuid();
        req.session.token = token;
        req.session.save((err) => {
            auth.validTokens.push(token);
            res.redirect('/');
        });
    } else {
        res.redirect('/login?msg=Authentication Failed. Please try again.');
    }
});

router.get('/logout', async function(req, res, next) {
    for(let i = 0; i < auth.validTokens.length; i++) {
        if(auth.validTokens[i] === req.session.token) {
            auth.validTokens.splice(i, 1);
        }
    }
    req.session.destroy(function(err) {
        if(err) {
            console.error(err);
        } else {
            auth.session = null;
            res.redirect('/login');
        }
    });
});

module.exports = router;





const express = require('express');
const router = express.Router();
const indy = require('../../indy/index');
const auth = require('../authentication');

router.get('/', function (req, res, next) {
    res.send("Success");
});

router.post('/send_message', auth.isLoggedIn, async function (req, res) {
    let message = JSON.parse(req.body.message);
    message.did = req.body.did;

    await indy.crypto.sendAnonCryptedMessage(req.body.did, message);
    res.redirect('/#messages');
});

router.post('/send_connection_request', auth.isLoggedIn, async function (req, res) {
    let theirEndpointDid = req.body.did;
    let connectionRequest = await indy.connections.prepareRequest(theirEndpointDid);

    await indy.crypto.sendAnonCryptedMessage(theirEndpointDid, connectionRequest);
    res.redirect('/#relationships');
});

router.post('/issuer/create_schema', auth.isLoggedIn, async function (req, res) {
    await indy.issuer.createSchema(req.body.name_of_schema, req.body.version, req.body.attributes);
    res.redirect('/#issuing');
});

router.post('/issuer/create_cred_def', auth.isLoggedIn, async function (req, res) {
    await indy.issuer.createCredDef(req.body.schema_id, req.body.tag);
    res.redirect('/#issuing');
});

router.post('/issuer/send_credential_offer', auth.isLoggedIn, async function (req, res) {
    await indy.credentials.sendOffer(req.body.their_relationship_did, req.body.cred_def_id);
    res.redirect('/#issuing');
});

router.post('/credentials/accept_offer', auth.isLoggedIn, async function(req, res) {
    let message = indy.store.messages.getMessage(req.body.messageId);
    indy.store.messages.deleteMessage(req.body.messageId);
    await indy.credentials.sendRequest(message.message.origin, message.message.message);
    res.redirect('/#messages');
});

router.post('/credentials/reject_offer', auth.isLoggedIn, async function(req, res) {
    indy.store.messages.deleteMessage(req.body.messageId);
    res.redirect('/');
});

router.put('/connections/request', auth.isLoggedIn, async function (req, res) {
    let name = req.body.name;
    let messageId = req.body.messageId;
    let message = indy.store.messages.getMessage(messageId);
    indy.store.messages.deleteMessage(messageId);
    await indy.connections.acceptRequest(name, message.message.message.endpointDid, message.message.message.did, message.message.message.nonce);
    res.redirect('/#relationships');
});

router.delete('/connections/request', auth.isLoggedIn, async function (req, res) {
    // FIXME: Are we actually passing in the messageId yet?
    if (req.body.messageId) {
        indy.store.messages.deleteMessage(req.body.messageId);
    }
    res.redirect('/#relationships');
});

router.post('/messages/delete', auth.isLoggedIn, function(req, res) {
    indy.store.messages.deleteMessage(req.body.messageId);
    res.redirect('/#messages');
});

router.post('/proofs/accept', auth.isLoggedIn, async function(req, res) {
        await indy.proofs.acceptRequest(req.body.messageId);
        res.redirect('/#messages');
});

router.post('/proofs/send_request', auth.isLoggedIn, async function(req, res) {
    let myDid = await indy.pairwise.getMyDid(req.body.their_relationship_did);
    await indy.proofs.sendRequest(myDid, req.body.their_relationship_did, req.body.proof_request_id, req.body.manual_entry);
    res.redirect('/#proofs');
});

router.post('/proofs/validate', auth.isLoggedIn, async function(req, res) {
    try {
        let proof = req.body;
        if (await indy.proofs.validate(proof)) {
            res.status(200).send();
        } else {
            res.status(400).send();
        }
    } catch(err) {
        res.status(500).send();
    }
});

module.exports = router;