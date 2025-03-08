const request = require("supertest");
const app = require("../server"); 

describe("Event Management API", () => {
    it("should create an event successfully", async () => {
        const res = await request(app)
            .post("/api/events")
            .send({
                title: "Test Event",
                location: "Community Park",
                skills_required: ["Teamwork", "Trash Collection"], 
                urgency: "Medium",
                details: "Helping clean up the park",
                date: "2025-05-10"
            });
    
        console.log("Response Body:", res.body);  //Debugging
    
        expect(res.statusCode).toEqual(201);
        expect(res.body.event).toHaveProperty("id");
        expect(res.body.event.title).toBe("Test Event");
    });
    
    it("should fail when required fields are missing", async () => {
        const res = await request(app).post("/api/events").send({});
    
        console.log("Response Body:", res.body);  
    
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("errors");  
        expect(res.body.errors).toMatchObject({
            title: "Title is required",
            details: "Details cannot be empty",
            location: "Location is required",
            skills_required: "At least one skill is required",  // Fixed expected message
            urgency: "Urgency is required",
            date: "Date is required"
        });
    });
    

    it("should return all events", async () => {
        const res = await request(app).get("/api/events");
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should delete an event successfully", async () => {
        const createRes = await request(app).post("/api/events").send({
            title: "Delete Me",
            location: "Test Location",
            skills_required: ["Testing"],
            urgency: "Low",
            details: "This event will be deleted",
            date: "2025-06-01"
        });
    
        console.log("Created Event Response:", createRes.body);
    
        expect(createRes.statusCode).toEqual(201);
        expect(createRes.body).toHaveProperty("event");
        expect(createRes.body.event).toHaveProperty("id");
    
        const eventId = createRes.body.event.id;
        const deleteRes = await request(app).delete(`/api/events/${eventId}`);
    
        expect(deleteRes.statusCode).toEqual(200);
        expect(deleteRes.body).toHaveProperty("message", "Event deleted successfully");
    });
    

    it("should return 404 when trying to delete a non-existent event", async () => {
        const res = await request(app).delete("/api/events/999");
    
        console.log("Delete Non-Existent Event Response:", res.body); // Debugh
    
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty("message", "Event not found"); // Ensure response has the message
    });
    
    
});
