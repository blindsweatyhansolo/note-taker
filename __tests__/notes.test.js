const fs = require('fs');
const { notes } = require('../db/db');

jest.mock('fs');

test('creates new note object', () => {
    const note = {
        title: "Chores",
        text: "Do laundry" 
    };

    expect(note.title).toBe("Chores");
    expect(note.text).toBe("Do laundry");
});