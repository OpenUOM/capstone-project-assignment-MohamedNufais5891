import { Selector } from 'testcafe';

process.env.NODE_ENV = "test";

fixture`Testing Student UI`
    .page`http://localhost:4401/student`;

test('Testing add students', async t => {
    // Navigate to database initialization page
    await t.navigateTo("/dbinitialize");

    // Input student details
    await t.typeText("#student-id", "999999");
    await t.typeText("#student-name", "Pasindu Basnayaka");
    await t.typeText("#student-age", "45");
    await t.typeText("#student-hometown", "Catholic");
    await t.click("#student-add");

    // Navigate back to ensure the database reflects changes
    await t.navigateTo("/student");

    // Verify the new student entry in the table
    const table = Selector('#student-table');
    const rowCount = await table.find('tr').count;
    const lastRowText = await table.find('tr').nth(rowCount - 1).innerText;

    // Assert that the last row contains the newly added student's details
    await t.expect(lastRowText).contains("999999");
    await t.expect(lastRowText).contains("Pasindu Basnayaka");
    await t.expect(lastRowText).contains("45");
    await t.expect(lastRowText).contains("Catholic");
});
