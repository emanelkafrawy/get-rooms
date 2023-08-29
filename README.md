# Get Rooms

## summary
- this mini project to booking a room and get available rooms 

## how it works
1- you need to create empty data base with name `get_rooms`
2- npm i --force

3- add database configuration to default config file 

4- npm run build 

5- npm run awesome

6- for now [you need to open tables and insert data manually]

## apis 
1- cities/:id?   [optional id] [get]
    * can get all cities or specific city by id

2- countries/:id? [optional id] [get]
    * can get all countries or specific country by id

3- countries/cities/:countryId  [required id] [get]
    *can get cities for specific country

4- room-status/  [post]
    *to fill room status lookups
    
5- room-status/:id? [optional id] [get]
    *to get all statuses or one


6- rooms/details/id [required id] [get]
    *to get room details

7- rooms/ [get]
    *to get all rooms

8- rooms/book/id [required id] [post]

    - in body
    {
         "checkInDate": "2023-08-01",
         "checkoutDate": "2023-08-29"
    } 

*book a room [room must be available and check in date less than checkout date]

## 📒 important note

- api number 1, 2, 3, 7,
 can order and limit by writing a query [optional]
    ``?sortDirection=ASC&sortAttribute=id&page=1&limit=10``

- and for api number  **7** you can filter by 

    `id`, `name`, `title`, `description`, `size`,`location`, `roomStatus`, `cityName`, `countryName`, `status`


