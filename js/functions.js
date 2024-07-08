function addSelectorOptions() {
	let sel = document.getElementById("sel")

	for (let i = 6; i < 17; i++) {
		let opt = document.createElement("option")
		opt.value = i
		opt.innerHTML = i
		sel.appendChild(opt)
	}
}

function players(menu) {
	if (menu.value == '1') {
		document.getElementById("players").style.display = "none"
		document.getElementById("result").style.display = "none"
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

	for (let i = 0; i < sel.value / 2; i++) {
		createTextPair(ele, i * 2)
	}

	let button = document.createElement("button")
	button.type = "button"
	button.innerText = "Shuffle"
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
	result.replaceChildren()
	
	let table = document.createElement("table")
	createTableHeader(table)

	for (let i = 0; i < sel.value / 2; i++) {
		let tr = document.createElement("tr")
		let tdLeft = document.createElement("td")
		let tdRight = document.createElement("td")
		let tfLeft = document.getElementById(i * 2)
		let tfRight = document.getElementById((i * 2) + 1)
		let rnd = getRandom()
		
		tdLeft.innerText = rnd == 1 ? tfLeft.value : tfRight.value
		tdRight.innerText = rnd == 0 ? tfLeft.value : tfRight.value
		
		tr.appendChild(tdLeft)
		tr.appendChild(tdRight)
		table.appendChild(tr)
	}
	res.appendChild(table)
}

function getRandom() {
	return Math.floor( Math.random() * 100 ) % 2
}

function createTableHeader(table) {
	let tr = document.createElement("tr")
	let thLeft = document.createElement("th")
	let thRight = document.createElement("th")
	
	thLeft.innerText = "Team A"
	thRight.innerText = "Team B"
	
	tr.appendChild(thLeft)
	tr.appendChild(thRight)
	table.appendChild(tr)
}
