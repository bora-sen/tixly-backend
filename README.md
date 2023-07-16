# Back-End Side Of Tixly App

## .env Variables

| Variable           | Description                       |
| ------------------ | --------------------------------- |
| MONGODB_CONN_URI   | MongoDB Connection Text           |
| JWT_ACCESS_SECRET  | Json Web Token Access Key Secret  |
| JWT_REFRESH_SECRET | Json Web Token Refresh Key Secret |

## Auth Endpoints

| METHOD | Endpoint       | Description                                                                    |
| ------ | -------------- | ------------------------------------------------------------------------------ |
| POST   | /auth/register | Register user with {username,displayName,password} object                      |
| POST   | /auth/login    | Login user with {username,password} object (returns access and refresh tokens) |
| POST   | /auth/refresh  | Get new accessToken                                                            |

## Events Endpoints

| METHOD | Endpoint       | Description                                                                 |
| ------ | -------------- | --------------------------------------------------------------------------- |
| GET    | /              | Gets All Events                                                             |
| POST   | /events/create | Create event with Auth Header, requires {title,description,maxPeople} props |
| DELETE | /events/delete | Delete event with Auth Header, requires {eventId} prop                      |

## Tickets Endpoints

| METHOD | Endpoint          | Description                                                        |
| ------ | ----------------- | ------------------------------------------------------------------ |
| GET    | /                 | Get All tickets (requires Auth Header)                             |
| POST   | /tickets/generate | Generate ticket with Auth Header, requires {eventId} prop          |
| POST   | /tickets/validate | Validates ticket with Auth Header, requires {eventId,public} props |
| DELETE | /tickets/delete   | Deletes ticket with Auth Header, requires {public} props           |
