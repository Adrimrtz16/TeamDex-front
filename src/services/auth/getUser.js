export async function getUser(id) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No estás autenticado');
  }

  //const resp = await fetch(`http://localhost:8080/auth/${id}`, {
    const resp = await fetch(`https://teamdex-back.onrender.com/auth/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

  if (!resp.ok) {
    // Si viene 401/403, por ejemplo, token inválido o caducado:
    if (resp.status === 401 || resp.status === 403) {
      localStorage.removeItem('token');
      return;
    }
    const texto = await resp.text();
    throw new Error(`Error ${resp.status}: ${texto}`);
  }

  const userData = await resp.json();
  console.log('User data fetched:', userData);
  return userData;
}