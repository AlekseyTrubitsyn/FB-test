(function() {
    const CLASS_DISABLED = 'catalog-item--disabled';
    const CLASS_SELECTED_PRE = 'catalog-item--selected-hover';
    const CLASS_SELECTED = 'catalog-item--selected';
    const CLASS_FOOTER = 'catalog-item__footer';
    const CLASS_FOOTER_LINK = 'catalog-item-footer__link'
    const CLASS_CLICKS_DISABLED = 'disable-click';

    let items = document.querySelectorAll('.catalog-item');
    let itemsArray = Array.prototype.slice.call(items);

    itemsArray.forEach(function(item) {
      let itemIsDisabled = item.classList.contains(CLASS_DISABLED);

      if (!itemIsDisabled) {
        item.addEventListener('click', selectionToggle);
      }
    });

    function selectionToggle(e) {
      e.preventDefault();

      if (!checkIsClickable(e)) return;

      let item = e.currentTarget;

      let selected = item.classList.contains(CLASS_SELECTED);
      let preSelected = item.classList.contains(CLASS_SELECTED_PRE);

      if (!(selected || preSelected)) {
        item.classList.add(CLASS_SELECTED_PRE);
        item.addEventListener('mouseleave', changePreToSelected);

      } else if (preSelected) {
        item.classList.remove(CLASS_SELECTED_PRE);
        item.removeEventListener('mouseleave', changePreToSelected);

      } else {
        item.classList.remove(CLASS_SELECTED);

      }
    }

    function changePreToSelected(e) {
      let item = e.currentTarget;

      item.classList.remove(CLASS_SELECTED_PRE);
      item.classList.add(CLASS_SELECTED);
      item.removeEventListener('mouseleave', changePreToSelected);
    }

    function checkIsClickable(e) {
      if (clicksDisabled(e.target)) return false;

      if (clicksDisabled(e.target.parentNode) && !(e.target.tagName === 'A')) return false;

      return true;

      function clicksDisabled(element) {
        return element.classList.contains(CLASS_CLICKS_DISABLED);
      }
    }
})();
