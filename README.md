
# EduBlocks - A Decentralized Digital Identity Management System platform
EduBlocks is a blockchain based custom built for the education sector that students, universities, government agencies can use to issue and verify credentials like transcripts, test scores, certifications, etc.

## Background:

International students applying to a  university go through a long and painful process of getting the required credentials from various issuing authorities/intermediaries like below to apply.

1. School to obtain transcripts,
2. ETS (for GRE/TOEFL tests), 
3. WES (for evaluating transcripts), 
4. Bank (for providing financial eligibility statement) 

This process takes months and students have to produce their personal identifiable information (PII) data every time to each of authorities. Also, these authorities additionally request students to provide proof of identity to provide the service. The student's identity is replicated across the intermediaries centralized systems. This data is now not only vulnerable to potential information threats, but also potential misuse by the agencies themselves to further their own business interests. With a decentralized blockchain solution, there's no need for any of the authorities to collect and store personal and identity data. Students will own their data and will only provide access to minimum required data that each of the intermediary requires to provide their service. Once approved, the credential is then added to the students wallet. Since adding credentials would be transactions on the blockchain, they are verified and therefore can be trusted by all authorities. It also makes data more secured and transparent to all parties involved. The student can then present the verified credentials along with application form to the university thereby enabling them to make a faster decision.

## Project Overview:
<a href="https://github.com/SJSU272LabF18/Project-Team-14/blob/master/docs/Edublocks%20-%20Project%20Report.pdf">EduBlocks Platform</a> 

## Project Team: 
--------------
1. Akhilesh Anand 
2. Jasmine Dhunna 
3. Sanjay Nag Bangalore Ravishankar
4. Vishwanath Manvi
                        
## Getting Started
Download and install Docker before proceeding.

Clone the repository and Navigate to the app folder on your terminal. Then Run the Following Commands.

```
./manage build
```
 Let the application build, then 

```
./manage up
```

The Application is now has 4 clients running on

1. Student: http://localhost:3000 .   Username: akhilesh, Password:123
1. Amrita College: http://localhost:3002 .    Username: amrita, Password:123
1. ETS: http://localhost:3003 .       Username: ets, Password:123
1. San Jose State University: http://localhost:3004 .      Username: sjsu, Password:123


## Using The Application

### Establishing a Connection
To establish a connection, Copy the *EndpointDID* **of the Person you want to connect to**, you can find this on the top right of the Navigation Toolbar into the dialog that opens when you hit create a connection, In the *connections* Tab, 

When a connection Request is sent both , recipient and sender recieve a  message (Can be Viewed on Mesage Tab) to agree to Share Their Names with each other. This establishes a trust relationship between the two, as the name being shared is from a verifiable credential issued to both of them by the government (In case of the Student, it could be construed as an SSN and in case of the institution, a government licesnce).

<div align="center">
    <img src="https://github.com/SJSU272LabF18/Project-Team-14/blob/master/screenshots/Connection1.png" </img> 
</div>

<br><br>

<div align="center">
    <img src="https://github.com/SJSU272LabF18/Project-Team-14/blob/master/screenshots/Connection2%20.png" </img> 
</div>

<br><br>


### Issuing a Crendential
This can be done only after establishing a connection as detailed in the step above.

A credential can be offered by any institution. In order to issue a credential, the client should create a schema of the credential that they intend to offer. With this schema, a credential defenition is created. 

Typically, the above two actions are done onetime and the credential defenition can be reused to offer up as many credentials as the instituition wants.

To offer the credential, the instituion clubs the details of the student (stored in its own private database) along with the credential defention and sends it. 

The Student wil now have recieved a credential offer on his messages tab and when accepted , it can be viewed as a credential on the wallet.Just  like the government ID, This credential can also be used to verify the identity of the entity possesing the credential.

<div align="center">
    <img src="https://github.com/SJSU272LabF18/Project-Team-14/blob/master/screenshots/Issuing.png" </img> 
</div>

<br><br>


### Requesting Proof
This can be done only after establishing a connection as detailed in the 1st step .

An instituion can request a proof that from another entity. This is basically offering up the details that were part of the credential that was obtained (As Explained in previous step). 

The Credential defenition of the credential that is being requested is obtained from the instituition that provided it. This credential defenition is copied on to dialog in the proofs tab after selecting other proofs. When The proof request is submitted the entity that it is requested from recieves a message that informs them of the required attributes that the requester wants. 



<div align="center">
    <img src="https://github.com/SJSU272LabF18/Project-Team-14/blob/master/screenshots/proofrequest.png" </img> 
</div>

<br><br>
 
### Verifying Credentials

Once proof request is submnitted and the requestee consents, the credential appears as a verifiable proof on the connections tab under the requestees details. Clicking on Validate, cross verifies the veracity of the credential and assuers the requester of its autheticity.


<div align="center">
    <img src="https://github.com/SJSU272LabF18/Project-Team-14/blob/master/screenshots/verification.png" </img> 
</div>

<br><br>

<div align="center">
    <img src="https://github.com/SJSU272LabF18/Project-Team-14/blob/master/screenshots/verification2.png" </img> 
</div>

<br><br>
 

### Viewing Wallet
A user can view his/her wallet that shows all the credentials obtained over time.

<div align="center">
    <img src="https://github.com/SJSU272LabF18/Project-Team-14/blob/master/screenshots/wallet.png" </img> 
</div>

<br><br>

<div align="center">
    <img src="https://github.com/SJSU272LabF18/Project-Team-14/blob/master/screenshots/wallet2.png" </img> 
</div>

<br><br>



