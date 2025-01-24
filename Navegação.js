<script>
    //Código refatorado
    document.addEventListener("DOMContentLoaded", function() {
        const cards = document.querySelector(".cards");
        const cardDeck = document.querySelector(".dashboard-card-deck");
        const conteudoLink = document.querySelector("#conteudo");

        /**
         * Adiciona o parâmetro &section=0 à URL caso ele não esteja presente.
         */
        function addSectionToUrl() {
            const url = new URL(window.location.href);

            if (!url.searchParams.has("section")) {
                url.searchParams.set("section", "0");
                window.history.replaceState(null, "", url.toString());
            }
        }

        /**
         * Ajusta a visibilidade dos elementos na página com base nos parâmetros da URL.
         */
        function updateVisibility() {
            const url = new URL(window.location.href);
            const section = url.searchParams.get("section");
            const hasHashConteudo = url.hash === "#conteudo";

            if (hasHashConteudo) {
                hideCards();
                showCardDeck(5); // Exibe a partir do 5º item (índice 4)
            } else if (!section || section === "0") {
                showCards();
                hideCardDeck();
            } else {
                hideCards();
                showCardDeck();
            }
        }

        /**
         * Oculta o elemento .cards.
         */
        function hideCards() {
            cards.classList.add("d-none");
        }

        /**
         * Exibe o elemento .cards.
         */
        function showCards() {
            cards.classList.remove("d-none");
        }

        /**
         * Oculta o elemento .dashboard-card-deck.
         */
        function hideCardDeck() {
            cardDeck.classList.add("d-none");
        }

        /**
         * Exibe o elemento .dashboard-card-deck.
         * @param {number} [startVisibleIndex=0] - Índice inicial a partir do qual os itens do deck devem ser exibidos.
         */
        function showCardDeck(startVisibleIndex = 0) {
            const cardDeckItems = cardDeck.querySelectorAll("li");

            cardDeckItems.forEach((item, index) => {
                if (index < startVisibleIndex) {
                    item.classList.add("d-none");
                } else {
                    item.classList.remove("d-none");
                }
            });

            cardDeck.classList.remove("d-none");
        }

        /**
         * Atualiza a URL ao clicar no link com id 'conteudo' e ajusta a visibilidade.
         */
        function handleConteudoLinkClick(event) {
            event.preventDefault();
            window.location.hash = "conteudo";
            updateVisibility();
        }

        // Inicialização
        addSectionToUrl();
        updateVisibility();
        conteudoLink.addEventListener("click", handleConteudoLinkClick);
    });
</script>
