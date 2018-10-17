# Project-Team-14
PROJECT IDEAS

## Team Name : Tech Titans

## Presented By: 
--------------
1. Akhilesh Anand 
2. Vishwanath Manvi
3. Jasmine Dhunna 
4. Sanjay Nag Ravishankar

                                                      
## 1. Decentralized Digital Identity Management System
--------------------------------
Implement a decentralized digital identify management system using Hyperledger to demonstrate below use case.

### Project Abstract:

International students applying to a US university go through a long and painful process of getting the required credentials from various issuing authorities/intermediaries like below to apply.
i.School to obtain transcripts,
ii.ETS (for GRE/TOEFL tests), 
iii.WES (for evaluating transcripts), 
iv.Bank (for providing financial eligibility statement) 

This process takes months and students have to produce their personal identifiable information (PII) data every time to each of authorities. Also, these authorities additionally request students to provide proof of identity to provide the service. The student's identity is replicated across the intermediaries centralized systems. This data is now not only vulnerable to potential information threats, but also potential misuse by the agencies themselves to further their own business interests. With a decentralized blockchain solution, there's no need for any of the authorities to collect and store personal and identity data. Students will own their data and will only provide access to minimum required data that each of the intermediary requires to provide their service. Once approved, the credential is then added to the students wallet. Since adding credentials would be transactions on the blockchain, they are verified and therefore can be trusted by all authorities. It also makes data more secured and transparent to all parties involved. The student can then present the verified credentials along with application form to the university thereby enabling them to make a faster decision.

### Proposed methodology/ resources, etc:
Implement a permissioned blockchain using Hyperledger Fabric open source project and deploy it on IBM Cloud. The solution will also use Hyperledger Indy framework for identity management and demonstrate above use case through a simple web application.


## 2. RightJobs4.me (Job recommendation engine)
--------------------------------
RightJobs4.me aggregates jobs from across job sites like Linkedin, Indeed, Monster, Glassdoor and then recommends jobs that best match the users profile improving their odds of landing the right job.

### Project Abstract:

1. Public linkedin profiles are ingested to build model for relevant skills and credentials for existing jobs at various companies and locations.
2. Jobs data is then ingested on a daily basis from multiple job sites to build the job model data that uses title, job description, skills and experience required, etc.
3. ML algorithm uses above models to match a user's profile and recommend top matching jobs. 
4. Matching will also consider 
        4.1 Match users data with job postings job description data
        4.2 Match users data with profile data of other employees working in the company for the same role.


### Proposed methodology/ resources, etc:
1. Use Python Beautiful Soup library for web scraping Linkedin and job sites and prepare it.
2. Use Pandas for ingesting prepared data.
3. Use Scikit learn for running ML algorithms for the recommendation engine.
