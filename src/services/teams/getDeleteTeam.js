export async function getDeleteTeam(token, id) {
  try {
    //const response = await fetch(`http://localhost:8080/teams/delete/${id}`, {
    const response = await fetch(`https://teamdex-back.onrender.com/teams/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    let data = {};
    const text = await response.text();
    if (text) {
      data = JSON.parse(text);
    }

    if (response.ok) {
      window.location.href = '/teams';
      return { success: true, message: data.message || 'Eliminado correctamente' };
    } else {
      return { success: false, message: data.message || 'No se pudo eliminar' };
    }
  } catch (error) {
    return { success: false, message: 'Error de red: ' + error.message };
  }
}