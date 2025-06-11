export async function getCreateTeam(name, pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6, token) {
  try {

    if(name ===  null || name === undefined || name === '') {
      name = 'Unnamed';
    }
    
    const body = {name, pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6}
    //const response = await fetch('http://localhost:8080/teams/create', {
    const response = await fetch('https://teamdex-back.onrender.com/teams/create', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

  const data = await response.json();

  if (response.ok) {
      return { success: true, message: 'Equipo creado correctamente', team: data };
    } else {
      return { success: false, message: data.message || 'Error al crear el equipo' };
    }

  } catch (error) {
    return { success: false, message: 'Error de red ' + error.message };
  }
}



