# Bound MERN REST API

Bound is a networking app for digital creatives. Built using the MERN stack and REST API architecture.

## Features

- Users can create "Listings"
- Users can request to join a Listing.
- Creators of a Listing can match with requested Users of that Listing.

## Status: In Progress :hourglass_flowing_sand:

## Built with

- React
- HTML
- Bootstrap
- Axios
- Express
- Mongoose
- MongoDB
- Node.js
- Vite
- JWT

## Checklist:

#### Backend

- Initial routing and database setup. :ok_hand:
- User Authentication with JWT. :ok_hand:
- Authenticated Users can CRUD Listings. :ok_hand:
- Users can request to join a Listing. :ok_hand:
- Creators of a Listing can match with the requested Users. :ok_hand:
- Getting Listings a User has requested to. :ok_hand:
- Getting Listings a User has matched with. :ok_hand:
- Users can remove themselves from requests.

#### Frontend

- Feed: quick view, quick request, sorting.
- Show a single Listing, full view, request.
- User profile, update profile.
- Show User's created Listings.
- Show User their Listing, update Listing, delete Listing, match.
- Show what Listings a User has Requested to.
- Show what Listings a User has matched with.
- PWA

#### Deployment

## Thinking About...

I need to decide on what to do when a Creator of a Listing matches with a requested User. So far, I have come up with:

- Chat messaging using socket.io, PubNub or Twilio
- Email service using Postmark
