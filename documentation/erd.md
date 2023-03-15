```mermaid
erDiagram

        RateType {
            WEEKDAY WEEKDAY
WEEKEND WEEKEND
HOLIDAY HOLIDAY
DAYRATE DAYRATE
MONThRATE MONThRATE
        }
    
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
    String customer_id  
    Int level_id  
    Int parkingSpot  
    }
  

  Customer {
    String id PK 
    Boolean is_long_term_customer  
    Boolean is_blocked  
    Int parking_garage_id  
    }
  

  ParkingTicket {
    Int id PK 
    DateTime entry_date  
    String customer_id  
    Int parking_garage_id  
    DateTime exit_date  "nullable"
    Float finalprice  "nullable"
    }
  

  ParkingRate {
    Int id PK 
    Int parking_garage_id  
    Float price  
    DateTime start_time  
    DateTime end_time  
    RateType rateType  
    }
  

  AccountingReport {
    Int id PK 
    Int parking_garage_id  
    DateTime generationTime  
    DateTime searchFrom  
    DateTime searchTo  
    Float price  
    }
  
    Level o{--|| ParkingGarage : "parkingGarage"
    ParkingSpace o{--|| Customer : "customer"
    ParkingSpace o{--|| Level : "level"
    Customer o{--|| ParkingGarage : "parkingGarages"
    ParkingTicket o{--|| Customer : "customer"
    ParkingTicket o{--|| ParkingGarage : "parkingGarage"
    ParkingRate o{--|| ParkingGarage : "parkingGarage"
    ParkingRate o|--|| RateType : "enum:rateType"
    AccountingReport o{--|| ParkingGarage : "parkingGarage"
```
