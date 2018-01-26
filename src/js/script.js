(function() {
    const CLASS_DISABLED = 'catalog-item--disabled';
    const CLASS_SELECTED_PRE = 'catalog-item--selected-hover';
    const CLASS_SELECTED = 'catalog-item--selected';
    const CLASS_FOOTER = 'catalog-item__footer';

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

      let isFooter = e.target.classList.contains(CLASS_FOOTER) || e.target.parentNode.classList.contains(CLASS_FOOTER);
      let isLink = e.target.tagName === 'A';

      if (isFooter && !isLink) return;

      let selected = this.classList.contains(CLASS_SELECTED);
      let preSelected = this.classList.contains(CLASS_SELECTED_PRE);

      if (preSelected) {
        this.classList.remove(CLASS_SELECTED_PRE);
        this.onmouseleave = null;

      } else if (selected) {
        this.classList.remove(CLASS_SELECTED);

      } else {
        this.classList.add(CLASS_SELECTED_PRE);
        this.onmouseleave = changePreToSelected;
      }

      function changePreToSelected() {
        this.classList.remove(CLASS_SELECTED_PRE);
        this.classList.add(CLASS_SELECTED);
        this.onmouseleave = null;
      }
    }
})();
