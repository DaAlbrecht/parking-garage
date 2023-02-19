
# Parking-Garage

## Disclaimer

I used this project to look into sveltekit and learn about Typescript as well as a web framework. I have no prior experience to both.

This was a mandatory project i need to do for my  Advanced Federal Diploma of Higher Education in Software Engineering.

The following should be implemented (translated with deepl from german to english)

## initial position
> The company ParkinTown1 currently manages five multi-storey parking lots at different locations on behalf of several customers. The IT system used for this purpose was developed by a former employee who carries out the necessary maintenance work on a contract basis. The system is getting on in years and will have to be replaced in the near future in view of the company's planned expansion. The managing director of ParkinTown has evaluated several IT solutions for the management of parking garages, but considers them all too complicated. He prefers a simple solution tailored to ParkinTown's needs. It is aware of the risks involved in developing its own solution and therefore, before awarding the contract for the development of the entire application, it wants to have a prototype developed that simulates the operation of the parking garages.  Based on the information in this document, a specification for the prototype must first be created. The information in this document must be checked for completeness and supplemented if necessary. Then a prototype of the IT system must be built on the basis of the specifications.

## General conditions

> The development environment for this project corresponds to the one used during the programming lessons.  Justified deviations are permitted, provided that the associated programming effort remains comparable. The reasons for this must be explained in the project documentation.The term paper is carried out as a computer science project. It is expected that the learned methods and instruments of project management as well as system and software engineering are put into practice. This includes in particular (but not only) the choice of an adequate process model, a well-founded and detailed planning of the different activities as well as a complete and comprehensible documentation of the project. In addition to the detailed planning already mentioned, project management also includes appropriate controlling, risk analysis with measures, quality management and configuration management in a meaningful granularity.

I did not include this part in this repository because its boring and pointless in this scenario.

## requirements

> It must be possible to configure the parking garages individually. The number of floors and the number of parking spaces per floor must be freely definable. The number of parking spaces may vary from one floor to another. Each parking garage has exactly one entrance and one exit barrier. Each parking garage has two categories of customers: Casual users and permanent tenants.  The permanent tenant is assigned a fixed parking space and pays a monthly rent for it (see appendix).  If the rent is not paid on the 15th of each month, the customer is blocked until payment is made. When an occasional user presses the button on the entrance barrier, a digital parking ticket is generated (if a parking space is available), which at a minimum contains the date and time of entry as well as the floor and number of the assigned parking space. Permanent tenants enter a unique personal code at the entrance barrier when entering the parking garage.  The date and time of entry are registered for internal billing purposes, and the ticket is validated before exit. The date and time of exit are recorded. The amount owed is calculated for occasional users on the basis of the length of stay and the parking tariff. When leaving the parking garage, either the unique personal code (permanent tenant) or the ticket number is read or entered at the exit barrier.All entry and exit times are logged for both permanent tenants and occasional users. The system must be able to generate a corresponding evaluation per parking garage and user category over a defined time period at any time.The parking rates (see appendix) vary depending on the time of day and must be able to be configured flexibly. A separate tariff applies for weekends and public holidays. The calculation is made on a quarter-hour basis, whereby the tariff applicable at the beginning of the respective quarter-hour applies for the entire quarter-hour. Any quarter of an hour that has elapsed will be charged in full. If the parking time is longer than 24 hours, the billing will automatically switch to daily flat rate. The full amount will be charged for the days that have elapsed. After payment, a digital exit ticket is issued. The application should offer a graphical representation of the different floors per parking garage, showing the free and occupied parking spaces as well as those of the permanent tenants. The allocation of parking spaces for the occasional users is based on an algorithm, which aims at a balanced distribution. The application must be able at any time to calculate and display the turnover of each parking lot (divided by customer category) for a given month. The same applies to the annual turnover, whereby the individual months are shown separately.

## Appendix: Parking tariffs

> Weekdays:00:00 to 05:59: CHF 3.00 / hr
> 06:00 to 08:59: CHF 3.40 / hr
> 09:00 to 17:59: CHF 4.20 / hr
> 18 :00 to 20:59: CHF 3.40 / hr
> 21:00 to 23:59: CHF 3.00 / hr
> Weekends and holidays:
> 00:00 to 08:59: CHF 3.00 / hr
> 09:00 to 17:59: CHF 3.80 / hr
> 18:00 to 23:59: CHF 3.00 / hr
> Daily rate: CHF 40.00
> Monthly rent: CHF 200.00