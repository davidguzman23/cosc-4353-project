const connectDB = require("./db");
const { User, Profile, Event, Notification, Volunteer } = require("./models");

const seedDatabase = async () => {
    await connectDB();

    try {
        // Insert a User
        const user = await User.create({
            email: "manager@example.com",
            role: "MANAGER",
            password: "securepassword123"
        });

        // Insert a Profile
        await Profile.create({
            email: user.email,
            full_name: "John Doe",
            address_1: "123 Main St",
            city: "New York",
            state: "NY",
            zip: "10001",
            skills: "Leadership, Communication",
            availability: [new Date()]
        });

        // Insert an Event
        const event = await Event.create({
            name: "Charity Drive",
            description: "Help distribute food",
            location: "Community Center",
            skills: ["Organizing", "Packing"],
            urgency: "HIGH",
            date: new Date()
        });

        // Insert a Notification
        await Notification.create({
            email: user.email,
            message: "You have been assigned to an event",
            type: "SUCCESS"
        });

        // Insert a Volunteer
        await Volunteer.create({
            email: user.email,
            event_id: event._id
        });

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Seeding error:", error);
    } finally {
        process.exit();
    }
};

module.exports = seedDatabase();
