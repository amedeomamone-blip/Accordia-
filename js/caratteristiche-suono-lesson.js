(function () {
    'use strict';

    var descriptions = {
        durata: '<strong>Durata.</strong> Ci fa capire se un suono è lungo oppure corto.',
        intensita: '<strong>Intensità.</strong> Ci fa capire se un suono è forte oppure piano.',
        altezza: '<strong>Altezza.</strong> Ci fa capire se un suono è grave oppure acuto.',
        timbro: '<strong>Timbro.</strong> È la qualità che ci permette di riconoscere e distinguere una voce o uno strumento.'
    };

    var cards = Array.prototype.slice.call(document.querySelectorAll('.sound-property'));
    var callout = document.getElementById('sound-callout');

    cards.forEach(function (card) {
        card.addEventListener('click', function () {
            cards.forEach(function (item) { item.classList.remove('is-active'); });
            card.classList.add('is-active');
            if (callout) callout.innerHTML = descriptions[card.dataset.property] || '';
        });
    });
})();
