// Business Logic
let offensiveWords = ["zoinks", "muppeteer", "biffaroni", "loopdaloop"];

function wordCounter(text) {
  if (isEmpty(text)) {
    return 0;
  }
  let wordCount = 0;
  const textArray = text.split(" ");
  textArray.forEach(function (element) {
    if (!Number(element) && !offensiveWords.includes(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (isEmpty(word)) {
    return 0;
  }
  const textArray = text.split(" ");
  let wordCount = 0;
  textArray.forEach(function (element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

function boldPassage(word, text) {
  if (isEmpty(word) || isEmpty(text)) {
    return null;
  }
  const p = document.createElement("p");
  let textArray = text.split(" ");
  textArray.forEach(function (element, index) {
    if (word === element) {
      const bold = document.createElement("strong");
      bold.append(element);
      p.append(bold);
    } else {
      p.append(element);
    }
    if (index !== (textArray.length - 1)) {
      p.append(" ");
    }
  });
  return p;
}

function addKeysAndValuesToUl(array) {
  const ul = document.createElement("ul");
  Object.keys(array).forEach(function (key) {
    let li = document.createElement("li");
    li.append(`${key}` + ":" + `${array[key].numberOfTimes}`);
    ul.append(li);
  });
  return ul;
}

// Utility Logic

function isEmpty(testString) {
  return (testString.trim().length === 0);
}

function assignValuesToWordArray(passage) {
  let wordArray = [];
  let passageArray = passage.split(" ");
  passageArray.forEach(function (word) {
    if (wordArray.hasOwnProperty(word)) {
      wordArray[word].numberOfTimes += 1;
    } else {
      wordArray[word] = { numberOfTimes: 1 }
    }
  })
  return wordArray;
}

//UI Logic
function handleFormSubmission() {
  event.preventDefault();
  const passage = document.getElementById("text-passage").value;
  const word = document.getElementById("word").value;
  const wordCount = wordCounter(passage);
  const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
  const wordKeyValuePairs = assignValuesToWordArray(passage);
  const numberOfWordsUl = addKeysAndValuesToUl(wordKeyValuePairs);
  document.getElementById("total-count").innerText = wordCount;
  document.getElementById("selected-count").innerText = occurrencesOfWord;
  document.getElementById("wordCount-passage").append(numberOfWordsUl);
  let boldedPassage = boldPassage(word, passage);
  if (boldedPassage) {
    document.querySelector("div#bolded-passage").append(boldedPassage);
  } else {
    document.querySelector("div#bolded-passage").innerText = null;
  }
}

window.addEventListener("load", function () {
  document.querySelector("form#word-counter").addEventListener("submit", handleFormSubmission);
});