function startVoiceSearch() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function (event) {
    const searchQuery = event.results[0][0].transcript;
    document.getElementById('searchBox').value = searchQuery;
    document.getElementById('searchForm').submit();
  };

  recognition.onerror = function (event) {
    alert("Voice recognition error: " + event.error);
  };
}

function startVoiceCommand() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function (event) {
    const command = event.results[0][0].transcript.toLowerCase();
    handleVoiceCommand(command);
  };

  recognition.onerror = function (event) {
    alert("Voice recognition error: " + event.error);
  };
}

function handleVoiceCommand(command) {
  if (command.includes("add to cart")) {
    const productName = command.replace("add to cart", "").trim();
    addToCart(productName);
  } else if (command.includes("show cart")) {
    window.location.href = "/cart";
  } else if (command.includes("checkout")) {
    window.location.href = "/checkout";
  } else {
    alert("Command not recognized!");
  }
}

function addToCart(productName) {
  fetch(`/add-to-cart?product=${productName}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) alert(`${productName} added to cart!`);
      else alert("Failed to add product.");
    });
}
