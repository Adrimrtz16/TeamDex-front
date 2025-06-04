export async function getLogin(username, password) {
  try {
    //const response = await fetch('http://localhost:8080/auth/login', {
    const response = await fetch('https://teamdex-back.onrender.com/auth/login', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Login correcto, guarda el token
      localStorage.setItem('token', data.token);
      return { success: true, token: data.token };
    } else {
      // Login incorrecto, muestra el error
      return { success: false, message: data.message || 'Login incorrecto ' + data.token };
    }
  } catch (error) {
    return { success: false, message: 'Error de red ' + error.message };
  }
}