const {
    client,
    createEmployeeTable,
    createCounterTable,
    insertEmployee,
    getAllEmployees,
    getEmployeeById,
} = require('./database/cassandra.js');

async function main() {
    try {
        await client.connect();
        // await createEmployeeTable();
        // await createCounterTable();
        // await insertTestEmployees();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.shutdown();
        console.log('Connection closed');
    }
}

async function insertTestEmployees() {
    const employees = [
        { name: 'Alice Johnson', email: 'alice.johnson@example.com' },
        { name: 'Bob Smith', email: 'bob.smith@example.com' },
        { name: 'Carol Davis', email: 'carol.davis@example.com' },
        { name: 'Daniel Thompson', email: 'daniel.thompson@example.com' },
        { name: 'Emma Wilson', email: 'emma.wilson@example.com' },
        { name: 'Frank Miller', email: 'frank.miller@example.com' },
        { name: 'Grace Lee', email: 'grace.lee@example.com' },
        { name: 'Harry White', email: 'harry.white@example.com' },
        { name: 'Isabella Brown', email: 'isabella.brown@example.com' },
        { name: 'James Taylor', email: 'james.taylor@example.com' },
    ];

    for (const employee of employees) {
        try {
            await insertEmployee(employee.name, employee.email);
        } catch (err) {
            console.error(`Failed to insert ${employee.name}:`, err.message);
        }
    }
}

main();
