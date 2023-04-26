# Node.js Okta Project

This is a sample Node.js project that uses Okta for authentication and authorization.

## Prerequisites

Before getting started, ensure that you have the following:

- Node.js installed on your machine
- An Okta account with API credentials

## Installation

To install the project, follow these steps:

1. Clone the repository: `git clone https://github.com/AssiduousPirate/simple-multifactor-auth.git`
2. Install dependencies: `npm install`

## Configuration

To configure the project, you will need to create a `.env` file in the root directory of the project with the following variables:

```
OKTA_ORG_URL=https://{yourOktaDomain}.com
OKTA_CLIENT_ID={clientId}
OKTA_CLIENT_SECRET={clientSecret}
OKTA_CALLBACK_URL=http://localhost:3000/authorization-code/callback
```

## Usage

To run the project, use the following command:


This will start the server on `http://localhost:3000/auth`.

## Authentication

To authenticate with Okta, navigate to `http://localhost:3000/auth/login`. You will be redirected to the Okta login page, where you can enter your Okta credentials. Once authenticated, you will be redirected back to the app.

## Authorization

To authorize access to certain parts of the app, use Okta's access control features. This can be done through groups or roles assigned to users in Okta. 

## Conclusion

This Node.js Okta project provides a basic setup for integrating Okta authentication and authorization into a Node.js app. It can be extended and customized to fit your specific use case.
