# cosc-4353-project
Volunteer Management Web App

---

## Initial Thoughts 
> Consider user experience: How will users (volunteers and administrators) interact with the application?
### **User Experience (UX) Considerations:**
- **Volunteers**  
    - **Sign Up & Log In**: Register and log in integrations.
    - **Volunteer Schedule**: Set availability for volunteering, dates, hours, places.
    - **Volunteer Tasks**: See assigned tasks, deadlines, and progress.
    - **Notifications**: Get email/message reminders for upcoming volunteering events.
    - **Analytics**: View logged hours, places worked and contributions.
- **Administrators**  
    - **Log In**: Log in integration. Registration is done by the system owner.
    - **Volunteer Schedule**: Approve, assign, and track volunteers.
    - **Volunteer Tasks**: Assign tasks, set deadlines, and match volunteers.
    - **Notifications**: Send emails/message notifications to the volunteers.
    - **Analytics**: Track participation, hours worked, places worked and generate reports. 

> Identify the key functionalities: What are the essential features the application must have?
### **Key Functionalities:**
- **User Authentication & Authorization**  
   - Secure login using authentication methods.
   - Register and log in for volunteers. Log in only for administrators.
- **Volunteer Schedule**
   - Volunteers can mark available slots.
   - Admins can change their schedule accordingly.
- **Volunteer Tasks**
   - Volunteers can claim and complete tasks.
   - Admins can assign, edit, and track tasks.
- **Notifications**
   - Email/message reminders for tasks.
   - Admin announcements for volunteers.
- **Analytics**
   - Volunteers log work hours.
   - Admins generate participation reports.

---

### Logging In / Registering
After accessing the site, both volunteers and administrators will share the same experience. They will be prompted to login via a login page to further access the site.
An option to register will be present if they do not have a login. During registration, new users will need to provide a username and password. Once these are entered, they will be presented with an email field to verify their account.

- **Features of the Login System:**
    - **User Registration:** Sign-up with email, password, or social media.
    - **Secure Authentication:** JWT security session-based login.
    - **Role-Based Access Control (RBAC):** Assign different permissions for volunteers and administrators.
    - **Password Hashing & Storage:** Using SHA algorithms for storing the password.
    - **Session Management:** Remember me functionality.
    - **Account Recovery:** Forgot password and reset options.
- **Programming Tools & Technologies:**
    | Feature | Tool/Technology | Purpose |
    |---------|---------------|---------|
    | **Database** | MySQL | Stores user credentials securely |
    | **Backend Framework** | Express.js (Node.js) | Handles authentication API routes |
    | **Authentication Library** | Passport.js (Node.js) | Manages authentication logic |
    | **Encryption** | SHA algorithms | Hashes and secures passwords |
    | **Token Management** | JWT (JSON Web Tokens) | Manages user authentication and sessions |
    | **Session Management** | Memcached | Stores user sessions in-memory |
    | **Frontend Framework** | React.js/Vue.js | Implements login UI |
    | **State Management** | Redux | Manages user authentication state |
    | **Environment Variables** | dotenv (Node.js) | Manages secret keys securely |

---

### User Profile Management
Immediately after registering, new users will be sent to an identifier or "tag" page. This page will ask users to click on onscreen tags that identify their skills, preferences, and availability. When a user has finished, they will be prompted to enter their location as the final tag. The tag page will be optional, a tiny skip option will be present on the page's right hand corner. Should a user choose to skip the tag page, their events page will only favor showing urgent or prioritized events.

Regardless of whether they skip or fill out the tag page, all new users will be sent to the events page (the main page).
Returning users are simply sent to the events page after logging in. 

---

### Event Management & Volunteer Matching 
The events page will use the tags of an individual to populate itself with relevant events. For example, a volunteer whose location is in Katy would get recommended more events in Katy. There will be a search bar at the top of the page so that users may find specific events. 

Clicking on any event will direct volunteers towards a page dedicated to that event. Descriptions, requirements, images and an enlist button will be present on this page. 

Using the events page, administrators will have the added ability to create, delete, and modify current events. The creation/modification process will allow admins to add/edit tags to attract relevant volunteers.
The administrator will also have the ability to add requirements to an event when creating/modifying. Requirements will serve as restrictions for who can join an event. For example, an event could rely on the volunteers being forklift certified. Should a volunteer who doesn't have the forklift certified tag try to join, the events page will notify the user that they don't meet the requirements via a pop-up. 

Beyond tagging, administrators will also be able to add/edit titles, descriptions, and images relating to an event.

---

### Notification System
On the web app's sidebar will be a notifications tab. It will glow whenever new notifications are present. Pressing the tab will bring users to the notifications page. This page will contain notices in the form of reminders, updates, and assignments for events. All notifications will also be sent as emails to users.

- **Developing the Notifications System:**  
    - The notifications system will be designed to send real-time and scheduled notifications to volunteers and administrators via email and website messages.
    - Types of Notifications:
        - **Email Notifications**: For task reminders, admin messages, and reports.
        - **Message notifications**: As a backup notification message that will always be sent in the website.
- **Programming Tools & Technologies:**  
    | Feature | Tool/Technology | Reason for Use |
    |---------|---------------|---------------|
    | **Backend Framework** | Node.js | Handle notification logic and API routes |
    | **Database** | MySQL | Store notification history and preferences |
    | **Email** | Nodemailer | Send emails to administrators and volunteers |
    | **Message** | Node.js | Messages will be retrieved when logged in |

---

### Volunteer History
The profile tab will be situated at the top of the web app's sidebar. Clicking this tab will take a user to their profile page. From this page, users will be able to update their tags and view their volunteering history. 

Administrators will have the ability to leave performance reviews on the profile pages of users. These reviews can only be seen by administrators. Should a user prove too troublesome, they will also have the option to disable an account from the profile page of the selected user. Disabled accounts lose their ability to enlist in events.

> Technology stack: What technologies might you use for front-end, back-end, database, and other components?

We are planning to use ReactJS for the front-end, Node.js for the back-end, MySQL for the database, and an email API to send notifications to users. We might use mailgun.

---

## Development Methodology

>Explain why you would choose a particular development methodology (e.g., Agile, Waterfall, DevOps).

We chose to use Agile as our development methodology. Agile will help keep everyone organized and efficient so no two people end up working on the same thing while all of us work concurrently. Furthermore, Agile's sprints will help us manage the project more effectively by giving us weekly goals. Thus, an agile methodology that is based in SCRUM, for example, is ideal due to its flexibility, continuous feedback, and iterative approach.

>Discuss how this methodology will help manage the project effectively.

We can implement frequent testing and update the code accordingly to unit tests and integration tests. By having test plans, we could theorically, involve stakeholders and adapts any software rules to their needs. Overall, this will incur in a better risk management with incremental development as time goes on.

For the tools to be used, we can use Jira for task management, GitHub for version control and CI/CD automation.

---

## High-Level Design / Architecture

>Create a diagram to illustrate the overall structure of your application.
>
>Identify the main components (e.g., front-end, back-end, database).
>
>Describe how these components will interact with each other.
>
>Mention any third-party services or APIs you plan to integrate.

---

## Group Member Participation
| Group Member Name    | What is your contribution? | Discussion Notes |
| -------- | ------- | ------- |
| David | Created base project and organized content, worked on Initial Thoughts, Development Methodology, High-Level Design / Architecture quesitons | Created initial repository in GitHub, discussed, summarized, and finalized main points for each question, helped design user journey through website. |
| Ruk | Worked on Initial Thoughts, Development Methodology, High-Level Design / Architecture quesitons | Discussed and created main points for each question, helped design user journey through website.  Organized Group Member Participation table in README. |
| Iuri | Initial Thoughts, Development Methodology, Notification System, Logging in, README.md | Implemented more ideas, visuals and context to the whole project. Organized the document in a better way. Created and started the discussions for the group. |
| Nathan |  |  |
