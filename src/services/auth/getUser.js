export async function getUser(id) {
    const token = localStorage.getItem('token');

    const resp = await fetch(`http://localhost:8080/auth/${id}`, {
    //const resp = await fetch(`https://teamdex-back.onrender.com/auth/${id}`, {
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