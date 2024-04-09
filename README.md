
# Salon Booking Backend 

This is a backend for a salon booking application that has the following features:
- Users can book slots
- Staff can set availabilty of these slots
- Authentication and Protected Routing
- Rate Limiting
- Input Validations


## Tech Stack


**Server:** Node, Express, MongoDB, Zod (for validations)


## Run Locally

Clone the project

```bash
  git clone https://github.com/hanzalahwaheed/salon-booking-backend.git
```

Go to the project directory

```bash
  cd salon-booking-backend/src
```

Add environment variables (.env)

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/
JWT_KEY=jwtkey
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node server.js
```


## API Reference

[Postman Documentaion](https://documenter.getpostman.com/view/26562991/2sA3Bg8uAJ)


## Authors

- [@hanzalahwaheed](https://www.github.com/hanzalahwaheed)

