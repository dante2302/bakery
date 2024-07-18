# ENDPOINTS FOR BOBBY'S BAKERY WEB API
# Table Of Contents

<details>
<summary>Fillings | Toppings</summary>

  - [GetAll](#GetAll)  
  - [GetOne](#GetOne)  
  - [Create](#Create)  
  - [Update](#Update)  
  - [Delete](#Delete)  
</details>

<details>
  <summary>FoodType</summary>
  
  - [GetOneDetailed](#getonedetailed)
  - [GetOneByName](#getonebyname)
  - [UpdateByDTO](#updatebydto)
  - 
</details>

<details>
  <summary>Order</summary>

  - [GetOne](#ogetone)
  - [GetAll](#ogetall)
  - [Create](#create(overloaded))
</details>

<details>
  <summary>Auth</summary>

  - [LogIn](#login)
</details>

## Custom Controller Base Methods - (Fillings, Toppings)

### `GetAll`

- **Endpoint:** `GET /all`
- **Description:** Retrieves all `Filling` entities.
- **Returns:** 
  - `200 OK` on success with the list of `Filling` entities.
  - `204 No Content` if no entities are found.
  - `500 Internal Server Error` for any server-side errors.
    
-----
### `GetOne`

- **Endpoint:** `GET /{id}`
- **Description:** Retrieves a specific `Filling` entity by its ID.
- **Returns:** 
  - `200 OK` on success with the `Filling` entity.
  - `404 Not Found` if the `Filling` entity with the given ID is not found.
  - `500 Internal Server Error` for any server-side errors.
  - -----

### `Create`

- **Endpoint:** `POST`
- **Description:** Creates a new `Filling` entity.
- **Returns:** 
  - `201 Created` on success with the created `Filling` entity and its location.
  - `400 Bad Request` if the model state is not valid or other client-side errors.
  - `500 Internal Server Error` for any server-side errors.

-----
### `Update`

- **Endpoint:** `PUT`
- **Description:** Updates an existing `Filling` entity.
- **Returns:** 
  - `200 OK` on successful update.
  - `404 Not Found` if the `Filling` entity to update is not found.
  - `400 Bad Request` if the update operation fails due to client-side errors.
  - `500 Internal Server Error` for any server-side errors.

-----
### `Delete`

- **Endpoint:** `DELETE /{id}`
- **Description:** Deletes a `Filling` entity by its ID.
- **Returns:** 
  - `200 OK` on successful deletion.
  - `404 Not Found` if the `Filling` entity with the given ID is not found.
  - `500 Internal Server Error` for any server-side errors.
- **Parameters:** 
  - `id` (int): ID of the `Filling` entity to delete.
- **Returns:** 
  - `200 OK` on successful deletion.
  - `404 Not Found` if the `Filling` entity with the given ID is not found.
  - `500 Internal Server Error` for any server-side errors.

-----
## FoodType Endpoints

  ### `GetOneDetailed`

- **Endpoint:** `GET /{id}/detailed`
- **Description:** Retrieves a specific `FoodType` entity by its ID with detailed information including associated `Fillings`, `Toppings`, and `Bases`.
- **Parameters:** 
  - `id` (int): ID of the `FoodType` entity to retrieve.
- **Returns:** 
  - `200 OK` on success with a detailed `FoodTypeDTO` including associated entities.
  - `404 Not Found` if the `FoodType` entity with the given ID is not found.
  - `500 Internal Server Error` for any server-side errors.

------
### `GetOneByName`

- **Endpoint:** `GET /withName/{name}`
- **Description:** Retrieves a specific `FoodType` entity by its name with detailed information including associated `Fillings`, `Toppings`, and `Bases`.
- **Parameters:** 
  - `name` (string): Name of the `FoodType` entity to retrieve.
- **Returns:** 
  - `200 OK` on success with a detailed `FoodTypeDTO` including associated entities.
  - `404 Not Found` if the `FoodType` entity with the given name is not found.
  - `500 Internal Server Error` for any server-side errors.

-----
### `UpdateByDTO`

- **Endpoint:** `PUT /dto`
- **Description:** Updates an existing `FoodType` entity using a `FoodTypeDTO`.
- **Parameters:** 
  - `fDto` (FoodTypeDTO): The DTO containing updated information for the `FoodType`.
- **Returns:** 
  - `200 OK` on successful update.
  - `404 Not Found` if the `FoodType` entity to update is not found.
  - `400 Bad Request` if the update operation fails due to client-side errors.
  - `500 Internal Server Error` for any server-side errors.

-------

## Order Endpoints
### o`GetAll`

- **Endpoint:** `GET /all`
- **Description:** Retrieves all orders and returns a list of `OrderDTO` objects.
- **Returns:** 
  - `200 OK` on success with a list of `OrderDTO` objects.
  - `204 No Content` if no orders are found.
  - `500 Internal Server Error` for any server-side errors.

-------
### o`GetOne`

- **Endpoint:** `GET`
- **Description:** Retrieves a specific order by its ID.
- **Parameters:** 
  - `id` (int): ID of the order to retrieve (passed via query string).
- **Returns:** 
  - `200 OK` on success with the `OrderDTO` object.
  - `404 Not Found` if the order with the given ID is not found.
  - `500 Internal Server Error` for any server-side errors.

------
### `Create` (overloaded)

- **Endpoint:** `POST /submit`
- **Description:** Creates a new order based on the provided `OrderSubmission` object.
- **Parameters:** 
  - `orderSubmission` (OrderSubmission): Object containing both `Order` and `User` information.
- **Returns:** 
  - `200 OK` on successful order creation.
  - `400 Bad Request` if the request body is invalid or other client-side errors.
  - `500 Internal Server Error` for any server-side errors.
-----

# Auth Endpoints
### `LogIn`

- **Endpoint:** `POST`
- **Description:** Authenticates user login details and generates a JWT token upon successful authentication.
- **Parameters:** 
  - `loginDetails` (LoginDetails): Object containing user login information (username and password).
- **Returns:** 
  - `200 OK` on successful authentication with a JWT token.
  - `401 Unauthorized` if authentication fails (e.g., incorrect credentials).
  - `500 Internal Server Error` for any server-side errors.
