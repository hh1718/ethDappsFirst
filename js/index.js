import {web3,contractObj} from './web3.js';

console.log(contractObj);

var box_logs_pending = document.querySelector("#box_logs_pending");
var box_logs_complete = document.querySelector("#box_logs_complete");

//address
var addr = document.querySelector("#addr");
const addr_all = String(web3.eth.accounts);
const addr_array = addr_all.split(",");
const addr_len = addr_array.length;
for (var i = 0; i < addr_len; i++) {
    document.getElementById("addr").innerHTML += "address[" + i + "]: " + addr_array[i] + "<br>";
    console.log(addr_array[i]);
}


//set_num
var btn_set_num = document.querySelector("#btn_set_num");
btn_set_num.addEventListener('click', () => setNum());
function setNum() {
    const input_from = document.querySelector("#input_from").value;
    const input_pw = document.querySelector("#input_pw").value;
    const input_set_num = document.querySelector("#input_set_num").value;
    //Unlock address
    web3.personal.unlockAccount(input_from,input_pw,600);
    //Send Transaction
    let response_setnum = contractObj.setNum.sendTransaction(input_set_num, {from:input_from, gas:1000000}
);
    console.log("response_setnum: ", response_setnum);
}
//get_num
var output_get_num = document.querySelector("#output_get_num");
var btn_get_num = document.querySelector("#btn_get_num");
btn_get_num.addEventListener('click', () => getNum());
function getNum() {
    const response_getnum = contractObj.getNum.call();
    output_get_num.innerHTML = response_getnum;
}


/* イベント監視　*/
//送信
var txhash;
var tx_info;
var filter = web3.eth.filter("pending");
//resultにはblock hashが返される。
filter.watch(function(error, result) {
    txhash = result;
    tx_info = web3.eth.getTransaction(txhash);
    box_logs_pending.innerHTML += "tx: " + txhash + "<br>"
                            + "（送信元アドレス）: " + tx_info.from + "<br>";
});
//完了
var send_addr;
var event = contractObj.evSetNum();
console.log(event)
event.watch(function(error,result) {
    var send_addr = web3.eth.getTransaction(result.transactionHash).from;
    box_logs_complete.innerHTML += "tx: " + result.transactionHash + "　：[状態] complete" + "<br>"
                        + "[完了情報] " + "（ブロックNo.）: " + result.blockNumber
                        + "（送信元アドレス）： " + send_addr
                        + "　(入力値）； " + result.args.num + "<br>";
});
