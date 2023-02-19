```mermaid
erDiagram

  ParkingGarage {
    Int id PK 
    String name  
    String address  
    }
  

  Level {
    Int id PK 
    Int levelNumber  
    Int parking_spaces  
    Int parking_garage_id  
    }
  

  ParkingSpace {
    Int id PK 
    Int level_id  
    }
  

  ParkingSpaceCustomer {
    Int id PK 
    Int parking_space_id  
    Int customer_id  
    }
  

  Customer {
    Int id PK 
    Boolean is_long_term_customer  
    Boolean is_blocked  
    }
  

  ParkingTicket {
    Int id PK 
    DateTime entry_date  
    Int customer_id  
    }
  

  ExitTicket {
    Int id PK 
    DateTime exit_date  
    Float price  
    Int customer_id  
    }
  

  ParkingRate {
    Int id PK 
    Float price  
    Int parking_garage_id  
    Int rate_type_id  
    }
  

  RateType {
    Int id PK 
    DateTime start_time  
    DateTime end_time  
    }
  
    Level o{--|| ParkingGarage : "parkingGarage"
    ParkingSpace o{--|| Level : "level"
    ParkingSpaceCustomer o{--|| ParkingSpace : "parking_space"
    ParkingSpaceCustomer o{--|| Customer : "customer"
    ParkingTicket o{--|| Customer : "customer"
    ExitTicket o{--|| Customer : "customer"
    ParkingRate o{--|| ParkingGarage : "parkingGarage"
    ParkingRate o{--|| RateType : "rateType"
```
