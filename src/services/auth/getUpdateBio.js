export async function getUpdateBio(id, bio, token) {
  try {

    const body = { bio };
    //const response = await fetch(`http://localhost:8080/auth/update/bio/${id}`, {
    const response = await fetch(`https://teamdex-back.onrender.com/auth/update/bio/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    if (response.ok) {
        window.location.href = '/me';
        return { success: true, message: 'Biografía actualizada correctamente', team: data };
    } else {
        return { success: false, message: data.message || 'Error al actualizar la biografía' };
    }


  } catch (error) {
    return { success: false, message: 'Error de red ' + error.message };
  }
}