// --- UTILITÁRIOS ---
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => document.body.classList.toggle('light-theme'));

const algoSelect = document.getElementById('algo-select');
algoSelect.addEventListener('change', () => {
    document.getElementById('vigenere-extra').style.display = (algoSelect.value === 'vigenere') ? 'block' : 'none';
});

const morseMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/'
};

// --- FUNÇÕES DE CRIPTOGRAFIA ---

function executar(modo) {
    const input = document.getElementById('input-text').value;
    const algo = document.getElementById('algo-select').value;
    let out = "";

    try {
        if (algo === "cesar") out = cifraCesar(input, modo ? 3 : -3);
        if (algo === "base64") out = modo ? btoa(input) : atob(input);
        if (algo === "binario") out = modo ? textoParaBinario(input) : binarioParaTexto(input);
        if (algo === "morse") out = modo ? textoParaMorse(input) : morseParaTexto(input);
        if (algo === "vigenere") {
            const chave = document.getElementById('vigenere-key').value;
            out = cifraVigenere(input, chave, modo);
        }
        document.getElementById('output-text').innerText = out;
    } catch(e) {
        document.getElementById('output-text').innerText = "ERRO: Entrada inválida para este formato.";
    }
}

// Cifra de César
function cifraCesar(str, shift) {
    return str.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + shift + 26) % 26) + base);
    });
}

// Binário
function textoParaBinario(str) {
    return str.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}
function binarioParaTexto(str) {
    return str.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
}

// Morse
function textoParaMorse(str) {
    return str.toUpperCase().split('').map(c => morseMap[c] || '').join(' ');
}
function morseParaTexto(str) {
    const revMorse = Object.fromEntries(Object.entries(morseMap).map(([k, v]) => [v, k]));
    return str.split(' ').map(code => revMorse[code] || '').join('');
}

// Vigenère
function cifraVigenere(texto, chave, encriptar) {
    if (!chave) return "ERRO: Chave necessária";
    let resultado = "";
    chave = chave.toUpperCase();
    for (let i = 0, j = 0; i < texto.length; i++) {
        let c = texto[i];
        if (c.match(/[a-z]/i)) {
            let base = c <= 'Z' ? 65 : 97;
            let shift = chave[j % chave.length].charCodeAt(0) - 65;
            if (!encriptar) shift = 26 - shift;
            resultado += String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26) + base);
            j++;
        } else {
            resultado += c;
        }
    }
    return resultado;
}


