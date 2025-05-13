# Angular-SpringBoot-Charity
This is a full-stack web application built using Angular (frontend) and Spring Boot (backend). The platform is designed to support charity organizations, volunteers, donors, and refugees by facilitating assistance, donations, and communication

🎭 User Roles (Actor Identification)
Administrator

Validates user and organization registrations.

Monitors user activity and ensures platform security.

Manages permissions and detects/prevents fraud.

Maintains overall platform operations.

Contributors (Associations, Volunteers, Donors)

Register and get verified.

Report or support cases in need.

Organize events and fundraisers.

Donate money, goods, or information.

Share resources with refugees.

Beneficiaries (Refugees & People in Need)

Request aid or find shelters/services.

Access verified information.

Receive donations (money/goods).

🛠️ Core Modules & Functional Requirements
1. Event Management Module
Filter events by date, category, or location.

Advanced search with autocomplete and suggestions.

Notify users 3 days before an upcoming event.

2. Rewards Management Module
Notify users when they receive a badge or reach a point threshold.

Auto-assign badges/points for donations or participation.

3. Participation Management Module
Track user engagement using a points and badges system.

Export participant data to CSV or PDF.

Display a leaderboard of most active users.

4. Refugee Support Management Module
Refugees can create profiles, specify needs, and upload documents.

Match needs to services (e.g., housing, healthcare).

Notify refugees with updates, appointments, and new resources.

Generate reports on common needs and assistance trends.

5. Notification Management Module
Real-time alerts for messages and activity.

Support for push and email notifications.

Allow custom notification preferences.

Show unread indicators and key event triggers.

6. Case Management Module
Enable secure registration for missing family cases.

Allow status tracking and updates.

Support document authentication and verification.

🧱 Technical Stack
Frontend: Angular

Responsive UI for contributors, beneficiaries, and admins.

Modules for event listing, notification display, and dashboard interaction.

Backend: Spring Boot

REST APIs for user roles, donations, events, authentication, notifications.

Handles business logic and database operations.

Database: Likely using MySQL/PostgreSQL, with entities for users, events, cases, etc.

📦 Suggested Repository Structure (Sample)
css
Copy
Edit
charity-platform/
├── backend/
│   └── src/main/java/com/charity/...
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── model/
│       └── config/
├── frontend/
│   └── src/app/
│       ├── modules/
│       ├── components/
│       ├── services/
│       └── routes/
├── database/
│   └── schema.sql
├── README.md
├── pom.xml / build.gradle
└── angular.json

