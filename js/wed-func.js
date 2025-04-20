var tier1 = ["Adam M.", "Bodo", "Lukas K.", "Patres", "Peto K.", "Peto L.", "Peto T.", "Tomas H.", "Jakub T."]
var tier2 = ["Adam A.", "Janka", "Marcel B.", "Marek K.", "Michal S.", "Peto B."]
var tier3 = ["David M.", "Karci", "Libor V.", "Marca", "Matus Ch.", "Matus P.", "Miro H.", "Robo O.", "Subi", "Vlado B.", "Viktor B."]
var tier4 = ["Janci K.", "Juraj M.", "Martin K.", "Pato P.", "Richard K.", "Stevo P.", "Tomas C.", "Vlado R.", "Patrik K."]
var tier1Actual = []
var tier2Actual = []
var tier3Actual = []
var tier4Actual = []
var unknown = []

function replaceDiacritics(s) {
    var r = s.toLowerCase()
    non_asciis = {'a': '[áä]', 'c': 'č', 'd': 'ď', 'e': 'é', 'i': 'í', 'l': '[ĺľ]', 'n': 'ň', 'o': '[óô]', 'r': 'ŕ', 's': 'š', 't': 'ť', 'u': 'ú', 'y': 'ý', 'z': 'ž'}
    
	for (i in non_asciis) { 
		r = r.replace(new RegExp(non_asciis[i], 'g'), i)
	}
    
	return firstUpper(r)
}

function firstUpper(str) {
	let name = str.trim()
	let spaceIndex = name.indexOf(" ")

	if (spaceIndex != -1) {
		return name.charAt(0).toUpperCase() + name.slice(1, spaceIndex) + " " + name.charAt(spaceIndex + 1).toUpperCase() + "."
	}
	
	return name.charAt(0).toUpperCase() + name.slice(1)
}

function playerKnown(player) {
	return isTierOne(player) || isTierTwo(player) || isTierThree(player) || isTierFour(player)
}

function playerAdded(player) {
	return isTier(tier1Actual, player) || isTier(tier2Actual, player) || isTier(tier3Actual, player) || isTier(tier4Actual, player)
}

function isTierOne(player) {
	return isTier(tier1, player)
}

function isTierTwo(player) {
	return isTier(tier2, player)
}

function isTierThree(player) {
	return isTier(tier3, player)
}

function isTierFour(player) {
	return isTier(tier4, player)
}

function isTier(tier, player) {
	return tier.indexOf(player) !== -1
}

function shuffleWednesday() {
	// prepare list of players
	let txtArea = document.getElementById("txtArea")
	let players = txtArea.value.split("\n").filter(player => player.trim() !== '').map(player => replaceDiacritics(player))
	// we have all players and we need to compare with our tier lists (and shuffle)
	tier1Actual = players.filter(player => isTierOne(player))
	tier2Actual = players.filter(player => isTierTwo(player))
	tier3Actual = players.filter(player => isTierThree(player))
	tier4Actual = players.filter(player => isTierFour(player))
	unknown = players.filter(player => !playerKnown(player))
	
	if (unknown.length != 0) {
		createFieldsForUnknown(unknown)
	} else {
		let res = []

		shuffleArray(tier1Actual)
		res.push(...tier1Actual)
		shuffleArray(tier2Actual)
		res.push(...tier2Actual)
		shuffleArray(tier3Actual)
		res.push(...tier3Actual)
		shuffleArray(tier4Actual)
		res.push(...tier4Actual)

		shuffleTiers(res)
	}
	
}

function createFieldsForUnknown(unknown) {
	let upDiv = document.getElementById("unknownPlayers")
	let btn = document.getElementById("btn")
	let hdr = document.createElement("h3")
	let hdrTxt = document.createTextNode("Some players were not recognized and need to be manually assigned to tiers:")

	upDiv.style.display = "block"
	btn.style.display = "none"
	hdr.appendChild(hdrTxt)
	upDiv.appendChild(hdr)

	for (let i = 0; i < unknown.length; i++) {
		createField(upDiv, unknown[i])
	}
	
	let finBut = document.createElement("button")
	finBut.innerText = "Finish shuffling"
	finBut.type = "button"
	finBut.id = "finbtn"
	finBut.onclick = function () {
		collectUnknownPlayers()

		let res = []

		shuffleArray(tier1Actual)
		res.push(...tier1Actual)
		shuffleArray(tier2Actual)
		res.push(...tier2Actual)
		shuffleArray(tier3Actual)
		res.push(...tier3Actual)
		shuffleArray(tier4Actual)
		res.push(...tier4Actual)

		shuffleTiers(res)
		
		addCleanButton()
	}
	upDiv.appendChild(finBut)
}

function addCleanButton() {
	let res = document.getElementById("result")
	let clnButton = document.createElement("button")
	clnButton.innerText = "Start again"
	clnButton.type = "button"
	clnButton.id = "clbtn"
	clnButton.onclick = function () {
		let unk = document.getElementById("unknownPlayers")
		let btn = document.getElementById("btn")

		unk.replaceChildren()
		unk.style.display = "none"
		res.replaceChildren()
		res.style.display = "none"
		btn.style.display = ""
	}
	res.appendChild(clnButton)
}

function createField(upDiv, player) {
	let id = player.replaceAll(/ |\./g,"")
	let lbl = document.createElement("label")
	let txt = document.createTextNode(player + "\t")
	let sel = document.createElement("select")
	let br = document.createElement("br")

	sel.name = id
	sel.id = id

	for (let i = 1; i <= 4; i++) {
		addOption(sel,  i)
	}
	
	lbl.htmlFor = id
	lbl.appendChild(txt)
	
	upDiv.appendChild(lbl)
	upDiv.appendChild(sel)
	upDiv.appendChild(br)
}

function addOption(sel, index) {
	let opt = document.createElement("option")
	let txt = document.createTextNode("Tier " + index)

	opt.value = index

	opt.appendChild(txt)
	sel.appendChild(opt)
}

function collectUnknownPlayers() {
	let allLabels = document.getElementsByTagName("label")

	for (let i = 1; i < allLabels.length; i++) {
		let playerTxt = allLabels[i].innerText.trim()

		if (!playerAdded(playerTxt)) {
			let id = playerTxt.replaceAll(/ |\./g,"")
			let sel = document.getElementById(id)

			sel.disabled = true

			addPlayer(playerTxt, sel.value)
			console.log(playerTxt + "=" + id + "!" + sel.value)
		}
	}
}

function addPlayer(playerTxt, selValue) {
	if (selValue == 1) {
		tier1Actual.push(playerTxt)
	} else if (selValue == 2) {
		tier2Actual.push(playerTxt)
	} else if (selValue == 3) {
		tier3Actual.push(playerTxt)
	} else if (selValue == 4) {
		tier4Actual.push(playerTxt)
	}
}
