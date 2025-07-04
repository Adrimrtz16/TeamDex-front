export async function getUserWithTeams(id) {
    const token = localStorage.getItem('token');

    //const resp = await fetch(`http://localhost:8080/auth/userWithTeams/${id}`, {
    const resp = await fetch(`https://teamdex-back.onrender.com/auth/userWithTeams/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

  if (!resp.ok) {
    const texto = await resp.text();
    throw new Error(`Error ${resp.status}: ${texto}`);
  }

  const userData = await resp.json();
  return userData;
}