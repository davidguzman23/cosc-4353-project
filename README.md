# cosc-4353-project
Volunteer Management Web App

## Initial Thoughts 

> Consider user experience: How will users (volunteers and administrators) interact with the application?

Logging In / Registering - 
After accessing the site, both volunteers and administrators will share the same experience. They will be prompted to login via a login page to further access the site.
An option to register will be present if they do not have a login. During registration, new users will need to provide a username and password. Once these are entered,
they will be presented with an email field to verify their account.

User Profile Management -
Immediately after registering, new users will be sent to an identifier or "tag" page. This page will ask users to click on onscreen tags that identify their skills, preferences, and availability. When a user has finished, they will be prompted to enter their location as the final tag. The tag page will be optional, a tiny skip option will be present on the page's right hand corner. Should a user choose to skip the tag
page, their events page will only favor showing urgent or prioritized events.

Regardless of whether they skip or fill out the tag page, all new users will be sent to the events page (the main page).
Returning users are simply sent to the events page after logging in. 

Event Management & Volunteer Matching -
The events page will use the tags of an individual to populate itself with relevant events. For example, a volunteer whose location is in Katy would get recommended more events in Katy. At the top of the page 
will be a search bar used to find more specific events. 

Clicking on any event will direct volunteers towards a page dedicated to that event. Descriptions, requirements, images and an enlist button will be present on this page. 

Using the event page, administrators will have the added ability to create, delete, and modify current events. The creation/modification process will allow admins to add/edit tags to attract relevant volunteers.
The administrator will also have the ability to add requirements to an event when creating/modifying. Requirements will serve as restrictions for who can join an event. For example, an event could rely on the volunteers being forklift certified. Should a volunteer who doesn't have the forklift certified tag try to join, the event page will notify the user that they don't meet the requirements via a pop-up. 

Beyond tagging, Administrators will also be able to add/edit titles, descriptions, and images relating to an event.

Notification System-
On the web app's sidebar will be a notifications tab. It will glow whenever new notifications are present. Pressing the tab will bring users to the notifications page. This page will contain notices in the form of reminders, updates, and assignments for events. All notifications will also be sent as emails to users. 

Volunteer History-
At the top of the web app's sidebar will the the profile tab. Clicking it will take a user to their profile page. This page will allow users to update their tags and view their volunteering history. By clicking 
on the events listed in their history, they will be taken to an event's page for more information.

Administrators will have the ability to leave performance reviews on the profile pages of users. These reviews can only be seen by administrators. Should a user prove too troublesome, they will also have the option to disable an account from the profile page of the selected user. Disabled accounts lose their ability to enlist in events.

## Development Methodology

We choose to use Agile as our development methodology. Agile will help keep everyone organized and efficient so no two people end up working on the same thing while all of us work concurrently. Furthermore, Furthermore, Agile's sprints will help us manage the project more effectively by giving us weekly goals.

## High-Level Design / Architecture


+++ STILL IN PROGRESS, WILL PULL REQUEST ON FRIDAY, WILL CHECK FOR TYPOS GRAMMAR AND REFORMAT(MARK UP EFFECTS) PARAGRAPHS ON FRIDAY

Click on website, if aren’t logged in, they must register in a login page (text boxes with checks, submit button, verify email that they enter)
1. Login & 2. User Registration
Notification system
Profile / settings page - icon at the top of website
3. User Profile Management, 6. Notification History & 7. Volunteer History
Tags page (things they like)
Textbox, updating list of tags they can click and add, each tag has an x button to remove
Optional, but if they choose some they must choose more than 3 (maybe more), click done and send them to the events page
History of person’s volunteer activities
Link to events page (button)
Add more tags to your preferences here (maybe in settings option)
Profile notifications (red dot) - notifications & updates about anything
Events page - main page
4. Event Management & 5. Volunteer Matching
Volunteers page
Search bar - searching for events
Automatic Assortment of Events
Block them from joining events
Administrators will be able to create events
Create events (picture, description, tags, etc.)
Track events and people that sign up (Directory or Users)
Have the power to block volunteers
Feature - email reminders
6. Notification System
Depending on the type of notification, notify a group of certain people about something
