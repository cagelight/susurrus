// ================================================================
// UTIL
// ================================================================

class SUS {

	// Math.random except secure
	static random() {
		let buf = new ArrayBuffer(8)
		let dat = new Uint8Array(buf)
		window.crypto.getRandomValues(dat)
		dat[6] |= 0xF0
		dat[7] = 63
		return new DataView(buf).getFloat64(0, true) - 1
	}

	static randint(min, max) {
		return Math.floor(SUS.random() * ((max + 1) - min)) + min
	}
	
}

// ================================================================
// GLOBAL
// ================================================================

let components = {}

// ================================================================
// DICE
// ================================================================

class Dice {
	
	constructor() {
		this.values = []
	}
	
	initialize(num = 2, sides = 20) {
		this.roll(parseInt(num), parseInt(sides))
	}
	
	roll(num, max) {
		this.values = new Array(num)
		for (let i = 0; i < num; i++)
			this.values[i] = SUS.randint(1, max)
	}
	
}

let dice = new Dice()
components['dice'] = dice

// ================================================================

let vapp = new Vue({
	el: '#sus-body',
	data: Object.assign(
		{
			page: ''
		},
		components
	)
})

function processHash() {
	let str = window.location.hash.substr(1).split(':')
	vapp.page = str[0]
	if (components[str[0]])
		if (str.length > 1)
			components[str[0]].initialize(... str[1].split(','))
		else
			components[str[0]].initialize()
}

document.addEventListener('DOMContentLoaded', ()=>{
	processHash()
})

window.addEventListener('hashchange', ()=>{
	processHash()
})
