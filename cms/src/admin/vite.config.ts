import { mergeConfig, type Plugin, type UserConfig } from 'vite';

const HARDEN_DOM_SCRIPT = `<script>
(function () {
  try {
    var html = document.documentElement;
    html.setAttribute('translate', 'no');
    html.classList.add('notranslate');
    if (typeof Node !== 'function' || !Node.prototype) return;
    var originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (child) {
      if (child.parentNode !== this) return child;
      return originalRemoveChild.call(this, child);
    };
    var originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (newNode, referenceNode) {
      if (referenceNode && referenceNode.parentNode !== this) return newNode;
      return originalInsertBefore.call(this, newNode, referenceNode);
    };
  } catch (e) {}
})();
</script>`;

function disableAutoTranslate(): Plugin {
  return {
    name: 'bbb-disable-auto-translate',
    transformIndexHtml(html) {
      let out = html;

      if (!/translate=["']no["']/.test(out)) {
        out = out.replace(/<html/i, '<html translate="no"');
      }

      if (!/\bnotranslate\b/.test(out)) {
        out = out.replace(/<html([^>]*)>/i, (match, attrs: string) => {
          if (/\sclass=/.test(attrs)) {
            return `<html${attrs.replace(/class=["']([^"']*)["']/, 'class="$1 notranslate"')}>`;
          }
          return `<html${attrs} class="notranslate">`;
        });
      }

      if (!/name=["']google["'][^>]*content=["']notranslate["']/.test(out)) {
        out = out.replace(/<head([^>]*)>/i, '<head$1><meta name="google" content="notranslate" />');
      }

      if (!out.includes('originalRemoveChild')) {
        out = out.replace(/<head([^>]*)>/i, `<head$1>${HARDEN_DOM_SCRIPT}`);
      }

      return out;
    },
  };
}

export default (config: UserConfig) =>
  mergeConfig(config, {
    plugins: [disableAutoTranslate()],
  });
