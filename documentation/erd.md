```mermaid
erDiagram

        RateType {
            WEEKDAY WEEKDAY
WEEKEND WEEKEND
HOLIDAY HOLIDAY
DAYRATE DAYRATE
MONTHRATE MONTHRATE
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
    Int level_id  
    Int parkingSpot  
    String customer_id  "nullable"
    }
  

  Customer {
    String id PK 
    Boolean is_long_term_customer  
    Boolean is_blocked  
    String license_plate  "nullable"
    DateTime last_payment  "nullable"
    DateTime created_at  
    Int parking_garage_id  
    }
  

  AccountingReport {
    Int id PK 
    Int parking_garage_id  
    DateTime generationTime  
    DateTime searchFrom  
    DateTime searchTo  
    Float price  
    }
  

  ParkingTicket {
    Int id PK 
    DateTime entry_date  
    String customer_id  "nullable"
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
  
    Level o{--|| ParkingGarage : "parkingGarage"
    ParkingSpace o{--|| Level : "level"
    ParkingSpace o|--|o Customer : "customer"
    Customer o{--|| ParkingGarage : "parkingGarage"
    AccountingReport o{--|| ParkingGarage : "parkingGarage"
    ParkingTicket o{--|o Customer : "customer"
    ParkingRate o{--|| ParkingGarage : "parkingGarage"
    ParkingRate o|--|| RateType : "enum:rateType"
```
