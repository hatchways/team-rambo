# **Team Rambo:** Teams API Documentation

Internal documentation for working with the teams feature. To get started take a look at **Quick View**.

## Quick View

- [Team API](#team-api)
  - [Get Users Teams](#get-users-teams)
  - [Get Team](#get-team)
  - [Create Team](#create-team)
  - [Update Team](#update-team)
  - [Delete Team](#delete-team)
- [Invite API](#invite-api)
  - [Get Active Invites](#get-active-invites)
  - [Create Invite](#create-invite)
  - [Accept Invite](#accept-invite)
  - [Revoke Invite](#revoke-invite)
- [Collaborator API](#collaborator-api)
  - [Get Team Collaborators](#get-team-collaborators)
  - [Remove a Collaborator](#remove-a-collaborator)

<br />

# Team API

## **Get Users Teams**

- **URL**

  _/team_

- **Method:**

  _`GET`_

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `[ { _id: 'xyz', name: 'Team Name', collaborators: [ ], boards: [ ] }, . . . ]`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `No token, authorization denied`

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Unable to find team" }`

- **Notes:**

  This API only returns a users owned teams, this will be updated to return a users owned teams and teams they are a collaborator in.

## **Get Team**

- **URL**

  _/team/:teamId_

- **Method:**

  _`GET`_

- **URL Params**

  **Required:**

  `teamId=[Mongo ID]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "_id": "60b95583f03fe3c63239c8bf",
      "name": "Team Rambo",
      "owner": "60b95583f03fe3c63239c8bf",
      "boards": [ ],
      "collaborators": [ ],
      "invites": [ ],
      . . .
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `No token, authorization denied`

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error: "Please provide a proper ID" }`

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Unable to find team" }`

## **Create Team**

- **URL**

  _/team_

- **Method:**

  _`POST`_

- **Data Params**

  - name [String] - **Required**

  Example

  ```json
  {
    "name": "Team Rambo"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "_id": "60b95583f03fe3c63239c8bf",
      "name": "Team Rambo",
      "owner": "60b95583f03fe3c63239c8bf",
      "boards": [ ],
      "collaborators": [ ],
      "invites": [ ],
      . . .
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `No token, authorization denied`=

## **Delete Team**

- **URL**

  \_/team/:teamId

- **Method:**

  `DELETE`

- **URL Params**

  **Required:**

  `teamId=[Mongo Id]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ message : "Team deleted" }`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `No token, authorization denied`

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error: "You cannot perform this task" }`

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Unable to find team" }`

## **Update Team**

- **URL**

  _/team/:teamId_

- **Method:**

  _`PATCH`_

- **URL Params**

  **Required:**

  `teamId=[Mongo Id]`

- **Data Params**

  - name [String] - **Required**

  _**Note:** Currently teams may only update their name. Collaborators, invites, and boards will have their own methods for working with the Team resource._

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "boards": [],
      "collaborators": ["60bc09df97ef41e316a8fc21"],
      "_id": "60bc099297ef41e316a8fc20",
      "name": "Team Rambo 2.0",
      "owner": "60b95583f03fe3c63239c8bf",
      "createdAt": "2021-06-05T23:32:34.164Z",
      "updatedAt": "2021-06-05T23:54:21.976Z"
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `No token, authorization denied`

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Unable to find team" }`

<br />

# Invite API

## **Get Active Invites**

- **URL**

  _/team/:teamId/invites_

- **Method:**

  _`GET`_

- **URL Params**

  **Required:**

  `teamId=[Mongo Id]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "_id": "60bc0acc08d918e3daeefeef",
        "team": "60bc099297ef41e316a8fc20",
        "recipient": "60bc09df97ef41e316a8fc21",
        "sender": "60b95583f03fe3c63239c8bf",
        . . .
      }
      . . .
    ]
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `No token, authorization denied`

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error: "Unable to find team" }`

## **Create Invite**

- **URL**

  _/team/:teamId/invite_

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  `teamId=[Mongo Id]`

- **Data Params**

  - recipient [Mongo Id] - **Required**

  _**Note:** Recipient cannot be equal to authenticated user's id_

  Example

  ```json
  {
    "recipient": "60bc09df97ef41e316a8fc21"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "message": "Invite sent",
      "payload": {
        "_id": "60bc0acc08d918e3daeefeef",
        "team": "60bc099297ef41e316a8fc20",
        "recipient": "60bc09df97ef41e316a8fc21",
        "sender": "60b95583f03fe3c63239c8bf",
        . . .
      }
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `No token, authorization denied`

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Unable to find team" }`

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Please provide a proper ID" }`

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Recipient already has been invited" }`

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "You cannot send an invite to yourself" }`

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "That person is already in your team" }`

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Recipient does not exist" }`

- **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._>

- **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._>

## **Accept Invite**

- **URL**

  _/team/:teamId/:inviteId/accept_

- **Method:**

  _`GET`_

  **Note:** This method is a `GET` because emails are sent to recipient to click and join.

- **URL Params**

  **Required:**

  `teamId=[Mongo Id]`

  `inviteId=[Mongo Id]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "message": "Added you to Team Rambo"
    }
    ```

- **Error Response:**

  _The authenticated user's id must match the recipient id on the invite resource_

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `No token, authorization denied`

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Unable to find team" }`

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "That invite does not exist" }`

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "That user no longer exists" }`

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "This invite is not for you" }`

## **Revoke Invite**

_**Note:** Team owner's id must match the authenticated user's id._

- **URL**

  _/team/:teamId/:inviteId/revoke_

- **Method:**

  `DELETE`

- **URL Params**

  **Required:**

  `teamId=[Mongo Id]`

  `inviteId=[Mongo Id]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ message : "Invite deleted" }`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `No token, authorization denied`

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "That invite does not exist" }`

# Collaborator API

## **Get Team Collaborators**

- **URL**

  _/team/:teamId/collaborators_

- **Method:**

  _`GET`_

- **URL Params**

  **Required:**

  `teamId=[Mongo Id]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "_id": "60bc09df97ef41e316a8fc21",
        "email": "user@email.com",
        "createdAt": "2021-06-05T23:33:51.049Z",
        "updatedAt": "2021-06-05T23:33:51.049Z"
      }
      . . .
    ]
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `No token, authorization denied`

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error: "Unable to find team" }`

## **Remove a Collaborator**

- **URL**

  _/team/:teamId/collaborators/:userId_

- **Method:**

  _`DELETE`_

- **URL Params**

  **Required:**

  `teamId=[Mongo Id]`

  `userId=[Mongo Id]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ message: "Collaborator removed" }`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `No token, authorization denied`

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error: "Unable to find team" }`

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error: "Collaborator not in team" }`

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error: "You cannot perform this task" }`
