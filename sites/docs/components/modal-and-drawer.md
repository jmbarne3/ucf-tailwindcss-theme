---
title: Modal and drawer
order: 8
description: Styles for the native dialog element, which traps focus, closes on Escape and restores focus by itself.
---

## Modal

{% example %}
<button class="btn" type="button" command="show-modal" commandfor="ex-modal">Request information</button>
<dialog class="modal" id="ex-modal" aria-labelledby="ex-modal-title">
  <h2 class="type-h3" id="ex-modal-title">Request information</h2>
  <p class="mt-4">We'll send program details and upcoming visit dates.</p>
  <div class="flex gap-3 mt-6">
    <button class="btn" type="button" command="close" commandfor="ex-modal">Send</button>
    <button class="btn btn-text" type="button" command="close" commandfor="ex-modal">Cancel</button>
  </div>
</dialog>
{% endexample %}

The `command` and `commandfor` attributes open and close the dialog without a script. We haven't verified which versions of each browser support them, so until we do, include this fallback once per page. It does nothing where the browser handles the attributes itself.

```html
<script>
  if (!('commandForElement' in HTMLButtonElement.prototype)) {
    document.addEventListener('click', (e) => {
      const b = e.target.closest('button[commandfor]');
      const d = b && document.getElementById(b.getAttribute('commandfor'));
      if (d) b.getAttribute('command') === 'close' ? d.close() : d.showModal();
    });
  }
</script>
```

## Drawer

A drawer is the same dialog, sliding in from the side: Athena's offcanvas. Add a composition class for a dark panel.

{% example %}
<button class="btn btn-outline" type="button" command="show-modal" commandfor="ex-drawer">Open filters</button>
<dialog class="drawer ucf-composition-dark" id="ex-drawer" aria-labelledby="ex-drawer-title">
  <div class="flex items-center justify-between">
    <h2 class="type-h4" id="ex-drawer-title">Filters</h2>
    <button class="btn btn-text btn-sm" type="button" command="close" commandfor="ex-drawer">Close</button>
  </div>
  <label class="form-check mt-6"><input type="checkbox" checked> Online</label>
  <label class="form-check"><input type="checkbox"> Main campus</label>
</dialog>
{% endexample %}
