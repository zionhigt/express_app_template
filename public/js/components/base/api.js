export default {
    send: async function(request) {
        const res = await fetch(request);
        return await res.json();
    }
}