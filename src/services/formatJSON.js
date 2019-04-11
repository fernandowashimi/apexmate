const format = data => {
  return {
    playerfound: data.playerfound,
    player: {
      name: data.name,
      aid: data.aid,
      avatar: data.avatar,
      platform: data.platform,
      level: data.level,
      kills: data.kills,
      headshots: data.headshots,
      matches: data.matches,
      damage: data.damage,
      globalrank: data.globalrank
    },
    legends: [
      {
        name: "Bloodhound",
        kills: data.kills_Bloodhound,
        headshots: data.headshots_Bloodhound,
        matches: data.matches_Bloodhound,
        damage: data.damage_Bloodhound
      },
      {
        name: "Gibraltar",
        kills: data.kills_Gibraltar,
        headshots: data.headshots_Gibraltar,
        matches: data.matches_Gibraltar,
        damage: data.damage_Gibraltar
      },
      {
        name: "Lifeline",
        kills: data.kills_Lifeline,
        headshots: data.headshots_Lifeline,
        matches: data.matches_Lifeline,
        damage: data.damage_Lifeline
      },
      {
        name: "Pathfinder",
        kills: data.kills_Pathfinder,
        headshots: data.headshots_Pathfinder,
        matches: data.matches_Pathfinder,
        damage: data.damage_Pathfinder
      },
      {
        name: "Wraith",
        kills: data.kills_Wraith,
        headshots: data.headshots_Wraith,
        matches: data.matches_Wraith,
        damage: data.damage_Wraith
      },
      {
        name: "Bangalore",
        kills: data.kills_Bangalore,
        headshots: data.headshots_Bangalore,
        matches: data.matches_Bangalore,
        damage: data.damage_Bangalore
      },
      {
        name: "Caustic",
        kills: data.kills_Caustic,
        headshots: data.headshots_Caustic,
        matches: data.matches_Caustic,
        damage: data.damage_Caustic
      },
      {
        name: "Mirage",
        kills: data.kills_Mirage,
        headshots: data.headshots_Mirage,
        matches: data.matches_Mirage,
        damage: data.damage_Mirage
      },
      {
        name: "Octane",
        kills: data.kills_Octane,
        headshots: data.headshots_Octane,
        matches: data.matches_Octane,
        damage: data.damage_Octane
      }
    ]
  };
};

export default format;
