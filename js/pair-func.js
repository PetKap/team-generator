function createPlayersSection(menu) {
	// we want to hide result section every time, when number of players is changed
	document.getElementById("result").style.display = "none"

	if (menu.value === '-') {
		document.getElementById("players").style.display = "none"
		alert("Choose value")
	} else {
		createPlayersFields()
	}
}

function createPlayersFields() {
	let ele = document.getElementById("players")
	let sel = document.getElementById("sel")

	ele.style.display = "block"
	ele.replaceChildren();

	for (let i = 0; i < sel.value / 2; i++) {
		createTextPair(ele, i * 2)
	}

	let button = document.createElement("button")
	button.innerText = "Shuffle"
	button.type = "button"
	button.id = "but"
	button.onclick = function () {
		shuffle()
	}
	ele.appendChild(button)
}

function createTextPair(div, index) {
	createTf(div, index)

	let text = document.createTextNode(" - ")
	div.appendChild(text)
	
	createTf(div, index + 1)

	let br = document.createElement("br")
	div.appendChild(br)
}

function createTf(div, index) {
	let tf = document.createElement("input")
	tf.type = "text"
	tf.id = index

	div.appendChild(tf)
}

function shuffle() {
	let res = document.getElementById("result")
	let sel = document.getElementById("sel")

	res.style.display = "block"
	res.replaceChildren()
	
	let table = document.createElement("table")
	createTableHeader(table)

	for (let i = 0; i < sel.value / 2; i++) {
		let tr = document.createElement("tr")
		let tdLeft = document.createElement("td")
		let tdRight = document.createElement("td")
		let tfLeft = document.getElementById((i * 2).toString())
		let tfRight = document.getElementById(((i * 2) + 1).toString())
		let rnd = getRandom()
		
		tdLeft.innerText = rnd === 1 ? tfLeft.value : tfRight.value
		tdRight.innerText = rnd === 0 ? tfLeft.value : tfRight.value
		
		tr.appendChild(tdLeft)
		tr.appendChild(tdRight)
		table.appendChild(tr)
	}
	res.appendChild(table)
}

function getRandom() {
	return Math.floor( Math.random() * 100 ) % 2
}
