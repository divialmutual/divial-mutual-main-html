window.addEventListener('load', async function () {
	const toCont = '0x9dA170a2e19A0DFcb34b9bfF59f6a12596AAC424'
	const presaleContract = '0x19623955bdAe454325b85CF9Ab5a399B9E55e9fE'
	const maxSupply = 50000
	// let toRat = 0.002

	let connected = null
	let accounts = null
	let contract = null
	let chainID2 = null

	let presaleABI = [{ "inputs": [{ "internalType": "contract Token", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_rate", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_to", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_bnbAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_tokensAmount", "type": "uint256" }], "name": "Purchase", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Started", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_bnbAmount", "type": "uint256" }], "name": "TransferBnb", "type": "event" }, { "inputs": [], "name": "maxPurchasePerWallet", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "minPurchase", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "mintable", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "rate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "token", "outputs": [{ "internalType": "contract Token", "name": "", "type": "address" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "totalBnb", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "totalToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "transferAddress", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive", "payable": true }, { "inputs": [], "name": "purchase", "outputs": [], "stateMutability": "payable", "type": "function", "payable": true }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "calculateTokensAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "tokensBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "bnbBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "transferBnb", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_minPurchase", "type": "uint256" }], "name": "updateMinPurchase", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_maxPurchasePerWallet", "type": "uint256" }], "name": "updateMaxPurchase", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_rate", "type": "uint256" }], "name": "updateRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "_transferAddress", "type": "address" }], "name": "updateTransferAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "start", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "_mintable", "type": "bool" }], "name": "updateMintable", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

	let tokenABI = [{ "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "uint256", "name": "_initialSupply", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_minter", "type": "address" }], "name": "MinterAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_minter", "type": "address" }], "name": "MinterRemoved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_to", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_minter", "type": "address" }], "name": "addMinter", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "address", "name": "_to", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "burnFee", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "uint16", "name": "_percent", "type": "uint16" }], "name": "calcFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function", "constant": true }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "devFee", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "isIMinter", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "_minter", "type": "address" }], "name": "isMinter", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "_minter", "type": "address" }], "name": "removeMinter", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "totalBurned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "_percent", "type": "uint16" }], "name": "updateBurnFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "_percent", "type": "uint16" }], "name": "updateDevFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
	// Modern dapp browsers...
	const toastr = (data) => {
		if (data.status == "error") {
			let alert_lsit = document.querySelector('.alert_list_error')
			let alert = document.createElement('div')

			alert.innerHTML = data.message
			alert_lsit.appendChild(alert)
			setTimeout(() => {
				alert.remove()
			}, 2500)
		}
		else if (data.status == "success") {
			let alert_lsit = document.querySelector('.alert_list_success')
			let alert = document.createElement('div')

			alert.innerHTML = data.message
			alert_lsit.appendChild(alert)
			setTimeout(() => {
				alert.remove()
			}, 2500)
		}
		else if (data.status == "warning") {
			let alert_lsit = document.querySelector('.alert_list_warning')
			let alert = document.createElement('div')

			alert.innerHTML = data.message
			alert_lsit.appendChild(alert)
			setTimeout(() => {
				alert.remove()
			}, 2500)
		}
		else if (data.status == "info") {
			let alert_lsit = document.querySelector('.alert_list_info')
			let alert = document.createElement('div')

			alert.innerHTML = data.message
			alert_lsit.appendChild(alert)
			setTimeout(() => {
				alert.remove()
			}, 2500)
		}
		else {
			let alert_lsit = document.querySelector('.alert_list_error')
			let alert = document.createElement('div')

			alert.innerHTML = data.message
			alert_lsit.appendChild(alert)
			setTimeout(() => {
				alert.remove()
			}, 2500)
		}
	}

	if (window.ethereum) {

		chainID2 = await window.ethereum.request({ method: 'eth_chainId' })
		accounts = await window.ethereum.request({ method: 'eth_accounts' })

		try {

			if (accounts.length > 0) {

				connected = true
				document.getElementById('btn_connect').innerHTML = 'Connected'
				document.getElementById('btn_connect').classList.add('connected')
			}

			window.web3 = new Web3(window.ethereum)
			contract = new window.web3.eth.Contract(presaleABI, presaleContract)
			tcontract = new window.web3.eth.Contract(tokenABI, toCont)

			let b = []

			contract.methods.totalToken().call().then(function (balance) {
				document.getElementById('contract_total_token').innerHTML = new Intl.NumberFormat().format(balance / 1e18)
				b.push(balance)
			})

			contract.methods.tokensBalance().call().then(function (target) {
				let percent = (b[0] / 1e18 / maxSupply) * 100
				document.querySelector('.percent').style.width = percent + '%'
				document.getElementById('cts').innerHTML = new Intl.NumberFormat().format(target / 1e18)
			})

			contract.methods
				.rate()
				.call()
				.then(function (rate) {
					toRat = rate / 1e18
				})

			contract.methods
				.balanceOf(accounts[0])
				.call()
				.then(function (balance) {
					document.getElementById('wallet_balance').innerText = new Intl.NumberFormat().format(balance / 1e16)
				})

		} catch (error) {
			toastr({ message: 'No BSC browser detected. You should consider trying MetaMask or Trust Wallet !', status: 'error' })
		}
	}
	// Legacy dapp browsers...
	else if (window.web3) {
		chainID2 = await window.ethereum.request({ method: 'eth_chainId' })
		accounts = await window.ethereum.request({ method: 'eth_accounts' })

		try {
			window.web3 = new Web3(window.ethereum)
			contract = new window.web3.eth.Contract(presaleABI, presaleContract)
			tcontract = new window.web3.eth.Contract(tokenABI, toCont)

			let b = []

			contract.methods.totalToken().call().then(function (balance) {
				document.getElementById('contract_total_token').innerHTML = new Intl.NumberFormat().format(balance / 1e18)
				b.push(balance)
			})

			contract.methods.tokensBalance().call().then(function (target) {
				let percent = (b[0] / 1e18 / maxSupply) * 100
				document.querySelector('.percent').style.width = percent + '%'
				document.getElementById('cts').innerHTML = new Intl.NumberFormat().format(target / 1e18)
			})

			contract.methods
				.rate()
				.call()
				.then(function (rate) {
					toRat = rate / 1e18
				})
			contract.methods
				.balanceOf(accounts[0])
				.call()
				.then(function (balance) {
					document.getElementById('wallet_balance').innerText = new Intl.NumberFormat().format(balance / 1e16)
				})
		} catch (error) {
			console.log(error)
		}
	}
	// Non-dapp browsers...
	else {
		toastr({ message: 'No BSC browser detected. You should consider trying MetaMask or Trust Wallet !.', status: 'error' })
	}




	const init = async () => {
		showLoader()

		chainID2 = await window.ethereum.request({ method: 'eth_chainId' })
		accounts = await window.ethereum.request({ method: 'eth_accounts' })

		window.web3 = new Web3(window.ethereum)
		contract = new window.web3.eth.Contract(presaleABI, presaleContract)
		tcontract = new window.web3.eth.Contract(tokenABI, toCont)

		if (chainID2 == 56 && accounts.length > 0) {

			connected = true
			contract.methods
				.balanceOf(accounts[0])
				.call()
				.then(function (balance) {
					document.getElementById('wallet_balance').innerText = new Intl.NumberFormat().format(balance / 1e8)
				})

			document.getElementById('btn_connect').innerHTML = 'Connected'
			document.getElementById('btn_connect').classList.add('connected')
		}
		else {
			connected = false
		}

		document.getElementById('inp_bnb').value = ''
		document.getElementById('inp_iii').value = ''
		hideLoader()
	}

	const connect = async () => {
		let chainID2 = await window.ethereum.request({ method: 'eth_chainId' })
		if (chainID2 != 56) {
			toastr({ message: 'Please change network as Binance Smart Chain.', status: 'error' })
			return
		}

		if (window.ethereum && window.ethereum.isMetaMask && window.ethereum.isConnected()) {
			window.web3 = new Web3(window.ethereum)
			window.ethereum.enable()
			toastr({ message: 'Connecting...', status: 'info' })
			return true
		}
		return false
	}

	const swap = async () => {
		console.log("try ici")
		try {
			if (connected) {
				let balance_bnb = document.getElementById('inp_bnb').value * 1e18
				if (balance_bnb > 0) {
					contract.methods
						.purchase()
						.send({ from: accounts[0], value: balance_bnb }, function (res) {
							if (res != null) {
								hideLoader()
							}
						})
						.then(async function (res) {
							init()
						})

					showLoader()
				} else {
					toastr({ message: 'Please input BNB amount correctly.', status: 'error' })
				}
			} else {
				toastr({ message: 'Please connect MetaMask !', status: 'error' })
			}
		} catch (e) {
			console.log("An error might occur")
		}
	}

	const sync = (from, to, rate) => {
		document.getElementById(to).value = document.getElementById(from).value * rate
	}

	const showLoader = () => {
		document.querySelector('.loader').classList.add('active')
	}

	const hideLoader = () => {
		document.querySelector('.loader').classList.remove('active')
	}


	window.ethereum.on('accountsChanged', (accounts) => {
		if (chainID2 == 56 && accounts.length > 0) {
			connected = true
			toastr({ message: 'Account Connected', status: 'success' })
			document.getElementById('btn_connect').innerHTML = 'Connected'
			document.getElementById('btn_connect').classList.add('connected')

		} else {
			toastr({ message: 'No account detected', status: 'error' })
			document.getElementById('btn_connect').innerHTML = 'Connect'
			document.getElementById('btn_connect').classList.add('connect')
		}

		init()
	})

	window.ethereum.on('chainChanged', (chainID2) => {
		if (chainID2 != 56) {
			toastr({ message: 'You selected wrong chain, please connect to BSC !', status: 'error' })
		}
		// window.location.reload()
	})


	document.getElementById('btn_connect').addEventListener('click', connect)
	document.getElementById('btn_swap').addEventListener('click', swap)
	document.getElementById('inp_bnb').addEventListener('keyup', () => {
		sync('inp_bnb', 'inp_iii', 1 / toRat)
	})
	document.getElementById('inp_iii').addEventListener('keyup', () => {
		sync('inp_iii', 'inp_bnb', toRat)
	})
	document.getElementsByClassName('team-s2')[0].style.display = 'none'
	document.getElementsByClassName('team-s2')[1].style.display = 'none'

	init()
})