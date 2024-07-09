function createPlayersSection(menu) {
	// we want to hide result section every time, when number of players is changed
	document.getElementById("result").style.display = "none"

	if (menu.value == '-') {
		document.getElementById("players").style.display = "none"
		alert("Choose value")
	} else {
		createPlayersFields()
	}
}

function createPlayersFields() {
	let ele = document.getElementById("players")
	let sel = document.getElementById("sel")
	let but = document.getElementById("but")

	ele.style.display = "block"
	ele.replaceChildren();

	for (let i = 0; i < sel.value; i++) {
		createTierFields(ele, i)
	}

	let button = document.createElement("button")
	button.innerText = "Shuffle"
	button.type = "button"
	button.id = "but"
	button.onclick = function () {
		shuffleTiers()
	}
	ele.appendChild(button)
}

function createTierFields(ele, i) {
	let index = i + 1
	let tierId = "tier" + index
	let p = document.createElement("p")
	let lbl = document.createElement("label")
	let txt = document.createTextNode("Tier" + index)

	lbl.htmlFor = tierId
	lbl.appendChild(txt)
	p.appendChild(lbl)
	ele.appendChild(p)

	let txtArea = document.createElement("textarea")
	txtArea.id = tierId
	txtArea.name = tierId
	txtArea.rows = 4
	txtArea.cols = 50

	ele.appendChild(txtArea)

	let br = document.createElement("br")
	ele.appendChild(br)
}

function shuffleTiers() {
	let res = document.getElementById("result")
	let sel = document.getElementById("sel")
	res.style.display = "block"
	result.replaceChildren()

	let table = document.createElement("table")
	createTableHeader(table)

	let players = []
	for (let i = 0; i < sel.value; i++) {
		let txtArea = document.getElementById("tier" + (i + 1))
		let part = txtArea.value.split("\n").filter(entry => entry.trim() !== '')
		shuffleArray(part)
		players.push(...part)
	}

	for (let i = 0; i < players.length / 2; i++) {
		let tr = document.createElement("tr")
		let tdLeft = document.createElement("td")
		let tdRight = document.createElement("td")
		let leftPlayer = players[i * 2]
		let rightPlayer = players[(i * 2) + 1]

		tdLeft.innerText = leftPlayer
		tdRight.innerText = rightPlayer == undefined ? "" : rightPlayer
		
		tr.appendChild(tdLeft)
		tr.appendChild(tdRight)
		table.appendChild(tr)
	}
	res.appendChild(table)
}
