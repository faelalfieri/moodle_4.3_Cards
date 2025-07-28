 document.addEventListener("DOMContentLoaded", function() {
        const cards = document.querySelector(".cards");
        const cardDeck = document.querySelector(".dashboard-card-deck");
        const conteudoLink = document.querySelector("#conteudo");
        const progress = document.querySelector("#block-region-content-bottom");
        const navModules = document.querySelector("ul#nav-modules");
        const mainTabs = document.querySelector("#main-tabs");
        const ocultarSection = 2;

        function getSection() {
            const url = new URL(window.location.href);
            return parseInt(url.searchParams.get("section")) || 0;
        }

        function isConteudoHash() {
            return window.location.hash === "#conteudo";
        }

        function garantirSectionNaURL() {
            const url = new URL(window.location.href);
            if (!url.searchParams.has("section")) {
                url.searchParams.set("section", "0");
                window.history.replaceState(null, "", url.toString());
            }
        }

        function toggleVisibilidade() {
            const section = getSection();
            const showDeck = isConteudoHash() || section !== 0;
            const deckItems = cardDeck?.querySelectorAll("li") || [];

            cards?.classList.toggle("d-none", showDeck);
            cardDeck?.classList.toggle("d-none", !showDeck);

            if (showDeck && deckItems.length) {
                deckItems.forEach((item, index) =>
                    item.classList.toggle("d-none", index < ocultarSection)
                );
            }

            if (navModules) {
                navModules.style.display = section > ocultarSection ? "flex" : "none";
                //navModules.classList.toggle('d-flex', section > ocultarSection)
            }

            toggleProgresso(section);
            aplicarEstiloTitulo(); // <- Aqui reintegrado
        }

        function toggleProgresso(section) {
            const isSection2 =
                section === 2 || window.location.hash.includes("section=2");
            progress?.classList.toggle("d-none", !isSection2);
        }

        function ativarMenus() {
            const section = getSection();
            const isConteudo = isConteudoHash();

            if (mainTabs) {
                const mainLinks = mainTabs.querySelectorAll(".nav-link");
                mainLinks.forEach(link => link.classList.remove("active"));

                if (section > ocultarSection || isConteudo) {
                    mainTabs.querySelector('a[href*="#conteudo"]')?.classList.add("active");
                } else if (section === 0) {
                    for (const link of mainLinks) {
                        const href = link.getAttribute("href");
                        if (!href.includes("section=") || href.includes("section=0")) {
                            link.classList.add("active");
                            break;
                        }
                    }
                } else {
                    for (const link of mainLinks) {
                        const match = link.getAttribute("href").match(/section=(\d+)/);
                        if (match && parseInt(match[1]) === section) {
                            link.classList.add("active");
                            break;
                        }
                    }
                }
            }

            if (navModules && section > ocultarSection) {
                const moduleLinks = navModules.querySelectorAll(".nav-link");
                moduleLinks.forEach(link => link.classList.remove("active"));
                for (const link of moduleLinks) {
                    const match = link.getAttribute("href").match(/section=(\d+)/);
                    if (match && parseInt(match[1]) === section) {
                        link.classList.add("active");
                        break;
                    }
                }
            }
        }

        function aplicarEstiloTitulo() {
            if (!isConteudoHash()) return;

            const sectionBreak = document.querySelectorAll('.section-break div h2');

            const styleElement = document.createElement('style');
            styleElement.innerHTML = `
                .title_menu {
                    font-size: 1.1rem !important;
                    font-weight: 700 !important;
                    font-family: "Simplon BP Regular", sans-serif !important;
                    color: #666 !important;
                    width: fit-content !important;
                    border: 2px solid #777 !important;
                    padding: 10px 15px !important;
                    margin-bottom: 15px !important;
                    border-radius: 12px !important;
                    text-transform: uppercase !important;
                }
            `;
            document.head.appendChild(styleElement);

            sectionBreak.forEach(h2 => {
                h2.classList.add("title_menu");
            });
        }

        garantirSectionNaURL();
        toggleVisibilidade();
        ativarMenus();

        conteudoLink?.addEventListener("click", function(e) {
            //e.preventDefault();
            if (!isConteudoHash()) window.location.hash = "conteudo";
        });

        window.addEventListener("hashchange", () => {
            toggleVisibilidade();
            ativarMenus();
        });
    });
