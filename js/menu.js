function createMenu() {
	let menuItems = [
						["Home", "index.html"],
						["Random generator", "random.html"], 
						["Pair generator", "pair.html"], 
						["Tier list generator", "tier.html"]
					]

	let nav = document.getElementById("mySidenav")

	menuItems.forEach((menu) => {
		nav.appendChild(createMenuItem(menu[0], menu[1]))
	});
}

function createMenuItem(name, ref) {
	let item = document.createElement("a")
	let txt = document.createTextNode(name)
	item.href = ref
	item.appendChild(txt)

	return item
}

function openNav() {
	let nav = document.getElementById("mySidenav")

	if (nav.style.width == "250px") {
		closeNav();
	} else {
		nav.style.width = "250px"
		document.getElementById("main").style.marginLeft = "250px"
	}
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0"
	document.getElementById("main").style.marginLeft = "0"
}