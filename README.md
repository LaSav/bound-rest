# Bound MERN REST API

This is a prototype browser application for Bound, a networking app for digital creatives. Built using the MERN stack and REST API architecture.

## Features

- Users can create "Listings"
- Users can request to join a Listing.
- Creators of a Listing can match with requested Users of that Listing.

## Status: In Progress :hourglass_flowing_sand:

## Built with

- React
- Redux/ Toolkit
- HTML
- Material UI
- Axios
- Express
- Mongoose
- MongoDB
- Node.js
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
- User CRUD :ok_hand:
- MFA for account delete
- Users can remove themselves from requests.

#### Frontend

- Authentication api + UI :ok_hand:
- Listings api + UI :ok_hand:
- Feed api + UI :ok_hand:
- Filtering feature :ok_hand:
- Request api + UI :ok_hand:
- Match api + UI :ok_hand:
- User api + UI :ok_hand:
- Extra UX: In Feed: quick view, quick request. In Dashboard: Personalize Listings
- Styling - Material UI
- PWA

## App Map

#### User-Listing Relationship

```
const listingSchema = mongoose.Schema(
    {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
      text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
      requiredSkill: {
      type: String,
      required: [true, 'Please add a Skill'],
    },
      requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    {
      timestamps: true,
    }
  );

```

The Listing data model references the User who created it by Id.

'requests' and 'matches' are arrays of references to users who have requested to join the Listing or have been matched with by the creator of the Listing.

### Listings

#### Dashboard Page

Users see the listings they've created in the Dashboard. Here, they can view and create listings.

> GET /api/listings
> Protected route, returns array of all listings created by the logged in user.

#### showListing

Shows one listing. Here you can match with users who have requested to the listing, edit a listing, and delete a listing.

> GET /api/listings/:id
> Protected route, returns one listing object.

    {
    Title: string,
    text: string,
    requiredSkill: string,
    requests: [users],
    matches: [users],
    }

> PUT /api/listings/:id
> protected route, returns request userId as a string.

#### Feed

A user can view and filter listings created by other users.

> GET /api/feed
> Returns array of all listings

#### showFeedListing

A user can request to join a listing.

> GET /api/feed/:id
> returns listing object

> PUT /api/feed/:id
> returns id of logged in user as a string

React:
Listings are fetched using the url id parameters with useParams from React Router.

Redux:
Upon successful call to PUT endpoint, state is updated to:

    listing: {},
    requested: userId // logged in user

### Profile

A user can update their profile and view listings they have requested to.

#### Deployment

- AWS
