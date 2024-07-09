function addSelectorOptions(beg, end) {
	let sel = document.getElementById("sel")

	for (let i = beg; i <= end; i++) {
		let opt = document.createElement("option")
		opt.value = i
		opt.innerHTML = i
		sel.appendChild(opt)
	}
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

function shuffleArray(array) {
    let currentIndex = array.length

    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}
