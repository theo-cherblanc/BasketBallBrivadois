import type { StrapiApp } from '@strapi/strapi/admin';

/**
 * Chrome / Google Translate (and similar extensions) wrap text nodes in
 * extra <font> tags. React then crashes with:
 * "Failed to execute 'removeChild' on 'Node'".
 * The French wording of that error is a typical auto-translate of the
 * original English DOMException.
 */
function disableBrowserAutoTranslate() {
  const html = document.documentElement;
  html.setAttribute('translate', 'no');
  html.classList.add('notranslate');
  document.body?.classList.add('notranslate');
}

function hardenDomMutations() {
  if (typeof Node !== 'function' || !Node.prototype) return;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      return child;
    }
    return originalRemoveChild.call(this, child);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(
    newNode: T,
    referenceNode: Node | null
  ): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      return newNode;
    }
    return originalInsertBefore.call(this, newNode, referenceNode);
  };
}

export default {
  config: {
    // Native French UI so Chrome is less likely to auto-translate the admin.
    locales: ['fr'],
  },
  bootstrap(_app: StrapiApp) {
    disableBrowserAutoTranslate();
    hardenDomMutations();
  },
};
