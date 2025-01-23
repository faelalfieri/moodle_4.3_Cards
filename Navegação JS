<script>
      document.addEventListener("DOMContentLoaded", function() {
        const cards = document.querySelector(".cards");
        const cardDeck = document.querySelector(".dashboard-card-deck");

        // Função para verificar a URL e ajustar visibilidade
        function checkUrlAndShowCards() {
            const urlParams = new URLSearchParams(window.location.search);
            const section = urlParams.get("section"); // Obtém o valor do parâmetro 'section'

            if (!section || section === "0") {
                // Se não existir parâmetro 'section' ou for '0'
                cards.classList.remove("d-none"); // Exibe a UL 'cards'
                cardDeck.classList.add("d-none"); // Oculta a UL 'dashboard-card-deck'
            } else {
                cards.classList.add("d-none"); // Oculta a UL 'cards'
                cardDeck.classList.remove("d-none"); // Exibe a UL 'dashboard-card-deck'
            }
        }

        // Executar a função ao carregar a página
        checkUrlAndShowCards();
    });

    // Parte dois

    document.addEventListener("DOMContentLoaded", function() {
        const cards = document.querySelector(".cards");
        const cardDeck = document.querySelector(".dashboard-card-deck");

        // Função para verificar a URL e ajustar visibilidade
        function adjustVisibilityBasedOnUrl() {
            const url = window.location.href;

            // Verifica se a URL contém '#conteudo'
            if (url.includes("#conteudo")) {
                // Oculta a UL com classe 'cards' que contém o LI com ID 'section-0'
                cards.classList.add("d-none");

                // Oculta as 5 primeiras LI da UL com classe 'dashboard-card-deck'
                const cardDeckItems = cardDeck.querySelectorAll("li");
                cardDeckItems.forEach((item, index) => {
                    if (index < 5) {
                        item.classList.add("d-none");
                    } else {
                        item.classList.remove("d-none");
                    }
                });

                // Garante que a UL 'dashboard-card-deck' esteja visível
                cardDeck.classList.remove("d-none");
            }
        }

        // Executa a função ao carregar a página
        adjustVisibilityBasedOnUrl();
    });
</script>
