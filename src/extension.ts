import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vs-extension" is now active!');

    let disposable = vscode.commands.registerCommand('vs-extension.initHello', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; 
        }
    
        const { document, selection } = editor;
        const languageId = document.languageId;
        let docType: DocumentationType;
    
        if (languageId === 'typescript') {
            docType = DocumentationType.TSDoc;
        } else if (languageId === 'javascript') {
            docType = DocumentationType.JSDoc;
        } else {
            vscode.window.showErrorMessage('This command only works with JavaScript or TypeScript files.');
            return;
        }
    
        const position = selection.active;
        const documentation = generateDocumentation(docType);
        editor.edit(editBuilder => {
            editBuilder.insert(position, documentation);
        });
    });
    

    context.subscriptions.push(disposable);
}

enum DocumentationType {
    JSDoc,
    TSDoc
}

function generateDocumentation(docType: DocumentationType): string {
    if (docType === DocumentationType.JSDoc) {
        // Generate JSDoc documentation
        return `
/**
 * Description of the function.
 * @param {Type} paramName Description of the parameter.
 * @returns {Type} Description of the return value.
 */
`;
    } else {
        // Generate TSDoc documentation
        return `
/**
 * Description of the function.
 * @param {Type} paramName Description of the parameter.
 * @returns {Type} Description of the return value.
 */
`;
    }
}


export function deactivate() {
    console.log('Deactivating extension');
}
