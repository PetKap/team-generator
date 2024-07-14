function shuffleRandom() {
	let res = document.getElementById("result")
	let txtArea = document.getElementById("txtArea")

	res.style.display = "block"
	result.replaceChildren()

	let table = document.createElement("table")
	createTableHeader(table)

	let players = txtArea.value.split("\n").filter(entry => entry.trim() !== '')
	shuffleArray(players)

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
