import fetch from 'node-fetch';

async function test() {
    console.log("Testing API server...");
    const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: 'Hi there', wteName: 'Test' })
    });
    const data = await res.json();
    console.log(data);
}
test();
