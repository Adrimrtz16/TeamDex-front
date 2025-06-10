import pokemonNatures from '../mocks/mockNatures';

const defaultTemplate = {
  name: '',
  level: 100,
  shiny: false,
  sprite: "",     
  item: '',
  teraType: 'normal',
  abilitie: '',
  moves: ['', '', '', ''],
  nature: '',
  natureUp: 1,
  natureDown: 1,
  natureNeutral: false,
  stats: [0, 0, 0, 0, 0, 0],   // HP, Atk, Def, SpA, SpD, Spe
  evs: [0, 0, 0, 0, 0, 0],
  ivs: [31, 31, 31, 31, 31, 31],
};

export function useBuildingTeam(teamArr) {

  return teamArr.map(str => {
    // si viene vacío, devolvemos copia del template
    if (!str) return { ...defaultTemplate };

    // 1) separamos en tokens (doble espacio o más)
    const tokens = str.split(/\s{2,}/).map(t => t.trim());

    // 2) extraemos los trozos
    const obj = { ...defaultTemplate };

    // a) name / item
    const first = tokens.find(t => t.includes('@')) || '';
    const [name = '', item = ''] = first.split('@').map(s => s.trim());
    obj.name = name;
    obj.item = item;

    // b) ability, level, shiny, teraType, evs, ivs, nature
    tokens.forEach(t => {
      if (t.startsWith('Ability:')) {
        obj.abilitie = t.slice(9).trim();
      } else if (t.startsWith('Level:')) {
        obj.level = Number(t.slice(6).trim());
      } else if (t === 'Shiny: Yes') {
        obj.shiny = true;
      } else if (t.startsWith('Tera Type:')) {
        obj.teraType = t.slice(10).trim().toLowerCase();
      } else if (t.startsWith('EVs:')) {
        // parseamos cada par “<num> <stat>”
        const evsArr = [0,0,0,0,0,0];
        t
          .slice(4).split(/\s*\/\s*/)
          .forEach(pair => {
            const [num, stat] = pair.trim().split(' ');
            const n = Number(num);
            switch (stat) {
              case 'HP':   evsArr[0] = n; break;
              case 'Atk':  evsArr[1] = n; break;
              case 'Def':  evsArr[2] = n; break;
              case 'SpA':  evsArr[3] = n; break;
              case 'SpD':  evsArr[4] = n; break;
              case 'Spe':  evsArr[5] = n; break;
            }
          });
        obj.evs = evsArr;
      } else if (t.startsWith('IVs:')) {
        // por ejemplo “IVs: 0 Atk”
        const [, num, stat] = t.match(/IVs:\s*(\d+)\s+(\w+)/);
        const ivsArr = [...obj.ivs];
        const n = Number(num);
        switch (stat) {
          case 'HP':   ivsArr[0] = n; break;
          case 'Atk':  ivsArr[1] = n; break;
          case 'Def':  ivsArr[2] = n; break;
          case 'SpA':  ivsArr[3] = n; break;
          case 'SpD':  ivsArr[4] = n; break;
          case 'Spe':  ivsArr[5] = n; break;
        }
        obj.ivs = ivsArr;
      } else if (t.endsWith('Nature')) {
        const nat = t.replace('Nature', '').trim();
        obj.nature = nat;
        // buscamos boosts/reduces
        const info = pokemonNatures.find(n => n.name === nat);
        if (info) {
          obj.natureUp = info.boosts;
          obj.natureDown = info.reduces;
          obj.natureNeutral = info.boosts === info.reduces;
        }
      }
    });

    // c) movimientos: busca todos los "- Move" en el string original
    const movesMatch = str.match(/-\s+([^\-]+)/g) || [];
    obj.moves = movesMatch.map(m => m.replace(/-\s+/, '').trim()).slice(0, 4);
    
    const moveMap = {
        'u': 'U-turn',
        'double': 'Double-Edge',
        'self': 'Self-Destruct',
        'x': 'X-Scissor',
        'baby': 'Baby-Doll Eyes',
        'v': 'V-create',
        'power': 'Power-Up Punch',
        'multi': 'Multi-Attack',
        'freeze': 'Freeze-Dry'
    };

    obj.moves = obj.moves.map(move => {
        const key = move.toLowerCase();
        return moveMap[key] || move;
    });

    return obj;
  });
}