# Evidence Management System

Evidence Management System based on Hyperledger Sawtooth using IPFS with PBFT or PoET Consensus mechanism.

**Note**: This repository consist only the code for the Evidence Management System's React web client.

**Check out the Transaction Processor code and Full Documentation [here](https://github.com/Shritesh99/Evidence-Management-System)**

![arch](/img/arch.png)

### Signing

**Module:** [src/services/signing.js](src/services/signing.js)

Sawtooth use Secp256k1 for signing.

**Useful APIs:**

-    [secp256k1-node](https://github.com/cryptocoinjs/secp256k1-node#usage)
-    [Buffer.from](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_string_encoding)
-    [Buffer.toString](https://nodejs.org/api/buffer.html#buffer_buf_tostring_encoding_start_end)

Signatures form the basis for verifiable identity and correctness on most, if
not all, blockchains. First, a _private key_ is generated; it's basically just
a random set of bytes. This key is kept secret. Next, a cryptographic algorithm
uses these bytes to derive a _public key_ which can be widely shared. Finally,
a _signature_ is generated by combining the private key with some message. This
signature, the message, and the public key are then all distributed together.

```
private key             message    private key
    |                         \     /
    v                          v   v
public key                   signature
```

While others won't ever be able to deduce the original private key, they will be
able to confirm that the public key and signature came from the _same_ private
key and that the message was not altered. Not even a single byte. This
powerful cryptographic tool is fundamental to how blockchains work.

```
public key -
             \
 signature - - - > ???
             /
   message -
```

A simple signing API is built using Secp256k1, a common
cryptographic algorithm used by Bitcoin, Ethereum, and Hyperledger Sawtooth.
It will be relying on the library [secp256k1-node](https://github.com/cryptocoinjs/secp256k1-node).

Note that this library uses [Node Buffers](https://nodejs.org/api/buffer.html)
(basically raw bytes) as the format of choice for keys and signatures. One of
the things to do is to convert these bytes to and from hex strings.
Make sure you are familiar with Buffer's `from` and `toString` methods.

### Web flow

**To be added soon**

### Screenshots

#### Login Page

<p align="center">
    <img src="/img/login.png" />
</p>

#### Register Page

<p align="center">
    <img src="/img/register.png" />
</p>

#### Generated Keys

<p align="center">
    <img src="/img/register_genetrated.png" />
</p>

#### Create Evidence Page

<p align="center">
    <img src="/img/submit.png" />
</p>

#### List of Evidences Page

<p align="center">
    <img src="/img/list.png" />
</p>

### Folder Structure

```
EvidenceManagement-frontend/
    ├── README.md
    ├── node_modules/
    ├── public/
    ├── img/
    └── src/
        ├── components/
        ├── pages/
        ├── services/
        ├── App.js
        └── index.js
```

### Local development

**Requirements and dependencies**:

-    Node >= v10.\*
-    Npm >= v6.\*
-    React >= v16.\*
-    [sawtooth-sdk](https://github.com/hyperledger/sawtooth-sdk-javascript) >= v1.0.\*
-    [ipfs-http-client](https://github.com/ipfs/js-ipfs/)
-    [axios](https://github.com/axios/axios)
-    [tachyons](https://github.com/tachyons-css/tachyons)
-    [react-table](https://react-table.tanstack.com/)

**Installation:**

1. Clone the repository

```
git clone https://github.com/amanag7/EvidenceManagement-frontend.git
```

2. Change Directory

```
cd EvidenceManagement-frontend
```

3. npm install

```
npm i
```

4. Run the application

```
npm start
```

5. Building the application

```
npm run build:prod
```

### License

```
MIT
```
