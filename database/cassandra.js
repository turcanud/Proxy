const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: ['0.0.0.0'],
    localDataCenter: 'datacenter1',
    keyspace: 'employees',
});

async function createEmployeeTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS employees (
      id INT PRIMARY KEY,
      email TEXT,
      name TEXT
    )`;
    await client.execute(query);
    console.log('Employee table created');
}

async function createCounterTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS employee_counter (
      id INT PRIMARY KEY,      -- Fixed ID to identify the counter
      counter_value COUNTER    -- Counter field
    )`;
    await client.execute(query);
    console.log('Counter table created');

    const initQuery = 'UPDATE employee_counter SET counter_value = counter_value + 0 WHERE id = 1';
    await client.execute(initQuery);
    console.log('Counter initialized.');
}

async function getNextId() {
    const incrementQuery = 'UPDATE employee_counter SET counter_value = counter_value + 1 WHERE id = 1';
    const selectQuery = 'SELECT counter_value FROM employee_counter WHERE id = 1';

    await client.execute(incrementQuery);

    const result = await client.execute(selectQuery);
    return result.rows[0].counter_value.low;
}

async function insertEmployee(name, email) {
    const id = await getNextId();
    const query = 'INSERT INTO employees (id, email, name) VALUES (?, ?, ?)';
    const params = [id, email, name];
    await client.execute(query, params, { prepare: true });
    return {
        message: `Employee ${name} with email ${email} inserted successfully.`,
    };
}


async function getAllEmployees() {
    const query = 'SELECT * FROM employees';
    const result = await client.execute(query);

    if (result.rowLength > 0) {
        const employees = result.rows.map(row => ({
            id: row.id,
            email: row.email,
            name: row.name
        }));
        return employees;
    } else {
        return [];
    }
}

async function getEmployeeById(id) {
    const query = 'SELECT * FROM employees WHERE id = ?';
    const params = [id];
    const result = await client.execute(query, params, { prepare: true });

    if (result.rowLength > 0) {
        return {
            id: result.rows[0].id,
            email: result.rows[0].email,
            name: result.rows[0].name
        };
    } else {
        return null;
    }
}

module.exports = {
    client,
    createEmployeeTable,
    createCounterTable,
    insertEmployee,
    getAllEmployees,
    getEmployeeById,
};
