<script>
    document.addEventListener("DOMContentLoaded", function() {
        const cards = document.querySelector(".cards");
        const cardDeck = document.querySelector(".dashboard-card-deck");
        const conteudoLink = document.querySelector("#conteudo");
        const progress = document.querySelector("#block-region-content-bottom");
        const ocultarSection = 5;

        function toggleVisibility() {
            const url = new URL(window.location.href);
            const section = url.searchParams.get("section");
            const isConteudo = window.location.hash === "#conteudo";
            const showDeck = isConteudo || section !== "0";
            const deckItems = cardDeck.querySelectorAll("li");

            cards.classList.toggle("d-none", showDeck);
            cardDeck.classList.toggle("d-none", !showDeck);

            if (showDeck) {
                deckItems.forEach((item, index) =>
                    item.classList.toggle("d-none", index < ocultarSection)
                );
            }
            activeProgress();
        }

        function activeProgress() {
            const url = new URL(window.location.href);
            const isSection3 =
                url.searchParams.get("section") === "3" ||
                url.hash.includes("section=3");

            progress.classList.toggle("d-none", !isSection3);
        }

        // Atribui section=0 se não existir na URL
        const url = new URL(window.location.href);
        if (!url.searchParams.has("section")) {
            url.searchParams.set("section", "0");
            window.history.replaceState(null, "", url.toString());
        }

        // Primeira execução
        toggleVisibility();

        // Clicando no link de conteúdo
        conteudoLink.addEventListener("click", (e) => {
            e.preventDefault();
            if (window.location.hash !== "#conteudo") {
                window.location.hash = "conteudo"; // Isso já aciona o hashchange
            }
        });

        // Atualiza a visibilidade ao mudar o hash
        window.addEventListener("hashchange", toggleVisibility);
    });
</script>
