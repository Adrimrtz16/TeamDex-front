export async function getMe() {
    const token = localStorage.getItem('token');
    //const resp = await fetch('http://localhost:8080/auth/me', {
    const resp = await fetch('https://teamdex-back.onrender.com/auth/me', {

    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

  if (!resp.ok) {
    throw new Error('No se pudo obtener el usuario');
  }

  return await resp.json();
}