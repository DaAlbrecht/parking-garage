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
    }
  

  ParkingSpace {
    Int id PK 
    }
  

  ParkingSpaceCustomer {
    Int id PK 
    }
  

  Customer {
    Int id PK 
    Boolean is_long_term_customer  
    Boolean is_blocked  
    }
  

  ParkingTicket {
    Int id PK 
    DateTime entry_date  
    }
  

  ExitTicket {
    Int id PK 
    DateTime exit_date  
    Float price  
    }
  

  ParkingRate {
    Int id PK 
    Float price  
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
