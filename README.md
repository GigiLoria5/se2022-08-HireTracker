# se2022-08-HireTracker

[![Unit Tests](https://github.com/GigiLoria5/se2022-08-HireTracker/workflows/Unit%20tests/badge.svg)](https://github.com/GigiLoria5/se2022-08-HireTracker/actions)
[![Integration Tests](https://github.com/GigiLoria5/se2022-08-HireTracker/workflows/Integration%20tests/badge.svg)](https://github.com/GigiLoria5/se2022-08-HireTracker/actions)

Application developed during the Software Engineering II course (Year 2022-23) by Group 08 at the Politecnico di Torino (Master of Science in Computer Engineering).

## Usage

### Client

- in client/ run `npm install`, then `npm start`

### Server

- in server/ run `npm install`, then run `node index.js` or `nodemon index.js` if nodemon is installed

## Selected Technologies

### Frontend

- React **18.2.0**
- MUI **5.10.9**

### Backend

- NodeJS **16.18**
- Sqlite3 **5.1.2**
- express **4.18.2**
- passport **0.6.0**

### Testing

- Mocha
- Jest

## React Client Application Routes

## API Format

## Database Tables

- Table `user` contains: id(PK), name, surname, email, password, salt, phone number, role
  - Possible roles are: hiker, emergency_operator, platform_manager, local_guide, hut_worker
    > The existing role verification is not made into the database, it must be performed within the backend. There is already an existing user with role _hiker_ with email *mario.rossi@hiker.it* and password _password_
- Table `hut` contains: id(PK), name, city, province, country, address, phone_number, altitude, description, beds_number, opening_period
  - _altitude_ is in meters
- Table `parking_lot` contains: id(PK), city, province, country, address
- Table `location` contains: id(PK), value_type, value, description
  - Possible value types are: name, gps, address
    > Again, there is no database control on the type. Although value_type may not be needed, I think it is useful to specify what type of value is present and should be expected by the person making the queries or handling the data.
- Table `hike` contains: id(PK), title, peak_altitude, city, province, country, description, ascent, track_length, expected_time, difficulty, gps_track, start_point_type, start_point_id, end_point_type, end_point_id
  - _peak_altitude_ is in meters
  - _ascent_ is in meters
  - _track_length_ is in km
  - _expected_time_ is in hours
  - _difficulty_ is mapped as following: 1=tourist, 2=hiker, 3=professional hiker
  - _gps_track_ is the gpx filename
  - _start_point_type_ and _end_point_type_ possible values are: hut, location, parking_lot
  - _start_point_id_ and _end_point_id_ do not have any FK contraints. Checks must be done within the backend
    > In order to avoid having to create associated tables or anything else, I preferred to specify the type here as well, so that I would still have the possibility of making queries in the right place.
- Table `reference_point` contains: hike_id, ref_point_type, ref_point_id (the PK is the combination of each of them)
  - _ref_point_type_ can be: parking_lot, location, hut
    > As in the previous cases, no check on external key constraints is performed. Here again, I preferred to insert a type column to help queries and avoid having to do a thousand joins with other associative tables.
