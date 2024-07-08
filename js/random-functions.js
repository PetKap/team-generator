function shuffleRandom() {
	let res = document.getElementById("result")
	let txtArea = document.getElementById("txtArea")

	res.style.display = "block"
	result.replaceChildren()
	
	let table = document.createElement("table")
	createTableHeader(table)

	let players = txtArea.value.split("\n").filter(entry => entry.trim() !== '')
	shuffle(players)

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

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}
