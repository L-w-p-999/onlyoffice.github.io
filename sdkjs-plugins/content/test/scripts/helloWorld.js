// Example insert text into editors (different implementations)
(function (window) {
  const text = "Hello world!";

  // 一定要用 function 而不是箭头函数，否则 this.callCommand 不可用
  window.Asc.plugin.init = function () {
    const variant = 2;

    switch (variant) {
      case 0:
        // serialize command as text
        let sScript = "var oDocument = Api.GetDocument();";
        sScript += "oParagraph = Api.CreateParagraph();";
        sScript += "oParagraph.AddText('Hello world!');";
        sScript += "oDocument.InsertContent([oParagraph]);";
        this.info.recalculate = true;
        this.executeCommand("close", sScript);
        break;

      case 1:
        // call command without external variables
        this.callCommand(function () {
          const oDocument = Api.GetDocument();
          const oParagraph = Api.CreateParagraph();
          oParagraph.AddText("Hello world!");
          oDocument.InsertContent([oParagraph]);
        }, true);
        break;

      case 2:
        // call command with external variables
        Asc.scope.text = text; // 导出到插件作用域
        this.callCommand(function () {
          const oDocument = Api.GetDocument();
          const oParagraph = Api.CreateParagraph();
          oParagraph.AddText(Asc.scope.text);
          oDocument.InsertContent([oParagraph]);
        }, true);
        break;

      default:
        break;
    }
  };

  // 同样改成普通函数，以后按钮回调也能拿到 this
  window.Asc.plugin.button = function (id) {
    // 如果你想在按钮点击时才插入：
    if (id === "btnInsertHello") {
      Asc.scope.text = text;
      this.callCommand(function () {
        const oDocument = Api.GetDocument();
        const oParagraph = Api.CreateParagraph();
        oParagraph.AddText(Asc.scope.text);
        oDocument.InsertContent([oParagraph]);
      }, true);
    }
  };
})(window);
