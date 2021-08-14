$(document).ready(function () {
    const abi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_vi",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "SM_ban_data",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "DangKy",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "arrHocVien",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "_ID",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_VI",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const addressSM = '0x994EC02B416DAeB5175E6E4eADdd05A09dA0E10C';

    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();

    // tao contract cho MM
    var contract_MM = new web3.eth.Contract(abi, addressSM);
    console.log(contract_MM);
    
    // tao const cho infura
    var provider = new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/4f670254311f41d291cb8c8e37336572');
    var web3_infura = new Web3(provider)
    var contract_infura = web3_infura.eth.Contract(abi, addressSM);
    console.log(contract_infura);
    contract_infura.events.SM_ban_data({filter: {}, fromBlock: 'latest'}, function (error, data) {
        if (error) {
            console.error(error);
        } else {
            console.log(data);
            $('#tbDS').append(`
                <tr id="dong1">
                    <td>${data.returnValues[0]}</td>
                    <td>${data.returnValues[1]}</td>
                </tr>
            `);
        }
    });

    var currentAccount = '';
    checkMM();

    $('#connectMM').click(function () {
        connectMM().then((data) => {
            currentAccount = data[0];
            console.log(currentAccount);
        }).catch((err) => {
            console.log(err);
        })
    })

    $('#btnDangKy').click(function () {
        if (currentAccount.length == 0) {
            alert('Vui lòng đăng nhập MM nha');
        } else {
            $.post('./dangky', {
                Email: $('#txtHoTen').val(),
                HoTen: $('#txtEmail').val(),
                SoDT: $('#txtSoDT').val()
            }, function (data) {
                if (data.ketQua == 1) {
                    contract_MM.methods.DangKy(data.maLoi._id).send({
                        from: currentAccount,
                    });
                }
            });
        }
    })
});

async function connectMM() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
}

function checkMM() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed');
    }
    else {
        console.log('Ban chua cai MetaMask kia !!')
    }
}