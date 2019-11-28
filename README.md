# Entry Management Software - Innovaccer SDE Intern 2020 Assignment

A simple visitor management software to automate visitor management process and manage your visitors efficiently.

#### :computer: Currently deployed at [entrymgmt.herokuapp.com]( https://entrymgmt.herokuapp.com/ )

> :warning: Please note the SMS service is limited as it uses trial **Nexmo** account. So it works from 9 am to 9 pm in India and you may not get any SMS as a host.

---

* :monorail: [Run Locally](#user-content-run-locally)​
* :grey_question: [Approach](#user-content-approach)
* :books: [Tech Stack](#user-content-tech-stack)
  * :electric_plug: ​[API](#user-content-api)
  * :file_folder: [Database](#user-content-database)​
  * :nail_care: [Front-end](#user-content-front-end)​
    * [State Management](#user-content-state-management)
    * [Responsive Styling](#user-content-responsive-styling)
  * :rocket: ​[Deployment](#user-content-deployment)
* :star: [Miscellaneous](#user-content-miscellaneous)

---



## Run Locally

To run the web app locally, go to any directory, open terminal and run the following commands:

```bash
$ git clone https://github.com/Kristency/entry-mgmt.git
$ cd entry-mgmt
$ npm install
$ npm start
```

Your app should be up and running on `localhost:3000`

To run the API server,  go to any directory, open terminal and run the following commands:

```bash
$ git clone https://github.com/Kristency/entry-mgmt-api.git
$ cd entry-mgmt-api
$ npm install
```

Create a **.env** file and fill the following key-value pairs.

```bash
DATABASEURL = mongodb://localhost:27017/<your_database_name>
NODEMAILER_FROM_ADDRESS = <email_address you used to register on Nodemailer>
NODEMAILER_PASSWORD = <password you used to register on Nodemailer>
NODEMAILER_MAIL_SERVICE = <gmail/yahoo/hotmail>
NEXMO_API_KEY = <api_key generated on registering with Nexmo>
NEXMO_API_SECRET = <api_secret generated on registering with Nexmo>
NEXMO_FROM_NUMBER = <phone_number you registered with Nexmo>
```

In the same terminal, run:

```bash
$ npm start
```

Your server should be up and running on `localhost:8080`



## Approach

![homescreen](https://github.com/Kristency/entry-mgmt/blob/master/imgs/Screenshot%20(22).png)



I have created this app assuming that the hosts will first have to register themselves in this app. Once registered, if a host again logs in, then he will be redirected to a dashboard where he can see a list of all of his pending visitors.



![host registration](https://github.com/Kristency/entry-mgmt/blob/master/imgs/Screenshot%20(23)_LI.jpg)



![host dashboard](https://github.com/Kristency/entry-mgmt/blob/master/imgs/Screenshot%20(26)_LI.jpg)



If a visitor checks in, he will be asked to fill his details and choose a host from the list of available hosts whom he want to meet. If the visitor is a new one, he will be registered in the database and a session will be created with the check-in time, visitor details, and the host selected. Simultaneously, an email and a SMS will be sent to the selected host informing him about the visitor.



![visitor registration](https://github.com/Kristency/entry-mgmt/blob/master/imgs/Screenshot%20(24)_LI.jpg)



![visitor dashboard](https://github.com/Kristency/entry-mgmt/blob/master/imgs/Screenshot%20(25).png)



![host email](https://github.com/Kristency/entry-mgmt/blob/master/imgs/Annotation%202019-11-28%20171700.png)



After the meeting is over, the visitor can check-out from his dashboard which will trigger a patch request to the ongoing session in the database which will update the check-out time of the session and send an email about the session details to the visitor.



## Tech Stack

### API

The [API]( https://github.com/Kristency/entry-mgmt-api ) for this app is built with **Node.js**. Its a light-weight server built using Express framework and handles CRUD operations of the visitors/hosts and also provides email( [Nodemailer]( https://nodemailer.com/about/ ) ) and SMS( [Nexmo]( https://developer.nexmo.com/messaging/sms/code-snippets/send-an-sms ) ) services.

All the private keys and database URLs are secured using environment variables. Again the [dotenv](https://www.npmjs.com/package/dotenv) NPM package is a great tool to deal with that.



### Database

The popular NoSQL **MongoDB** is being used hosted on Mongo Atlas. The database contains three models namely **Visitor**, **Host** and **Session**. Host is associated with Visitor model by reference through the **pendingVisitors** key. [Mongoose](https://mongoosejs.com/) helped me design a consistent schema for them.



![host model](https://github.com/Kristency/entry-mgmt/blob/master/imgs/Screenshot%20(27).png)



![session model](https://github.com/Kristency/entry-mgmt/blob/master/imgs/Screenshot%20(28).png)



![visitor model](https://github.com/Kristency/entry-mgmt/blob/master/imgs/Screenshot%20(29).png)



### Front-end

This project is built with **React** and bootstrapped by [Create React App](https://github.com/facebook/create-react-app). I have used class based components.

#### State Management

For global state management, **Redux** is being used along with **redux-thunk** to deal with asynchronous action creators while **axios** handles REST API calls. For monitoring and debugging the state, [Redux Dev Tools](https://github.com/zalmoxisus/redux-devtools-extension) works great.



![initial state](https://github.com/Kristency/entry-mgmt/blob/master/imgs/Screenshot%20(30).png)



![visitor check-in state](https://github.com/Kristency/entry-mgmt/blob/master/imgs/Screenshot%20(31).png)



#### Responsive Styling

Using **Bootstrap 4** grid system and spacing utilities to make the application look good on any device.



### Deployment

Deployed on **heroku** using the [mars/create-react-app](https://github.com/mars/create-react-app-buildpack) buildpack. It automatically deploys the production build and installs necessary dependencies for optimum performance and security.



Keep coding ! :v:

Subhajit Nandi

nandisubhajit666@gmail.com
