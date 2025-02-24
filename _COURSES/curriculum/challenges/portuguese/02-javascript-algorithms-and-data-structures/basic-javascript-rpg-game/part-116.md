---
id: 5d80d67021b11cdaa3f6b167
title: Part 116
challengeType: 0
dashedName: part-116
---

# --description--

The conditional operator, also called the ternary operator, can be used as a one line if-else expression. The syntax is: `condition ? statement-if-true : statement-if-false;`.

Change the if-else expression from the last challenge to use the ternary operator instead. Here is an example:

```js
if (age >= 18) {
  adultFunction();
} else {
  kidFunction();
}

// The above if-else expression does the same thing as the following line

age >= 18 ? adultFunction() : kidFunction();
```

# --hints--

See description above for instructions.

```js
assert(
  attack
    .toString()
    .match(
      /^\s*\}\s*else\s*if\s*\(\s*monsterHealth\s*\<\=\s*0\s*\)\s*\{\s*fighting\s*\=\=\=\s*2\s*\?\s*winGame\(\s*\)\s*\:\s*defeatMonster\(\s*\)\;?\s*\}/m
    )
);
```

# --seed--

## --before-user-code--

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>RPG - Dragon Repeller</title>
    <style>
      body {
        background-color: darkblue;
      }
      #text {
        background-color: black;
        color: white;
        padding: 10px;
      }
      #game {
        max-width: 500px;
        max-height: 400px;
        background-color: lightgray;
        color: white;
        margin: 0 auto;
        padding: 10px;
      }
      #controls {
        border: 1px black solid;
        padding: 5px;
      }
      #stats {
        border: 1px black solid;
        color: black;
        padding: 5px;
      }
      #monsterStats {
        display: none;
        border: 1px black solid;
        color: white;
        padding: 5px;
        background-color: red;
      }
      .stat {
        padding-right: 10px;
      }
    </style>
  </head>
  <body>
    <div id="game">
      <div id="stats">
        <span class="stat"
          >XP: <strong><span id="xpText">0</span></strong></span
        >
        <span class="stat"
          >Health: <strong><span id="healthText">100</span></strong></span
        >
        <span class="stat"
          >Gold: <strong><span id="goldText">50</span></strong></span
        >
      </div>
      <div id="controls">
        <button id="button1">Go to store</button>
        <button id="button2">Go to cave</button>
        <button id="button3">Fight dragon</button>
      </div>
      <div id="monsterStats">
        <span class="stat"
          >Monster Name: <strong><span id="monsterName"></span></strong
        ></span>
        <span class="stat"
          >Health: <strong><span id="monsterHealth"></span></strong
        ></span>
      </div>
      <div id="text">
        Welcome to Dragon Repeller. You must defeat the dragon that is
        preventing people from leaving the town. You are in the town square.
        Where do you want to go? Use the buttons above.
      </div>
    </div>
  </body>
</html>
```

## --after-user-code--

```html
</body>
</html>
```

## --seed-contents--

```html
<script>
  let xp = 0;
  let health = 100;
  let gold = 50;
  let currentWeapon = 0;
  let fighting;
  let monsterHealth;
  let inventory = ["stick"];

  const button1 = document.querySelector("#button1");
  const button2 = document.querySelector("#button2");
  const button3 = document.querySelector("#button3");
  const text = document.querySelector("#text");
  const xpText = document.querySelector("#xpText");
  const healthText = document.querySelector("#healthText");
  const goldText = document.querySelector("#goldText");
  const monsterStats = document.querySelector("#monsterStats");
  const monsterNameText = document.querySelector("#monsterName");
  const monsterHealthText = document.querySelector("#monsterHealth");

  const weapons = [
    {
      name: "stick",
      power: 5,
    },
    {
      name: "dagger",
      power: 30,
    },
    {
      name: "claw hammer",
      power: 50,
    },
    {
      name: "sword",
      power: 100,
    },
  ];

  const monsters = [
    {
      name: "slime",
      level: 2,
      health: 15,
    },
    {
      name: "fanged beast",
      level: 8,
      health: 60,
    },
    {
      name: "dragon",
      level: 20,
      health: 300,
    },
  ];

  const locations = [
    {
      name: "town square",
      "button text": ["Go to store", "Go to cave", "Fight dragon"],
      "button functions": [goStore, goCave, fightDragon],
      text: 'You are in the town square. You see a sign that says "Store."',
    },
    {
      name: "store",
      "button text": [
        "Buy 10 health (10 gold)",
        "Buy weapon (30 gold)",
        "Go to town square",
      ],
      "button functions": [buyHealth, buyWeapon, goTown],
      text: "You enter the store.",
    },
    {
      name: "cave",
      "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
      "button functions": [fightSlime, fightBeast, goTown],
      text: "You enter the cave. You see some monsters.",
    },
    {
      name: "fight",
      "button text": ["Attack", "Dodge", "Run"],
      "button functions": [attack, dodge, goTown],
      text: "You are fighting a monster.",
    },
    {
      name: "kill monster",
      "button text": [
        "Go to town square",
        "Go to town square",
        "Go to town square",
      ],
      "button functions": [goTown, goTown, goTown],
      text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
    },
    {
      name: "lose",
      "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
      "button functions": [restart, restart, restart],
      text: "You die. ☠️",
    },
  ];

  // initialize buttons
  button1.onclick = goStore;
  button2.onclick = goCave;
  button3.onclick = fightDragon;

  function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
  }

  function goTown() {
    update(locations[0]);
  }

  function goStore() {
    update(locations[1]);
  }

  function goCave() {
    update(locations[2]);
  }

  function buyHealth() {
    if (gold >= 10) {
      gold -= 10;
      health += 10;
      goldText.innerText = gold;
      healthText.innerText = health;
    } else {
      text.innerText = "You do not have enough gold to buy health.";
    }
  }

  function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
      if (gold >= 30) {
        gold -= 30;
        currentWeapon++;
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapon].name;
        text.innerText = "You now have a " + newWeapon + ".";
        inventory.push(newWeapon);
        text.innerText += " In your inventory you have: " + inventory;
      } else {
        text.innerText = "You do not have enough gold to buy a weapon.";
      }
    } else {
      text.innerText = "You already have the most powerful weapon!";
      button2.innerText = "Sell weapon for 15 gold";
      button2.onclick = sellWeapon;
    }
  }

  function sellWeapon() {
    if (inventory.length > 1) {
      gold += 15;
      goldText.innerText = gold;
      let currentWeapon = inventory.shift();
      text.innerText = "You sold a " + currentWeapon + ".";
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "Don't sell your only weapon!";
    }
  }

  function fightSlime() {
    fighting = 0;
    goFight();
  }

  function fightBeast() {
    fighting = 1;
    goFight();
  }

  function fightDragon() {
    fighting = 2;
    goFight();
  }

  function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
  }

  function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText +=
      " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
      lose();
    } else if (monsterHealth <= 0) {
      if (fighting === 2) {
        winGame();
      } else {
        defeatMonster();
      }
    }
  }

  function dodge() {
    text.innerText =
      "You dodge the attack from the " + monsters[fighting].name + ".";
  }

  function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
  }

  function lose() {
    update(locations[5]);
  }

  function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
  }
</script>
```

# --solutions--

```html
<script>
  let xp = 0;
  let health = 100;
  let gold = 50;
  let currentWeapon = 0;
  let fighting;
  let monsterHealth;
  let inventory = ["stick"];

  const button1 = document.querySelector("#button1");
  const button2 = document.querySelector("#button2");
  const button3 = document.querySelector("#button3");
  const text = document.querySelector("#text");
  const xpText = document.querySelector("#xpText");
  const healthText = document.querySelector("#healthText");
  const goldText = document.querySelector("#goldText");
  const monsterStats = document.querySelector("#monsterStats");
  const monsterNameText = document.querySelector("#monsterName");
  const monsterHealthText = document.querySelector("#monsterHealth");

  const weapons = [
    {
      name: "stick",
      power: 5,
    },
    {
      name: "dagger",
      power: 30,
    },
    {
      name: "claw hammer",
      power: 50,
    },
    {
      name: "sword",
      power: 100,
    },
  ];

  const monsters = [
    {
      name: "slime",
      level: 2,
      health: 15,
    },
    {
      name: "fanged beast",
      level: 8,
      health: 60,
    },
    {
      name: "dragon",
      level: 20,
      health: 300,
    },
  ];

  const locations = [
    {
      name: "town square",
      "button text": ["Go to store", "Go to cave", "Fight dragon"],
      "button functions": [goStore, goCave, fightDragon],
      text: 'You are in the town square. You see a sign that says "Store."',
    },
    {
      name: "store",
      "button text": [
        "Buy 10 health (10 gold)",
        "Buy weapon (30 gold)",
        "Go to town square",
      ],
      "button functions": [buyHealth, buyWeapon, goTown],
      text: "You enter the store.",
    },
    {
      name: "cave",
      "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
      "button functions": [fightSlime, fightBeast, goTown],
      text: "You enter the cave. You see some monsters.",
    },
    {
      name: "fight",
      "button text": ["Attack", "Dodge", "Run"],
      "button functions": [attack, dodge, goTown],
      text: "You are fighting a monster.",
    },
    {
      name: "kill monster",
      "button text": [
        "Go to town square",
        "Go to town square",
        "Go to town square",
      ],
      "button functions": [goTown, goTown, goTown],
      text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
    },
    {
      name: "lose",
      "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
      "button functions": [restart, restart, restart],
      text: "You die. ☠️",
    },
  ];

  // initialize buttons
  button1.onclick = goStore;
  button2.onclick = goCave;
  button3.onclick = fightDragon;

  function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
  }

  function goTown() {
    update(locations[0]);
  }

  function goStore() {
    update(locations[1]);
  }

  function goCave() {
    update(locations[2]);
  }

  function buyHealth() {
    if (gold >= 10) {
      gold -= 10;
      health += 10;
      goldText.innerText = gold;
      healthText.innerText = health;
    } else {
      text.innerText = "You do not have enough gold to buy health.";
    }
  }

  function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
      if (gold >= 30) {
        gold -= 30;
        currentWeapon++;
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapon].name;
        text.innerText = "You now have a " + newWeapon + ".";
        inventory.push(newWeapon);
        text.innerText += " In your inventory you have: " + inventory;
      } else {
        text.innerText = "You do not have enough gold to buy a weapon.";
      }
    } else {
      text.innerText = "You already have the most powerful weapon!";
      button2.innerText = "Sell weapon for 15 gold";
      button2.onclick = sellWeapon;
    }
  }

  function sellWeapon() {
    if (inventory.length > 1) {
      gold += 15;
      goldText.innerText = gold;
      let currentWeapon = inventory.shift();
      text.innerText = "You sold a " + currentWeapon + ".";
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "Don't sell your only weapon!";
    }
  }

  function fightSlime() {
    fighting = 0;
    goFight();
  }

  function fightBeast() {
    fighting = 1;
    goFight();
  }

  function fightDragon() {
    fighting = 2;
    goFight();
  }

  function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
  }

  function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText +=
      " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
      lose();
    } else if (monsterHealth <= 0) {
      fighting === 2 ? winGame() : defeatMonster();
    }
  }

  function dodge() {
    text.innerText =
      "You dodge the attack from the " + monsters[fighting].name + ".";
  }

  function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
  }

  function lose() {
    update(locations[5]);
  }

  function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
  }
</script>
```
