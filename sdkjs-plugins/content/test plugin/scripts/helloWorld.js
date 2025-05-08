// Example insert text into editors (different implementations)
((window) => {
    const text = "Hello world!"
    window.Asc.plugin.init = () => {
      const variant = 2
  
      switch (variant) {
      case 0:
        // serialize command as text
        let sScript = "var oDocument = Api.GetDocument();"
        sScript += "oParagraph = Api.CreateParagraph();"
        sScript += "oParagraph.AddText('Hello world!');"
        sScript += "oDocument.InsertContent([oParagraph]);"
        this.info.recalculate = true
        this.executeCommand("close", sScript)
        break
      case 1:
        // call command without external variables
        this.callCommand(() => {
          const oDocument = Api.GetDocument()
          const oParagraph = Api.CreateParagraph()
          oParagraph.AddText("Hello world!")
          oDocument.InsertContent([oParagraph])
        }, true)
        break
      case 2:
        // call command with external variables
        Asc.scope.text = text // export variable to plugin scope
        this.callCommand(() => {
          const oDocument = Api.GetDocument()
          const oParagraph = Api.CreateParagraph()
          oParagraph.AddText(Asc.scope.text) // or oParagraph.AddText(scope.text);
          oDocument.InsertContent([oParagraph])
        }, true)
        break
      default:
        break
      }
    }
  
    window.Asc.plugin.button = (id) => {}
  })(window)