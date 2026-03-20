# NOVUS Hackathon Registration Portal

The NOVUS Hackathon Registration Portal is a full-stack web application developed to streamline and manage the registration process for NOVUS Hackathon 2026, a 24-hour national-level hackathon organized by Malla Reddy Deemed to be University. The platform was designed to handle large-scale participant registrations efficiently, ensuring a smooth experience for both participants and organizers.

This system enables teams to register by providing details of the team leader and members, while offering organizers the ability to verify, manage, and export participant data. It also supports backend data handling and integration with tools used for communication and certificate distribution.

---

## Overview

The primary objective of this project is to simplify the process of collecting, storing, and managing hackathon registrations. The platform supports multi-member team registrations and ensures that each team is uniquely identified and stored in a structured database. It also includes validation mechanisms to prevent duplicate entries and maintain data integrity.

In addition to registration, the platform plays a crucial role in post-event operations such as participant verification, data export, and certificate distribution. The system was actively used during NOVUS Hackathon 2026 to manage a large number of participants effectively.

---

## Features

The application provides a comprehensive set of features tailored for hackathon management. It allows users to register teams with multiple participants, including a designated team leader and additional members. Each registration captures essential details such as names, email addresses, phone numbers, and team information.

An approval mechanism is implemented on the backend to verify participants, enabling organizers to filter and manage only confirmed teams. The system also ensures uniqueness of team entries by enforcing constraints at the database level.

The platform supports exporting registration data into CSV format, which can be further used for operational purposes such as attendance tracking, communication, and certificate generation. Additionally, the collected data was utilized for automated email workflows and certificate distribution.

---

## Technology Stack

The application is built using a modern full-stack architecture. The frontend is developed using standard web technologies such as HTML, CSS, and JavaScript, ensuring a responsive and user-friendly interface. Depending on implementation, frameworks such as React or styling libraries like Tailwind CSS may also be used.

The backend is powered by Node.js and Express.js, providing a robust API layer for handling requests, validation, and database operations. MongoDB Atlas is used as the database solution, offering scalability and cloud-based storage for all registration data.

Additional tools such as Google Sheets, Google Drive, and Mailmeteor were integrated into the workflow for data handling and communication purposes, especially for bulk email distribution and certificate sharing.

---

## System Architecture

The application follows a client-server architecture where the frontend interacts with backend APIs to submit and retrieve data. The backend processes incoming requests, validates the data, and stores it in the MongoDB database.

Each team registration is stored as a document containing structured information about the team name, leader, and members. The system uses a compound indexing strategy to prevent duplicate registrations based on team name and leader email.

The architecture is designed to be scalable and maintainable, allowing future enhancements such as admin dashboards, real-time updates, and additional integrations.

---

## Database Schema

The database is structured to represent team-based registrations. Each document contains details about the team, including the leader and members. A typical document structure is as follows:

```json
{
  "teamName": "GroundZero",
  "leader": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  },
  "members": [
    {
      "name": "Member One",
      "email": "member1@example.com",
      "phone": "9876543211"
    },
    {
      "name": "Member Two",
      "email": "member2@example.com",
      "phone": "9876543212"
    }
  ],
  "isApproved": true
}

```

## Installation and Setup
To set up the project locally, begin by cloning the repository from GitHub. After cloning, navigate to the project directory and install the required dependencies using npm.

A .env file must be created in the root directory to securely store environment variables such as the MongoDB connection string and email credentials. These values should not be hardcoded in the source code to ensure security.

Once the environment variables are configured, the application can be started using standard npm commands. The backend server will initialize and connect to the database, making the application ready for use.



## Data Management and Export
The platform allows organizers to export registration data from MongoDB into CSV format. This feature is essential for managing participants outside the application, including tasks such as filtering verified teams, preparing attendance sheets, and generating certificates.

The exported data can be opened in spreadsheet tools and further processed according to event requirements. This functionality significantly reduces manual effort and improves operational efficiency.


## Security Considerations
Sensitive information such as database credentials, API keys, and email passwords are stored securely using environment variables. The .env file is excluded from version control using .gitignore to prevent accidental exposure.

If any credentials were previously exposed, it is recommended to regenerate them immediately and update the environment configuration. Proper handling of secrets is critical when making the repository public.


## Future Enhancements
The project can be further improved by introducing an administrative dashboard for real-time monitoring and management of registrations. Additional features such as authentication, role-based access control, and automated certificate generation can enhance functionality.

Integration with payment gateways and real-time analytics can also be considered for future versions. These enhancements would make the platform more robust and suitable for larger-scale events.


## Conclusion
The NOVUS Hackathon Registration Portal successfully addressed the challenges of managing large-scale hackathon registrations. It provided a structured, efficient, and scalable solution that supported both pre-event and post-event workflows.

The system demonstrates practical application of full-stack development concepts and showcases how technology can simplify event management processes. It serves as a strong foundation for future improvements and similar event-based platforms.



## Contact
For any queries or collaboration opportunities, please contact:

nanamlalithkumar@gmail.com
