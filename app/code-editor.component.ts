import { Component, OnInit, ViewChild } from '@angular/core';

import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/mode/sql/sql.js';
import { WindowRef } from './WindowRef';

class Tree {
  name = 'Tree name';
  height = 30;
  age = 40;
}


@Component({
  selector: 'r3-code-editor',
  template: `
    <textarea #host></textarea>
  `
})
export class R3CodeEditorComponent implements OnInit {
  @ViewChild('host') hostComponent;

  constructor() { }

  ngOnInit() {
    let codeEditor = CodeMirror.fromTextArea(this.hostComponent.nativeElement, { 
      lineNumbers: true,
      extraKeys: {"Ctrl-Space": "autocomplete"}, 
      mode: { name: 'x-mariadbql', globalVars: true }
    });

    codeEditor.setValue(`INSERT INTO TABLE;`);

    let orig = CodeMirror.hint.javascript;
    CodeMirror.hint.javascript = function(cm) {
      var inner = orig(cm) || {from: cm.getCursor(), to: cm.getCursor(), list: []};
      console.log(inner);
      inner.list.push("bozo");
      return inner;
    };

  }
}