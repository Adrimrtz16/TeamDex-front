export async function getTeams() {

    const resp = await fetch(`http://localhost:8080/teams/get`, {
    //const resp = await fetch(`https://teamdex-back.onrender.com/auth/public`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!resp.ok) {
    const texto = await resp.text();
    throw new Error(`Error ${resp.status}: ${texto}`);
  }

  const userData = await resp.json();
  return userData;
}