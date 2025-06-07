export async function getCreateTeam(name, pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6, token) {
  try {
    const body = {name, pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6}
    console.log('Creating team with body:', body);
    const response = await fetch('http://localhost:8080/teams/team/create', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
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