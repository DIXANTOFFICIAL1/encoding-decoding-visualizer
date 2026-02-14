document.getElementById('encode-form').addEventListener('submit', function (e) {
e.preventDefault();
const inputString = document.getElementById('inputString').value;
const encodingScheme = document.getElementById('encodingScheme').value;
document.getElementById('steps').innerHTML = '';
document.getElementById('encoded-output').innerHTML = '';
let result;
switch (encodingScheme) {
case 'base32':
result = base32Encode(inputString);
break;
case 'base64':
result = base64Encode(inputString);
break;
case 'base85':
result = base85Encode(inputString);
break;}
displaySteps(result.steps, 'steps', 'encoded-output', result.encodedString);
document.getElementById('decode-button').style.display = 'block';
document.getElementById('decode-button').onclick = function () {
document.getElementById('decode-steps').innerHTML = '';
document.getElementById('decoded-output').innerHTML = '';
let decodeResult;
switch (encodingScheme) {
case 'base32':
decodeResult = base32Decode(result.encodedString);
break;
case 'base64':
decodeResult = base64Decode(result.encodedString);
break;
case 'base85':
decodeResult = base85Decode(result.encodedString);
break;}
displaySteps(decodeResult.steps, 'decode-steps', 'decoded-output', decodeResult.decodedString);
document.getElementById('decoding-steps').style.display = 'block';
};
});
function displaySteps(stepsArray, stepsElementId, outputElementId, resultString) {
const stepsElement = document.getElementById(stepsElementId);
const outputElement = document.getElementById(outputElementId);
stepsArray.forEach((step, index) => {
const stepDiv = document.createElement('div');
stepDiv.classList.add('animated-step');
stepDiv.style.animationDelay = `${index * 2}s`;
stepDiv.innerText = step;
stepsElement.appendChild(stepDiv);
});
setTimeout(() => {
outputElement.innerText = resultString;
}, stepsArray.length * 2000);
}
const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
function base32Encode(input) {
const steps = [];
let binaryString = '';
for (let i = 0; i < input.length; i++) {
const binaryChar = input.charCodeAt(i).toString(2).padStart(8, '0');
steps.push(`Character '${input[i]}' -> Binary: ${binaryChar}`);
binaryString += binaryChar;
}
const binaryChunks = binaryString.match(/.{1,5}/g).map(chunk => chunk.padEnd(5, '0'));
steps.push(`Binary Chunks: ${binaryChunks.join(' ')}`);
const decimalValues = binaryChunks.map(chunk => parseInt(chunk, 2));
steps.push(`Decimal Values: ${decimalValues.join(', ')}`);
const encodedString = decimalValues.map(value => base32Chars[value]).join('');
steps.push(`Base32 Encoded String: ${encodedString}`);
return { encodedString, steps };}
function base32Decode(encoded) {
const steps = [];
const decimalValues = Array.from(encoded).map(char => base32Chars.indexOf(char));
steps.push(`Base32 Characters to Decimal: ${decimalValues.join(', ')}`);
const binaryChunks = decimalValues.map(value => value.toString(2).padStart(5, '0'));
steps.push(`5-bit Binary Chunks: ${binaryChunks.join(' ')}`);
const combinedBinaryString = binaryChunks.join('');
const binaryBytes = combinedBinaryString.match(/.{1,8}/g);
steps.push(`8-bit Binary Chunks: ${binaryBytes.join(' ')}`);
const decodedString = binaryBytes.map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
steps.push(`Decoded String: ${decodedString}`);
return { decodedString, steps };
}
const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function base64Encode(input) {
const steps = [];
let binaryString = '';
for (let i = 0; i < input.length; i++) {
const binaryChar = input.charCodeAt(i).toString(2).padStart(8, '0');
steps.push(`Character '${input[i]}' -> Binary: ${binaryChar}`);
binaryString += binaryChar;}
const binaryChunks = binaryString.match(/.{1,6}/g).map(chunk => chunk.padEnd(6, '0'));
steps.push(`Binary Chunks: ${binaryChunks.join(' ')}`);
const decimalValues = binaryChunks.map(chunk => parseInt(chunk, 2));
steps.push(`Decimal Values: ${decimalValues.join(', ')}`);
const encodedString = decimalValues.map(value => base64Chars[value]).join('');
steps.push(`Base64 Encoded String: ${encodedString}`);
return { encodedString, steps };}
function base64Decode(encoded) {
const steps = [];
const decimalValues = Array.from(encoded).map(char => base64Chars.indexOf(char));
steps.push(`Base64 Characters to Decimal: ${decimalValues.join(', ')}`);
const binaryChunks = decimalValues.map(value => value.toString(2).padStart(6, '0'));
steps.push(`6-bit Binary Chunks: ${binaryChunks.join(' ')}`);
const combinedBinaryString = binaryChunks.join('');
const binaryBytes = combinedBinaryString.match(/.{1,8}/g);
steps.push(`8-bit Binary Chunks: ${binaryBytes.join(' ')}`);
const decodedString = binaryBytes.map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
steps.push(`Decoded String: ${decodedString}`);
return { decodedString, steps };}
const base85Chars = Array.from({ length: 85 }, (_, i) => String.fromCharCode(i + 33));
function base85Encode(input) {
const steps = [];
let binaryString = '';
for (let i = 0; i < input.length; i++) {
const binaryChar = input.charCodeAt(i).toString(2).padStart(8, '0');
steps.push(`Character '${input[i]}' -> Binary: ${binaryChar}`);
binaryString += binaryChar;
}
const binaryChunks = binaryString.match(/.{1,7}/g).map(chunk => chunk.padEnd(7, '0'));
steps.push(`Binary Chunks: ${binaryChunks.join(' ')}`);
const decimalValues = binaryChunks.map(chunk => parseInt(chunk, 2));
steps.push(`Decimal Values: ${decimalValues.join(', ')}`);
const encodedString = decimalValues.map(value => base85Chars[value]).join('');
steps.push(`Base85 Encoded String: ${encodedString}`);
return { encodedString, steps };
}
function base85Decode(encoded) {
const steps = [];
const decimalValues = Array.from(encoded).map(char => base85Chars.indexOf(char));
steps.push(`Base85 Characters to Decimal: ${decimalValues.join(', ')}`);
const binaryChunks = decimalValues.map(value => value.toString(2).padStart(7, '0'));
steps.push(`7-bit Binary Chunks: ${binaryChunks.join(' ')}`);
const combinedBinaryString = binaryChunks.join('');
const binaryBytes = combinedBinaryString.match(/.{1,8}/g);
steps.push(`8-bit Binary Chunks: ${binaryBytes.join(' ')}`);
const decodedString = binaryBytes.map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
steps.push(`Decoded String: ${decodedString}`);
return { decodedString, steps };
}
