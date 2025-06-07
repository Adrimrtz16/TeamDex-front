export async function getRegister(username, password, email, profilePictureUrl = '', role = null) {
  try {
    const body = { username, password, email, profilePictureUrl };
    if (role) body.role = role;

    const response = await fetch('http://localhost:8080/auth/register', {
    //const response = await fetch('https://teamdex-back.onrender.com/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message || 'Registro exitoso' };
    } else {
      return { success: false, message: data.message || 'Registro incorrecto' };
    }
  } catch (error) {
    return { success: false, message: 'Error de red ' + error.message };
  }
}