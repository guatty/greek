var vscode = require('vscode');
var fs = require('fs');

var smilesOptions = [];

var data = require('./smilesData');

var array = data.split("\n");
for(i in array) {
  var splited = array[i].split(' ', 1);
  smilesOptions.push({
    label: String.fromCodePoint(parseInt(splited[0], 16)),
    description: array[i].slice(splited[0].length + 1),
    unicode: splited[0]
  })
}

var pickOptions = {
  matchOnDescription: true,
  matchOnDetail: true,
  placeHolder: "Type greek letter name"
}

function insertText(text) {
  var editor = vscode.window.activeTextEditor;
  editor.edit(function (editBuilder) {
    editBuilder.delete(editor.selection);
  }).then(function () {
    editor.edit(function (editBuilder) {
      editBuilder.insert(editor.selection.start, text);
    });
  });
}

function activate(context) {
    var insertGreek = vscode.commands.registerTextEditorCommand('greek.insertGreek', function () {
      vscode.window.showQuickPick(smilesOptions, pickOptions).then(function(item) {
        insertText(item.label)
      });
    });

    context.subscriptions.push(insertGreek);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;