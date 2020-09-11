export default {
  install(Vue) {
    Vue.prototype.perfectPrint = function (options) {
      if (!options) {
        throw "options is object";
      }
      options.id = options.id ? options.id : "print-iframe";
      if (!options.content) {
        throw "content is not empty"
      }
      let _iframe = document.getElementById(options.id);
      if (!_iframe) {
        _iframe = document.createElement("iframe");
        _iframe.setAttribute("id", options.id);
        _iframe.setAttribute('style','position:absolute;width:0px;height:0px;left:-500px;top:-500px;')
        document.body.appendChild(_iframe);
        let _iframeDocument = _iframe.contentWindow.document;
        _iframeDocument.write(`<!doctype html>`);
        if (!options.showHeaderFooter) {
          _iframeDocument.write(`<style media="print">
              @page  {
                size: auto;
                margin: 0mm;    
              }
          </style>`);
          if (getExplorer() == "IE") {
            pagesetup_null();
          }
        }
        _iframeDocument.write(options.content);
        _iframeDocument.close();
        _iframe.contentWindow.focus();
      }

      setTimeout(() => {
        _iframe.contentWindow.print();
      }, 0);

      if (getExplorer() > 0) {
        document.body.removeChild(_iframe);
      }
    }
  }
}

function pagesetup_null() {
  let hkey_root, hkey_path, hkey_key;
  hkey_root = "HKEY_CURRENT_USER";
  hkey_path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
  try {
    var RegWsh = new ActiveXObject("WScript.Shell");
    hkey_key = "header";
    RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
    hkey_key = "footer";
    RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
  } catch (e) {
  }
}

function getExplorer() {
  let explorer = window.navigator.userAgent;
  if (explorer.indexOf("MSIE") >= 0) {
    return "IE";
  } else if (explorer.indexOf("Firefox") >= 0) {
    return "Firefox";
  } else if (explorer.indexOf("Chrome") >= 0) {
    return "Chrome";
  } else if (explorer.indexOf("Opera") >= 0) {
    return "Opera";
  } else if (explorer.indexOf("Safari") >= 0) {
    return "Safari";
  }
}
