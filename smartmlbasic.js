const fs = require('fs');

const args = process.argv.slice(2);

// begin from eztz cli example

const library = {
  bs58check: require('bs58check'),
  sodium: require('libsodium-wrappers-sumo'),
};

const prefix = {
  tz1: new Uint8Array([6, 161, 159]),
  tz2: new Uint8Array([6, 161, 161]),
  tz2: new Uint8Array([6, 161, 164]),
  KT: new Uint8Array([2,90,121]),

  edpk: new Uint8Array([13, 15, 37, 217]),
  edsk2: new Uint8Array([13, 15, 58, 7]),
  spsk: new Uint8Array([17, 162, 224, 201]),
  p2sk: new Uint8Array([16,81,238,189]),

  sppk: new Uint8Array([3, 254, 226, 86]),
  p2pk: new Uint8Array([3, 178, 139, 127]),

  edsk: new Uint8Array([43, 246, 78, 7]),
  edsig: new Uint8Array([9, 245, 205, 134, 18]),
  spsig1: new Uint8Array([13, 115, 101, 19, 63]),
  p2sig: new Uint8Array([54, 240, 44, 52]),
  sig: new Uint8Array([4, 130, 43]),

  Net: new Uint8Array([87, 82, 0]),
  nce: new Uint8Array([69, 220, 169]),
  b: new Uint8Array([1,52]),
  o: new Uint8Array([5, 116]),
  Lo: new Uint8Array([133, 233]),
  LLo: new Uint8Array([29, 159, 109]),
  P: new Uint8Array([2, 170]),
  Co: new Uint8Array([79, 179]),
  id: new Uint8Array([153, 103]),
};

const utility = {
  b58cencode: function (payload, prefix) {
    const n = new Uint8Array(prefix.length + payload.length);
    n.set(prefix);
    n.set(payload, prefix.length);
    return library.bs58check.encode(new Buffer(n, 'hex'));
  },
  b58cdecode: (enc, prefix) => library.bs58check.decode(enc).slice(prefix.length),
  buf2hex: function (buffer) {
    const byteArray = new Uint8Array(buffer), hexParts = [];
    for (let i = 0; i < byteArray.length; i++) {
      let hex = byteArray[i].toString(16);
      let paddedHex = ('00' + hex).slice(-2);
      hexParts.push(paddedHex);
    }
    return hexParts.join('');
  },
  hex2buf : function(hex){
    return new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }));
  },
  mergebuf : function(b1,b2){
    var r = new Uint8Array(b1.length+b2.length);
    r.set(b1);
    r.set(b2, b1.length);
    return r;
  },
};

global.eztz = {
  prefix : prefix,
  utility : utility,
  library : library
};

// end from eztz cli example

// sudo npm install libsodium-wrappers xmlhttprequest

(async() => {
  await library.sodium.ready;
  await library.bs58check.ready;
  global.sodium = library.sodium;

smartml=require(__dirname + '/smartmljs.bc.js');

var file_Path = './smlse_expr_files/CryptoBot.py.smlse'

function smlseToMichelsonConverter(){
  const s_expr = fs.readFileSync(file_Path, 'utf8');
  // console.log(s_expr)
  try {
    const contract = smartml.importContract(s_expr);
    // console.log(contract)
    const compiledContract = smartml.compileContract(contract);
    const michelsonCode = smartml.compiledContract_to_michelson(compiledContract);
    console.log(michelsonCode);
  }
  catch(exn) {
    console.error("Exception while handling " + args[1])
    console.error(smartml.stringOfException(false, exn));
    process.exit(1)
  }
}

smlseToMichelsonConverter()

}

)()