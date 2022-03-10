# E-commerce-API

# Table of Contents
* [Installation](#installation)
* [Technology Stack](#technology-stack)
* [Description](#description)
* [Ideas for features to be added](#ideas-for-features-to-be-added)
* [On progress features](#on-progress-features)
* [Endpoints](#endpoints)
* [Schemas](#schemas)
***
### Installation
* clone
* Install required NPM modules
* Modify Environment Variables 
***
### Technology Stack:
* Node.js
* Express.js
* MongoDB & Mongoose
* NPM for (dependency management)
***
### Description:
The project includes endpoints for sellers and customers and their interaction with each other (internal messaging system) and with products (orders and product launches).
***
### Ideas for features to be added:
* E-mailing service
* Pagination endpoints
* Payments method API
 ***
### On progress features:
* Products rating and module 
* Cost calculation module 

***
### Endpoints:
##### Note : For all Endpoints those requires Authentication, It must be provided with the Bearer authentication schema.
* #### Customers Endpoints:
	
|  Endpoint | HTTP Method |Auth?|Accepts|Returns|
|:--:|:--:|:--:|:--:|:--:|
|`/customers/signUp`| `POST` |NO|New User's Data(Name,Email,Phone Number and Password)|Created Customer's account informations|
|`/customers/delete`| `DELETE` |YES|bearer JWT token|Deleted Customer informations|
|`/customers/logIn`| `POST` |NO|Customer's logging in data(Email and Password)|Customer account data and newly added JWT Token|
|`/customer/account`| `PATCH` |YES|Customer data to be updated|Updated Customer's data|
|`/customers/logOut`| `POST` |YES|-|-|
|`/customers/logOutAll`| `POST` |YES|-|-|
|`/customers/sendmsg`| `POST` |YES|Message's text and receiver's `_id`|sent messages details|
|`/customers/getinmsgs`| `GET` |YES|-|All received messages and their details|
|`/customers/getoutmsgs`| `GET` |YES|-|All sent messages and their details|
|`/customers/orders/add`| `POST` |YES|Products `_ìd`|Order details|
|`/customers/oreders/getall`| `GET` |YES|-|All Orders details|
|`/customers/orders/delete/:id`| `DELETE` |YES|-|Deleted Order details|


* #### Sellers Endpoints:
|  Endpoint | HTTP Method |Auth?|Accepts|Returns|
|:--:|:--:|:--:|:--:|:--:|
|`/sellers/signUp`| `POST` |NO|New User's Data(Name,Email,Phone Number and Password)|Created Seller's account informations|
|`/sellers/logIn`| `POST` |NO|Seller's logging in data(Email and Password)|Seller account data and newly added JWT Token|
|`/sellers/logOut`| `POST` |YES|-|-|
|`/sellers/logOutAll`| `POST` |YES|-|-|
|`/sellers/delete`| `DELETE` |YES|bearer JWT token|Deleted Seller informations|
|`/sellers/account`| `PATCH` |YES|Seller data to be updated|Updated Seller's data|
|`/sellers/sendmsg`| `POST` |YES|Message's text and receiver's `_id`|sent messages details|
|`/sellers/getinmsgs`| `GET` |YES|-|All received messages and their details|
|`/sellers/getoutmsgs`| `GET` |YES|-|All sent messages and their details|
|`/sellers/products/add`| `POST` |YES|New Product's data (name,description,price,categoty and stock)|Created Product details|
|`/sellers/products/getall`| `GET` |YES|-|All Seller Products and their details|
|`/sellers/products/delete/:id`| `DELETE` |YES|-|Deleted P roduct details|
|`/sellers/products/update/:id`| `PATCH` |YES|Product's data to be updated (name,description,price,stock and categoty)|Updated Product details|
***
### Schemas:
* #### User :
| Name |Type  |Required?|
|:--:|:--:|:--:|
| name |`String`  |Yes
| email |`String`  |Yes
| phoneNumber |`String`  |Yes
| password |`String`  |Yes
| tokens | array of `Tokens` (Strings)  |Yes
##### Note : Sellers and Customers user models have virtual (Products & Orders) properties.

* #### Product :
| Name |Type  |Required?|
|:--:|:--:|:--:|
| name |`String`  |Yes
| description |`String`  |No
| seller |`mongoose.SchemaTypes.ObjectId`  |Yes
| price |`type:mongoose.SchemaTypes.Decimal128`  |Yes
| rating | `Number`  |No
| categoty | `String`  |Yes
| date | `Date`  |Yes
| stock | `Number`  |Yes
| image | `Buffer`  |No


* #### Order :
| Name |Type  |Required?|
|:--:|:--:|:--:|
| customer |`mongoose.SchemaTypes.ObjectId`  |Yes
| date | `Date`  |Yes
| products |array of `mongoose.SchemaTypes.ObjectId`  |No
| state |`String`  |Yes
| cost |`mongoose.SchemaTypes.Decimal128`  |Yes
* #### sellerMSG :
| Name |Type  |Required?|
|:--:|:--:|:--:|
| sender |`mongoose.SchemaTypes.ObjectId`  |Yes
| receiver |`mongoose.SchemaTypes.ObjectId`  |Yes
| text |`String`  |No
| date | `Date`  |Yes
* #### customerMSG :
| Name |Type  |Required?|
|:--:|:--:|:--:|
| sender |`mongoose.SchemaTypes.ObjectId`  |Yes
| receiver |`mongoose.SchemaTypes.ObjectId`  |Yes
| text |`String`  |No
| date | `Date`  |Yes

