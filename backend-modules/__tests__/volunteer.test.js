const request = require("supertest");
const app = require("../server");

describe("Volunteer Matching API", () => {
  it("should register a volunteer successfully", async () => {
    const res = await request(app)
      .post("/api/volunteers")
      .send({
        name: "Alice Johnson",
        skills: ["Teamwork", "Trash Collection"],
        location: "Downtown Park",
        availability: ["Weekends"]
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.volunteer).toHaveProperty("id");
    expect(res.body.volunteer.name).toBe("Alice Johnson");
  });

  it("should fail when required volunteer fields are missing", async () => {
    const res = await request(app).post("/api/volunteers").send({});
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toMatchObject({
      name: "Name is required",
      skills: "At least one skill is required",
      location: "Location is required",
      availability: "Availability is required"
    });
  });

  it("should return a list of volunteers", async () => {
    const res = await request(app).get("/api/volunteers");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should match volunteers to events based on skills and location", async () => {
    const res = await request(app).get("/api/match-volunteers");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("matches");
    expect(Array.isArray(res.body.matches)).toBe(true);
  });

  it("should return 404 if no volunteers match", async () => {
    //Ensure volunteers and events are cleared before testing
    await request(app).delete("/api/clear-volunteers");
    await request(app).delete("/api/clear-events");

    //Step 2: Fetch volunteers & events to confirm they are empty
    const volunteersCheck = await request(app).get("/api/volunteers");
    const eventsCheck = await request(app).get("/api/events");

    console.log("Volunteers After Clear:", volunteersCheck.body);  // Should be []
    console.log("Events After Clear:", eventsCheck.body);  // Should be []

    //Step 3: Now, check for volunteer matches
    const res = await request(app).get("/api/match-volunteers");

    console.log("Match Volunteers Response:", res.body); // Should be { message: "No matching volunteers found" }

    expect(res.statusCode).toEqual(404);
    expect(res.body).toMatchObject({ message: "No matching volunteers found" });

    // Step 4: Restore original data after test
    await request(app).post("/api/volunteers").send({
        name: "John Doe",
        skills: ["Cooking", "Organization"],
        location: "Community Center",
        availability: ["Weekends"]
    });

    await request(app).post("/api/events").send({
        title: "Food Drive",
        location: "Community Center",
        skills_required: ["Cooking", "Organization"],
        urgency: "High",
        details: "Helping distribute food",
        date: "2025-07-01"
    });
});

});