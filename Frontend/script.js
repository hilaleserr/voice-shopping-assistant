// Ses tanıma API desteği kontrolü
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const micBtn = document.getElementById("mic-btn");
const searchBtn = document.getElementById("search-btn");
const inputText = document.getElementById("input-text");
const resultsDiv = document.getElementById("results");

let recognition;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = "tr-TR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    micBtn.addEventListener("click", () => {
        recognition.start();
        micBtn.textContent = "Dinleniyor...";
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        inputText.value = transcript;
        micBtn.textContent = "🎤 Sesle Ara";
    };

    recognition.onerror = (event) => {
        micBtn.textContent = "🎤 Sesle Ara";
        alert("Ses tanıma hatası: " + event.error);
    };

    recognition.onend = () => {
        micBtn.textContent = "🎤 Sesle Ara";
    };
} else {
    micBtn.disabled = true;
    micBtn.textContent = "Tarayıcınız ses tanımayı desteklemiyor";
}

// Arama butonu click handler
searchBtn.addEventListener("click", () => {
    const query = inputText.value.trim();
    if (!query) {
        alert("Lütfen arama metni girin.");
        return;
    }
    resultsDiv.innerHTML = "Aranıyor...";
    
    fetch("http://localhost:5000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: query }),
    })
    .then(response => response.json())
    .then(data => {
        if (!data.length) {
            resultsDiv.innerHTML = "Ürün bulunamadı.";
            return;
        }
        resultsDiv.innerHTML = data.map(p => 
            `<div>
                <h3>${p.name}</h3>
                <p>Kategori: ${p.category}</p>
                <p>Renk: ${p.color}</p>
                <p>Beden: ${p.size}</p>
                <p>Malzeme: ${p.material}</p>
                <p>Fiyat: ${p.price}₺</p>
            </div><hr/>`
        ).join("");
    })
    .catch(err => {
        resultsDiv.innerHTML = "Bir hata oluştu: " + err;
    });
});
