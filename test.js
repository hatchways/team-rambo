function generateDocument(characters, document) {
  let chars = {};
  let doc = {};

  for (let i = 0; i < characters.length; i++) {
    chars[characters[i]]
      ? (chars[characters[i]] += 1)
      : (chars[characters[i]] = 1);
  }

  for (let i = 0; i < document.length; i++) {
    doc[document[i]] ? (doc[document[i]] += 1) : (doc[document[i]] = 1);
  }

  for (const char of document) {
    // console.log(char);
    // if (charsObj[char]) charsObj[char] += 1;
    // if (docObj[char]) docObj[char] += 1;
    // if (!charsObj[char]) charsObj[char] = 1;
    // if (!docObj[char]) docObj[char] = 1;
  }

  for (const char in doc) {
    if (!chars[char] || chars[char] < doc[char]) return false;
  }

  return true;
}

const chars = "b";
const doc = "a";

console.log(generateDocument(chars, doc));
