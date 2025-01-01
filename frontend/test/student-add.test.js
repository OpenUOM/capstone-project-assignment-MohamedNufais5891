import { Selector } from 'testcafe';

process.env.NODE_ENV = "test";

fixture`Testing Student UI`
    .page`http://localhost:4401/student`;

test('Testing add students', async t => {
    // Navigate to database initialization page to prepare the environment
    await t.navigateTo("/dbinitialize");

    // Input student details
    await t.typeText("#student-id", "999999");
    await t.typeText("#student-name", "Pasindu Basnayaka");
    await t.typeText("#student-age", "45");
    await t.typeText("#student-Hometown", "Catholic");
    await t.click("#student-add");

    // Navigate back to the student page to verify the table
    await t.navigateTo("/student");

    // Select the student table
    const table = Selector('#student-table');
    const rowCount = await table.find('tr').count;

    // Get the last row's text and validate it
    const lastRowText = await table.find('tr').nth(rowCount - 1).innerText;

    // Assert that the last row contains the newly added student's details
    await t.expect(lastRowText).contains("999999");
    await t.expect(lastRowText).contains("Pasindu Basnayaka");
    await t.expect(lastRowText).contains("45");
    await t.expect(lastRowText).contains("Catholic");
});

